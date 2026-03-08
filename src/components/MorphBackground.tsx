import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MorphBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blobs = container.querySelectorAll('.morph-blob-elem');

    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        duration: `random(15, 25)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 2,
      });
    });

    return () => {
      gsap.killTweensOf('.morph-blob-elem');
    };
  }, []);

  return (
    <div ref={containerRef} className="morph-bg">
      {/* Light Beige Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Orange Blob */}
      <div
        className="morph-blob-elem absolute rounded-full"
        style={{
          background: '#EC802B',
          width: '500px',
          height: '500px',
          top: '5%',
          left: '-10%',
          opacity: 0.08,
          filter: 'blur(80px)',
        }}
      />

      {/* Teal Blob */}
      <div
        className="morph-blob-elem absolute rounded-full"
        style={{
          background: '#66BCB4',
          width: '600px',
          height: '600px',
          top: '40%',
          right: '-15%',
          opacity: 0.1,
          filter: 'blur(90px)',
        }}
      />

      {/* Yellow Blob */}
      <div
        className="morph-blob-elem absolute rounded-full"
        style={{
          background: '#EDC55B',
          width: '400px',
          height: '400px',
          bottom: '5%',
          left: '20%',
          opacity: 0.12,
          filter: 'blur(70px)',
        }}
      />
    </div>
  );
};

export default MorphBackground;
