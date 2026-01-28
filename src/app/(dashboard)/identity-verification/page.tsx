"use client";

import { useState } from "react";
import { IdentityIntro } from "@/components/features/identity/IdentityIntro";
import { IdentityScan } from "@/components/features/identity/IdentityScan";
import { VerificationSuccess } from "@/components/features/identity/VerificationSuccess";
import { Heart, X, ShieldCheck } from "lucide-react";
import Link from "next/link";

// MOCK DATA
const USER = {
  name: "Alex",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfrUPSfshkkYDfN6s9SbedkZvzjsRGnXfUkmYQVo7pMRnwdrMLGfYPI58g-bwSys2OYO9N-FnXqCSSzFFtj2--1YzrcMiZgqk-qDb3S3_mHLmAnesx5sVa9gEHkKa-Jk1VIO85K4j_Bo75VCHBcWfV_EJDmVldO-EhP9QYGeA9r475PAIS6ZpGmwz5qQAe6PF66yyykEH_B4fRmbwYcg8sb6BnAoh3KTIlqR8LywC6UrCPZsF2w02A8x7qAvYV3URNMMrjCTcjn_a4"
};

export default function IdentityVerificationPage() {
  const [step, setStep] = useState<"intro" | "scan" | "success">("intro");

  const handleNext = () => setStep("scan");
  const handleScanComplete = () => setStep("success");
  const handleCancel = () => setStep("intro");
  const handleSkip = () => {
    // Navigate away or show toast
    console.log("Skipped");
  };

  if (step === "success") {
    return <VerificationSuccess onComplete={() => console.log("Profile Build")} onSkip={handleSkip} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      {/* Dynamic Header */}
      <header className="flex items-center justify-between whitespace-nowrap px-6 py-4 md:px-10 border-b border-[#e5e7eb] dark:border-[#2d3748] bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">

        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 text-[#101418] dark:text-white cursor-pointer">
          {step === "scan" ? (
             <div className="size-8 flex items-center justify-center rounded bg-primary/10 text-primary">
                <ShieldCheck className="w-6 h-6" />
             </div>
          ) : (
            <div className="size-8 flex items-center justify-center bg-primary/10 rounded-full text-primary">
                <Heart className="w-5 h-5 fill-primary" />
            </div>
          )}
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">ConnectHub</h2>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {step === "intro" ? (
            <>
              <div className="hidden sm:flex items-center gap-3">
                <div
                    className="bg-center bg-no-repeat bg-cover rounded-full size-9 border-2 border-white dark:border-gray-700 shadow-sm"
                    style={{ backgroundImage: `url("${USER.avatar}")` }}
                ></div>
              </div>
              <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 px-4 bg-gray-100 dark:bg-gray-800 text-[#101418] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <span className="truncate">Log Out</span>
              </button>
            </>
          ) : (
            <button
                onClick={handleCancel}
                className="flex items-center justify-center size-10 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer text-[#111418] dark:text-white"
            >
                <X className="w-6 h-6" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        {step === "intro" && <IdentityIntro onNext={handleNext} onSkip={handleSkip} />}
        {step === "scan" && <IdentityScan onVerified={handleScanComplete} onCancel={handleCancel} />}
      </main>
    </div>
  );
}
