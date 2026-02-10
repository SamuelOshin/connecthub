/**
 * Auth hook for client-side authentication state.
 * Provides user state and auth methods.
 */

'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'

interface AuthState {
    user: User | null
    session: Session | null
    loading: boolean
}

export function useAuth() {
    const [state, setState] = useState<AuthState>({
        user: null,
        session: null,
        loading: true,
    })

    const supabase = createClient()

    useEffect(() => {
        // Get initial session
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setState({
                user: session?.user ?? null,
                session,
                loading: false,
            })
        }

        getInitialSession()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setState({
                    user: session?.user ?? null,
                    session,
                    loading: false,
                })
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    // Sign in with OAuth
    const signInWithOAuth = useCallback(async (provider: 'google' | 'apple') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
        return { error }
    }, [])

    // Sign in with email/password
    const signInWithEmail = useCallback(async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        return { data, error }
    }, [])

    // Sign up with email/password
    const signUp = useCallback(async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        })
        return { data, error }
    }, [])

    // Sign out
    const signOut = useCallback(async () => {
        const { error } = await supabase.auth.signOut()
        return { error }
    }, [])

    return {
        user: state.user,
        session: state.session,
        loading: state.loading,
        isAuthenticated: !!state.user,
        signInWithOAuth,
        signInWithEmail,
        signUp,
        signOut,
    }
}
