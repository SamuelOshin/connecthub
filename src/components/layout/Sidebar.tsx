"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Compass,
  MessageCircle,
  Crown,
  Settings,
  User,
  MoreVertical
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    const baseClass = "group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all";
    const activeClass = "bg-primary/10 font-bold text-primary dark:bg-primary/20 dark:text-blue-300";
    const inactiveClass = "text-slate-600 hover:bg-slate-50 hover:text-primary dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white";

    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  const getIconClass = (path: string, baseIconClass: string) => {
    const isActive = pathname === path;
    return `${baseIconClass} ${isActive ? "fill-current" : "group-hover:text-primary transition-colors"}`;
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-white dark:bg-[#1a2733] border-r border-slate-200 dark:border-slate-800 z-50 h-full">
      <div className="h-20 flex items-center px-8 flex-shrink-0 border-b border-slate-100 dark:border-slate-800/50">
        <Link href="/" className="flex items-center gap-3 text-primary">
          <div className="size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h2 className="text-[#101418] dark:text-white text-xl font-extrabold tracking-tight">ConnectHub</h2>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <nav className="space-y-1.5">
          <p className="px-4 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Menu</p>

          <Link href="/discover" className={getLinkClass("/discover")}>
            <Compass className={getIconClass("/discover", "w-5 h-5")} />
            Discover
          </Link>

          <Link href="/matches" className={getLinkClass("/matches")}>
            <Heart className={getIconClass("/matches", "w-5 h-5")} />
            Matches
          </Link>

          <Link href="/messages" className={getLinkClass("/messages")}>
            <MessageCircle className={getIconClass("/messages", "w-5 h-5")} />
            Messages
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm shadow-primary/30">2</span>
          </Link>

          <div className="py-4"></div>

          <p className="px-4 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Subscription</p>

          <Link href="/premium" className={getLinkClass("/premium")}>
            <Crown className={getIconClass("/premium", "w-5 h-5")} />
            Premium Plans
          </Link>
        </nav>
      </div>

      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <Link href="/settings" className={getLinkClass("/settings")}>
          <Settings className={getIconClass("/settings", "w-5 h-5")} />
          Settings
        </Link>

        <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
          <Link href="/profile" className="flex items-center gap-3 w-full">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
               <User className={cn("w-6 h-6", pathname === "/profile" ? "text-primary" : "text-slate-400")} />
            </div>
            <div className="overflow-hidden flex-1">
              <p className={cn("truncate text-sm font-bold", pathname === "/profile" ? "text-primary" : "text-[#101418] dark:text-white")}>Alex Doe</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">Free Plan</p>
            </div>
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
