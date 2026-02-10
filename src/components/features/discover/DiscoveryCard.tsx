"use client";

import { RotateCcw, X, Heart, Star, Info, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Profile {
  id: string;
  name: string;
  age: number;
  job: string;
  company: string;
  bio: string;
  tags: string[];
  images: string[];
}

export function DiscoveryCard({ profile }: { profile: Profile }) {
  return (
    <div className="relative w-full max-w-[440px] h-[calc(100vh-140px)] max-h-[720px] flex flex-col bg-white dark:bg-[#1a242f] rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 transition-all duration-300">
      {/* Image Area */}
      <div className="relative h-[65%] w-full bg-slate-200 group">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${profile.images[0]}')` }}
          role="img"
          aria-label={`Portrait of ${profile.name}`}
        />

        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

        {/* Story Indicators */}
        <div className="absolute top-4 left-0 w-full px-4 flex gap-1.5 h-1 z-10">
          <div className="flex-1 bg-white rounded-full h-full shadow-sm"></div>
          <div className="flex-1 bg-white/40 rounded-full h-full backdrop-blur-sm"></div>
          <div className="flex-1 bg-white/40 rounded-full h-full backdrop-blur-sm"></div>
          <div className="flex-1 bg-white/40 rounded-full h-full backdrop-blur-sm"></div>
        </div>

        {/* Navigation Zones */}
        <div className="absolute inset-y-0 left-0 w-1/4 z-0 cursor-w-resize" title="Previous photo" />
        <div className="absolute inset-y-0 right-0 w-1/4 z-0 cursor-e-resize" title="Next photo" />

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-[#1a242f] to-transparent" />
      </div>

      {/* Info Area */}
      <div className="flex-1 flex flex-col px-6 pt-2 pb-6 relative z-10 bg-white dark:bg-[#1a242f] -mt-4 rounded-t-3xl">
        <div className="flex justify-between items-end mb-3">
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{profile.name}</h2>
              <span className="text-2xl font-normal text-slate-500">{profile.age}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mt-1">
              <Briefcase className="w-[18px] h-[18px]" />
              <span className="text-sm font-medium">{profile.job} at {profile.company}</span>
            </div>
          </div>
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-50 dark:bg-slate-800 text-primary cursor-pointer hover:bg-blue-100 transition-colors">
            <Info className="w-5 h-5" />
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
          {profile.bio}
        </p>

        <div className="flex flex-wrap gap-2 mb-auto">
          {profile.tags.map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-4 items-center mt-6">
          <button className="col-span-1 flex justify-center items-center aspect-square rounded-full border border-slate-200 dark:border-slate-700 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:scale-105 transition-all shadow-sm">
            <RotateCcw className="w-6 h-6" />
          </button>

          <button className="col-span-1 flex justify-center items-center h-16 w-16 mx-auto rounded-full border-2 border-slate-200 dark:border-slate-700 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:border-rose-200 dark:hover:border-rose-800 hover:scale-110 transition-all shadow-sm hover:shadow-md">
            <X className="w-8 h-8" />
          </button>

          <button className="col-span-1 flex justify-center items-center h-16 w-16 mx-auto rounded-full bg-primary text-white hover:bg-blue-600 hover:shadow-lg hover:scale-110 transition-all shadow-md shadow-blue-500/30">
            <Heart className="w-8 h-8 fill-current" />
          </button>

          <button className="col-span-1 flex justify-center items-center aspect-square rounded-full border border-slate-200 dark:border-slate-700 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:scale-105 transition-all shadow-sm">
            <Star className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
