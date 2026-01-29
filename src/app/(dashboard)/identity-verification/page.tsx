import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Verified, Lock, Heart } from "lucide-react";

const MOCK_DATA = {
  header: {
    title: "ConnectHub",
    userAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfrUPSfshkkYDfN6s9SbedkZvzjsRGnXfUkmYQVo7pMRnwdrMLGfYPI58g-bwSys2OYO9N-FnXqCSSzFFtj2--1YzrcMiZgqk-qDb3S3_mHLmAnesx5sVa9gEHkKa-Jk1VIO85K4j_Bo75VCHBcWfV_EJDmVldO-EhP9QYGeA9r475PAIS6ZpGmwz5qQAe6PF66yyykEH_B4fRmbwYcg8sb6BnAoh3KTIlqR8LywC6UrCPZsF2w02A8x7qAvYV3URNMMrjCTcjn_a4",
    logout: "Log Out"
  },
  illustration: {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5Ns6PuIwKzqTHAkr0foSh5FrmMDoONdSgvpYBu9mszF1RtN2zZafc3Grsn5F6ew68AH0WG3tdRNxTeu6bMw62HEfZ-z3iOSxOLCiTFg3PNbJliaaofZGTL8Bhv9FmTxNJ63q9TsN89FH0HFW9xm0JuDQ7jO1lDiN1bDtvt-Zt78TsGX6EPWnao665mvEfxfyEaijwNTpRlQDcPF0XQ6RlLcosIE402_ghQ7j3PHwo8iIeVg-2SQtVH03-EVolnxw90u907JpZuYEE",
    alt: "3D illustration of a friendly character holding a smartphone for a selfie"
  },
  badge: "Identity Check",
  title: "Let's verify it's you",
  description: "Take a quick video selfie to confirm your identity. Verified profiles get 3x more matches and earn a trusted blue checkmark.",
  benefit: {
    title: "Get Verified Badge",
    description: "Earn trust with a blue checkmark on your profile"
  },
  buttons: {
    primary: "Start Verification",
    secondary: "Do it later"
  },
  footer: "Secure & Private. Your video is not shared publicly."
};

export default function IdentityVerificationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-[#101418] dark:text-white font-sans">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap px-6 py-4 md:px-10">
        <div className="flex items-center gap-3 cursor-pointer">
            <div className="size-8 flex items-center justify-center bg-primary/10 rounded-full text-primary">
                <Heart className="w-5 h-5 fill-current" />
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
                {MOCK_DATA.header.title}
            </h2>
        </div>
        <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
                <div
                    className="bg-center bg-no-repeat bg-cover rounded-full size-9 border-2 border-white dark:border-gray-700 shadow-sm"
                    style={{ backgroundImage: `url("${MOCK_DATA.header.userAvatar}")` }}
                ></div>
            </div>
            <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 px-4 bg-gray-100 dark:bg-gray-800 text-[#101418] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <span className="truncate">{MOCK_DATA.header.logout}</span>
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-[520px] bg-white dark:bg-[#1a2632] rounded-[32px] shadow-sm p-6 sm:p-10 flex flex-col items-center text-center animate-fade-in-up">

            {/* Illustration */}
            <div className="relative w-full mb-8 flex justify-center">
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-primary/5 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 to-purple-100/50 dark:from-blue-900/20 dark:to-purple-900/20"></div>
                    <div
                        className="w-full h-full bg-contain bg-center bg-no-repeat transform scale-90 mt-4"
                        style={{ backgroundImage: `url("${MOCK_DATA.illustration.src}")` }}
                        role="img"
                        aria-label={MOCK_DATA.illustration.alt}
                    ></div>

                    {/* Floating Badge */}
                    <div className="absolute bottom-4 right-4 sm:right-8 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 animate-bounce-slow">
                        <Verified className="w-8 h-8 text-primary fill-current" />
                    </div>
                </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-3 mb-8">
                <div className="inline-flex items-center justify-center gap-1.5 self-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                    <Shield className="w-3.5 h-3.5" />
                    {MOCK_DATA.badge}
                </div>
                <h1 className="text-[#101418] dark:text-white tracking-tight text-3xl sm:text-4xl font-extrabold leading-tight">
                    {MOCK_DATA.title}
                </h1>
                <p className="text-[#5e758d] dark:text-gray-400 text-base sm:text-lg font-normal leading-relaxed max-w-[400px] mx-auto">
                    {MOCK_DATA.description}
                </p>
            </div>

            {/* Value Prop Card */}
            <div className="w-full bg-background-light dark:bg-background-dark rounded-2xl p-4 flex items-center gap-4 mb-8 text-left">
                <div className="size-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shrink-0 shadow-sm text-primary">
                    <Verified className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-[#101418] dark:text-white font-bold text-sm">{MOCK_DATA.benefit.title}</h3>
                    <p className="text-[#5e758d] dark:text-gray-400 text-sm">{MOCK_DATA.benefit.description}</p>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 w-full max-w-[360px]">
                <Link href="/identity-verification/scan">
                    <Button className="w-full h-14 rounded-full text-base shadow-lg shadow-blue-500/25" size="lg">
                        {MOCK_DATA.buttons.primary}
                    </Button>
                </Link>
                <Button variant="ghost" className="w-full h-12 rounded-full text-[#5e758d] dark:text-gray-400 font-bold hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    {MOCK_DATA.buttons.secondary}
                </Button>
            </div>

            {/* Footer Trust */}
            <div className="mt-8 flex items-center gap-2 text-[#5e758d]/60 dark:text-gray-500 text-xs font-medium">
                <Lock className="w-3.5 h-3.5" />
                <span>{MOCK_DATA.footer}</span>
            </div>
        </div>
      </main>
    </div>
  );
}
