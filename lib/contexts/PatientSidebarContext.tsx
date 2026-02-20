"use client";

import React, { createContext, useContext, useState } from "react";

type PatientSidebarContextType = {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
};

const PatientSidebarContext = createContext<PatientSidebarContextType | null>(null);

export function PatientSidebarProvider({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <PatientSidebarContext.Provider value={{ mobileOpen, setMobileOpen, collapsed, setCollapsed }}>
      {children}
    </PatientSidebarContext.Provider>
  );
}

export function usePatientSidebar() {
  const ctx = useContext(PatientSidebarContext);
  if (!ctx) {
    // return a safe default to avoid crashing when provider is not used
    return {
      mobileOpen: false,
      setMobileOpen: (_: boolean) => {},
      collapsed: false,
      setCollapsed: (_: boolean) => {},
    };
  }
  return ctx;
}

export default PatientSidebarContext;
