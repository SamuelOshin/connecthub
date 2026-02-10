/**
 * Edit Profile page — premium design with gradient header,
 * color-coded card sections, smooth micro-interactions,
 * and polished form controls.
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useProfile } from '@/hooks/useProfile'
import { Button } from '@/components/ui/button'
import { PhotoUpload } from '@/components/features/profile/PhotoUpload'

/* ── Option lists ────────────────────────── */

const GENDER_OPTIONS = [
    { value: 'male', label: 'Man', icon: 'male' },
    { value: 'female', label: 'Woman', icon: 'female' },
    { value: 'non-binary', label: 'Non-binary', icon: 'transgender' },
    { value: 'other', label: 'Other', icon: 'more_horiz' },
]

const SHOW_ME_OPTIONS = [
    { value: 'male', label: 'Men' },
    { value: 'female', label: 'Women' },
    { value: 'non-binary', label: 'Non-binary' },
]

const PASSION_OPTIONS = [
    '🎵 Music', '🏋️ Fitness', '✈️ Travel', '📚 Reading',
    '🎮 Gaming', '🎨 Art', '📷 Photography', '🍳 Cooking',
    '🎬 Movies', '🧘 Yoga', '🐕 Dogs', '☕ Coffee',
    '🏃 Running', '🎸 Guitar', '🌿 Nature', '🍷 Wine',
]

const PROMPT_SUGGESTIONS = [
    'A fun fact about me is...',
    'Two truths and a lie',
    'My ideal first date...',
]

/* ── Component ───────────────────────────── */

