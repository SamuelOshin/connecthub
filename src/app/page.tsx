import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProcessSection } from "@/components/ProcessSection";
import { TrustBar } from "@/components/TrustBar";
import { TestimonialSection } from "@/components/TestimonialSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root font-display text-[#101418] bg-white dark:bg-background-dark overflow-x-hidden antialiased">
      <Header />
      <main className="flex-1 flex flex-col items-center w-full">
        <Hero />
        <TrustBar />
        <ProcessSection />
        <TestimonialSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}
