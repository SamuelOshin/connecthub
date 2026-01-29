import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, PartyPopper, Star, Heart, Activity } from "lucide-react";

const MOCK_DATA = {
  header: {
    title: "ConnectHub",
  },
  pageTitle: "You're all set, Alex!",
  pageSubtitle: "Your journey to finding real connections starts now.",
  buttons: {
    primary: "Build My Profile",
    secondary: "Skip for now"
  }
};

export default function SuccessPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-sans flex flex-col items-center justify-center p-6 selection:bg-primary/20">

      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-blue-200/50 dark:bg-blue-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[15%] w-[45vw] h-[45vw] bg-pink-200/50 dark:bg-pink-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] left-[10%] w-[40vw] h-[40vw] bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Celebration Icon Group */}
        <div className="relative mb-12">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl transform scale-110"></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white dark:bg-gray-800 rounded-full shadow-xl shadow-blue-500/10 flex items-center justify-center border-[6px] border-white dark:border-gray-700">
                <PartyPopper className="w-16 h-16 md:w-20 md:h-20 text-primary" />
            </div>

            <div className="absolute -top-3 -right-3 bg-yellow-50 dark:bg-yellow-900/40 p-2.5 rounded-full border-4 border-white dark:border-gray-700 shadow-lg">
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
            </div>

            <div className="absolute bottom-1 -left-3 bg-rose-50 dark:bg-rose-900/40 p-2.5 rounded-full border-4 border-white dark:border-gray-700 shadow-lg">
                <Heart className="w-5 h-5 text-rose-500 fill-current" />
            </div>
        </div>

        {/* Text Content */}
        <div className="w-full max-w-lg text-center flex flex-col items-center gap-2 mb-10">
            <div className="flex items-center gap-2 mb-4 opacity-70">
                <div className="w-5 h-5 rounded bg-primary flex items-center justify-center text-white">
                    <Activity className="w-3 h-3" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#60758a] dark:text-gray-400">
                    {MOCK_DATA.header.title}
                </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#111418] dark:text-white leading-tight">
                {MOCK_DATA.pageTitle}
            </h1>
            <p className="text-lg md:text-xl text-[#60758a] dark:text-gray-400 font-medium leading-relaxed max-w-sm">
                {MOCK_DATA.pageSubtitle}
            </p>
        </div>

        {/* Actions */}
        <div className="w-full max-w-sm flex flex-col gap-4">
            <Button className="w-full h-14 text-lg rounded-xl gap-2 group shadow-lg shadow-blue-500/25" size="lg">
                <span>{MOCK_DATA.buttons.primary}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Link href="#" className="w-full text-center py-2 text-[#60758a] dark:text-gray-500 hover:text-[#111418] dark:hover:text-white font-semibold transition-colors">
                {MOCK_DATA.buttons.secondary}
            </Link>
        </div>
      </div>
    </div>
  );
}
