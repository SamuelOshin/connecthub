/**
 * TypingIndicator component - Shows when the other person is typing.
 */

'use client';

import { cn } from '@/lib/utils';

export interface TypingIndicatorProps {
    name?: string;
    className?: string;
}

/**
 * Animated typing indicator.
 */
export function TypingIndicator({ name, className }: TypingIndicatorProps) {
    return (
        <div className={cn('flex items-center gap-2 px-4 py-2', className)}>
            {/* Animated dots */}
            <div className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                />
                <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                />
                <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                />
            </div>

            {name && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    {name} is typing...
                </span>
            )}
        </div>
    );
}
