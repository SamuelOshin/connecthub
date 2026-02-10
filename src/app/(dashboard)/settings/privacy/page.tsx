'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePrivacy } from '@/hooks/usePrivacy';
import { useState } from 'react';

export default function PrivacySettingsPage() {
    const { exportData, isExporting, exportError } = usePrivacy();
    const [showExportSuccess, setShowExportSuccess] = useState(false);

    const handleExportData = () => {
        exportData(undefined, {
            onSuccess: () => {
                setShowExportSuccess(true);
                setTimeout(() => setShowExportSuccess(false), 3000);
            },
        });
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Privacy Controls
                </h1>
                <p className="text-gray-500 text-sm sm:text-base">
                    Manage your visibility, data sharing preferences, and personal information rights.
                </p>
            </div>

            {/* Profile Visibility */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-soft">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <span className="material-symbols-outlined text-primary text-[22px]">visibility</span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Profile Visibility</h2>
                </div>

                <div className="space-y-5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Public Profile</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                When enabled, your profile is visible to all potential matches on ConnectHub. Disable to go Private.
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
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Search by Email</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                Allow people who have your email address to find your profile.
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-800"></div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Search by Phone Number</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                Allow people who have your phone number to find your profile.
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Data Sharing */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-soft">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <span className="material-symbols-outlined text-purple-500 text-[22px]">share</span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Data Sharing</h2>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Third-Party Partners</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                            Allow us to share anonymized usage statistics with trusted partners.
                        </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>
            </div>

            {/* Your Data Rights */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 mb-6 shadow-soft">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <span className="material-symbols-outlined text-green-500 text-[22px]">security</span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Data Rights</h2>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-4 gap-4">
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Download My Data</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Request a complete copy of your personal data (JSON).
                        </p>
                        {showExportSuccess && (
                            <p className="text-sm text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                Download started!
                            </p>
                        )}
                        {exportError && (
                            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                Failed to export data. Please try again.
                            </p>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        className="rounded-xl flex items-center gap-2 w-full sm:w-auto justify-center"
                        onClick={handleExportData}
                        disabled={isExporting}
                    >
                        {isExporting ? (
                            <>
                                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                                Exporting...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-[18px]">download</span>
                                Request Download
                            </>
                        )}
                    </Button>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
                        <h4 className="font-semibold text-gray-900 dark:text-white">PIPEDA Compliance</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        We are committed to protecting your privacy in full compliance with PIPEDA.
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="font-medium text-gray-700 dark:text-gray-300">• Consent:</span>
                            We only collect info with your consent.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-medium text-gray-700 dark:text-gray-300">• Limited Use:</span>
                            Data is used strictly for identified purposes.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-medium text-gray-700 dark:text-gray-300">• Security:</span>
                            We employ encrpytion to safeguard your information.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-medium text-gray-700 dark:text-gray-300">• Individual Access:</span>
                            You have the right to access and correct your info.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pb-8">
                <Button variant="outline" className="rounded-xl h-10 px-6">Discard</Button>
                <Button className="bg-primary hover:bg-blue-600 text-white rounded-xl px-8 h-10">
                    Save Preferences
                </Button>
            </div>
        </div>
    );
}
