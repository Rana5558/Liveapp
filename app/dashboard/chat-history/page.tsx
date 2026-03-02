"use client";

import React, { useState } from "react";
import { Search, MessageSquare, Edit2, X, Clock } from "lucide-react";

const chatSections = [
    {
        label: "Today",
        chats: [
            { id: 1, title: "Tell me some UI/UX Design Ideas", time: "05:12 PM" },
            { id: 2, title: "Design Inspiration Resources", time: "04:45 PM" },
            { id: 3, title: "How do you approach designing for accessibility in UI?", time: "03:30 PM" },
        ],
    },
    {
        label: "Yesterday",
        chats: [
            { id: 4, title: "How do you approach designing for accessibility in UI?", time: "05:12 PM" },
            { id: 5, title: "Explain my blood report findings", time: "01:20 PM" },
        ],
    },
    {
        label: "12 Jan 2025",
        chats: [
            { id: 6, title: "How do you approach designing for accessibility in UI?", time: "05:12 PM" },
            { id: 7, title: "Tell me some UI/UX Design Ideas", time: "09:00 AM" },
        ],
    },
];

export default function ChatHistoryPage() {
    const [search, setSearch] = useState("");

    const filtered = chatSections
        .map((section) => ({
            ...section,
            chats: section.chats.filter((c) =>
                c.title.toLowerCase().includes(search.toLowerCase())
            ),
        }))
        .filter((s) => s.chats.length > 0);

    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 space-y-5 sm:space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Chat History</h1>
                <p className="text-neutral-400 text-sm sm:text-base">Browse and revisit your previous AI conversations</p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                    type="text"
                    placeholder="Search by name or summary..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 rounded-xl px-4 py-3 pl-11 pr-11 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
                />
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                        aria-label="Clear search"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Chat Sections */}
            <div className="space-y-6">
                {filtered.length === 0 ? (
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-10 sm:p-14 flex flex-col items-center justify-center text-center">
                        <MessageSquare className="w-9 h-9 text-neutral-700 mb-3" />
                        <p className="text-neutral-400 font-medium">No chats found</p>
                        <p className="text-neutral-600 text-sm mt-1">Try a different search term</p>
                    </div>
                ) : (
                    filtered.map((section) => (
                        <div key={section.label}>
                            {/* Section Divider */}
                            <div className="flex items-center gap-3 sm:gap-4 mb-3">
                                <div className="flex-1 h-px bg-neutral-800" />
                                <span className="text-neutral-500 text-xs font-semibold uppercase tracking-widest whitespace-nowrap">
                                    {section.label}
                                </span>
                                <div className="flex-1 h-px bg-neutral-800" />
                            </div>

                            {/* Chat Items */}
                            <div className="space-y-2">
                                {section.chats.map((chat) => (
                                    <div
                                        key={chat.id}
                                        className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3 sm:gap-4 hover:bg-neutral-800 transition-colors cursor-pointer group"
                                    >
                                        {/* Icon */}
                                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                                        </div>

                                        {/* Title */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-medium text-xs sm:text-sm truncate group-hover:text-primary transition-colors">
                                                {chat.title}
                                            </p>
                                        </div>

                                        {/* Time — hidden on xs */}
                                        <div className="hidden xs:flex items-center gap-1.5 text-neutral-500 text-xs shrink-0">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{chat.time}</span>
                                        </div>

                                        {/* Edit Button */}
                                        <button className="p-1.5 sm:p-2 rounded-lg hover:bg-neutral-700 text-neutral-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 shrink-0">
                                            <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {filtered.length > 0 && (
                <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 pt-2 border-t border-neutral-800">
                    <span className="text-neutral-500 text-xs sm:text-sm">Showing 1 – 10 of 123 results</span>
                    <button className="ml-auto text-primary text-sm font-semibold hover:text-primary/80 transition-colors">
                        Load more →
                    </button>
                </div>
            )}
        </div>
    );
}
