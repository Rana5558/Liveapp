"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    ArrowUpRight,
    SlidersHorizontal,
    MoreVertical,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────
   Types
────────────────────────────────────────────── */
type FilterTab = "All" | "Ended" | "Upcoming";
type Mode = "Online" | "Offline";
type Status = "Upcoming" | "Ended" | "Cancelled";

interface PatientRecord {
    id: number;
    date: string;
    time: string;
    patient: string;
    mode: Mode;
    areaOfConcern: string;
    status: Status;
}

/* ──────────────────────────────────────────────
   Mock Data
────────────────────────────────────────────── */
const RECORDS: PatientRecord[] = Array.from({ length: 80 }, (_, i) => {
    const statuses: Status[] = ["Upcoming", "Ended", "Ended", "Cancelled", "Upcoming", "Upcoming", "Upcoming", "Upcoming"];
    const modes: Mode[] = ["Online", "Offline", "Offline", "Offline", "Online", "Online", "Online", "Online"];
    return {
        id: i + 1,
        date: "27 Dec, 2024",
        time: "12:36 PM",
        patient: "Bessie Cooper",
        mode: modes[i % modes.length],
        areaOfConcern: "Upper Abdomen General",
        status: statuses[i % statuses.length],
    };
});

/* ──────────────────────────────────────────────
   Status helpers
────────────────────────────────────────────── */
const STATUS_DOT: Record<Status, string> = {
    Upcoming: "bg-green-500",
    Ended: "bg-purple-500",
    Cancelled: "bg-red-500",
};

const ROWS_PER_PAGE = 8;

/* ──────────────────────────────────────────────
   Context Menu Component
────────────────────────────────────────────── */
function ContextMenu({
    open,
    onClose,
    onViewDetails,
    onEdit,
    onDelete,
}: {
    open: boolean;
    onClose: () => void;
    onViewDetails: () => void;
    onEdit: () => void;
    onDelete: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        };
        if (open) document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            ref={ref}
            className="absolute right-6 top-full mt-1 z-50 bg-white border border-gray-100 rounded-2xl shadow-2xl w-44 py-2 overflow-hidden"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
        >
            <button
                onClick={onViewDetails}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
                <Settings2 className="w-4 h-4 text-gray-500" />
                View Details
            </button>
            <div className="h-px bg-gray-100 mx-1" />
            <button
                onClick={onEdit}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
                <Pencil className="w-4 h-4 text-gray-500" />
                Edit
            </button>
            <div className="h-px bg-gray-100 mx-1" />
            <button
                onClick={onDelete}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
                <Trash2 className="w-4 h-4 text-red-500" />
                Delete
            </button>
        </div>
    );
}

/* ──────────────────────────────────────────────
   Pagination helpers
────────────────────────────────────────────── */
function buildPages(current: number, total: number): (number | "…")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: (number | "…")[] = [1];
    if (current > 3) pages.push("…");
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let p = start; p <= end; p++) pages.push(p);
    if (current < total - 2) pages.push("…");
    pages.push(total);
    return pages;
}

