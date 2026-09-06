'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { withBasePath } from '@/lib/paths';

interface LazyVideoProps {
    /** Path to the .mp4 file, e.g. "/projects/x/images/demo.mp4" */
    src: string;
    alt?: string;
    className?: string;
    /** Poster image path. Defaults to the video path with "-poster.webp". */
    /** Pass null when a video intentionally has no separate poster asset. */
    poster?: string | null;
    style?: CSSProperties;
    onLoadedData?: () => void;
    onError?: () => void;
    /** Distance outside the viewport at which the video source is attached. */
    loadMargin?: string;
}

/**
 * Lazy-loading looping video (replacement for animated GIFs).
 * Shows a lightweight poster thumbnail instantly; the video file is only
 * downloaded when the element scrolls near the viewport, then autoplays.
 */
export default function LazyVideo({ src, alt, className, poster, style, onLoadedData, onError, loadMargin = '400px' }: LazyVideoProps) {
    const ref = useRef<HTMLVideoElement>(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (typeof IntersectionObserver === 'undefined') {
            setShouldLoad(true);
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoad(true);
                    io.disconnect();
                }
            },
            { rootMargin: loadMargin }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [loadMargin]);

    useEffect(() => {
        if (shouldLoad) {
            ref.current?.play().catch(() => {
                /* autoplay rejection is fine; poster stays visible */
            });
        }
    }, [shouldLoad]);

    const posterSrc = poster === null ? undefined : (poster ?? src.replace(/\.mp4$/i, '-poster.webp'));

    return (
        <video
            ref={ref}
            src={shouldLoad ? withBasePath(src) : undefined}
            poster={posterSrc ? withBasePath(posterSrc) : undefined}
            className={className}
            style={style}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            aria-label={alt}
            onLoadedData={onLoadedData}
            onError={onError}
        />
    );
}
