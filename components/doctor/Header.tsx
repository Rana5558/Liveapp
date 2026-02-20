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
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useDoctorSidebar } from '@/lib/contexts/DoctorSidebarContext';


export default function Header({ title = "Dashboard" }: { title?: string }) {
    const { user } = useSelector((state: RootState) => state.auth);
    const { mobileOpen, setMobileOpen } = useDoctorSidebar();
    

    return (
        <header className="h-16 md:h-20 bg-white border-b border-neutral-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20 relative">
            <div className="flex items-center gap-4">
                <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 mr-2 rounded-md bg-white text-black" aria-label="Toggle menu">
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
                <h1 className="text-xl md:text-2xl font-bold text-neutral-900">{title}</h1>
            </div>

            <div className="flex items-center gap-6">
                {/* Upgrade Button */}
                <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-primary/20 transition-all duration-200 group">
                    <Zap className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                    <span>Upgrade</span>
                </button>

                {/* Utility Icons */}
                <div className="flex items-center gap-4 border-l border-neutral-100 pl-6">
                    <button className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors relative">
                        <HelpCircle className="w-6 h-6" />
                    </button>
                    <button className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors relative">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-neutral-50 p-1.5 rounded-xl transition-colors">
                    <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden border border-neutral-100">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maya"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-neutral-900">{user?.name || "Maya Sinclair"}</span>
                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                    </div>
                </div>
            </div>
        </header>
    );
}
