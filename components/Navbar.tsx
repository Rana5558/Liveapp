"use client";
import Link from "next/link";
import { Activity, Menu, X } from "lucide-react"; // LIVE pulse icon
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open || !drawerRef.current) return;

    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent" role="navigation" aria-label="Primary">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-14 h-20 md:h-24">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-xl sm:text-2xl font-bold text-white tracking-widest flex items-center">
            L<Activity className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-0.5" />VE
          </div>
        </div>

        {/* Links & Buttons */}
        <div className="flex items-center gap-4">
          {/* Links (desktop) */}
          <div className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-gray-300">
            <Link href="#about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="#faq" className="hover:text-white transition-colors">
              FAQ's
            </Link>
            <Link href="#contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          {/* Buttons (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/patient-login"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-primary bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              Chat As Patient
            </Link>
            <Link
              href="/auth/login"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-primary rounded-lg hover:bg-violet-600 transition-colors shadow-[0_0_15px_rgba(139,92,246,0.3)] flex items-center justify-center"
            >
              I'm a Doctor
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md bg-white text-black"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            ref={drawerRef}
            id="mobile-nav-drawer"
            className="absolute right-0 top-0 w-64 h-full bg-neutral-900 p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <nav className="flex flex-col gap-4" role="navigation" aria-label="Mobile">
              <Link href="#about" className="text-white font-medium" onClick={() => setOpen(false)}>
                About
              </Link>
              <Link href="#faq" className="text-white font-medium" onClick={() => setOpen(false)}>
                FAQ's
              </Link>
              <Link href="#contact" className="text-white font-medium" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </nav>

            <div className="mt-6 flex flex-col gap-3">
              <Link href="/auth/patient-login" className="px-4 py-2 text-sm font-semibold text-primary bg-white rounded-lg text-center" onClick={() => setOpen(false)}>
                Chat As Patient
              </Link>
              <Link href="/auth/login" className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg text-center" onClick={() => setOpen(false)}>
                I'm a Doctor
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
