"use client";

import { usePortfolioData } from "@/context/data-context";
import { PortfolioLoader } from "@/components/portfolio-loader";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import SkillsSection from "@/components/sections/skills-section";
import ExperienceSection from "@/components/sections/experience-section";
import ProjectsSection from "@/components/sections/projects-section";
import EducationSection from "@/components/sections/education-section";
import ContactSection from "@/components/sections/contact-section";
import { motion } from "framer-motion";

export default function Home() {
  const { data } = usePortfolioData();
  
  // Function to render sections based on visibility settings
  const renderSection = (id: string, Component: React.ComponentType<any>) => {
    const sectionVisibility = data?.settings?.sectionVisibility || {};
    const isVisible = sectionVisibility[id] !== false; // Default to visible if not specified
    
    if (isVisible) {
      return (
        <motion.section 
          id={id} 
          className="py-16 scroll-mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Component />
        </motion.section>
      );
    }
    return null;
  };

  return (
    <PortfolioLoader>
      <main className="container mx-auto px-4 sm:px-6 py-8">
        {renderSection("hero", HeroSection)}
        {renderSection("about", AboutSection)}
        {renderSection("skills", SkillsSection)}
        {renderSection("experience", ExperienceSection)}
        {renderSection("projects", ProjectsSection)}
        {renderSection("education", EducationSection)}
        {renderSection("contact", ContactSection)}
      </main>
    </PortfolioLoader>
  );
}