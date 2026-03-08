import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useSmoothScroll = () => {
  useEffect(() => {
    // Use native CSS smooth scroll — no Lenis needed.
    // This avoids memory leaks from mismatched ticker callbacks.
    document.documentElement.style.scrollBehavior = 'smooth';

    // Keep ScrollTrigger in sync with native scroll
    const onScroll = () => ScrollTrigger.update();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Handle anchor links for smooth navigation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
};

export default useSmoothScroll;
