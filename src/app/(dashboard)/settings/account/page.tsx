'use client';

import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { usePrivacy } from '@/hooks/usePrivacy';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function AccountSettingsPage() {
    const { user } = useAuth();
    const { data: profile, updateProfile, isUsingMock } = useProfile();
    const {
        requestDeletion,
        cancelDeletion,
        hasPendingDeletion,
        deletionStatus,
        isRequestingDeletion,
        isCancellingDeletion
    } = usePrivacy();

    const [gender, setGender] = useState(profile?.gender || 'female');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteReason, setDeleteReason] = useState('');

    // Password change state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    // Pause account state
    const [isPaused, setIsPaused] = useState(profile?.privacy_settings?.incognito_mode || false);
    const [isTogglingPause, setIsTogglingPause] = useState(false);

    useEffect(() => {
        if (profile?.gender) {
            setGender(profile.gender);
        }
        if (profile?.privacy_settings?.incognito_mode !== undefined) {
            setIsPaused(profile.privacy_settings.incognito_mode);
        }
    }, [profile]);

    const handleGenderChange = (value: string) => {
        setGender(value);
        updateProfile({ gender: value });
    };

    const handlePasswordChange = async () => {
        setPasswordError('');
        setPasswordSuccess(false);

        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        if (newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return;
        }

        setIsChangingPassword(true);
        try {
            const supabase = createClient();
            const { error } = await supabase.auth.updateUser({ password: newPassword });

            if (error) {
                setPasswordError(error.message);
            } else {
                setPasswordSuccess(true);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(() => setPasswordSuccess(false), 3000);
            }
        } catch {
            setPasswordError('Failed to update password');
        } finally {
            setIsChangingPassword(false);
        }
    };

    const handleTogglePause = async () => {
        setIsTogglingPause(true);
        const newPausedState = !isPaused;
        setIsPaused(newPausedState);

        updateProfile({
            privacy_settings: {
                ...profile?.privacy_settings,
                incognito_mode: newPausedState,
                active_status: profile?.privacy_settings?.active_status ?? true,
                read_receipts: profile?.privacy_settings?.read_receipts ?? true,
            }
        });
        setIsTogglingPause(false);
    };

    // Format Date for Display (MM/DD/YYYY)
    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Account Management
                    </h1>
                    <p className="text-gray-500 text-sm sm:text-base">
                        Update your personal details, secure your account, and manage your status.
                    </p>
                </div>
                {isUsingMock && (
                    <span className="self-start sm:self-center px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-bold rounded-full flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">offline_bolt</span>
                        Offline
                    </span>
                )}
            </div>

            {/* Personal Information */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-soft">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <span className="material-symbols-outlined text-primary text-[22px]">badge</span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">mail</span>
                            <input
                                type="email"
                                value={user?.email || ''}
                                disabled
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed"
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Contact support to change.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Phone Number
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">call</span>
                            <input
                                type="tel"
                                value={user?.phone || ''}
                                disabled
                                placeholder="Not linked"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Date of Birth
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">calendar_today</span>
                            <input
                                type="text"
                                value={formatDate(profile?.birthdate)}
                                disabled
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed"
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Contact support to change.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Gender
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">person</span>
                            <select
                                value={gender}
                                onChange={(e) => handleGenderChange(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="non-binary">Non-binary</option>
                                <option value="other">Other</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">expand_more</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Password */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-soft">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <span className="material-symbols-outlined text-yellow-500 text-[22px]">lock_reset</span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Change Password</h2>
                </div>

                <div className="space-y-4 max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter current password"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter new password"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-400"
                        />
                    </div>

                    {passwordError && (
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">error</span>
                            {passwordError}
                        </p>
                    )}
                    {passwordSuccess && (
                        <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            Password updated successfully!
                        </p>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                        <Button
                            variant="outline"
                            className="rounded-xl w-full sm:w-auto"
                            onClick={handlePasswordChange}
                            disabled={isChangingPassword || !newPassword || !confirmPassword}
                        >
                            {isChangingPassword ? 'Updating...' : 'Update Password'}
                        </Button>
                        <button className="text-primary text-sm font-medium hover:underline text-left sm:text-center">Forgot Password?</button>
                    </div>
                </div>
            </div>

            {/* Account Status */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 mb-8 shadow-soft">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <span className="material-symbols-outlined text-gray-500 text-[22px]">schedule</span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Account Status</h2>
                </div>

                <div className="space-y-4">
                    <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl gap-4 ${isPaused
                        ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
                        : 'bg-gray-50 dark:bg-gray-800'
                        }`}>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                Pause Account
                                {isPaused && (
                                    <span className="text-xs bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full">
                                        PAUSED
                                    </span>
                                )}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {isPaused
                                    ? "Your profile is hidden. Unpause to appear again."
                                    : "Take a break. Your profile will be hidden."
                                }
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            className={`rounded-xl w-full sm:w-auto ${isPaused ? 'bg-primary text-white hover:bg-blue-600' : ''}`}
                            onClick={handleTogglePause}
                            disabled={isTogglingPause}
                        >
                            {isTogglingPause ? 'Updating...' : isPaused ? 'Unpause Account' : 'Pause Account'}
                        </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30 gap-4">
                        <div>
                            <h3 className="font-semibold text-blue-600 dark:text-blue-400">Account Status</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Your account is active.
                            </p>
                        </div>
                        <span className="text-green-600 dark:text-green-400 font-semibold text-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            Active
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Buttons - Delete Account */}
            <div className="flex items-center justify-between pb-8">
                {hasPendingDeletion ? (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
                        <div className="text-amber-600 dark:text-amber-400">
                            <span className="flex items-center gap-2 font-medium">
                                <span className="material-symbols-outlined text-[18px]">schedule</span>
                                Account scheduled for deletion
                                {deletionStatus?.scheduled_deletion_at && (
                                    <span className="text-sm text-gray-500">
                                        ({new Date(deletionStatus.scheduled_deletion_at).toLocaleDateString()})
                                    </span>
                                )}
                            </span>
                        </div>
                        <Button
                            variant="outline"
                            className="rounded-xl w-full sm:w-auto"
                            onClick={() => cancelDeletion()}
                            disabled={isCancellingDeletion}
                        >
                            {isCancellingDeletion ? 'Cancelling...' : 'Cancel Deletion'}
                        </Button>
                    </div>
                ) : showDeleteConfirm ? (
                    <div className="flex-1 p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-800">
                        <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                            Are you sure you want to delete your account?
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            This action will schedule your account for deletion in 30 days. You can cancel within this period.
                        </p>
                        <textarea
                            placeholder="Optional: Tell us why you're leaving..."
                            value={deleteReason}
                            onChange={(e) => setDeleteReason(e.target.value)}
                            className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm mb-3 resize-none"
                            rows={2}
                        />
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="rounded-xl flex-1 sm:flex-none"
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="rounded-xl bg-red-600 hover:bg-red-700 text-white flex-1 sm:flex-none"
                                onClick={() => {
                                    requestDeletion(deleteReason || undefined, {
                                        onSuccess: () => setShowDeleteConfirm(false),
                                    });
                                }}
                                disabled={isRequestingDeletion}
                            >
                                {isRequestingDeletion ? 'Submitting...' : 'Delete My Account'}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <button
                        className="text-red-500 hover:text-red-600 font-medium flex items-center gap-2 text-sm sm:text-base"
                        onClick={() => setShowDeleteConfirm(true)}
                    >
                        <span className="material-symbols-outlined text-[18px]">warning</span>
                        Permanently Delete Account
                    </button>
                )}
            </div>
        </div>
    );
}
