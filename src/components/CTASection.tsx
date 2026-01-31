import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <div className="w-full py-24 px-4 bg-white dark:bg-background-dark">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary to-blue-600 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-600/30">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent opacity-20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10 flex flex-col items-center gap-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Ready to find your match?</h2>
          <p className="text-blue-50 text-xl md:text-2xl max-w-2xl font-medium">
            Join the community where real connections happen every day.
          </p>
          <button className="bg-white text-primary hover:bg-blue-50 font-bold text-xl h-16 px-12 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 mt-4">
            Join for Free
            <ArrowRight className="w-6 h-6" />
          </button>
          <p className="text-sm text-blue-200 mt-4 opacity-80">No credit card required • Cancel anytime</p>
        </div>
      </div>
    </div>
  );
}
