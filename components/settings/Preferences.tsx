"use client";

import React, { useState } from "react";
import { Bell, Globe } from "lucide-react";
import { toast } from "sonner";

export default function Preferences() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [sysLanguage, setSysLanguage] = useState("en");
  const [genLanguage, setGenLanguage] = useState("en");

  const languages = [
    { value: "en", label: "🇬🇧  English" },
    { value: "hi", label: "🇮🇳  Hindi" },
    { value: "es", label: "🇪🇸  Spanish" },
    { value: "fr", label: "🇫🇷  French" },
    { value: "de", label: "🇩🇪  German" },
  ];

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Notifications */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" />
          <h3 className="text-white font-bold text-base sm:text-lg">Notifications</h3>
        </div>

        {[
          { label: "Email Notifications", desc: "Receive important updates and alerts via email", state: emailNotifs, toggle: setEmailNotifs },
          { label: "Push Notifications", desc: "Get real-time in-app notifications", state: pushNotifs, toggle: setPushNotifs },
        ].map((item) => (
          <div key={item.label} className="flex items-start justify-between py-3 border-b border-neutral-800 last:border-0 gap-4">
            <div className="min-w-0">
              <p className="text-white text-sm font-medium">{item.label}</p>
              <p className="text-neutral-500 text-xs mt-0.5">{item.desc}</p>
            </div>
            <button
              onClick={() => item.toggle(!item.state)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${item.state ? "bg-primary" : "bg-neutral-700"}`}
              role="switch"
              aria-checked={item.state}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 ${item.state ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>
        ))}
      </div>

      {/* Language */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4 sm:space-y-5">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          <h3 className="text-white font-bold text-base sm:text-lg">Language</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-1.5">
            <label className="block text-neutral-400 text-sm font-medium">System Language</label>
            <select
              value={sysLanguage}
              onChange={(e) => setSysLanguage(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
            >
              {languages.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-neutral-400 text-sm font-medium">Generation Language</label>
            <select
              value={genLanguage}
              onChange={(e) => setGenLanguage(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
            >
              {languages.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>
        </div>
        <button
          onClick={() => toast.success("Preferences saved successfully!")}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-primary/20"
        >
          Save Preferences →
        </button>
      </div>
    </div>
  );
}
