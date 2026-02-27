"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Image from "next/image";

import {
    Stethoscope, Apple, FileText, Calendar, MessageSquare, Brain,
    Send, Paperclip, Mic
} from 'lucide-react';

const problems = [
    { id: 'medical', icon: Stethoscope, title: 'Explain Medical Condition', description: "I'm having vomiting sensation" },
    { id: 'diet', icon: Apple, title: 'Need Diet Plan', description: 'I want you to plan my diet for weight loss' },
    { id: 'report', icon: FileText, title: 'Scan Report', description: 'Scan my blood report & suggest me cure...' },
    { id: 'appointment', icon: Calendar, title: 'Schedule Appointment', description: 'Schedule with a stomach specialist' },
    { id: 'chat', icon: MessageSquare, title: 'Live Chat With Doctor', description: 'Schedule an online consultation' },
    { id: 'health', icon: Brain, title: 'Predict My Health', description: 'Predict my health condition' },
];

export default function PatientDashboardPage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
    const [message, setMessage] = useState('');

    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 space-y-5 sm:space-y-6 h-full flex flex-col">
            
            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                
                {/* Responsive Bigger Logo */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center">
                    <Image
                        src="/images/mainlogo2.png"
                        alt="Logo"
                        width={80}
                        height={80}
                        className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain"
                        priority
                    />
                </div>

                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white">
                        Welcome back, {user?.name?.split(' ')[0] ?? 'Patient'} 👋
                    </h1>
                    <p className="text-neutral-400 text-sm sm:text-base mt-1">
                        What can Alive.ai help you with today?
                    </p>
                </div>
            </div>

            {/* Problem Cards */}
            <div>
                <p className="text-white font-semibold text-sm mb-2">Quick Actions</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                    {problems.map((problem) => {
                        const Icon = problem.icon as React.ComponentType<{ className?: string }>;
                        const isSelected = selectedProblem === problem.id;

                        return (
                            <button
                                key={problem.id}
                                onClick={() => {
                                    setSelectedProblem(problem.id);
                                    setMessage(problem.description);
                                }}
                                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left group flex flex-col gap-2 sm:gap-3 ${
                                    isSelected
                                        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                                        : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700 hover:bg-neutral-800'
                                }`}
                            >
                                <div
                                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-colors ${
                                        isSelected
                                            ? 'bg-primary text-white'
                                            : 'bg-neutral-800 text-neutral-400 group-hover:text-primary'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-[11px] sm:text-xs leading-tight">
                                        {problem.title}
                                    </h3>
                                    <p className="text-neutral-500 text-[10px] sm:text-[11px] mt-1 line-clamp-2">
                                        {problem.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Chat Input */}
            <div className="flex-1 flex flex-col justify-end pb-2 sm:pb-4">
                <div className="flex flex-col items-center gap-2 sm:gap-3 max-w-2xl mx-auto w-full">
                    <div className="w-full flex items-center gap-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 transition-all">
                        
                        <Paperclip className="w-4 h-4 text-neutral-500 cursor-pointer hover:text-neutral-300 transition-colors shrink-0" />
                        
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter a prompt or pick a quick action above..."
                            className="flex-1 bg-transparent text-white placeholder-neutral-600 outline-none text-xs sm:text-sm min-w-0"
                        />
                        
                        <Mic className="w-4 h-4 text-neutral-500 cursor-pointer hover:text-neutral-300 transition-colors shrink-0" />
                        
                        <button
                            disabled={!message.trim()}
                            className="p-1.5 sm:p-2 bg-primary hover:bg-primary/90 text-white rounded-lg sm:rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                        >
                            <Send className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <p className="text-[10px] sm:text-[11px] text-neutral-600 text-center px-4">
                        Free Research Preview. Alive.ai may produce inaccurate information.{" "}
                        <span className="text-primary cursor-pointer hover:text-primary/80">
                            Alive.ai v2.0
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}