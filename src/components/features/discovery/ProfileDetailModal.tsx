'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { DiscoveryProfile } from '@/hooks/useDiscovery';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    profile: DiscoveryProfile;
    onAction: (type: 'LIKE' | 'PASS' | 'SUPER_LIKE') => void;
}

export const ProfileDetailModal = ({ isOpen, onClose, profile, onAction }: ProfileDetailModalProps) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    // Reset photo index when profile changes
    useEffect(() => {
        setCurrentPhotoIndex(0);
    }, [profile?.id]);

    if (!isOpen || !profile) return null;

    const photos = profile.photos || [];
    const mainPhoto = photos[currentPhotoIndex]?.url;

    const handleNextPhoto = () => {
        if (currentPhotoIndex < photos.length - 1) {
            setCurrentPhotoIndex(prev => prev + 1);
        }
    };

    const handlePrevPhoto = () => {
        if (currentPhotoIndex > 0) {
            setCurrentPhotoIndex(prev => prev - 1);
        }
    };

    // Use portal to render at root level to avoid z-index wars
    return createPortal(
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
                        className="relative w-full max-w-6xl h-[90vh] max-h-[800px] bg-white dark:bg-[#1a2632] rounded-[2rem] shadow-2xl flex overflow-hidden ring-1 ring-white/10 z-[101]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 flex items-center justify-center w-10 h-10 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full text-gray-800 dark:text-white hover:bg-white dark:hover:bg-black transition-colors shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[24px]">close</span>
                        </button>

                        {/* LEFT PANE: Photo Carousel */}
                        <div className="hidden md:block w-1/2 h-full relative bg-gray-100 dark:bg-gray-800 group">
                            {/* Main Image */}
                            <div
                                className="w-full h-full bg-cover bg-center transition-transform duration-500"
                                style={{
                                    backgroundImage: `url('${mainPhoto}')`
                                }}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

                            {/* Carousel Controls */}
                            {photos.length > 1 && (
                                <>
                                    <div className={`absolute inset-y-0 left-4 flex items-center transition-opacity ${currentPhotoIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100'}`}>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handlePrevPhoto(); }}
                                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                                        >
                                            <span className="material-symbols-outlined">chevron_left</span>
                                        </button>
                                    </div>
                                    <div className={`absolute inset-y-0 right-4 flex items-center transition-opacity ${currentPhotoIndex === photos.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100'}`}>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleNextPhoto(); }}
                                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                                        >
                                            <span className="material-symbols-outlined">chevron_right</span>
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Pagination Dots */}
                            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                                {photos.map((_, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setCurrentPhotoIndex(idx)}
                                        className={`w-2 h-2 rounded-full cursor-pointer shadow-sm transition-all ${idx === currentPhotoIndex
                                                ? 'bg-white scale-125'
                                                : 'bg-white/50 hover:bg-white/80'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* RIGHT PANE: Profile Content */}
                        <div className="w-full md:w-1/2 h-full flex flex-col relative bg-white dark:bg-[#1a2632]">
                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 pb-28">
                                {/* Header */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h1 className="text-[#111418] dark:text-white tracking-tight text-[32px] font-bold leading-tight">
                                            {profile.display_name}, {profile.age}
                                        </h1>
                                        {profile.is_verified && (
                                            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                        )}
                                    </div>
                                    {/* Placeholder data since backend doesn't have job/location text yet */}
                                    <p className="text-[#5f758c] dark:text-gray-400 text-base font-normal leading-normal flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[18px]">work</span> Tech Enthusiast
                                    </p>
                                    <p className="text-[#5f758c] dark:text-gray-400 text-base font-normal leading-normal flex items-center gap-1 mt-1">
                                        <span className="material-symbols-outlined text-[18px]">location_on</span> {Math.round(profile.distance_km)} km away
                                    </p>
                                </div>

                                {/* Prompts */}
                                {profile.prompts?.map((prompt, idx) => (
                                    <div key={idx} className="mb-8 p-6 rounded-2xl bg-[#f5f7f8] dark:bg-[#22303c] border border-transparent dark:border-gray-700/50">
                                        <p className="text-[#5f758c] dark:text-gray-400 text-sm font-medium uppercase tracking-wide mb-2">
                                            {prompt.question}
                                        </p>
                                        <p className="text-[#111418] dark:text-white text-xl font-bold leading-relaxed">
                                            {prompt.answer}
                                        </p>
                                    </div>
                                ))}

                                {/* About Me */}
                                {profile.bio && (
                                    <div className="mb-8">
                                        <h2 className="text-lg font-bold text-[#111418] dark:text-white mb-3">About Me</h2>
                                        <p className="text-[#111418] dark:text-gray-300 text-base leading-relaxed">
                                            {profile.bio}
                                        </p>
                                    </div>
                                )}

                                {/* Interests Tags (Passions) */}
                                {profile.passions && profile.passions.length > 0 && (
                                    <div className="mb-8">
                                        <h2 className="text-lg font-bold text-[#111418] dark:text-white mb-3">Interests</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {profile.passions.map((passion, idx) => (
                                                <span key={idx} className="px-4 py-2 bg-gray-100 dark:bg-gray-700/50 text-[#111418] dark:text-gray-200 rounded-full text-sm font-semibold border border-transparent dark:border-gray-600">
                                                    {passion}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Placeholder Anthem (Static for now as not in schema) */}
                                <div className="mb-8">
                                    <h2 className="text-lg font-bold text-[#111418] dark:text-white mb-3 flex items-center gap-2">
                                        <span className="text-[#1DB954] material-symbols-outlined">graphic_eq</span> My Anthem
                                    </h2>
                                    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm bg-white dark:bg-[#22303c]">
                                        <div className="w-16 h-16 rounded-lg bg-gray-200 shrink-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-gray-400">music_note</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[#111418] dark:text-white font-bold truncate">Discover Weekly</p>
                                            <p className="text-[#5f758c] dark:text-gray-400 text-sm truncate">Spotify</p>
                                        </div>
                                        <button className="w-10 h-10 rounded-full bg-[#1DB954] text-white flex items-center justify-center hover:scale-105 transition-transform">
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Sticky Footer Action Bar */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 dark:bg-[#1a2632]/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-700 z-10 flex gap-3 items-center">
                                <button
                                    onClick={() => onAction('LIKE')}
                                    className="flex-1 flex cursor-pointer items-center justify-center rounded-full h-12 px-6 bg-primary hover:bg-primary/90 text-white gap-2 text-base font-bold transition-all shadow-lg hover:shadow-primary/25"
                                >
                                    <span className="material-symbols-outlined text-[20px]">send</span>
                                    <span>Send Message</span>
                                </button>
                                <button className="flex shrink-0 cursor-pointer items-center justify-center rounded-full w-12 h-12 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-[#5f758c] dark:text-gray-400 transition-colors" title="Report or Block">
                                    <span className="material-symbols-outlined">more_vert</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};
