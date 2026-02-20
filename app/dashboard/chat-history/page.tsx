"use client";

import React, { useState } from 'react';
import { Clock, MessageCircle, Search, Trash2, Archive } from 'lucide-react';

interface ChatMessage {
    id: string;
    title: string;
    date: string;
    preview: string;
    messageCount: number;
    aiResponse: boolean;
}

const chatHistory: ChatMessage[] = [
    {
        id: '1',
        title: 'Consultation about back pain',
        date: 'Today at 2:30 PM',
        preview: 'AI: I understand you\'re experiencing back pain. Let me help you with some...',
        messageCount: 12,
        aiResponse: true,
    },
    {
        id: '2',
        title: 'Diet plan discussion',
        date: 'Yesterday at 10:15 AM',
        preview: 'You: Can you suggest a diet plan for weight loss?',
        messageCount: 8,
        aiResponse: true,
    },
    {
        id: '3',
        title: 'Sleep quality improvement',
        date: 'Feb 17 at 9:45 PM',
        preview: 'AI: Here are some tips to improve your sleep quality...',
        messageCount: 15,
        aiResponse: true,
    },
    {
        id: '4',
        title: 'Medication side effects',
        date: 'Feb 16 at 3:20 PM',
        preview: 'You: I\'m experiencing some side effects from my medication...',
        messageCount: 10,
        aiResponse: true,
    },
    {
        id: '5',
        title: 'Exercise routine consultation',
        date: 'Feb 15 at 11:00 AM',
        preview: 'AI: Based on your fitness level, here\'s a recommended routine...',
        messageCount: 18,
        aiResponse: true,
    },
    {
        id: '6',
        title: 'Blood pressure management',
        date: 'Feb 14 at 4:30 PM',
        preview: 'You: How can I manage my high blood pressure naturally?',
        messageCount: 14,
        aiResponse: true,
    },
    {
        id: '7',
        title: 'Doctor appointment booking',
        date: 'Feb 13 at 1:15 PM',
        preview: 'AI: I can help you book an appointment with a specialist...',
        messageCount: 6,
        aiResponse: true,
    },
    {
        id: '8',
        title: 'Nutrition for muscle gain',
        date: 'Feb 12 at 7:45 PM',
        preview: 'You: What should I eat to gain muscle mass?',
        messageCount: 11,
        aiResponse: true,
    },
];

export default function ChatHistoryPage() {
    const [search, setSearch] = useState('');
    const [selectedChats, setSelectedChats] = useState<string[]>([]);

    const filteredChats = chatHistory.filter(chat =>
        chat.title.toLowerCase().includes(search.toLowerCase()) ||
        chat.preview.toLowerCase().includes(search.toLowerCase())
    );

    const toggleSelect = (id: string) => {
        setSelectedChats(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        // full-height dark layout to fit inside an iframe with only inner scrolling
        <div className="h-full w-full flex flex-col bg-neutral-900 text-white overflow-hidden p-4">
            {/* Header */}
            <div className="flex items-center gap-2 py-2 border-b border-neutral-700">
                <Clock className="w-5 h-5 text-primary" />
                <h1 className="text-base font-medium">Chat History</h1>
            </div>

            {/* Search bar */}
            <div className="py-2 border-b border-neutral-700">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search your chats"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-8 pr-2 py-1.5 rounded bg-neutral-800 text-white text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Chat list container with inner scrolling */}
            <div className="flex-1 overflow-auto">
                {filteredChats.length > 0 ? (
                    filteredChats.map((chat) => (
                        <div
                            key={chat.id}
                            className="flex items-center justify-between px-3 py-2 border-b border-neutral-700 hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium text-sm truncate">{chat.title}</h3>
                                    <span className="text-[10px] text-neutral-400 ml-2">{chat.date}</span>
                                </div>
                                <p className="text-[10px] text-neutral-500 mt-1 truncate">
                                    {chat.preview}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 ml-3">
                                <MessageCircle className="w-3 h-3 text-neutral-500" />
                                <span className="text-[10px] text-neutral-400">{chat.messageCount}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center">
                        <MessageCircle className="w-12 h-12 text-neutral-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-neutral-400 mb-2">No conversations found</h3>
                        <p className="text-neutral-500">Start a new conversation or try a different search term</p>
                    </div>
                )}
            </div>
        </div>
    );
}
