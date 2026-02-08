/**
 * ConversationList component - List of all chat conversations.
 */

'use client';

import { useConversations } from '@/hooks/useConversations';
import { ConversationItem } from './ConversationItem';
import { MessageSquare, Loader2 } from 'lucide-react';
import Link from 'next/link';

/**
 * List of all active conversations.
 */
export function ConversationList() {
    const { data, isLoading, error } = useConversations();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p>Failed to load conversations</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 text-primary hover:underline"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!data?.conversations || data.conversations.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center px-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No conversations yet
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Start swiping to find matches and begin chatting!
                </p>
                <Link
                    href="/discover"
                    className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                    Start Discovering
                </Link>
            </div>
        );
    }

    return (
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {data.conversations.map((conversation) => (
                <ConversationItem
                    key={conversation.match_id}
                    matchId={conversation.match_id}
                    userId={conversation.matched_user_id}
                    userName={conversation.matched_user_display_name}
                    userAvatar={conversation.matched_user_avatar_url}
                    lastMessage={conversation.last_message}
                    lastMessageAt={conversation.last_message_at}
                    lastMessageIsMine={conversation.last_message_is_mine}
                    unreadCount={conversation.unread_count}
                    isExpiringSoon={conversation.is_expiring_soon}
                    hoursUntilExpiry={conversation.hours_until_expiry}
                />
            ))}
        </div>
    );
}
