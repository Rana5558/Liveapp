'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown, WifiOff } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { useChat } from '@/lib/hooks/useChat';
import { useAutoScroll } from '@/lib/hooks/useAutoScroll';
import { useAppSelector } from '@/lib/hooks';
import type { FileAttachment } from '@/lib/types/chat';
import {
    Stethoscope, Apple, FileText, Calendar, MessageSquare, Brain,
} from 'lucide-react';

const quickActions = [
    { id: 'medical', icon: Stethoscope, title: 'Explain Medical Condition', description: "I'm having vomiting sensation" },
    { id: 'diet', icon: Apple, title: 'Need Diet Plan', description: 'I want you to plan my diet for weight loss' },
    { id: 'report', icon: FileText, title: 'Scan Report', description: 'Scan my blood report & suggest me cure...' },
    { id: 'appointment', icon: Calendar, title: 'Schedule Appointment', description: 'Schedule with a stomach specialist' },
    { id: 'chat', icon: MessageSquare, title: 'Live Chat With Doctor', description: 'Schedule an online consultation' },
    { id: 'health', icon: Brain, title: 'Predict My Health', description: 'Predict my health condition' },
];

export default function ChatWindow() {
    const { user } = useAppSelector((state) => state.auth);
    const {
        messages,
        isStreaming,
        isTyping,
        wsStatus,
        sendMessage,
        stopStreaming,
    } = useChat();

    const { containerRef, scrollToBottom } = useAutoScroll(messages);
    const hasMessages = messages.length > 0;

    const handleSend = (content: string, attachments?: FileAttachment[]) => {
        sendMessage(content, attachments);
    };

    const handleQuickAction = (description: string) => {
        sendMessage(description);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Connection Status Banner */}
            {wsStatus === 'disconnected' && process.env.NEXT_PUBLIC_WS_URL && (
                <div className="flex items-center gap-2 bg-amber-900/30 border-b border-amber-800/50 px-4 py-2 text-amber-300 text-xs">
                    <WifiOff className="w-3.5 h-3.5" />
                    <span>Connection lost. Reconnecting...</span>
                </div>
            )}

            {/* Messages Area */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto"
            >
                {!hasMessages ? (
                    /* ── Empty State / Welcome Screen ─────────────────── */
                    <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 space-y-5 sm:space-y-6 h-full flex flex-col">
                        {/* Header */}
                        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
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

                        {/* Quick Actions */}
                        <div>
                            <p className="text-white font-semibold text-sm mb-2">Quick Actions</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                                {quickActions.map((action) => {
                                    const Icon = action.icon as React.ComponentType<{ className?: string }>;
                                    return (
                                        <button
                                            key={action.id}
                                            onClick={() => handleQuickAction(action.description)}
                                            className="p-3 sm:p-4 rounded-xl border-2 border-neutral-800 bg-neutral-900 hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-200 text-left group flex flex-col gap-2 sm:gap-3"
                                        >
                                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-neutral-800 text-neutral-400 group-hover:text-primary flex items-center justify-center transition-colors">
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold text-[11px] sm:text-xs leading-tight">
                                                    {action.title}
                                                </h3>
                                                <p className="text-neutral-500 text-[10px] sm:text-[11px] mt-1 line-clamp-2">
                                                    {action.description}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* ── Messages List ────────────────────────────────── */
                    <div className="py-4 space-y-1">
                        {messages.map((msg) => (
                            <ChatMessage
                                key={msg.id}
                                message={msg}
                                onRetry={(id) => {
                                    const m = messages.find((x) => x.id === id);
                                    if (m) sendMessage(m.content, m.attachments);
                                }}
                            />
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && <TypingIndicator />}
                    </div>
                )}
            </div>

            {/* Scroll-to-bottom FAB (visible when scrolled up with messages) */}
            {hasMessages && (
                <div className="relative">
                    <button
                        onClick={scrollToBottom}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 p-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-full shadow-lg transition-colors z-10"
                        aria-label="Scroll to bottom"
                    >
                        <ArrowDown className="w-4 h-4 text-neutral-300" />
                    </button>
                </div>
            )}

            {/* Chat Input */}
            <div className="px-4 sm:px-6 pb-2 sm:pb-4 pt-2">
                <ChatInput
                    onSend={handleSend}
                    disabled={false}
                    isStreaming={isStreaming}
                    onStopStreaming={stopStreaming}
                />
            </div>
        </div>
    );
}
