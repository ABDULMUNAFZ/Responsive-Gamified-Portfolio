import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Github, Linkedin, Mail, ExternalLink, Sparkles, Code2, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const orbsContainerRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subHeading = subHeadingRef.current;
    const cta = ctaRef.current;
    const social = socialRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const orbs = orbsContainerRef.current;

    if (!section || !heading || !subHeading || !cta || !social || !scrollIndicator || !orbs) return;

    // Mouse move effect for magnetic elements
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePos({ x: clientX, y: clientY });

      // Parallax orbs
      const orbElements = orbs.querySelectorAll('.floating-orb');
      orbElements.forEach((orb, i) => {
        const speed = (i + 1) * 0.02;
        gsap.to(orb, {
          x: (clientX - window.innerWidth / 2) * speed,
          y: (clientY - window.innerHeight / 2) * speed,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Split text animation with creative reveal
    const firstName = 'Abdul';
    const lastName = 'Munaf';

    heading.innerHTML = `
      <span class="inline-block overflow-hidden">
        <span class="first-name inline-block">${firstName.split('').map(char =>
      `<span class="char inline-block">${char}</span>`
    ).join('')}</span>
      </span>
      <br class="md:hidden" />
      <span class="inline-block overflow-hidden ml-0 md:ml-6">
        <span class="last-name inline-block">${lastName.split('').map(char =>
      `<span class="char inline-block">${char}</span>`
    ).join('')}</span>
      </span>
    `;

    const firstNameChars = heading.querySelectorAll('.first-name .char');
    const lastNameChars = heading.querySelectorAll('.last-name .char');

    const tl = gsap.timeline({ delay: 1 });

    // Staggered entrance for first name
    tl.fromTo(firstNameChars,
      {
        opacity: 0,
        y: 120,
        rotateX: -90,
        scale: 0.5,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.05,
        ease: 'back.out(1.7)',
      }
    );

    // Last name with different effect
    tl.fromTo(lastNameChars,
      {
        opacity: 0,
        x: 80,
        rotateY: 90,
        scale: 0.3,
      },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.04,
        ease: 'elastic.out(1, 0.5)',
      },
      '-=0.4'
    );

    // Subheading slide-in with clip-path
    tl.fromTo(subHeading,
      {
        opacity: 0,
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        y: 30,
      },
      {
        opacity: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        y: 0,
        duration: 1.2,
        ease: 'power4.inOut',
      },
      '-=0.3'
    );

    // CTA buttons with bounce
    const ctaButtons = cta.querySelectorAll('.cta-btn');
    tl.fromTo(ctaButtons,
      { opacity: 0, y: 60, scale: 0.6, rotateZ: -5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateZ: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'back.out(2)',
      },
      '-=0.6'
    );

    // Social icons spiral in
    const socialIcons = social.querySelectorAll('a');
    tl.fromTo(socialIcons,
      { opacity: 0, scale: 0, rotate: -360 },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(3)',
      },
      '-=0.4'
    );

    // Floating orbs entrance
    const orbElements = orbs.querySelectorAll('.floating-orb');
    tl.fromTo(orbElements,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'elastic.out(1, 0.3)',
      },
      '-=1'
    );

    // Scroll indicator
    tl.fromTo(scrollIndicator,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.5'
    );

    // Continuous floating animation for orbs
    orbElements.forEach((orb, i) => {
      gsap.to(orb, {
        y: `random(-40, 40)`,
        x: `random(-30, 30)`,
        rotation: `random(-20, 20)`,
        scale: `random(0.9, 1.1)`,
        duration: `random(4, 7)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      });
    });

    // Scroll parallax effects
    gsap.to(heading, {
      y: 150,
      opacity: 0.2,
      scale: 0.95,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    gsap.to(subHeading, {
      y: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'center top',
        scrub: 1.5,
      },
    });

    gsap.to(orbs, {
      y: 200,
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      },
    });

    // Scroll indicator pulse
    gsap.to(scrollIndicator, {
      y: 15,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Interactive Floating Orbs */}
      <div ref={orbsContainerRef} className="absolute inset-0 pointer-events-none">
        {/* Primary glow orb */}
        <div className="floating-orb absolute top-1/4 left-[15%] w-32 h-32 rounded-full bg-gradient-to-br from-primary/40 to-gradient-orange/30 blur-2xl" />

        {/* Secondary orbs */}
        <div className="floating-orb absolute top-1/3 right-[20%] w-24 h-24 rounded-full bg-gradient-to-br from-gradient-crimson/30 to-primary/20 blur-xl" />
        <div className="floating-orb absolute bottom-1/4 left-[25%] w-20 h-20 rounded-full bg-gradient-to-br from-gradient-orange/30 to-gradient-sand/20 blur-xl" />
        <div className="floating-orb absolute top-[60%] right-[30%] w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-gradient-crimson/20 blur-2xl" />

        {/* Small accent orbs */}
        <div className="floating-orb absolute top-1/5 left-[45%] w-8 h-8 rounded-full bg-primary/50 blur-sm" />
        <div className="floating-orb absolute bottom-1/3 right-[15%] w-10 h-10 rounded-full bg-gradient-orange/40 blur-sm" />
        <div className="floating-orb absolute top-[45%] left-[10%] w-6 h-6 rounded-full bg-gradient-sand/50 blur-sm" />

        {/* Geometric shapes */}
        <div className="floating-orb absolute top-1/4 right-[10%] w-16 h-16 border-2 border-primary/20 rounded-xl rotate-45" />
        <div className="floating-orb absolute bottom-[20%] left-[35%] w-12 h-12 border border-gradient-orange/30" />
        <div className="floating-orb absolute top-[70%] right-[40%] w-20 h-20 border-2 border-gradient-crimson/15 rounded-full" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute left-1/5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
          <div className="absolute left-2/5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
          <div className="absolute left-3/5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
          <div className="absolute left-4/5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center" ref={magneticRef}>
          {/* Status Badge */}
          <div className="mb-8 overflow-hidden">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground/80">Available for opportunities</span>
              <Sparkles size={14} className="text-primary" />
            </div>
          </div>

          {/* Role Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono bg-gradient-to-r from-primary/10 to-gradient-orange/10 border border-primary/20 rounded-full text-primary">
              <Code2 size={12} />
              Full-Stack Developer
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono bg-gradient-to-r from-gradient-orange/10 to-gradient-crimson/10 border border-gradient-orange/20 rounded-full text-gradient-orange">
              <Zap size={12} />
              React & TypeScript
            </span>
          </div>

          {/* Name - Big Typography */}
          <h1
            ref={headingRef}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-display font-black mb-8 perspective-1000 leading-[0.9] tracking-tight"
          >
            Abdul Munaf
          </h1>

          {/* Subtitle */}
          <p
            ref={subHeadingRef}
            className="text-lg md:text-xl lg:text-2xl text-foreground/70 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Crafting <span className="text-primary font-semibold relative inline-block">
              digital experiences
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-gradient-orange" />
            </span> that blend
            creativity with cutting-edge technology. Specialized in
            <span className="text-gradient-orange font-semibold"> React.js</span>,
            <span className="text-gradient-crimson font-semibold"> Python</span> &
            <span className="text-primary font-semibold"> Machine Learning</span>.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-5 mb-10">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="cta-btn group relative px-10 py-5 bg-primary text-primary-foreground font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40"
              data-cursor-hover
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore My Work
                <ArrowDown size={18} className="rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="cta-btn group relative px-10 py-5 bg-transparent border-2 border-foreground/20 text-foreground font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary"
              data-cursor-hover
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:text-primary transition-colors">
                Let's Connect
                <Mail size={18} className="group-hover:rotate-12 transition-transform" />
              </span>
            </a>
          </div>



          {/* Social Links */}
          <div ref={socialRef} className="flex items-center justify-center gap-5">
            {[
              { icon: Github, href: 'https://github.com/ABDULMUNAFZ', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/abdul-munaf-z-6380a8251', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:z.abdulmunaf@gmail.com', label: 'Email' },
              { icon: ExternalLink, href: 'https://abdulmunafsportfolio.netlify.app', label: 'Portfolio' },
            ].map((social, i) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group relative w-14 h-14 flex items-center justify-center rounded-2xl border border-border/30 text-foreground/60 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                data-cursor-hover
                aria-label={social.label}
              >
                <social.icon size={22} className="group-hover:scale-110 transition-transform" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
        data-cursor-hover
      >
        <span className="text-xs font-mono text-foreground/40 tracking-[0.3em] group-hover:text-primary transition-colors">SCROLL</span>
        <div className="w-7 h-12 border-2 border-foreground/20 rounded-full flex items-start justify-center p-2 group-hover:border-primary/50 transition-colors">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
        </div>
      </div>

      {/* Side Decorations */}
      <div className="absolute bottom-24 right-8 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-border to-primary" />
        <p className="text-xs font-mono text-foreground/30 tracking-widest writing-mode-vertical rotate-180" style={{ writingMode: 'vertical-rl' }}>
          COIMBATORE • 2025
        </p>
      </div>

      <div className="absolute bottom-24 left-8 hidden lg:flex flex-col items-center gap-4">
        <p className="text-xs font-mono text-foreground/30 tracking-widest" style={{ writingMode: 'vertical-rl' }}>
          PORTFOLIO V2.0
        </p>
        <div className="w-px h-24 bg-gradient-to-b from-primary via-border to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
