import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Calendar, MapPin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'Mealzy',
    role: 'Frontend Developer Intern',
    duration: 'June 2025 – July 2025',
    location: 'Onsite',
    description: 'Working on real-time frontend development using React.js, focusing on responsive UI components and user-centric design patterns.',
    highlights: [
      'Developed responsive UI components',
      'Real-time frontend development',
      'React.js implementation',
      'User-focused solutions',
    ],
    color: 'from-primary to-gradient-orange',
  },
  {
    company: 'Cybernault Edutech',
    role: 'Full Stack Developer Intern',
    duration: 'Dec 2024 – May 2025',
    location: 'Remote',
    description: 'Gained hands-on experience in full-stack development, working with modern technologies to build scalable web applications.',
    highlights: [
      'Full-stack web development',
      'Scalable application architecture',
      'Backend API development',
      'Database management',
    ],
    color: 'from-gradient-crimson to-primary',
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const timeline = timelineRef.current;

    if (!section || !title || !timeline) return;

    // Title animation
    gsap.fromTo(title.children,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Timeline line animation
    const timelineLine = timeline.querySelector('.timeline-line-animated');
    if (timelineLine) {
      gsap.fromTo(timelineLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      );
    }

    // Experience cards animation
    const cards = timeline.querySelectorAll('.exp-card');
    cards.forEach((card, i) => {
      const isLeft = i % 2 === 0;
      
      gsap.fromTo(card,
        { 
          opacity: 0, 
          x: isLeft ? -100 : 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline dot animation
      const dot = card.querySelector('.timeline-dot-item');
      if (dot) {
        gsap.fromTo(dot,
          { scale: 0, rotate: -180 },
          {
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Highlights stagger animation
      const highlights = card.querySelectorAll('.highlight-item');
      highlights.forEach((item, j) => {
        gsap.fromTo(item,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            delay: 0.3 + j * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Hover effect
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          y: -5,
          boxShadow: '0 30px 60px -15px hsl(18, 99%, 54%, 0.25)',
          duration: 0.4,
          ease: 'power2.out',
        });
        
        gsap.to(card.querySelector('.card-glow'), {
          opacity: 0.5,
          duration: 0.4,
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          boxShadow: 'none',
          duration: 0.4,
          ease: 'power2.out',
        });
        
        gsap.to(card.querySelector('.card-glow'), {
          opacity: 0,
          duration: 0.4,
        });
      });
    });

  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="experience"
      className="relative py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-crimson/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-orange/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        {/* Section Title */}
        <div ref={titleRef} className="mb-20">
          <p className="text-primary font-mono text-sm tracking-wider mb-2">// My Journey</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-gradient-orange to-gradient-crimson rounded-full" />
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-border/30 -translate-x-1/2">
            <div className="timeline-line-animated absolute inset-0 bg-gradient-to-b from-primary via-gradient-orange to-gradient-crimson origin-top" />
          </div>

          {/* Experience Cards */}
          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <div 
                key={exp.company}
                className={`exp-card relative flex flex-col lg:flex-row gap-8 ${
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="timeline-dot-item absolute left-8 lg:left-1/2 top-8 w-4 h-4 -translate-x-1/2">
                  <div className={`w-full h-full rounded-full bg-gradient-to-r ${exp.color}`} />
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${exp.color} animate-ping-slow`} />
                </div>

                {/* Content Card */}
                <div 
                  className={`ml-16 lg:ml-0 lg:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'
                  }`}
                >
                  <div className="relative card-ember rounded-2xl p-6 overflow-hidden cursor-pointer">
                    {/* Glow Effect */}
                    <div className={`card-glow absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                            {exp.company}
                            <ArrowUpRight size={18} className="text-primary" />
                          </h3>
                          <p className="text-primary font-medium">{exp.role}</p>
                        </div>
                        <div className="icon-container shrink-0">
                          <Building2 size={24} className="text-primary" />
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-foreground/60">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} className="text-primary" />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} className="text-primary" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-foreground/80 mb-4 text-sm leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-2">
                        {exp.highlights.map((highlight, j) => (
                          <div 
                            key={j}
                            className="highlight-item flex items-center gap-2 text-sm"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${exp.color}`} />
                            <span className="text-foreground/70">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date Badge (opposite side) */}
                <div className={`hidden lg:flex lg:w-[calc(50%-2rem)] items-start justify-${i % 2 === 0 ? 'start' : 'end'} pt-8`}>
                  <span className={`px-4 py-2 bg-gradient-to-r ${exp.color} text-background text-sm font-semibold rounded-full`}>
                    {exp.duration.split('–')[0].trim()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
