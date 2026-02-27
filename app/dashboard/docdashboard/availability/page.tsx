"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";

/* ═══════════════════ TYPES ═══════════════════ */

type ClinicType = "Online" | "Clinic 1" | "Clinic 2" | "Clinic 4";

interface DayAvailability {
    clinic: ClinicType;
    slots: string[];
}

interface HolidayDay {
    label: string;
}

/* ═══════════════════ COLOUR MAP ═══════════════════ */

const clinicColor: Record<ClinicType, { text: string; bg: string; ring: string }> = {
    "Online": { text: "text-purple-600", bg: "bg-purple-600", ring: "ring-purple-500" },
    "Clinic 1": { text: "text-emerald-600", bg: "bg-emerald-600", ring: "ring-emerald-500" },
    "Clinic 2": { text: "text-rose-600", bg: "bg-rose-600", ring: "ring-rose-500" },
    "Clinic 4": { text: "text-blue-600", bg: "bg-blue-600", ring: "ring-blue-500" },
};

/* ═══════════════════ SAMPLE DATA ═══════════════════ */

// Horizontal timeline: which days are highlighted for each row
const timelineRows: { label: string; color: string; highlightedDays: number[] }[] = [
    {
        label: "Online",
        color: "bg-purple-600",
        highlightedDays: [2, 8, 14, 15, 16, 31],
    },
    {
        label: "Clinic 1",
        color: "bg-emerald-600",
        highlightedDays: [6, 19, 23],
    },
    {
        label: "Clinic 2",
        color: "bg-rose-600",
        highlightedDays: [3, 9, 11, 21],
    },
];

// Calendar cell data keyed by day
function generateAvailability(): Record<number, DayAvailability | HolidayDay> {
    const clinics: ClinicType[] = ["Online", "Clinic 1", "Clinic 2", "Clinic 4"];
    const defaultSlots = ["4:00-8:00 pm", "4:00-8:00 pm", "4:00-8:00 pm"];

    const data: Record<number, DayAvailability | HolidayDay> = {};

    // Pattern based on screenshot
    const pattern: Record<number, ClinicType | "Holiday"> = {
        1: "Online",
        2: "Clinic 1",
        3: "Clinic 2",
        4: "Clinic 4",
        5: "Online",
        6: "Clinic 2",
        7: "Online",
        8: "Clinic 1",
        9: "Holiday",
        10: "Online",
        11: "Clinic 1",
        12: "Online",
        13: "Clinic 2",
        14: "Online",
        15: "Clinic 2",
        16: "Clinic 1",
        17: "Clinic 1",
        18: "Online",
        19: "Holiday",
        20: "Online",
        21: "Clinic 2",
        22: "Clinic 1",
        23: "Online",
        24: "Clinic 1",
        25: "Clinic 2",
        26: "Clinic 1",
        27: "Online",
        28: "Online",
        29: "Clinic 1",
        30: "Clinic 2",
        31: "Online",
    };

    for (const [dayStr, type] of Object.entries(pattern)) {
        const day = parseInt(dayStr);
        if (type === "Holiday") {
            data[day] = { label: "Holiday" };
        } else {
            data[day] = { clinic: type, slots: [...defaultSlots] };
        }
    }

    return data;
}

const availabilityData = generateAvailability();

/* ═══════════════════ CALENDAR GRID HELPER ═══════════════════ */

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const DAY_HEADERS = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

function getCalendarGrid(year: number, month: number) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Sunday-start: getDay() already gives 0=Sun
    const startDow = firstDay.getDay();

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

    // Next month fill
    const totalCells = prevDays.length + currentDays.length;
    const rows = Math.ceil(totalCells / 7);
    const nextDaysCount = rows * 7 - totalCells;
    const nextDays: { day: number; current: boolean }[] = [];
    for (let i = 1; i <= nextDaysCount; i++) {
        nextDays.push({ day: i, current: false });
    }

    return [...prevDays, ...currentDays, ...nextDays];
}

function isHoliday(entry: DayAvailability | HolidayDay | undefined): entry is HolidayDay {
    return !!entry && "label" in entry;
}

function isAvailability(entry: DayAvailability | HolidayDay | undefined): entry is DayAvailability {
    return !!entry && "clinic" in entry;
}

/* ═══════════════════ COMPONENTS ═══════════════════ */

