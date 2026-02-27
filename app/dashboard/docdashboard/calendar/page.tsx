"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ─────────────────── Types ─────────────────── */

type BadgeColor = "purple" | "green" | "orange";

interface DayAppointment {
    id: string;
    color: BadgeColor;
}

interface UpcomingAppointment {
    title: string;
    time: string;
    date: string;
}

/* ─────────────────── Sample Data ─────────────────── */

// Generate sample appointment badges for a given month
function getAppointmentsForMonth(year: number, month: number): Record<number, DayAppointment[]> {
    const data: Record<number, DayAppointment[]> = {};
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Pseudo-random seed based on year and month for consistent data
    const seed = year * 100 + month;

    for (let day = 1; day <= daysInMonth; day++) {
        const hash = ((seed * 31 + day * 17) % 100);
        if (hash < 65) { // ~65% of days have appointments
            const count = (hash % 3) + 1; // 1-3 badges
            const colors: BadgeColor[] = ["purple", "green", "orange"];
            const badges: DayAppointment[] = [];
            for (let i = 0; i < count; i++) {
                const colorIdx = ((hash + i * 7) % 3);
                badges.push({
                    id: `${day}-${i}`,
                    color: colors[colorIdx],
                });
            }
            data[day] = badges;
        }
    }

    return data;
}

const upcomingToday: UpcomingAppointment[] = [
    { title: "Sit at clinic 1", time: "10:00am - 11:00am", date: "Nov 01, 2022" },
    { title: "Sit at clinic 2", time: "10:00am - 11:00am", date: "Nov 01, 2022" },
    { title: "Sit at clinic 3", time: "10:00am - 11:00am", date: "Nov 01, 2022" },
];

const upcomingTomorrow: UpcomingAppointment[] = [
    { title: "Sit at clinic 1", time: "10:00am - 11:00am", date: "Nov 01, 2022" },
    { title: "Sit at clinic 2", time: "10:00am - 11:00am", date: "Nov 01, 2022" },
    { title: "Sit at clinic 3", time: "10:00am - 11:00am", date: "Nov 01, 2022" },
];

/* ─────────────────── Helper ─────────────────── */

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const DAY_HEADERS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getCalendarGrid(year: number, month: number) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // getDay(): 0=Sunday … 6=Saturday  → convert to Mon=0 … Sun=6
    let startDow = firstDay.getDay() - 1;
    if (startDow < 0) startDow = 6;

    // Previous month trailing days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevDays: { day: number; current: boolean }[] = [];
    for (let i = startDow - 1; i >= 0; i--) {
        prevDays.push({ day: prevMonthLastDay - i, current: false });
    }

    // Current month days
    const currentDays: { day: number; current: boolean }[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
        currentDays.push({ day: i, current: true });
    }

    // Next month leading days to fill last row(s)
    const totalCells = prevDays.length + currentDays.length;
    const rows = Math.ceil(totalCells / 7);
    const nextDaysCount = rows * 7 - totalCells;
    const nextDays: { day: number; current: boolean }[] = [];
    for (let i = 1; i <= nextDaysCount; i++) {
        nextDays.push({ day: i, current: false });
    }

    return [...prevDays, ...currentDays, ...nextDays];
}

/* ─────────────────── Badge Colors ─────────────────── */

const badgeStyles: Record<BadgeColor, string> = {
    purple: "bg-primary text-white",
    green: "bg-emerald-500 text-white",
    orange: "bg-amber-500 text-white",
};

/* ─────────────────── Components ─────────────────── */

function AppointmentBadge({ badge }: { badge: DayAppointment }) {
    // Extract the numeric id portion (e.g. "5-0" → display "01", "5-1" → "02" etc.)
    const num = parseInt(badge.id.split("-")[1]) + 1;
    const label = num.toString().padStart(2, "0");

    return (
        <span
            className={`inline-flex items-center justify-center text-[8px] sm:text-[10px] font-bold rounded px-1 sm:px-1.5 py-0.5 leading-none ${badgeStyles[badge.color]}`}
        >
            {label}
        </span>
    );
}

function UpcomingCard({ appointment }: { appointment: UpcomingAppointment }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
                <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{appointment.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{appointment.time}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{appointment.date}</span>
            </div>
        </div>
    );
}

/* ─────────────────── Main Page ─────────────────── */

export default function CalendarPage() {
    const [year, setYear] = useState(2022);
    const [month, setMonth] = useState(10); // November (0-indexed)

    const grid = useMemo(() => getCalendarGrid(year, month), [year, month]);
    const appointments = useMemo(() => getAppointmentsForMonth(year, month), [year, month]);

    const goToPrevMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const goToNextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    return (
        <div className="p-3 sm:p-4 md:p-6 min-h-screen bg-slate-50">
            <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
                {/* ── Calendar Grid ── */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-5 md:p-6">
                    {/* Month Header */}
                    <div className="flex items-center justify-between mb-3 sm:mb-5">
                        <h2 className="text-base sm:text-lg font-bold text-gray-800">
                            {MONTH_NAMES[month]} {year}
                        </h2>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={goToPrevMonth}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                aria-label="Previous month"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={goToNextMonth}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                aria-label="Next month"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Day-of-week headers */}
                    <div className="grid grid-cols-7 border-b border-gray-100 pb-1.5 sm:pb-2 mb-1">
                        {DAY_HEADERS.map((d) => (
                            <div
                                key={d}
                                className="text-center text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wide"
                            >
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* Calendar body */}
                    <div className="grid grid-cols-7">
                        {grid.map((cell, idx) => {
                            const dayAppointments = cell.current ? (appointments[cell.day] || []) : [];

                            return (
                                <div
                                    key={idx}
                                    className={`
                                        relative min-h-[60px] sm:min-h-[75px] md:min-h-[95px] border-b border-r border-gray-50 p-1 sm:p-1.5 md:p-2
                                        ${idx % 7 === 0 ? "border-l border-gray-50" : ""}
                                        ${!cell.current ? "bg-gray-50/50" : "hover:bg-purple-50/30"}
                                        transition-colors duration-150
                                    `}
                                >
                                    {/* Day number */}
                                    <span
                                        className={`text-[10px] sm:text-xs md:text-sm font-medium ${cell.current ? "text-gray-700" : "text-gray-300"
                                            }`}
                                    >
                                        {cell.day.toString().padStart(2, "0")}
                                    </span>

                                    {/* Badges */}
                                    {dayAppointments.length > 0 && (
                                        <div className="flex flex-wrap gap-0.5 mt-1 sm:mt-2">
                                            {dayAppointments.map((badge) => (
                                                <AppointmentBadge key={badge.id} badge={badge} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Upcoming Panel ── */}
                <div className="w-full xl:w-[280px] 2xl:w-[300px] flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 sticky top-20">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-5">Upcoming</h3>

                        {/* Today */}
                        <div className="mb-5">
                            <p className="text-sm font-semibold text-gray-600 mb-3">Today</p>
                            <div className="space-y-2.5">
                                {upcomingToday.map((appt, i) => (
                                    <UpcomingCard key={`today-${i}`} appointment={appt} />
                                ))}
                            </div>
                        </div>

                        {/* Tomorrow */}
                        <div>
                            <p className="text-sm font-semibold text-gray-600 mb-3">Tomorrow</p>
                            <div className="space-y-2.5">
                                {upcomingTomorrow.map((appt, i) => (
                                    <UpcomingCard key={`tomorrow-${i}`} appointment={appt} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
