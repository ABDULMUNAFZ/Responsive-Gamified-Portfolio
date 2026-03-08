import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink, ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

// EmailJS configuration - User will provide these values
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_m8xixas';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_cbpt6yi';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '01LtN_-l3xU4dNwSP';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'z.abdulmunaf@gmail.com',
    href: 'mailto:z.abdulmunaf@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91-9894019190',
    href: 'tel:+919894019190',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Coimbatore, India',
  },
];

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/ABDULMUNAFZ' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/abdul-munaf-z-6380a8251' },
  { name: 'Portfolio', icon: ExternalLink, href: 'https://abdulmunafsportfolio.netlify.app' },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    const info = infoRef.current;

    if (!section || !title || !form || !info) return;

    // Title animation
    gsap.fromTo(title.children,
      { opacity: 0, y: 50 },
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

    // Form fields animation
    const formFields = form.querySelectorAll('.form-field');
    formFields.forEach((field, i) => {
      gsap.fromTo(field,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Info cards animation
    const infoCards = info.querySelectorAll('.info-card');
    infoCards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, x: 50, rotate: 5 },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 0.6,
          delay: i * 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: info,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Hover effect
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          y: -5,
          boxShadow: '0 20px 40px -10px hsl(var(--primary) / 0.2)',
          duration: 0.3,
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          boxShadow: 'none',
          duration: 0.3,
        });
      });
    });

    // Social links animation
    const socialItems = info.querySelectorAll('.social-link');
    socialItems.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, scale: 0, rotate: -180 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.5,
          delay: 0.6 + i * 0.1,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: info,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Check if EmailJS is configured
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
      EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
      EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      // Demo mode - simulate success
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Demo Mode",
        description: "EmailJS not configured. Please provide your EmailJS keys to enable real email sending.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Abdul Munaf',
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });

      setFormData({ name: '', email: '', subject: '', message: '' });

      // Success animation
      const button = formRef.current?.querySelector('button[type="submit"]');
      if (button) {
        gsap.fromTo(button,
          { scale: 1 },
          {
            scale: 1.1,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
          }
        );
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      toast({
        title: "Failed to Send",
        description: "Something went wrong. Please try again or contact directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const wrapper = e.target.closest('.form-field');
    if (wrapper) {
      gsap.to(wrapper, {
        scale: 1.02,
        boxShadow: '0 10px 30px -10px hsl(var(--primary) / 0.2)',
        duration: 0.3,
      });
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const wrapper = e.target.closest('.form-field');
    if (wrapper) {
      gsap.to(wrapper, {
        scale: 1,
        boxShadow: 'none',
        duration: 0.3,
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gradient-crimson/5 to-transparent" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-orange/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Section Title */}
        <div ref={titleRef} className="mb-20 text-center perspective-1000">
          <p className="text-primary font-mono text-sm tracking-wider mb-2">// Let's Connect</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-gradient-orange to-gradient-crimson rounded-full mx-auto" />
          <p className="mt-6 text-foreground/70 max-w-xl mx-auto">
            Have a project in mind or just want to say hello? Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="form-field">
                <label className="block text-sm font-medium text-foreground/80 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-field">
                <label className="block text-sm font-medium text-foreground/80 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label className="block text-sm font-medium text-foreground/80 mb-2">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                placeholder="Project inquiry..."
                required
              />
            </div>

            <div className="form-field">
              <label className="block text-sm font-medium text-foreground/80 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                rows={5}
                className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`magnetic-btn w-full px-8 py-4 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${submitStatus === 'success'
                  ? 'bg-green-500 text-white'
                  : submitStatus === 'error'
                    ? 'bg-destructive text-destructive-foreground'
                    : 'bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30'
                }`}
              data-cursor-hover
            >
              {submitStatus === 'success' ? (
                <>
                  <CheckCircle size={18} />
                  <span>Message Sent!</span>
                </>
              ) : submitStatus === 'error' ? (
                <>
                  <AlertCircle size={18} />
                  <span>Failed - Try Again</span>
                </>
              ) : (
                <>
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send size={18} className={isSubmitting ? 'animate-pulse' : ''} />
                </>
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="info-card card-ember rounded-2xl p-5 flex items-center gap-4 cursor-pointer group"
                  data-cursor-hover
                >
                  <div className="icon-container">
                    <info.icon size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground/50">{info.label}</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {info.value}
                    </p>
                  </div>
                  {info.href && (
                    <ArrowUpRight size={18} className="text-foreground/30 group-hover:text-primary transition-colors" />
                  )}
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Connect with me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link w-14 h-14 flex items-center justify-center rounded-xl border border-border/50 text-foreground/70 hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300"
                    data-cursor-hover
                  >
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="card-glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-500">Available for Work</span>
              </div>
              <p className="text-sm text-foreground/60">
                I'm currently open to new opportunities and exciting projects. Let's build something amazing together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
