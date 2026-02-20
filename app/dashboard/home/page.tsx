"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Image from "next/image";

import {
    Stethoscope,
    Apple,
    FileText,
    Calendar,
    MessageSquare,
    Brain,
    Send,
    Paperclip,
    Mic
} from 'lucide-react';

const problems = [
    {
        id: 'medical',
        icon: Stethoscope,
        title: 'Explain Medical Condition',
        description: "I'm having vomiting Sensation",
    },
    {
        id: 'diet',
        icon: Apple,
        title: 'Need Diet Plan',
        description: 'I want you to plan my diet for weight loss',
    },
    {
        id: 'report',
        icon: FileText,
        title: 'Scan Report',
        description: 'Scan my blood report & suggest me cure...',
    },
    {
        id: 'appointment',
        icon: Calendar,
        title: 'Schedule Appointment',
        description: 'Schedule appointment with stomach expert',
    },
    {
        id: 'chat',
        icon: MessageSquare,
        title: 'Live Chat With Doctor',
        description: 'Schedule an online consultation with doctor',
    },
    {
        id: 'health',
        icon: Brain,
        title: 'Predict My Health',
        description: 'Predict my health condition',
    },
];

export default function PatientDashboardPage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
    const [message, setMessage] = useState('');

    return (
        <div className="h-full flex flex-col">
            {/* Top Content Section */}
            <div className="flex-1 overflow-hidden px-4 sm:px-6 py-4">
                {/* Logo and Welcome */}
                <div className="flex flex-col items-center justify-center mb-4 space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="p-2 flex items-center">
                            <Image
                                src="/images/mainlogo2.png"
                                alt="LiVE Logo"
                                width={96}
                                height={32}
                                priority
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <h1 className="text-xl font-medium text-white">Welcome, {user?.name || "Maya"}</h1>
                    <div className="text-center">
                        <p className="text-neutral-400 text-xs">Start by scripting a task, and let the chat take over.</p>
                    </div>
                </div>

                {/* Problem Description Section */}
                <div className="max-w-2xl mx-auto mb-4">
                    <h2 className="text-lg font-semibold text-white text-center mb-1">How would you describe your problem?</h2>
                    <p className="text-neutral-400 text-center text-xs">
                        Describe health issues, scan prescriptions or upload reports
                    </p>
                </div>

                {/* Problem Cards Grid */}
                <div className="max-w-2xl mx-auto mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {problems.map((problem) => {
                            const IconComponent = problem.icon as React.ComponentType<{ className?: string }>;
                            const isSelected = selectedProblem === problem.id;

                            return (
                                <button
                                    key={problem.id}
                                    onClick={() => setSelectedProblem(problem.id)}
                                    className={`p-2 rounded-lg border-2 transition-all duration-150 text-left group ${isSelected
                                            ? 'border-primary bg-neutral-900/40'
                                            : 'border-neutral-700 bg-transparent hover:border-neutral-600'
                                        }`}
                                >
                                    <div className={`w-9 h-9 rounded-md flex items-center justify-center mb-2 transition-colors ${isSelected
                                            ? 'bg-primary text-white'
                                            : 'bg-neutral-800 text-neutral-300 group-hover:text-neutral-100'
                                        }`}>
                                        <IconComponent className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-white font-medium text-xs">{problem.title}</h3>
                                    <p className="text-neutral-500 text-[11px] mt-1">{problem.description}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Input Section */}
            <div className="px-4 py-4 border-t border-neutral-800">
                <div className="max-w-xl mx-auto flex flex-col items-center gap-2">
                    <div className="w-full flex items-center gap-2 bg-neutral-900 border border-neutral-700 rounded-full px-3 py-2 hover:border-neutral-600 transition-colors">
                        <Paperclip className="w-4 h-4 text-neutral-500 cursor-pointer hover:text-neutral-300 transition-colors" />
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter a prompt"
                            className="flex-1 bg-transparent text-white placeholder-neutral-600 outline-none text-xs"
                        />
                        <Mic className="w-4 h-4 text-neutral-500 cursor-pointer hover:text-neutral-300 transition-colors" />
                        <button className="p-2 bg-primary hover:bg-primary/90 text-white rounded-full transition-colors">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-[11px] text-neutral-600 text-center">
                        Free Research Preview. Alive.ai may produce inaccurate information. <span className="text-primary cursor-pointer hover:text-primary/90">Alive.ai v2.0</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
