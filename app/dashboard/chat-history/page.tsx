"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, MessageSquare, Edit2, X, Clock, Loader2 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { fetchConversations, setActiveConversation } from "@/lib/features/chat/chatSlice";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";
import type { Conversation } from "@/lib/types/chat";

// ── Helpers ─────────────────────────────────────────────────────

function getDateLabel(iso: string): string {
    const date = new Date(iso);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date >= today) return 'Today';
    if (date >= yesterday) return 'Yesterday';
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatTime(iso: string): string {
    try {
        return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
        return '';
    }
}

interface GroupedSection {
    label: string;
    conversations: Conversation[];
}

function groupByDate(conversations: Conversation[]): GroupedSection[] {
    const map = new Map<string, Conversation[]>();

    for (const conv of conversations) {
        const label = getDateLabel(conv.updatedAt || conv.createdAt);
        if (!map.has(label)) map.set(label, []);
        map.get(label)!.push(conv);
    }

    return Array.from(map.entries()).map(([label, items]) => ({ label, conversations: items }));
}

// ── Component ───────────────────────────────────────────────────

export default function ChatHistoryPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {
        conversations,
        conversationPagination,
        isLoadingConversations,
    } = useAppSelector((state) => state.chat);

    const [search, setSearch] = useState("");

    // Fetch on mount
    useEffect(() => {
        dispatch(fetchConversations(1));
    }, [dispatch]);

    // Infinite scroll
    const handleLoadMore = useCallback(() => {
        if (!isLoadingConversations && conversationPagination.hasMore) {
            dispatch(fetchConversations(conversationPagination.page + 1));
        }
    }, [dispatch, isLoadingConversations, conversationPagination]);

    const { sentinelRef } = useInfiniteScroll({
        hasMore: conversationPagination.hasMore,
        isLoading: isLoadingConversations,
        onLoadMore: handleLoadMore,
    });

    // Filter + group
    const filtered = useMemo(() => {
        const term = search.toLowerCase();
        const list = term
            ? conversations.filter((c) => c.title.toLowerCase().includes(term))
            : conversations;
        return groupByDate(list);
    }, [conversations, search]);

    const handleOpenChat = (conversationId: string) => {
        dispatch(setActiveConversation(conversationId));
        router.push(`/dashboard/home?conversation=${conversationId}`);
    };

    const totalShown = conversations.length;
    const totalCount = conversationPagination.total || totalShown;

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
                {isLoadingConversations && conversations.length === 0 ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-10 sm:p-14 flex flex-col items-center justify-center text-center">
                        <MessageSquare className="w-9 h-9 text-neutral-700 mb-3" />
                        <p className="text-neutral-400 font-medium">No chats found</p>
                        <p className="text-neutral-600 text-sm mt-1">
                            {search ? 'Try a different search term' : 'Start a new conversation from the home page'}
                        </p>
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
                                {section.conversations.map((conv) => (
                                    <div
                                        key={conv.id}
                                        onClick={() => handleOpenChat(conv.id)}
                                        className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3 sm:gap-4 hover:bg-neutral-800 transition-colors cursor-pointer group"
                                    >
                                        {/* Icon */}
                                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                                        </div>

                                        {/* Title */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-medium text-xs sm:text-sm truncate group-hover:text-primary transition-colors">
                                                {conv.title}
                                            </p>
                                            {conv.lastMessage && (
                                                <p className="text-neutral-500 text-[10px] sm:text-[11px] truncate mt-0.5">
                                                    {conv.lastMessage}
                                                </p>
                                            )}
                                        </div>

                                        {/* Time */}
                                        <div className="hidden xs:flex items-center gap-1.5 text-neutral-500 text-xs shrink-0">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{formatTime(conv.updatedAt || conv.createdAt)}</span>
                                        </div>

                                        {/* Edit Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // TODO: Implement rename conversation
                                            }}
                                            className="p-1.5 sm:p-2 rounded-lg hover:bg-neutral-700 text-neutral-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                                            title="Rename chat"
                                        >
                                            <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}

                {/* Infinite Scroll Sentinel */}
                <div ref={sentinelRef} className="h-1" />

                {/* Loading more indicator */}
                {isLoadingConversations && conversations.length > 0 && (
                    <div className="flex items-center justify-center py-4">
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    </div>
                )}
            </div>

            {/* Footer count */}
            {totalShown > 0 && (
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-neutral-800">
                    <span className="text-neutral-500 text-xs sm:text-sm">
                        Showing {totalShown} of {totalCount} conversations
                    </span>
                </div>
            )}
        </div>
    );
}