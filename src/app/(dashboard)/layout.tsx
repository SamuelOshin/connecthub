"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider, useSidebar } from "@/hooks/useSidebar";
import { UserProvider } from "@/hooks/useUser";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <SidebarProvider>
        <DashboardContent>{children}</DashboardContent>
      </SidebarProvider>
    </UserProvider>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isMobileOpen, closeMobile } = useSidebar();

  return (
    <div className="h-screen flex flex-col bg-[#f5f7f8] dark:bg-[#0f1923]">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden lg:flex shrink-0" />

        {/* Mobile Sidebar Overlay */}
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={closeMobile}
            />
            {/* Sidebar */}
            <Sidebar className="relative z-10 w-64 h-full shadow-2xl" />
          </div>
        )}

        <main className="flex-1 overflow-y-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