/* ──────────────────────────────────────────────
   Main Page
────────────────────────────────────────────── */
export default function PatientRecordsPage() {
    const [activeTab, setActiveTab] = useState<FilterTab>("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    /* Filter records by tab */
    const filtered = RECORDS.filter((r) => {
        if (activeTab === "All") return true;
        if (activeTab === "Ended") return r.status === "Ended";
        if (activeTab === "Upcoming") return r.status === "Upcoming";
        return true;
    });

    const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
    const safeCurrentPage = Math.min(currentPage, totalPages || 1);
    const pageRecords = filtered.slice(
        (safeCurrentPage - 1) * ROWS_PER_PAGE,
        safeCurrentPage * ROWS_PER_PAGE
    );
    const pages = buildPages(safeCurrentPage, totalPages);

    const handleTabChange = (tab: FilterTab) => {
        setActiveTab(tab);
        setCurrentPage(1);
        setOpenMenuId(null);
    };

    return (
        <div className="p-3 sm:p-4 md:p-6 min-h-screen bg-slate-50">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {/* ── Tab Bar + Filter ── */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
                    {/* Tabs */}
                    <div className="flex items-center bg-gray-100 rounded-full p-1 gap-0.5">
                        {(["All", "Ended", "Upcoming"] as FilterTab[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={cn(
                                    "px-3 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200",
                                    activeTab === tab
                                        ? "bg-white text-gray-800 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                {tab === "Upcoming" ? "upcoming" : tab}
                            </button>
                        ))}
                    </div>

                    {/* Filter Button */}
                    <button className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium hover:text-gray-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filter
                    </button>
                </div>

                {/* ── Patients List Header ── */}
                <div className="px-3 sm:px-6 py-3 sm:py-4 flex items-center gap-2">
                    <h2 className="text-sm sm:text-base font-bold text-gray-800">Patients List</h2>
                    <ArrowUpRight className="w-4 h-4 text-gray-500" />
                </div>

                {/* ── Table ── */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-y border-gray-100">
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 tracking-wider uppercase">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 tracking-wider uppercase">
                                    Time
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 tracking-wider uppercase">
                                    Patient
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 tracking-wider uppercase">
                                    Mode
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 tracking-wider uppercase">
                                    Area of Concern
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 tracking-wider uppercase">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 tracking-wider uppercase">
                                    Contact
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {pageRecords.map((record) => (
                                <tr
                                    key={record.id}
                                    className="hover:bg-gray-50/60 transition-colors"
                                >
                                    <td className="px-6 py-3.5 text-sm text-gray-700 whitespace-nowrap">
                                        {record.date}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-gray-700 whitespace-nowrap">
                                        {record.time}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-gray-700 whitespace-nowrap font-medium">
                                        {record.patient}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-gray-700 whitespace-nowrap">
                                        {record.mode}
                                    </td>
                                    <td className="px-4 py-3.5 text-sm text-gray-700 whitespace-nowrap">
                                        {record.areaOfConcern}
                                    </td>
                                    <td className="px-4 py-3.5 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={cn(
                                                    "w-2.5 h-2.5 rounded-full flex-shrink-0",
                                                    STATUS_DOT[record.status]
                                                )}
                                            />
                                            <span className="text-sm font-medium text-gray-700">
                                                {record.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5 relative">
                                        <button
                                            onClick={() =>
                                                setOpenMenuId(
                                                    openMenuId === record.id ? null : record.id
                                                )
                                            }
                                            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                                            aria-label="More options"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                        <ContextMenu
                                            open={openMenuId === record.id}
                                            onClose={() => setOpenMenuId(null)}
                                            onViewDetails={() => setOpenMenuId(null)}
                                            onEdit={() => setOpenMenuId(null)}
                                            onDelete={() => setOpenMenuId(null)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty state */}
                    {pageRecords.length === 0 && (
                        <div className="py-16 text-center text-gray-400 text-sm">
                            No records found.
                        </div>
                    )}
                </div>

                {/* ── Pagination ── */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-100">
                    {/* Prev / page numbers / Next */}
                    <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto w-full sm:w-auto justify-center sm:justify-start">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={safeCurrentPage === 1}
                            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span className="hidden sm:inline">Previous</span>
                        </button>

                        {pages.map((p, idx) =>
                            p === "…" ? (
                                <span
                                    key={`ellipsis-${idx}`}
                                    className="px-2 py-1.5 text-sm text-gray-400"
                                >
                                    …
                                </span>
                            ) : (
                                <button
                                    key={p}
                                    onClick={() => setCurrentPage(p as number)}
                                    className={cn(
                                        "w-8 h-8 rounded-lg text-sm font-medium transition-all duration-150",
                                        safeCurrentPage === p
                                            ? "bg-primary text-white shadow-sm"
                                            : "text-gray-600 hover:bg-gray-100"
                                    )}
                                >
                                    {p}
                                </button>
                            )
                        )}

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={safeCurrentPage === totalPages}
                            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <span className="hidden sm:inline">Next</span>
                            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                    </div>

                    {/* Page X of Y */}
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                        <span>Page</span>
                        <span className="inline-flex items-center gap-1 border border-gray-200 rounded-md px-2 py-0.5 text-gray-700 font-medium cursor-pointer hover:bg-gray-50">
                            {safeCurrentPage}
                            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                        </span>
                        <span>of {totalPages}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
