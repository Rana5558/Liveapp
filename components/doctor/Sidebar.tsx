"use client";

import React from "react";
import { useDoctorSidebar } from '@/lib/contexts/DoctorSidebarContext';
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    Calendar,
    Settings,
    ChevronLeft,
    ChevronRight,
    Users,
    LayoutDashboard,
    User,
    Clock,
    MessageSquare,
    UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/docdashboard/home" },
    { icon: Calendar, label: "Calendar", href: "/dashboard/docdashboard/calendar" },
    { icon: Users, label: "Patient Records", href: "/dashboard/docdashboard/patients" },
    { icon: Clock, label: "My Availability", href: "/dashboard/docdashboard/availability" },
    { icon: User, label: "Profile", href: "/dashboard/docdashboard/profile" },
];

const bottomItems = [
    { icon: MessageSquare, label: "Feedback", href: "/dashboard/feedback" },
    { icon: UserPlus, label: "Invite People", href: "/dashboard/invite" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DoctorSidebar() {
    const pathname = usePathname();
    const { mobileOpen, setMobileOpen, collapsed, setCollapsed } = useDoctorSidebar();

    return (
        <>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}



            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed lg:sticky top-0 left-0 z-50 h-screen transition-all duration-300 bg-white border-r border-gray-100 flex flex-col shadow-sm",
                    collapsed ? "w-[72px]" : "w-[240px]",
                    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Logo */}
                <div className="flex items-center justify-center py-5 px-4 border-b border-gray-100">
                    <Image
                        src="/images/mainlogo.png"
                        alt="Live App Logo"
                        width={collapsed ? 32 : 64}
                        height={40}
                        className="transition-all duration-300 object-contain"
                    />
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                title={collapsed ? item.label : undefined}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "transition-all duration-150 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium",
                                    isActive
                                        ? "bg-primary text-white shadow-md shadow-primary/25"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                )}
                            >
                                <item.icon
                                    className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-white" : "text-gray-400")}
                                />
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Items */}
                <div className="px-3 py-4 border-t border-gray-100 space-y-1">
                    {bottomItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            title={collapsed ? item.label : undefined}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                                "transition-all duration-150 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium",
                                pathname === item.href
                                    ? "bg-primary text-white shadow-md shadow-primary/25"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 flex-shrink-0", pathname === item.href ? "text-white" : "text-gray-400")} />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </div>

                {/* Collapse button (desktop only) */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden lg:flex absolute top-6 -right-3 bg-white text-gray-500 p-1 rounded-md shadow-md hover:scale-105 transition-all duration-200 border border-gray-200"
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
                </button>
            </aside>
        </>
    );
}
