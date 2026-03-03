"use client";

import React from 'react';
import {
    Bell,
    HelpCircle,
    ChevronDown,
    Zap,
    Menu,
    X
} from 'lucide-react';
import { useAppSelector } from '@/lib/hooks';
import { usePatientSidebar } from '@/lib/contexts/PatientSidebarContext';

export default function PatientHeader({ title = "Chat With AI" }: { title?: string }) {
    const { user } = useAppSelector((state) => state.auth);
    const { setMobileOpen, mobileOpen } = usePatientSidebar();

    return (
        <header className="h-16 md:h-20 bg-gradient-to-b from-[#3a3a3a] to-[#2c2c2c] border-b border-neutral-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
            <div className="flex items-center gap-3">
                <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 mr-2 rounded-md bg-white text-black" aria-label="Toggle menu">
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                <h1 className="text-lg md:text-2xl font-bold text-white">{title}</h1>
            </div>

            <div className="flex items-center gap-4">
                <button className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-full font-medium shadow-lg shadow-primary/20 transition-all duration-200 group">
                    <Zap className="w-4 h-4 fill-white" />
                    <span className="hidden sm:inline">Upgrade</span>
                </button>

                <div className="hidden sm:flex items-center gap-4 border-l border-neutral-800 pl-4">
                    <button className="p-2 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded-lg transition-colors relative">
                        <HelpCircle className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded-lg transition-colors relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-neutral-900"></span>
                    </button>
                </div>

                <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-neutral-800 p-1.5 rounded-xl transition-colors">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 overflow-hidden border border-neutral-700">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Patient"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="hidden sm:flex items-center gap-1">
                        <span className="font-medium text-white">{user?.name || "Patient"}</span>
                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                    </div>
                </div>
            </div>
        </header>
    );
}
