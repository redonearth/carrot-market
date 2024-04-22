"use client";

import { useState } from "react";

import Image from "next/image";

import { InitialChatMessages } from "@/app/chats/[id]/page";
import { formatToTimeAgo } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";

interface ChatMessageListProps {
  initialMessages: InitialChatMessages;
  userId: number;
}

export default function ChatMessageList({
  initialMessages,
  userId,
}: ChatMessageListProps) {
  const [messages, setMessages] = useState(initialMessages);

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
    </div>
  );
}
