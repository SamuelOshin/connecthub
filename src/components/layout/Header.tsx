"use client";

"use client";

import { PulseLogo } from "@/components/brand/PulseLogo";
import { UserDropdown } from "./UserDropdown";
import { useSidebar } from "@/hooks/useSidebar";

export function Header() {
  const { toggleMobile } = useSidebar();

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] dark:border-gray-800 bg-surface-light dark:bg-surface-dark px-6 py-3 z-30 shrink-0 relative h-16">
      <div className="flex items-center gap-3">
        <PulseLogo width={40} height={40} />
        <h2 className="text-xl leading-tight tracking-tight text-gray-900 dark:text-white hidden lg:block">
          <span className="font-bold text-primary">Connect</span>
          <span className="font-normal text-primary">Hub</span>
        </h2>
        <button
          className="lg:hidden p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          onClick={toggleMobile}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center justify-center rounded-full size-10 bg-[#f0f2f5] dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative">
          <span className="material-symbols-outlined text-gray-700 dark:text-gray-200" style={{ fontSize: '22px' }}>
            notifications
          </span>
          <span className="absolute top-2 right-2.5 size-2 bg-pink-500 rounded-full border border-white dark:border-gray-800"></span>
        </button>

        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block"></div>

        <UserDropdown />
      </div>
    </header>
  );
}
