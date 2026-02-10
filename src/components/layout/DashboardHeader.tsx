"use client";

import { Menu, Bell } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-[#1a2733]/80 lg:px-10">
      <div className="flex items-center gap-4">
        <button className="flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        {/* Placeholder for Page Title if needed, currently empty or generic */}
        <h1 className="text-xl font-bold text-[#101418] dark:text-white md:hidden">ConnectHub</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button className="relative flex size-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-primary dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#1a2733]"></span>
        </button>
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
        <button className="text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400">
          Help Center
        </button>
      </div>
    </header>
  );
}
