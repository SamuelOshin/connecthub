import { AuthLayout } from "@/components/features/auth/AuthLayout";
import { OTPForm } from "@/components/features/auth/OTPForm";
import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "ConnectHub - Verify OTP",
  description: "Verify your account.",
};

export default function OTPPage() {
  return (
    <AuthLayout
      testimonial={{
        quote: "Verification is the first step to finding real connections. Your safety is our priority.",
        author: "ConnectHub Security",
        role: "Trusted by millions",
        icon: <Shield className="text-white w-5 h-5" />
      }}
      imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCCrqFVg6RL9bgIZ_V5vPbC3r-RPrFCPEaW7sTWvhlCKJ79YkSQC1wRjlISjixRL-kvxnkSt8WRHK3j74BThBd43yMroFGh9TqU-8Gd1xGcbAFMfhvgqp31kOdlbCEEzqi6SyMBu2ThzCe_Bi_JpB7D8pSxdaE7dEkguYGMMsZteEI-WO9aSaeCCp5PNsszDnr8DTc4IbnoTkQDa0I6hZFtwT6bp_mLfFqQ_hC7kKZHfpA-VfeATZ-kprnk_ye96nhBCaQ5LHMSySP5"
      imageAlt="Calm nature lifestyle scene"
    >
      <OTPForm />
    </AuthLayout>
  );
}
