import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface DiscoveryProfile {
    id: string;
    display_name: string;
    age: number;
    gender: string;
    bio: string;
    prompts: {
        question: string;
        answer: string;
    }[];
    photos: {
        id: string;
        url: string;
        position: number;
    }[];
    distance_km: number;
    is_verified: boolean;
    passions: string[];
    match_score: number;
    match_reasons: string[];
    response_badge?: string;
}

export interface SwipeAction {
    profile_id: string;
    direction: 'LEFT' | 'RIGHT' | 'SUPER_LIKE';
    comment?: string;
    comment_target?: string;
}

const MOCK_DISCOVERY_PROFILES: DiscoveryProfile[] = [
    {
        id: 'mock-1',
        display_name: 'Sarah',
        age: 26,
        gender: 'female',
        bio: 'Adventure seeker and coffee enthusiast. fast reply implies I like you',
        prompts: [
            { question: 'A fun fact about me', answer: 'I have visited 30 countries.' },
            { question: 'My golden rule', answer: 'Treat others how you want to be treated.' }
        ],
        photos: [
            { id: 'p1', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80', position: 0 },
            { id: 'p2', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80', position: 1 }
        ],
        distance_km: 3.5,
        is_verified: true,
        passions: ['Travel', 'Photography', 'Coffee'],
        match_score: 0.85,
        match_reasons: ['High Compatibility'],
        response_badge: 'VERY_RESPONSIVE'
    },
    {
        id: 'mock-2',
        display_name: 'James',
        age: 29,
        gender: 'male',
        bio: 'Tech entrepreneur by day, musician by night.',
        prompts: [
            { question: 'My ideal weekend', answer: 'Coding and jamming session.' }
        ],
        photos: [
            { id: 'p3', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80', position: 0 }
        ],
        distance_km: 8,
        is_verified: false,
        passions: ['Music', 'Startup', 'Hiking'],
        match_score: 0.72,
        match_reasons: ['Shared Interest: Hiking']
    },
    {
        id: 'mock-3',
        display_name: 'Elena',
        age: 24,
        gender: 'female',
        bio: 'Art student. Love museums and galleries.',
        prompts: [],
        photos: [
            { id: 'p4', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80', position: 0 }
        ],
        distance_km: 1.2,
        is_verified: true,
        passions: ['Art', 'Museums', 'Wine'],
        match_score: 0.91,
        match_reasons: ['Nearby', 'Popular']
    }
];

export const useDiscovery = () => {
    const queryClient = useQueryClient();
    const supabase = createClient();
    const [isUsingMock, setIsUsingMock] = useState(false);

    // Fetch discovery profiles
    const { data: profiles, isLoading, refetch } = useQuery({
        queryKey: ['discovery_profiles'],
        queryFn: async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) throw new Error('Not authenticated');

                const response = await fetch(`${API_URL}/discovery/profiles?limit=10`, {
                    headers: {
                        Authorization: `Bearer ${session.access_token}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch profiles');
                const result = await response.json();
                setIsUsingMock(false);
                return result.data.profiles as DiscoveryProfile[];
            } catch (error) {
                console.warn('Discovery fetch failed, using mock data:', error);
                setIsUsingMock(true);
                return MOCK_DISCOVERY_PROFILES;
            }
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Swipe mutation
    const swipeMutation = useMutation({
        mutationFn: async (action: SwipeAction) => {
            if (isUsingMock) {
                // Simulate network delay for mock swipe
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            data: {
                                success: true,
                                match: null, // Mock simple swipe, no match logic for now
                                remaining_likes_today: 99
                            }
                        });
                    }, 500);
                });
            }

            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Not authenticated');

            const response = await fetch(`${API_URL}/discovery/swipe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify(action),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Swipe failed');
            }

            return response.json();
        },
        onSuccess: (data: { data: { match?: unknown } }, variables) => {
            // Optimistically remove the profile from the list
            queryClient.setQueryData(['discovery_profiles'], (old: DiscoveryProfile[] | undefined) => {
                return old?.filter(p => p.id !== variables.profile_id) || [];
            });

            // If it's a match, we might want to trigger a modal here
            if (data?.data?.match) {
                // Handle match logic (setting state for match modal to open)
                // This will be handled by the component using the mutation
                console.log("It's a Match!", data.data.match);
            }
        },
    });

    return {
        profiles: profiles || [],
        isLoading,
        refetch,
        swipe: swipeMutation.mutateAsync,
        isSwiping: swipeMutation.isPending,
        isUsingMock
    };
};
