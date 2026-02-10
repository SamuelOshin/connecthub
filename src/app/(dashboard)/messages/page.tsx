"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChatArea } from "@/components/features/messages/ChatArea";
import { ChatPreview, MessageList } from "@/components/features/messages/MessageList";
import { useConversations } from "@/hooks/useConversations";

const formatTime = (iso?: string) => {
  if (!iso) return "";
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export default function MessagesPage() {
  const { data, isLoading } = useConversations();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const router = useRouter();

  const chats: ChatPreview[] = useMemo(() => {
    return (data?.conversations || []).map((c) => ({
      id: c.match_id,
      name: c.matched_user_display_name || "User",
      avatar: c.matched_user_avatar_url || "",
      lastMessage: c.last_message || "",
      time: formatTime(c.last_message_at),
      unread: c.unread_count > 0,
    }));
  }, [data?.conversations]);

  useEffect(() => {
    if (!selectedChatId && chats.length > 0) {
      setSelectedChatId(chats[0].id);
    }
  }, [chats, selectedChatId]);

  const selectedChat = chats.find((c) => c.id === selectedChatId) || null;

  const handleSelectChat = useCallback((id: string) => {
    setSelectedChatId(id);

    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
      router.push(`/chat/${id}`);
    }
  }, [router]);

  return (
    <div className="flex h-full overflow-hidden">
      <MessageList
        chats={chats}
        isLoading={isLoading}
        selectedId={selectedChatId}
        onSelect={handleSelectChat}
      />
      <ChatArea selectedChat={selectedChat} />
    </div>
  );
}
