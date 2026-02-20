"use client";

import React, { useState } from 'react';
import { TrendingUp, Search, Send } from 'lucide-react';

interface TrendingPrompt {
    id: string;
    description: string;
}

const trendingPrompts: TrendingPrompt[] = [
    {
        id: '1',
        description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Ullamcorper Diam Tortor Convallis Facilisis. Massa Proin Volutpat Volutpat Est Mollis Loraeet Maecenas.',
    },
    {
        id: '2',
        description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Ullamcorper Diam Tortor Convallis Facilisis. Massa Proin Volutpat Volutpat Est Mollis Loraeet Maecenas.',
    },
    {
        id: '3',
        description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Ullamcorper Diam Tortor Convallis Facilisis. Massa Proin Volutpat Volutpat Est Mollis Loraeet Maecenas.',
    },
    {
        id: '4',
        description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Ullamcorper Diam Tortor Convallis Facilisis. Massa Proin Volutpat Volutpat Est Mollis Loraeet Maecenas.',
    },
    {
        id: '5',
        description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Ullamcorper Diam Tortor Convallis Facilisis. Massa Proin Volutpat Volutpat Est Mollis Loraeet Maecenas.',
    },
    {
        id: '6',
        description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Ullamcorper Diam Tortor Convallis Facilisis. Massa Proin Volutpat Volutpat Est Mollis Loraeet Maecenas.',
    },
    {
        id: '7',
        description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Ullamcorper Diam Tortor Convallis Facilisis. Massa Proin Volutpat Volutpat Est Mollis Loraeet Maecenas.',
    },
    {
        id: '8',
        description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Ullamcorper Diam Tortor Convallis Facilisis. Massa Proin Volutpat Volutpat Est Mollis Loraeet Maecenas.',
    },
    {
        id: '9',
        description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Ullamcorper Diam Tortor Convallis Facilisis. Massa Proin Volutpat Volutpat Est Mollis Loraeet Maecenas.',
    },
];

export default function TrendingPage() {
    const [search, setSearch] = useState('');
    const [prompt, setPrompt] = useState('');

    return (
        <div className="h-full p-6">
            {/* Header with Search */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h1 className="text-lg font-semibold text-white">Trending Prompts</h1>
                </div>
                <div className="relative w-full sm:w-56">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                    <input
                        type="text"
                        placeholder="Search Prompt"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                </div>
            </div>

            {/* Trending Prompts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {trendingPrompts.slice(0,6).map((prompt) => (
                    <div
                        key={prompt.id}
                        className="bg-neutral-900 border border-neutral-800 rounded-md p-4 cursor-pointer hover:border-neutral-700 transition-colors group"
                    >
                        <p className="text-neutral-300 text-sm leading-relaxed group-hover:text-neutral-100 transition-colors">
                            {prompt.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Input Section */}
            <div className="flex flex-col items-center gap-3 ">
                <div className="w-full max-w-2xl flex items-center gap-2 mt-4">
                    <input
                        type="text"
                        placeholder="Enter a prompt here"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="flex-1 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <button className="p-2 rounded-full bg-primary hover:bg-primary/90 transition-colors">
                        <Send className="w-4 h-4 text-white" />
                    </button>
                </div>
                 <p className="text-xs text-neutral-600 text-center mt-1">
                        Free Research Preview. Alive.ai may produce inaccurate information about people, places, or facts. <span className="text-primary cursor-pointer hover:text-primary/90">Alive.ai Version 2.0</span>
                    </p>
            </div>
        </div>
    );
}
