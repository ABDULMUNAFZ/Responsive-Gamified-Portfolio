import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const logo = logoRef.current;
    const links = linksRef.current;
    if (!logo || !links) return;

    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(logo,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
    );
    const linkElements = links.querySelectorAll('a');
    tl.fromTo(linkElements,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)' },
      '-=0.4'
    );

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.mobile-nav-item',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.07, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav ref={navRef} className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center px-4 gap-2">

      {/* ── Pill bar (desktop + hamburger trigger) ── */}
      <div
        className={`w-full max-w-7xl rounded-full border transition-all duration-500 ${scrolled ? 'border-white/25 shadow-2xl shadow-black/15' : 'border-white/15'
          }`}
        style={{ background: '#66BCB4' }}
      >
        <div className="px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef}>
            <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="relative group flex items-center gap-0.5">
              <span className="text-2xl font-display font-bold" style={{ color: '#EDC55B' }}>AM</span>
              <span className="text-2xl font-display font-semibold" style={{ color: '#EC802B' }}>.dev</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white/40 transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          </div>

          {/* Desktop links */}
          <div ref={linksRef} className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="relative px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 group"
                style={{ color: '#EC802B' }}
                data-cursor-hover
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200" />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors"
            style={{ color: '#EC802B' }}
            data-cursor-hover
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown — separate box, NOT inside the pill ── */}
      {isOpen && (
        <div
          className="md:hidden w-full max-w-7xl rounded-2xl border border-white/20 overflow-hidden shadow-xl"
          style={{ background: '#66BCB4' }}
        >
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item, i) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="mobile-nav-item flex items-center gap-3 py-2.5 px-4 rounded-xl hover:bg-white/20 transition-all"
                style={{ color: '#EC802B' }}
              >
                <span className="font-mono text-xs opacity-50">0{i + 1}.</span>
                <span className="font-semibold text-sm">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
