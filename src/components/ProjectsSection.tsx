import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, MessageCircle, Heart, Utensils, Gamepad2, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Full Stack Chatting Website',
    subtitle: 'with Sentiment Analysis',
    description: 'Developed a Full Stack Chatting Website with real-time messaging, image sharing via Cloudinary, and sentiment analysis integration to assess message tone. MongoDB Atlas Cluster for secure storage.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Cloudinary', 'Socket.io', 'Sentiment AI'],
    link: 'https://full-stack-chatting-website.onrender.com',
    icon: MessageCircle,
    gradient: 'from-primary via-gradient-orange to-gradient-crimson',
    features: ['Real-time Messaging', 'Image Sharing', 'Sentiment Analysis', 'Secure Storage'],
  },
  {
    title: 'Unfiltered',
    subtitle: 'Counseling and Healing Website',
    description: 'Built and deployed a live website for an active client focusing on mental health counseling services. Responsive design with calming UI/UX.',
    tech: ['React.js', 'Webflow', 'CSS3', 'Hostinger'],
    link: 'https://unfilteredhealing.in/',
    icon: Heart,
    gradient: 'from-gradient-crimson via-primary to-gradient-sand',
    features: ['Live Client Project', 'Responsive Design', 'Calming UI/UX', 'Booking System'],
  },
  {
    title: 'E-Foodiee',
    subtitle: 'Food Innovation Hackathon',
    description: 'Developed a web application for a Food Innovation Hackathon Event with interactive drag-and-drop feature for users to select food items and place orders.',
    tech: ['React.js', 'JavaScript', 'CSS3', 'Netlify'],
    link: 'https://e-foodiee.netlify.app/',
    icon: Utensils,
    gradient: 'from-gradient-orange via-primary to-gradient-crimson',
    features: ['Drag & Drop', 'Order System', 'Interactive UI', 'Food Selection'],
  },
  {
    title: 'Mini Projects',
    subtitle: 'Reinforcement Learning & More',
    description: 'Collection of innovative mini projects including Reinforcement Learning Game and Customized Page Loader with creative animations.',
    tech: ['Python', 'PyTorch', 'JavaScript', 'CSS3'],
    icon: Gamepad2,
    gradient: 'from-gradient-sand via-primary to-gradient-orange',
    features: ['RL Game', 'Custom Loader', 'Animations', 'AI Integration'],
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const container = containerRef.current;

    if (!section || !title || !container) return;

    // Title animation
    gsap.fromTo(title.children,
      { opacity: 0, y: 100, rotateX: -45 },
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

    // Cards animation
    const cards = container.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { 
          opacity: 0, 
          y: 100,
          scale: 0.9,
          rotateY: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

  }, []);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, entering: boolean) => {
    const card = e.currentTarget;
    const overlay = card.querySelector('.card-overlay');
    const content = card.querySelector('.card-content');
    const icon = card.querySelector('.card-icon');

    if (entering) {
      gsap.to(overlay, { opacity: 1, duration: 0.4 });
      gsap.to(content, { y: 0, opacity: 1, duration: 0.4 });
      gsap.to(icon, { scale: 1.2, rotate: 360, duration: 0.6, ease: 'back.out(1.7)' });
      gsap.to(card, { scale: 1.02, y: -10, duration: 0.4 });
    } else {
      gsap.to(overlay, { opacity: 0, duration: 0.4 });
      gsap.to(content, { y: 20, opacity: 0.8, duration: 0.4 });
      gsap.to(icon, { scale: 1, rotate: 0, duration: 0.4 });
      gsap.to(card, { scale: 1, y: 0, duration: 0.4 });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="projects"
      className="relative py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-crimson/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Section Title */}
        <div ref={titleRef} className="mb-20 perspective-1000">
          <p className="text-primary font-mono text-sm tracking-wider mb-2">// Featured Work</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            My <span className="text-primary">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-gradient-orange to-gradient-crimson rounded-full" />
        </div>

        {/* Projects Grid */}
        <div ref={containerRef} className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="project-card group relative rounded-2xl overflow-hidden cursor-pointer perspective-1000"
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
              
              {/* Card Content */}
              <div className="relative p-8 min-h-[400px] flex flex-col card-glass">
                {/* Overlay */}
                <div className="card-overlay absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0" />
                
                {/* Icon */}
                <div className="card-icon icon-container mb-6 relative z-10">
                  <project.icon size={28} className="text-primary" />
                </div>

                {/* Title */}
                <div className="mb-4 relative z-10">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-1">
                    {project.title}
                  </h3>
                  <p className="text-primary text-sm font-medium">{project.subtitle}</p>
                </div>

                {/* Description */}
                <p className="card-content text-foreground/70 mb-6 leading-relaxed relative z-10 flex-grow opacity-80">
                  {project.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                  {project.features.map((feature) => (
                    <span 
                      key={feature}
                      className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 text-xs bg-muted text-foreground/60 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {project.link && (
                  <div className="flex gap-4 relative z-10">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                      data-cursor-hover
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  </div>
                )}

                {/* Decorative Corner */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${project.gradient} opacity-10`} 
                     style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Prompt */}
        <div className="mt-16 text-center">
          <p className="text-foreground/50 text-sm">
            Hover over cards to explore more details
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
