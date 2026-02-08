'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUser, getAvatarUrl } from '@/hooks/useUser';

interface SettingsLayoutProps {
    children: React.ReactNode;
}

const SETTINGS_NAV = [
    { label: 'Account', icon: 'person', href: '/settings/account' },
    { label: 'Privacy', icon: 'lock', href: '/settings/privacy' },
    { label: 'Safety Center', icon: 'shield', href: '/settings' },
    { label: 'Notifications', icon: 'notifications', href: '/settings/notifications' },
    { label: 'Billing', icon: 'credit_card', href: '/settings/billing' },
];

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    const pathname = usePathname();
    const { user, isLoading } = useUser();

    const isActiveRoute = (href: string) => {
        if (href === '/settings') {
            return pathname === '/settings' || pathname === '/settings/safety';
        }
        return pathname === href || pathname.startsWith(href + '/');
    };

    // Get initials for avatar fallback
    const getInitials = () => {
        if (!user?.display_name) return '?';
        const names = user.display_name.split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[1][0]).toUpperCase();
        }
        return user.display_name.substring(0, 2).toUpperCase();
    };

    return (
        <div className="flex flex-col lg:flex-row h-full min-h-0 bg-[#f5f7f8] dark:bg-[#0f1923]">
            {/* Mobile Navigation */}
            <div className="lg:hidden bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800 overflow-x-auto no-scrollbar">
                <nav className="flex items-center p-2 gap-2 min-w-max">
                    {SETTINGS_NAV.map((item) => {
                        const isActive = isActiveRoute(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                                    isActive
                                        ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm"
                                        : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                )}
                            >
                                <span className={cn(
                                    "material-symbols-outlined text-[18px]",
                                    isActive && "icon-filled"
                                )}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Settings Sidebar (Desktop) */}
            <aside className="w-[280px] bg-surface-light dark:bg-surface-dark border-r border-gray-200 dark:border-gray-800 flex-shrink-0 hidden lg:flex flex-col">
                <div className="p-6 flex-1 overflow-y-auto">
                    {/* User Profile */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                        {isLoading ? (
                            <>
                                <div className="size-14 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                                <div className="flex-1">
                                    <div className="w-24 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                                    <div className="w-36 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                </div>
                            </>
                        ) : user?.avatar_url ? (
                            <>
                                <div className="relative">
                                    <div
                                        className="size-14 rounded-full bg-cover bg-center shadow-lg ring-2 ring-white dark:ring-gray-600"
                                        style={{ backgroundImage: `url('${getAvatarUrl(user.avatar_url)}')` }}
                                    />
                                    <div className="absolute -bottom-0.5 -right-0.5 size-4 bg-green-500 rounded-full border-2 border-white dark:border-surface-dark" title="Online" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 dark:text-white truncate">{user.display_name || 'User'}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="relative">
                                    <div className="size-14 rounded-full bg-gradient-to-br from-primary via-blue-400 to-amber-400 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-white dark:ring-gray-600">
                                        {getInitials()}
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 size-4 bg-green-500 rounded-full border-2 border-white dark:border-surface-dark" title="Online" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 dark:text-white truncate">{user?.display_name || 'User'}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email || ''}</p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1">
                        {SETTINGS_NAV.map((item) => {
                            const isActive = isActiveRoute(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                        isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                                    )}
                                >
                                    <span className={cn(
                                        "material-symbols-outlined text-[20px]",
                                        isActive && "icon-filled"
                                    )}>
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Help Center Link */}
                <div className="p-6 border-t border-gray-100 dark:border-gray-800">
                    <Link
                        href="/help"
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">help</span>
                        Help Center
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                {children}
            </div>
        </div>
    );
}
