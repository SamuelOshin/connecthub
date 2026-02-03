/**
 * TypeScript types for Supabase Database.
 * Generated from Supabase schema - update after schema changes.
 */

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    display_name: string | null
                    birthdate: string
                    gender: string | null
                    looking_for: string[] | null
                    bio: string | null
                    location: unknown | null  // PostGIS geometry
                    preferences: Json
                    prompts: Json
                    is_verified: boolean
                    subscription_status: string
                    last_active: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    display_name?: string | null
                    birthdate: string
                    gender?: string | null
                    looking_for?: string[] | null
                    bio?: string | null
                    location?: unknown | null
                    preferences?: Json
                    prompts?: Json
                    is_verified?: boolean
                    subscription_status?: string
                    last_active?: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    display_name?: string | null
                    birthdate?: string
                    gender?: string | null
                    looking_for?: string[] | null
                    bio?: string | null
                    location?: unknown | null
                    preferences?: Json
                    prompts?: Json
                    is_verified?: boolean
                    subscription_status?: string
                    last_active?: string
                    created_at?: string
                    updated_at?: string
                }
            }
            photos: {
                Row: {
                    id: string
                    user_id: string
                    storage_path: string
                    order_index: number
                    is_primary: boolean
                    moderation_status: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    storage_path: string
                    order_index?: number
                    is_primary?: boolean
                    moderation_status?: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    storage_path?: string
                    order_index?: number
                    is_primary?: boolean
                    moderation_status?: string
                    created_at?: string
                }
            }
            swipes: {
                Row: {
                    id: string
                    liker_id: string
                    liked_id: string
                    direction: 'LEFT' | 'RIGHT' | 'SUPER_LIKE'
                    created_at: string
                }
                Insert: {
                    id?: string
                    liker_id: string
                    liked_id: string
                    direction: 'LEFT' | 'RIGHT' | 'SUPER_LIKE'
                    created_at?: string
                }
                Update: {
                    id?: string
                    liker_id?: string
                    liked_id?: string
                    direction?: 'LEFT' | 'RIGHT' | 'SUPER_LIKE'
                    created_at?: string
                }
            }
            matches: {
                Row: {
                    id: string
                    user1_id: string
                    user2_id: string
                    status: string
                    matched_at: string
                    expires_at: string | null
                }
                Insert: {
                    id?: string
                    user1_id: string
                    user2_id: string
                    status?: string
                    matched_at?: string
                    expires_at?: string | null
                }
                Update: {
                    id?: string
                    user1_id?: string
                    user2_id?: string
                    status?: string
                    matched_at?: string
                    expires_at?: string | null
                }
            }
            messages: {
                Row: {
                    id: string
                    match_id: string
                    sender_id: string
                    content: string
                    message_type: string
                    created_at: string
                    read_at: string | null
                }
                Insert: {
                    id?: string
                    match_id: string
                    sender_id: string
                    content: string
                    message_type?: string
                    created_at?: string
                    read_at?: string | null
                }
                Update: {
                    id?: string
                    match_id?: string
                    sender_id?: string
                    content?: string
                    message_type?: string
                    created_at?: string
                    read_at?: string | null
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Photo = Database['public']['Tables']['photos']['Row']
export type Swipe = Database['public']['Tables']['swipes']['Row']
export type Match = Database['public']['Tables']['matches']['Row']
export type Message = Database['public']['Tables']['messages']['Row']
