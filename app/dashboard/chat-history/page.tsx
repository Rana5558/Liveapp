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
        <div className="px-4 sm:px-8 pt-6 sm:pt-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3">
                    <Clock className="w-7 h-7 text-primary" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Chat History</h1>
                </div>
                <p className="text-gray-600 sm:ml-2">View and manage your previous conversations</p>
            </div>

            {/* Search and Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>

                {/* Quick Action Buttons */}
                {selectedChats.length > 0 && (
                    <div className="flex gap-2">
                        <button className="px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2">
                            <Archive className="w-4 h-4" />
                            <span className="text-sm font-medium">Archive</span>
                        </button>
                        <button className="px-4 py-3 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm font-medium">Delete</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Chat List */}
            <div className="space-y-3">
                {filteredChats.length > 0 ? (
                    filteredChats.map((chat) => (
                        <div
                            key={chat.id}
                            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-start gap-4">
                                {/* Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={selectedChats.includes(chat.id)}
                                    onChange={() => toggleSelect(chat.id)}
                                    className="mt-2 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                />

                                {/* Chat Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors truncate">
                                            {chat.title}
                                        </h3>
                                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                                            {chat.date}
                                        </span>
                                    </div>

                                    {/* Preview */}
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                        {chat.preview}
                                    </p>

                                    {/* Message Count */}
                                    <div className="flex items-center gap-2">
                                        <MessageCircle className="w-4 h-4 text-gray-400" />
                                        <span className="text-xs text-gray-500">
                                            {chat.messageCount} messages
                                        </span>
                                    </div>
                                </div>

                                {/* Actions (visible on hover) */}
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                        <Archive className="w-4 h-4 text-gray-600 hover:text-primary" />
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-red-50 transition-colors">
                                        <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white p-12 rounded-lg border border-gray-200 text-center">
                        <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No conversations found</h3>
                        <p className="text-gray-500">Start a new conversation or try a different search term</p>
                    </div>
                )}
            </div>

            {/* Pagination Info */}
            {filteredChats.length > 0 && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        Showing {filteredChats.length} of {chatHistory.length} conversations
                    </p>
                    <button className="px-4 py-2 border border-primary text-primary font-medium rounded-lg hover:bg-primary/5 transition-colors">
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}
