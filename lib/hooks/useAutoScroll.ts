'use client';

import { useRef, useEffect, useCallback } from 'react';

const SCROLL_THRESHOLD = 100; // px from bottom before auto-scroll is disabled

export function useAutoScroll<T>(deps: T[]) {
    const containerRef = useRef<HTMLDivElement>(null);
    const shouldAutoScroll = useRef(true);

    const handleScroll = useCallback(() => {
        const el = containerRef.current;
        if (!el) return;

        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        shouldAutoScroll.current = distanceFromBottom < SCROLL_THRESHOLD;
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        el.addEventListener('scroll', handleScroll, { passive: true });
        return () => el.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        if (shouldAutoScroll.current) {
            const el = containerRef.current;
            if (el) {
                el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deps.length]);

    const scrollToBottom = useCallback(() => {
        const el = containerRef.current;
        if (el) {
            shouldAutoScroll.current = true;
            el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
        }
    }, []);

    return { containerRef, scrollToBottom };
}
