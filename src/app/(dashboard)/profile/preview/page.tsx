'use client'

import { useProfile } from '@/hooks/useProfile'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { photosApi } from '@/lib/api'

export default function PublicProfilePreview() {
    const router = useRouter()
    const { data: profile, isLoading: isProfileLoading } = useProfile()

    const { data: photos = [], isLoading: isPhotosLoading } = useQuery({
        queryKey: ['my-photos'],
        queryFn: () => photosApi.getMyPhotos(),
    })

    if (isProfileLoading || isPhotosLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
            </div>
        )
    }

    if (!profile) return null

    // Get photos for display
    const primaryPhoto = photos.find(p => p.is_primary) || photos[0]
    const otherPhotos = photos.filter(p => p.id !== primaryPhoto?.id).slice(0, 2)
    const totalPhotos = photos.length

    return (
        <div className="flex-1 overflow-y-auto bg-[#f5f7f8] dark:bg-[#0f1923] p-4 md:p-6 lg:p-8 custom-scrollbar pb-24">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-sm transition-all focus:ring-2 focus:ring-primary focus:outline-none"
                            aria-label="Go back"
                        >
                            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">chevron_left</span>
                        </button>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Public Profile View</h2>
                    </div>
                    <Button
                        onClick={() => router.push('/profile')}
                        className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg w-full sm:w-auto touch-manipulation"
                    >
                        <span className="material-symbols-outlined text-sm">edit</span>
                        Back to Edit
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Photos Column */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 relative group bg-slate-200 dark:bg-slate-800">
                            {primaryPhoto ? (
                                <img
                                    alt="Primary Profile Photo"
                                    className="w-full h-full object-cover"
                                    src={primaryPhoto.url}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <span className="material-symbols-outlined text-6xl">person</span>
                                </div>
                            )}
                            <div className="absolute bottom-4 left-4 flex gap-2">
                                <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                                    1/{totalPhotos || 1}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {otherPhotos.map((photo) => (
                                <div key={photo.id} className="aspect-square rounded-2xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm bg-slate-200 dark:bg-slate-800">
                                    <img
                                        alt="Secondary Profile Photo"
                                        className="w-full h-full object-cover"
                                        src={photo.url}
                                    />
                                </div>
                            ))}
                            {/* Placeholder for empty slots */}
                            {otherPhotos.length < 2 && (
                                <div className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/50 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-slate-400">add_photo_alternate</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Column */}
                    <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                                            {profile.display_name}, {profile.age}
                                        </h3>
                                        {profile.is_verified && (
                                            <span className="material-symbols-outlined text-primary text-[20px] sm:text-[24px] icon-filled">verified</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        San Francisco, CA
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-all focus:ring-2 focus:ring-primary focus:outline-none">
                                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">share</span>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 sm:mt-8">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-primary text-sm">notes</span>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">About Me</h4>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                                    {profile.bio || "No bio added yet."}
                                </p>
                            </div>

                            <div className="mt-6 sm:mt-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-primary text-sm">local_offer</span>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Interests</h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {profile.passions?.map((passion) => (
                                        <span key={passion} className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                                            {passion}
                                        </span>
                                    ))}
                                    {(!profile.passions || profile.passions.length === 0) && (
                                        <span className="text-slate-500 italic text-sm">No interests selected.</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Prompts */}
                        <div className="space-y-4">
                            {/* Prompt 1 - Indigo */}
                            <div className="bg-indigo-50 dark:bg-indigo-950/40 rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 border border-indigo-100 dark:border-indigo-900/50">
                                <p className="text-indigo-600 dark:text-indigo-400 font-bold mb-2 sm:mb-3 text-sm sm:text-base">
                                    {profile.prompts?.[0]?.question || "A fun fact about me is..."}
                                </p>
                                <div className="flex items-end justify-between">
                                    <p className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
                                        {profile.prompts?.[0]?.answer || "Ask me!"}
                                    </p>
                                    <span className="material-symbols-outlined text-indigo-400 dark:text-indigo-600 ml-4 text-2xl sm:text-3xl">auto_awesome</span>
                                </div>
                            </div>

                            {/* Prompt 2 - Pink */}
                            <div className="bg-pink-50 dark:bg-pink-950/40 rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 border border-pink-100 dark:border-pink-900/50">
                                <p className="text-pink-600 dark:text-pink-400 font-bold mb-2 sm:mb-3 text-sm sm:text-base">
                                    {profile.prompts?.[1]?.question || "Two truths and a lie"}
                                </p>
                                <div className="flex items-end justify-between">
                                    <div className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white whitespace-pre-wrap">
                                        {profile.prompts?.[1]?.answer || "Ask me!"}
                                    </div>
                                    <span className="material-symbols-outlined text-pink-400 dark:text-pink-600 ml-4 text-2xl sm:text-3xl">quiz</span>
                                </div>
                            </div>

                            {/* Prompt 3 */}
                            {profile.prompts?.[2] && (
                                <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 border border-emerald-100 dark:border-emerald-900/50">
                                    <p className="text-emerald-600 dark:text-emerald-400 font-bold mb-2 sm:mb-3 text-sm sm:text-base">
                                        {profile.prompts[2].question}
                                    </p>
                                    <div className="flex items-end justify-between">
                                        <p className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
                                            {profile.prompts[2].answer}
                                        </p>
                                        <span className="material-symbols-outlined text-emerald-400 dark:text-emerald-600 ml-4 text-2xl sm:text-3xl">schedule</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-center pt-8 pb-12">
                            <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors font-medium text-sm sm:text-base">
                                <span className="material-symbols-outlined text-lg">flag</span>
                                Report or Block {profile.display_name}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
