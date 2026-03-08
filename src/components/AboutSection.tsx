import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, MapPin, Briefcase, Languages, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '8', label: 'Months Experience', icon: Briefcase },
  { value: '5+', label: 'Hackathon Wins', icon: Award },
  { value: '3+', label: 'Live Projects', icon: MapPin },
  { value: '4', label: 'Languages', icon: Languages },
];

const education = [
  { degree: "Master's in Computer Technology", school: 'Sri Krishna Arts and Science College', status: 'Pursuing' },
  { degree: 'B.Sc. AI & Machine Learning', school: 'Rathinam College of Arts & Science', status: 'CGPA: 7.45' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const content = contentRef.current;
    const statsContainer = statsRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !content || !statsContainer || !cards) return;

    // Title animation
    gsap.fromTo(title,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Content paragraphs
    const paragraphs = content.querySelectorAll('p');
    paragraphs.forEach((p, i) => {
      gsap.fromTo(p,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: p,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Stats counter animation
    const statItems = statsContainer.querySelectorAll('.stat-item');
    statItems.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsContainer,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Counter animation
      const valueEl = item.querySelector('.stat-value');
      if (valueEl) {
        const value = valueEl.textContent || '0';
        const numValue = parseInt(value);

        if (!isNaN(numValue)) {
          gsap.fromTo({ val: 0 },
            { val: 0 },
            {
              val: numValue,
              duration: 2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
              onUpdate: function () {
                valueEl.textContent = Math.floor(this.targets()[0].val) + '+';
              }
            }
          );
        }
      }
    });

    // Education cards
    const cardElements = cards.querySelectorAll('.edu-card');
    cardElements.forEach((card, i) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          x: i % 2 === 0 ? -60 : 60,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Hover animation
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.03,
          y: -10,
          boxShadow: '0 25px 50px -12px hsl(18, 99%, 54%, 0.25)',
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          boxShadow: 'none',
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });

    // Parallax for decorative elements
    const decorElements = section.querySelectorAll('.about-decor');
    decorElements.forEach(el => {
      gsap.to(el, {
        y: -100,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="about-decor absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-full" />
      <div className="about-decor absolute bottom-40 right-20 w-48 h-48 border border-gradient-crimson/10 rotate-45" />
      <div className="about-decor absolute top-1/2 left-1/4 w-4 h-4 bg-primary/30 rounded-full" />

      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="mb-20">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
          >
            <span className="text-primary">About</span> Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-gradient-orange rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <p className="text-lg text-foreground/90 leading-relaxed">
              I'm a passionate <span className="text-primary font-semibold">Front-End Developer</span> with
              expertise in React.js, TypeScript, Python, and Machine Learning. My journey in tech has been
              driven by a constant curiosity to build innovative solutions that make a real impact.
            </p>

            <p className="text-lg text-foreground/80 leading-relaxed">
              With hands-on experience from my internships at <span className="text-primary">Cybernault Edutech</span> and
              <span className="text-primary"> Mealzy</span>, I've developed scalable, user-focused applications
              that solve real-world problems. From full-stack chatting platforms with sentiment analysis to
              live client websites, I bring ideas to life.
            </p>

            <p className="text-lg text-foreground/80 leading-relaxed">
              Currently pursuing my Master's at Sri Krishna Arts and Science College, Coimbatore, I continue
              to push boundaries in web development and AI/ML, participating in hackathons and building
              projects that challenge conventional thinking.
            </p>

            {/* Languages */}
            <div className="pt-6">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <Languages size={20} />
                Languages I Speak
              </h3>
              <div className="flex flex-wrap gap-3">
                {['English', 'Tamil', 'Hindi', 'Urdu'].map((lang, i) => (
                  <span
                    key={lang}
                    className="px-4 py-2 bg-card border border-border/50 rounded-full text-sm text-foreground/80 hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats & Education */}
          <div className="space-y-10">
            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="stat-item card-glass rounded-2xl p-6 perspective-1000"
                >
                  <div className="icon-container mb-4">
                    <stat.icon size={28} className="text-primary" />
                  </div>
                  <div className="stat-value text-4xl font-display font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Education Cards */}
            <div ref={cardsRef} className="space-y-4">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <GraduationCap size={20} />
                Education
              </h3>
              {education.map((edu, i) => (
                <div
                  key={edu.degree}
                  className="edu-card card-ember rounded-2xl p-6 perspective-1000 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{edu.degree}</h4>
                      <p className="text-sm text-foreground/60">{edu.school}</p>
                    </div>
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                      {edu.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
