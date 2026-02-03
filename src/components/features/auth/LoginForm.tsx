/**
 * Login Form Component with Supabase Auth Integration.
 */

'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectTo = searchParams.get('redirectTo') || '/discover'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        // Validate inputs
        if (!email.trim() || !password.trim()) {
            setError('Please enter both email and password')
            setIsLoading(false)
            return
        }

        try {
            const supabase = createClient()
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password.trim(),
            })

            if (signInError) {
                console.error('Login error:', signInError)
                
                if (signInError.message.includes('Invalid login credentials')) {
                    setError('Invalid email or password')
                } else if (signInError.message.includes('Email not confirmed')) {
                    setError('Please verify your email address. Check your inbox for the confirmation link.')
                } else {
                    setError(signInError.message)
                }
                return
            }

            // Redirect to intended destination
            router.push(redirectTo)
            router.refresh()
        } catch (err) {
            console.error('Unexpected error:', err)
            setError('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-red-600 dark:text-red-400 text-sm">
                    {error}
                </div>
            )}

            <div className="flex flex-col gap-1.5">
                <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal">
                    Email
                </label>
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftIcon={<Mail className="w-5 h-5" />}
                    required
                    autoComplete="email"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal">
                    Password
                </label>
                <div className="relative">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        leftIcon={<Lock className="w-5 h-5" />}
                        required
                        autoComplete="current-password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#60758a] dark:text-gray-500 hover:text-[#111418] dark:hover:text-white transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <div className="flex justify-end">
                <Link href="/forgot-password" className="text-primary text-sm font-semibold hover:underline">
                    Forgot Password?
                </Link>
            </div>

            <Button
                type="submit"
                className="w-full gap-2 text-base"
                size="lg"
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                    <>
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5" />
                    </>
                )}
            </Button>
        </form>
    )
}
