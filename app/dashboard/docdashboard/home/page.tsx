"use client";

import React, { useState } from "react";
import {
    MoreHorizontal,
    TrendingUp,
    TrendingDown,
    Calendar,
    Activity,
    BarChart2,
    ChevronRight,
    ChevronDown,
    User,
    Trash2,
    Edit,
    Phone,
} from "lucide-react";

/* ─── Sparkline SVG helpers ─── */
function OfflineSparkline() {
    return (
        <svg viewBox="0 0 120 50" className="w-28 h-12" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path
                d="M0 35 C15 20 25 10 35 25 C45 38 55 15 65 22 C80 30 90 8 120 18"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M0 35 C15 20 25 10 35 25 C45 38 55 15 65 22 C80 30 90 8 120 18 L120 50 L0 50 Z"
                fill="url(#gradBlue)"
            />
        </svg>
    );
}

function OnlineSparkline() {
    return (
        <svg viewBox="0 0 120 50" className="w-28 h-12" preserveAspectRatio="none">
            <defs>
                <linearGradient id="gradOrange" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb923c" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path
                d="M0 20 C10 30 20 38 35 28 C50 18 60 35 75 30 C90 25 105 38 120 28"
                fill="none"
                stroke="#f97316"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M0 20 C10 30 20 38 35 28 C50 18 60 35 75 30 C90 25 105 38 120 28 L120 50 L0 50 Z"
                fill="url(#gradOrange)"
            />
        </svg>
    );
}

function DonutChart() {
    const total = 197;
    const female = 110;
    const male = 87;
    const circumference = 2 * Math.PI * 38;
    const femaleArc = (female / total) * circumference;
    const maleArc = (male / total) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg width="90" height="90" viewBox="0 0 90 90">
                {/* Male (blue) */}
                <circle
                    cx="45" cy="45" r="38"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="10"
                    strokeDasharray={`${maleArc} ${circumference - maleArc}`}
                    strokeDashoffset={0}
                    transform="rotate(-90 45 45)"
                />
                {/* Female (red) */}
                <circle
                    cx="45" cy="45" r="38"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="10"
                    strokeDasharray={`${femaleArc} ${circumference - femaleArc}`}
                    strokeDashoffset={-maleArc}
                    transform="rotate(-90 45 45)"
                />
            </svg>
        </div>
    );
}

/* ─── Appointment types ─── */
type AppointmentStatus = "Ended" | "Ongoing" | "Upcoming" | "Cancelled";

interface Appointment {
    time: string;
    patient: string;
    status: AppointmentStatus;
    purpose?: string;
    expanded?: boolean;
    type?: "walk-in" | "online";
    isReport?: boolean;
}

const scheduleData: { hour: string; appointments: Appointment[] }[] = [
    {
        hour: "8:00",
        appointments: [
            { time: "08:00", patient: "Bolaji Abdulraheem", status: "Ended", type: "online" },
            { time: "08:30", patient: "Bolaji Abdulraheem", status: "Ended", type: "online" },
            { time: "08:30", patient: "Bolaji Abdulraheem", status: "Ongoing", purpose: "General check-up", expanded: true, type: "walk-in" },
        ],
    },
    {
        hour: "9:00",
        appointments: [
            { time: "09:00", patient: "Bolaji Abdulraheem", status: "Upcoming", type: "walk-in" },
            { time: "09:30", patient: "ERC Report", status: "Cancelled", isReport: true },
        ],
    },
    {
        hour: "10:00",
        appointments: [
            { time: "10:00", patient: "Bolaji Abdulraheem", status: "Upcoming", type: "online" },
            { time: "10:30", patient: "Bolaji Abdulraheem", status: "Upcoming", type: "online" },
        ],
    },
    {
        hour: "11:00",
        appointments: [
            { time: "11:00", patient: "Bolaji Abdulraheem", status: "Upcoming", type: "online" },
            { time: "11:30", patient: "Bolaji Abdulraheem", status: "Upcoming", type: "online" },
        ],
    },
];

const statusColor: Record<AppointmentStatus, string> = {
    Ended: "text-gray-400",
    Ongoing: "text-emerald-600 bg-emerald-50",
    Upcoming: "text-blue-500",
    Cancelled: "text-red-500 bg-red-50",
};

const statusDot: Record<AppointmentStatus, string> = {
    Ended: "bg-gray-300",
    Ongoing: "bg-emerald-500",
    Upcoming: "bg-blue-400",
    Cancelled: "bg-red-400",
};

