'use client';

import Link from 'next/link';

export default function SafetyCenterPage() {
    const SAFETY_TIPS = [
        {
            icon: 'videocam',
            title: 'Video Chat First',
            description: 'Before meeting in person, have a video call to verify who you\'re talking to.'
        },
        {
            icon: 'location_on',
            title: 'Meet in Public',
            description: 'Always meet in a public place for your first few dates.'
        },
        {
            icon: 'group',
            title: 'Tell Someone',
            description: 'Let a friend or family member know your plans and location.'
        },
        {
            icon: 'local_taxi',
            title: 'Control Transport',
            description: 'Arrange your own transportation to and from the date.'
        },
    ];

    const SAFETY_FEATURES = [
        {
            icon: 'verified_user',
            title: 'Identity Verification',
            description: 'Verify your profile to build trust with your matches.',
            action: 'Verify Now',
            href: '/identity-verification',
            color: 'primary'
        },
        {
            icon: 'block',
            title: 'Block & Report',
            description: 'Block users and report inappropriate behavior.',
            action: 'Manage',
            href: '/settings/blocked',
            color: 'gray'
        },
        {
            icon: 'shield',
            title: 'Photo Verification',
            description: 'Add a verified badge by submitting a selfie.',
            action: 'Get Verified',
            href: '/settings/photo-verify',
            color: 'green'
        },
    ];

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <div className="max-w-4xl mx-auto p-4 sm:p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <Link
                        href="/settings"
                        className="p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-[28px] text-primary">shield</span>
                        Safety Center
                    </h1>
                </div>

                {/* Emergency Banner */}
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-red-500 text-[24px]">emergency</span>
                        <div>
                            <h3 className="font-bold text-red-700 dark:text-red-400 text-sm mb-1">
                                In immediate danger?
                            </h3>
                            <p className="text-xs text-red-600 dark:text-red-300 mb-2">
                                Contact local emergency services immediately.
                            </p>
                            <button className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">call</span>
                                Emergency Resources
                            </button>
                        </div>
                    </div>
                </div>

                {/* Safety Features */}
                <div className="mb-8">
                    <h2 className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-1">
                        Safety Features
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {SAFETY_FEATURES.map((feature) => (
                            <Link
                                key={feature.title}
                                href={feature.href}
                                className="flex flex-col sm:items-start items-center text-center sm:text-left p-4 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft hover:shadow-md transition-all gap-3"
                            >
                                <div className={`size-12 rounded-xl bg-${feature.color}-100 dark:bg-${feature.color}-900/20 flex items-center justify-center shrink-0`}>
                                    <span className={`material-symbols-outlined text-[24px] text-${feature.color}-600 dark:text-${feature.color}-400`}>
                                        {feature.icon}
                                    </span>
                                </div>
                                <div className="min-w-0 w-full">
                                    <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                                        {feature.description}
                                    </p>
                                    <span className="text-xs font-bold text-primary block w-full">
                                        {feature.action}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Safety Tips */}
                <div>
                    <h2 className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-1">
                        Dating Safety Tips
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {SAFETY_TIPS.map((tip) => (
                            <div
                                key={tip.title}
                                className="flex items-start gap-4 p-4 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft"
                            >
                                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[20px] text-primary">
                                        {tip.icon}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-0.5">
                                        {tip.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {tip.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Support Link */}
                <div className="mt-8 text-center">
                    <Link
                        href="/settings/help"
                        className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined text-[16px]">help</span>
                        Visit Help Center
                    </Link>
                </div>
            </div>
        </div>
    );
}
