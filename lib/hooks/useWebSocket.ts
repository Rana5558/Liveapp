'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { setWsStatus } from '@/lib/features/chat/chatSlice';
import type { WsStatus, WsIncomingEvent } from '@/lib/types/chat';

interface UseWebSocketOptions {
    url: string | null;
    onMessage?: (event: WsIncomingEvent) => void;
    maxRetries?: number;
    enabled?: boolean;
}

const MAX_BACKOFF_MS = 16_000;

export function useWebSocket({
    url,
    onMessage,
    maxRetries = 5,
    enabled = true,
}: UseWebSocketOptions) {
    const dispatch = useAppDispatch();
    const wsRef = useRef<WebSocket | null>(null);
    const retriesRef = useRef(0);
    const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [status, setLocalStatus] = useState<WsStatus>('disconnected');

    const updateStatus = useCallback(
        (s: WsStatus) => {
            setLocalStatus(s);
            dispatch(setWsStatus(s));
        },
        [dispatch]
    );

    const cleanup = useCallback(() => {
        if (reconnectTimerRef.current) {
            clearTimeout(reconnectTimerRef.current);
            reconnectTimerRef.current = null;
        }
        if (wsRef.current) {
            wsRef.current.onopen = null;
            wsRef.current.onclose = null;
            wsRef.current.onerror = null;
            wsRef.current.onmessage = null;
            wsRef.current.close();
            wsRef.current = null;
        }
    }, []);

    const connect = useCallback(() => {
        if (!url || !enabled) return;

        cleanup();
        updateStatus('connecting');

        try {
            const ws = new WebSocket(url);
            wsRef.current = ws;

            ws.onopen = () => {
                retriesRef.current = 0;
                updateStatus('connected');
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data) as WsIncomingEvent;
                    onMessage?.(data);
                } catch {
                    // Ignore malformed messages
                }
            };

            ws.onerror = () => {
                // Error is followed by close, so reconnect logic lives in onclose
            };

            ws.onclose = () => {
                updateStatus('disconnected');
                wsRef.current = null;

                // Auto-reconnect with exponential backoff
                if (retriesRef.current < maxRetries && enabled) {
                    const delay = Math.min(1000 * 2 ** retriesRef.current, MAX_BACKOFF_MS);
                    retriesRef.current += 1;
                    reconnectTimerRef.current = setTimeout(connect, delay);
                }
            };
        } catch {
            updateStatus('disconnected');
        }
    }, [url, enabled, maxRetries, onMessage, cleanup, updateStatus]);

    // Connect on mount / URL change
    useEffect(() => {
        if (enabled && url) {
            connect();
        }
        return cleanup;
    }, [url, enabled, connect, cleanup]);

    // Handle browser online/offline events
    useEffect(() => {
        const handleOnline = () => {
            if (enabled && url && !wsRef.current) {
                retriesRef.current = 0;
                connect();
            }
        };
        const handleOffline = () => {
            cleanup();
            updateStatus('disconnected');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [enabled, url, connect, cleanup, updateStatus]);

    const sendWsMessage = useCallback(
        (data: unknown) => {
            if (wsRef.current?.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify(data));
            }
        },
        []
    );

    return { status, sendWsMessage, reconnect: connect };
}
