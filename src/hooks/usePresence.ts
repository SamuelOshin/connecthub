/**
 * Presence hook for typing indicators and online status.
 * Uses Supabase Realtime Presence.
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

interface PresenceState {
    isTyping: boolean;
    lastSeen: string;
    userId: string;
}

/**
 * Hook for managing presence (typing indicators, online status).
 */
export function usePresence(matchId: string) {
    const supabase = createClient();
    const [otherUserTyping, setOtherUserTyping] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const myTypingRef = useRef(false);

    // Get current user ID
    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setCurrentUserId(user.id);
            }
        };
        getUser();
    }, [supabase]);

    // Subscribe to presence channel
    useEffect(() => {
        if (!matchId || !currentUserId) return;

        const channel = supabase
            .channel(`presence:${matchId}`)
            .on('presence', { event: 'sync' }, () => {
                const state = channel.presenceState<PresenceState>();

                // Check if any other user is typing
                let someoneTyping = false;
                for (const key of Object.keys(state)) {
                    const presences = state[key];
                    for (const presence of presences) {
                        if (presence.userId !== currentUserId && presence.isTyping) {
                            someoneTyping = true;
                            break;
                        }
                    }
                    if (someoneTyping) break;
                }
                setOtherUserTyping(someoneTyping);
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    // Track our presence
                    await channel.track({
                        userId: currentUserId,
                        isTyping: false,
                        lastSeen: new Date().toISOString(),
                    });
                    setIsConnected(true);
                }
            });

        channelRef.current = channel;

        return () => {
            supabase.removeChannel(channel);
            setIsConnected(false);
        };
    }, [matchId, currentUserId, supabase]);

    // Set typing status with debounce
    const setIsTyping = useCallback(async (typing: boolean) => {
        if (!channelRef.current || !currentUserId) return;

        // Clear previous timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = null;
        }

        // Only update if changed
        if (myTypingRef.current === typing) return;
        myTypingRef.current = typing;

        // Update presence
        await channelRef.current.track({
            userId: currentUserId,
            isTyping: typing,
            lastSeen: new Date().toISOString(),
        });

        // Auto-clear typing after 3 seconds of no input
        if (typing) {
            typingTimeoutRef.current = setTimeout(async () => {
                myTypingRef.current = false;
                if (channelRef.current) {
                    await channelRef.current.track({
                        userId: currentUserId,
                        isTyping: false,
                        lastSeen: new Date().toISOString(),
                    });
                }
            }, 3000);
        }
    }, [currentUserId]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);

    return {
        isTyping: otherUserTyping,
        setIsTyping,
        isConnected,
    };
}
