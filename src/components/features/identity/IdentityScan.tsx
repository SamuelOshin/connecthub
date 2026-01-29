"use client";

import { useEffect, useState } from "react";
import { Loader2, Lock } from "lucide-react";

interface IdentityScanProps {
  onVerified: () => void;
  onCancel: () => void;
}

const MOCK_DATA = {
  text: {
    title: "Let's verify your profile",
    description: "We use this to ensure everyone on ConnectHub is real. Position your face in the circle below.",
    feedback: "Move slightly closer",
    secondaryInstructions: "Please ensure your face is well-lit and remove any hats or sunglasses.",
    cancel: "Cancel Verification",
    footer: "Your selfie is encrypted and only used for verification."
  },
  states: {
    scanning: "Scanning face features...",
    analyzing: "Analyzing biometrics...",
    verifying: "Verifying liveness...",
    complete: "Verification complete!"
  },
  cameraImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpcUf25yXWsraf6hedSPTj21QdyixXTWg6eVqMNuEyxsfo62UOskNv8iP8UvwWMlnmrYqexDQF12uX7aj51e6poEAVIaNdEERfiz6rNdP7jWQhA3CwiwZ4sBhvnXv6XgARELj5QlUNXZcABSI8snUCzO6ujDBdsE-W1SzwPsgXk7IzdjXt1HQ8mRxif3lHrN1_6AveU6JDwVPyKYHh0RA4ZoPPC3iAdpaL1kYIdldXOqdFJSlG5t_hqRduYQDPtR7qqusL8Eez14a5"
};

export function IdentityScan({ onVerified, onCancel }: IdentityScanProps) {
  const [status, setStatus] = useState(MOCK_DATA.states.scanning);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStatus(MOCK_DATA.states.analyzing);
    }, 2000);

    const timer2 = setTimeout(() => {
      setStatus(MOCK_DATA.states.verifying);
    }, 4000);

    const timer3 = setTimeout(() => {
      setStatus(MOCK_DATA.states.complete);
      setTimeout(onVerified, 1000);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onVerified]);

  return (
    <div className="w-full max-w-[640px] flex flex-col items-center animate-in fade-in zoom-in duration-500">

      {/* Text Instructions */}
      <div className="text-center mb-8">
        <h1 className="text-[#111418] dark:text-white tracking-tight text-3xl md:text-4xl font-bold leading-tight px-4 pb-3">
          {MOCK_DATA.text.title}
        </h1>
        <p className="text-[#5f758c] dark:text-[#9ca3af] text-base font-normal leading-normal px-4 max-w-md mx-auto">
          {MOCK_DATA.text.description}
        </p>
      </div>

      {/* Camera Viewfinder Section */}
      <div className="relative group mb-10">
        {/* Pulsing Outer Ring (Scanning Effect) */}
        <div className="absolute -inset-4 rounded-full border-2 border-primary/30 animate-pulse z-0"></div>
        {/* Static Guide Ring - Spinning */}
        <div className="absolute -inset-1 rounded-full border-[3px] border-dashed border-primary/50 animate-spin z-0" style={{ animationDuration: "10s" }}></div>

        {/* Main Camera Circle */}
        <div className="relative size-[320px] sm:size-[400px] rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 border-4 border-white dark:border-[#2d3748] shadow-2xl z-10">
          {/* Simulated Camera Feed Image */}
          <div
            className="w-full h-full bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url('${MOCK_DATA.cameraImage}')`,
              filter: "brightness(0.9)"
            }}
          ></div>

          {/* Face Silhouette Overlay (Guide) */}
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
              <span className="text-white text-sm font-semibold">{MOCK_DATA.text.feedback}</span>
            </div>
          </div>
        </div>

        {/* Decorative AI Processing Particles */}
        <div className="absolute top-0 right-10 size-2 bg-primary rounded-full animate-ping z-20" style={{ animationDuration: "3s" }}></div>
        <div className="absolute bottom-10 left-4 size-1.5 bg-primary/60 rounded-full animate-ping z-20" style={{ animationDuration: "2s", animationDelay: "1s" }}></div>
      </div>

      {/* Controls & Status */}
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Progress / Status Indicator */}
        <div className="flex items-center gap-2 text-primary font-medium bg-primary/10 px-5 py-2 rounded-full">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>{status}</span>
        </div>

        {/* Secondary Instructions */}
        <p className="text-[#5f758c] dark:text-[#9ca3af] text-sm text-center max-w-xs mt-2">
          {MOCK_DATA.text.secondaryInstructions}
        </p>

        <button onClick={onCancel} className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-white underline mt-4">
            {MOCK_DATA.text.cancel}
        </button>
      </div>

      {/* Footer / Privacy Note */}
      <footer className="py-6 text-center px-6">
        <div className="inline-flex items-center gap-2 text-xs text-[#5f758c] dark:text-[#6b7280] bg-[#f0f2f5] dark:bg-white/5 px-3 py-1.5 rounded-lg">
          <Lock className="w-4 h-4" />
          <span>{MOCK_DATA.text.footer}</span>
        </div>
      </footer>
    </div>
  );
}
