"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseLazyBatchOptions {
  total: number;
  /** Reset visible count when this value changes (e.g. search query + filter). */
  resetKey: string;
  initial?: number;
  batchSize?: number;
}

export function useLazyBatch({
  total,
  resetKey,
  initial = 12,
  batchSize = 12,
}: UseLazyBatchOptions) {
  const [visibleCount, setVisibleCount] = useState(initial);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(initial);
  }, [resetKey, initial]);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + batchSize, total));
  }, [batchSize, total]);

  useEffect(() => {
    if (visibleCount >= total) return;

    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "240px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleCount, total, loadMore]);

  return {
    visibleCount,
    sentinelRef,
    hasMore: visibleCount < total,
  };
}
