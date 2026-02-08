/**
 * MessageBubble component - Individual chat message display.
 */

'use client';

import { cn } from '@/lib/utils';
import { Check, CheckCheck } from 'lucide-react';

export interface MessageBubbleProps {
    content: string;
    timestamp: string;
    isMine: boolean;
    isRead?: boolean;
    status?: 'sending' | 'sent' | 'error';
    senderName?: string;
    senderAvatar?: string;
    showAvatar?: boolean;
}

/**
 * Individual message bubble with read receipts.
 */
export function MessageBubble({
    content,
    timestamp,
    isMine,
    isRead = false,
    status = 'sent',
    senderName,
    senderAvatar,
    showAvatar = true,
}: MessageBubbleProps) {
    // Format timestamp
    const formatTime = (iso: string) => {
        const date = new Date(iso);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    return (
        <div className={cn('flex flex-col gap-1 max-w-[80%]', isMine ? 'ml-auto items-end' : 'items-start')}>
            <div className={cn('flex items-end gap-2', isMine ? 'flex-row-reverse' : 'flex-row')}>
                {/* Avatar for other user */}
                {!isMine && (
                    <div
                        className="h-8 w-8 rounded-full bg-cover bg-center shrink-0 bg-gray-200 dark:bg-gray-700"
                        style={{
                            backgroundImage: senderAvatar
                                ? `url('${senderAvatar}')`
                                : undefined,
                            opacity: showAvatar ? 1 : 0, // Keep space reserved even if hidden
                        }}
                    >
                        {!senderAvatar && showAvatar && (
                            <div className="h-full w-full flex items-center justify-center text-xs font-medium text-gray-500">
                                {senderName?.[0]?.toUpperCase() || '?'}
                            </div>
                        )}
                    </div>
                )}

                {/* Message content */}
                <div
                    className={cn(
                        'px-4 py-3 rounded-2xl text-sm leading-relaxed',
                        isMine
                            ? 'bg-primary text-white rounded-br-md'
                            : 'bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-bl-md'
                    )}
                >
                    {content}
                </div>
            </div>

            {/* Timestamp and read status */}
            <div
                className={cn(
                    'flex items-center gap-1 text-[10px] text-gray-400',
                    isMine ? 'pr-1' : 'pl-11' // Add padding-left to align with bubble text (8px avatar + 8px gap + some offset)
                )}
            >
                <span>{formatTime(timestamp)}</span>
                {isMine && (
                    status === 'sending' ? (
                        <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    ) : isRead ? (
                        <CheckCheck className="w-3.5 h-3.5 text-primary" />
                    ) : (
                        <Check className="w-3.5 h-3.5" />
                    )
                )}
            </div>
        </div>
    );
}
