import { BadgeCheck, MapPin, Menu, SlidersHorizontal, ArrowRight, Heart, X, MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="w-full pt-32 pb-20 md:pt-40 md:pb-24 px-4 relative overflow-hidden bg-[linear-gradient(135deg,#e6f0ff_0%,#fff0eb_100%)] dark:bg-none dark:from-background-dark dark:to-background-dark">
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -z-10 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-100/50 rounded-full blur-3xl -z-10 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-8 flex-1 w-full lg:max-w-[50%] z-10">
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <h1 className="text-slate-900 dark:text-white text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
                Real People. <br/>
                <span className="text-primary">Real Connections.</span>
              </h1>
              <p className="text-slate-600 dark:text-gray-300 text-xl font-medium leading-relaxed">
                The safe way to find your person. No games, just meaningful relationships started by millions of verified singles.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100 dark:border-slate-700 w-full max-w-md mx-auto lg:mx-0">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Let's find your match</h3>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase">I am a</label>
                    <div className="relative">
                      <select className="w-full h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary pl-4 pr-10 appearance-none font-medium cursor-pointer">
                        <option>Woman</option>
                        <option>Man</option>
                        <option>Non-binary</option>
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Seeking a</label>
                    <div className="relative">
                      <select className="w-full h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary pl-4 pr-10 appearance-none font-medium cursor-pointer">
                        <option>Man</option>
                        <option>Woman</option>
                        <option>Everyone</option>
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                         <ChevronDown className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-full h-14 bg-primary hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2">
                   Start Matching
                   <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full flex-1 flex justify-center lg:justify-end relative z-10">
            <div className="relative w-[300px] sm:w-[340px] h-[600px] sm:h-[680px] bg-black rounded-[3rem] border-8 border-slate-900 shadow-2xl transform rotate-[-6deg] overflow-hidden" style={{ boxShadow: "20px 30px 60px -10px rgba(0, 0, 0, 0.2)"}}>
              <div className="absolute top-0 inset-x-0 h-8 bg-black z-20 rounded-b-2xl w-40 mx-auto"></div>
              <div className="w-full h-full bg-white relative">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDU42q1pm25-Qlg0eRPCvqjbwt-jYBMk8x54FbCwXhMbhzy7uD582gyLMETieOk4_4GvztmBltt0sn3jKd47Fucod5bbz3CRCuSZgZD3rqvQta8bCjZ2NAsX9ZaqfuN-WEtMwpjKXWdC7dYQ7RdlyABnpOOkOPz5DJIT008qXoBm76GoZLcW8NhJDjgEXHAXGdqN0doyHE2tLOeELjha6oF4fAqvD6P0tGF3lo9cAC4IdwDa3N7UXAAbcY2jrr7_pc5YKfgqzSdWonc")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10"></div>
                
                <div className="absolute top-12 left-0 w-full px-6 flex justify-between items-center text-white z-10">
                  <Menu className="w-6 h-6" />
                  <span className="font-bold text-lg">Discovery</span>
                  <SlidersHorizontal className="w-6 h-6" />
                </div>

                <div className="absolute bottom-24 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-3xl font-bold">Sarah, 28</h2>
                    <BadgeCheck className="text-blue-400 fill-current w-6 h-6" />
                  </div>
                  <p className="text-sm opacity-90 mb-3 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> San Francisco, CA
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">Coffee Lover</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">Travel</span>
                  </div>
                </div>

                <div className="absolute bottom-6 w-full flex justify-center gap-6 px-8">
                  <button className="w-14 h-14 rounded-full bg-white text-red-500 shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                    <X className="w-8 h-8" />
                  </button>
                  <button className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform shadow-blue-500/40">
                    <Heart className="w-8 h-8 fill-white" />
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute top-1/4 -left-8 bg-white p-3 rounded-2xl shadow-xl animate-bounce hidden md:flex items-center gap-3 z-20">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="pr-2">
                <p className="text-xs text-slate-500 font-bold">New Message</p>
                <p className="text-sm font-bold text-slate-900">Hey! Want to grab coffee?</p>
              </div>
            </div>

            <div className="absolute bottom-1/4 -right-4 bg-white p-3 rounded-2xl shadow-xl hidden md:flex items-center gap-2 z-20 animate-pulse">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 bg-[url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100')] bg-cover"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100')] bg-cover"></div>
              </div>
              <span className="text-xs font-bold text-primary">It's a Match!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
