/**
 * Profile Edit Form Component.
 */

'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { profileApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, Calendar, MapPin, Heart, Loader2, Check } from 'lucide-react'

interface ProfileFormData {
    display_name: string
    bio: string
    gender: string
    looking_for: string[]
    preferences: {
        min_age: number
        max_age: number
        distance_km: number
        show_me: string[]
    }
}

const GENDER_OPTIONS = [
    { value: 'male', label: 'Man' },
    { value: 'female', label: 'Woman' },
    { value: 'non-binary', label: 'Non-binary' },
    { value: 'other', label: 'Other' },
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateMutation.mutate(formData)
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display Name */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-[#111418] dark:text-white flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Display Name
                </label>
                <Input
                    type="text"
                    value={formData.display_name}
                    onChange={(e) => handleChange('display_name', e.target.value)}
                    placeholder="Your name"
                    maxLength={50}
                />
            </div>

            {/* Bio */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-[#111418] dark:text-white">
                    About Me
                </label>
                <textarea
                    value={formData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    placeholder="Write a little about yourself..."
                    maxLength={500}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111418] dark:text-white placeholder:text-[#60758a] focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                <p className="text-xs text-[#60758a] dark:text-gray-400 text-right">
                    {formData.bio.length}/500
                </p>
            </div>

            {/* Gender */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-[#111418] dark:text-white">
                    I am a
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {GENDER_OPTIONS.map(option => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleChange('gender', option.value)}
                            className={`
                px-4 py-3 rounded-xl border text-sm font-medium transition-colors
                ${formData.gender === option.value
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white dark:bg-gray-800 text-[#111418] dark:text-white border-[#dbe0e6] dark:border-gray-700 hover:border-primary'
                                }
              `}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Show Me */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-[#111418] dark:text-white flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Show Me
                </label>
                <div className="flex gap-2">
                    {['male', 'female', 'non-binary'].map(gender => (
                        <button
                            key={gender}
                            type="button"
                            onClick={() => toggleShowMe(gender)}
                            className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${formData.preferences.show_me.includes(gender)
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-[#60758a] hover:bg-gray-200 dark:hover:bg-gray-700'
                                }
              `}
                        >
                            {gender === 'male' ? 'Men' : gender === 'female' ? 'Women' : 'Non-binary'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Age Range */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-[#111418] dark:text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Age Range: {formData.preferences.min_age} - {formData.preferences.max_age}
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
            <div className="space-y-2">
                <label className="text-sm font-medium text-[#111418] dark:text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Maximum Distance: {formData.preferences.distance_km} km
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
                className="w-full gap-2"
                size="lg"
                disabled={updateMutation.isPending}
            >
                {updateMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : saved ? (
                    <>
                        <Check className="w-5 h-5" />
                        Saved!
                    </>
                ) : (
                    'Save Changes'
                )}
            </Button>
        </form>
    )
}
