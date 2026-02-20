"use client";

import React from "react";
import { useDoctorSidebar } from '@/lib/contexts/DoctorSidebarContext';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Calendar,
    Users,
    Clock,
    User,
    MessageSquare,
    UserPlus,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/features/auth/authSlice";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/docdashboard/home" },
    { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
    { icon: Users, label: "Patient Records", href: "/dashboard/patients" },
    { icon: Clock, label: "My Availability", href: "/dashboard/availability" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
];

const bottomItems = [
    { icon: MessageSquare, label: "Feedback", href: "/dashboard/feedback" },
    { icon: UserPlus, label: "Invite People", href: "/dashboard/invite" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
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
        {/* Mobile overlay */}
        {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

        <aside className={cn("fixed lg:sticky top-0 left-0 z-50 h-screen transition-all duration-300 bg-white border-r border-neutral-100 flex flex-col", collapsed ? 'w-[80px]' : 'w-64', mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')}>
            {/* Logo */}
            <div className="p-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                    LiVE
                </span>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-4 space-y-2">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "transition-all duration-200 flex items-center gap-3 px-4 py-3 rounded-xl",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                            )}
                        >
                            <item.icon
                                className={cn("w-5 h-5", isActive ? "text-white" : "text-neutral-400")}
                            />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="px-4 py-6 border-t border-neutral-100 space-y-2">
                {bottomItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="transition-all duration-200 flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                    >
                        <item.icon className="w-5 h-5 text-neutral-400" />
                        <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                ))}

                <button
                    onClick={handleLogout}
                    className="w-full transition-all duration-200 flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-500 hover:bg-red-50 hover:text-red-600"
                >
                    <LogOut className="w-5 h-5 text-neutral-400" />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
            {/* Collapse button (desktop) */}
            <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:flex absolute top-6 -right-3 bg-white text-black p-1.5 rounded-md shadow-md hover:scale-105 transition-all duration-300" aria-label={collapsed ? 'Expand' : 'Collapse'}>
                {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
        </aside>
        </>
    );
}
