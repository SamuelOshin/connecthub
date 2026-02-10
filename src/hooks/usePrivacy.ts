'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

interface PrivacyExportData {
    export_id: string;
    user_id: string;
    generated_at: string;
    profile: Record<string, unknown>;
    photos: Record<string, unknown>[];
    matches: Record<string, unknown>[];
    messages: Record<string, unknown>[];
    swipes: Record<string, unknown>[];
    preferences: Record<string, unknown> | null;
    feedback: Record<string, unknown>[];
}

interface DeletionStatus {
    has_pending_deletion: boolean;
    scheduled_deletion_at?: string;
    requested_at?: string;
}

interface ApiResponse<T> {
    status: string;
    status_code: number;
    message: string;
    data: T;
}

async function getAuthHeaders() {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token || ''}`,
    };
}

// Check if we're in offline mode
async function isServerReachable(): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/health`, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}

/**
 * Hook for privacy-related operations (GDPR compliance)
 * Falls back to offline mode when server is unreachable.
 */
export function usePrivacy() {
    const queryClient = useQueryClient();
    const [isOffline, setIsOffline] = useState(false);

    // Get deletion status
    const { data: deletionStatus, isLoading: isLoadingStatus } = useQuery({
        queryKey: ['privacy', 'deletion-status'],
        queryFn: async (): Promise<DeletionStatus> => {
            // Check server availability
            if (!(await isServerReachable())) {
                setIsOffline(true);
                return { has_pending_deletion: false };
            }
            setIsOffline(false);

            const headers = await getAuthHeaders();
            const response = await fetch(`${API_URL}/privacy/deletion-status`, { headers });
            if (!response.ok) throw new Error('Failed to get deletion status');
            const json: ApiResponse<DeletionStatus> = await response.json();
            return json.data;
        },
        retry: 1,
        staleTime: 30000, // Cache for 30 seconds
    });

    // Export user data
    const exportDataMutation = useMutation({
        mutationFn: async (): Promise<PrivacyExportData> => {
            const headers = await getAuthHeaders();
            const response = await fetch(`${API_URL}/privacy/export`, { headers });
            if (!response.ok) throw new Error('Failed to export data');
            const json: ApiResponse<PrivacyExportData> = await response.json();
            return json.data;
        },
        onSuccess: (data) => {
            // Trigger download as JSON file
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `connecthub_data_export_${data.export_id}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        },
    });

    // Request account deletion
    const requestDeletionMutation = useMutation({
        mutationFn: async (reason?: string) => {
            const headers = await getAuthHeaders();
            const response = await fetch(`${API_URL}/privacy/delete-request`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ reason }),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to request deletion');
            }
            const json = await response.json();
            return json.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['privacy', 'deletion-status'] });
        },
    });

    // Cancel account deletion
    const cancelDeletionMutation = useMutation({
        mutationFn: async () => {
            const headers = await getAuthHeaders();
            const response = await fetch(`${API_URL}/privacy/cancel-deletion`, {
                method: 'DELETE',
                headers,
            });
            if (!response.ok) throw new Error('Failed to cancel deletion');
            const json = await response.json();
            return json.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['privacy', 'deletion-status'] });
        },
    });

    return {
        // State
        deletionStatus,
        isLoadingStatus,
        hasPendingDeletion: deletionStatus?.has_pending_deletion || false,
        isOffline,

        // Export
        exportData: exportDataMutation.mutate,
        isExporting: exportDataMutation.isPending,
        exportError: exportDataMutation.error,

        // Deletion
        requestDeletion: requestDeletionMutation.mutate,
        isRequestingDeletion: requestDeletionMutation.isPending,
        deletionRequestError: requestDeletionMutation.error,

        cancelDeletion: cancelDeletionMutation.mutate,
        isCancellingDeletion: cancelDeletionMutation.isPending,
    };
}
