"use client";

import React, { useState } from "react";
import { Calendar, Clock, User, ChevronDown, Plus } from "lucide-react";

const appointments = [
    { id: 1, date: "Thu 15", time: "09:00am – 09:30am", name: "Dr. Stephine Claire", issue: "Fever", chatHistory: true, section: "May'23" },
    { id: 2, date: "Thu 15", time: "11:00am – 11:30am", name: "Dr. Arjun Mehta", issue: "Headache", chatHistory: false, section: "May'23" },
    { id: 3, date: "Fri 16", time: "02:00pm – 02:30pm", name: "Dr. Priya Nair", issue: "Back Pain", chatHistory: true, section: "May'23" },
    { id: 4, date: "Mon 02", time: "09:00am – 09:30am", name: "Dr. Stephine Claire", issue: "Follow-up", chatHistory: true, section: "June'23" },
    { id: 5, date: "Tue 03", time: "03:00pm – 03:30pm", name: "Dr. Arjun Mehta", issue: "Chest pain", chatHistory: false, section: "June'23" },
];

const sections = [
    { label: "May '23", value: "May'23" },
    { label: "June '23", value: "June'23" },
];

const tabs = [
    { label: "Upcoming", value: "upcoming" },
    { label: "Past", value: "past" },
    { label: "Cancelled", value: "cancelled" },
];

export default function AppointmentsPage() {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [activeMonth, setActiveMonth] = useState("May'23");

    const grouped = sections.map((section) => ({
        ...section,
        items: appointments.filter((a) => a.section === section.value),
    }));

    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 space-y-5 sm:space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Appointments</h1>
                    <p className="text-neutral-400 text-sm sm:text-base">Track and manage your upcoming and past appointments</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-primary/20 w-full sm:w-auto">
                    <Plus className="w-4 h-4" />
                    New Appointment
                </button>
            </div>

            {/* Tabs + Month Filter */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:justify-between">
                {/* Scrollable tabs on mobile */}
                <div className="flex gap-2 overflow-x-auto pb-1 w-full sm:w-auto scrollbar-none">
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={`flex-shrink-0 px-4 sm:px-5 py-2 rounded-xl font-semibold text-sm transition-all duration-150 ${activeTab === tab.value
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="relative self-end xs:self-auto">
                    <select
                        value={activeMonth}
                        onChange={(e) => setActiveMonth(e.target.value)}
                        className="appearance-none bg-neutral-900 border border-neutral-800 text-white text-sm rounded-xl px-4 py-2 pr-9 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                    >
                        {sections.map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                </div>
            </div>

            {/* Appointment Groups */}
            <div className="space-y-6">
                {grouped
                    .filter((g) => g.value === activeMonth)
                    .map((group) => (
                        <div key={group.value}>
                            <p className="text-neutral-400 text-xs font-semibold mb-3 uppercase tracking-widest">{group.label}</p>
                            <div className="space-y-3">
                                {group.items.map((apt) => (
                                    <div
                                        key={apt.id}
                                        className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-neutral-800 transition-colors"
                                    >
                                        {/* Top row on mobile: date box + action button */}
                                        <div className="flex items-center justify-between sm:contents">
                                            {/* Date Box */}
                                            <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                                                <span className="text-primary text-[10px] font-semibold uppercase">{apt.date.split(" ")[0]}</span>
                                                <span className="text-white text-xl font-bold leading-none">{apt.date.split(" ")[1]}</span>
                                            </div>

                                            {/* Action — shows on mobile top-right */}
                                            <button className="sm:hidden shrink-0 bg-white hover:bg-neutral-100 text-neutral-900 font-semibold px-4 py-1.5 rounded-xl shadow text-sm transition-colors flex items-center gap-1">
                                                Edit <ChevronDown className="w-3 h-3" />
                                            </button>
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2 text-neutral-400 text-sm">
                                                <Clock className="w-4 h-4 text-primary shrink-0" />
                                                <span>{apt.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-neutral-400 text-sm">
                                                <User className="w-4 h-4 text-primary shrink-0" />
                                                <span className="text-white font-medium">{apt.name}</span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 text-neutral-400 text-sm">
                                                <Calendar className="w-4 h-4 text-primary shrink-0" />
                                                <span>Issue: <span className="text-white">{apt.issue}</span></span>
                                                {apt.chatHistory && (
                                                    <a href="#" className="text-primary text-xs font-semibold hover:text-primary/80 underline-offset-2 hover:underline">
                                                        View Chat History →
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action — hidden on mobile, shown on sm+ */}
                                        <button className="hidden sm:flex shrink-0 bg-white hover:bg-neutral-100 text-neutral-900 font-semibold px-5 py-2 rounded-xl shadow text-sm transition-colors items-center gap-1">
                                            Edit <ChevronDown className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
