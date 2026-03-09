'use client';

import React from 'react';
import { Bot } from 'lucide-react';

export default function TypingIndicator() {
    return (
        <div className="flex items-start gap-3 px-4 py-2">
            {/* AI Avatar */}
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary" />
            </div>

            {/* Dots */}
            <div className="bg-neutral-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-typing-dot" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-typing-dot" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-typing-dot" style={{ animationDelay: '300ms' }} />
            </div>
        </div>
    );
}
