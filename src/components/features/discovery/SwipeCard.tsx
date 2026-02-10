'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';
import { DiscoveryProfile } from '@/hooks/useDiscovery';

interface SwipeCardProps {
    profile: DiscoveryProfile;
    active: boolean;
    onSwipe: (direction: 'LEFT' | 'RIGHT' | 'SUPER_LIKE') => void;
    onCommentOpen?: () => void; // Triggered when swiping right
}

export const SwipeCard = ({ profile, active, onSwipe, onCommentOpen }: SwipeCardProps) => {
    const [exitX, setExitX] = useState<number | null>(null);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Motion values for gesture handling
    const x = useMotionValue(0);
    const y = useMotionValue(0); // For super like (up)
    const rotate = useTransform(x, [-200, 200], [-25, 25]);

    // Color overlays
    const likeOpacity = useTransform(x, [0, 100], [0, 1]);
    const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);
    const superLikeOpacity = useTransform(y, [-100, 0], [1, 0]);

    const controls = useAnimation();

    const photos = profile.photos || [];
    const totalPhotos = photos.length;

    // Auto-advance timer
    useEffect(() => {
        if (totalPhotos <= 1 || isPaused) return;

        const timer = setTimeout(() => {
            if (currentPhotoIndex < totalPhotos - 1) {
                setCurrentPhotoIndex(prev => prev + 1);
            } else {
                // Loop back to start for continuous viewing, or stop?
                // Let's stop at the end to allow decision making.
                // Or loop? WhatsApp/Instagram stories usually auto-close.
                // Here we want them to stay. Let's loop.
                setCurrentPhotoIndex(0);
            }
        }, 4000); // 4 seconds per slide

        return () => clearTimeout(timer);
    }, [currentPhotoIndex, totalPhotos, isPaused]);

    // Handle interaction pause
    const onPointerDown = () => setIsPaused(true);
    const onPointerUp = () => setIsPaused(false);

    const handleDragEnd = async (event: any, info: PanInfo) => {
        const threshold = 100;

        if (info.offset.x > threshold) {
            // Right valid swipe -> Open comment modal if supplied, else just swipe
            if (onCommentOpen) {
                // Reset card to center first so user can write comment
                controls.start({ x: 0, y: 0 });
                onCommentOpen();
            } else {
                setExitX(300);
                onSwipe('RIGHT');
            }
        } else if (info.offset.x < -threshold) {
            // Left valid swipe
            setExitX(-300);
            onSwipe('LEFT');
        } else if (info.offset.y < -threshold) {
            // Up swipe (Super Like)
            if (onCommentOpen) {
                controls.start({ x: 0, y: 0 });
                onCommentOpen(); // Super like also requires comment
            } else {
                onSwipe('SUPER_LIKE');
            }
        } else {
            // Reset position
            controls.start({ x: 0, y: 0 });
        }
    };

    // If not active, render basic card behind
    if (!active) {
        return (
            <div
                className="absolute top-0 w-full h-full bg-surface-light dark:bg-surface-dark rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 scale-95 origin-top opacity-50 pointer-events-none"
                style={{ zIndex: 0 }}
            >
                <img
                    src={photos[0]?.url}
                    alt={profile.display_name}
                    className="w-full h-full object-cover"
                />
            </div>
        );
    }

    return (
        <motion.div
            drag={true}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onHoverStart={() => setIsPaused(true)}
            onHoverEnd={() => setIsPaused(false)}
            animate={controls}
            style={{
                x,
                y,
                rotate: exitX ? (exitX > 0 ? 25 : -25) : rotate,
                zIndex: 10,
                opacity: exitX ? 0 : 1,
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="absolute top-0 w-full h-full bg-surface-light dark:bg-surface-dark rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 cursor-grab active:cursor-grabbing"
        >
            {/* Swipe Overlays */}
            <motion.div
                style={{ opacity: likeOpacity }}
                className="absolute top-8 left-8 z-20 pointer-events-none"
            >
                <div className="border-4 border-green-400 text-green-400 font-bold text-4xl px-4 py-2 rounded-xl -rotate-12 bg-black/30 backdrop-blur-sm">
                    LIKE
                </div>
            </motion.div>

            <motion.div
                style={{ opacity: nopeOpacity }}
                className="absolute top-8 right-8 z-20 pointer-events-none"
            >
                <div className="border-4 border-rose-400 text-rose-400 font-bold text-4xl px-4 py-2 rounded-xl rotate-12 bg-black/30 backdrop-blur-sm">
                    NOPE
                </div>
            </motion.div>

            <motion.div
                style={{ opacity: superLikeOpacity }}
                className="absolute bottom-40 left-0 right-0 z-20 pointer-events-none flex justify-center"
            >
                <div className="border-4 border-primary text-primary font-bold text-4xl px-4 py-2 rounded-xl -rotate-6 bg-black/30 backdrop-blur-sm">
                    SUPER LIKE
                </div>
            </motion.div>

            {/* Story Progress Indicators */}
            {totalPhotos > 1 && (
                <div className="absolute top-3 left-3 right-3 z-30 flex gap-1.5 pointer-events-none">
                    {photos.map((_, idx) => (
                        <div
                            key={idx}
                            className="flex-1 h-1 bg-black/20 dark:bg-white/20 rounded-full overflow-hidden backdrop-blur-sm"
                        >
                            <motion.div
                                className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                                initial={{ width: "0%" }}
                                animate={{
                                    width: idx < currentPhotoIndex ? "100%" :
                                        idx === currentPhotoIndex ? "100%" : "0%"
                                }}
                                transition={{
                                    duration: idx === currentPhotoIndex && !isPaused ? 4 : 0,
                                    ease: "linear"
                                }}
                                style={{ transformOrigin: "left" }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Main Photo */}
            <div className="relative w-full h-full group select-none">
                <img
                    src={photos[currentPhotoIndex]?.url}
                    alt={profile.display_name}
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                />

                {/* Left/Right tap zones */}
                {totalPhotos > 1 && (
                    <>
                        {/* Left Tap: Prev */}
                        <div
                            className="absolute left-0 top-0 w-1/3 h-full z-20 cursor-w-resize"
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentPhotoIndex(prev => Math.max(0, prev - 1));
                            }}
                        />
                        {/* Right Tap: Next */}
                        <div
                            className="absolute right-0 top-0 w-1/3 h-full z-20 cursor-e-resize"
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentPhotoIndex(prev => {
                                    if (prev === totalPhotos - 1) return 0; // Loop manual tap too
                                    return prev + 1;
                                });
                            }}
                        />
                    </>
                )}

                {/* Info Button */}
                <button className="absolute top-4 right-4 z-20 size-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors">
                    <span className="material-symbols-outlined text-[22px]">info</span>
                </button>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 pointer-events-none" />

                {/* Profile Info Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white pb-28">
                    {/* Match Reason Badge */}
                    {profile.match_reasons[0] && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-500/90 rounded-full text-xs font-bold mb-3 shadow-lg backdrop-blur-sm">
                            <span className="material-symbols-outlined text-[14px] icon-filled">star</span>
                            {profile.match_reasons[0]}
                        </div>
                    )}

                    <div className="flex items-end justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-3xl font-bold tracking-tight">
                                {profile.display_name}
                            </h2>
                            <span className="text-2xl font-medium opacity-90">
                                {profile.age}
                            </span>
                            {profile.is_verified && (
                                <span className="material-symbols-outlined text-[24px] text-primary icon-filled">verified</span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 text-white/90 text-sm">
                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                        <span>{profile.distance_km < 1 ? '< 1' : Math.round(profile.distance_km)} km away</span>

                        {profile.response_badge && (
                            <>
                                <span className="size-1 bg-white/50 rounded-full" />
                                <span>{profile.response_badge}</span>
                            </>
                        )}
                    </div>

                    {/* Interest Tags */}
                    {profile.passions && profile.passions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {profile.passions.slice(0, 4).map((passion, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium"
                                >
                                    {passion}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Bio Preview */}
                    {profile.bio && (
                        <p className="text-white/90 text-sm line-clamp-2 leading-relaxed max-w-[90%]">
                            {profile.bio}
                        </p>
                    )}
                </div>
            </div>

            {/* Side Action Hints */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1 h-32 bg-white/10 rounded-full blur-xl opacity-0 hover:opacity-100 transition-opacity" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-32 bg-white/10 rounded-full blur-xl opacity-0 hover:opacity-100 transition-opacity" />

        </motion.div>
    );
};
