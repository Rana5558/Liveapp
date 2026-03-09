'use client';

import React from 'react';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import type { MessageStatus as Status } from '@/lib/types/chat';

interface MessageStatusProps {
    status: Status;
    onRetry?: () => void;
}

export default function MessageStatus({ status, onRetry }: MessageStatusProps) {
    switch (status) {
        case 'sending':
            return (
                <span className="inline-flex items-center text-neutral-500" aria-label="Sending">
                    <Loader2 className="w-3 h-3 animate-spin" />
                </span>
            );
        case 'sent':
            return (
                <span className="inline-flex items-center text-green-500" aria-label="Sent">
                    <Check className="w-3 h-3" />
                </span>
            );
        case 'error':
            return (
                <button
                    onClick={onRetry}
                    className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors text-[10px]"
                    aria-label="Message failed, click to retry"
                >
                    <AlertCircle className="w-3 h-3" />
                    <span>Retry</span>
                </button>
            );
        default:
            return null;
    }
}
