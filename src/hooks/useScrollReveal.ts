import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
}

/**
 * Lightweight IntersectionObserver-based scroll reveal.
 * Adds `data-revealed="true"` to each observed child element
 * when it enters the viewport. Pair with CSS animations on
 * [data-revealed] selector.
 */
const useScrollReveal = (options: ScrollRevealOptions = {}) => {
    const { threshold = 0.12, rootMargin = '0px 0px -60px 0px', once = true } = options;
    const containerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Respect prefers-reduced-motion
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            // Just mark everything as revealed immediately
            container.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
                el.dataset.revealed = 'true';
            });
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        (entry.target as HTMLElement).dataset.revealed = 'true';
                        if (once) observer.unobserve(entry.target);
                    } else if (!once) {
                        delete (entry.target as HTMLElement).dataset.revealed;
                    }
                });
            },
            { threshold, rootMargin }
        );

        const elements = container.querySelectorAll<HTMLElement>('.reveal');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return containerRef;
};

export default useScrollReveal;
