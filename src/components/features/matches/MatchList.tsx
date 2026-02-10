'use client';

import { Match, useMatches, useMatchStats } from '@/hooks/useMatches';
import { ProfileDetailModal } from '@/components/features/discovery/ProfileDetailModal';
import { DiscoveryProfile } from '@/hooks/useDiscovery';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useRef, useState, type PointerEvent, type TouchEvent } from 'react';
import { LikesYouModal } from './LikesYouModal';
import { useRouter } from 'next/navigation';

interface MatchListProps {
    matches: Match[];
    isLoading: boolean;
}

export const MatchList = ({ matches, isLoading }: MatchListProps) => {
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [isLikesYouModalOpen, setIsLikesYouModalOpen] = useState(false);
    const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
    const [quickMatch, setQuickMatch] = useState<Match | null>(null);
    const [previewProfile, setPreviewProfile] = useState<DiscoveryProfile | null>(null);
    const [previewMatchId, setPreviewMatchId] = useState<string | null>(null);
    const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const suppressClickRef = useRef(false);
    const router = useRouter();
    const { likesYouCount } = useMatchStats();
    const { unmatch } = useMatches();

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setCurrentUserId(user?.id || null);
        };
        fetchUser();
    }, []);

    const openQuickActions = (match: Match) => {
        setQuickMatch(match);
        setIsQuickActionsOpen(true);
    };

    const closeQuickActions = () => {
        setIsQuickActionsOpen(false);
        setQuickMatch(null);
    };

    const handleLongPressStart = (match: Match) => (event: PointerEvent | TouchEvent) => {
        if ('pointerType' in event && event.pointerType === 'mouse') return;
        suppressClickRef.current = false;
        if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = setTimeout(() => {
            suppressClickRef.current = true;
            openQuickActions(match);
        }, 450);
    };

    const handleLongPressEnd = () => {
        if (longPressTimerRef.current) {
            clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }
    };

    const handleContextMenu = (match: Match) => (event: React.MouseEvent) => {
        event.preventDefault();
        openQuickActions(match);
    };

    const handleOpenChat = (matchId: string) => () => {
        if (suppressClickRef.current) {
            suppressClickRef.current = false;
            return;
        }
        router.push(`/chat/${matchId}`);
    };

    const handleUnmatch = async () => {
        if (!quickMatch) return;
        const confirmed = window.confirm('Unmatch this user?');
        if (!confirmed) return;
        await unmatch({ matchId: quickMatch.id });
        closeQuickActions();
    };

    const buildPreviewProfile = (match: Match): DiscoveryProfile => {
        const otherUser = match.matched_user;
        const photoUrl = otherUser.primary_photo_url || '/placeholder.jpg';

        return {
            id: otherUser.id,
            display_name: otherUser.display_name || 'User',
            age: otherUser.age || 0,
            gender: 'unknown',
            bio: '',
            prompts: [],
            photos: [
                {
                    id: `${otherUser.id}-primary`,
                    url: photoUrl,
                    position: 0,
                }
            ],
            distance_km: 0,
            is_verified: false,
            passions: [],
            match_score: 0,
            match_reasons: [],
            response_badge: otherUser.response_badge || undefined,
        };
    };

    const openProfilePreview = (match: Match) => {
        setPreviewProfile(buildPreviewProfile(match));
        setPreviewMatchId(match.id);
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-3/4 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
                ))}
            </div>
        );
    }

    const activeMatches = matches.filter(m => m.status === 'active');
    const newMatches = activeMatches.filter(m => !m.has_started_chatting);
    const conversions = activeMatches.filter(m => m.has_started_chatting);

    // Use real likes count from API
    const likesCount = likesYouCount;

    return (
        <div className="space-y-10 pb-20">
            {/* New Matches Section */}
            <div className="px-4">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        New Matches
                    </h2>
                    <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
                        {newMatches.length + (likesCount > 0 ? 1 : 0)}
                    </span>
                </div>

                <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                    {/* Likes You Circle */}
                    <div
                        className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group"
                        onClick={() => setIsLikesYouModalOpen(true)}
                    >
                        <div className="relative w-18 h-18 rounded-full border-2 border-dashed border-yellow-400 p-1 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <div className="w-full h-full bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-yellow-500 text-[28px] icon-filled">favorite</span>
                            </div>
                            {likesCount > 0 && (
                                <div className="absolute -top-1 -right-1 bg-yellow-400 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900">
                                    {likesCount}
                                </div>
                            )}
                        </div>
                        <span className="text-xs font-bold text-yellow-600 dark:text-yellow-500">Likes You</span>
                    </div>

                    {/* LikesYou Modal */}
                    <LikesYouModal
                        isOpen={isLikesYouModalOpen}
                        onClose={() => setIsLikesYouModalOpen(false)}
                    />

                    {/* New Matches List */}
                    {newMatches.map((match) => {
                        const otherUser = match.matched_user;
                        return (
                            <button
                                key={match.id}
                                type="button"
                                className="flex flex-col items-center gap-2 shrink-0 group"
                                onClick={handleOpenChat(match.id)}
                                onPointerDown={handleLongPressStart(match)}
                                onPointerUp={handleLongPressEnd}
                                onPointerLeave={handleLongPressEnd}
                                onTouchStart={handleLongPressStart(match)}
                                onTouchEnd={handleLongPressEnd}
                                onTouchCancel={handleLongPressEnd}
                                onContextMenu={handleContextMenu(match)}
                                aria-label={`Open chat with ${otherUser.display_name || 'user'}`}
                            >
                                <div className="relative w-18 h-18 rounded-full p-0.5 bg-linear-to-tr from-pink-500 to-purple-500 group-hover:scale-105 transition-transform">
                                    <div className="w-full h-full rounded-full border-2 border-white dark:border-gray-900 overflow-hidden relative">
                                        <img
                                            src={otherUser.primary_photo_url || '/placeholder.jpg'}
                                            alt={otherUser.display_name || 'User'}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute bottom-1 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                                </div>
                                <span className="text-xs font-medium text-gray-900 dark:text-white">
                                    {otherUser.display_name || 'User'}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Your Matches Grid */}
            <div className="px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Your Matches
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                        Sort by: <span className="font-semibold text-gray-900 dark:text-white">Recent Activity</span>
                        <span className="material-symbols-outlined text-[20px]">expand_more</span>
                    </div>
                </div>

                {activeMatches.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500">No active matches found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {activeMatches.map((match, idx) => {
                            const otherUser = match.matched_user;
                            const isOnline = idx === 0; // Mock data for demo
                            const isSuperLike = idx === 3; // Mock data
                            const isNewMatch = !match.has_started_chatting && idx === 1; // Mock data

                            return (
                                <button
                                    key={match.id}
                                    type="button"
                                    onClick={handleOpenChat(match.id)}
                                    onPointerDown={handleLongPressStart(match)}
                                    onPointerUp={handleLongPressEnd}
                                    onPointerLeave={handleLongPressEnd}
                                    onTouchStart={handleLongPressStart(match)}
                                    onTouchEnd={handleLongPressEnd}
                                    onTouchCancel={handleLongPressEnd}
                                    onContextMenu={handleContextMenu(match)}
                                    className="group relative aspect-3/4 rounded-3xl overflow-hidden cursor-pointer text-left"
                                    aria-label={`Open chat with ${otherUser.display_name || 'user'}`}
                                >
                                    <img
                                        src={otherUser.primary_photo_url || '/placeholder.jpg'}
                                        alt={otherUser.display_name || 'User'}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
                                        {isOnline && (
                                            <span className="px-2.5 py-1 bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                                                Online
                                            </span>
                                        )}
                                        {isNewMatch && (
                                            <span className="px-2.5 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                                                New Match
                                            </span>
                                        )}
                                        {isSuperLike && (
                                            <span className="px-2.5 py-1 bg-purple-500/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px] icon-filled">star</span>
                                                Super Like
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold leading-tight">
                                                    {otherUser.display_name || 'User'},
                                                </h3>
                                                <p className="text-lg font-medium opacity-90 mb-1">
                                                    {otherUser.age}
                                                </p>

                                                <div className="flex items-center gap-1 text-xs opacity-80 mb-3">
                                                    {isOnline ? (
                                                        <span className="flex items-center gap-1 text-green-400 font-medium">
                                                            <span className="size-1.5 bg-green-400 rounded-full"></span>
                                                            Active now
                                                        </span>
                                                    ) : (
                                                        <span>{match.last_message_preview ? 'Active 10m ago' : '2 miles away'}</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Chat Button Circle */}
                                            <div className="mb-2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-lg group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-[20px] icon-filled">chat_bubble</span>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {isQuickActionsOpen && quickMatch && (
                <div className="fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={closeQuickActions}
                    />
                    <div className="absolute inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center">
                        <div className="w-full md:max-w-md bg-white dark:bg-[#1a242f] rounded-t-3xl md:rounded-2xl p-6 shadow-2xl">
                            <div className="flex items-center gap-4">
                                <div className="h-14 w-14 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${quickMatch.matched_user.primary_photo_url || '/placeholder.jpg'}')` }} />
                                <div>
                                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                                        {quickMatch.matched_user.display_name || 'User'}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Quick actions</p>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-3">
                                <button
                                    className="w-full rounded-xl bg-primary text-white py-3 text-sm font-semibold"
                                    onClick={() => {
                                        closeQuickActions();
                                        router.push(`/chat/${quickMatch.id}`);
                                    }}
                                >
                                    Open chat
                                </button>
                                <button
                                    className="w-full rounded-xl border border-gray-200 text-gray-700 py-3 text-sm font-semibold hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                                    onClick={() => {
                                        closeQuickActions();
                                        openProfilePreview(quickMatch);
                                    }}
                                >
                                    View profile
                                </button>
                                <button
                                    className="w-full rounded-xl border border-red-200 text-red-600 py-3 text-sm font-semibold hover:bg-red-50 dark:border-red-800/60 dark:text-red-400 dark:hover:bg-red-900/20"
                                    onClick={handleUnmatch}
                                >
                                    Unmatch
                                </button>
                                <button
                                    className="w-full rounded-xl border border-gray-200 text-gray-600 py-3 text-sm font-semibold hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                                    onClick={closeQuickActions}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {previewProfile && (
                <ProfileDetailModal
                    isOpen={!!previewProfile}
                    onClose={() => {
                        setPreviewProfile(null);
                        setPreviewMatchId(null);
                    }}
                    profile={previewProfile}
                    onAction={(type) => {
                        if (type === 'LIKE') {
                            if (previewMatchId) {
                                router.push(`/chat/${previewMatchId}`);
                            }
                        }
                        setPreviewProfile(null);
                        setPreviewMatchId(null);
                    }}
                />
            )}
        </div>
    );
};
