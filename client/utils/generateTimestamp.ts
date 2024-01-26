const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function timestamp(prompt: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const pretext = "Only Important 10 Timestamps for the following transcript:";
    const extendedPrompt = pretext + prompt;

    const result = await model.generateContent(extendedPrompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

export function millisToMinutesAndSeconds(millis: number) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (+seconds < 10 ? '0' : '') + seconds;
}
