'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLikesYou, LikerProfile } from '@/hooks/useMatches';
import { useDiscovery } from '@/hooks/useDiscovery';
import { ProfileDetailModal } from '@/components/features/discovery/ProfileDetailModal';
import { CommentModal } from '@/components/features/discovery/CommentModal';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useProfile } from '@/hooks/useProfile';

interface LikesYouModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LikesYouModal = ({ isOpen, onClose }: LikesYouModalProps) => {
    const [mounted, setMounted] = useState(false);
    const [selectedLiker, setSelectedLiker] = useState<LikerProfile | null>(null);
    const [matchCelebration, setMatchCelebration] = useState<{ name: string; photo: string; yourPhoto: string } | null>(null);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [pendingLiker, setPendingLiker] = useState<LikerProfile | null>(null);
    const { likers, isLoading, refetch } = useLikesYou();
    const { swipe } = useDiscovery();
    const { data: userProfile } = useProfile();
    const queryClient = useQueryClient();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !isOpen) return null;

    // Convert LikerProfile to DiscoveryProfile format for ProfileDetailModal
    const convertToDiscoveryProfile = (liker: LikerProfile) => ({
        id: liker.id,
        display_name: liker.display_name || 'Unknown',
        age: liker.age,
        gender: liker.gender || '',
        bio: liker.bio || '',
        prompts: liker.prompts?.map(p => ({ question: p.prompt, answer: p.answer })) || [],
        photos: liker.photos || [],
        distance_km: 0,
        passions: liker.passions || [],
        is_verified: liker.is_verified,
        match_score: 0.8,
        match_reasons: ['They liked you!'],
        score_breakdown: undefined,
        response_badge: undefined,
    });

    const handleLikeBack = async (liker: LikerProfile, e?: React.MouseEvent, comment?: string) => {
        e?.stopPropagation();
        setProcessingId(liker.id);
        try {
            await swipe({
                profile_id: liker.id,
                direction: 'RIGHT',
                comment,
            });

            // Show match celebration! (They already liked you, so it's always a match)
            setMatchCelebration({
                name: liker.display_name || 'Someone',
                photo: liker.photos[0]?.url || '/placeholder-avatar.png',
                yourPhoto: userProfile?.primary_photo_url || '/placeholder-avatar.png'
            });

            // Refresh data
            refetch();
            queryClient.invalidateQueries({ queryKey: ['matchStats'] });
            queryClient.invalidateQueries({ queryKey: ['matches'] });

            setSelectedLiker(null);
            setPendingLiker(null);
        } catch (error: any) {
            console.error('Failed to like back:', error);
            if (error.message) {
                toast.error(error.message);
            } else {
                toast.error('Failed to match. Please try again.');
            }
        } finally {
            setProcessingId(null);
        }
    };

    const handlePass = async (likerId: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        setProcessingId(likerId);
        try {
            await swipe({
                profile_id: likerId,
                direction: 'LEFT',
            });
            refetch();
            queryClient.invalidateQueries({ queryKey: ['matchStats'] });
            setSelectedLiker(null);
            setPendingLiker(null);
        } catch (error: any) {
            console.error('Failed to pass:', error);
            if (error.message) {
                toast.error(error.message);
            } else {
                toast.error('Failed to pass. Please try again.');
            }
        } finally {
            setProcessingId(null);
        }
    };

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-3xl max-h-[85vh] bg-white dark:bg-[#1a2632] rounded-[2rem] shadow-2xl overflow-hidden ring-1 ring-white/10 z-[101]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-yellow-500 icon-filled">favorite</span>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Who Liked You</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {likers.length} {likers.length === 1 ? 'person' : 'people'} waiting
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[calc(85vh-88px)]">
                            {isLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                </div>
                            ) : likers.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="material-symbols-outlined text-4xl text-gray-400">heart_broken</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No likes yet</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Keep swiping! New likes will appear here.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {likers.map((liker) => (
                                        <motion.div
                                            key={liker.id}
                                            layout
                                            initial={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedLiker(liker)}
                                            className={`relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group ${processingId === liker.id ? 'opacity-50 pointer-events-none' : ''
                                                }`}
                                        >
                                            {/* Photo */}
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                                                style={{
                                                    backgroundImage: `url('${liker.photos[0]?.url || '/placeholder-avatar.png'}')`
                                                }}
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                            {/* Super Like Badge */}
                                            {liker.is_super_like && (
                                                <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                                    <span className="material-symbols-outlined text-sm icon-filled">star</span>
                                                    Super Like
                                                </div>
                                            )}

                                            {/* Info & Actions */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <div className="flex items-center gap-1 mb-1">
                                                    <h3 className="text-lg font-bold text-white">
                                                        {liker.display_name}, {liker.age}
                                                    </h3>
                                                    {liker.is_verified && (
                                                        <span className="material-symbols-outlined text-primary text-sm icon-filled">verified</span>
                                                    )}
                                                </div>
                                                {liker.their_comment && (
                                                    <p className="text-white/80 text-sm line-clamp-1 mb-3">
                                                        &quot;{liker.their_comment}&quot;
                                                    </p>
                                                )}

                                                {/* Quick Action Buttons */}
                                                <div className="flex gap-2 mt-2">
                                                    <button
                                                        onClick={(e) => handlePass(liker.id, e)}
                                                        className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/30 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">close</span>
                                                        Pass
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setPendingLiker(liker);
                                                        }}
                                                        className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg"
                                                    >
                                                        <span className="material-symbols-outlined text-lg icon-filled">favorite</span>
                                                        Match!
                                                    </button>
                                                </div>
                                            </div>

                                            {/* View Profile hint on hover */}
                                            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">visibility</span>
                                                View Profile
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Match Celebration Overlay */}
                    <AnimatePresence>
                        {matchCelebration && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[200] flex items-center justify-center bg-gradient-to-br from-pink-500/90 via-purple-500/90 to-blue-500/90 backdrop-blur-md"
                                onClick={() => setMatchCelebration(null)}
                            >
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    transition={{ type: 'spring', damping: 15 }}
                                    className="text-center p-8 w-full max-w-lg"
                                >
                                    <div className="flex justify-center items-center gap-4 mb-8">
                                        {/* Your Photo */}
                                        <motion.div
                                            initial={{ x: 50, opacity: 0, rotate: -10 }}
                                            animate={{ x: 0, opacity: 1, rotate: -6 }}
                                            transition={{ delay: 0.2, type: 'spring' }}
                                            className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden relative z-10"
                                        >
                                            <img
                                                src={matchCelebration.yourPhoto}
                                                alt="You"
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>

                                        {/* Heart Icon */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.5, type: 'spring' }}
                                            className="z-20 -mx-6 bg-white rounded-full p-2 shadow-lg"
                                        >
                                            <span className="material-symbols-outlined text-rose-500 text-4xl icon-filled">favorite</span>
                                        </motion.div>

                                        {/* Their Photo */}
                                        <motion.div
                                            initial={{ x: -50, opacity: 0, rotate: 10 }}
                                            animate={{ x: 0, opacity: 1, rotate: 6 }}
                                            transition={{ delay: 0.2, type: 'spring' }}
                                            className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden relative z-10"
                                        >
                                            <img
                                                src={matchCelebration.photo}
                                                alt={matchCelebration.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>
                                    </div>

                                    <motion.h2
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-4xl font-bold text-white mb-2"
                                    >
                                        It&apos;s a Match! 🎉
                                    </motion.h2>
                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-xl text-white/90 mb-8"
                                    >
                                        You and {matchCelebration.name} liked each other
                                    </motion.p>
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex gap-4 justify-center"
                                    >
                                        <button
                                            onClick={() => setMatchCelebration(null)}
                                            className="px-6 py-3 rounded-full bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors"
                                        >
                                            Keep Browsing
                                        </button>
                                        <button
                                            onClick={() => {
                                                setMatchCelebration(null);
                                                onClose();
                                                // TODO: Navigate to chat with match
                                            }}
                                            className="px-6 py-3 rounded-full bg-white text-purple-600 font-semibold hover:bg-white/90 transition-colors shadow-lg"
                                        >
                                            Send a Message
                                        </button>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            {createPortal(modalContent, document.body)}

            {/* Profile Detail Modal when liker is selected */}
            {selectedLiker && (
                <ProfileDetailModal
                    isOpen={!!selectedLiker}
                    onClose={() => setSelectedLiker(null)}
                    profile={convertToDiscoveryProfile(selectedLiker)}
                    onAction={(type) => {
                        if (!selectedLiker) return;
                        if (type === 'LIKE' || type === 'SUPER_LIKE') {
                            setPendingLiker(selectedLiker);
                        } else {
                            handlePass(selectedLiker.id);
                        }
                    }}
                />
            )}

            <CommentModal
                isOpen={!!pendingLiker}
                onClose={() => setPendingLiker(null)}
                onSubmit={(comment) => {
                    if (pendingLiker) {
                        handleLikeBack(pendingLiker, undefined, comment);
                    }
                }}
                profileName={pendingLiker?.display_name || 'them'}
                isLoading={!!processingId}
            />
        </>
    );
};
