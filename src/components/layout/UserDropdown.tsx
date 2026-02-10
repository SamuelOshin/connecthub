'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useUser, getAvatarUrl } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { useSubscription } from '@/hooks/useSubscription';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { toast } from 'sonner';

export function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user, isLoading } = useUser();
    const { signOut } = useAuth();
    const router = useRouter();
    const { subscription } = useSubscription();

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Handle logout
    const handleLogoutClick = () => {
        setIsOpen(false);
        setShowLogoutConfirm(true);
    };

    const confirmLogout = async () => {
        try {
            await signOut();
            toast.success('Signed out successfully', {
                description: 'We hope to see you again soon!'
            });
            router.push('/login');
            router.refresh();
        } catch (error) {
            toast.error('Failed to sign out', {
                description: 'Please try again'
            });
        } finally {
            setShowLogoutConfirm(false);
        }
    };

    const getPlanDisplayName = () => {
        if (!subscription?.plan) return 'Free';
        return subscription.plan.display_name || subscription.plan.name || 'Free';
    };

    return (
        <>
            <div className="relative" ref={dropdownRef}>
                {/* Trigger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none"
                >
                    {isLoading ? (
                        <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
                    ) : (
                        <div className="relative">
                            <div
                                className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-gray-100 dark:ring-gray-700 shadow-sm"
                                style={{ backgroundImage: `url('${getAvatarUrl(user?.avatar_url)}')` }}
                            />
                            <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-500 rounded-full border-2 border-white dark:border-surface-dark" />
                        </div>
                    )}

                    <div className="hidden md:block text-left">
                        <p className="text-sm font-bold leading-none text-gray-900 dark:text-white max-w-[100px] truncate">
                            {user?.display_name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {getPlanDisplayName()}
                        </p>
                    </div>

                    <span className={cn(
                        "material-symbols-outlined text-gray-400 text-[20px] hidden md:block transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}>
                        expand_more
                    </span>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.1 }}
                            className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-surface-dark rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 z-50 origin-top-right overflow-hidden"
                        >
                            {/* User Header */}
                            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                    {user?.display_name || 'User'}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {user?.email}
                                </p>
                            </div>

                            {/* Navigation Links */}
                            <div className="py-1">
                                <Link
                                    href="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[20px]">person</span>
                                    Profile
                                </Link>
                                <Link
                                    href="/settings/account"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[20px]">settings</span>
                                    Settings
                                </Link>
                                <Link
                                    href="/settings/billing"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[20px]">credit_card</span>
                                    Billing
                                </Link>
                            </div>

                            <div className="my-1 border-t border-gray-100 dark:border-gray-800" />

                            {/* Additional Links */}
                            <div className="py-1">
                                <Link
                                    href="/help"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[20px]">help</span>
                                    Help Center
                                </Link>
                            </div>

                            <div className="my-1 border-t border-gray-100 dark:border-gray-800" />

                            {/* Logout */}
                            <div className="py-1">
                                <button
                                    onClick={handleLogoutClick}
                                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[20px]">logout</span>
                                    Sign Out
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <ConfirmationModal
                isOpen={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                onConfirm={confirmLogout}
                title="Sign out"
                description="Are you sure you want to sign out of your account?"
                confirmText="Sign out"
                isDestructive
            />
        </>
    );
}
