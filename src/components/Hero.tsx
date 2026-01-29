import { BadgeCheck, MapPin, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="w-full pt-32 pb-20 md:pt-40 md:pb-32 px-4 relative overflow-hidden bg-[linear-gradient(135deg,#e6f2ff_0%,#ffffff_100%)] dark:bg-none dark:bg-background-dark">
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -z-10 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-3xl -z-10 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex flex-col gap-8 flex-1 w-full lg:max-w-2xl text-center lg:text-left items-center lg:items-start z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              #1 Trusted Dating App
            </div>

            <div className="flex flex-col gap-6">
              <h1 className="text-slate-900 dark:text-white text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
                Find Your Perfect <br/>
                <span className="text-primary relative inline-block">
                  Match Today
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" preserveAspectRatio="none" viewBox="0 0 100 10">
                    <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8"></path>
                  </svg>
                </span>
              </h1>
              <h2 className="text-slate-600 dark:text-gray-300 text-xl font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                Join millions of singles on ConnectHub. A professional platform where authenticity meets romance safely.
              </h2>
            </div>

            <div className="w-full max-w-md flex flex-col gap-5 mt-4">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button variant="default" size="lg" className="flex-1">Find Your Match</Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900 dark:bg-transparent dark:text-white dark:border-white/20 dark:hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>
              <p className="text-sm text-slate-500 text-center lg:text-left">
                Free to join. No credit card required.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-200/60 w-full justify-center lg:justify-start">
              <div className="flex -space-x-3">
                 {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100"
                 ].map((src, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 bg-cover" style={{ backgroundImage: `url(${src})` }}></div>
                 ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-slate-600">+2k</div>
              </div>
              <div className="text-sm font-semibold text-slate-700">
                <span className="text-primary">10k+</span> Matches made daily
              </div>
            </div>
          </div>

          <div className="w-full flex-1 flex justify-center lg:justify-end relative z-10">
            <div className="relative w-full max-w-[500px]">
              <div className="relative z-20 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/20 aspect-[4/5] bg-white group">
                <div className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDU42q1pm25-Qlg0eRPCvqjbwt-jYBMk8x54FbCwXhMbhzy7uD582gyLMETieOk4_4GvztmBltt0sn3jKd47Fucod5bbz3CRCuSZgZD3rqvQta8bCjZ2NAsX9ZaqfuN-WEtMwpjKXWdC7dYQ7RdlyABnpOOkOPz5DJIT008qXoBm76GoZLcW8NhJDjgEXHAXGdqN0doyHE2tLOeELjha6oF4fAqvD6P0tGF3lo9cAC4IdwDa3N7UXAAbcY2jrr7_pc5YKfgqzSdWonc")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold">Sarah, 28</span>
                    <BadgeCheck className="text-blue-400 fill-current w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 top-20 z-30 bg-white p-4 rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <Heart className="text-red-500 fill-current w-8 h-8" />
              </div>

              <div className="absolute -left-6 bottom-32 z-30 bg-white/90 backdrop-blur-md p-4 pr-6 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">New Message</p>
                  <p className="text-sm font-bold text-slate-900">Hey! Want to meet?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
