import Link from "next/link";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle, Activity, ArrowLeft } from "lucide-react";

const MOCK_DATA = {
  header: {
    title: "ConnectHub",
  },
  pageTitle: "Check your inbox",
  pageSubtitle: "We've sent a 6-digit verification code to ",
  email: "jo***@example.com",
  subtitleSuffix: ". Please enter the code below.",
  form: {
    submitButton: "Verify Account"
  },
  resend: {
    text: "Didn't receive the code?",
    linkText: "Resend Code",
    timer: "00:45"
  },
  backLink: "Back to Login",
  testimonial: {
    quote: "Verification is the first step to finding real connections. Your safety is our priority.",
    author: "ConnectHub Security",
    role: "Trusted by millions"
  },
  imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCrqFVg6RL9bgIZ_V5vPbC3r-RPrFCPEaW7sTWvhlCKJ79YkSQC1wRjlISjixRL-kvxnkSt8WRHK3j74BThBd43yMroFGh9TqU-8Gd1xGcbAFMfhvgqp31kOdlbCEEzqi6SyMBu2ThzCe_Bi_JpB7D8pSxdaE7dEkguYGMMsZteEI-WO9aSaeCCp5PNsszDnr8DTc4IbnoTkQDa0I6hZFtwT6bp_mLfFqQ_hC7kKZHfpA-VfeATZ-kprnk_ye96nhBCaQ5LHMSySP5",
  imageAlt: "Calm nature lifestyle scene"
};

export default function VerifyEmailPage() {
  return (
    <AuthLayout
        testimonial={MOCK_DATA.testimonial}
        imageSrc={MOCK_DATA.imageSrc}
        imageAlt={MOCK_DATA.imageAlt}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
          <Activity className="w-5 h-5" />
        </div>
        <h3 className="text-[#111418] dark:text-white tracking-tight text-xl font-bold">
          {MOCK_DATA.header.title}
        </h3>
      </div>

      {/* Page Title */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[#111418] dark:text-white text-3xl font-extrabold leading-tight tracking-[-0.02em]">
          {MOCK_DATA.pageTitle}
        </h1>
        <p className="text-[#60758a] dark:text-gray-400 text-base font-normal">
          {MOCK_DATA.pageSubtitle}
          <span className="text-[#111418] dark:text-white font-medium">{MOCK_DATA.email}</span>
          {MOCK_DATA.subtitleSuffix}
        </p>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-6">
        <div className="flex gap-2 sm:gap-4 justify-between">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              autoFocus={i === 0}
              className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-lg border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
            />
          ))}
        </div>

        <Button className="w-full gap-2 text-base" size="lg">
            <span>{MOCK_DATA.form.submitButton}</span>
            <CheckCircle className="w-5 h-5" />
        </Button>
      </form>

      {/* Resend */}
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <p className="text-sm text-[#60758a] dark:text-gray-500">
            {MOCK_DATA.resend.text}
        </p>
        <div className="flex items-center gap-2">
            <Link href="#" className="text-primary text-sm font-semibold hover:underline cursor-pointer flex items-center gap-1">
                {MOCK_DATA.resend.linkText}
            </Link>
            <span className="text-xs text-[#60758a] dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full font-medium">
                {MOCK_DATA.resend.timer}
            </span>
        </div>
      </div>

      {/* Back Link */}
      <div className="mt-4 border-t border-[#dbe0e6] dark:border-gray-700 pt-6 text-center">
        <Link href="/login" className="inline-flex items-center justify-center gap-2 text-sm font-medium text-[#60758a] dark:text-gray-400 hover:text-[#111418] dark:hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            {MOCK_DATA.backLink}
        </Link>
      </div>
    </AuthLayout>
  );
}
