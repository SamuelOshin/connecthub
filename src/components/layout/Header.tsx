"use client";

import { Heart, Bell, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Mock User Data
const USER = {
  name: "Alex M.",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
};

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="h-16 bg-white dark:bg-[#1a242f] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-30 shrink-0 sticky top-0">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
          <Heart className="w-5 h-5 fill-current" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white hidden md:block">
          ConnectHub
        </h1>
        <button
          className="md:hidden p-1 text-slate-500"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-[#1a242f]"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>

        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div
            className="h-9 w-9 rounded-full bg-cover bg-center ring-2 ring-slate-100 dark:ring-slate-700"
            style={{ backgroundImage: `url('${USER.avatar}')` }}
          />
        </div>
      </div>
    </header>
  );
}
