"use client";

import { Button } from "@/components/Button";
import {
  ShieldCheck,
  BadgeCheck,
  Lock,
  Verified
} from "lucide-react";

interface IdentityIntroProps {
  onNext: () => void;
  onSkip?: () => void;
}

const MOCK_DATA = {
  illustration: {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5Ns6PuIwKzqTHAkr0foSh5FrmMDoONdSgvpYBu9mszF1RtN2zZafc3Grsn5F6ew68AH0WG3tdRNxTeu6bMw62HEfZ-z3iOSxOLCiTFg3PNbJliaaofZGTL8Bhv9FmTxNJ63q9TsN89FH0HFW9xm0JuDQ7jO1lDiN1bDtvt-Zt78TsGX6EPWnao665mvEfxfyEaijwNTpRlQDcPF0XQ6RlLcosIE402_ghQ7j3PHwo8iIeVg-2SQtVH03-EVolnxw90u907JpZuYEE",
    alt: "Identity Verification Illustration"
  },
  content: {
    tag: "Identity Check",
    title: "Let's verify it's you",
    description: "Take a quick video selfie to confirm your identity. Verified profiles get 3x more matches and earn a trusted blue checkmark."
  },
  valueProp: {
    title: "Get Verified Badge",
    description: "Earn trust with a blue checkmark on your profile"
  },
  buttons: {
    start: "Start Verification",
    skip: "Do it later"
  },
  footer: "Secure & Private. Your video is not shared publicly."
};

export function IdentityIntro({ onNext, onSkip }: IdentityIntroProps) {
  return (
    <div className="w-full max-w-[520px] bg-white dark:bg-[#1a2632] rounded-[32px] shadow-sm p-6 sm:p-10 flex flex-col items-center text-center animate-in slide-in-from-bottom-4 fade-in duration-500">
      {/* Illustration Area */}
      <div className="relative w-full mb-8 flex justify-center">
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-primary/5 flex items-center justify-center overflow-hidden">
          {/* Abstract gradient background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 to-purple-100/50 dark:from-blue-900/20 dark:to-purple-900/20"></div>
          {/* Main Illustration */}
          <div
            className="w-full h-full bg-contain bg-center bg-no-repeat transform scale-90 mt-4"
            style={{ backgroundImage: `url("${MOCK_DATA.illustration.src}")` }}
            aria-label={MOCK_DATA.illustration.alt}
          >
          </div>
          {/* Floating Badge Element */}
          <div className="absolute bottom-4 right-4 sm:right-8 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 animate-bounce">
            <BadgeCheck className="text-primary w-8 h-8 fill-white dark:fill-gray-800" />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="inline-flex items-center justify-center gap-1.5 self-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            {MOCK_DATA.content.tag}
        </div>
        <h1 className="text-[#101418] dark:text-white tracking-tight text-3xl sm:text-4xl font-extrabold leading-tight">
            {MOCK_DATA.content.title}
        </h1>
        <p className="text-[#5e758d] dark:text-gray-400 text-base sm:text-lg font-normal leading-relaxed max-w-[400px] mx-auto">
            {MOCK_DATA.content.description}
        </p>
      </div>

      {/* Value Prop Card (Mini) */}
      <div className="w-full bg-background-light dark:bg-background-dark rounded-2xl p-4 flex items-center gap-4 mb-8 text-left">
        <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shrink-0 shadow-sm text-primary">
            <Verified className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-[#101418] dark:text-white font-bold text-sm">{MOCK_DATA.valueProp.title}</h3>
            <p className="text-[#5e758d] dark:text-gray-400 text-sm">{MOCK_DATA.valueProp.description}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 w-full max-w-[360px]">
        <Button className="w-full h-14 text-base shadow-lg shadow-blue-500/25" onClick={onNext}>
            {MOCK_DATA.buttons.start}
        </Button>
        <button
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 text-[#5e758d] dark:text-gray-400 text-sm font-bold leading-normal tracking-[0.015em] transition-colors"
            onClick={onSkip}
        >
            <span className="truncate">{MOCK_DATA.buttons.skip}</span>
        </button>
      </div>

      {/* Footer Trust Indicator */}
      <div className="mt-8 flex items-center gap-2 text-[#5e758d]/60 dark:text-gray-500 text-xs font-medium">
        <Lock className="w-3 h-3" />
        <span>{MOCK_DATA.footer}</span>
      </div>
    </div>
  );
}
