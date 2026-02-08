'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

interface BlockedUser {
    id: string;
    blocked_id: string;
    blocked_user: {
        id: string;
        display_name: string;
    } | null;
    created_at: string;
}

interface BlockedUsersResponse {
    blocked_users: BlockedUser[];
    total: number;
}

interface ApiResponse<T> {
    status: string;
    status_code: number;
    message: string;
    data: T;
}

type ReportReason = 'SPAM' | 'HARASSMENT' | 'INAPPROPRIATE_CONTENT' | 'FAKE_PROFILE' | 'UNDERAGE' | 'OTHER';

async function getAuthHeaders() {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token || ''}`,
    };
}

/**
 * Hook for safety-related operations (block/report users)
 */
export function useSafety() {
    const queryClient = useQueryClient();

    // Get blocked users list
    const { data: blockedUsersData, isLoading: isLoadingBlocked } = useQuery({
        queryKey: ['safety', 'blocked'],
        queryFn: async (): Promise<BlockedUsersResponse> => {
            const headers = await getAuthHeaders();
            const response = await fetch(`${API_URL}/safety/blocked`, { headers });
            if (!response.ok) throw new Error('Failed to get blocked users');
            const json: ApiResponse<BlockedUsersResponse> = await response.json();
            return json.data;
        },
    });

    // Block a user
    const blockUserMutation = useMutation({
        mutationFn: async (userId: string) => {
            const headers = await getAuthHeaders();
            const response = await fetch(`${API_URL}/safety/block/${userId}`, {
                method: 'POST',
                headers,
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to block user');
            }
            const json = await response.json();
            return json.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['safety', 'blocked'] });
            // Also invalidate matches and discovery to refresh UI
            queryClient.invalidateQueries({ queryKey: ['matches'] });
            queryClient.invalidateQueries({ queryKey: ['discovery'] });
        },
    });

    // Unblock a user
    const unblockUserMutation = useMutation({
        mutationFn: async (userId: string) => {
            const headers = await getAuthHeaders();
            const response = await fetch(`${API_URL}/safety/block/${userId}`, {
                method: 'DELETE',
                headers,
            });
            if (!response.ok) throw new Error('Failed to unblock user');
            const json = await response.json();
            return json.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['safety', 'blocked'] });
        },
    });

    // Report a user
    const reportUserMutation = useMutation({
        mutationFn: async ({ userId, reason, details }: { userId: string; reason: ReportReason; details?: string }) => {
            const headers = await getAuthHeaders();
            const response = await fetch(`${API_URL}/safety/report`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    reported_user_id: userId,
                    reason,
                    details,
                }),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to report user');
            }
            const json = await response.json();
            return json.data;
        },
    });

    return {
        // Blocked users list
        blockedUsers: blockedUsersData?.blocked_users || [],
        blockedCount: blockedUsersData?.total || 0,
        isLoadingBlocked,

        // Block/unblock
        blockUser: blockUserMutation.mutate,
        isBlocking: blockUserMutation.isPending,
        blockError: blockUserMutation.error,

        unblockUser: unblockUserMutation.mutate,
        isUnblocking: unblockUserMutation.isPending,

        // Report
        reportUser: reportUserMutation.mutate,
        isReporting: reportUserMutation.isPending,
        reportSuccess: reportUserMutation.isSuccess,
        reportError: reportUserMutation.error,
    };
}
