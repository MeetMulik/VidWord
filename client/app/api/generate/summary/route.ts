import { createSummary } from "@/utils/generateSummary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { videoURL, transcript } = await req.json();
  try {
    const result = await createSummary(transcript);
    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
