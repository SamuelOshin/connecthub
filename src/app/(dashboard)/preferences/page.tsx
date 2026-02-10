'use client';

import { PreferencesForm } from '@/components/features/preferences/PreferencesForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PreferencesPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black pt-6">
            <div className="max-w-md mx-auto px-4 w-full">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <Link
                        href="/discover"
                        className="p-2 -ml-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    >
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        Preferences
                    </h1>
                </div>

                {/* Form */}
                <PreferencesForm />
            </div>
        </div>
    );
}
