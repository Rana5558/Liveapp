"use client";

import React, { useState } from "react";
import { TrendingUp, Search, Send, Paperclip, Mic } from "lucide-react";

interface TrendingPrompt {
    id: string;
    category: string;
    description: string;
}

const trendingPrompts: TrendingPrompt[] = [
    { id: "1", category: "Medical Condition", description: "Explain the difference between Type 1 and Type 2 diabetes and their treatment options." },
    { id: "2", category: "Diet & Nutrition", description: "Create a 7-day balanced meal plan for someone with high blood pressure." },
    { id: "3", category: "Mental Health", description: "What are effective daily habits to manage stress and anxiety naturally?" },
    { id: "4", category: "Scan Report", description: "Analyze my latest blood report and explain what the CBC values mean." },
    { id: "5", category: "Exercise", description: "Design a beginner-friendly 30-minute workout routine for weight loss at home." },
    { id: "6", category: "Appointment", description: "Schedule an online consultation with a cardiologist for this week." },
    { id: "7", category: "Medication", description: "What are the common side effects of Metformin and how do I manage them?" },
    { id: "8", category: "Lifestyle", description: "Suggest a sleep improvement plan for someone dealing with chronic insomnia." },
    { id: "9", category: "Symptom Check", description: "I've been having persistent lower back pain for two weeks. What could it be?" },
];

const categoryColors: Record<string, string> = {
    "Medical Condition": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Diet & Nutrition": "bg-green-500/10 text-green-400 border-green-500/20",
    "Mental Health": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Scan Report": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "Exercise": "bg-orange-500/10 text-orange-400 border-orange-500/20",
    "Appointment": "bg-primary/10 text-primary border-primary/20",
    "Medication": "bg-red-500/10 text-red-400 border-red-500/20",
    "Lifestyle": "bg-teal-500/10 text-teal-400 border-teal-500/20",
    "Symptom Check": "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

export default function TrendingPage() {
    const [search, setSearch] = useState("");
    const [prompt, setPrompt] = useState("");
    const [selected, setSelected] = useState<string | null>(null);

    const filtered = trendingPrompts.filter((p) =>
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (id: string, description: string) => {
        setSelected(id);
        setPrompt(description);
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 space-y-5 sm:space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Trending Prompts</h1>
                    <p className="text-neutral-400 text-sm sm:text-base">Discover popular AI health prompts used by patients like you</p>
                </div>
                {/* Search */}
                <div className="relative w-full sm:w-56">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                        type="text"
                        placeholder="Search prompts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
                    />
                </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-2 text-sm text-neutral-500">
                <TrendingUp className="w-4 h-4 text-primary shrink-0" />
                <span className="text-neutral-400 font-medium">{filtered.length} prompts</span>
                <span>trending this week</span>
            </div>

            {/* Prompt Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {filtered.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleSelect(item.id, item.description)}
                        className={`text-left bg-neutral-900 border rounded-xl p-4 sm:p-5 cursor-pointer transition-all duration-200 group hover:shadow-lg hover:shadow-primary/5 ${selected === item.id
                            ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                            : "border-neutral-800 hover:border-neutral-700"
                            }`}
                    >
                        <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full border mb-3 ${categoryColors[item.category] ?? "bg-neutral-800 text-neutral-400 border-neutral-700"}`}>
                            {item.category}
                        </span>
                        <p className={`text-sm leading-relaxed transition-colors ${selected === item.id ? "text-white" : "text-neutral-300 group-hover:text-white"}`}>
                            {item.description}
                        </p>
                        <p className="mt-3 text-xs text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                            Use this prompt →
                        </p>
                    </button>
                ))}
            </div>

            {/* Prompt Input */}
            <div className="pt-2 border-t border-neutral-800 flex flex-col items-center gap-3">
                <div className="w-full max-w-2xl flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-2xl px-3 sm:px-4 py-2.5 hover:border-neutral-700 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <Paperclip className="w-4 h-4 text-neutral-500 cursor-pointer hover:text-neutral-300 transition-colors shrink-0" />
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Select a prompt above or type your own..."
                        className="flex-1 bg-transparent text-white placeholder-neutral-600 outline-none text-xs sm:text-sm min-w-0"
                    />
                    <Mic className="w-4 h-4 text-neutral-500 cursor-pointer hover:text-neutral-300 transition-colors shrink-0" />
                    <button
                        disabled={!prompt.trim()}
                        className="p-2 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                    >
                        <Send className="w-3.5 h-3.5" />
                    </button>
                </div>
                <p className="text-[11px] text-neutral-600 text-center px-4">
                    Free Research Preview. Alive.ai may produce inaccurate information.{" "}
                    <span className="text-primary cursor-pointer hover:text-primary/80">Alive.ai v2.0</span>
                </p>
            </div>
        </div>
    );
}
