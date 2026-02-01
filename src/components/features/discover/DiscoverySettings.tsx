"use client";

import { MapPin, Info, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const INTERESTS = ["Photography", "Music", "Travel", "Foodie", "Art", "Gaming"];

export function DiscoverySettings() {
  const [distance, setDistance] = useState(25);

  return (
    <aside className="w-80 hidden xl:flex flex-col h-full bg-white dark:bg-[#1a242f] border-l border-slate-200 dark:border-slate-800 overflow-y-auto shrink-0">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Discovery Settings</h2>
          <button className="text-primary text-sm font-semibold hover:underline">Clear</button>
        </div>

        <div className="flex flex-col gap-8">
          {/* Location */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Location</label>
              <span className="text-xs font-medium text-primary cursor-pointer flex items-center gap-0.5">
                <MapPin className="w-3 h-3" /> My Location
              </span>
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-slate-400 transition-all"
                type="text"
                defaultValue="San Francisco, CA"
              />
            </div>
          </div>

          {/* Distance */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Maximum Distance</label>
              <span className="text-sm font-semibold text-slate-500">{distance}km</span>
            </div>
            <input
              className="h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
              max="100"
              min="1"
              type="range"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
            />
          </div>

          {/* Age Range */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Age Range</label>
              <span className="text-sm font-semibold text-slate-500">24 - 30</span>
            </div>
            {/* Custom Range Slider Mockup */}
            <div className="relative h-6 w-full flex items-center select-none">
              <div className="absolute w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
              <div className="absolute left-[20%] right-[40%] h-1 bg-primary rounded-lg"></div>
              <div className="absolute left-[20%] h-5 w-5 bg-white border-2 border-primary rounded-full shadow cursor-pointer transform -translate-x-1/2"></div>
              <div className="absolute right-[40%] h-5 w-5 bg-white border-2 border-primary rounded-full shadow cursor-pointer transform translate-x-1/2"></div>
            </div>
          </div>

          {/* Interested In */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Interested In</label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button className="py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm">Women</button>
              <button className="py-2 rounded-lg text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700">Men</button>
              <button className="py-2 rounded-lg text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700">Everyone</button>
            </div>
          </div>

          {/* Common Interests */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Common Interests</label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <button
                  key={interest}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border",
                    interest === "Photography" || interest === "Travel"
                      ? "bg-primary/10 text-primary border-primary/20"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300"
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
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -top-4 bg-white/10 w-24 h-24 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <h3 className="font-bold text-sm mb-1">ConnectHub Gold</h3>
            <p className="text-xs text-white/90 mb-3">See who likes you & more!</p>
            <Button variant="white" className="w-full h-9 text-xs rounded-lg">Upgrade Now</Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
