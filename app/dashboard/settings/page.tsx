"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { User, Sliders, BarChart2, CreditCard } from "lucide-react";

const ProfileDetails = dynamic(() => import("@/components/settings/ProfileDetails"), { ssr: false });
const Preferences = dynamic(() => import("@/components/settings/Preferences"), { ssr: false });
const Usage = dynamic(() => import("@/components/settings/Usage"), { ssr: false });
const PlanBilling = dynamic(() => import("@/components/settings/PlanBilling"), { ssr: false });

const tabs = [
  { label: "Profile", value: "profile", icon: User },
  { label: "Preferences", value: "preferences", icon: Sliders },
  { label: "Usage", value: "usage", icon: BarChart2 },
  { label: "Plan & Billing", value: "plan", icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 space-y-5 sm:space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Settings</h1>
        <p className="text-neutral-400 text-sm sm:text-base">Manage your account, preferences, and billing</p>
      </div>

      {/* Tab Navigation — scrollable on mobile */}
      <div className="overflow-x-auto pb-0.5 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-xl p-1 w-max sm:w-fit min-w-full sm:min-w-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap ${activeTab === tab.value
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                  }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "profile" && <ProfileDetails />}
        {activeTab === "preferences" && <Preferences />}
        {activeTab === "usage" && <Usage />}
        {activeTab === "plan" && <PlanBilling />}
      </div>
    </div>
  );
}
