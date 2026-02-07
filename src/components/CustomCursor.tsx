import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const trails = trailsRef.current;

    if (!dot || !ring) return;

    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    const trailPositions = trails.map(() => ({ x: 0, y: 0 }));

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseDown = () => {
      gsap.to(ring, { scale: 0.8, duration: 0.2 });
      gsap.to(dot, { scale: 1.5, duration: 0.2 });
    };

    const handleMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.2 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const handleMouseEnterLink = () => {
      gsap.to(ring, { scale: 1.5, borderColor: 'hsl(18, 99%, 54%)', duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const handleMouseLeaveLink = () => {
      gsap.to(ring, { scale: 1, borderColor: 'hsl(18, 99%, 54%, 0.5)', duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const links = document.querySelectorAll('a, button, [data-cursor-hover]');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnterLink);
      link.addEventListener('mouseleave', handleMouseLeaveLink);
    });

    const animate = () => {
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;

      gsap.set(dot, { x: mouse.x - 4, y: mouse.y - 4 });
      gsap.set(ring, { x: pos.x - 20, y: pos.y - 20 });

      trails.forEach((trail, i) => {
        const prevPos = i === 0 ? pos : trailPositions[i - 1];
        trailPositions[i].x += (prevPos.x - trailPositions[i].x) * (0.15 - i * 0.02);
        trailPositions[i].y += (prevPos.y - trailPositions[i].y) * (0.15 - i * 0.02);
        if (trail) {
          gsap.set(trail, {
            x: trailPositions[i].x - 3,
            y: trailPositions[i].y - 3,
          });
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnterLink);
        link.removeEventListener('mouseleave', handleMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) trailsRef.current[i] = el; }}
          className="hidden md:block pointer-events-none fixed w-1.5 h-1.5 rounded-full z-[99997]"
          style={{
            background: `hsl(18, 99%, ${54 + i * 5}%, ${0.5 - i * 0.1})`,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
