"use client";

import React from 'react';
import DoctorSidebar from '@/components/doctor/Sidebar';
import PatientSidebar from '@/components/patient/Sidebar';
import Header from '@/components/doctor/Header';
import PatientHeader from '@/components/patient/Header';
import { PatientSidebarProvider } from '@/lib/contexts/PatientSidebarContext';
import { DoctorSidebarProvider } from '@/lib/contexts/DoctorSidebarContext';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { user } = useAppSelector((state) => state.auth);

    // In a real app, you might still want a loading check if user is null but token exists
    // for initial mounting state while Redux hydrates.
    const isDoctor = user?.role === 'doctor';
    const SidebarComponent = isDoctor ? DoctorSidebar : PatientSidebar;
    const HeaderComponent = isDoctor ? Header : PatientHeader;

    const layoutContent = (
        <div className="flex min-h-screen bg-slate-50">
            {isDoctor ? (
                <DoctorSidebarProvider>
                    <SidebarComponent />
                    <div className="flex-1 flex flex-col min-w-0">
                        <HeaderComponent />
                        <main className="flex-1 overflow-y-auto bg-slate-50">
                            {children}
                        </main>
                    </div>
                </DoctorSidebarProvider>
            ) : (
                <PatientSidebarProvider>
                    <SidebarComponent />
                    <div className="flex-1 flex flex-col min-w-0">
                        <HeaderComponent />
                        <main className="flex-1 overflow-y-auto bg-neutral-900 pb-6 md:pb-0">
                            {children}
                        </main>
                    </div>
                </PatientSidebarProvider>
            )}
        </div>
    );


    return layoutContent;
}
