import { transcript } from "@/utils/generateTranscript";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { videoURL } = await req.json();
  try {
    const result = await transcript(videoURL);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", error_description: error },
      { status: 500 }
    );
  }
}