export default function EditProfilePage() {
    const router = useRouter()
    const { data: profile, isLoading, isUsingMock, updateProfile, isUpdating } = useProfile()

    const [saved, setSaved] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)

    // ── Form state ──
    const [displayName, setDisplayName] = useState('')
    const [bio, setBio] = useState('')
    const [gender, setGender] = useState('')
    const [lookingFor, setLookingFor] = useState<string[]>([])
    const [passions, setPassions] = useState<string[]>([])
    const [prompts, setPrompts] = useState<{ question: string; answer: string }[]>([])
    const [preferences, setPreferences] = useState({
        min_age: 18,
        max_age: 50,
        distance_km: 50,
        show_me: ['male', 'female'] as string[],
    })

    // ── Populate when profile loads ──
    useEffect(() => {
        if (profile) {
            setDisplayName(profile.display_name || '')
            setBio(profile.bio || '')
            setGender(profile.gender || '')
            setLookingFor(profile.looking_for || [])
            setPassions(profile.passions || [])
            setPrompts(profile.prompts || [])
            setPreferences({
                min_age: profile.preferences?.min_age ?? 18,
                max_age: profile.preferences?.max_age ?? 50,
                distance_km: profile.preferences?.distance_km ?? 50,
                show_me: profile.preferences?.show_me ?? ['male', 'female'],
            })
        }
    }, [profile])

    const markDirty = useCallback(() => setHasChanges(true), [])

    // ── Save handler ──
    const handleDone = () => {
        updateProfile(
            {
                display_name: displayName.trim(),
                bio,
                gender,
                looking_for: lookingFor,
                passions,
                prompts,
                preferences,
            },
            {
                onSuccess: () => {
                    setSaved(true)
                    setHasChanges(false)
                    setTimeout(() => {
                        setSaved(false)
                        router.push('/profile')
                    }, 800)
                },
            },
        )
    }

    // ── Helpers ──
    const toggleShowMe = (g: string) => {
        setPreferences(prev => {
            const current = prev.show_me
            const updated = current.includes(g)
                ? current.filter(v => v !== g)
                : [...current, g]
            if (updated.length === 0) return prev
            return { ...prev, show_me: updated }
        })
        markDirty()
    }

    const togglePassion = (p: string) => {
        setPassions(prev => {
            if (prev.includes(p)) return prev.filter(x => x !== p)
            if (prev.length >= 5) return prev
            return [...prev, p]
        })
        markDirty()
    }

    const handlePromptChange = (idx: number, field: 'question' | 'answer', value: string) => {
        setPrompts(prev => {
            const copy = [...prev]
            if (!copy[idx]) copy[idx] = { question: PROMPT_SUGGESTIONS[idx] || '', answer: '' }
            copy[idx] = { ...copy[idx], [field]: value }
            return copy
        })
        markDirty()
    }

    // ── Loading state ──
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full bg-[#f5f7f8] dark:bg-[#0f1923]">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <span className="absolute inset-0 flex items-center justify-center material-symbols-outlined text-primary text-xl icon-filled">edit</span>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full overflow-y-auto bg-[#f5f7f8] dark:bg-[#0f1923]">

            {/* ─── Gradient Header ─── */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-indigo-700 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-950" />
                <div className="absolute top-[-60%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-40%] left-[-10%] w-48 h-48 bg-blue-400/15 rounded-full blur-3xl" />

                <div className="relative px-4 sm:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => router.push('/profile')}
                            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 transition-all duration-200"
                        >
                            <span className="material-symbols-outlined text-white text-[20px]">arrow_back</span>
                        </button>
                        <div>
                            <h1 className="text-lg font-extrabold text-white tracking-tight">Edit Profile</h1>
                            <p className="text-xs text-white/60 font-medium">Make your profile shine ✨</p>
                        </div>
                        {isUsingMock && (
                            <span className="px-2.5 py-1 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20">
                                Offline
                            </span>
                        )}
                    </div>
                    <Button
                        onClick={handleDone}
                        disabled={isUpdating || !hasChanges}
                        className="rounded-xl px-5 h-10 text-sm font-bold gap-2 bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/10 disabled:opacity-50 disabled:bg-white/60"
                    >
                        {isUpdating ? (
                            <>
                                <div className="w-4 h-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                                Saving
                            </>
                        ) : saved ? (
                            <>
                                <span className="material-symbols-outlined text-[18px] text-green-600 icon-filled">check_circle</span>
                                Saved!
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-[18px]">check</span>
                                Done
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* ─── Content ─── */}
            <div className="p-4 sm:p-8 pb-24 sm:pb-8 max-w-2xl mx-auto space-y-5">

                {/* ── Section: Photos ── */}
                <div className="bg-white dark:bg-[#1a2332] rounded-2xl p-5 sm:p-6 shadow-lg dark:shadow-black/20 border border-gray-100 dark:border-gray-800/50">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[16px]">photo_library</span>
                        </div>
                        <h2 className="text-base font-bold text-gray-900 dark:text-white">Photos</h2>
                        <span className="ml-auto text-xs text-gray-400 font-medium px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">Drag to reorder</span>
                    </div>
                    <PhotoUpload />
                </div>

                {/* ── Section: About Me ── */}
                <div className="bg-white dark:bg-[#1a2332] rounded-2xl p-5 sm:p-6 shadow-lg dark:shadow-black/20 border border-gray-100 dark:border-gray-800/50">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[16px]">person</span>
                        </div>
                        <h2 className="text-base font-bold text-gray-900 dark:text-white">About Me</h2>
                    </div>

                    {/* Display Name */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Display Name
                        </label>
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">badge</span>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => { setDisplayName(e.target.value); markDirty() }}
                                placeholder="Your first name"
                                maxLength={50}
                                className="w-full h-12 pl-10 pr-4 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Bio</label>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${bio.length > 450
                                    ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                                    : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                                }`}>{bio.length}/500</span>
                        </div>
                        <textarea
                            value={bio}
                            onChange={(e) => { setBio(e.target.value); markDirty() }}
                            placeholder="Tell others what makes you uniquely you..."
                            maxLength={500}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none transition-all duration-200 leading-relaxed"
                        />
                    </div>
                </div>

                {/* ── Section: Basics ── */}
                <div className="bg-white dark:bg-[#1a2332] rounded-2xl p-5 sm:p-6 shadow-lg dark:shadow-black/20 border border-gray-100 dark:border-gray-800/50">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[16px]">badge</span>
                        </div>
                        <h2 className="text-base font-bold text-gray-900 dark:text-white">Basics</h2>
                    </div>

                    {/* Gender */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">I am a</label>
                        <div className="grid grid-cols-2 gap-2.5">
                            {GENDER_OPTIONS.map(opt => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => { setGender(opt.value); markDirty() }}
                                    className={`group flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${gender === opt.value
                                            ? 'bg-gradient-to-r from-primary/10 to-blue-500/5 text-primary border-primary shadow-sm shadow-primary/10 dark:from-primary/20 dark:to-blue-500/10'
                                            : 'bg-white dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                >
                                    <span className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${gender === opt.value ? 'scale-110' : 'group-hover:scale-105'
                                        }`}>{opt.icon}</span>
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Looking For / Show Me */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-pink-500 text-[18px] icon-filled">favorite</span>
                                Interested In
                            </span>
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                            {SHOW_ME_OPTIONS.map(opt => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => toggleShowMe(opt.value)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${preferences.show_me.includes(opt.value)
                                            ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-md shadow-primary/25'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Section: Profile Prompts ── */}
                <div className="bg-white dark:bg-[#1a2332] rounded-2xl p-5 sm:p-6 shadow-lg dark:shadow-black/20 border border-gray-100 dark:border-gray-800/50">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[16px]">quiz</span>
                        </div>
                        <h2 className="text-base font-bold text-gray-900 dark:text-white">Profile Prompts</h2>
                        <span className="ml-auto text-xs text-gray-400 font-medium">Express yourself</span>
                    </div>

                    <div className="space-y-4">
                        {[0, 1, 2].map(idx => (
                            <div key={idx} className="rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/30 dark:from-gray-800/50 dark:to-gray-800/20 p-4 border border-gray-100 dark:border-gray-700/50">
                                <label className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2 block">
                                    {prompts[idx]?.question || PROMPT_SUGGESTIONS[idx] || `Prompt ${idx + 1}`}
                                </label>
                                <textarea
                                    rows={2}
                                    value={prompts[idx]?.answer || ''}
                                    onChange={(e) => handlePromptChange(idx, 'answer', e.target.value)}
                                    placeholder="Your answer..."
                                    className="w-full px-0 py-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none resize-none leading-relaxed"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Section: Passions ── */}
                <div className="bg-white dark:bg-[#1a2332] rounded-2xl p-5 sm:p-6 shadow-lg dark:shadow-black/20 border border-gray-100 dark:border-gray-800/50">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[16px] icon-filled">favorite</span>
                        </div>
                        <h2 className="text-base font-bold text-gray-900 dark:text-white">Passions</h2>
                        <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400">{passions.length}/5</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">Select up to 5 things you love</p>

                    <div className="flex flex-wrap gap-2">
                        {PASSION_OPTIONS.map(passion => (
                            <button
                                key={passion}
                                type="button"
                                onClick={() => togglePassion(passion)}
                                disabled={!passions.includes(passion) && passions.length >= 5}
                                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${passions.includes(passion)
                                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25 scale-[1.02]'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-pink-900/10 dark:hover:text-pink-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-gray-600'
                                    }`}
                            >
                                {passion}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Section: Discovery Preferences ── */}
                <div className="bg-white dark:bg-[#1a2332] rounded-2xl p-5 sm:p-6 shadow-lg dark:shadow-black/20 border border-gray-100 dark:border-gray-800/50">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[16px]">tune</span>
                        </div>
                        <h2 className="text-base font-bold text-gray-900 dark:text-white">Discovery Preferences</h2>
                    </div>

                    {/* Age Range */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] text-teal-500">calendar_month</span>
                                Age Range
                            </label>
                            <span className="text-sm font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
                                {preferences.min_age} – {preferences.max_age}
                            </span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-400 font-semibold w-6 text-right">Min</span>
                                <input
                                    type="range"
                                    min="18"
                                    max="100"
                                    value={preferences.min_age}
                                    onChange={(e) => {
                                        const v = parseInt(e.target.value)
                                        setPreferences(prev => ({
                                            ...prev,
                                            min_age: Math.min(v, prev.max_age - 1),
                                        }))
                                        markDirty()
                                    }}
                                    className="flex-1 accent-primary"
                                />
                                <span className="text-xs font-bold text-gray-600 dark:text-gray-300 w-8">{preferences.min_age}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-400 font-semibold w-6 text-right">Max</span>
                                <input
                                    type="range"
                                    min="18"
                                    max="100"
                                    value={preferences.max_age}
                                    onChange={(e) => {
                                        const v = parseInt(e.target.value)
                                        setPreferences(prev => ({
                                            ...prev,
                                            max_age: Math.max(v, prev.min_age + 1),
                                        }))
                                        markDirty()
                                    }}
                                    className="flex-1 accent-primary"
                                />
                                <span className="text-xs font-bold text-gray-600 dark:text-gray-300 w-8">{preferences.max_age}</span>
                            </div>
                        </div>
                    </div>

                    {/* Distance */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] text-teal-500">location_on</span>
                                Maximum Distance
                            </label>
                            <span className="text-sm font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
                                {preferences.distance_km} km
                            </span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="200"
                            value={preferences.distance_km}
                            onChange={(e) => {
                                setPreferences(prev => ({ ...prev, distance_km: parseInt(e.target.value) }))
                                markDirty()
                            }}
                            className="w-full accent-primary"
                        />
                        <div className="flex justify-between text-xs text-gray-400 font-medium mt-1.5">
                            <span>1 km</span>
                            <span>200 km</span>
                        </div>
                    </div>
                </div>

                {/* Bottom spacer for mobile nav */}
                <div className="h-6" />
            </div>
        </div>
    )
}
