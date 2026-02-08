'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpirationTimerProps {
    expiresAt: string;
    className?: string;
    compact?: boolean;
}

export const ExpirationTimer = ({ expiresAt, className, compact = false }: ExpirationTimerProps) => {
    const [timeLeft, setTimeLeft] = useState('');
    const [isUrgent, setIsUrgent] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(expiresAt).getTime() - new Date().getTime();

            if (difference <= 0) {
                setTimeLeft('Expired');
                return;
            }

            const hours = Math.floor(difference / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

            setIsUrgent(hours < 12);

            if (hours > 24) {
                const days = Math.floor(hours / 24);
                setTimeLeft(`${days}d left`);
            } else {
                setTimeLeft(`${hours}h ${minutes}m`);
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

        return () => clearInterval(timer);
    }, [expiresAt]);

    if (!timeLeft) return null;

    return (
        <div className={cn(
            "flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full",
            isUrgent
                ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 animate-pulse"
                : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
            className
        )}>
            <Clock size={compact ? 12 : 14} />
            <span>{timeLeft}</span>
        </div>
    );
};
