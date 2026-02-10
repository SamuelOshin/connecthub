/**
 * Profile page —   premium view-only layout with hero gradient,
 * profile card depth, and polished micro-interactions.
 * Pencil FAB navigates to /profile/edit.
 */

'use client'

import { PhotoUpload } from '@/components/features/profile/PhotoUpload'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useProfile } from '@/hooks/useProfile'

export default function ProfilePage() {
    const router = useRouter()
    const { user } = useAuth()
    const { data: profile, isLoading, isUsingMock } = useProfile()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full bg-[#f5f7f8] dark:bg-[#0f1923]">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <span className="absolute inset-0 flex items-center justify-center material-symbols-outlined text-primary text-xl icon-filled">person</span>
                </div>
            </div>
        )
    }

    const completionItems = [
        { done: !!profile?.display_name, label: 'Name' },
        { done: !!profile?.bio, label: 'Bio' },
        { done: !!profile?.gender, label: 'Gender' },
        { done: (profile?.prompts?.length ?? 0) > 0, label: 'Prompts' },
        { done: (profile?.passions?.length ?? 0) > 0, label: 'Passions' },
        { done: !!profile?.primary_photo_url, label: 'Photo' },
    ]
    const completionCount = completionItems.filter(i => i.done).length
    const completionPct = Math.round((completionCount / completionItems.length) * 100)

    return (
        <div className="h-full overflow-y-auto bg-[#f5f7f8] dark:bg-[#0f1923]">

            {/* ─── Hero Gradient Header ─── */}
            <div className="relative overflow-hidden">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-indigo-700 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-950" />
                {/* Decorative blobs */}
                <div className="absolute top-[-40%] right-[-20%] w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-30%] left-[-15%] w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />

                <div className="relative px-4 sm:px-8 pt-6 pb-16 sm:pb-20">
                    {/* Top bar */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">My Profile</h1>
                            {isUsingMock && (
                                <span className="px-2.5 py-1 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center gap-1.5 border border-white/20">
                                    <span className="material-symbols-outlined text-[13px]">cloud_off</span>
                                    Offline
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => router.push('/profile/edit')}
                            className="group flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm font-semibold transition-all duration-200"
                        >
                            <span className="material-symbols-outlined text-[18px] group-hover:rotate-12 transition-transform duration-200">edit</span>
                            Edit Profile
                        </button>
                    </div>

                    {/* Profile identity */}
                    <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 overflow-hidden flex items-center justify-center shadow-xl">
                                {profile?.primary_photo_url ? (
                                    <img src={profile.primary_photo_url} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="material-symbols-outlined text-white/70 text-4xl sm:text-5xl">person</span>
                                )}
                            </div>
                            {profile?.is_verified && (
                                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <span className="material-symbols-outlined text-primary text-[18px] icon-filled">verified</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white truncate">
                                {profile?.display_name || 'Your Name'}
                                {profile?.age ? <span className="font-normal opacity-80">, {profile.age}</span> : null}
                            </h2>
                            <p className="text-sm text-white/70 mt-0.5 capitalize">
                                {profile?.gender || 'Not specified'}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-white/60 font-medium">Profile {completionPct}% complete</span>
                                <div className="flex-1 max-w-[120px] h-1.5 bg-white/15 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transition-all duration-700"
                                        style={{ width: `${completionPct}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Main Content — overlaps hero ─── */}
            <div className="relative -mt-8 sm:-mt-10 px-4 sm:px-8 pb-24 sm:pb-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-6xl mx-auto">

                    {/* ── Left Column — Photos ── */}
                    <div className="w-full lg:w-[400px] shrink-0 order-2 lg:order-1">
                        <div className="bg-white dark:bg-[#1a2332] rounded-2xl p-5 sm:p-6 shadow-lg dark:shadow-black/20 border border-gray-100 dark:border-gray-800/50">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-[16px]">photo_library</span>
                                    </div>
                                    <h2 className="text-base font-bold text-gray-900 dark:text-white">Photos</h2>
                                </div>
                                <span className="text-xs text-gray-400 font-medium">Drag to reorder</span>
                            </div>
                            <PhotoUpload />
                        </div>
                    </div>

                    {/* ── Right Column — Profile Details ── */}
                    <div className="flex-1 min-w-0 order-1 lg:order-2 space-y-5">

                        {/* About Me Card */}
                        <div className="bg-white dark:bg-[#1a2332] rounded-2xl p-5 sm:p-6 shadow-lg dark:shadow-black/20 border border-gray-100 dark:border-gray-800/50">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-[16px]">edit_note</span>
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white">About Me</h3>
                                </div>
                                <button
                                    onClick={() => router.push('/profile/edit')}
                                    className="p-2 rounded-xl text-gray-400 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200"
                                >
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                </button>
                            </div>
                            {profile?.bio ? (
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{profile.bio}</p>
                            ) : (
                                <button
                                    onClick={() => router.push('/profile/edit')}
                                    className="w-full py-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-sm text-gray-400 hover:border-primary hover:text-primary transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                    Add a bio to introduce yourself
                                </button>
                            )}
                        </div>

                        {/* Prompts Card */}
                        <div className="bg-white dark:bg-[#1a2332] rounded-2xl p-5 sm:p-6 shadow-lg dark:shadow-black/20 border border-gray-100 dark:border-gray-800/50">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-[16px]">quiz</span>
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white">Profile Prompts</h3>
                                </div>
                                <button
                                    onClick={() => router.push('/profile/edit')}
                                    className="p-2 rounded-xl text-gray-400 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200"
                                >
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                </button>
                            </div>

                            {profile?.prompts && profile.prompts.length > 0 ? (
                                <div className="space-y-3">
                                    {profile.prompts.map((p, idx) => (
                                        <div key={idx} className="rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-800/30 p-4 border border-gray-100 dark:border-gray-700/50">
                                            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1.5">{p.question}</p>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {p.answer || <span className="italic text-gray-400">No answer yet</span>}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <button
                                    onClick={() => router.push('/profile/edit')}
                                    className="w-full py-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-sm text-gray-400 hover:border-primary hover:text-primary transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                    Add prompts to stand out
                                </button>
                            )}
                        </div>

                        {/* Passions Card */}
                        <div className="bg-white dark:bg-[#1a2332] rounded-2xl p-5 sm:p-6 shadow-lg dark:shadow-black/20 border border-gray-100 dark:border-gray-800/50">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-[16px] icon-filled">favorite</span>
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white">Passions & Interests</h3>
                                </div>
                                <button
                                    onClick={() => router.push('/profile/edit')}
                                    className="p-2 rounded-xl text-gray-400 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200"
                                >
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                </button>
                            </div>

                            {profile?.passions && profile.passions.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {profile.passions.map((passion, idx) => (
                                        <span
                                            key={passion}
                                            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 text-pink-700 dark:text-pink-300 border border-pink-200/50 dark:border-pink-800/30"
                                            style={{ animationDelay: `${idx * 50}ms` }}
                                        >
                                            {passion}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <button
                                    onClick={() => router.push('/profile/edit')}
                                    className="w-full py-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-sm text-gray-400 hover:border-pink-400 hover:text-pink-500 transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                    Add interests to find better matches
                                </button>
                            )}
                        </div>

                        {/* Discovery Preferences Summary Card */}
                        <div className="bg-white dark:bg-[#1a2332] rounded-2xl p-5 sm:p-6 shadow-lg dark:shadow-black/20 border border-gray-100 dark:border-gray-800/50">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-[16px]">tune</span>
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white">Discovery Preferences</h3>
                                </div>
                                <button
                                    onClick={() => router.push('/profile/edit')}
                                    className="p-2 rounded-xl text-gray-400 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200"
                                >
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 text-center border border-gray-100 dark:border-gray-700/50">
                                    <span className="material-symbols-outlined text-teal-500 text-[22px] mb-1 block">calendar_month</span>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        {profile?.preferences?.min_age ?? 18} – {profile?.preferences?.max_age ?? 50}
                                    </p>
                                    <p className="text-xs text-gray-400 font-medium mt-0.5">Age Range</p>
                                </div>
                                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 text-center border border-gray-100 dark:border-gray-700/50">
                                    <span className="material-symbols-outlined text-teal-500 text-[22px] mb-1 block">location_on</span>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        {profile?.preferences?.distance_km ?? 50} km
                                    </p>
                                    <p className="text-xs text-gray-400 font-medium mt-0.5">Max Distance</p>
                                </div>
                                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 text-center border border-gray-100 dark:border-gray-700/50">
                                    <span className="material-symbols-outlined text-teal-500 text-[22px] mb-1 block">group</span>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                                        {profile?.preferences?.show_me?.join(', ') ?? 'Everyone'}
                                    </p>
                                    <p className="text-xs text-gray-400 font-medium mt-0.5">Interested In</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ─── Floating Edit FAB (Mobile) ─── */}
            <button
                onClick={() => router.push('/profile/edit')}
                className="fixed bottom-24 right-6 lg:hidden w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-white shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 z-10"
            >
                <span className="material-symbols-outlined text-[24px]">edit</span>
            </button>
        </div>
    )
}
