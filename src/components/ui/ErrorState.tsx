/**
 * ErrorState - Reusable page-level error component.
 */

'use client';

import { AlertTriangle, WifiOff, ServerCrash, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
    /** Error title - e.g. "Connection Lost" */
    title?: string;
    /** Error message - the actual error description */
    message?: string;
    /** Retry callback - called when user clicks retry button */
    onRetry?: () => void;
    /** Visual variant for different error types */
    variant?: 'default' | 'network' | 'server';
    /** Additional className */
    className?: string;
}

const iconMap = {
    default: AlertTriangle,
    network: WifiOff,
    server: ServerCrash,
};

const colorMap = {
    default: 'bg-amber-100 dark:bg-amber-900/20 text-amber-500',
    network: 'bg-gray-100 dark:bg-gray-800 text-gray-500',
    server: 'bg-red-100 dark:bg-red-900/20 text-red-500',
};

/**
 * Display a full-page error state with icon, message, and optional retry button.
 * 
 * @example
 * <ErrorState
 *   title="Connection Lost"
 *   message="Unable to connect. Check your internet."
 *   variant="network"
 *   onRetry={() => refetch()}
 * />
 */
export function ErrorState({
    title = 'Something went wrong',
    message = 'An unexpected error occurred. Please try again.',
    onRetry,
    variant = 'default',
    className = '',
}: ErrorStateProps) {
    const Icon = iconMap[variant];
    const colorClass = colorMap[variant];

    return (
        <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${colorClass}`}>
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs">
                {message}
            </p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
                >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                </button>
            )}
        </div>
    );
}
