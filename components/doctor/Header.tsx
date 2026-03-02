"use client";

import React from 'react';
import {
    HelpCircle,
    ChevronDown,
    Zap,
    Menu,
    X
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useDoctorSidebar } from '@/lib/contexts/DoctorSidebarContext';
import { usePathname } from 'next/navigation';

const PATH_TITLES: Record<string, string> = {
    '/dashboard/docdashboard/home': 'Dashboard',
    '/dashboard/docdashboard/calendar': 'Calendar',
    '/dashboard/docdashboard/patients': 'Patient Records',
    '/dashboard/docdashboard/availability': 'My Availability',
    '/dashboard/docdashboard/profile': 'Profile',
};

export default function DoctorHeader({ title }: { title?: string }) {
    const { user } = useSelector((state: RootState) => state.auth);
    const { mobileOpen, setMobileOpen } = useDoctorSidebar();
    const pathname = usePathname();
    const pageTitle = title ?? PATH_TITLES[pathname] ?? 'Dashboard';

    return (
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 shadow-sm">
            {/* Left: Mobile Menu + Title */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="lg:hidden p-2 rounded-lg text-gray-400 hover:bg-slate-100 hover:text-slate-700 transition-all duration-200"
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
                <h1 className="text-xl font-bold text-gray-800">{pageTitle}</h1>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 md:gap-3">
                {/* Upgrade Button */}
                <button className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md shadow-primary/25 transition-all duration-200">
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    <span>Upgrade</span>
                </button>

                {/* Help */}
                <button className="p-2 text-gray-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200">
                    <HelpCircle className="w-5 h-5" />
                </button>

                {/* Divider */}
                <div className="h-6 w-px bg-gray-200 hidden sm:block" />

                {/* User Avatar */}
                <div className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-xl border border-transparent hover:bg-slate-100 hover:border-slate-200 transition-all duration-200">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Doctor"
                            alt="Doctor profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="hidden sm:flex items-center gap-1">
                        <span className="font-semibold text-sm text-gray-700">{user?.name || "Maya Sinclair"}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                </div>
            </div>
        </header>
    );
}
