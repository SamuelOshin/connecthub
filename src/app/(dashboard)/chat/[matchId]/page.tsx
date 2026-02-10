/**
 * Chat page for a specific match conversation.
 */


'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useMatches } from '@/hooks/useMatches';
import { ChatRoom } from '@/components/features/chat/ChatRoom';

export default function ChatPage() {
    const params = useParams();
    const router = useRouter();
    const matchId = params.matchId as string;
    const { matches, isLoading } = useMatches();
    const [isSmallScreen, setIsSmallScreen] = useState<boolean | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const media = window.matchMedia('(max-width: 767px)');
        const update = () => setIsSmallScreen(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        if (matchId && isSmallScreen === false) {
            router.replace(`/messages?matchId=${matchId}`);
        }
    }, [matchId, router, isSmallScreen]);

    const match = useMemo(() => matches.find((m) => m.id === matchId), [matches, matchId]);

    if (isSmallScreen === null) {
        return (
            <div className="flex items-center justify-center h-screen bg-white dark:bg-[#0f1923]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!isSmallScreen) {
        return (
            <div className="flex items-center justify-center h-screen bg-white dark:bg-[#0f1923]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isLoading || !match) {
        return (
            <div className="flex items-center justify-center h-screen bg-white dark:bg-[#0f1923]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="h-screen bg-white dark:bg-[#0f1923]">
            <ChatRoom
                matchId={match.id}
                matchedUserName={match.matched_user.display_name || 'User'}
                matchedUserAvatar={match.matched_user.primary_photo_url || undefined}
            />
        </div>
    );
}
