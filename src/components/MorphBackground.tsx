import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MorphBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blobs = container.querySelectorAll('.morph-blob');

    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        x: `random(-200, 200)`,
        y: `random(-200, 200)`,
        rotation: `random(-180, 180)`,
        duration: `random(15, 25)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 2,
      });
    });

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 50;
      const y = (clientY / window.innerHeight - 0.5) * 50;

      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: `+=${x * (i + 1) * 0.1}`,
          y: `+=${y * (i + 1) * 0.1}`,
          duration: 2,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="morph-bg">
      {/* Dark Base */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Crimson Blob */}
      <div
        className="morph-blob w-[600px] h-[600px]"
        style={{
          background: 'hsl(1, 98%, 39%)',
          top: '10%',
          left: '20%',
          opacity: 0.3,
        }}
      />
      
      {/* Orange Blob */}
      <div
        className="morph-blob w-[500px] h-[500px]"
        style={{
          background: 'hsl(22, 97%, 48%)',
          top: '50%',
          right: '10%',
          opacity: 0.25,
        }}
      />
      
      {/* Sand Blob */}
      <div
        className="morph-blob w-[700px] h-[700px]"
        style={{
          background: 'hsl(28, 36%, 75%)',
          bottom: '0%',
          left: '30%',
          opacity: 0.15,
        }}
      />
      
      {/* Additional Small Blobs */}
      <div
        className="morph-blob w-[300px] h-[300px]"
        style={{
          background: 'hsl(18, 99%, 54%)',
          top: '60%',
          left: '10%',
          opacity: 0.2,
        }}
      />
      
      <div
        className="morph-blob w-[400px] h-[400px]"
        style={{
          background: 'hsl(1, 98%, 39%)',
          top: '20%',
          right: '30%',
          opacity: 0.15,
        }}
      />

      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80" />
    </div>
  );
};

export default MorphBackground;
