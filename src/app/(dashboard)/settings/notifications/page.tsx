'use client';

import { Button } from '@/components/ui/button';

export default function NotificationSettingsPage() {
    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Notification Preferences
                </h1>
                <p className="text-gray-500 text-sm sm:text-base">
                    Control what notifications you receive and how they are delivered.
                </p>
            </div>

            {/* Push Notifications */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-soft">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <span className="material-symbols-outlined text-primary text-[22px] icon-filled">notifications_active</span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Push Notifications</h2>
                </div>

                <div className="space-y-5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">New Matches</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                Get notified instantly when someone matches with you.
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-800"></div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">New Messages</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                Receive alerts when matches send you a message.
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-800"></div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Likes & Super Likes</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                See who likes your profile or sends a Super Like.
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Email Notifications */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-soft">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <span className="material-symbols-outlined text-purple-500 text-[22px]">mail</span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Email Notifications</h2>
                </div>

                <div className="space-y-5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Weekly Recap</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                A summary of your new matches and profile activity.
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-800"></div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Account Security</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                Login alerts, password changes, and security tips.
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* In-App Alerts and Quiet Mode */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
                {/* In-App Alerts */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 shadow-soft">
                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
                        <span className="material-symbols-outlined text-orange-500 text-[22px]">smartphone</span>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">In-App Alerts</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">In-App Sound Effects</span>
                            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Vibrate on Match</span>
                            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Quiet Mode */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 shadow-soft">
                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
                        <span className="material-symbols-outlined text-indigo-500 text-[22px]">nightlight</span>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Quiet Mode</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Schedule</span>
                                <p className="text-xs text-gray-500 mt-0.5">Silence notifications during set hours.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">FROM</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        defaultValue="10:00 PM"
                                        className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white"
                                    />
                                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px]">schedule</span>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">TO</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        defaultValue="08:00 AM"
                                        className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white"
                                    />
                                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-[16px]">schedule</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pb-8">
                <Button variant="outline" className="rounded-xl h-10 px-6">Cancel</Button>
                <Button className="bg-primary hover:bg-blue-600 text-white rounded-xl px-8 h-10">
                    Save Changes
                </Button>
            </div>
        </div>
    );
}
