'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/useProfile';
import { useState, useEffect } from 'react';

export default function SafetyCenterPage() {
    const { data: profile, updateProfile, isUsingMock } = useProfile();

    // Local state to allow optimistic immediate updates
    const [privacy, setPrivacy] = useState({
        incognito_mode: false,
        active_status: true,
        read_receipts: true,
    });

    const [notifications, setNotifications] = useState({
        new_matches: true,
        new_messages: true,
        super_likes: true,
        promotions: false,
    });

    useEffect(() => {
        if (profile?.privacy_settings) {
            setPrivacy(profile.privacy_settings);
        }
        if (profile?.notification_settings) {
            setNotifications(profile.notification_settings);
        }
    }, [profile]);

    const togglePrivacy = (key: keyof typeof privacy) => {
        const newVal = !privacy[key];
        const newSettings = { ...privacy, [key]: newVal };
        setPrivacy(newSettings);
        updateProfile({ privacy_settings: newSettings });
    };

    const toggleNotification = (key: keyof typeof notifications) => {
        const newVal = !notifications[key];
        const newSettings = { ...notifications, [key]: newVal };
        setNotifications(newSettings);
        updateProfile({ notification_settings: newSettings });
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Settings & Safety
                    </h1>
                    <p className="text-gray-500 text-sm sm:text-base">
                        Manage your account security, privacy preferences, and verification status.
                    </p>
                </div>
                {isUsingMock && (
                    <span className="self-start sm:self-center px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-bold rounded-full flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">offline_bolt</span>
                        Offline
                    </span>
                )}
            </div>

            {/* Get Verified Card */}
            {!profile?.is_verified && (
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-soft flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                    <div className="size-16 sm:size-24 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-white text-3xl sm:text-5xl">verified_user</span>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-primary text-[20px] icon-filled">verified</span>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Get Verified</h2>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                            Verify your profile to get the Blue Badge and show others you're real.
                            It increases your match rate by 30% and builds trust.
                        </p>
                        <Button className="w-full sm:w-auto bg-primary hover:bg-blue-600 text-white rounded-xl px-6 h-11 sm:h-10">
                            <span className="material-symbols-outlined text-[18px] mr-2">verified</span>
                            Verify Identity Now
                        </Button>
                    </div>
                </div>
            )}

            {/* Privacy Controls */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-soft">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <span className="material-symbols-outlined text-gray-600 text-[22px]">visibility_off</span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Privacy Controls</h2>
                </div>

                <div className="space-y-5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Incognito Mode</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                Only people you have already liked can see your profile.
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={privacy.incognito_mode}
                                onChange={() => togglePrivacy('incognito_mode')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-800"></div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Active Status</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                Show when you were last active.
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={privacy.active_status}
                                onChange={() => togglePrivacy('active_status')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-800"></div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Read Receipts</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                Let matches know when you've read messages.
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={privacy.read_receipts}
                                onChange={() => togglePrivacy('read_receipts')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Safety & Blocking */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-soft">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <span className="material-symbols-outlined text-red-500 text-[22px]">shield</span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Safety & Blocking</h2>
                </div>

                <div className="flex items-center justify-between mb-4 gap-4">
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Blocked Contacts</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage blocked users.</p>
                    </div>
                    <Link href="/settings/blocked">
                        <Button variant="outline" className="rounded-xl h-9 sm:h-10 text-xs sm:text-sm whitespace-nowrap">
                            Manage List
                            <span className="material-symbols-outlined text-[16px] sm:text-[18px] ml-1">chevron_right</span>
                        </Button>
                    </Link>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px] shrink-0">info</span>
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Safety Tip</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                            Never share your financial information or home address with
                            someone you've just met online. <Link href="/safety-guide" className="text-primary hover:underline">Read our Safety Guide.</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 mb-8 shadow-soft">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <span className="material-symbols-outlined text-orange-500 text-[22px]">notifications</span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Notification Preferences</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New Matches</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={notifications.new_matches}
                                onChange={() => toggleNotification('new_matches')}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New Messages</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={notifications.new_messages}
                                onChange={() => toggleNotification('new_messages')}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Super Like Alerts</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={notifications.super_likes}
                                onChange={() => toggleNotification('super_likes')}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Promotions</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={notifications.promotions}
                                onChange={() => toggleNotification('promotions')}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pb-8">
                <button className="text-red-500 hover:text-red-600 font-medium flex items-center gap-2 text-sm sm:text-base">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                    Delete Account
                </button>
            </div>
        </div>
    );
}
