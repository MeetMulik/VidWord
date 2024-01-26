// "use client";
import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import Image from "next/image";

import { useChat } from "ai/react";

interface ChatComponentProps {
  summaryText: string;
  transcriptText: string;
}

const ChatComponent = ({ summaryText, transcriptText }: ChatComponentProps) => {
  let { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      summaryText,
      transcriptText,
    },
  });

  return (
    <div className="flex flex-col h-full max-h-screen overflow-auto">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4 p-4">
          {/* <div className="flex items-end space-x-2">
            <div className="flex-none">
              <Image
                alt="User Avatar"
                className="rounded-full"
                height="40"
                src="/robo.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
            </div>
            <div className="flex-grow bg-gray-200 dark:bg-gray-800 rounded-lg p-2">
              <p className="text-sm">Hello! How can I assist you today?</p>
            </div>
          </div>
          <div className="flex items-end justify-end space-x-2">
            <div className="flex-grow bg-blue-500 text-white rounded-lg p-2">
              <p className="text-sm">I need help with my account.</p>
            </div>
            <div className="flex-none">
              <Image
                alt="User Avatar"
                className="rounded-full"
                height="40"
                src="/robo.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
            </div>
          </div>
          <div className="flex items-end space-x-2">
            <div className="flex-none">
              <Image
                alt="User Avatar"
                className="rounded-full"
                height="40"
                src="/robo.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
            </div>
            <div className="flex-grow bg-gray-200 dark:bg-gray-800 rounded-lg p-2">
              <p className="text-sm">
                Sure, I can help with that. What seems to be the problem?
              </p>
            </div>
          </div> */}
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
            Chat regarding the video
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Welcome to our Video Discussion Companion: your intelligent partner
            for engaging conversations about the content of videos!
          </p>

          {messages.map((m) => (
            <div key={m.id}>
              {m.role === "user" ? (
                <div className="flex items-end justify-end space-x-2">
                  <div className="flex-grow bg-blue-500 text-white rounded-lg p-2">
                    <p className="text-sm">{m.content}</p>
                  </div>
                  <div className="flex-none">
                    <Image
                      alt="User Avatar"
                      className="rounded-full"
                      height="40"
                      src="/logo.svg"
                      style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                      }}
                      width="40"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-end space-x-2">
                  <div className="flex-none">
                    <Image
                      alt="User Avatar"
                      className="rounded-full"
                      height="40"
                      src="/robo.svg"
                      style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                      }}
                      width="40"
                    />
                  </div>
                  <div className="flex-grow bg-gray-200 dark:bg-gray-800 rounded-lg p-2">
                    <p className="text-sm">{m.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Textarea
              value={input}
              onChange={handleInputChange}
              className="flex-grow rounded-md"
              placeholder="Type your message here."
            />
            <Button className="flex-none">Send</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      {messages.map((m) => (
        <div key={m.id}>
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input
            className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
