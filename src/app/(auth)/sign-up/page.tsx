/**
 * Sign Up Page with Supabase Auth Integration.
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SocialButton } from '@/components/ui/social-button'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function SignUpPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    let strength = 0
    if (pwd.length >= 8) strength++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
    if (/\d/.test(pwd)) strength++
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(password)
  const strengthLabels = ['Weak', 'Fair', 'Medium', 'Strong']
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!agreeTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy')
      return
    }

    if (passwordStrength < 2) {
      setError('Please choose a stronger password')
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/callback`,
          data: {
            full_name: fullName,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      if (data.user?.identities?.length === 0) {
        setError('An account with this email already exists')
        return
      }

      // Redirect to verify email page
      router.push('/verify-email')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      {/* Page Title */}
      <div className="flex flex-col gap-2 mb-2">
        <h1 className="text-[#111418] dark:text-white text-3xl font-extrabold leading-tight tracking-[-0.02em]">
          Join ConnectHub
        </h1>
        <p className="text-[#60758a] dark:text-gray-400 text-base font-normal">
          Start your journey to finding love today.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal">
            Full Name
          </label>
          <Input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            leftIcon={<User className="w-5 h-5" />}
            required
          />
        </div>

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
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal">
            Create Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-5 h-5" />}
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#60758a] dark:text-gray-500 hover:text-[#111418] dark:hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Strength Meter */}
          {password && (
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex gap-2 h-1.5 w-full">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-full ${i < passwordStrength
                        ? strengthColors[passwordStrength - 1]
                        : 'bg-[#e5e7eb] dark:bg-gray-700'
                      }`}
                  />
                ))}
              </div>
              <p className="text-xs text-[#60758a] dark:text-gray-500">
                Strength:{' '}
                <span
                  className={`font-medium ${passwordStrength <= 1
                      ? 'text-red-500'
                      : passwordStrength === 2
                        ? 'text-yellow-600 dark:text-yellow-500'
                        : 'text-green-600 dark:text-green-500'
                    }`}
                >
                  {password ? strengthLabels[passwordStrength - 1] || 'Weak' : ''}
                </span>
              </p>
            </div>
          )}
        </div>

        <div className="flex items-start gap-3 py-1">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary bg-white dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
            />
          </div>
          <label
            htmlFor="terms"
            className="text-sm text-[#60758a] dark:text-gray-400 leading-tight select-none"
          >
            I agree to the{' '}
            <Link href="/terms" className="text-[#111418] dark:text-white font-medium hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#111418] dark:text-white font-medium hover:underline">
              Privacy Policy
            </Link>
            .
          </label>
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
              <span>Sign Up</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-[#dbe0e6] dark:border-gray-700"></div>
        <span className="flex-shrink-0 mx-4 text-[#60758a] dark:text-gray-500 text-sm font-medium">
          Or sign up with
        </span>
        <div className="flex-grow border-t border-[#dbe0e6] dark:border-gray-700"></div>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <SocialButton provider="google" />
        <SocialButton provider="apple" />
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-xs text-[#60758a] dark:text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
