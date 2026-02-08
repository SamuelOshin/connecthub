/**
 * Hook for fetching and managing chat conversations.
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface ConversationPreview {
    match_id: string;
    matched_user_id: string;
    matched_user_display_name?: string;
    matched_user_avatar_url?: string;
    matched_at: string;
    last_message?: string;
    last_message_at?: string;
    last_message_is_mine: boolean;
    unread_count: number;
    has_started_chatting: boolean;
    hours_until_expiry?: number;
    is_expiring_soon: boolean;
}

interface ConversationsResponse {
    conversations: ConversationPreview[];
    total_count: number;
}

/**
 * Hook for fetching conversations list.
 */
export function useConversations() {
    const supabase = createClient();

    return useQuery({
        queryKey: ['conversations'],
        queryFn: async (): Promise<ConversationsResponse> => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Not authenticated');

            const response = await fetch(
                `${API_URL}/chat/conversations`,
                {
                    headers: {
                        'Authorization': `Bearer ${session.access_token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch conversations');
            }

            return response.json();
        },
        staleTime: 1000 * 10, // 10 seconds
        refetchInterval: 1000 * 15, // Refetch every 15s for near-realtime sidebar
    });
}
