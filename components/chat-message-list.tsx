"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import Image from "next/image";

import { InitialChatMessages } from "@/app/chats/[id]/page";
import { formatToTimeAgo } from "@/lib/utils";
import { ArrowUpCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import { saveMessage } from "@/app/chats/actions";

const SUPABASE_PROJECT_URL = "https://aokokauifusyovpwqpjk.supabase.co";
const SUPABASE_PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFva29rYXVpZnVzeW92cHdxcGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3NTg1NDAsImV4cCI6MjAyOTMzNDU0MH0.5hytXA2bCUE6O9j3mM3nSrRPddyzNwmc3weoR57D9Is";

interface ChatMessageListProps {
  initialMessages: InitialChatMessages;
  chatRoomId: string;
  userId: number;
  username: string;
  avatar: string | null;
}

export default function ChatMessageList({
  initialMessages,
  chatRoomId,
  userId,
  username,
  avatar,
}: ChatMessageListProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const channel = useRef<RealtimeChannel>();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessages((prevMsgs) => [
      ...prevMsgs,
      {
        id: Date.now(),
        payload: message,
        created_at: new Date(),
        userId,
        user: {
          username,
          avatar,
        },
      },
    ]);

    channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        id: Date.now(),
        payload: message,
        created_at: new Date(),
        userId,
        user: {
          username,
          avatar,
        },
      },
    });

    await saveMessage(message, chatRoomId);

    setMessage("");
  };

  useEffect(() => {
    const client = createClient(SUPABASE_PROJECT_URL, SUPABASE_PUBLIC_KEY);

    channel.current = client.channel(`room-${chatRoomId}`);
    channel.current
      .on("broadcast", { event: "message" }, (payload) => {
        setMessages((prevMsgs) => [...prevMsgs, payload.payload]);
      })
      .subscribe();

    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId]);

  return (
    <div className="p-5 flex flex-col gap-y-5 min-h-screen justify-end">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-x-2 items-start ${message.userId === userId ? "justify-end" : ""}`}
        >
          <div className="size-10 rounded-full overflow-hidden">
            {message.userId === userId ? null : (
              <>
                {message.user.avatar !== null ? (
                  <Image
                    width={50}
                    height={50}
                    src={message.user.avatar!}
                    alt={message.user.username}
                    className="size-8 rounded-full"
                  />
                ) : (
                  <UserIcon />
                )}
              </>
            )}
          </div>

          <div
            className={`flex flex-col gap-y-1 ${message.userId === userId ? "items-end" : ""}`}
          >
            <span
              className={`${message.userId === userId ? "bg-orange-500" : "bg-neutral-500"} p-2.5 rounded-md`}
            >
              {message.payload}
            </span>

            <span className="text-xs">
              {formatToTimeAgo(message.created_at.toString())}
            </span>
          </div>
        </div>
      ))}

      <form onSubmit={onSubmit} className="flex relative">
        <input
          type="text"
          value={message}
          onChange={onChange}
          className="bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
          required
        />
        <button className="absolute right-0">
          <ArrowUpCircleIcon className="size-10 text-orange-500 transition-colors hover:text-orange-300" />
        </button>
      </form>
    </div>
  );
}
