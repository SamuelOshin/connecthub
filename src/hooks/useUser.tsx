'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { createContext, useContext, ReactNode } from 'react';

export interface UserProfile {
    id: string;
    email: string;
    display_name: string;
    avatar_url: string | null;
    age: number | null;
    bio: string | null;
    is_verified: boolean;
    created_at: string;
}

interface UserContextType {
    user: UserProfile | null;
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const supabase = createClient();

    const { data: user, isLoading, error, refetch } = useQuery({
        queryKey: ['current_user'],
        queryFn: async () => {
            // Get auth user
            const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
            if (authError || !authUser) {
                return null;
            }

            // Get profile from profiles table
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single();

            if (profileError) {
                console.error('Error fetching profile:', profileError);
                // Return minimal user data from auth
                return {
                    id: authUser.id,
                    email: authUser.email || '',
                    display_name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
                    avatar_url: authUser.user_metadata?.avatar_url || null,
                    age: null,
                    bio: null,
                    is_verified: false,
                    created_at: authUser.created_at,
                } as UserProfile;
            }

            // Get primary photo if no avatar_url in profile
            let avatarUrl = (profile as { avatar_url?: string | null }).avatar_url;
            if (!avatarUrl) {
                // Helper to build public URL from storage_path
                const getPublicUrl = (storagePath: string) => {
                    return supabase.storage.from('photos').getPublicUrl(storagePath).data.publicUrl;
                };

                // First try to get the primary photo
                const { data: primaryPhoto } = await supabase
                    .from('photos')
                    .select('storage_path')
                    .eq('user_id', authUser.id)
                    .eq('is_primary', true)
                    .single();

                const primaryPath = (primaryPhoto as { storage_path?: string } | null)?.storage_path;
                if (primaryPath) {
                    avatarUrl = getPublicUrl(primaryPath);
                } else {
                    // Fallback to first photo by order_index (index 0)
                    const { data: firstPhoto } = await supabase
                        .from('photos')
                        .select('storage_path')
                        .eq('user_id', authUser.id)
                        .order('order_index', { ascending: true })
                        .limit(1)
                        .single();

                    const firstPath = (firstPhoto as { storage_path?: string } | null)?.storage_path;
                    avatarUrl = firstPath ? getPublicUrl(firstPath) : null;
                }
            }

            const profileData = profile as {
                id: string;
                display_name?: string;
                age?: number;
                bio?: string;
                is_verified?: boolean;
                created_at: string;
            };

            return {
                id: profileData.id,
                email: authUser.email || '',
                display_name: profileData.display_name || authUser.user_metadata?.full_name || 'User',
                avatar_url: avatarUrl,
                age: profileData.age ?? null,
                bio: profileData.bio ?? null,
                is_verified: profileData.is_verified || false,
                created_at: profileData.created_at,
            } as UserProfile;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    });

    return (
        <UserContext.Provider value={{ user: user || null, isLoading, error: error as Error | null, refetch }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

// Default avatar for users without a profile picture
export const DEFAULT_AVATAR = '/default-avatar.svg';

// Helper to get avatar URL with fallback
export function getAvatarUrl(avatarUrl: string | null | undefined): string {
    return avatarUrl || DEFAULT_AVATAR;
}
