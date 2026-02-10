import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { parseApiError, type ParsedApiError } from '@/lib/errorUtils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface MatchedUser {
    id: string;
    display_name: string | null;
    age: number | null;
    primary_photo_url: string | null;
    response_badge: string | null;
}

export interface Match {
    id: string;
    matched_user: MatchedUser;
    matched_at: string;
    status: string; // ACTIVE, EXPIRED, UNMATCHED, REPORTED
    last_message_preview: string | null;
    last_message_at: string | null;
    unread_count: number;
    has_started_chatting: boolean;
    hours_until_expiry: number | null;
    is_expiring_soon: boolean;
}

export const useMatches = () => {
    const queryClient = useQueryClient();
    const supabase = createClient();

    // Fetch all matches
    const query = useQuery({
        queryKey: ['matches'],
        queryFn: async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Not authenticated');

            const response = await fetch(`${API_URL}/matches`, {
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                },
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.message || error.detail || 'Failed to fetch matches');
            }
            const result = await response.json();
            return (result.data?.matches || []) as Match[];
        },
    });

    // Unmatch mutation
    const unmatchMutation = useMutation({
        mutationFn: async ({ matchId, reason }: { matchId: string; reason?: string }) => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Not authenticated');

            const response = await fetch(`${API_URL}/matches/${matchId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({ reason }),
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.message || error.detail || 'Failed to unmatch');
            }
            return response.json();
        },
        onSuccess: (data, variables) => {
            queryClient.setQueryData(['matches'], (old: Match[] | undefined) => {
                return old?.filter(m => m.id !== variables.matchId) || [];
            });
            toast.success('Unmatched successfully');
        },
        onError: (err: Error) => {
            toast.error('Failed to unmatch', {
                description: err.message || 'Please try again',
            });
        },
    });

    // Parse error for ErrorState component
    const parsedError: ParsedApiError | null = query.error ? parseApiError(query.error) : null;

    return {
        matches: query.data || [],
        isLoading: query.isLoading,
        error: query.error,
        parsedError,
        refetch: query.refetch,
        unmatch: unmatchMutation.mutateAsync,
    };
};

// Hook for match statistics (sidebar badges)
export const useMatchStats = () => {
    const supabase = createClient();

    const { data, isLoading } = useQuery({
        queryKey: ['matchStats'],
        queryFn: async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return { active_count: 0, likes_you_count: 0 };

            const response = await fetch(`${API_URL}/matches/stats`, {
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                },
            });

            if (!response.ok) return { active_count: 0, likes_you_count: 0 };
            const result = await response.json();
            return result.data || { active_count: 0, likes_you_count: 0 };
        },
        refetchInterval: 60000, // Refresh every minute
    });

    return {
        activeCount: data?.active_count || 0,
        likesYouCount: data?.likes_you_count || 0,
        unreadMessagesCount: data?.unread_messages_count || 0,
        isLoading,
    };
};

// Interface for liker profile
export interface LikerProfile {
    id: string;
    display_name?: string;
    age: number;
    gender?: string;
    bio?: string;
    prompts: { prompt: string; answer: string }[];
    photos: { id: string; url: string; position: number }[];
    passions: string[];
    is_verified: boolean;
    is_super_like: boolean;
    their_comment?: string;
    liked_at: string;
}

// Hook for fetching profiles of users who liked you
export const useLikesYou = () => {
    const supabase = createClient();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['likesYou'],
        queryFn: async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return [];

            const response = await fetch(`${API_URL}/matches/likes-you`, {
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                },
            });

            if (!response.ok) return [];
            const result = await response.json();
            return (result.data?.profiles || []) as LikerProfile[];
        },
        staleTime: 30000, // Consider data stale after 30 seconds
    });

    return {
        likers: data || [],
        isLoading,
        refetch,
    };
};
