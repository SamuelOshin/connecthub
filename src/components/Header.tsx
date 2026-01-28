import { Users, Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "./Button";

export function Header() {
  return (
    <header className="w-full px-4 sm:px-10 py-4 z-50 fixed top-0 left-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-all">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Users className="w-9 h-9" />
          <h2 className="text-[#101418] dark:text-white text-2xl font-bold tracking-tight">ConnectHub</h2>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-8 mr-4">
            {["Safety", "Stories", "Help Center"].map((item) => (
              <Link
                key={item}
                href={item === "Safety" ? "/safety" : "#"}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <Button variant="outline" size="sm">Log In</Button>
            <Button variant="primary" size="sm">Join Now</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
