import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const progressBar = progressRef.current;
    const percentText = percentRef.current;
    const text = textRef.current;

    if (!container || !progressBar || !percentText || !text) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(container, {
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          duration: 1,
          ease: 'power4.inOut',
          onComplete,
        });
      },
    });

    // Animate progress
    tl.to({ val: 0 }, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: function() {
        const currentVal = Math.round(this.targets()[0].val);
        setProgress(currentVal);
        gsap.set(progressBar, { scaleX: currentVal / 100 });
      },
    });

    // Text reveal
    const chars = text.querySelectorAll('.char');
    tl.fromTo(chars,
      { opacity: 0, y: 50, rotateY: -90 },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.7)',
      },
      0.5
    );

    // Pulse effect on completion
    tl.to(text, {
      scale: 1.1,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    }, '-=0.3');

  }, [onComplete]);

  const name = 'ABDUL MUNAF';

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-bg opacity-30" />

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Name */}
        <div ref={textRef} className="mb-8 perspective-1000">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold">
            {name.split('').map((char, i) => (
              <span 
                key={i} 
                className="char inline-block"
                style={{ color: i < 5 ? 'hsl(var(--primary))' : 'hsl(var(--foreground))' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-96 mx-auto">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              ref={progressRef}
              className="h-full bg-gradient-to-r from-primary via-gradient-orange to-gradient-crimson origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xs text-foreground/50 font-mono">LOADING</span>
            <span ref={percentRef} className="text-sm text-primary font-mono font-bold">
              {progress}%
            </span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 border border-primary/20 rounded-full animate-spin-slow" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 border border-gradient-orange/20 rounded-full animate-spin-slow" 
             style={{ animationDirection: 'reverse' }} />
      </div>
    </div>
  );
};

export default LoadingScreen;
