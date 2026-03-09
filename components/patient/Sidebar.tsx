"use client";

import React from "react";
import { usePatientSidebar } from '@/lib/contexts/PatientSidebarContext';
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  MessageCircle,
  FileText,
  Calendar,
  TrendingUp,
  Clock,
  MessageSquare,
  UserPlus,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: MessageCircle, label: "Chat With AI", href: "/dashboard/home" },
  { icon: FileText, label: "Documents", href: "/dashboard/documents" },
  { icon: Calendar, label: "My Appointments", href: "/dashboard/appointments" },
  { icon: TrendingUp, label: "Trending Prompt", href: "/dashboard/trending" },
  { icon: Clock, label: "Chat History", href: "/dashboard/chat-history" },
];

const bottomItems = [
  { icon: MessageSquare, label: "Feedback", href: "/dashboard/feedback" },
  { icon: UserPlus, label: "Invite People", href: "/dashboard/invite" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function PatientSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { mobileOpen, setMobileOpen, collapsed, setCollapsed } = usePatientSidebar();

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="mobile-nav-sidebar"
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen transition-all duration-300",
          collapsed ? "w-[80px]" : "w-[260px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        role="navigation"
        aria-label="Sidebar navigation"
      >
        <div className="h-full bg-gradient-to-b from-[#3a3a3a] to-[#2c2c2c] text-white p-4 flex flex-col relative">

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden absolute top-4 right-4 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>

          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/images/mainlogo2.png"
              alt="Logo"
              width={collapsed ? 34 : 70}
              height={40}
              className="transition-all duration-300"
            />
          </div>

          {/* Main Navigation */}
          <nav
            className={cn(
              "flex-1 flex flex-col",
              collapsed ? "items-center gap-6" : "gap-2"
            )}
          >
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "transition-all duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-primary",
                    collapsed
                      ? "justify-center w-12 h-12 rounded-xl"
                      : "gap-3 px-4 py-3 rounded-full",
                    isActive
                      ? collapsed
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : "bg-white text-black"
                      : "text-gray-300 hover:bg-white/10"
                  )}
                >
                  <item.icon
                    size={20}
                    className={cn(
                      isActive && !collapsed ? "text-purple-600" : ""
                    )}
                  />

                  {!collapsed && (
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isActive ? "text-black" : "text-gray-300"
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div
            className={cn(
              "mt-auto flex flex-col",
              collapsed ? "items-center gap-6" : "gap-2"
            )}
          >
            {bottomItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "transition-all duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-primary",
                    collapsed
                      ? "justify-center w-10 h-10 rounded-xl"
                      : "gap-3 px-4 py-3 rounded-full",
                    isActive
                      ? collapsed
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : "bg-white text-black"
                      : "text-gray-300 hover:bg-white/10"
                  )}
                >
                  <item.icon
                    size={18}
                    className={cn(
                      isActive && !collapsed ? "text-purple-600" : ""
                    )}
                  />

                  {!collapsed && (
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isActive ? "text-black" : "text-gray-300"
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Doctor Button */}
            <Link
              href="/auth/login"
              className={cn(
                "flex items-center justify-center mt-4 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-700 focus:ring-primary",
                collapsed
                  ? "w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500"
                  : "w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              )}
              aria-label="Switch to doctor mode"
            >
              <Sparkles size={18} />
              {!collapsed && (
                <span className="ml-2 text-sm font-medium">
                  Im a Doctor
                </span>
              )}
            </Link>
          </div>

          {/* Collapse Button: visible on tablet+ (md+) only; mobile uses header hamburger */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex absolute top-6 -right-3 bg-white text-black p-1.5 rounded-md shadow-md hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
          >
            {collapsed ? (
              <ChevronRight size={14} />
            ) : (
              <ChevronLeft size={14} />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
