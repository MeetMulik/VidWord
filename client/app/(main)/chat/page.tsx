"use client";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useChat, useCompletion } from "ai/react";
import { Textarea } from "@/components/ui/textarea";
import { AddKey } from "@/components/add-key";

export default function Component() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  messages.sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="flex h-screen bg-background text-white">
      <aside className="w-64 flex-shrink-0 px-4 py-6 bg-background overflow-y-auto">
        <div className="flex items-center space-x-2">
          <MessageCircleIcon className="text-green-500 h-6 w-6" />
          <span className="font-semibold text-foreground">New chat</span>
        </div>
        <div className="mt-6 space-y-2">
          <p className="text-xs uppercase text-foreground">Recent Chats</p>
          <div className="flex items-center justify-between">
            <span className="text-foreground">User Inquiry, AI Assistant</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground">ChatGPT Prompt: Summarize!</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </div>
        </div>
        <div className="absolute bottom-6 left-4">
          <Button className="bg-green-600 hover:bg-green-700">
            Upgrade plan
          </Button>
          <span className="text-xs text-foreground block mt-2">
            Get GPT-4, DALL·E, and more
          </span>
        </div>
      </aside>
      <main className="flex-grow flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h1 className="text-lg font-semibold text-foreground">ChatGPT 3.5</h1>
          <AddKey />
          <Avatar>
            <AvatarImage alt="User avatar" src="/robo.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </header>
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col-reverse p-6 space-y-6 space-y-reverse">
            {messages.map((m) => (
              <div key={m.id}>
                {m.role === "user" ? (
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage alt="ChatGPT avatar" src="/self.svg" />
                      <AvatarFallback>CG</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="bg-gray-700 rounded-lg p-3">{m.content}</p>
                      <span className="text-xs text-foreground">You</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage alt="Chatgpt avatar" src="/robo.svg" />
                      <AvatarFallback>Y</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="bg-gray-700 rounded-lg p-3">{m.content}</p>
                      <span className="text-xs text-foreground">ChatGPT</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 bg-background">
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <Textarea
                value={input}
                className="w-full rounded-md text-black dark:text-white placeholder-gray-400"
                placeholder="Message ChatGPT..."
                onChange={handleInputChange}
              />
              <Button className="bg-background hover:bg-slate-300">
                <ArrowUpIcon className="h-6 w-6 text-foreground" />
              </Button>
            </div>
          </form>

          <span className="text-xs text-foreground block mt-2">
            ChatGPT can make mistakes. Consider checking important information.
          </span>
        </div>
      </main>
      <div className="w-16 flex-shrink-0 flex flex-col items-center justify-between py-6 bg-background">
        <SettingsIcon className="h-6 w-6 text-foreground" />
        <div className="flex flex-col items-center">
          <HelpCircleIcon className="h-6 w-6 text-foreground mt-4" />
        </div>
      </div>
    </div>
  );
}

function ArrowUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function HelpCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function LinkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  );
}

function MoreHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}

function MoreVerticalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ThumbsDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}

function ThumbsUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

export function Completion() {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion();

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input
            className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <output>Completion result: {completion}</output>
        <button type="button" onClick={stop}>
          Stop
        </button>
        <button disabled={isLoading} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
