"use client";

import { Search, Check, Bolt } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const INTERESTS = ["Coffee", "Hiking", "Music", "Travel"];

export function MatchFilters() {
  return (
    <aside className="w-80 hidden xl:flex flex-col h-full bg-white dark:bg-[#1a242f] border-l border-slate-200 dark:border-slate-800 overflow-y-auto shrink-0">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Filter Matches</h2>
          <button className="text-primary text-sm font-semibold hover:underline">Reset</button>
        </div>

        <div className="flex flex-col gap-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-slate-400 transition-all" 
              placeholder="Search matches..." 
              type="text"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Status</label>
            
            <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors group">
              <div className="relative flex items-center">
                <input type="checkbox" className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 dark:border-slate-600 checked:border-primary checked:bg-primary transition-all" />
                <Check className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">Unread Messages</span>
              <span className="ml-auto bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">2</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors group">
              <div className="relative flex items-center">
                <input type="checkbox" defaultChecked className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 dark:border-slate-600 checked:border-primary checked:bg-primary transition-all" />
                <Check className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">Online Now</span>
              <span className="ml-auto w-2 h-2 rounded-full bg-green-500"></span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors group">
              <div className="relative flex items-center">
                <input type="checkbox" className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 dark:border-slate-600 checked:border-primary checked:bg-primary transition-all" />
                <Check className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">Super Liked</span>
              <span className="ml-auto text-purple-500 text-xs font-bold">★</span>
            </label>
          </div>

          {/* Interests */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Interests</label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <button 
                  key={interest}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border",
                    interest === "Coffee"
                      ? "bg-primary/10 text-primary border-primary/20"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-300"
                  )}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto p-6">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
          <div className="absolute -right-4 -top-4 bg-white/10 w-24 h-24 rounded-full blur-xl group-hover:bg-white/20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Bolt className="w-4 h-4 fill-current" />
              <h3 className="font-bold text-sm">Boost Profile</h3>
            </div>
            <p className="text-xs text-white/90 mb-3">Get 10x more visibility for 30 mins!</p>
            <Button variant="white" className="w-full h-9 text-xs text-purple-600 rounded-lg">Activate Boost</Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
