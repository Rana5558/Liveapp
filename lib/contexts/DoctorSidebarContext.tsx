"use client";

import React, { createContext, useContext, useState } from "react";

type DoctorSidebarContextType = {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
};

const DoctorSidebarContext = createContext<DoctorSidebarContextType | null>(null);

export function DoctorSidebarProvider({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <DoctorSidebarContext.Provider value={{ mobileOpen, setMobileOpen, collapsed, setCollapsed }}>
      {children}
    </DoctorSidebarContext.Provider>
  );
}

export function useDoctorSidebar() {
  const ctx = useContext(DoctorSidebarContext);
  if (!ctx) {
    return {
      mobileOpen: false,
      setMobileOpen: (_: boolean) => {},
      collapsed: false,
      setCollapsed: (_: boolean) => {},
    };
  }
  return ctx;
}

export default DoctorSidebarContext;
