/**
 * Profile page with photo management and profile editing.
 */

'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { profileApi } from '@/lib/api'
import { PhotoUpload } from '@/components/features/profile/PhotoUpload'
import { ProfileEditForm } from '@/components/features/profile/ProfileEditForm'
import { Settings, Shield, LogOut, ChevronRight, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ProfilePage() {
    const router = useRouter()
    const { user, signOut } = useAuth()
    const [activeTab, setActiveTab] = useState<'photos' | 'edit'>('photos')

    // Fetch profile
    const { data: profile, isLoading } = useQuery({
        queryKey: ['my-profile'],
        queryFn: () => profileApi.getMyProfile(),
    })

    const handleSignOut = async () => {
        await signOut()
        router.push('/login')
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 pb-20">
                <div className="max-w-lg mx-auto px-4 pt-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-white">Profile</h1>
                        <button
                            onClick={() => router.push('/settings')}
                            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile Card */}
            <div className="max-w-lg mx-auto px-4 -mt-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                    {/* Avatar & Name */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                            {profile?.primary_photo_url ? (
                                <Image
                                    src={profile.primary_photo_url}
                                    alt={profile.display_name || 'Profile'}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                                    {profile?.display_name?.[0]?.toUpperCase() || '?'}
                                </div>
                            )}
                            {profile?.is_verified && (
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Shield className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#111418] dark:text-white">
                                {profile?.display_name || 'New User'}
                                {profile?.age && <span className="font-normal">, {profile.age}</span>}
                            </h2>
                            <p className="text-sm text-[#60758a] dark:text-gray-400">
                                {profile?.is_verified ? 'Verified' : 'Not verified'} • {profile?.subscription_status || 'Free'}
                            </p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                        <button
                            onClick={() => setActiveTab('photos')}
                            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'photos'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-[#60758a] hover:text-[#111418] dark:hover:text-white'
                                }`}
                        >
                            Photos
                        </button>
                        <button
                            onClick={() => setActiveTab('edit')}
                            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'edit'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-[#60758a] hover:text-[#111418] dark:hover:text-white'
                                }`}
                        >
                            Edit Profile
                        </button>
                    </div>

                    {/* Content */}
                    {activeTab === 'photos' ? (
                        <PhotoUpload />
                    ) : (
                        <ProfileEditForm />
                    )}
                </div>

                {/* Additional Options */}
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl divide-y divide-gray-200 dark:divide-gray-700">
                    <button
                        onClick={() => router.push('/identity-verification')}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-blue-500" />
                            <span className="text-[#111418] dark:text-white">Verify Your Identity</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#60758a]" />
                    </button>

                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 p-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>

                {/* Email */}
                <p className="text-center text-xs text-[#60758a] dark:text-gray-400 mt-6 mb-8">
                    Signed in as {user?.email}
                </p>
            </div>
        </div>
    )
}
