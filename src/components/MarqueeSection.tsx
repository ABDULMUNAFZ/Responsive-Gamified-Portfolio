import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  'React.js', 'TypeScript', 'Python', 'Node.js', 'Three.js', 'GSAP', 
  'MongoDB', 'Flask', 'PyTorch', 'OpenCV', 'YOLO', 'Webflow', 
  'Tailwind CSS', 'Git', 'Netlify', 'Figma'
];

const MarqueeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;

    if (!section || !row1 || !row2) return;

    // Scroll-based speed variation
    gsap.to(row1, {
      xPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    gsap.to(row2, {
      xPercent: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

  }, []);

  return (
    <div ref={sectionRef} className="py-20 overflow-hidden bg-gradient-to-b from-transparent via-card/50 to-transparent">
      {/* Row 1 - Moving Left */}
      <div className="mb-8 -rotate-1">
        <div ref={row1Ref} className="flex whitespace-nowrap">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex">
              {technologies.map((tech, i) => (
                <span
                  key={`${setIndex}-${i}`}
                  className="mx-6 text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground/10 hover:text-primary/30 transition-colors duration-300 cursor-default"
                >
                  {tech}
                  <span className="text-primary mx-4">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Moving Right */}
      <div className="rotate-1">
        <div ref={row2Ref} className="flex whitespace-nowrap" style={{ transform: 'translateX(-50%)' }}>
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex">
              {[...technologies].reverse().map((tech, i) => (
                <span
                  key={`${setIndex}-${i}`}
                  className="mx-6 text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground/5 hover:text-primary/20 transition-colors duration-300 cursor-default"
                >
                  {tech}
                  <span className="text-gradient-orange/30 mx-4">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeSection;
