'use client';

import { useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useWebSocket } from './useWebSocket';
import {
    addMessage,
    updateMessage,
    appendStreamToken,
    setStreaming,
    setTyping,
    setActiveConversation,
    addConversation,
    sendMessage as sendMessageThunk,
} from '@/lib/features/chat/chatSlice';
import type { ChatMessage, FileAttachment, WsIncomingEvent } from '@/lib/types/chat';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? null;
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.aliveai.ai/v1';

function generateId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function useChat() {
    const dispatch = useAppDispatch();
    const {
        messages,
        activeConversationId,
        isStreaming,
        isTyping,
        wsStatus,
    } = useAppSelector((state) => state.chat);

    const abortRef = useRef<AbortController | null>(null);
    const streamMsgIdRef = useRef<string | null>(null);

    // ── WebSocket Handler ───────────────────────────────────────
    const handleWsMessage = useCallback(
        (event: WsIncomingEvent) => {
            switch (event.type) {
                case 'typing':
                    dispatch(setTyping(true));
                    break;
                case 'message': {
                    dispatch(setTyping(false));
                    const msg = event.payload as unknown as ChatMessage;
                    dispatch(addMessage(msg));
                    break;
                }
                case 'stream_token': {
                    const { conversationId, messageId, token } = event.payload as {
                        conversationId: string;
                        messageId: string;
                        token: string;
                    };
                    dispatch(appendStreamToken({ conversationId, messageId, token }));
                    break;
                }
                case 'stream_end':
                    dispatch(setStreaming(false));
                    dispatch(setTyping(false));
                    break;
                case 'error':
                    dispatch(setStreaming(false));
                    dispatch(setTyping(false));
                    break;
            }
        },
        [dispatch]
    );

    const { status, sendWsMessage } = useWebSocket({
        url: WS_URL,
        onMessage: handleWsMessage,
        enabled: !!WS_URL,
    });

    // ── Current Conversation Messages ───────────────────────────
    const currentMessages = activeConversationId
        ? messages[activeConversationId] ?? []
        : [];

    // ── SSE Streaming ───────────────────────────────────────────
    const startStream = useCallback(
        async (conversationId: string) => {
            // Abort any existing stream
            abortRef.current?.abort();
            const controller = new AbortController();
            abortRef.current = controller;

            // Create placeholder assistant message
            const assistantMsgId = generateId();
            streamMsgIdRef.current = assistantMsgId;

            dispatch(
                addMessage({
                    id: assistantMsgId,
                    conversationId,
                    role: 'assistant',
                    content: '',
                    status: 'sending',
                    createdAt: new Date().toISOString(),
                })
            );
            dispatch(setStreaming(true));
            dispatch(setTyping(true));

            try {
                const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

                const response = await fetch(
                    `${API_URL}/chat/conversations/${conversationId}/stream`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            ...(token ? { Authorization: `Bearer ${token}` } : {}),
                        },
                        signal: controller.signal,
                    }
                );

                if (!response.ok || !response.body) {
                    throw new Error('Stream failed');
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let buffer = '';

                dispatch(setTyping(false));

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split('\n');
                    buffer = lines.pop() || '';

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6).trim();
                            if (data === '[DONE]') {
                                dispatch(
                                    updateMessage({
                                        conversationId,
                                        messageId: assistantMsgId,
                                        updates: { status: 'sent' },
                                    })
                                );
                                dispatch(setStreaming(false));
                                return;
                            }
                            try {
                                const parsed = JSON.parse(data) as { token?: string };
                                if (parsed.token) {
                                    dispatch(
                                        appendStreamToken({
                                            conversationId,
                                            messageId: assistantMsgId,
                                            token: parsed.token,
                                        })
                                    );
                                }
                            } catch {
                                // Skip malformed SSE data
                            }
                        }
                    }
                }

                // Stream ended naturally
                dispatch(
                    updateMessage({
                        conversationId,
                        messageId: assistantMsgId,
                        updates: { status: 'sent' },
                    })
                );
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    dispatch(
                        updateMessage({
                            conversationId,
                            messageId: assistantMsgId,
                            updates: { status: 'error', content: 'Failed to get AI response. Please try again.' },
                        })
                    );
                }
            } finally {
                dispatch(setStreaming(false));
                dispatch(setTyping(false));
                streamMsgIdRef.current = null;
            }
        },
        [dispatch]
    );

    // ── Send Message ────────────────────────────────────────────
    const handleSendMessage = useCallback(
        async (content: string, attachments?: FileAttachment[]) => {
            if (!content.trim() && (!attachments || attachments.length === 0)) return;

            const conversationId = activeConversationId || generateId();

            // If new conversation, create it
            if (!activeConversationId) {
                dispatch(setActiveConversation(conversationId));
                dispatch(
                    addConversation({
                        id: conversationId,
                        title: content.slice(0, 60),
                        lastMessage: content,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    })
                );
            }

            // Optimistically add user message
            const userMsg: ChatMessage = {
                id: generateId(),
                conversationId,
                role: 'user',
                content,
                status: 'sending',
                attachments,
                createdAt: new Date().toISOString(),
            };
            dispatch(addMessage(userMsg));

            // Send via API (fire-and-forget for optimistic UI)
            dispatch(
                sendMessageThunk({
                    conversationId,
                    content,
                    attachments,
                })
            ).then((result) => {
                if (sendMessageThunk.fulfilled.match(result)) {
                    dispatch(
                        updateMessage({
                            conversationId,
                            messageId: userMsg.id,
                            updates: { status: 'sent' },
                        })
                    );
                }
            });

            // Also notify via WebSocket if connected
            if (status === 'connected') {
                sendWsMessage({
                    type: 'send_message',
                    payload: { conversationId, content, attachments },
                });
            }

            // Start SSE stream for AI response
            await startStream(conversationId);
        },
        [activeConversationId, dispatch, sendWsMessage, startStream, status]
    );

    // ── Stop Streaming ──────────────────────────────────────────
    const stopStreaming = useCallback(() => {
        abortRef.current?.abort();
        dispatch(setStreaming(false));
        dispatch(setTyping(false));
    }, [dispatch]);

    return {
        messages: currentMessages,
        activeConversationId,
        isStreaming,
        isTyping,
        wsStatus,
        sendMessage: handleSendMessage,
        stopStreaming,
        setActiveConversation: (id: string | null) =>
            dispatch(setActiveConversation(id)),
    };
}
