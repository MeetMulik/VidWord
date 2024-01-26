import { YoutubeTranscript } from "youtube-transcript";

export const transcript = async (videoURL: string) => {
  try {
    const result = await YoutubeTranscript.fetchTranscript(videoURL).then(
      (transcript) => {
        const completeText = transcript.map((entry) => entry.text).join(" ");
        return completeText;
      }
    );

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
