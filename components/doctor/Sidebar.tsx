"use client";

import React from "react";
import { useDoctorSidebar } from '@/lib/contexts/DoctorSidebarContext';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
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
    LogOut,
    Users,
    LayoutDashboard,
    User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/features/auth/authSlice";

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
    const router = useRouter();
    const dispatch = useDispatch();
    const { mobileOpen, setMobileOpen, collapsed, setCollapsed } = useDoctorSidebar();

    const handleLogout = () => {
        dispatch(logout());
        router.push("/");
    };

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
                className={cn(
                    "fixed lg:sticky top-0 left-0 z-50 h-screen transition-all duration-300 bg-neutral-800 border-r border-neutral-800 flex flex-col",
                    collapsed ? "w-[80px]" : "w-[260px]",
                    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
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

                {/* Nav */}
                <nav className="flex-1 px-2 py-2 space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "transition-all duration-150 flex items-center gap-3 px-4 py-3 rounded-xl",
                                    isActive
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                                )}
                            >
                                <item.icon
                                    className={cn("w-5 h-5", isActive ? "text-white" : "text-neutral-400")}
                                />
                                {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom */}
                <div className="px-2 py-4 border-t border-neutral-800 space-y-1">
                    {bottomItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="transition-all duration-150 flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:bg-neutral-900 hover:text-white"
                        >
                            <item.icon className="w-5 h-5 text-neutral-400" />
                            {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
                        </Link>
                    ))}

                    <button
                        onClick={handleLogout}
                        className="w-full transition-all duration-150 flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:bg-red-900 hover:text-red-400"
                    >
                        <LogOut className="w-5 h-5 text-neutral-400" />
                        {!collapsed && <span className="font-medium text-sm">Logout</span>}
                    </button>
                </div>

                {/* Collapse button (desktop) */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden lg:flex absolute top-6 -right-3 bg-neutral-950 text-white p-1.5 rounded-md shadow-md hover:scale-105 transition-all duration-300 border border-neutral-800"
                    aria-label={collapsed ? 'Expand' : 'Collapse'}
                >
                    {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </aside>
        </>
    );
}
