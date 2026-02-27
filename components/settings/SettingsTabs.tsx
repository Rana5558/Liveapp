import React from "react";

interface Tab {
  label: string;
  value: string;
}

interface SettingsTabsProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function SettingsTabs({ tabs, activeTab, setActiveTab }: SettingsTabsProps) {
  return (
    <div className="flex gap-8 border-b border-[#44444A] mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`relative pb-3 text-base font-medium transition-all duration-150 ${
            activeTab === tab.value
              ? "text-white after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-[#A78BFA]"
              : "text-[#A1A1AA] hover:text-white"
          }`}
          onClick={() => setActiveTab(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
