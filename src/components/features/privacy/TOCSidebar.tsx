import { Search, Database, BarChart, Share2, Cookie, Shield, Lock } from "lucide-react";
import Link from "next/link";

export function TOCSidebar() {
  const links = [
    { href: "#data-we-collect", icon: Database, label: "1. Data We Collect", active: true },
    { href: "#how-we-use", icon: BarChart, label: "2. How We Use Data" },
    { href: "#sharing", icon: Share2, label: "3. Sharing Information" },
    { href: "#cookies", icon: Cookie, label: "4. Cookies & Tracking" },
    { href: "#rights", icon: Shield, label: "5. Your Privacy Rights" },
    { href: "#security", icon: Lock, label: "6. Data Security" },
  ];

  return (
    <div className="sticky top-24 w-full lg:w-72 flex-shrink-0 max-h-[calc(100vh-7rem)] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-[#101418] dark:text-white text-base font-bold">Contents</h3>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-background-dark border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 text-[#101418] dark:text-white outline-none placeholder:text-slate-400"
            placeholder="Search..."
            type="text"
          />
        </div>
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                link.active
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-[#101418] dark:hover:text-white"
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span className={`text-sm ${link.active ? "font-bold" : "font-medium"}`}>
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <button className="w-full py-2.5 bg-[#101418] dark:bg-white hover:opacity-90 transition-opacity text-white dark:text-[#101418] rounded-lg text-sm font-bold shadow-lg">
            Contact Privacy Team
          </button>
        </div>
      </div>
    </div>
  );
}
