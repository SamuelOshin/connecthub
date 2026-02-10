"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const INTERESTS = [
  { label: "Photography", id: "photography", selected: true },
  { label: "Music", id: "music", selected: false },
  { label: "Travel", id: "travel", selected: true },
  { label: "Foodie", id: "foodie", selected: false },
  { label: "Art", id: "art", selected: false },
  { label: "Gaming", id: "gaming", selected: false },
];

export function DiscoverySettings() {
  const [distance, setDistance] = useState(25);
  const [ageRange, setAgeRange] = useState({ min: 24, max: 30 });
  const [selectedGender, setSelectedGender] = useState("women");
  const [selectedInterests, setSelectedInterests] = useState(["photography", "travel"]);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  return (
    <aside className="w-72 hidden xl:flex flex-col h-full bg-surface-light dark:bg-surface-dark border-l border-gray-200 dark:border-gray-800 overflow-y-auto shrink-0">
      <div className="p-6 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Discovery Settings
          </h2>
          <button className="text-primary text-sm font-medium hover:underline">Clear</button>
        </div>

        <div className="flex flex-col gap-8">
          {/* Location */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Location</label>
              <button className="text-xs font-medium text-primary flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-[14px]">my_location</span>
                My Location
              </button>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">location_on</span>
              <input
                className="w-full pl-10 pr-4 py-3 rounded-full bg-gray-100 dark:bg-gray-800 border-0 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-400"
                type="text"
                defaultValue="San Francisco, CA"
              />
            </div>
          </div>

          {/* Maximum Distance */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Maximum Distance</label>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{distance}km</span>
            </div>
            <input
              className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              max="100"
              min="1"
              type="range"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
            />
          </div>

          {/* Age Range */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Age Range</label>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{ageRange.min} - {ageRange.max}</span>
            </div>
            <div className="relative h-1">
              {/* Track background */}
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              {/* Active track */}
              <div
                className="absolute h-full bg-primary rounded-lg"
                style={{
                  left: `${((ageRange.min - 18) / 82) * 100}%`,
                  right: `${100 - ((ageRange.max - 18) / 82) * 100}%`
                }}
              ></div>
              {/* Min thumb */}
              <input
                className="absolute w-full h-1 appearance-none cursor-pointer bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                max="100"
                min="18"
                type="range"
                value={ageRange.min}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val < ageRange.max) setAgeRange(prev => ({ ...prev, min: val }));
                }}
              />
              {/* Max thumb */}
              <input
                className="absolute w-full h-1 appearance-none cursor-pointer bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                max="100"
                min="18"
                type="range"
                value={ageRange.max}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val > ageRange.min) setAgeRange(prev => ({ ...prev, max: val }));
                }}
              />
            </div>
          </div>

          {/* Interested In */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Interested In</label>
            <div className="flex gap-2">
              {[
                { value: "women", label: "Women" },
                { value: "men", label: "Men" },
                { value: "everyone", label: "Everyone" },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedGender(option.value)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-medium transition-all border",
                    selectedGender === option.value
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                      : "bg-transparent text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-gray-400"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Common Interests */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Common Interests</label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                    selectedInterests.includes(interest.id)
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-transparent text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-primary/50"
                  )}
                >
                  {interest.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Premium Card */}
      <div className="p-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-6 -top-6 bg-white/10 w-28 h-28 rounded-full blur-xl"></div>
          <div className="absolute -left-4 -bottom-4 bg-white/10 w-20 h-20 rounded-full blur-lg"></div>
          <div className="relative z-10">
            <h3 className="font-bold text-base mb-1">ConnectHub Gold</h3>
            <p className="text-xs text-white/80 mb-4">See who likes you & more!</p>
            <Link href="/premium" className="block w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold h-10 rounded-full shadow-md text-center leading-10">
              Upgrade Now
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
