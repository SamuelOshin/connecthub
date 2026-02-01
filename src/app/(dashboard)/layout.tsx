"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/hooks/useSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="h-screen flex flex-col bg-[#f5f7f8] dark:bg-[#0f1923] overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar className="hidden md:flex shrink-0" />
          <main className="flex-1 overflow-hidden flex flex-col relative min-w-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
