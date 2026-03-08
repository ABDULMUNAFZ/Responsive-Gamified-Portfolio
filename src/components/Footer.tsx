import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, ArrowUp, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const marquee = marqueeRef.current;

    if (!footer) return;

    // Footer reveal animation
    gsap.fromTo(footer,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      }
    );

  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative py-16 border-t border-border/30">
      {/* Marquee Text */}
      <div ref={marqueeRef} className="overflow-hidden mb-16">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-6xl md:text-8xl font-display font-bold text-foreground/5 mx-8">
              ABDUL MUNAF • FRONTEND DEVELOPER • REACT • TYPESCRIPT •
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="inline-block mb-4">
              <span className="text-3xl font-display font-bold text-primary">AM</span>
              <span className="text-3xl font-display font-light text-foreground">.dev</span>
            </a>
            <p className="text-sm text-foreground/50 text-center md:text-left">
              Developed by{' '}
              <a
                href="https://linkedin.com/in/abdul-munaf-z-6380a8251"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
                data-cursor-hover
              >
                Abdul Munaf <ExternalLink size={12} />
              </a>
            </p>

            <p className="text-xs text-foreground/30 mt-1">
              © 2026 All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(`#${link.toLowerCase()}`);
                  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="text-foreground/60 hover:text-primary transition-colors"
                data-cursor-hover
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social & Back to Top */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ABDULMUNAFZ"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border/50 text-foreground/50 hover:text-primary hover:border-primary transition-all"
              data-cursor-hover
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/abdul-munaf-z-6380a8251"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border/50 text-foreground/50 hover:text-primary hover:border-primary transition-all"
              data-cursor-hover
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:z.abdulmunaf@gmail.com"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border/50 text-foreground/50 hover:text-primary hover:border-primary transition-all"
              data-cursor-hover
            >
              <Mail size={18} />
            </a>

            {/* Divider */}
            <div className="w-px h-8 bg-border/50 mx-2" />

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 transition-all"
              data-cursor-hover
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
