/**
 * ConversationItem component - Single conversation row in list.
 */

'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

export interface ConversationItemProps {
    matchId: string;
    userId: string;
    userName?: string;
    userAvatar?: string;
    lastMessage?: string;
    lastMessageAt?: string;
    lastMessageIsMine?: boolean;
    unreadCount: number;
    isExpiringSoon?: boolean;
    hoursUntilExpiry?: number;
}

/**
 * Single conversation row.
 */
export function ConversationItem({
    matchId,
    userName,
    userAvatar,
    lastMessage,
    lastMessageAt,
    lastMessageIsMine,
    unreadCount,
    isExpiringSoon,
    hoursUntilExpiry,
}: ConversationItemProps) {
    // Format time ago
    const timeAgo = lastMessageAt
        ? formatDistanceToNow(new Date(lastMessageAt), { addSuffix: false })
        : null;

    return (
        <Link
            href={`/chat/${matchId}`}
            className={cn(
                'flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
                unreadCount > 0 && 'bg-primary/5'
            )}
        >
            {/* Avatar */}
            <div className="relative shrink-0">
                <div
                    className="h-12 w-12 rounded-full bg-cover bg-center bg-gray-200 dark:bg-gray-700"
                    style={{
                        backgroundImage: userAvatar ? `url('${userAvatar}')` : undefined,
                    }}
                >
                    {!userAvatar && (
                        <div className="h-full w-full flex items-center justify-center text-lg font-medium text-gray-500">
                            {userName?.[0]?.toUpperCase() || '?'}
                        </div>
                    )}
                </div>

                {/* Unread badge */}
                {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <h3
                        className={cn(
                            'text-sm font-semibold truncate',
                            unreadCount > 0
                                ? 'text-gray-900 dark:text-white'
                                : 'text-gray-700 dark:text-gray-300'
                        )}
                    >
                        {userName || 'User'}
                    </h3>
                    {timeAgo && (
                        <span className="text-xs text-gray-400 shrink-0">
                            {timeAgo}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <p
                        className={cn(
                            'text-sm truncate flex-1',
                            unreadCount > 0
                                ? 'text-gray-700 dark:text-gray-200 font-medium'
                                : 'text-gray-500 dark:text-gray-400'
                        )}
                    >
                        {lastMessageIsMine && <span className="text-gray-400">You: </span>}
                        {lastMessage || 'No messages yet - say hi! 👋'}
                    </p>

                    {/* Expiring soon indicator */}
                    {isExpiringSoon && hoursUntilExpiry && (
                        <div className="flex items-center gap-1 text-xs text-orange-500 shrink-0">
                            <Clock className="w-3 h-3" />
                            <span>{Math.round(hoursUntilExpiry)}h</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
