'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming this exists for tailwind classes

interface CommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (comment: string) => void;
    profileName: string;
    targetType?: 'photo' | 'prompt' | 'profile';
    isLoading?: boolean;
}

export const CommentModal = ({
    isOpen,
    onClose,
    onSubmit,
    profileName,
    targetType = 'profile',
    isLoading = false,
}: CommentModalProps) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (comment.trim().length >= 10) {
            onSubmit(comment);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed z-[201] w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            marginTop: '-10vh' // Slight offset upwards
                        }}
                    >
                        {/* Header */}
                        <div className="relative p-6 pb-2">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-full text-rose-600 dark:text-rose-400">
                                    <Sparkles size={24} />
                                </div>
                                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                                    Say something nice
                                </h2>
                            </div>

                            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                                ConnectHub isn't about mindless swiping. To like
                                <span className="font-semibold text-zinc-900 dark:text-zinc-100"> {profileName}</span>,
                                you need to send a message (min 10 chars).
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 pt-2">
                            <div className="relative">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder={`Hi ${profileName}, I noticed that...`}
                                    className="w-full h-32 p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 text-base"
                                    autoFocus
                                />

                                <div className="absolute bottom-3 right-3 text-xs font-medium">
                                    <span className={cn(
                                        "transition-colors",
                                        comment.length < 10
                                            ? "text-zinc-400"
                                            : "text-green-500"
                                    )}>
                                        {comment.length}/10
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={comment.length < 10 || isLoading}
                                    className={cn(
                                        "px-6 py-2 text-sm font-semibold text-white rounded-lg flex items-center gap-2",
                                        "transition-all duration-200",
                                        comment.length < 10 || isLoading
                                            ? "bg-zinc-300 dark:bg-zinc-700 cursor-not-allowed"
                                            : "bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/20 active:scale-95"
                                    )}
                                >
                                    {isLoading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Send Like
                                            <Send size={16} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
