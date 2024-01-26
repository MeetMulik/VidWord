import {
    millisToMinutesAndSeconds,
    timestamp,
} from "@/utils/generateTimestamp";
import { NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

export async function POST(req: Request, res: Response) {
    try {
        const { videoURL } = await req.json();

        const regExp =
            /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = videoURL.match(regExp);

        if (!match || match[2].length !== 11) {
            throw new Error("Invalid YouTube video URL");
        }

        const youtubeId = match[2];
        const transcriptItems = await YoutubeTranscript.fetchTranscript(youtubeId);

        let fullText = "";
        for (const item of transcriptItems) {
            fullText += `starttime: ${millisToMinutesAndSeconds(item.offset)} text: ${item.text
                } `;
        }
        fullText = await timestamp(fullText);
        return NextResponse.json({ fullText }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error", error_description: error },
            { status: 500 }
        );
    }
}
