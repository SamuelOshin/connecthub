"use client";

import { Compass, Heart, MessageCircle, User, Settings, Zap, PanelLeftClose, PanelLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/useSidebar";

const NAV_ITEMS = [
  { label: "Discover", href: "/discover", icon: Compass },
  { label: "Matches", href: "/matches", icon: Heart, badge: 3 },
  { label: "Messages", href: "/messages", icon: MessageCircle },
  { label: "Profile", href: "/profile", icon: User },
];

const USER = {
  name: "Alex Johnson",
  handle: "@alex_j",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
};

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { isCollapsed, isHovered, setIsHovered, toggle } = useSidebar();
  
  // Determine if sidebar should show expanded view
  const isExpanded = !isCollapsed || isHovered;

  return (
    <nav 
      className={cn(
        "flex flex-col h-full bg-white dark:bg-[#1a242f] border-r border-slate-200 dark:border-slate-800 z-20 shadow-sm",
        isExpanded ? "w-64" : "w-[72px]",
        // Only animate when toggling collapse state, not on hover
        !isHovered && "transition-all duration-300 ease-in-out",
        className
      )}
      onMouseEnter={() => isCollapsed && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Collapse Toggle Button */}
      <div className={cn("p-3 flex", isExpanded ? "justify-end" : "justify-center")}>
        <button
          onClick={toggle}
          className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 flex items-center justify-center transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeft className="w-5 h-5" />
          ) : (
            <PanelLeftClose className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="px-3 flex flex-col gap-2 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative",
                isExpanded ? "" : "justify-center",
                isActive 
                  ? "bg-primary text-white shadow-md shadow-blue-500/20" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary"
              )}
              title={!isExpanded ? item.label : undefined}
            >
              <Icon 
                className={cn(
                  "w-6 h-6 transition-transform shrink-0",
                  !isActive && "group-hover:scale-110"
                )} 
                fill={isActive && item.label === "Matches" ? "currentColor" : "none"}
              />
              {isExpanded && (
                <>
                  <span className={cn("text-sm font-bold whitespace-nowrap", !isActive && "font-medium")}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className={cn(
                      "ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full",
                      isActive ? "bg-white/20 text-white" : "bg-red-500 text-white"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {/* Badge for collapsed state */}
              {!isExpanded && item.badge && (
                <span className="absolute -top-1 -right-1 text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-3 mt-auto space-y-3">
        {/* Premium Card - Only show when expanded */}
        {isExpanded && (
          <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl p-4 border border-primary/10 relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-xl -mr-8 -mt-8"></div>
            <p className="text-xs font-bold text-slate-900 dark:text-white mb-1 relative z-10 flex items-center gap-1">
              Go Premium <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            </p>
            <p className="text-[10px] text-slate-500 mb-2 relative z-10">See who likes you & more!</p>
            <Button className="w-full h-9 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg hover:shadow-lg transition-all relative z-10">
              Upgrade
            </Button>
          </div>
        )}

        {/* Collapsed Premium Icon */}
        {!isExpanded && (
          <div className="flex justify-center">
            <button 
              className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center hover:shadow-md transition-all"
              title="Go Premium"
            >
              <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            </button>
          </div>
        )}

        <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
          <div className={cn(
            "flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors",
            !isExpanded && "justify-center"
          )}>
            <div 
              className="h-9 w-9 rounded-full bg-cover bg-center ring-2 ring-white dark:ring-slate-700 shrink-0" 
              style={{ backgroundImage: `url('${USER.avatar}')` }}
            />
            {isExpanded && (
              <>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{USER.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{USER.handle}</p>
                </div>
                <Settings className="ml-auto w-5 h-5 text-slate-400" />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
