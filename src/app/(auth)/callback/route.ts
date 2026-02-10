/**
 * OAuth callback route handler.
 * Exchanges auth code for session after OAuth redirect.
 * Redirects new users to onboarding, returning users to discover.
 */

import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const redirectTo = requestUrl.searchParams.get('redirectTo')

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
            console.error('Auth callback error:', error)
            return NextResponse.redirect(
                new URL(`/login?error=${encodeURIComponent(error.message)}`, requestUrl.origin)
            )
        }

        // Check if user has completed onboarding
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
            // Check profile completion
            interface ProfileFields {
                display_name: string | null
                birthdate: string | null
                gender: string | null
            }
            const { data: profile } = await supabase
                .from('profiles')
                .select('display_name, birthdate, gender')
                .eq('id', user.id)
                .maybeSingle() as { data: ProfileFields | null }

            // If no profile or missing critical fields, redirect to onboarding
            const needsOnboarding = !profile || !profile.display_name || !profile.birthdate || !profile.gender

            if (needsOnboarding) {
                return NextResponse.redirect(new URL('/onboarding/basics', requestUrl.origin))
            }
        }
    }

    // Redirect to the intended destination or discover page
    return NextResponse.redirect(new URL(redirectTo || '/discover', requestUrl.origin))
}
