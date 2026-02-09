/**
 * Real-time messages hook for chat functionality.
 * Uses Supabase Realtime to subscribe to new messages.
 */

'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { parseApiError, type ParsedApiError } from '@/lib/errorUtils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface Message {
    id: string;
    match_id: string;
    sender_id: string;
    sender?: {
        id: string;
        display_name?: string;
        avatar_url?: string;
    };
    content: string;
    message_type: string;
    created_at: string;
    read_at?: string;
    is_mine: boolean;
    status?: 'sending' | 'sent' | 'error';
}

export interface ReadCursor {
    match_id: string;
    user_id: string;
    last_read_message_id?: string;
    last_read_at?: string;
    updated_at?: string;
}

export interface SendMessageData {
    content: string;
    message_type?: 'text' | 'image' | 'system';
    /** Client timestamp for offline message ordering (auto-generated if not provided) */
    client_timestamp?: string;
    /** Idempotency key to prevent duplicate sends on retry */
    idempotency_key?: string;
}

interface MessagesResponse {
    messages: Message[];
    has_more: boolean;
    next_cursor?: string;
    other_user_read_cursor?: ReadCursor;
}

interface SendMessageResponse {
    message: Message;
    first_message_sent: boolean;
}

/**
 * Hook for real-time message subscriptions and operations.
 */
