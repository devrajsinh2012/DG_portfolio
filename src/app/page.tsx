"use client";

import { useState, useEffect, Suspense } from 'react';
import { HeroSection } from '../components/sections/hero-section';
import { AboutSection } from '../components/sections/about-section';
import { SkillsSection } from '../components/sections/skills-section';
import { ExperienceSection } from '../components/sections/experience-section';
import { EducationSection } from '../components/sections/education-section';
import { ProjectsSection } from '../components/sections/projects-section';
import { CertificationsSection } from '../components/sections/certifications-section';
import { ContactSection } from '../components/sections/contact-section';
import { BannerSection } from '../components/sections/banner-section';
import { PortfolioLoader } from '../components/portfolio-loader';
import { ScrollToTop } from '../components/ui/scroll-to-top';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PortfolioLoader />;
  }

  return (
    <main className="min-h-screen">
      <BannerSection />
      <HeroSection />
      <Suspense fallback={<div className="loading-section">Loading...</div>}>
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <EducationSection />
        <ContactSection />
      </Suspense>
      <ScrollToTop />
    </main>
  );
}
