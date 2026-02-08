/**
 * Profile page with photo management and profile editing.
 * Desktop-first 2-column layout: Photos (left) + Profile info (right)
 */

'use client'

import { useState, useEffect } from 'react'
import { PhotoUpload } from '@/components/features/profile/PhotoUpload'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useProfile } from '@/hooks/useProfile'

const INTERESTS = [
    { label: 'Hiking', id: 'hiking' },
    { label: 'Sushi', id: 'sushi' },
    { label: 'Indie Rock', id: 'indie-rock' },
    { label: 'Travel', id: 'travel' },
    { label: 'Photography', id: 'photography' },
    { label: 'Coffee', id: 'coffee' },
    { label: 'Gaming', id: 'gaming' },
    { label: 'Fitness', id: 'fitness' },
    { label: 'Art', id: 'art' },
    { label: 'Cooking', id: 'cooking' },
];

export default function ProfilePage() {
    const router = useRouter()
    const { user } = useAuth() // Still use auth for session check if needed
    const { data: profile, isLoading, isUsingMock, updateProfile } = useProfile()

    // UI state
    const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('edit')

    // Local state for editing - sync with profile data
    const [aboutMe, setAboutMe] = useState("")
    const [interests, setInterests] = useState<string[]>([])
    const [prompts, setPrompts] = useState<{ question: string, answer: string }[]>([])

    // Sync local state when profile loads
    useEffect(() => {
        if (profile) {
            setAboutMe(profile.bio || "")
            setInterests(profile.passions || [])
            setPrompts(profile.prompts || [])
        }
    }, [profile])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
            </div>
        )
    }

    const handleSaveAboutMe = () => {
        updateProfile({ bio: aboutMe })
    }

    const removeInterest = (id: string) => {
        const newInterests = interests.filter(i => i !== id)
        setInterests(newInterests)
        updateProfile({ passions: newInterests })
    }

    const addInterest = (id: string) => {
        if (!interests.includes(id)) {
            const newInterests = [...interests, id]
            setInterests(newInterests)
            updateProfile({ passions: newInterests })
        }
    }

    const handlePromptChange = (index: number, field: 'question' | 'answer', value: string) => {
        const newPrompts = [...prompts];
        if (!newPrompts[index]) {
            newPrompts[index] = { question: 'A fun fact about me is...', answer: '' };
        }
        newPrompts[index][field] = value;
        setPrompts(newPrompts);
    }

    const handlePromptSave = () => {
        updateProfile({ prompts })
    }

    return (
        <div className="h-full overflow-y-auto bg-[#f5f7f8] dark:bg-[#0f1923]">
            {/* Page Header */}
            <div className="bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800 px-4 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
                    {isUsingMock && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-bold rounded-full flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">offline_bolt</span>
                            <span className="hidden sm:inline">Offline Mode</span>
                            <span className="sm:hidden">Offline</span>
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button
                        variant="outline"
                        className="rounded-xl flex-1 sm:flex-none items-center justify-center gap-2 h-10 sm:h-auto"
                        onClick={() => router.push('/profile/preview')}
                    >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                        <span className="hidden sm:inline">View Public Profile</span>
                        <span className="sm:hidden">Preview</span>
                    </Button>
                    <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hidden sm:block">
                        <span className="material-symbols-outlined text-[24px]">notifications</span>
                        <span className="absolute top-1 right-1 size-2 bg-pink-500 rounded-full"></span>
                    </button>
                </div>
            </div>

            {/* Main Content - Responsive 2 Column Layout */}
            <div className="p-4 sm:p-8 pb-24 sm:pb-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {/* Left Column - Photos */}
                    <div className="w-full lg:w-[400px] shrink-0 order-2 lg:order-1">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Profile Photos</h2>
                            <span className="text-xs text-gray-500">Drag to reorder</span>
                        </div>
                        <PhotoUpload />
                    </div>

                    {/* Right Column - Profile Info */}
                    <div className="flex-1 min-w-0 order-1 lg:order-2">
                        {/* Name & Location */}
                        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 shadow-soft mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        {profile?.display_name || 'User'}, {profile?.age || 25}
                                        {profile?.is_verified && (
                                            <span className="material-symbols-outlined text-primary text-[20px] sm:text-[22px] icon-filled">verified</span>
                                        )}
                                    </h2>
                                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                                        {/* Fallback for location until API provides it */}
                                        San Francisco, CA
                                    </p>
                                </div>
                                <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 self-start">
                                    <button
                                        onClick={() => setActiveTab('preview')}
                                        className={cn(
                                            "px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium transition-colors flex-1 sm:flex-none",
                                            activeTab === 'preview'
                                                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                                                : "bg-transparent text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        )}
                                    >
                                        Preview
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('edit')}
                                        className={cn(
                                            "px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium transition-colors flex-1 sm:flex-none",
                                            activeTab === 'edit'
                                                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                                                : "bg-transparent text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        )}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>

                            {/* About Me */}
                            <div className="mb-2">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[18px]">edit_note</span>
                                        ABOUT ME
                                    </label>
                                    <span className="text-xs text-gray-400">{aboutMe.length}/500</span>
                                </div>
                                <textarea
                                    value={aboutMe}
                                    onChange={(e) => setAboutMe(e.target.value)}
                                    onBlur={handleSaveAboutMe}
                                    maxLength={500}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                                    placeholder="Tell others about yourself..."
                                />
                            </div>
                        </div>

                        {/* Profile Prompts */}
                        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 shadow-soft mb-6">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-primary text-[20px]">quiz</span>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Profile Prompts</h3>
                            </div>

                            {/* Prompt 1 */}
                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                    {prompts[0]?.question || "A fun fact about me is..."}
                                </label>
                                <div className="relative">
                                    <textarea
                                        rows={2}
                                        value={prompts[0]?.answer || ""}
                                        onChange={(e) => handlePromptChange(0, 'answer', e.target.value)}
                                        onBlur={handlePromptSave}
                                        className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                                    />
                                    <button className="absolute right-3 top-3 text-primary hover:text-blue-600 transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                                    </button>
                                </div>
                            </div>

                            {/* Prompt 2 */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                    {prompts[1]?.question || "Two truths and a lie"}
                                </label>
                                <div className="relative">
                                    <textarea
                                        rows={3}
                                        value={prompts[1]?.answer || ""}
                                        onChange={(e) => handlePromptChange(1, 'answer', e.target.value)}
                                        onBlur={handlePromptSave}
                                        placeholder="1. ...&#10;2. ...&#10;3. ..."
                                        className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none placeholder:text-gray-400"
                                    />
                                    <button className="absolute right-3 top-3 text-primary hover:text-blue-600 transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Passions & Interests */}
                        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 shadow-soft">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-pink-500 text-[20px]">favorite</span>
                                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                                    Passions & Interests
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {INTERESTS.filter(i => interests.includes(i.id)).map((interest) => (
                                    <span
                                        key={interest.id}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        {interest.label}
                                        <button
                                            onClick={() => removeInterest(interest.id)}
                                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">close</span>
                                        </button>
                                    </span>
                                ))}

                                {/* Add More Button - Could be a dropdown or modal in full implementation */}
                                <div className="relative group">
                                    <button className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full text-sm font-medium text-gray-500 hover:border-primary hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[16px]">add</span>
                                        Add More
                                    </button>

                                    {/* Simple dropdown for demo purposes */}
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 hidden group-hover:block z-10 max-h-60 overflow-y-auto">
                                        {INTERESTS.filter(i => !interests.includes(i.id)).map(interest => (
                                            <button
                                                key={interest.id}
                                                onClick={() => addInterest(interest.id)}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-xl last:rounded-b-xl"
                                            >
                                                {interest.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
