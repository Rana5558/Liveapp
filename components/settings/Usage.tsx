"use client";

import React from "react";
import { BarChart2, MessageCircle, Zap, CalendarDays } from "lucide-react";

const stats = [
  { label: "Total Conversations", value: "04", sub: "Last 7 days", icon: MessageCircle, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { label: "Credits Used", value: "0", sub: "Last 7 days", icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  { label: "Active Days", value: "16%", sub: "Last 7 days", icon: CalendarDays, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
];

const barData = [40, 70, 30, 85, 55, 20, 65];
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Usage() {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Stats Cards — 1 col mobile, 3 col sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-5 flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${stat.bg}`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-neutral-400 text-xs font-medium">{stat.label}</p>
                <p className="text-white text-2xl font-bold mt-0.5">{stat.value}</p>
                <p className="text-neutral-600 text-xs mt-0.5">{stat.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-primary" />
          <h3 className="text-white font-bold text-sm sm:text-base">Daily Conversations — Last 7 Days</h3>
        </div>

        <div className="flex items-end gap-2 sm:gap-3 h-32 sm:h-40 px-1 sm:px-2">
          {barData.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                style={{ height: `${val}%` }}
                className="w-full bg-primary/70 hover:bg-primary rounded-t-lg transition-all duration-300 cursor-pointer"
                title={`${val} conversations`}
              />
              <span className="text-neutral-600 text-[9px] sm:text-[10px] font-medium">{dayLabels[i]}</span>
            </div>
          ))}
        </div>

        <p className="text-neutral-600 text-xs text-center pt-1 border-t border-neutral-800">
          Based on your usage history from Feb 17 – Feb 24, 2026
        </p>
      </div>
    </div>
  );
}
