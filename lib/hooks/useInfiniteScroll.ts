'use client';

import { useRef, useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
    hasMore: boolean;
    isLoading: boolean;
    onLoadMore: () => void;
    threshold?: number;       // IntersectionObserver threshold (0-1)
    rootMargin?: string;      // e.g. '100px'
}

export function useInfiniteScroll({
    hasMore,
    isLoading,
    onLoadMore,
    threshold = 0.1,
    rootMargin = '100px',
}: UseInfiniteScrollOptions) {
    const sentinelRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const observe = useCallback(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        if (!hasMore || isLoading) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting && hasMore && !isLoading) {
                    onLoadMore();
                }
            },
            { threshold, rootMargin }
        );

        if (sentinelRef.current) {
            observerRef.current.observe(sentinelRef.current);
        }
    }, [hasMore, isLoading, onLoadMore, threshold, rootMargin]);

    useEffect(() => {
        observe();
        return () => {
            observerRef.current?.disconnect();
        };
    }, [observe]);

    return { sentinelRef };
}
