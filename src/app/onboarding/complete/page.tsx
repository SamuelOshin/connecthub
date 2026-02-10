"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

export default function OnboardingCompletePage() {
    const router = useRouter();
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        // Trigger confetti on mount
        if (!showConfetti) {
            setShowConfetti(true);

            // Fire confetti
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval = setInterval(() => {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    clearInterval(interval);
                    return;
                }

                const particleCount = 50 * (timeLeft / duration);

                confetti({
                    particleCount,
                    startVelocity: 30,
                    spread: 360,
                    origin: {
                        x: randomInRange(0.1, 0.9),
                        y: Math.random() - 0.2,
                    },
                    colors: ["#007bff", "#FFB020", "#22c55e", "#f43f5e"],
                });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [showConfetti]);

    return (
        <div className="bg-white dark:bg-[#1a2733] rounded-2xl shadow-lg p-8 text-center">
            {/* Success icon */}
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                You&apos;re all set! 🎉
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                Your profile is ready. Time to start discovering amazing people who share your interests.
            </p>

            {/* Tips */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick tips</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Swipe right to like, left to pass</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Add a comment when you like to stand out</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>When you both like each other, it&apos;s a match!</span>
                    </li>
                </ul>
            </div>

            <Button
                onClick={() => router.push("/discover")}
                className="w-full py-6 text-lg font-semibold mb-4"
            >
                Start Discovering
            </Button>

            <Link
                href="/profile"
                className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
                Edit my profile first
            </Link>
        </div>
    );
}
