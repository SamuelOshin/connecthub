"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function OnboardingPreferencesPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [preferences, setPreferences] = useState({
        min_age: 18,
        max_age: 45,
        max_distance_km: 50,
    });

    const handleSubmit = async () => {
        if (preferences.min_age < 18) {
            setError("Minimum age must be 18 or older");
            return;
        }
        if (preferences.max_age < preferences.min_age) {
            setError("Maximum age must be greater than minimum age");
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

            // Upsert preferences
            const { error: upsertError } = await (supabase
                .from("user_preferences") as any)
                .upsert({
                    user_id: user.id,
                    min_age: preferences.min_age,
                    max_age: preferences.max_age,
                    max_distance_km: preferences.max_distance_km,
                }, { onConflict: "user_id" });

            if (upsertError) {
                console.error("Preferences error:", upsertError);
                setError("Failed to save preferences. Please try again.");
                return;
            }

            // Mark onboarding as complete on profile
            const { error: profileError } = await (supabase
                .from("profiles") as any)
                .update({
                    updated_at: new Date().toISOString(),
                })
                .eq("id", user.id);

            if (profileError) {
                console.error("Profile update error:", profileError);
            }

            router.push("/onboarding/complete");
        } catch (err) {
            console.error("Error saving preferences:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-[#1a2733] rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Your preferences
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Who would you like to meet?
                </p>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-6">
                    {error}
                </div>
            )}

            <div className="space-y-8">
                {/* Age Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                        Age Range
                    </label>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <label className="text-xs text-gray-500 mb-1 block">Min</label>
                            <input
                                type="number"
                                min={18}
                                max={99}
                                value={preferences.min_age}
                                onChange={(e) => setPreferences(prev => ({
                                    ...prev,
                                    min_age: Math.max(18, Math.min(99, parseInt(e.target.value) || 18))
                                }))}
                                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-lg font-semibold"
                            />
                        </div>
                        <span className="text-gray-400 mt-5">to</span>
                        <div className="flex-1">
                            <label className="text-xs text-gray-500 mb-1 block">Max</label>
                            <input
                                type="number"
                                min={18}
                                max={99}
                                value={preferences.max_age}
                                onChange={(e) => setPreferences(prev => ({
                                    ...prev,
                                    max_age: Math.max(18, Math.min(99, parseInt(e.target.value) || 45))
                                }))}
                                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-lg font-semibold"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <input
                            type="range"
                            min={18}
                            max={99}
                            value={preferences.max_age}
                            onChange={(e) => setPreferences(prev => ({ ...prev, max_age: parseInt(e.target.value) }))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                        />
                    </div>
                </div>

                {/* Distance */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                        Maximum Distance
                    </label>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                        <div className="text-center mb-4">
                            <span className="text-4xl font-bold text-primary">{preferences.max_distance_km}</span>
                            <span className="text-gray-500 ml-1">km</span>
                        </div>
                        <input
                            type="range"
                            min={5}
                            max={200}
                            step={5}
                            value={preferences.max_distance_km}
                            onChange={(e) => setPreferences(prev => ({ ...prev, max_distance_km: parseInt(e.target.value) }))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 accent-primary"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>5 km</span>
                            <span>200 km</span>
                        </div>
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
                    {loading ? "Saving..." : "Complete Setup"}
                </Button>
            </div>
        </div>
    );
}
