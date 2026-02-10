"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormData {
    display_name: string;
    birthdate: string;
    gender: string;
    looking_for: string[];
}

const GENDER_OPTIONS = [
    { value: "male", label: "Man" },
    { value: "female", label: "Woman" },
    { value: "non_binary", label: "Non-binary" },
];

const LOOKING_FOR_OPTIONS = [
    { value: "male", label: "Men" },
    { value: "female", label: "Women" },
    { value: "everyone", label: "Everyone" },
];

export default function OnboardingBasicsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        display_name: "",
        birthdate: "",
        gender: "",
        looking_for: [],
    });

    useEffect(() => {
        const loadUserData = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // Check for existing profile data first
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("display_name, birthdate, gender, looking_for")
                    .eq("id", user.id)
                    .maybeSingle();

                if (profile) {
                    const p = profile as any;
                    setFormData(prev => ({
                        ...prev,
                        display_name: p.display_name || user.user_metadata?.full_name || "",
                        birthdate: p.birthdate || "",
                        gender: p.gender || "",
                        looking_for: p.looking_for || [],
                    }));
                } else {
                    // Pre-fill from auth metadata
                    setFormData(prev => ({
                        ...prev,
                        display_name: user.user_metadata?.full_name || "",
                    }));
                }
            }
        };

        loadUserData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.display_name.trim()) {
            setError("Please enter your name");
            return;
        }
        if (!formData.birthdate) {
            setError("Please enter your birthdate");
            return;
        }
        if (!formData.gender) {
            setError("Please select your gender");
            return;
        }
        if (formData.looking_for.length === 0) {
            setError("Please select who you're interested in");
            return;
        }

        // Age check (must be 18+)
        const birthDate = new Date(formData.birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            setError("You must be 18 or older to use ConnectHub");
            return;
        }

        setLoading(true);

        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/sign-in");
                return;
            }

            // Upsert profile with basics
            const { error: upsertError } = await (supabase
                .from("profiles") as any)
                .upsert({
                    id: user.id,
                    display_name: formData.display_name.trim(),
                    birthdate: formData.birthdate,
                    gender: formData.gender,
                    looking_for: formData.looking_for,
                    updated_at: new Date().toISOString(),
                }, { onConflict: "id" });

            if (upsertError) {
                console.error("Profile upsert error:", upsertError);
                setError("Failed to save profile. Please try again.");
                return;
            }

            // Navigate to next step
            router.push("/onboarding/photos");
        } catch (err) {
            console.error("Error saving basics:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const toggleLookingFor = (value: string) => {
        if (value === "everyone") {
            // If "everyone" is selected, set both male and female
            setFormData(prev => ({
                ...prev,
                looking_for: ["male", "female"],
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                looking_for: prev.looking_for.includes(value)
                    ? prev.looking_for.filter(v => v !== value)
                    : [...prev.looking_for.filter(v => v !== "male" && v !== "female"), value],
            }));
        }
    };

    const isEveryoneSelected = formData.looking_for.includes("male") && formData.looking_for.includes("female");

    return (
        <div className="bg-white dark:bg-[#1a2733] rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Let&apos;s get started
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Tell us a bit about yourself
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        What&apos;s your first name?
                    </label>
                    <Input
                        type="text"
                        value={formData.display_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
                        placeholder="Your first name"
                        maxLength={50}
                        className="w-full"
                    />
                </div>

                {/* Birthdate */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        When&apos;s your birthday?
                    </label>
                    <Input
                        type="date"
                        value={formData.birthdate}
                        onChange={(e) => setFormData(prev => ({ ...prev, birthdate: e.target.value }))}
                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                        className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">You must be 18+ to use ConnectHub</p>
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        I am a...
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {GENDER_OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, gender: option.value }))}
                                className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${formData.gender === option.value
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300"
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Looking for */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        I&apos;m interested in...
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {LOOKING_FOR_OPTIONS.map((option) => {
                            const isSelected = option.value === "everyone"
                                ? isEveryoneSelected
                                : formData.looking_for.includes(option.value);

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => toggleLookingFor(option.value)}
                                    className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${isSelected
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300"
                                        }`}
                                >
                                    {option.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full py-6 text-lg font-semibold"
                >
                    {loading ? "Saving..." : "Continue"}
                </Button>
            </form>
        </div>
    );
}
