/**
 * Email Verification Form Component with OTP Input.
 * Handles email verification using 6-digit code from Supabase Auth.
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowLeft, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function VerifyEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || 'your email'

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Resend countdown timer
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer(prev => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [resendTimer])

  // Format timer display
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Handle OTP input change
  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError(null)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)

    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  // Submit verification
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const otpCode = otp.join('')
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits')
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()
      
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: searchParams.get('email') || '',
        token: otpCode,
        type: 'email',
      })

      if (verifyError) {
        console.error('Verification error:', verifyError)
        
        if (verifyError.message.includes('expired')) {
          setError('Verification code has expired. Please request a new one.')
        } else if (verifyError.message.includes('invalid')) {
          setError('Invalid verification code. Please check and try again.')
        } else {
          setError(verifyError.message)
        }
        
        // Clear OTP on error
        setOtp(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
        return
      }

      // Success - show success message briefly
      setSuccess(true)
      
      // Wait a moment then redirect
      setTimeout(() => {
        router.push('/discover')
        router.refresh()
      }, 1500)

    } catch (err) {
      console.error('Unexpected error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Resend verification code
  const handleResend = async () => {
    if (resendTimer > 0) return

    setIsResending(true)
    setError(null)

    try {
      const supabase = createClient()
      const emailAddress = searchParams.get('email')

      if (!emailAddress) {
        setError('Email not found. Please sign up again.')
        return
      }

      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: emailAddress,
      })

      if (resendError) {
        console.error('Resend error:', resendError)
        setError(resendError.message)
        return
      }

      // Start countdown timer (60 seconds)
      setResendTimer(60)
      setOtp(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
      
    } catch (err) {
      console.error('Unexpected error:', err)
      setError('Failed to resend code. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-500" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#111418] dark:text-white mb-2">
            Email Verified!
          </h2>
          <p className="text-[#60758a] dark:text-gray-400">
            Redirecting you to ConnectHub...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* OTP Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-2 sm:gap-4 justify-between">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              autoFocus={index === 0}
              disabled={isLoading}
              className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-lg border-2 border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>

        <Button 
          type="submit" 
          className="w-full gap-2 text-base" 
          size="lg"
          disabled={isLoading || otp.join('').length !== 6}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <span>Verify Account</span>
              <CheckCircle className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>

      {/* Resend Code */}
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <p className="text-sm text-[#60758a] dark:text-gray-500">
          Didn't receive the code?
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResend}
            disabled={resendTimer > 0 || isResending}
            className="text-primary text-sm font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline flex items-center gap-1"
          >
            {isResending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Resend Code'
            )}
          </button>
          {resendTimer > 0 && (
            <span className="text-xs text-[#60758a] dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full font-medium">
              {formatTimer(resendTimer)}
            </span>
          )}
        </div>
      </div>

      {/* Back Link */}
      <div className="mt-4 border-t border-[#dbe0e6] dark:border-gray-700 pt-6 text-center">
        <Link 
          href="/login" 
          className="inline-flex items-center justify-center gap-2 text-sm font-medium text-[#60758a] dark:text-gray-400 hover:text-[#111418] dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Login
        </Link>
      </div>
    </div>
  )
}
