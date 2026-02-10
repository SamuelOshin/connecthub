"use client";

import { Heart } from "lucide-react";

export interface NewMatch {
  id: string;
  name: string;
  image: string;
  isLike?: boolean; // For the "Likes You" special card
  likesCount?: number;
}

export function NewMatchesCarousel({ matches }: { matches: NewMatch[] }) {
  return (
    <div className="p-6 md:p-8 pb-4">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        New Matches
        <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">{matches.length}</span>
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
        {/* Likes You Card */}
        <div className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer group">
          <div className="relative h-16 w-16 rounded-full p-0.5 border-2 border-dashed border-yellow-500 bg-yellow-500/10 flex items-center justify-center">
            <div className="h-full w-full rounded-full bg-white dark:bg-[#1a242f] flex items-center justify-center">
              <Heart className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            </div>
            <div className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white dark:border-[#1a242f]">
              12
            </div>
          </div>
          <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-500">Likes You</span>
        </div>

        {/* Match Avatars */}
        {matches.map((match) => (
          <div key={match.id} className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer group">
            <div className="relative">
              <div className="h-16 w-16 rounded-full p-0.5 bg-gradient-to-tr from-primary to-purple-500">
                <div
                  className="h-full w-full rounded-full border-2 border-white dark:border-[#1a242f] bg-cover bg-center"
                  style={{ backgroundImage: `url('${match.image}')` }}
                />
              </div>
              <div className="absolute bottom-0 right-0 h-4 w-4 bg-red-500 border-2 border-white dark:border-[#1a242f] rounded-full"></div>
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
              {match.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
