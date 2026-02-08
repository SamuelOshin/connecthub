'use client';

import { usePreferences } from '@/hooks/usePreferences';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Save, Loader2 } from 'lucide-react';

export const PreferencesForm = () => {
    const { preferences, isLoading, updatePreferences, isUpdating } = usePreferences();

    // Local state for immediate feedback
    const [formData, setFormData] = useState({
        min_age: 18,
        max_age: 50,
        max_distance_km: 50,
        gender_preference: [] as string[],
        is_global: false,
    });

    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (preferences) {
            setFormData({
                min_age: preferences.min_age,
                max_age: preferences.max_age,
                max_distance_km: preferences.max_distance_km,
                gender_preference: preferences.gender_preference,
                is_global: preferences.is_global,
            });
        }
    }, [preferences]);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setHasChanges(true);
    };

    const handleGenderToggle = (gender: string) => {
        const current = formData.gender_preference;
        if (current.includes(gender)) {
            handleChange('gender_preference', current.filter(g => g !== gender));
        } else {
            handleChange('gender_preference', [...current, gender]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updatePreferences(formData);
            setHasChanges(false);
        } catch (error) {
            console.error('Failed to save:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-rose-500" />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
            {/* Age Range */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        Age Preference
                    </label>
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        {formData.min_age} - {formData.max_age}
                    </span>
                </div>

                <div className="flex gap-4">
                    <input
                        type="range"
                        min={18}
                        max={100}
                        value={formData.min_age}
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (val <= formData.max_age) handleChange('min_age', val);
                        }}
                        className="w-full accent-purple-600"
                    />
                    <input
                        type="range"
                        min={18}
                        max={100}
                        value={formData.max_age}
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (val >= formData.min_age) handleChange('max_age', val);
                        }}
                        className="w-full accent-purple-600"
                    />
                </div>
            </div>

            {/* Distance */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        Maximum Distance
                    </label>
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        {formData.max_distance_km} km
                    </span>
                </div>

                <input
                    type="range"
                    min={5}
                    max={500}
                    step={5}
                    value={formData.max_distance_km}
                    onChange={(e) => handleChange('max_distance_km', parseInt(e.target.value))}
                    className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />

                <div className="flex items-center justify-between p-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl">
                    <div>
                        <div className="font-medium text-zinc-900 dark:text-zinc-100">Global Mode</div>
                        <div className="text-xs text-zinc-500">See people nearby if run out</div>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleChange('is_global', !formData.is_global)}
                        className={cn(
                            "w-12 h-6 rounded-full transition-colors relative",
                            formData.is_global ? "bg-purple-600" : "bg-zinc-300 dark:bg-zinc-700"
                        )}
                    >
                        <div className={cn(
                            "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                            formData.is_global ? "left-7" : "left-1"
                        )} />
                    </button>
                </div>
            </div>

            {/* Gender */}
            <div className="space-y-4">
                <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Show Me
                </label>

                <div className="grid grid-cols-3 gap-3">
                    {['MALE', 'FEMALE', 'NON_BINARY'].map((gender) => (
                        <button
                            key={gender}
                            type="button"
                            onClick={() => handleGenderToggle(gender)}
                            className={cn(
                                "py-3 px-2 rounded-xl text-sm font-medium border transition-all",
                                formData.gender_preference.includes(gender)
                                    ? "border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:border-zinc-300"
                            )}
                        >
                            {gender === 'NON_BINARY' ? 'Non-binary' : gender.charAt(0) + gender.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Submit */}
            <div className="fixed bottom-0 left-0 w-full p-4 bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800">
                <div className="max-w-md mx-auto">
                    <button
                        type="submit"
                        disabled={!hasChanges || isUpdating}
                        className={cn(
                            "w-full py-3 px-6 rounded-full font-semibold text-white transition-all shadow-lg flex items-center justify-center gap-2",
                            hasChanges
                                ? "bg-purple-600 hover:bg-purple-500 shadow-purple-600/20"
                                : "bg-zinc-300 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed shadow-none"
                        )}
                    >
                        {isUpdating ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                        {isUpdating ? 'Saving...' : 'Save Preferences'}
                    </button>
                </div>
            </div>
        </form>
    );
};
