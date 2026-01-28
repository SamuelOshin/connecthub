import { ReactNode } from "react";
import { Heart } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    icon?: ReactNode;
  };
  imageSrc?: string;
  imageAlt?: string;
}

export function AuthLayout({
  children,
  testimonial = {
    quote: "ConnectHub helped me find someone who truly gets me. It's safe, simple, and genuine.",
    author: "Sarah & James",
    role: "Matched 2 months ago",
  },
  imageSrc = "https://lh3.googleusercontent.com/aida-public/AB6AXuCCrqFVg6RL9bgIZ_V5vPbC3r-RPrFCPEaW7sTWvhlCKJ79YkSQC1wRjlISjixRL-kvxnkSt8WRHK3j74BThBd43yMroFGh9TqU-8Gd1xGcbAFMfhvgqp31kOdlbCEEzqi6SyMBu2ThzCe_Bi_JpB7D8pSxdaE7dEkguYGMMsZteEI-WO9aSaeCCp5PNsszDnr8DTc4IbnoTkQDa0I6hZFtwT6bp_mLfFqQ_hC7kKZHfpA-VfeATZ-kprnk_ye96nhBCaQ5LHMSySP5",
  imageAlt = "Happy couple laughing together",
}: AuthLayoutProps) {
  const Icon = testimonial.icon || <Heart className="text-white w-5 h-5 fill-white" />;

  return (
    <div className="flex min-h-screen w-full flex-row overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Left Side: Image & Testimonial */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between bg-black">
        <div className="absolute inset-0 z-0">
          <img
            alt={imageAlt}
            className="h-full w-full object-cover opacity-80"
            src={imageSrc}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>

        <div className="relative z-10 p-12 flex flex-col h-full justify-between">
          <div>
            {/* Top branding could go here if needed */}
          </div>
          <div className="max-w-lg">
            <p className="text-3xl font-bold text-white leading-tight mb-4">
              &quot;{testimonial.quote}&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                {Icon}
              </div>
              <div>
                <p className="text-white font-semibold">{testimonial.author}</p>
                <p className="text-white/60 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Content */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white dark:bg-background-dark overflow-y-auto">
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-8 sm:px-12 lg:px-24 xl:px-32">
          <div className="w-full max-w-[440px] flex flex-col gap-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
