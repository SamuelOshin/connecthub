import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface UserPreferences {
    id: string;
    min_age: number;
    max_age: number;
    max_distance_km: number;
    gender_preference: string[]; // 'MALE', 'FEMALE', 'NON_BINARY'
    is_global: boolean; // if true, can see people outside max_distance
}

export const usePreferences = () => {
    const queryClient = useQueryClient();
    const supabase = createClient();

    // Fetch preferences
    const { data: preferences, isLoading } = useQuery({
        queryKey: ['user_preferences'],
        queryFn: async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Not authenticated');

            const response = await fetch(`${API_URL}/discovery/preferences`, {
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to fetch preferences');
            const result = await response.json();
            return result.data as UserPreferences;
        },
    });

    // Update preferences mutation
    const updateMutation = useMutation({
        mutationFn: async (newPrefs: Partial<UserPreferences>) => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Not authenticated');

            const response = await fetch(`${API_URL}/discovery/preferences`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify(newPrefs),
            });

            if (!response.ok) throw new Error('Failed to update preferences');
            return response.json();
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['user_preferences'], data.data);
            // Invalidate discovery/profiles so we refetch with new inputs
            queryClient.invalidateQueries({ queryKey: ['discovery_profiles'] });
        },
    });

    return {
        preferences,
        isLoading,
        updatePreferences: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
    };
};