/** Horizontal date-picker row for a clinic/online type */
function TimelineRow({
    label,
    color,
    highlightedDays,
    daysInMonth,
}: {
    label: string;
    color: string;
    highlightedDays: number[];
    daysInMonth: number;
}) {
    return (
        <div className="flex items-center gap-2 sm:gap-3 py-1.5">
            {/* Label */}
            <span className="text-[10px] sm:text-xs font-semibold text-gray-600 w-12 sm:w-16 flex-shrink-0">{label}</span>

            {/* Day circles — scrollable on mobile */}
            <div className="flex items-center gap-[2px] sm:gap-[3px] flex-1 overflow-x-auto scrollbar-hide">
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const isHighlighted = highlightedDays.includes(day);
                    return (
                        <div
                            key={day}
                            className={`
                                w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] rounded-full flex items-center justify-center text-[8px] sm:text-[10px] font-semibold flex-shrink-0 transition-all duration-150
                                ${isHighlighted
                                    ? `${color} text-white shadow-sm`
                                    : "text-gray-400 hover:bg-gray-100"
                                }
                            `}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>

            {/* Edit icon */}
            <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors flex-shrink-0">
                <Pencil className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
        </div>
    );
}

/** Calendar day cell */
function DayCell({
    day,
    isCurrent,
    isToday,
    entry,
}: {
    day: number;
    isCurrent: boolean;
    isToday: boolean;
    entry?: DayAvailability | HolidayDay;
}) {
    const holiday = isHoliday(entry);
    const avail = isAvailability(entry);

    return (
        <div
            className={`
                min-h-[80px] sm:min-h-[100px] md:min-h-[120px] border border-gray-100 p-1 sm:p-1.5 md:p-2 transition-colors duration-150
                ${!isCurrent ? "bg-gray-50/60" : holiday ? "bg-purple-50/40" : "bg-white hover:bg-purple-50/20"}
            `}
        >
            {/* Day number */}
            <div className="flex items-start justify-between mb-0.5 sm:mb-1">
                <span
                    className={`
                        text-xs sm:text-sm font-semibold leading-none
                        ${isToday
                            ? "w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] sm:text-xs"
                            : isCurrent ? "text-gray-700" : "text-gray-300"
                        }
                    `}
                >
                    {day}
                </span>
            </div>

            {/* Content */}
            {isCurrent && holiday && (
                <div className="flex items-center justify-center h-[40px] sm:h-[50px] md:h-[70px]">
                    <span className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-medium">Holiday</span>
                </div>
            )}

            {isCurrent && avail && (
                <div className="space-y-0 sm:space-y-0.5">
                    <span className={`text-[9px] sm:text-[10px] md:text-[11px] font-bold ${clinicColor[entry.clinic].text} block truncate`}>
                        {entry.clinic}
                    </span>
                    {entry.slots.map((slot, i) => (
                        <p
                            key={i}
                            className={`text-[8px] sm:text-[9px] md:text-[10px] leading-tight hidden sm:block ${i === entry.slots.length - 1 && entry.slots.length >= 3
                                ? "text-amber-500 font-medium"
                                : "text-gray-400"
                                }`}
                        >
                            {slot}
                        </p>
                    ))}
                    {/* Show condensed time on mobile */}
                    <p className="text-[8px] text-gray-400 sm:hidden">4-8 pm</p>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════ MAIN PAGE ═══════════════════ */

export default function AvailabilityPage() {
    const [year, setYear] = useState(2023);
    const [month, setMonth] = useState(4); // May (0-indexed)

    const grid = useMemo(() => getCalendarGrid(year, month), [year, month]);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = 10; // Highlighted "today" from screenshot

    const goToPrevMonth = () => {
        if (month === 0) { setMonth(11); setYear(year - 1); }
        else setMonth(month - 1);
    };

    const goToNextMonth = () => {
        if (month === 11) { setMonth(0); setYear(year + 1); }
        else setMonth(month + 1);
    };

    return (
        <div className="p-4 md:p-6 min-h-screen bg-slate-50">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {/* ── Header bar ── */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-3 sm:px-5 md:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-base sm:text-lg font-bold text-gray-800">
                            {MONTH_NAMES[month]} {year}
                        </h2>
                        <div className="flex items-center gap-0.5 ml-1">
                            <button
                                onClick={goToPrevMonth}
                                className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                aria-label="Previous month"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={goToNextMonth}
                                className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                aria-label="Next month"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors shadow-sm">
                        Mark Holidays
                    </button>
                </div>

                {/* ── Timeline rows ── */}
                <div className="px-3 sm:px-5 md:px-6 pb-3 sm:pb-4 border-b border-gray-100 overflow-hidden">
                    {timelineRows.map((row) => (
                        <TimelineRow
                            key={row.label}
                            label={row.label}
                            color={row.color}
                            highlightedDays={row.highlightedDays}
                            daysInMonth={daysInMonth}
                        />
                    ))}
                </div>

                {/* ── Day-of-week headers ── */}
                <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50/80">
                    {DAY_HEADERS.map((d) => (
                        <div
                            key={d}
                            className="text-center py-1.5 sm:py-2 md:py-2.5 text-[9px] sm:text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider"
                        >
                            {d}
                        </div>
                    ))}
                </div>

                {/* ── Calendar grid ── */}
                <div className="grid grid-cols-7">
                    {grid.map((cell, idx) => {
                        const entry = cell.current ? availabilityData[cell.day] : undefined;
                        const isToday = cell.current && cell.day === today;

                        return (
                            <DayCell
                                key={idx}
                                day={cell.day}
                                isCurrent={cell.current}
                                isToday={isToday}
                                entry={entry}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
