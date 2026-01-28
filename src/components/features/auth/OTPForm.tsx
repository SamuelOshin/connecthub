"use client";

import { Button } from "@/components/Button";
import Link from "next/link";
import {
  Network,
  CheckCircle,
  ArrowLeft
} from "lucide-react";

const MOCK_DATA = {
  branding: "ConnectHub",
  header: {
    title: "Check your inbox",
    subtitle: {
      prefix: "We've sent a 6-digit verification code to ",
      email: "jo***@example.com",
      suffix: ". Please enter the code below."
    }
  },
  button: "Verify Account",
  resend: {
    text: "Didn't receive the code?",
    action: "Resend Code",
    timer: "00:45"
  },
  backToLogin: "Back to Login"
};

export function OTPForm() {
  return (
    <>
      {/* Branding */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
          <Network className="w-5 h-5" />
        </div>
        <h3 className="text-[#111418] dark:text-white tracking-tight text-xl font-bold">{MOCK_DATA.branding}</h3>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[#111418] dark:text-white text-3xl font-extrabold leading-tight tracking-[-0.02em]">{MOCK_DATA.header.title}</h1>
        <p className="text-[#60758a] dark:text-gray-400 text-base font-normal">
            {MOCK_DATA.header.subtitle.prefix}<span className="text-[#111418] dark:text-white font-medium">{MOCK_DATA.header.subtitle.email}</span>{MOCK_DATA.header.subtitle.suffix}
        </p>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        <div className="flex gap-2 sm:gap-4 justify-between">
          {[1, 2, 3, 4, 5, 6].map((i) => (
             <input
                key={i}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-lg border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111418] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
                maxLength={1}
                type="text"
                autoFocus={i === 1}
             />
          ))}
        </div>

        {/* Verify Button */}
        <Button className="w-full gap-2" size="md">
          <span>{MOCK_DATA.button}</span>
          <CheckCircle className="w-5 h-5" />
        </Button>
      </form>

      {/* Resend */}
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <p className="text-sm text-[#60758a] dark:text-gray-500">
            {MOCK_DATA.resend.text}
        </p>
        <div className="flex items-center gap-2">
            <button className="text-primary text-sm font-semibold hover:underline cursor-pointer flex items-center gap-1">
                {MOCK_DATA.resend.action}
            </button>
            <span className="text-xs text-[#60758a] dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full font-medium">{MOCK_DATA.resend.timer}</span>
        </div>
      </div>

      {/* Back to Login */}
      <div className="mt-4 border-t border-[#dbe0e6] dark:border-gray-700 pt-6 text-center">
        <Link className="inline-flex items-center justify-center gap-2 text-sm font-medium text-[#60758a] dark:text-gray-400 hover:text-[#111418] dark:hover:text-white transition-colors" href="/login">
            <ArrowLeft className="w-5 h-5" />
            {MOCK_DATA.backToLogin}
        </Link>
      </div>
    </>
  );
}
