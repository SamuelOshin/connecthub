"use client";

import { ChatRoom } from "@/components/features/chat/ChatRoom";
import { ChatPreview } from "@/components/features/messages/MessageList";

export function ChatArea({ selectedChat }: { selectedChat: ChatPreview | null }) {
  if (!selectedChat) {
    return (
      <main className="hidden md:flex flex-1 items-center justify-center bg-[#f8f9fc] dark:bg-background-dark">
        <p className="text-sm text-gray-400">Select a conversation to start chatting.</p>
      </main>
    );
  }

  return (
    <main className="hidden md:flex flex-1 flex-col bg-[#f8f9fc] dark:bg-background-dark relative min-w-0 h-full">
      <ChatRoom
        matchId={selectedChat.id}
        matchedUserName={selectedChat.name}
        matchedUserAvatar={selectedChat.avatar}
      />
    </main>
  );
}
