import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Trophy, Medal, Star, ChevronLeft, ChevronRight, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Placeholder for certificate images - user will add certificate1.png to certificate15.png
const certificates = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Certificate ${i + 1}`,
  image: `/certificate${i + 1}.png`,
}));

const achievements = [
  {
    title: 'Mealzy – Innovative Food Web Solutions',
    position: '1st Place',
    description: 'First Prize for innovative food concept website at AIC Raise, Coimbatore',
    year: '2025',
    icon: Trophy,
    images: ['/hackathon1-1.png', '/hackathon1-2.png'],
  },
  {
    title: 'HACKSTRONAUTS - 24 Hr Challenge',
    position: '1st Place',
    description: 'Secured 1st Place by Exadata Club at SRM University Vadapalani, Chennai',
    year: '2025',
    icon: Trophy,
    images: ['/hackathon2-1.png', '/hackathon2-2.png'],
  },
  {
    title: 'New India Vibrant Hackathon',
    position: '2nd Place',
    description: 'Urban Governance Sector Grand Finale by Surat Municipal Corporation',
    year: '2023',
    icon: Medal,
    images: ['/hackathon3-1.png'],
  },
  {
    title: 'BIS Hackathon 2024',
    position: '3rd Place',
    description: 'Bureau of Indian Standards Hackathon - Innovation Challenge',
    year: '2024',
    icon: Medal,
    images: ['/hackathon4-1.png', '/hackathon4-2.png', '/hackathon4-3.png', '/hackathon4-4.png'],
  },
  {
    title: 'CodeCraft Hackathon',
    position: 'National Finalist',
    description: "CodeCraft at 'Calypso' tech fest, T.A Pai Management Institute, Manipal",
    year: '2024',
    icon: Star,
    images: ['/hackathon5-1.png'],
  },
  {
    title: 'Intellecthon 2k25',
    position: 'National Finalist',
    description: 'Software Innovation Hackathon at PSVPEC, Chennai',
    year: '2025',
    icon: Star,
    images: ['/hackathon6-1.png', '/hackathon6-2.png', '/hackathon6-3.png'],
  },
];

// Stacked Cards Component for Certificates
const StackedCertificates = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      setIsExpanded(true);
    } else {
      setActiveIndex(index);
    }
  };

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  return (
    <>
      <div className="relative h-[420px] flex items-center justify-center">
        <div ref={stackRef} className="relative w-[480px] h-[340px]">
          {certificates.map((cert, index) => {
            const offset = index - activeIndex;
            const isActive = index === activeIndex;
            const zIndex = certificates.length - Math.abs(offset);

            // Show only 5 cards around active
            if (Math.abs(offset) > 2) return null;

            return (
              <div
                key={cert.id}
                onClick={() => handleCardClick(index)}
                className="absolute inset-0 cursor-pointer transition-all duration-500 ease-out"
                style={{
                  transform: `
                    translateX(${offset * 40}px) 
                    translateY(${Math.abs(offset) * 10}px) 
                    rotateZ(${offset * 5}deg)
                    scale(${isActive ? 1 : 0.9 - Math.abs(offset) * 0.05})
                  `,
                  zIndex,
                  opacity: 1 - Math.abs(offset) * 0.2,
                }}
              >
                <div className={`w-full h-full rounded-2xl overflow-hidden border-2 ${isActive ? 'border-primary shadow-2xl shadow-primary/20' : 'border-border/50'
                  } bg-card transition-all duration-300`}>
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent flex items-end p-4">
                      <p className="text-sm font-medium text-foreground">{cert.name}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <button
          onClick={prevCard}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary transition-all"
          data-cursor-hover
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextCard}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary transition-all"
          data-cursor-hover
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Counter */}
      <div className="flex justify-center gap-2 mt-6">
        {certificates.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-primary w-6' : 'bg-foreground/20 hover:bg-foreground/40'
              }`}
          />
        ))}
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary transition-all"
          >
            <X size={24} />
          </button>
          <img
            src={certificates[activeIndex].image}
            alt={certificates[activeIndex].name}
            className="max-w-full max-h-[80vh] rounded-2xl border-2 border-primary/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        </div>
      )}
    </>
  );
};

// Hackathon Card with Image Carousel
const HackathonCard = ({ achievement }: { achievement: typeof achievements[0] }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % achievement.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + achievement.images.length) % achievement.images.length);
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.02,
        y: -8,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="achievement-card group bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden"
    >
      {/* Image Carousel */}
      <div className="relative h-48 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {achievement.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${achievement.title} - Image ${i + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          ))}
        </div>

        {/* Carousel Navigation */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground/70 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground/70 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={16} />
        </button>

        {/* Image Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {achievement.images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage(i);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentImage ? 'bg-primary w-4' : 'bg-white/50'
                }`}
            />
          ))}
        </div>

        {/* Position Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${achievement.position === '1st Place'
            ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-black'
            : achievement.position === '2nd Place'
              ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-black'
              : achievement.position === '3rd Place'
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white'
                : 'bg-gradient-to-r from-primary to-gradient-orange text-white'
            }`}>
            {achievement.position}
          </span>
        </div>

        {/* Year Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-xs font-mono bg-background/80 backdrop-blur-sm rounded-full text-primary">
            {achievement.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${achievement.position === '1st Place'
            ? 'bg-yellow-500/20'
            : achievement.position === '2nd Place'
              ? 'bg-gray-400/20'
              : achievement.position === '3rd Place'
                ? 'bg-amber-600/20'
                : 'bg-primary/20'
            }`}>
            <achievement.icon size={20} className={`${achievement.position === '1st Place'
              ? 'text-yellow-500'
              : achievement.position === '2nd Place'
                ? 'text-gray-400'
                : achievement.position === '3rd Place'
                  ? 'text-amber-600'
                  : 'text-primary'
              }`} />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {achievement.title}
            </h4>
          </div>
        </div>
        <p className="text-sm text-foreground/60 line-clamp-2">
          {achievement.description}
        </p>
      </div>
    </div>
  );
};

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const certs = certsRef.current;
    const achievementsContainer = achievementsRef.current;

    if (!section || !title || !certs || !achievementsContainer) return;

    // Title animation
    gsap.fromTo(title.children,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Certificates section animation
    gsap.fromTo(certs,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: certs,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Achievements animation
    const achievementCards = achievementsContainer.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, i) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Section Title */}
        <div ref={titleRef} className="mb-20 text-center">
          <p className="text-primary font-mono text-sm tracking-wider mb-2">// Recognition & Credentials</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Certifications & <span className="text-primary">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-gradient-orange to-gradient-crimson rounded-full mx-auto" />
        </div>

        {/* Stacked Certificates */}
        <div ref={certsRef} className="mb-28">
          <h3 className="text-2xl font-display font-semibold mb-10 text-center flex items-center justify-center gap-3">
            <Award className="text-primary" size={28} />
            <span>Certifications</span>
            <span className="text-sm font-mono text-foreground/50">({certificates.length})</span>
          </h3>
          <StackedCertificates />
          <p className="text-center text-sm text-foreground/50 mt-4">
            Click on the active card to view full size • Use arrows to browse
          </p>
        </div>

        {/* Hackathon Achievements */}
        <div ref={achievementsRef}>
          <h3 className="text-2xl font-display font-semibold mb-10 text-center flex items-center justify-center gap-3">
            <Trophy className="text-primary" size={28} />
            <span>Hackathon Achievements</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {achievements.map((achievement) => (
              <HackathonCard key={achievement.title} achievement={achievement} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
