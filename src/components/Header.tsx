"use client";

import { Users, Bell, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NAV_LINKS = [
    { label: "Safety", href: "/safety" },
    { label: "Stories", href: "/blog" },
    { label: "Help Center", href: "/help" },
  ];

  return (
    <header className="w-full px-4 sm:px-10 py-4 z-50 fixed top-0 left-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-all">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <Users className="w-9 h-9" />
          <h2 className="text-[#101418] dark:text-white text-2xl font-bold tracking-tight">ConnectHub</h2>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <nav className="flex items-center gap-8 mr-4">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <Link href="/login">
              <button className="flex items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-white/80 backdrop-blur-sm dark:bg-slate-800 dark:text-white text-primary text-sm font-bold border border-primary/20 hover:bg-primary/5 transition-colors cursor-pointer shadow-sm">
                <span className="truncate">Log In</span>
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="flex items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary text-white text-sm font-bold hover:bg-blue-700 transition-colors cursor-pointer shadow-md shadow-blue-500/20">
                <span className="truncate">Join Now</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 shadow-lg py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-base font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors py-2 border-b border-slate-100 dark:border-slate-800/50 last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 mt-2">
            <Link href="/login" className="w-full">
              <Button variant="outline" className="w-full justify-center">Log In</Button>
            </Link>
            <Link href="/sign-up" className="w-full">
              <Button variant="default" className="w-full justify-center">Join Now</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
