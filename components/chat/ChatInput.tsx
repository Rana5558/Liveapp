'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Send, Paperclip, Mic, Square } from 'lucide-react';
import FilePreview from './FilePreview';
import type { FileAttachment } from '@/lib/types/chat';

interface ChatInputProps {
    onSend: (content: string, attachments?: FileAttachment[]) => void;
    disabled?: boolean;
    isStreaming?: boolean;
    onStopStreaming?: () => void;
    placeholder?: string;
    initialValue?: string;
}

function generateFileId(): string {
    return `file_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export default function ChatInput({
    onSend,
    disabled = false,
    isStreaming = false,
    onStopStreaming,
    placeholder = 'Enter a prompt or pick a quick action above...',
    initialValue = '',
}: ChatInputProps) {
    const [message, setMessage] = useState(initialValue);
    const [files, setFiles] = useState<FileAttachment[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSend = useCallback(() => {
        const trimmed = message.trim();
        if (!trimmed && files.length === 0) return;

        onSend(trimmed, files.length > 0 ? files : undefined);
        setMessage('');
        setFiles([]);
    }, [message, files, onSend]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!disabled && !isStreaming) {
                handleSend();
            }
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;

        const newFiles: FileAttachment[] = Array.from(selectedFiles).map((file) => ({
            id: generateFileId(),
            name: file.name,
            type: file.type,
            size: file.size,
            previewUrl: file.type.startsWith('image/')
                ? URL.createObjectURL(file)
                : undefined,
        }));

        setFiles((prev) => [...prev, ...newFiles]);

        // Reset input so the same file can be re-selected
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemoveFile = (id: string) => {
        setFiles((prev) => {
            const removed = prev.find((f) => f.id === id);
            if (removed?.previewUrl) {
                URL.revokeObjectURL(removed.previewUrl);
            }
            return prev.filter((f) => f.id !== id);
        });
    };

    const canSend = (message.trim().length > 0 || files.length > 0) && !disabled;

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* File Previews */}
            {files.length > 0 && (
                <div className="mb-2">
                    <FilePreview files={files} onRemove={handleRemoveFile} />
                </div>
            )}

            {/* Input Bar */}
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 transition-all focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary/50">
                {/* Attachment */}
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled}
                    className="text-neutral-500 cursor-pointer hover:text-neutral-300 transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Attach file"
                >
                    <Paperclip className="w-4 h-4" />
                </button>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.txt,.csv"
                />

                {/* Text Input */}
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="flex-1 bg-transparent text-white placeholder-neutral-600 outline-none focus:outline-none focus:ring-0 text-xs sm:text-sm min-w-0 chat-input-no-border"
                />

                {/* Mic */}
                <button
                    disabled={disabled}
                    className="text-neutral-500 cursor-pointer hover:text-neutral-300 transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Voice input"
                >
                    <Mic className="w-4 h-4" />
                </button>

                {/* Send or Stop */}
                {isStreaming ? (
                    <button
                        onClick={onStopStreaming}
                        className="p-1.5 sm:p-2 bg-red-500 hover:bg-red-400 text-white rounded-lg sm:rounded-xl transition-colors shrink-0"
                        aria-label="Stop generating"
                    >
                        <Square className="w-3.5 h-3.5" />
                    </button>
                ) : (
                    <button
                        onClick={handleSend}
                        disabled={!canSend}
                        className="p-1.5 sm:p-2 bg-primary hover:bg-primary/90 text-white rounded-lg sm:rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                        aria-label="Send message"
                    >
                        <Send className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] sm:text-[11px] text-neutral-600 text-center px-4 mt-2">
                Free Research Preview. Alive.ai may produce inaccurate information.{' '}
                <span className="text-primary cursor-pointer hover:text-primary/80">
                    Alive.ai v2.0
                </span>
            </p>
        </div>
    );
}
