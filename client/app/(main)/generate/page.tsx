"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import {
  Loader2,
  NotebookIcon,
  Pause,
  StopCircle,
  Volume1Icon,
  Volume2,
} from "lucide-react";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/youtube-player";
import ChatComponent from "@/components/chat-ui";
import { useToast } from "@/components/ui/use-toast";

const GeneratePage = () => {
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("url");

  const [hydrated, setHydrated] = useState(false);

  const [transcript, setTranscript] = useState("");
  const [transcriptLoading, setTranscriptLoading] = useState(false);

  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  const [timestamp, setTimestamp] = useState([]);
  const [timestampLoading, setTimestampLoading] = useState(false);

  const [summaryOpenAI, setSummaryOpenAI] = useState("");
  const [summaryOpenAILoading, setSummaryOpenAILoading] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

  const generateTranscript = async () => {
    try {
      setTranscriptLoading(true);
      const transcriptData = await axios.post("/api/generate/transcript", {
        videoURL: videoUrl,
      });
      setTranscript(transcriptData.data.result);
      toast({
        title: "Transcript generated!",
        description:
          "Transcript for the entered video has been generated succes!",
      });
    } catch (error) {
      console.log("[TRANSCRIPTS ERROR:]", error);
      toast({
        title: "Transcript Error!",
        variant: "destructive",
        description: "Error generating transcript!",
      });
    } finally {
      setTranscriptLoading(false);
    }
  };

  const generateSummary = async () => {
    try {
      setSummaryLoading(true);
      const summaryData = await axios.post("/api/generate/summary", {
        videoURL: videoUrl,
        transcript: transcript,
      });
      console.log(summaryData.data.result);
      setSummary(summaryData.data.result);
      toast({
        title: "Summary generated!",
        description: "Summary for the entered video has been generated succes!",
      });
    } catch (error) {
      console.log("[SUMMARY ERROR:]", error);
      toast({
        title: "Summary Error!",
        variant: "destructive",
        description: "Error generating Summary!",
      });
    } finally {
      setSummaryLoading(false);
    }
  };

  const generateTimestamp = async () => {
    try {
      setTimestampLoading(true);
      const timestampData = await axios.post("/api/generate/timestamp", {
        videoURL: videoUrl,
        transcript: transcript,
      });
      console.log(timestampData.data.fullText);
      setTimestamp(timestampData.data.fullText);
      toast({
        title: "Timestamp generated!",
        description:
          "Timestamps for the entered video has been generated succes!",
      });
    } catch (error) {
      console.log("[TIMESTAMP ERROR:]", error);
      toast({
        title: "Timestamp Error!",
        variant: "destructive",
        description: "Error generating Timestamp!",
      });
    } finally {
      setTimestampLoading(false);
    }
  };

  const generateSummaryOpenAI = async () => {
    try {
      setSummaryOpenAILoading(true);
      const summaryData = await axios.post("http://127.0.0.1:8000/summarize", {
        youtube_url: videoUrl,
      });
      console.log(summaryData.data.summary);
      setSummaryOpenAI(summaryData.data.summary);
    } catch (error) {
      console.log("[SUMMARY ERROR:]", error);
    } finally {
      setSummaryOpenAILoading(false);
    }
  };

  const addVideoCard = async () => {
    if (!videoUrl || !transcript || !summary || !timestamp) {
      console.log("Missing fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/card/create", {
        videoURL: videoUrl,
        transcript: transcript,
        timestamp: timestamp,
        summary: summary,
      });
      console.log(res.data);
      toast({
        title: "History saved!",
        description: "Your summary generations have been saved!",
      });
    } catch (error) {
      console.error("[VIDEOCARD ERROR:]", error);
      toast({
        title: "Error saving history!",
        variant: "destructive",
        description: "Error saving history!",
      });
    }
  };

  const handleSpeechTranscript = () => {
    const text = transcript;
    const value = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(value);
  };

  const handleSpeechSummary = () => {
    const text = summary;
    const value = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(value);
  };

  const handleSpeechSummaryOpenAI = () => {
    const text = summaryOpenAI;
    const value = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(value);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="flex flex-col h-screen ">
      <div className="flex flex-1 overflow-auto flex-wrap">
        <div className="w-1/2 p-4 space-y-4 overflow-auto">
          <div className=" bg-background rounded-md flex items-center justify-center">
            {videoUrl!.length > 0 ? (
              <VideoPlayer url={videoUrl!} />
            ) : (
              "Loading...."
            )}
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4">
            <div className="flex items-center justify-start space-x-2">
              <h2 className="font-semibold mb-2 text-black dark:text-white">
                Transcript of the video
              </h2>
              <Button
                variant={"outline"}
                onClick={generateTranscript}
                className="rounded-lg "
                disabled={transcriptLoading}
              >
                {transcriptLoading && (
                  <div className="mr-2">
                    <Loader2 className="h-5 w-5 animate-spin dark:text-white" />
                  </div>
                )}
                Generate Transcript
              </Button>
              <Volume2
                className="h-5 w-5 ml-2 dark:text-white"
                onClick={handleSpeechTranscript}
              />
              <StopCircle
                className="h-5 w-5 ml-2 dark:text-white"
                onClick={stopSpeech}
              />
            </div>
            <p className="space-y-2 mt-2 text-black dark:text-gray-300">
              {transcript}
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4">
            <div className="flex items-center justify-start space-x-2">
              <h2 className="font-semibold mb-2 text-black dark:text-white">
                Timestamps for the video
              </h2>
              <Button variant={"outline"} onClick={generateTimestamp}>
                {timestampLoading && (
                  <div className="mr-2">
                    <Loader2 className="h-5 w-5 animate-spin dark:text-white" />
                  </div>
                )}
                Generate Timestamp
              </Button>
            </div>
            <p className="text-black dark:text-gray-300">{timestamp}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4">
            <div className="flex items-center justify-start space-x-2">
              <h2 className="font-semibold mb-2 text-black dark:text-white">
                Summary of the video
              </h2>
              <Button variant={"outline"} onClick={generateSummary}>
                {summaryLoading && (
                  <div className="mr-2">
                    <Loader2 className="h-5 w-5 animate-spin dark:text-white" />
                  </div>
                )}
                Generate Summary
                <NotebookIcon className="h-5 w-5 ml-2 dark:text-white" />
              </Button>
              <Volume2
                className="h-5 w-5 ml-2 dark:text-white"
                onClick={handleSpeechSummary}
              />
              <StopCircle
                className="h-5 w-5 ml-2 dark:text-white"
                onClick={stopSpeech}
              />
            </div>
            <p className="text-black dark:text-gray-300">{summary}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4">
            <div className="flex items-center justify-start space-x-2">
              <h2 className="font-semibold mb-2 text-black dark:text-white">
                Summary of the video
              </h2>
              <Button variant={"outline"} onClick={generateSummaryOpenAI}>
                {summaryOpenAILoading && (
                  <div className="mr-2">
                    <Loader2 className="h-5 w-5 animate-spin dark:text-white" />
                  </div>
                )}
                Generate Summary
              </Button>
              <Volume2
                className="h-5 w-5 ml-2 dark:text-white"
                onClick={handleSpeechSummaryOpenAI}
              />
              <StopCircle
                className="h-5 w-5 ml-2 dark:text-white"
                onClick={stopSpeech}
              />
            </div>
            <p className="text-black dark:text-gray-300">{summaryOpenAI}</p>
          </div>
          <Button onClick={addVideoCard}>Save</Button>
        </div>
        <div className="w-1/2 p-4 space-y-4 ">
          <ChatComponent summaryText={summary} transcriptText={transcript} />
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;