export default function DoctorDashboardHome() {
    const [expandedAppt, setExpandedAppt] = useState<string | null>("08:30-ongoing");

    return (
        <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 min-h-screen bg-slate-50">

            {/* ── Top Stat Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {/* Offline Consultations */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                        <p className="text-gray-500 text-sm font-medium">Offline Consultations</p>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">101</p>
                            <div className="flex items-center gap-1 text-emerald-500 text-sm font-semibold">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>+3.11%</span>
                            </div>
                        </div>
                        <OfflineSparkline />
                    </div>
                </div>

                {/* Online Consultations */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                        <p className="text-gray-500 text-sm font-medium">Online Consultations</p>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">96</p>
                            <div className="flex items-center gap-1 text-red-500 text-sm font-semibold">
                                <TrendingDown className="w-3.5 h-3.5" />
                                <span>-20.9%</span>
                            </div>
                        </div>
                        <OnlineSparkline />
                    </div>
                </div>

                {/* Total Patients */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 sm:col-span-2 md:col-span-1">
                    <div className="flex items-start justify-between mb-3">
                        <p className="text-gray-500 text-sm font-medium">Total Patients</p>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-3xl sm:text-4xl font-bold text-gray-800">197</p>
                        <div className="flex items-center gap-3">
                            <DonutChart />
                            <div className="text-xs space-y-1">
                                <div className="flex items-center gap-1">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                                    <span className="text-gray-600 font-medium">110 Female</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                                    <span className="text-gray-600 font-medium">87 Male</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Middle Row: Schedule + Activity + Performance | Upcoming Schedule ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4">

                {/* Left 2/3: Schedule, Activity, Performance */}
                <div className="xl:col-span-2 space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">

                        {/* Today's Schedule */}
                        <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-primary/30 shadow-sm">
                            <div className="flex items-center gap-2 mb-1">
                                <Calendar className="w-4 h-4 text-blue-500" />
                                <h3 className="font-bold text-gray-800 text-sm">Today&apos;s Schedule</h3>
                            </div>
                            <p className="text-xs text-gray-400 mb-4">Your appointments for today</p>
                            <div className="space-y-2.5 mb-4">
                                {[
                                    { label: "Morning", count: "8 patients" },
                                    { label: "Afternoon", count: "12 patients" },
                                    { label: "Evening", count: "8 patients" },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between text-sm">
                                        <span className="text-gray-400">{item.label}</span>
                                        <span className="font-semibold text-gray-700">{item.count}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full border border-gray-200 rounded-lg py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                                View Full Schedule
                            </button>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-primary/30 shadow-sm">
                            <div className="flex items-center gap-2 mb-1">
                                <Activity className="w-4 h-4 text-emerald-500" />
                                <h3 className="font-bold text-gray-800 text-sm">Recent Activity</h3>
                            </div>
                            <p className="text-xs text-gray-400 mb-4">Latest patient updates</p>
                            <div className="space-y-3">
                                <div className="flex gap-2.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-gray-700">Lab results uploaded</p>
                                        <p className="text-xs text-gray-400">2 minutes ago</p>
                                    </div>
                                </div>
                                <div className="flex gap-2.5">
                                    <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-gray-700">Appointment rescheduled</p>
                                        <p className="text-xs text-gray-400">15 minutes ago</p>
                                    </div>
                                </div>
                                <div className="flex gap-2.5">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-gray-700">New patient registered</p>
                                        <p className="text-xs text-gray-400">1 hour ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Performance */}
                        <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-primary/30 shadow-sm">
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                                <h3 className="font-bold text-gray-800 text-sm">Performance</h3>
                            </div>
                            <p className="text-xs text-gray-400 mb-4">This month&apos;s metrics</p>
                            <div className="space-y-2.5 mb-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400 text-xs">Patient Satisfaction</span>
                                    <span className="font-bold text-primary text-xs">4.8/5.0</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400 text-xs">Attendance Rate</span>
                                    <span className="font-bold text-primary text-xs">94%</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400 text-xs">New Patients</span>
                                    <span className="font-bold text-emerald-500 text-xs">+18%</span>
                                </div>
                            </div>
                            <button className="w-full border border-gray-200 rounded-lg py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                                View Analytics
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right 1/3: Upcoming Schedule */}
                <div className="xl:col-span-1">
                    <UpcomingSchedule
                        expandedAppt={expandedAppt}
                        setExpandedAppt={setExpandedAppt}
                    />
                </div>
            </div>
        </div>
    );
}

/* ─── Upcoming Schedule Panel ─── */
function UpcomingSchedule({
    expandedAppt,
    setExpandedAppt,
}: {
    expandedAppt: string | null;
    setExpandedAppt: (key: string | null) => void;
}) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 text-sm">Upcoming schedule</h3>
            </div>

            {/* Timeline */}
            <div className="overflow-y-auto max-h-[520px] px-4 py-3 space-y-1">
                {scheduleData.map((block) => (
                    <div key={block.hour}>
                        {/* Hour marker */}
                        <div className="flex items-center gap-2 py-1">
                            <span className="text-xs font-semibold text-gray-400 w-8">{block.hour}</span>
                            <span className="w-2 h-2 rounded-full bg-gray-300 flex-shrink-0" />
                        </div>

                        {/* Appointments in this hour */}
                        <div className="ml-10 space-y-1.5">
                            {block.appointments.map((appt, i) => {
                                const key = `${appt.time}-${appt.status.toLowerCase()}-${i}`;
                                const isExpanded = expandedAppt === key;
                                const isOngoing = appt.status === "Ongoing";
                                const isCancelled = appt.status === "Cancelled";

                                return (
                                    <div key={key}>
                                        {/* Row */}
                                        <div
                                            className={`flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-colors ${isOngoing ? "bg-emerald-50 border border-emerald-200" : isCancelled ? "bg-red-50 border border-red-200" : "hover:bg-gray-50"}`}
                                            onClick={() =>
                                                isOngoing
                                                    ? setExpandedAppt(isExpanded ? null : key)
                                                    : null
                                            }
                                        >
                                            {/* Icon */}
                                            {appt.isReport ? (
                                                <BarChart2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                                            ) : (
                                                <User className={`w-4 h-4 flex-shrink-0 ${isOngoing ? "text-emerald-600" : isCancelled ? "text-red-400" : "text-blue-400"}`} />
                                            )}

                                            {/* Time + Name */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-1.5">
                                                    <span className={`text-xs font-bold ${isCancelled ? "text-red-500" : isOngoing ? "text-emerald-700" : "text-gray-600"}`}>
                                                        {appt.time}
                                                    </span>
                                                    <span className={`text-xs truncate ${isOngoing ? "text-emerald-700 font-semibold" : "text-gray-500"}`}>
                                                        {appt.patient}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Status badge */}
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isOngoing ? "bg-emerald-100 text-emerald-700" : isCancelled ? "bg-red-100 text-red-600" : "text-gray-400"}`}>
                                                {appt.status}
                                            </span>

                                            {/* Chevron for ongoing */}
                                            {isOngoing && (
                                                <ChevronDown className={`w-3.5 h-3.5 text-emerald-600 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                                            )}
                                            {!isOngoing && <ChevronRight className="w-3.5 h-3.5 text-gray-300" />}
                                        </div>

                                        {/* Expanded Ongoing Card */}
                                        {isOngoing && isExpanded && (
                                            <div className="mt-1 mb-2 mx-1 bg-white border border-emerald-200 rounded-xl p-3 shadow-sm space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 text-xs">
                                                            <span className="text-gray-400 w-14">Patient</span>
                                                            <span className="font-semibold text-gray-700">Bolaji Abdulraheem</span>
                                                            <User className="w-3.5 h-3.5 text-gray-400" />
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs">
                                                            <span className="text-gray-400 w-14">Time</span>
                                                            <span className="font-semibold text-gray-700">8:30 – 9:00</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs">
                                                            <span className="text-gray-400 w-14">Purpose</span>
                                                            <span className="font-semibold text-gray-700">General check-up</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Actions */}
                                                <div className="flex items-center gap-2 pt-1">
                                                    <button className="p-1.5 rounded-lg border border-gray-200 text-red-400 hover:bg-red-50 transition-colors">
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button className="p-1.5 rounded-lg border border-gray-200 text-blue-400 hover:bg-blue-50 transition-colors">
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors">
                                                        <Phone className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button className="ml-auto bg-primary hover:bg-primary/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm shadow-primary/25 transition-all">
                                                        Begin appointment
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* View all */}
                <div className="flex justify-end pt-2 pb-1">
                    <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                        View all <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}