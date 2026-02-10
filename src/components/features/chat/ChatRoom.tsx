/**
 * ChatRoom component - Full chat interface for a match.
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRealtimeMessages, Message } from '@/hooks/useRealtimeMessages';
import { usePresence } from '@/hooks/usePresence';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { TypingIndicator } from './TypingIndicator';
import { Loader2, ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';
import Link from 'next/link';

export interface ChatRoomProps {
    matchId: string;
    matchedUserName?: string;
    matchedUserAvatar?: string;
}

/**
 * Full chat room interface with real-time messages.
 */
export function ChatRoom({
    matchId,
    matchedUserName,
    matchedUserAvatar,
    onBack,
}: ChatRoomProps & { onBack?: () => void }) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const readDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isChatVisibleRef = useRef(true);
    const isNearBottomRef = useRef(true);

    const {
        messages,
        isLoading,
        isConnected,
        sendMessage,
        isSending,
        markAsRead,
        otherUserReadCursor,
    } = useRealtimeMessages(matchId);

    const {
        isTyping: otherUserTyping,
        setIsTyping,
    } = usePresence(matchId);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        const handleVisibility = () => {
            isChatVisibleRef.current = document.visibilityState === 'visible';
        };

        const handleScroll = () => {
            const container = messagesContainerRef.current;
            if (!container) return;
            const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
            isNearBottomRef.current = distanceFromBottom < 120;
        };

        handleVisibility();
        handleScroll();

        document.addEventListener('visibilitychange', handleVisibility);
        const container = messagesContainerRef.current;
        container?.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibility);
            container?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Mark messages as read when entering chat
    useEffect(() => {
        markAsRead();
    }, [markAsRead]);

    // Mark incoming messages as read while viewing the chat
    useEffect(() => {
        const lastUnread = [...messages]
            .reverse()
            .find((msg) => !msg.is_mine && !msg.read_at);

        if (lastUnread && isChatVisibleRef.current && isNearBottomRef.current) {
            if (readDebounceRef.current) {
                clearTimeout(readDebounceRef.current);
            }

            readDebounceRef.current = setTimeout(() => {
                markAsRead(lastUnread.id);
            }, 400);
        }
    }, [messages, markAsRead]);

    useEffect(() => {
        return () => {
            if (readDebounceRef.current) {
                clearTimeout(readDebounceRef.current);
            }
        };
    }, []);

    // Handle send message
    const handleSend = useCallback(
        (content: string) => {
            sendMessage({ content, message_type: 'text' });
            setIsTyping(false);
        },
        [sendMessage, setIsTyping]
    );

    // Group messages by date
    const groupMessagesByDate = (msgs: Message[]) => {
        const groups: { date: string; messages: Message[] }[] = [];
        let currentDate = '';

        for (const msg of msgs) {
            const msgDate = new Date(msg.created_at).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
            });

            if (msgDate !== currentDate) {
                groups.push({ date: msgDate, messages: [] });
                currentDate = msgDate;
            }

            groups[groups.length - 1].messages.push(msg);
        }

        return groups;
    };

    const messageGroups = groupMessagesByDate(messages);

    const isMessageRead = (msg: Message) => {
        if (!msg.is_mine) return false;

        if (otherUserReadCursor?.last_read_at) {
            return new Date(msg.created_at) <= new Date(otherUserReadCursor.last_read_at);
        }

        return false;
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#0f1923]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a242f] shrink-0">
                <div className="flex items-center gap-3">
                    {onBack ? (
                        <button
                            onClick={onBack}
                            className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                    ) : (
                        <Link
                            href="/matches"
                            className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </Link>
                    )}

                    <div
                        className="h-10 w-10 rounded-full bg-cover bg-center bg-gray-200 dark:bg-gray-700"
                        style={{
                            backgroundImage: matchedUserAvatar
                                ? `url('${matchedUserAvatar}')`
                                : undefined,
                        }}
                    >
                        {!matchedUserAvatar && (
                            <div className="h-full w-full flex items-center justify-center text-lg font-medium text-gray-500">
                                {matchedUserName?.[0]?.toUpperCase() || '?'}
                            </div>
                        )}
                    </div>

                    <div>
                        <h2 className="font-semibold text-gray-900 dark:text-white">
                            {matchedUserName || 'User'}
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {isConnected ? (
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    Online
                                </span>
                            ) : (
                                'Connecting...'
                            )}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <Video className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Messages area */}
            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
            >
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div
                            className="w-20 h-20 rounded-full bg-cover bg-center bg-gray-200 dark:bg-gray-700 mb-4"
                            style={{
                                backgroundImage: matchedUserAvatar
                                    ? `url('${matchedUserAvatar}')`
                                    : undefined,
                            }}
                        />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            You matched with {matchedUserName || 'this person'}!
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Send a message to start the conversation
                        </p>
                    </div>
                ) : (
                    <>
                        {messageGroups.map((group, groupIndex) => (
                            <div key={groupIndex}>
                                {/* Date separator */}
                                <div className="flex justify-center mb-4">
                                    <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                                        {group.date}
                                    </span>
                                </div>

                                {/* Messages */}
                                <div className="space-y-3">
                                    {group.messages.map((msg, msgIndex) => (
                                        <MessageBubble
                                            key={msg.id}
                                            content={msg.content}
                                            timestamp={msg.created_at}
                                            isMine={msg.is_mine}
                                            isRead={isMessageRead(msg)}
                                            status={msg.status}
                                            senderName={msg.sender?.display_name || matchedUserName}
                                            senderAvatar={msg.sender?.avatar_url || matchedUserAvatar}
                                            showAvatar={
                                                // Show avatar for first message in sequence from same sender
                                                msgIndex === 0 ||
                                                group.messages[msgIndex - 1].is_mine !== msg.is_mine
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {otherUserTyping && (
                            <TypingIndicator name={matchedUserName} />
                        )}

                        {/* Scroll anchor */}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input area */}
            <MessageInput
                onSend={handleSend}
                onTyping={setIsTyping}
                disabled={isSending}
            />
        </div>
    );
}
