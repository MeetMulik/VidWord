from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel
import openai
from youtube_transcript_api import YouTubeTranscriptApi
from langchain.text_splitter import RecursiveCharacterTextSplitter
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from gtts import gTTS 

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend's origin or use a list of allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# OpenAI API Key
openai.api_key = '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'

class YouTubeInput(BaseModel):
    youtube_url: str

def get_transcript(youtube_url):
    video_id = youtube_url.split("v=")[-1]
    transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)

    # Try fetching the manual transcript
    try:
        transcript = transcript_list.find_manually_created_transcript()
        language_code = transcript.language_code  # Save the detected language
    except:
        # If no manual transcript is found, try fetching an auto-generated transcript in a supported language
        try:
            generated_transcripts = [trans for trans in transcript_list if trans.is_generated]
            transcript = generated_transcripts[0]
            language_code = transcript.language_code  # Save the detected language
        except:
            # If no auto-generated transcript is found, raise an exception
            print("No suitable transcript found.")
            raise Exception("No suitable transcript found.")

    full_transcript = " ".join([part['text'] for part in transcript.fetch()])
    return full_transcript, language_code  # Return both the transcript and detected language

def summarize_with_langchain_and_openai(transcript, language_code, model_name='gpt-3.5-turbo'):
    # Split the document if it's too long
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=0)
    texts = text_splitter.split_text(transcript)
    text_to_summarize = " ".join(texts[:4]) # Adjust this as needed

    # Prepare the prompt for summarization
    system_prompt = 'I want you to act as a Life Coach that can create good summaries!'
    prompt = f'''Summarize the following text in {language_code}.
    Text: {text_to_summarize}

    Add a title to the summary in {language_code}. 
    Include an INTRODUCTION, BULLET POINTS if possible, and a CONCLUSION in {language_code}.'''

    # Start summarizing using OpenAI
    response = openai.ChatCompletion.create(
        model=model_name,
        messages=[
            {'role': 'system', 'content': system_prompt},
            {'role': 'user', 'content': prompt}
        ],
        temperature=1
    )
    
    return response['choices'][0]['message']['content']

@app.get("/", response_class=HTMLResponse)
def read_root():
    return """
    <html>
    <head>
        <title>YouTube Video Summarizer</title>
    </head>
    <body>
        <h1>YouTube Video Summarizer</h1>
        <form id="summarizeForm">
            <label for="youtube_url">Enter the link of the YouTube video you want to summarize:</label>
            <input type="text" id="youtube_url" name="youtube_url" required>
            <button type="button" onclick="summarizeVideo()">Start</button>
        </form>

        <div id="summaryResult"></div>

        <script>
            async function summarizeVideo() {
                const youtubeUrl = document.getElementById('youtube_url').value;
                const response = await fetch('/summarize', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "youtube_url": youtubeUrl })
                });

                const result = await response.json();
                document.getElementById('summaryResult').innerText = result.summary;
            }
        </script>
    </body>
</html>

    """

@app.post("/summarize", response_model=dict)
async def summarize(data: YouTubeInput):
    try:
        # Fetch the transcript from YouTube
        full_transcript, language_code = get_transcript(data.youtube_url)

        # Call your summarization function here using the fetched transcript
        summary = summarize_with_langchain_and_openai(full_transcript, language_code)

        return {'summary': summary}

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error in summarization: {str(e)}")
        raise HTTPException(status_code=500, detail='Internal server error')

def evaluate_sentences(paragraph: str):
    sentences = paragraph.split(". ")
    messages = [{"role": "system", "content": "You are a helpful assistant."}]
    model_responses = []

    for i, sentence in enumerate(sentences):
        prompt = f"Only say true or false, nothing else.\n\"{sentence}\""
        messages.append({"role": "user", "content": prompt})

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages
        )

        model_response = response['choices'][0]['message']['content']
        model_responses.append(model_response)

    return model_responses

@app.post("/evaluate", response_model=dict)
async def evaluate(data: YouTubeInput):
    try:
        full_transcript, _ = get_transcript(data.youtube_url)
        evaluations = evaluate_sentences(full_transcript)
        return {'evaluations': evaluations}

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error in evaluation: {str(e)}")
        raise HTTPException(status_code=500, detail='Internal server error')

@app.post("/generate_speech", response_model=dict)
async def generate_speech(data: YouTubeInput):
    try:
        full_transcript, _ = get_transcript(data.youtube_url)
        text_to_speak = full_transcript
        speech_path = "audio.mp3"
        language = 'en'
        speech = gTTS(text=text_to_speak, lang=language, slow=False)
        speech.save(speech_path)
        return {'speech_path': speech_path}

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error in speech generation: {str(e)}")
        raise HTTPException(status_code=500, detail='Internal server error')


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

# to run : uvicorn main:app --reload