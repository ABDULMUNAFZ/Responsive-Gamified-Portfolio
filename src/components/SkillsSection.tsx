import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Brain, Layout, Wrench, Server, Palette, MessageSquare, Lightbulb, Users, Clock, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const technicalSkills = [
  {
    category: 'Programming',
    icon: Code,
    skills: [
      { name: 'Python', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript', level: 90 },
      { name: 'HTML5/CSS3', level: 95 },
    ],
  },
  {
    category: 'AI/ML',
    icon: Brain,
    skills: [
      { name: 'YOLO V8', level: 80 },
      { name: 'OpenCV', level: 75 },
      { name: 'PyTorch', level: 70 },
      { name: 'Twilio', level: 65 },
    ],
  },
  {
    category: 'Frontend',
    icon: Layout,
    skills: [
      { name: 'React.js', level: 92 },
      { name: 'Three.js', level: 70 },
      { name: 'Spline', level: 75 },
      { name: 'Webflow', level: 80 },
    ],
  },
  {
    category: 'Tools',
    icon: Wrench,
    skills: [
      { name: 'Git', level: 88 },
      { name: 'VS Code', level: 95 },
      { name: 'BitBucket', level: 80 },
      { name: 'PyCharm', level: 85 },
    ],
  },
  {
    category: 'Backend/Cloud',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 82 },
      { name: 'Flask', level: 78 },
      { name: 'Netlify', level: 90 },
      { name: 'Hostinger', level: 85 },
    ],
  },
  {
    category: 'Design',
    icon: Palette,
    skills: [
      { name: 'Rhino', level: 65 },
      { name: 'Adobe Suite', level: 75 },
      { name: 'WordPress', level: 80 },
      { name: 'Figma', level: 72 },
    ],
  },
];

const softSkills = [
  { name: 'Communication', icon: MessageSquare },
  { name: 'Problem Solving', icon: Lightbulb },
  { name: 'Adaptability', icon: Zap },
  { name: 'Teamwork', icon: Users },
  { name: 'Time Management', icon: Clock },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const softSkillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;
    const softSkillsContainer = softSkillsRef.current;

    if (!section || !title || !cards || !softSkillsContainer) return;

    // Title animation
    gsap.fromTo(title.children,
      { opacity: 0, y: 80, rotateX: -45 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
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

    // Skill cards animation
    const cardElements = cards.querySelectorAll('.skill-card');
    cardElements.forEach((card, i) => {
      const delay = i * 0.1;
      
      gsap.fromTo(card,
        { 
          opacity: 0, 
          y: 80,
          scale: 0.9,
          rotateY: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Skill bars animation
      const skillBars = card.querySelectorAll('.skill-progress');
      skillBars.forEach((bar, j) => {
        const level = bar.getAttribute('data-level') || '0';
        
        gsap.fromTo(bar,
          { scaleX: 0 },
          {
            scaleX: parseInt(level) / 100,
            duration: 1.5,
            delay: delay + 0.3 + j * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Hover effects
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          y: -8,
          boxShadow: '0 30px 60px -15px hsl(18, 99%, 54%, 0.2)',
          duration: 0.4,
          ease: 'power2.out',
        });
        
        const icon = card.querySelector('.skill-icon');
        if (icon) {
          gsap.to(icon, {
            rotate: 360,
            scale: 1.1,
            duration: 0.6,
            ease: 'back.out(1.7)',
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          boxShadow: 'none',
          duration: 0.4,
          ease: 'power2.out',
        });
        
        const icon = card.querySelector('.skill-icon');
        if (icon) {
          gsap.to(icon, {
            rotate: 0,
            scale: 1,
            duration: 0.4,
          });
        }
      });
    });

    // Soft skills animation
    const softItems = softSkillsContainer.querySelectorAll('.soft-skill');
    softItems.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, scale: 0, rotate: -180 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: softSkillsContainer,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating animation
      gsap.to(item, {
        y: `random(-5, 5)`,
        x: `random(-3, 3)`,
        rotation: `random(-3, 3)`,
        duration: `random(2, 3)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      });
    });

  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="skills"
      className="relative py-32 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Section Title */}
        <div ref={titleRef} className="mb-20 perspective-1000">
          <p className="text-primary font-mono text-sm tracking-wider mb-2">// What I Work With</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-gradient-orange to-gradient-crimson rounded-full" />
        </div>

        {/* Skills Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {technicalSkills.map((category, i) => (
            <div 
              key={category.category}
              className="skill-card card-gradient rounded-2xl p-6 perspective-1000 cursor-pointer"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="skill-icon icon-container">
                  <category.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{category.category}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-foreground/80">{skill.name}</span>
                      <span className="text-sm text-primary font-mono">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress"
                        data-level={skill.level}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills */}
        <div ref={softSkillsRef}>
          <h3 className="text-2xl font-display font-semibold mb-8 text-center">
            Soft <span className="text-primary">Skills</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {softSkills.map((skill) => (
              <div 
                key={skill.name}
                className="soft-skill flex items-center gap-3 px-6 py-3 card-glass rounded-full hover:bg-primary/10 transition-colors duration-300 cursor-pointer"
                data-cursor-hover
              >
                <skill.icon size={20} className="text-primary" />
                <span className="text-foreground/80">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
