/**
 * Next.js Middleware for Supabase Auth.
 * Refreshes session and protects routes.
 */

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => request.cookies.getAll(),
                setAll: (cookiesToSet) => {
                    cookiesToSet.forEach(({ name, value }) => {
                        request.cookies.set(name, value)
                    })
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) => {
                        response.cookies.set(name, value, options)
                    })
                },
            },
        }
    )

    // Refresh session if expired
    const { data: { user } } = await supabase.auth.getUser()

    // Protected routes - redirect to login if not authenticated
    const protectedPaths = ['/discover', '/matches', '/chat', '/profile', '/settings', '/onboarding']
    const isProtectedPath = protectedPaths.some(path =>
        request.nextUrl.pathname.startsWith(path)
    )

    if (isProtectedPath && !user) {
        const redirectUrl = new URL('/login', request.url)
        redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
    }

    if (isProtectedPath && user) {
        // Enforce onboarding for protected routes (except onboarding itself)
        // We only check if NOT already on an onboarding page to avoid loops
        if (!request.nextUrl.pathname.startsWith('/onboarding') && request.nextUrl.pathname !== '/onboarding') {
            // Check profile completion
            // Note: middleware DB calls add latency. optimization: store status in metadata
            const { data: profile } = await supabase
                .from('profiles')
                .select('display_name, birthdate, gender')
                .eq('id', user.id)
                .maybeSingle()

            // Cast profile to expected type to avoid TS errors
            const profileData = profile as { display_name: string | null; birthdate: string | null; gender: string | null } | null

            const isProfileIncomplete = !profileData || !profileData.display_name || !profileData.birthdate || !profileData.gender

            if (isProfileIncomplete) {
                return NextResponse.redirect(new URL('/onboarding/basics', request.url))
            }
        }
    }

    // Auth routes - redirect to discover if already authenticated
    const authPaths = ['/login', '/register']
    const isAuthPath = authPaths.some(path =>
        request.nextUrl.pathname.startsWith(path)
    )

    if (isAuthPath && user) {
        return NextResponse.redirect(new URL('/discover', request.url))
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
