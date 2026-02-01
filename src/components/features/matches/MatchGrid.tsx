"use client";

import { MessageCircle, Star, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MatchProfile {
  id: string;
  name: string;
  age: number;
  image: string;
  status: "Online" | "New Match" | "Super Like" | string;
  activeStatus: string;
  distance?: string;
}

export function MatchGrid({ profiles }: { profiles: MatchProfile[] }) {
  return (
    <div className="px-6 md:px-8 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your Matches</h2>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="hidden sm:inline">Sort by:</span>
          <select className="bg-transparent border-none font-semibold text-slate-700 dark:text-slate-300 focus:ring-0 cursor-pointer p-0 pr-6 text-sm outline-none">
            <option>Recent Activity</option>
            <option>Newest Match</option>
            <option>Distance</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {profiles.map((profile) => (
          <div key={profile.id} className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 cursor-pointer shadow-sm hover:shadow-glow transition-all duration-300">
            <div
              className={cn(
                "absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110",
                profile.status === "Offline" && "grayscale"
              )}
              style={{ backgroundImage: `url('${profile.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Status Badge */}
            {profile.status === "Online" && (
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-green-500/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-white uppercase tracking-wide shadow-sm">
                Online
              </div>
            )}
            {profile.status === "New Match" && (
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-primary/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-white uppercase tracking-wide shadow-sm">
                New Match
              </div>
            )}
             {profile.status === "Super Like" && (
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-purple-500/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-white uppercase tracking-wide shadow-sm flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" /> Super Like
              </div>
            )}

            {/* Super Like Star Indicator (Hidden until hover) */}
            <div className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <Star className="w-4 h-4 fill-current" />
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 w-full p-4 text-white">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-lg font-bold leading-tight">{profile.name}, {profile.age}</h3>
                  <p className="text-xs text-slate-300 flex items-center gap-1 mt-1 font-medium">
                    {profile.distance ? (
                        <>
                            <MapPin className="w-3 h-3" /> {profile.distance}
                        </>
                    ) : (
                        <>
                            <span className={cn("w-2 h-2 rounded-full", profile.status === "Online" ? "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]" : "hidden")}></span> {profile.activeStatus}
                        </>
                    )}
                  </p>
                </div>
                <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-colors shadow-lg transform translate-y-2 group-hover:translate-y-0 duration-300">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
