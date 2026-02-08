"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { useUser, getAvatarUrl } from "@/hooks/useUser";
import { useMatchStats } from "@/hooks/useMatches";

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { isCollapsed, isHovered, setIsHovered, toggle, closeMobile } = useSidebar();
  const { user, isLoading } = useUser();
  const { activeCount, unreadMessagesCount } = useMatchStats();

  // Generate nav items with dynamic badge
  const navItems = [
    { label: "Discover", href: "/discover", icon: "explore" },
    { label: "Matches", href: "/matches", icon: "favorite", badge: activeCount > 0 ? activeCount : undefined },
    { label: "Messages", href: "/messages", icon: "chat_bubble", badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined },
    { label: "Profile", href: "/profile", icon: "person" },
    { label: "Premium", href: "/premium", icon: "workspace_premium", isPremium: true },
  ];

  // Determine if sidebar should show expanded view
  const isExpanded = !isCollapsed || isHovered;

  return (
    <aside
      className={cn(
        "flex flex-col bg-surface-light dark:bg-surface-dark border-r border-[#e5e7eb] dark:border-gray-800 shrink-0 z-20 h-full transition-all duration-300 relative",
        isExpanded ? "w-64" : "w-20",
        className
      )}
      onMouseEnter={() => isCollapsed && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Collapse Toggle Button - Desktop Only */}
      <button
        onClick={toggle}
        className={cn(
          "absolute -right-3 top-8 size-6 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-full hidden lg:flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-all z-30 shadow-sm",
          "hover:scale-110"
        )}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <span className={cn(
          "material-symbols-outlined text-[16px] text-gray-500 transition-transform duration-300",
          isCollapsed && "rotate-180"
        )}>
          chevron_left
        </span>
      </button>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobile}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors group relative",
                isExpanded ? "lg:px-4" : "justify-center",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
              title={!isExpanded ? item.label : undefined}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary rounded-r-full"></span>
              )}

              <span
                className={cn(
                  "material-symbols-outlined text-[24px] transition-colors",
                  isActive ? "icon-filled" : "group-hover:text-primary"
                )}
              >
                {item.icon}
              </span>

              {isExpanded && (
                <>
                  <span className={cn(
                    "font-bold text-sm block whitespace-nowrap",
                    !isActive && "font-medium"
                  )}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className={cn(
                      "flex ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md",
                      isActive
                        ? "bg-pink-500 text-white"
                        : "bg-pink-500 text-white"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}

              {/* Badge for collapsed state */}
              {!isExpanded && item.badge && (
                <span className="absolute top-2 right-2 size-2 bg-pink-500 rounded-full border-2 border-white dark:border-surface-dark"></span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-3 pb-6 space-y-2 mt-auto">
        {/* Premium Card - Only show when expanded */}
        {isExpanded && (
          <div className="block bg-gradient-to-br from-primary/10 to-pink-500/10 rounded-2xl p-4 mb-4 border border-primary/10">
            <p className="text-xs font-bold text-gray-900 dark:text-white mb-1">Go Premium ✨</p>
            <p className="text-[10px] text-gray-500 mb-2">See who likes you & more!</p>
            <Link href="/premium" className="block w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold py-2 rounded-lg hover:shadow-lg transition-all text-center">
              Upgrade
            </Link>
          </div>
        )}

        {/* Settings Link */}
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800",
            isExpanded ? "lg:px-4" : "justify-center",
            pathname.startsWith("/settings") && "bg-primary/10 text-primary"
          )}
          title={!isExpanded ? "Settings" : undefined}
        >
          <span className={cn(
            "material-symbols-outlined text-[24px]",
            pathname.startsWith("/settings") && "icon-filled"
          )}>settings</span>
          {isExpanded && (
            <span className="font-medium text-sm block whitespace-nowrap">Settings</span>
          )}
        </Link>

        {/* User Profile Section */}
        <div className={cn(
          "border-t border-slate-100 dark:border-slate-800 pt-3"
        )}>
          <Link
            href="/profile"
            className={cn(
              "flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors",
              !isExpanded && "justify-center"
            )}
            title={!isExpanded ? user?.display_name || "Profile" : undefined}
          >
            {isLoading ? (
              <div className="size-9 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse shrink-0" />
            ) : (
              <div
                className="size-9 rounded-full bg-cover bg-center ring-2 ring-white dark:ring-slate-700 shrink-0"
                style={{ backgroundImage: `url('${getAvatarUrl(user?.avatar_url)}')` }}
              />
            )}
            {isExpanded && (
              <>
                <div className="flex flex-col min-w-0 block">
                  {isLoading ? (
                    <>
                      <div className="w-20 h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                      <div className="w-16 h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mt-1" />
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {user?.display_name || 'User'}
                      </p>
                      <p className="text-xs text-slate-500 font-medium truncate">
                        {user?.email ? `@${user.email.split('@')[0]}` : ''}
                      </p>
                    </>
                  )}
                </div>
                <span className="material-symbols-outlined ml-auto text-slate-400 text-lg block">
                  unfold_more
                </span>
              </>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
}
