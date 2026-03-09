'use client';

import React, { memo } from 'react';
import { Bot, User } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';
import MessageStatus from './MessageStatus';
import FilePreview from './FilePreview';
import type { ChatMessage as ChatMessageType } from '@/lib/types/chat';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
    message: ChatMessageType;
    onRetry?: (messageId: string) => void;
}

function formatTime(iso: string): string {
    try {
        return new Date(iso).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch {
        return '';
    }
}

function ChatMessageInner({ message, onRetry }: ChatMessageProps) {
    const isUser = message.role === 'user';

    return (
        <div
            className={cn(
                'flex items-start gap-3 px-4 py-2',
                isUser ? 'flex-row-reverse' : 'flex-row'
            )}
        >
            {/* Avatar */}
            <div
                className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                    isUser
                        ? 'bg-primary/20 border border-primary/30'
                        : 'bg-primary/20 border border-primary/30'
                )}
            >
                {isUser ? (
                    <User className="w-4 h-4 text-primary" />
                ) : (
                    <Bot className="w-4 h-4 text-primary" />
                )}
            </div>

            {/* Content */}
            <div
                className={cn(
                    'max-w-[75%] sm:max-w-[70%]',
                    isUser ? 'items-end' : 'items-start'
                )}
            >
                {/* Attachments (above bubble for user) */}
                {message.attachments && message.attachments.length > 0 && (
                    <div className="mb-1.5">
                        <FilePreview
                            files={message.attachments}
                            onRemove={() => {}}
                            removable={false}
                        />
                    </div>
                )}

                {/* Message Bubble */}
                <div
                    className={cn(
                        'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                        isUser
                            ? 'bg-primary text-white rounded-tr-sm'
                            : 'bg-neutral-800 text-neutral-100 rounded-tl-sm'
                    )}
                >
                    {isUser ? (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                    ) : (
                        <MarkdownRenderer content={message.content} />
                    )}
                </div>

                {/* Footer: time + status */}
                <div
                    className={cn(
                        'flex items-center gap-2 mt-1 px-1',
                        isUser ? 'justify-end' : 'justify-start'
                    )}
                >
                    <span className="text-[10px] text-neutral-500">
                        {formatTime(message.createdAt)}
                    </span>
                    {isUser && (
                        <MessageStatus
                            status={message.status}
                            onRetry={() => onRetry?.(message.id)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export const ChatMessage = memo(ChatMessageInner);
