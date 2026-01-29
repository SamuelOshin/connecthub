"use client";

import Link from "next/link";
import { Verified, X, Loader2, Lock } from "lucide-react";

const MOCK_DATA = {
  header: {
    title: "ConnectHub",
  },
  title: "Let's verify your profile",
  description: "We use this to ensure everyone on ConnectHub is real. Position your face in the circle below.",
  camera: {
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpcUf25yXWsraf6hedSPTj21QdyixXTWg6eVqMNuEyxsfo62UOskNv8iP8UvwWMlnmrYqexDQF12uX7aj51e6poEAVIaNdEERfiz6rNdP7jWQhA3CwiwZ4sBhvnXv6XgARELj5QlUNXZcABSI8snUCzO6ujDBdsE-W1SzwPsgXk7IzdjXt1HQ8mRxif3lHrN1_6AveU6JDwVPyKYHh0RA4ZoPPC3iAdpaL1kYIdldXOqdFJSlG5t_hqRduYQDPtR7qqusL8Eez14a5",
    feedback: "Move slightly closer"
  },
  status: "Scanning face features...",
  instruction: "Please ensure your face is well-lit and remove any hats or sunglasses.",
  footer: "Your selfie is encrypted and only used for verification."
};

export default function IdentityScanPage() {
  return (
    <>
      <style jsx global>{`
        @keyframes pulse-ring {
            0% { transform: scale(0.95); opacity: 0.5; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(0.95); opacity: 0.5; }
        }
        .animate-pulse-ring {
            animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 12s linear infinite;
        }
      `}</style>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-sans text-[#111418] dark:text-white transition-colors duration-200">

        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] dark:border-[#2d3748] px-6 lg:px-10 py-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <div className="size-8 flex items-center justify-center rounded bg-primary/10 text-primary">
                    <Verified className="w-6 h-6" />
                </div>
                <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                    {MOCK_DATA.header.title}
                </h2>
            </div>
            <Link href="/identity-verification">
                <button className="flex items-center justify-center size-10 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer text-[#111418] dark:text-white">
                    <X className="w-6 h-6" />
                </button>
            </Link>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10">
            <div className="w-full max-w-[640px] flex flex-col items-center animate-in fade-in zoom-in duration-500">

                {/* Text Instructions */}
                <div className="text-center mb-8">
                    <h1 className="text-[#111418] dark:text-white tracking-tight text-3xl md:text-4xl font-bold leading-tight px-4 pb-3">
                        {MOCK_DATA.title}
                    </h1>
                    <p className="text-[#5f758c] dark:text-[#9ca3af] text-base font-normal leading-normal px-4 max-w-md mx-auto">
                        {MOCK_DATA.description}
                    </p>
                </div>

                {/* Camera Viewfinder */}
                <div className="relative group">
                    {/* Pulsing Outer Ring */}
                    <div className="absolute -inset-4 rounded-full border-2 border-primary/30 animate-pulse-ring z-0"></div>
                    {/* Static Guide Ring */}
                    <div className="absolute -inset-1 rounded-full border-[3px] border-dashed border-primary/50 animate-spin-slow z-0"></div>

                    {/* Main Camera Circle */}
                    <div className="relative size-[320px] sm:size-[400px] rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 border-4 border-white dark:border-[#2d3748] shadow-2xl z-10">
                        {/* Simulated Camera Feed */}
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url('${MOCK_DATA.camera.imageSrc}')`, filter: 'brightness(0.9)' }}
                        ></div>

                        {/* Face Silhouette Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                            <svg fill="none" height="340" viewBox="0 0 200 250" width="280" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 20C60 20 30 50 30 90V110C30 150 50 170 70 180C50 190 20 210 10 240" stroke="white" strokeDasharray="8 8" strokeLinecap="round" strokeWidth="2"></path>
                                <path d="M100 20C140 20 170 50 170 90V110C170 150 150 170 130 180C150 190 180 210 190 240" stroke="white" strokeDasharray="8 8" strokeLinecap="round" strokeWidth="2"></path>
                            </svg>
                        </div>

                        {/* Live Feedback Overlay */}
                        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
                            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                                </span>
                                <span className="text-white text-sm font-semibold">{MOCK_DATA.camera.feedback}</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Particles */}
                    <div className="absolute top-0 right-10 size-2 bg-primary rounded-full animate-ping z-20" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute bottom-10 left-4 size-1.5 bg-primary/60 rounded-full animate-ping z-20" style={{ animationDuration: '2s', animationDelay: '1s' }}></div>
                </div>

                {/* Controls & Status */}
                <div className="mt-10 flex flex-col items-center gap-4 w-full">
                    {/* Progress Indicator */}
                    <div className="flex items-center gap-2 text-primary font-medium bg-primary/10 px-5 py-2 rounded-full">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{MOCK_DATA.status}</span>
                    </div>
                    {/* Secondary Instructions */}
                    <p className="text-[#5f758c] dark:text-[#9ca3af] text-sm text-center max-w-xs mt-2">
                        {MOCK_DATA.instruction}
                    </p>
                </div>
            </div>
        </main>

        {/* Footer */}
        <footer className="py-6 text-center px-6">
            <div className="inline-flex items-center gap-2 text-xs text-[#5f758c] dark:text-[#6b7280] bg-[#f0f2f5] dark:bg-white/5 px-3 py-1.5 rounded-lg">
                <Lock className="w-4 h-4" />
                <span>{MOCK_DATA.footer}</span>
            </div>
        </footer>
      </div>
    </>
  );
}
