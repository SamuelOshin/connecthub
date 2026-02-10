"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

const PROMPT_OPTIONS = [
    "My simple pleasures",
    "A life goal of mine",
    "I'm looking for",
    "One thing I'd love to know about you",
    "Together, we could",
    "I'm convinced that",
    "My most controversial opinion",
    "I go crazy for",
    "Unusual skills",
    "My love language is",
];

export default function OnboardingBioPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bio, setBio] = useState("");
    const [prompts, setPrompts] = useState<{ question: string; answer: string }[]>([]);
    const [showPromptPicker, setShowPromptPicker] = useState(false);

    const handleAddPrompt = (question: string) => {
        if (prompts.length >= 3) return;
        if (prompts.some(p => p.question === question)) return;

        setPrompts(prev => [...prev, { question, answer: "" }]);
        setShowPromptPicker(false);
    };

    const handlePromptAnswer = (index: number, answer: string) => {
        setPrompts(prev => prev.map((p, i) =>
            i === index ? { ...p, answer } : p
        ));
    };

    const handleRemovePrompt = (index: number) => {
        setPrompts(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        // Bio is optional but prompts should have answers if added
        const incompletePrompts = prompts.filter(p => p.answer.trim().length < 10);
        if (incompletePrompts.length > 0) {
            setError("Please complete your prompts (at least 10 characters each)");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/sign-in");
                return;
            }

            // Update profile with bio and prompts
            const { error: updateError } = await (supabase
                .from("profiles") as any)
                .update({
                    bio: bio.trim() || null,
                    prompts: prompts.filter(p => p.answer.trim()),
                    updated_at: new Date().toISOString(),
                })
                .eq("id", user.id);

            if (updateError) {
                console.error("Update error:", updateError);
                setError("Failed to save. Please try again.");
                return;
            }

            router.push("/onboarding/preferences");
        } catch (err) {
            console.error("Error saving bio:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-[#1a2733] rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Tell them about you
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    A great bio helps you stand out
                </p>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-6">
                    {error}
                </div>
            )}

            <div className="space-y-6">
                {/* Bio */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        About me <span className="text-gray-400">(optional)</span>
                    </label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Share a bit about yourself, your interests, what makes you unique..."
                        maxLength={500}
                        rows={4}
                        className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1 text-right">{bio.length}/500</p>
                </div>

                {/* Prompts */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Prompts <span className="text-gray-400">(add up to 3)</span>
                    </label>

                    <div className="space-y-4">
                        {prompts.map((prompt, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-sm font-medium text-primary">{prompt.question}</span>
                                    <button
                                        onClick={() => handleRemovePrompt(index)}
                                        className="text-gray-400 hover:text-red-500 text-lg"
                                    >
                                        ×
                                    </button>
                                </div>
                                <textarea
                                    value={prompt.answer}
                                    onChange={(e) => handlePromptAnswer(index, e.target.value)}
                                    placeholder="Your answer..."
                                    maxLength={200}
                                    rows={2}
                                    className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1 text-right">{prompt.answer.length}/200</p>
                            </div>
                        ))}

                        {prompts.length < 3 && (
                            <div>
                                {showPromptPicker ? (
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Pick a prompt</span>
                                            <button
                                                onClick={() => setShowPromptPicker(false)}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                ×
                                            </button>
                                        </div>
                                        <div className="space-y-2 max-h-48 overflow-y-auto">
                                            {PROMPT_OPTIONS.filter(opt => !prompts.some(p => p.question === opt)).map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => handleAddPrompt(option)}
                                                    className="w-full text-left p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setShowPromptPicker(true)}
                                        className="w-full py-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add a prompt
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mt-8">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1 py-6"
                >
                    Back
                </Button>
                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 py-6 text-lg font-semibold"
                >
                    {loading ? "Saving..." : "Continue"}
                </Button>
            </div>
        </div>
    );
}
