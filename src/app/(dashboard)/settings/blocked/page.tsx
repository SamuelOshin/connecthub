'use client';

import { Button } from '@/components/ui/button';
import { useSafety } from '@/hooks/useSafety';
import Link from 'next/link';

export default function BlockedUsersPage() {
    const { blockedUsers, blockedCount, isLoadingBlocked, unblockUser, isUnblocking } = useSafety();

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 sm:mb-8 flex items-center gap-4">
                <Link
                    href="/settings"
                    className="p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        Blocked Users
                    </h1>
                    <p className="text-gray-500 text-sm sm:text-base">
                        {blockedCount} {blockedCount === 1 ? 'user' : 'users'} blocked
                    </p>
                </div>
            </div>

            {/* Blocked Users List */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft overflow-hidden">
                {isLoadingBlocked ? (
                    <div className="p-8 text-center">
                        <span className="material-symbols-outlined text-[32px] text-gray-400 animate-spin">
                            progress_activity
                        </span>
                        <p className="text-gray-500 mt-2">Loading blocked users...</p>
                    </div>
                ) : blockedUsers.length === 0 ? (
                    <div className="p-8 text-center">
                        <span className="material-symbols-outlined text-[48px] text-gray-300 dark:text-gray-600 mb-3">
                            check_circle
                        </span>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            No blocked users
                        </h3>
                        <p className="text-sm text-gray-500">
                            You haven&apos;t blocked anyone yet.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {blockedUsers.map((blocked) => (
                            <div key={blocked.id} className="flex items-center justify-between p-4 gap-4">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="size-10 sm:size-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-gray-400">person</span>
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                            {blocked.blocked_user?.display_name || 'Unknown User'}
                                        </h3>
                                        <p className="text-xs text-gray-500 truncate">
                                            Blocked on {new Date(blocked.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-xl shrink-0"
                                    onClick={() => unblockUser(blocked.blocked_id)}
                                    disabled={isUnblocking}
                                >
                                    Unblock
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-gray-700 dark:text-gray-300">What happens when you block someone?</span>
                    <br />
                    They won&apos;t be able to see your profile, match with you, or send you messages. Any existing match will be removed.
                </p>
            </div>
        </div>
    );
}
