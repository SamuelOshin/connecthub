"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TOCSidebar } from "@/components/features/privacy/TOCSidebar";
import { PrivacyContent } from "@/components/features/privacy/PrivacyContent";
import { ChevronRight, Download } from "lucide-react";
import Link from "next/link";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const SECTION_IDS = [
  "data-we-collect",
  "how-we-use",
  "sharing",
  "cookies",
  "rights",
  "security"
];

export default function PrivacyPage() {
  const activeSection = useScrollSpy(SECTION_IDS);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#101418] dark:text-white transition-colors duration-200">
      <Header />
      <main className="max-w-[1280px] mx-auto px-4 lg:px-8 py-24">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 mt-4">
          <Link href="/" className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="text-slate-400 w-4 h-4" />
          <Link href="#" className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">Legal</Link>
          <ChevronRight className="text-slate-400 w-4 h-4" />
          <span className="text-[#101418] dark:text-white text-sm font-medium">Privacy Policy</span>
        </div>

        {/* Title Header */}
        <div className="flex flex-wrap justify-between items-end gap-6 mb-12 border-b border-slate-100 dark:border-slate-800 pb-8">
            <div className="flex flex-col gap-3">
                <h1 className="text-[#101418] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">Privacy Policy</h1>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal">Effective Date: January 1, 2026</p>
            </div>
            <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#101418] dark:text-white text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
            </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative">
            <aside className="w-full lg:w-72 flex-shrink-0 hidden lg:block">
                 <TOCSidebar activeSection={activeSection} />
            </aside>
            <PrivacyContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
