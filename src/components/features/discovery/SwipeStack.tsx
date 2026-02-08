'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDiscovery } from '@/hooks/useDiscovery';
import { SwipeCard } from './SwipeCard';
import { ActionButtons } from './ActionButtons';
import { CommentModal } from './CommentModal';
import { ProfileDetailModal } from './ProfileDetailModal';
import { RefreshCw, Search } from 'lucide-react';

export const SwipeStack = () => {
    const { profiles, isLoading, swipe, isSwiping, refetch, isUsingMock } = useDiscovery();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<'RIGHT' | 'SUPER_LIKE' | null>(null);

    const currentProfile = profiles[currentIndex];
    // Determine next profile for background card
    const nextProfile = profiles[currentIndex + 1];

    // Wrap in useCallback to prevent effect thrashing
    const handleSwipe = useCallback(async (direction: 'LEFT' | 'RIGHT' | 'SUPER_LIKE', comment?: string) => {
        if (!currentProfile) return;

        if (direction === 'LEFT') {
            try {
                // Pass - immediate
                await swipe({ profile_id: currentProfile.id, direction });
            } catch (error) {
                console.error('Pass failed:', error);
                // Even if it fails server-side, we should probably move to next card to avoid getting stuck
                // But ideally we show a toast. For now, we allow progression to keep UX fluid.
            } finally {
                nextCard();
            }
        } else {
            // Like / Super Like - needs comment (already handled by modal flow)
            try {
                await swipe({
                    profile_id: currentProfile.id,
                    direction,
                    comment
                });
                nextCard();
            } catch (error) {
                console.error('Swipe failed:', error);
                // Could show toast here
            }
        }
    }, [currentProfile, swipe]);

    const nextCard = () => {
        setIsCommentModalOpen(false);
        setIsDetailModalOpen(false);
        setPendingAction(null);
        setCurrentIndex(prev => prev + 1);
    };

    // Triggered by card drag-right or buttons
    const initiateLike = useCallback((type: 'RIGHT' | 'SUPER_LIKE') => {
        setPendingAction(type);
        // If detail modal is open, we close it first? No, we likely want to just open comment modal on top or swap
        // User flow: Detail -> Send Message -> Comment Modal -> Send
        setIsDetailModalOpen(false);
        setIsCommentModalOpen(true);
    }, []);

    const onCommentSubmit = (comment: string) => {
        if (pendingAction) {
            handleSwipe(pendingAction, comment);
        }
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // If any modal is open, disable swipe shortcuts (unless we want Esc to close)
            // But we specifically want ArrowUp to OPEN detail modal if it's closed
            if (isSwiping || isCommentModalOpen || isLoading || !currentProfile) return;

            // If detail modal is open
            if (isDetailModalOpen) {
                if (e.key === 'Escape') setIsDetailModalOpen(false);
                return;
            }

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    handleSwipe('LEFT');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    initiateLike('RIGHT');
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    // Open Profile Details
                    setIsDetailModalOpen(true);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSwiping, isCommentModalOpen, isDetailModalOpen, isLoading, currentProfile, handleSwipe, initiateLike]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[600px] w-full max-w-sm mx-auto animate-pulse">
                <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
                <div className="flex gap-6 mt-8">
                    <div className="w-14 h-14 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    <div className="w-14 h-14 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                </div>
            </div>
        );
    }

    // Empty State - No more profiles
    if (!currentProfile) {
        return (
            <div className="flex flex-col items-center justify-center h-[600px] w-full max-w-sm mx-auto text-center px-6">
                <div className="w-24 h-24 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mb-6 text-rose-500">
                    <Search size={40} />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    That&apos;s everyone for now
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-xs">
                    Check back later for new matches nearby, or adjust your preferences to see more people.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            setCurrentIndex(0);
                            refetch();
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-medium hover:scale-105 transition-transform"
                    >
                        <RefreshCw size={18} />
                        Refresh
                    </button>
                    {isUsingMock && (
                        <div className="px-4 py-3 bg-yellow-100 text-yellow-800 rounded-full font-medium flex items-center gap-2 dark:bg-yellow-900 dark:text-yellow-300">
                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                            Offline Mode
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="relative w-full max-w-sm h-[600px] mx-auto perspective-1000">
                {/* Offline Mode Indicator */}
                {isUsingMock && (
                    <div className="absolute top-4 right-4 bg-yellow-100/90 backdrop-blur-sm text-yellow-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-yellow-900/90 dark:text-yellow-300 z-50 shadow-sm flex items-center gap-1.5 border border-yellow-200 dark:border-yellow-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                        Offline Mode
                    </div>
                )}

                {/* Background Card (Preload) */}
                {nextProfile && (
                    <SwipeCard
                        key={nextProfile.id}
                        profile={nextProfile}
                        active={false}
                        onSwipe={() => { }}
                    />
                )}

                {/* Active Card */}
                <SwipeCard
                    key={currentProfile.id}
                    profile={currentProfile}
                    active={true}
                    onSwipe={(direction) => {
                        if (direction === 'LEFT') {
                            handleSwipe('LEFT');
                        }
                        // Right/Super like handled by onCommentOpen via SwipeCard logic
                        // But SwipeCard directly calling onSwipe needs logic check
                    }}
                    onCommentOpen={() => initiateLike('RIGHT')} // Default drag right = like
                />
            </div>

            <div className="mt-6">
                <ActionButtons
                    onPass={() => handleSwipe('LEFT')}
                    onLike={() => initiateLike('RIGHT')}
                    onSuperLike={() => initiateLike('SUPER_LIKE')}
                    disabled={isSwiping}
                />
            </div>

            <CommentModal
                isOpen={isCommentModalOpen}
                onClose={() => setIsCommentModalOpen(false)}
                onSubmit={onCommentSubmit}
                profileName={currentProfile.display_name}
                isLoading={isSwiping}
            />

            <ProfileDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                profile={currentProfile}
                onAction={(type) => {
                    if (type === 'LIKE') initiateLike('RIGHT');
                    else if (type === 'PASS') handleSwipe('LEFT');
                    else if (type === 'SUPER_LIKE') initiateLike('SUPER_LIKE');
                }}
            />
        </>
    );
};
