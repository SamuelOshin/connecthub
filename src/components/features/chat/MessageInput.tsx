/**
 * MessageInput component - Compose and send messages.
 */

'use client';

import { useState, useRef, useCallback, KeyboardEvent, ChangeEvent, useEffect } from 'react';
import { Send, Smile, Image as ImageIcon } from 'lucide-react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { cn } from '@/lib/utils';

export interface MessageInputProps {
    onSend: (content: string) => void;
    onTyping?: (isTyping: boolean) => void;
    disabled?: boolean;
    placeholder?: string;
}

/**
 * Message input with send button and typing indicator support.
 */
export function MessageInput({
    onSend,
    onTyping,
    disabled = false,
    placeholder = 'Type a message...',
}: MessageInputProps) {
    const [message, setMessage] = useState('');
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);
    const [emojiTheme, setEmojiTheme] = useState<'light' | 'dark'>('light');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const emojiButtonRef = useRef<HTMLButtonElement>(null);
    const emojiPopoverRef = useRef<HTMLDivElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const updateTheme = () => {
            const isDark = document.documentElement.classList.contains('dark') ||
                window.matchMedia('(prefers-color-scheme: dark)').matches;
            setEmojiTheme(isDark ? 'dark' : 'light');
        };

        updateTheme();
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        media.addEventListener('change', updateTheme);
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => {
            media.removeEventListener('change', updateTheme);
            observer.disconnect();
        };
    }, []);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                emojiPopoverRef.current?.contains(target) ||
                emojiButtonRef.current?.contains(target)
            ) {
                return;
            }
            setIsEmojiOpen(false);
        };

        if (isEmojiOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEmojiOpen]);

    // Handle input change with typing indicator
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            const value = e.target.value;
            setMessage(value);

            // Notify typing
            if (onTyping) {
                onTyping(value.length > 0);

                // Clear previous timeout
                if (typingTimeoutRef.current) {
                    clearTimeout(typingTimeoutRef.current);
                }

                // Set timeout to stop typing after 2 seconds of inactivity
                if (value.length > 0) {
                    typingTimeoutRef.current = setTimeout(() => {
                        onTyping(false);
                    }, 2000);
                }
            }

            // Auto-resize textarea
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
            }
        },
        [onTyping]
    );

    // Handle send
    const handleSend = useCallback(() => {
        const trimmed = message.trim();
        if (!trimmed || disabled) return;

        onSend(trimmed);
        setMessage('');

        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }

        // Stop typing indicator
        if (onTyping) {
            onTyping(false);
        }
    }, [message, disabled, onSend, onTyping]);

    // Handle Enter key
    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        },
        [handleSend]
    );

    const insertEmoji = useCallback((emoji: string) => {
        const textarea = textareaRef.current;
        if (!textarea) {
            setMessage((prev) => `${prev}${emoji}`);
            return;
        }

        const start = textarea.selectionStart ?? message.length;
        const end = textarea.selectionEnd ?? message.length;
        const next = `${message.slice(0, start)}${emoji}${message.slice(end)}`;
        setMessage(next);

        requestAnimationFrame(() => {
            textarea.focus();
            const cursor = start + emoji.length;
            textarea.setSelectionRange(cursor, cursor);
        });
    }, [message]);

    return (
        <div className="p-4 bg-white dark:bg-[#1a242f] border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-end gap-2 max-w-4xl mx-auto">
                {/* Image button (placeholder) */}
                <button
                    type="button"
                    className="mb-1 p-2 text-gray-400 hover:text-pink-500 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    disabled={disabled}
                >
                    <ImageIcon className="w-5 h-5" />
                </button>

                {/* Input area */}
                <div
                    className={cn(
                        'flex-1 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center px-4 py-2',
                        'border border-transparent focus-within:border-primary/50 focus-within:bg-white dark:focus-within:bg-gray-900 transition-all'
                    )}
                    style={{ position: 'relative' }}
                >
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        disabled={disabled}
                        rows={1}
                        className={cn(
                            'w-full bg-transparent border-none focus:ring-0 p-0 text-sm',
                            'text-gray-900 dark:text-white placeholder-gray-500 resize-none max-h-32 outline-none',
                            disabled && 'opacity-50 cursor-not-allowed'
                        )}
                    />
                    <button
                        type="button"
                        ref={emojiButtonRef}
                        onClick={() => setIsEmojiOpen((prev) => !prev)}
                        className="ml-2 text-gray-400 hover:text-yellow-500 transition-colors"
                        disabled={disabled}
                        aria-label="Open emoji picker"
                    >
                        <Smile className="w-5 h-5" />
                    </button>

                    {isEmojiOpen && (
                        <div
                            ref={emojiPopoverRef}
                            className="absolute bottom-12 right-2 z-50 rounded-2xl bg-white dark:bg-[#1a242f] shadow-xl border border-gray-100 dark:border-gray-800 p-2"
                        >
                            <Picker
                                data={data}
                                onEmojiSelect={(emoji: { native: string }) => insertEmoji(emoji.native)}
                                theme={emojiTheme}
                                emojiStyle="apple"
                                previewPosition="none"
                                skinTonePosition="none"
                                searchPosition="top"
                                perLine={8}
                            />
                        </div>
                    )}
                </div>

                {/* Send button */}
                <button
                    type="button"
                    onClick={handleSend}
                    disabled={disabled || !message.trim()}
                    className={cn(
                        'mb-1 p-3 rounded-full transition-all flex items-center justify-center',
                        message.trim()
                            ? 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    )}
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>

            <p className="text-center mt-2 text-[10px] text-gray-400">
                Press Enter to send
            </p>
        </div>
    );
}
