"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PulseLogo } from "@/components/brand/PulseLogo";

const ONBOARDING_STEPS = [
    { path: "/onboarding/basics", label: "Basics", step: 1 },
    { path: "/onboarding/photos", label: "Photos", step: 2 },
    { path: "/onboarding/bio", label: "Bio", step: 3 },
    { path: "/onboarding/preferences", label: "Preferences", step: 4 },
];

function ProgressIndicator() {
    const pathname = usePathname();
    const currentStepIndex = ONBOARDING_STEPS.findIndex(s => pathname.startsWith(s.path));
    const currentStep = currentStepIndex >= 0 ? currentStepIndex + 1 : 1;

    return (
        <div className="w-full max-w-md mx-auto mb-8">
            {/* Progress bar */}
            <div className="flex items-center justify-between mb-2">
                {ONBOARDING_STEPS.map((step, index) => (
                    <React.Fragment key={step.path}>
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${index + 1 < currentStep
                                    ? "bg-green-500 text-white"
                                    : index + 1 === currentStep
                                        ? "bg-primary text-white"
                                        : "bg-gray-200 text-gray-500"
                                    }`}
                            >
                                {index + 1 < currentStep ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    step.step
                                )}
                            </div>
                            <span className={`text-xs mt-1 ${index + 1 === currentStep ? "text-primary font-medium" : "text-gray-500"}`}>
                                {step.label}
                            </span>
                        </div>
                        {index < ONBOARDING_STEPS.length - 1 && (
                            <div
                                className={`flex-1 h-1 mx-2 rounded ${index + 1 < currentStep ? "bg-green-500" : "bg-gray-200"
                                    }`}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f5f7f8] to-[#e8eef3] dark:from-[#0f1923] dark:to-[#1a2733]">
            {/* Header */}
            <header className="py-6 px-4">
                <div className="max-w-lg mx-auto flex items-center justify-center">
                    <Link href="/" className="flex items-center gap-2">
                        <PulseLogo width={32} height={32} />
                        <span className="text-2xl text-[#111418] dark:text-white tracking-tight">
                            <span className="font-bold">Connect</span>
                            <span className="font-normal">Hub</span>
                        </span>
                    </Link>
                </div>
            </header>

            {/* Main content */}
            <main className="px-4 pb-8">
                <div className="max-w-lg mx-auto">
                    <ProgressIndicator />
                    {children}
                </div>
            </main>
        </div>
    );
}
