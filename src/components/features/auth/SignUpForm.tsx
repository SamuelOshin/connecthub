"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import Link from "next/link";
import {
  Network,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight
} from "lucide-react";

const MOCK_DATA = {
  branding: {
    name: "ConnectHub",
  },
  header: {
    title: "Create Account",
    subtitle: "Start your journey to finding love today.",
  },
  form: {
    labels: {
      fullName: "Full Name",
      email: "Email or Phone",
      password: "Create Password",
      strength: "Strength:",
      strengthValue: "Medium",
    },
    placeholders: {
      fullName: "Enter your full name",
      email: "Enter your email",
      password: "Create a strong password",
    },
    terms: {
      text: "I agree to the",
      tos: "Terms of Service",
      privacy: "Privacy Policy",
    },
    buttons: {
      submit: "Sign Up",
      google: "Google",
      apple: "Apple",
    },
  },
  divider: "Or sign up with",
  footer: {
    text: "Already have an account?",
    link: "Log in",
  },
};

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* Branding */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
          <Network className="w-5 h-5" />
        </div>
        <h3 className="text-[#111418] dark:text-white tracking-tight text-xl font-bold">{MOCK_DATA.branding.name}</h3>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[#111418] dark:text-white text-3xl font-extrabold leading-tight tracking-[-0.02em]">{MOCK_DATA.header.title}</h1>
        <p className="text-[#60758a] dark:text-gray-400 text-base font-normal">{MOCK_DATA.header.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#dbe0e6] dark:border-gray-700 w-full mb-2">
        <div className="flex gap-8">
          <Link href="/login" className="flex items-center justify-center border-b-[3px] border-transparent text-[#60758a] dark:text-gray-500 hover:text-[#111418] dark:hover:text-gray-300 pb-3 pt-2 cursor-pointer transition-colors">
            <span className="text-sm font-bold leading-normal tracking-[0.015em]">Log In</span>
          </Link>
          <div className="flex items-center justify-center border-b-[3px] border-primary text-[#111418] dark:text-white pb-3 pt-2 cursor-pointer transition-colors">
            <span className="text-sm font-bold leading-normal tracking-[0.015em]">Sign Up</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>

        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal">{MOCK_DATA.form.labels.fullName}</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#60758a] dark:text-gray-500 w-5 h-5" />
            <input
              className="flex w-full rounded-lg text-[#111418] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 h-12 pl-11 pr-4 placeholder:text-[#60758a] dark:placeholder:text-gray-500 text-base font-normal transition-shadow"
              placeholder={MOCK_DATA.form.placeholders.fullName}
              type="text"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal">{MOCK_DATA.form.labels.email}</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#60758a] dark:text-gray-500 w-5 h-5" />
            <input
              className="flex w-full rounded-lg text-[#111418] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 h-12 pl-11 pr-4 placeholder:text-[#60758a] dark:placeholder:text-gray-500 text-base font-normal transition-shadow"
              placeholder={MOCK_DATA.form.placeholders.email}
              type="email"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal">{MOCK_DATA.form.labels.password}</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#60758a] dark:text-gray-500 w-5 h-5" />
            <input
              className="flex w-full rounded-lg text-[#111418] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 h-12 pl-11 pr-11 placeholder:text-[#60758a] dark:placeholder:text-gray-500 text-base font-normal transition-shadow"
              placeholder={MOCK_DATA.form.placeholders.password}
              type={showPassword ? "text" : "password"}
            />
            <button
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#60758a] dark:text-gray-500 hover:text-[#111418] dark:hover:text-white transition-colors cursor-pointer"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Password Strength */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex gap-2 h-1.5 w-full">
              <div className="flex-1 rounded-full bg-yellow-500"></div>
              <div className="flex-1 rounded-full bg-yellow-500"></div>
              <div className="flex-1 rounded-full bg-[#e5e7eb] dark:bg-gray-700"></div>
              <div className="flex-1 rounded-full bg-[#e5e7eb] dark:bg-gray-700"></div>
            </div>
            <p className="text-xs text-[#60758a] dark:text-gray-500">{MOCK_DATA.form.labels.strength} <span className="text-yellow-600 dark:text-yellow-500 font-medium">{MOCK_DATA.form.labels.strengthValue}</span></p>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 py-1">
          <div className="flex items-center h-5">
            <input
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary bg-white dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
              id="terms"
              type="checkbox"
            />
          </div>
          <label className="text-sm text-[#60758a] dark:text-gray-400 leading-tight select-none" htmlFor="terms">
            {MOCK_DATA.form.terms.text} <Link className="text-[#111418] dark:text-white font-medium hover:underline" href="#">{MOCK_DATA.form.terms.tos}</Link> and <Link className="text-[#111418] dark:text-white font-medium hover:underline" href="#">{MOCK_DATA.form.terms.privacy}</Link>.
          </label>
        </div>

        {/* Submit Button */}
        <Button className="w-full gap-2" size="md">
          <span>{MOCK_DATA.form.buttons.submit}</span>
          <ArrowRight className="w-5 h-5" />
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-[#dbe0e6] dark:border-gray-700"></div>
        <span className="flex-shrink-0 mx-4 text-[#60758a] dark:text-gray-500 text-sm font-medium">{MOCK_DATA.divider}</span>
        <div className="flex-grow border-t border-[#dbe0e6] dark:border-gray-700"></div>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 h-12 rounded-lg border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
          <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
          </svg>
          <span className="text-[#111418] dark:text-white font-bold text-sm">{MOCK_DATA.form.buttons.google}</span>
        </button>
        <button className="flex items-center justify-center gap-2 h-12 rounded-lg border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
          <svg className="h-5 w-5 fill-black dark:fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.684.816-1.813 1.58-2.997 1.43-.16-.94.417-1.99 1.132-2.718.784-.81 2.016-1.55 3.042-1.792zm-5.74 5.92c-1.63 0-2.855.918-3.666.918-.767 0-1.94-.87-3.085-.87-3.15 0-6.07 2.45-6.07 7.09 0 4.19 3.078 9.54 5.253 9.54 1.18 0 1.638-.79 3.064-.79 1.425 0 1.83.79 3.065.79 2.05 0 5.418-5.59 5.418-5.59s-2.69-1.57-2.69-5.9c0-3.3 2.768-4.94 2.895-5.01-1.614-2.31-4.04-2.55-4.885-2.6-1.077-.12-2.148.43-2.69.43z"></path>
          </svg>
          <span className="text-[#111418] dark:text-white font-bold text-sm">{MOCK_DATA.form.buttons.apple}</span>
        </button>
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-xs text-[#60758a] dark:text-gray-500">
          {MOCK_DATA.footer.text} <Link className="text-primary font-bold hover:underline" href="/login">{MOCK_DATA.footer.link}</Link>
        </p>
      </div>
    </>
  );
}