export function useRealtimeMessages(matchId: string) {
    const supabase = useMemo(() => createClient(), []);
    const queryClient = useQueryClient();
    const [isConnected, setIsConnected] = useState(false);
    const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
    const currentUserIdRef = useRef<string | undefined>(undefined);

    useEffect(() => {
        let isMounted = true;

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!isMounted) return;
            currentUserIdRef.current = session?.user?.id;
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                currentUserIdRef.current = session?.user?.id;
            }
        );

        return () => {
            isMounted = false;
            subscription?.unsubscribe();
        };
    }, [supabase]);

    // Fetch messages with React Query
    const {
        data: messagesData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['messages', matchId],
        queryFn: async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Not authenticated');

            const response = await fetch(
                `${API_URL}/chat/${matchId}/messages`,
                {
                    headers: {
                        'Authorization': `Bearer ${session.access_token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }

            const result = await response.json();
            return (result.data || { messages: [], has_more: false }) as MessagesResponse;
        },
        enabled: !!matchId,
        staleTime: 1000 * 10, // 10 seconds
        refetchInterval: 1000 * 15, // Poll every 15s as fallback for Realtime
    });

    // Send message mutation
    const sendMessageMutation = useMutation({
        mutationFn: async (data: SendMessageData): Promise<SendMessageResponse> => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Not authenticated');

            // Generate client timestamp if not provided
            const payload = {
                ...data,
                client_timestamp: data.client_timestamp || new Date().toISOString(),
            };

            const response = await fetch(
                `${API_URL}/chat/${matchId}/messages`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${session.access_token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || error.detail || 'Failed to send message');
            }

            const result = await response.json();
            return result.data as SendMessageResponse;
        },
        onMutate: async (newData) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['messages', matchId] });

            // Snapshot previous value
            const previousMessages = queryClient.getQueryData<MessagesResponse>(['messages', matchId]);

            // Optimistically add new message
            const { data: { session } } = await supabase.auth.getSession();
            const tempId = `temp-${Date.now()}`;

            const optimisticMessage: Message = {
                id: tempId,
                match_id: matchId,
                sender_id: session?.user?.id || '',
                content: newData.content,
                message_type: newData.message_type || 'text',
                created_at: new Date().toISOString(),
                is_mine: true,
                status: 'sending',
            };

            queryClient.setQueryData(['messages', matchId], (old: MessagesResponse | undefined) => {
                if (!old) return { messages: [optimisticMessage], has_more: false };
                return {
                    ...old,
                    messages: [...old.messages, optimisticMessage],
                };
            });

            return { previousMessages, tempId };
        },
        onSuccess: (data, variables, context) => {
            // Replace optimistic message with real one
            queryClient.setQueryData(['messages', matchId], (old: MessagesResponse | undefined) => {
                if (!old) return { messages: [data.message], has_more: false };

                // Remove temp message and add real one (checking for duplicates)
                const filtered = old.messages.filter(m => m.id !== context?.tempId);

                // Avoid double addition if realtime already caught it
                if (filtered.some(m => m.id === data.message.id)) {
                    return { ...old, messages: filtered };
                }

                return {
                    ...old,
                    messages: [...filtered, data.message],
                };
            });

            // Invalidate matches if first message sent (extends expiration)
            if (data.first_message_sent) {
                queryClient.invalidateQueries({ queryKey: ['matches'] });
            }
        },
        onError: (err, variables, context) => {
            // Rollback on error
            if (context?.previousMessages) {
                queryClient.setQueryData(['messages', matchId], context.previousMessages);
            }
            // Show toast error to user
            toast.error('Message failed to send', {
                description: err.message || 'Please try again',
            });
        },
    });

    // Mark messages as read
    const markAsRead = useCallback(async (lastReadMessageId?: string) => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        await fetch(
            `${API_URL}/chat/${matchId}/read`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(lastReadMessageId ? { last_read_message_id: lastReadMessageId } : {}),
            }
        );

        // Invalidate conversations to update unread counts
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
        // Invalidate match stats to update sidebar badge
        queryClient.invalidateQueries({ queryKey: ['matchStats'] });
    }, [matchId, supabase, queryClient]);

    // Subscribe to real-time messages
    useEffect(() => {
        if (!matchId) return;

        const processRealtimeMessage = (payload: any) => {
            console.log(`[Realtime] ${payload.eventType} on messages:`, payload.new?.id);
            const newMessage = payload.new as Partial<Message>;

            const currentUserId = currentUserIdRef.current;

            // Only calculate is_mine if sender_id is present in the payload
            const messageUpdates: Partial<Message> = { ...newMessage };
            if (newMessage.sender_id && currentUserId) {
                messageUpdates.is_mine = newMessage.sender_id === currentUserId;
            }

            // Add to cache or Update existing
            queryClient.setQueryData(['messages', matchId], (old: MessagesResponse | undefined) => {
                // If it's an INSERT/new message, we need the full structure
                if (payload.eventType === 'INSERT') {
                    const fullMessage = {
                        ...newMessage as Message,
                        is_mine: currentUserId ? (newMessage as Message).sender_id === currentUserId : false
                    };

                    // Skip if this is our own message - optimistic update already handled it
                    // This prevents the race condition causing duplicates
                    if (fullMessage.is_mine) {
                        return old;
                    }

                    if (!old) return { messages: [fullMessage], has_more: false };

                    // Check if message already exists (by ID)
                    const exists = old.messages.some(m => m.id === fullMessage.id);
                    if (exists) return old;

                    // Also filter out any temp messages with same content (edge case cleanup)
                    const cleaned = old.messages.filter(m => !m.id.startsWith('temp-'));

                    return {
                        ...old,
                        messages: [...cleaned, fullMessage],
                    };
                }

                if (!old) return { messages: [], has_more: false };

                // Handle UPDATEs
                const existingIndex = old.messages.findIndex(m => m.id === newMessage.id);

                if (existingIndex !== -1) {
                    // Update existing message (merge partial update)
                    // We DO NOT simply spread messageWithMine because it might have incorrect 'is_mine' if sender_id was missing
                    const newMessages = [...old.messages];
                    newMessages[existingIndex] = {
                        ...newMessages[existingIndex],
                        ...messageUpdates,
                    };
                    return {
                        ...old,
                        messages: newMessages
                    };
                }

                return old;
            });

            // Invalidate conversations for unread count
            queryClient.invalidateQueries({ queryKey: ['conversations'] });

            // Invalidate matchStats to update sidebar badges (unread count)
            queryClient.invalidateQueries({ queryKey: ['matchStats'] });

            // Only refetch messages if it's from another user (incoming message)
            // Our own messages are handled by optimistic update + onSuccess
            const isOwnMessage = currentUserIdRef.current &&
                (payload.new as Message).sender_id === currentUserIdRef.current;

            if (payload.eventType === 'INSERT' && !isOwnMessage) {
                // Background refetch to get fully-formatted message from API
                queryClient.invalidateQueries({ queryKey: ['messages', matchId] });
            }
        };

        const processReadCursor = (payload: any) => {
            const cursor = payload.new as ReadCursor;
            const currentUserId = currentUserIdRef.current;

            if (!currentUserId || cursor.user_id === currentUserId) {
                return;
            }

            queryClient.setQueryData(['messages', matchId], (old: MessagesResponse | undefined) => {
                if (!old) return old;
                return {
                    ...old,
                    other_user_read_cursor: cursor,
                };
            });
        };

        const channel = supabase
            .channel(`messages:${matchId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `match_id=eq.${matchId}`,
                },
                (payload) => processRealtimeMessage(payload)
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'messages',
                    filter: `match_id=eq.${matchId}`,
                },
                (payload) => processRealtimeMessage(payload)
            )
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'message_read_cursors',
                    filter: `match_id=eq.${matchId}`,
                },
                (payload) => processReadCursor(payload)
            )
            .subscribe((status, err) => {
                console.log(`[Realtime] Channel messages:${matchId} status: ${status}`, err || '');
                setIsConnected(status === 'SUBSCRIBED');
            });

        channelRef.current = channel;

        return () => {
            supabase.removeChannel(channel);
            setIsConnected(false);
        };
    }, [matchId, supabase, queryClient]);

    // Deduplicate messages - filter out temp messages if real message exists
    // This handles race conditions between optimistic updates, realtime, and refetch
    const deduplicatedMessages = useMemo(() => {
        const rawMessages = messagesData?.messages || [];
        if (rawMessages.length === 0) return rawMessages;

        // Get all non-temp message IDs and their content fingerprints
        const realMessages = new Map<string, Message>();
        const contentFingerprints = new Set<string>();

        // First pass: collect real messages and their fingerprints
        for (const msg of rawMessages) {
            if (!msg.id.startsWith('temp-')) {
                realMessages.set(msg.id, msg);
                // Fingerprint: sender + content + time (rounded to minute for fuzzy match)
                const timeKey = new Date(msg.created_at).toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
                contentFingerprints.add(`${msg.sender_id}:${msg.content}:${timeKey}`);
            }
        }

        // Second pass: filter out temp messages that have matching real messages
        const result: Message[] = [];
        const seenIds = new Set<string>();

        for (const msg of rawMessages) {
            // Skip duplicates by ID
            if (seenIds.has(msg.id)) continue;
            seenIds.add(msg.id);

            // For temp messages, check if a real message with same content exists
            if (msg.id.startsWith('temp-')) {
                const timeKey = new Date(msg.created_at).toISOString().slice(0, 16);
                const fingerprint = `${msg.sender_id}:${msg.content}:${timeKey}`;
                if (contentFingerprints.has(fingerprint)) {
                    // Skip this temp message - real version exists
                    continue;
                }
            }

            result.push(msg);
        }

        return result;
    }, [messagesData?.messages]);

    return {
        messages: deduplicatedMessages,
        isLoading,
        error,
        isConnected,
        sendMessage: sendMessageMutation.mutate,
        isSending: sendMessageMutation.isPending,
        sendError: sendMessageMutation.error,
        markAsRead,
        hasNextPage: messagesData?.has_more || false,
        otherUserReadCursor: messagesData?.other_user_read_cursor,
    };
}
