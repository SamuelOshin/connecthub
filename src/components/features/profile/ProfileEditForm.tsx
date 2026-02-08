/**
 * Profile Edit Form Component with Material Symbols.
 */

'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { profileApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ProfileFormData {
    display_name: string
    bio: string
    gender: string
    looking_for: string[]
    passions: string[]
    preferences: {
        min_age: number
        max_age: number
        distance_km: number
        show_me: string[]
    }
}

const GENDER_OPTIONS = [
    { value: 'male', label: 'Man', icon: 'male' },
    { value: 'female', label: 'Woman', icon: 'female' },
    { value: 'non-binary', label: 'Non-binary', icon: 'transgender' },
    { value: 'other', label: 'Other', icon: 'more_horiz' },
]

const PASSION_OPTIONS = [
    '🎵 Music', '🏋️ Fitness', '✈️ Travel', '📚 Reading',
    '🎮 Gaming', '🎨 Art', '📷 Photography', '🍳 Cooking',
    '🎬 Movies', '🧘 Yoga', '🐕 Dogs', '☕ Coffee'
]

export function ProfileEditForm() {
    const queryClient = useQueryClient()
    const [saved, setSaved] = useState(false)

    // Fetch profile
    const { data: profile, isLoading } = useQuery({
        queryKey: ['my-profile'],
        queryFn: () => profileApi.getMyProfile(),
    })

    // Form state
    const [formData, setFormData] = useState<ProfileFormData>({
        display_name: '',
        bio: '',
        gender: '',
        looking_for: [],
        passions: [],
        preferences: {
            min_age: 18,
            max_age: 50,
            distance_km: 50,
            show_me: ['male', 'female'],
        },
    })

    // Populate form when profile loads
    useEffect(() => {
        if (profile) {
            setFormData({
                display_name: profile.display_name || '',
                bio: profile.bio || '',
                gender: profile.gender || '',
                looking_for: profile.looking_for || [],
                passions: profile.passions || [],
                preferences: {
                    min_age: profile.preferences?.min_age || 18,
                    max_age: profile.preferences?.max_age || 50,
                    distance_km: profile.preferences?.distance_km || 50,
                    show_me: profile.preferences?.show_me || ['male', 'female'],
                },
            })
        }
    }, [profile])

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: (data: Partial<ProfileFormData>) => profileApi.updateProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-profile'] })
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        },
    })

    const handleChange = (field: string, value: unknown) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    const handlePreferenceChange = (field: string, value: unknown) => {
        setFormData(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [field]: value,
            },
        }))
    }

    const toggleShowMe = (gender: string) => {
        const current = formData.preferences.show_me
        const updated = current.includes(gender)
            ? current.filter(g => g !== gender)
            : [...current, gender]

        if (updated.length === 0) return // Must have at least one
        handlePreferenceChange('show_me', updated)
    }

    const togglePassion = (passion: string) => {
        const current = formData.passions
        const updated = current.includes(passion)
            ? current.filter(p => p !== passion)
            : [...current, passion]
        handleChange('passions', updated)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateMutation.mutate(formData)
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <span className="material-symbols-outlined text-primary text-4xl animate-spin">progress_activity</span>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Verified Badge Display */}
            {profile?.is_verified && (
                <div className="flex items-center gap-2 px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl">
                    <span className="material-symbols-outlined text-primary icon-filled">verified</span>
                    <span className="text-sm font-medium text-primary">Profile Verified</span>
                </div>
            )}

            {/* Display Name */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    Display Name
                </label>
                <Input
                    type="text"
                    value={formData.display_name}
                    onChange={(e) => handleChange('display_name', e.target.value)}
                    placeholder="Your name"
                    maxLength={50}
                    className="h-12 rounded-xl"
                />
            </div>

            {/* Bio */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">edit_note</span>
                    About Me
                </label>
                <textarea
                    value={formData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    placeholder="Write a little about yourself..."
                    maxLength={500}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
                />
                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
                    >
                        <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                        Get AI suggestions
                    </button>
                    <span className="text-xs text-gray-400">
                        {formData.bio.length}/500
                    </span>
                </div>
            </div>

            {/* Gender */}
            <div className="space-y-3">
                <label className="text-sm font-bold text-gray-900 dark:text-white">
                    I am a
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {GENDER_OPTIONS.map(option => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleChange('gender', option.value)}
                            className={`
                                flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all
                                ${formData.gender === option.value
                                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary'
                                }
                            `}
                        >
                            <span className="material-symbols-outlined text-[20px]">{option.icon}</span>
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Show Me */}
            <div className="space-y-3">
                <label className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] icon-filled text-pink-500">favorite</span>
                    Interested In
                </label>
                <div className="flex flex-wrap gap-2">
                    {['male', 'female', 'non-binary'].map(gender => (
                        <button
                            key={gender}
                            type="button"
                            onClick={() => toggleShowMe(gender)}
                            className={`
                                px-5 py-2.5 rounded-full text-sm font-medium transition-all
                                ${formData.preferences.show_me.includes(gender)
                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }
                            `}
                        >
                            {gender === 'male' ? 'Men' : gender === 'female' ? 'Women' : 'Non-binary'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Passions / Interests */}
            <div className="space-y-3">
                <label className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">interests</span>
                    Passions
                    <span className="text-xs text-gray-400 font-normal">(Select up to 5)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                    {PASSION_OPTIONS.map(passion => (
                        <button
                            key={passion}
                            type="button"
                            onClick={() => togglePassion(passion)}
                            disabled={!formData.passions.includes(passion) && formData.passions.length >= 5}
                            className={`
                                px-4 py-2 rounded-full text-sm font-medium transition-all
                                ${formData.passions.includes(passion)
                                    ? 'bg-pink-500 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-pink-100 dark:hover:bg-pink-900/20 disabled:opacity-50 disabled:cursor-not-allowed'
                                }
                            `}
                        >
                            {passion}
                        </button>
                    ))}
                </div>
            </div>

            {/* Age Range */}
            <div className="space-y-3">
                <label className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                    Age Range
                    <span className="ml-auto text-sm font-medium text-primary">
                        {formData.preferences.min_age} - {formData.preferences.max_age}
                    </span>
                </label>
                <div className="flex items-center gap-4">
                    <input
                        type="range"
                        min="18"
                        max="100"
                        value={formData.preferences.min_age}
                        onChange={(e) => handlePreferenceChange('min_age', parseInt(e.target.value))}
                        className="flex-1"
                    />
                    <input
                        type="range"
                        min="18"
                        max="100"
                        value={formData.preferences.max_age}
                        onChange={(e) => handlePreferenceChange('max_age', parseInt(e.target.value))}
                        className="flex-1"
                    />
                </div>
            </div>

            {/* Distance */}
            <div className="space-y-3">
                <label className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    Maximum Distance
                    <span className="ml-auto text-sm font-medium text-primary">
                        {formData.preferences.distance_km} km
                    </span>
                </label>
                <input
                    type="range"
                    min="1"
                    max="200"
                    value={formData.preferences.distance_km}
                    onChange={(e) => handlePreferenceChange('distance_km', parseInt(e.target.value))}
                    className="w-full"
                />
            </div>

            {/* Submit */}
            <Button
                type="submit"
                className="w-full h-12 gap-2 rounded-xl text-base font-bold shadow-lg shadow-primary/20"
                size="lg"
                disabled={updateMutation.isPending}
            >
                {updateMutation.isPending ? (
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : saved ? (
                    <>
                        <span className="material-symbols-outlined icon-filled">check_circle</span>
                        Saved!
                    </>
                ) : (
                    <>
                        <span className="material-symbols-outlined">save</span>
                        Save Changes
                    </>
                )}
            </Button>
        </form>
    )
}
