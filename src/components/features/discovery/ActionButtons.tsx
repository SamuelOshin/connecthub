'use client';

import { cn } from '@/lib/utils';

interface ActionButtonsProps {
    onPass: () => void;
    onLike: () => void;
    onSuperLike: () => void;
    onUndo?: () => void;
    disabled?: boolean;
}

export const ActionButtons = ({
    onPass,
    onLike,
    onSuperLike,
    onUndo,
    disabled = false
}: ActionButtonsProps) => {
    return (
        <div className="flex items-center justify-center gap-4 px-4 py-4 w-full max-w-sm mx-auto">
            {/* Undo Button */}
            <button
                onClick={onUndo}
                disabled={disabled || !onUndo}
                className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-yellow-500 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-110 active:scale-95 transition-all duration-200",
                    (disabled || !onUndo) && "opacity-40 cursor-not-allowed hover:scale-100"
                )}
                aria-label="Undo"
            >
                <span className="material-symbols-outlined text-[22px]">undo</span>
            </button>

            {/* Pass Button */}
            <button
                onClick={onPass}
                disabled={disabled}
                className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-rose-500 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-110 active:scale-95 transition-all duration-200",
                    disabled && "opacity-50 cursor-not-allowed hover:scale-100"
                )}
                aria-label="Pass"
            >
                <span className="material-symbols-outlined text-[28px]">close</span>
            </button>

            {/* Like Button - Centered larger blue button */}
            <button
                onClick={onLike}
                disabled={disabled}
                className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center bg-primary text-white shadow-lg shadow-primary/30 hover:scale-110 hover:shadow-primary/50 active:scale-95 transition-all duration-200",
                    disabled && "opacity-50 cursor-not-allowed hover:scale-100"
                )}
                aria-label="Like"
            >
                <span className="material-symbols-outlined text-[32px] icon-filled">favorite</span>
            </button>

            {/* Super Like Button */}
            <button
                onClick={onSuperLike}
                disabled={disabled}
                className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-purple-500 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-110 active:scale-95 transition-all duration-200",
                    disabled && "opacity-50 cursor-not-allowed hover:scale-100"
                )}
                aria-label="Super Like"
            >
                <span className="material-symbols-outlined text-[22px] icon-filled">star</span>
            </button>
        </div>
    );
};
