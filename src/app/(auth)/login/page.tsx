/**
 * Login Page with Supabase Auth Integration.
 */

import { Suspense } from 'react'
import Link from 'next/link'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { LoginForm } from '@/components/features/auth/LoginForm'
import { SocialButton } from '@/components/ui/social-button'
import { Activity } from 'lucide-react'

export default function LoginPage() {
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

      {/* Page Title */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[#111418] dark:text-white text-3xl font-extrabold leading-tight tracking-[-0.02em]">
          Welcome Back
        </h1>
        <p className="text-[#60758a] dark:text-gray-400 text-base font-normal">
          Please enter your details to sign in.
        </p>
      </div>

      {/* Login Form with Suspense for useSearchParams */}
      <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl" />}>
        <LoginForm />
      </Suspense>

      {/* Divider */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-[#dbe0e6] dark:border-gray-700"></div>
        <span className="flex-shrink-0 mx-4 text-[#60758a] dark:text-gray-500 text-sm font-medium">
          Or continue with
        </span>
        <div className="flex-grow border-t border-[#dbe0e6] dark:border-gray-700"></div>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <SocialButton provider="google" />
        <SocialButton provider="apple" />
      </div>

      {/* Footer */}
      <div className="mt-4 text-center">
        <p className="text-xs text-[#60758a] dark:text-gray-500">
          {"Don't have an account yet? "}
          <Link href="/sign-up" className="text-primary font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
