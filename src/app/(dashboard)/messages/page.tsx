import { ChatArea } from "@/components/features/messages/ChatArea";
import { ChatPreview, MessageList } from "@/components/features/messages/MessageList";

const MOCK_CHATS: ChatPreview[] = [
  {
    id: "1",
    name: "Sarah",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    lastMessage: "I love hiking too! Which trail is your fav?",
    time: "Now",
    isActive: true
  },
  {
    id: "2",
    name: "Taylor",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    lastMessage: "Are we still on for coffee tomorrow?",
    time: "2h ago"
  },
  {
    id: "3",
    name: "Emily",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    lastMessage: "Haha that's hilarious! 😂",
    time: "Yesterday"
  },
];

export default function MessagesPage() {
  return (
    <div className="flex h-full overflow-hidden">
      <MessageList chats={MOCK_CHATS} />
      <ChatArea />
    </div>
  );
}
