/**
 * Email Verification Page.
 * Shows confirmation message after signup (magic link sent).
 */

'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/button'
import { Activity, Mail, ArrowLeft, RefreshCw } from 'lucide-react'

function VerifyEmailContent() {
  return (
    <AuthLayout>
      {/* Brand Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
          <Activity className="w-5 h-5" />
        </div>
        <h3 className="text-[#111418] dark:text-white tracking-tight text-xl font-bold">
          ConnectHub
        </h3>
      </div>

      {/* Success Icon */}
      <div className="flex justify-center my-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Mail className="w-10 h-10 text-primary" />
        </div>
      </div>

      {/* Page Title */}
      <div className="flex flex-col gap-3 mb-8 text-center">
        <h1 className="text-[#111418] dark:text-white text-3xl font-extrabold leading-tight tracking-[-0.02em]">
          Check your email
        </h1>
        <p className="text-[#60758a] dark:text-gray-400 text-base font-normal">
          We've sent a confirmation link to your email address. Click the link in the email to verify your account and get started.
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          What to do next:
        </h3>
        <ol className="text-sm text-blue-800 dark:text-blue-400 space-y-1.5 list-decimal list-inside">
          <li>Open your email inbox</li>
          <li>Find the email from ConnectHub</li>
          <li>Click the "Confirm your email" link</li>
          <li>You'll be automatically signed in</li>
        </ol>
      </div>

      {/* Resend Option */}
      <div className="flex flex-col items-center gap-3 py-4 border-t border-[#dbe0e6] dark:border-gray-700">
        <p className="text-sm text-[#60758a] dark:text-gray-500">
          Didn't receive the email?
        </p>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="w-4 h-4" />
          Request New Link
        </Button>
        <p className="text-xs text-[#60758a] dark:text-gray-500 text-center max-w-sm">
          Check your spam folder or try resending the confirmation email
        </p>
      </div>

      {/* Back Link */}
      <div className="mt-4 pt-6 text-center border-t border-[#dbe0e6] dark:border-gray-700">
        <Link 
          href="/login" 
          className="inline-flex items-center justify-center gap-2 text-sm font-medium text-[#60758a] dark:text-gray-400 hover:text-[#111418] dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Login
        </Link>
      </div>
    </AuthLayout>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}
