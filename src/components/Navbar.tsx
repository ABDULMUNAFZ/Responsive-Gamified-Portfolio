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
    const nav = navRef.current;
    const logo = logoRef.current;
    const links = linksRef.current;

    if (!nav || !logo || !links) return;

    // Initial animation
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(logo, 
      { opacity: 0, x: -50, rotateY: -90 },
      { opacity: 1, x: 0, rotateY: 0, duration: 1, ease: 'power3.out' }
    );

    const linkElements = links.querySelectorAll('a');
    tl.fromTo(linkElements,
      { opacity: 0, y: -30, rotateX: 90 },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0, 
        duration: 0.6, 
        stagger: 0.1,
        ease: 'back.out(1.7)'
      },
      '-=0.5'
    );

    // Scroll handler
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.mobile-nav-item',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: href, offsetY: 80 },
        ease: 'power3.inOut',
      });
    }
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div ref={logoRef} className="perspective-1000">
          <a 
            href="#hero" 
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="relative group"
          >
            <span className="text-2xl md:text-3xl font-display font-bold text-primary text-glow">
              AM
            </span>
            <span className="text-2xl md:text-3xl font-display font-light text-foreground ml-1">
              .dev
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div ref={linksRef} className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 group"
              data-cursor-hover
            >
              <span className="relative z-10">{item.name}</span>
              <span className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors"
          data-cursor-hover
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 overflow-hidden transition-all duration-500 ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="container mx-auto px-6 py-6 space-y-4">
          {navItems.map((item, i) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="mobile-nav-item block py-3 text-lg font-medium text-foreground hover:text-primary transition-colors border-b border-border/30"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="text-primary/50 mr-3 font-mono text-sm">0{i + 1}.</span>
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
