import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';
import MorphBackground from '@/components/MorphBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MiniGame from '@/components/MiniGame';
import AboutSection from '@/components/AboutSection';
import MarqueeSection from '@/components/MarqueeSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import useSmoothScroll from '@/hooks/useSmoothScroll';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize smooth scroll with Lenis
  useSmoothScroll();

  useEffect(() => {
    // Refresh ScrollTrigger once loading is done
    if (!isLoading) {
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }, [isLoading]);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Background */}
      <MorphBackground />

      {/* Main Content */}
      <div className={`relative z-10 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        {/* Navigation */}
        <Navbar />

        {/* Sections */}
        <main>
          <HeroSection />

          {/* ── Mini Game Section ─────────────────────── */}
          <section className="relative py-16 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-6">
                <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#66BCB4' }}>🎮 Mini Game</p>
                <h2 className="text-2xl font-display font-bold" style={{ color: '#EC802B' }}>Space Runner</h2>
                <p className="text-sm mt-1" style={{ color: '#66BCB4' }}>Press Space / Arrow Up or Tap to jump — dodge the meteors!</p>
              </div>
              <div
                className="w-full rounded-2xl overflow-hidden"
                style={{ height: 'clamp(220px, 32vw, 340px)' }}
              >
                <MiniGame />
              </div>
            </div>
          </section>

          <AboutSection />
          <MarqueeSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <CertificationsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
