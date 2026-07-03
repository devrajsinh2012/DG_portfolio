"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  // Local data instead of using context
  const personalInfo = {
    name: "Devrajsinh Gohil",
    title: "Project Coordinator",
    email: "djgohil2012@gmail.com",
    phone: "+91-8160529391",
    location: "Rajkot, Gujarat, India",
    linkedin: "linkedin.com/in/devrajsinh2012/",
    bio: "Computer Engineering graduate working as a Project Coordinator, bridging technical execution and business strategy. Experienced in agile delivery, stakeholder management, and translating complex requirements into actionable plans — driven by the belief that great products live at the intersection of people, process, and purpose."
  };
  
  const typingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!typingRef.current) return;
    
    const text = personalInfo.title;
    let currentIndex = 0;
    let isTyping = true;
    
    const typeText = () => {
      if (!typingRef.current) return;
      
      if (isTyping) {
        // Typing
        if (currentIndex < text.length) {
          typingRef.current.textContent = text.substring(0, currentIndex + 1);
          currentIndex++;
          setTimeout(typeText, 100);
        } else {
          isTyping = false;
          setTimeout(typeText, 3000); // Pause at the end
        }
      } else {
        // Erasing
        if (currentIndex > 0) {
          typingRef.current.textContent = text.substring(0, currentIndex - 1);
          currentIndex--;
          setTimeout(typeText, 50);
        } else {
          isTyping = true;
          setTimeout(typeText, 1000); // Pause before retyping
        }
      }
    };
    
    setTimeout(() => {
      typeText();
    }, 1000);
    
    return () => {
      // Cleanup
    };
  }, [personalInfo.title]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-16 px-6">
      <div className="container mx-auto">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-4">
            <p className="text-teal font-mono">Hi, my name is</p>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants} className="mb-4">
            <h1 className="hero-heading text-slate-light">{personalInfo.name}</h1>
          </motion.div>

          {/* Title with typing effect */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-slate font-bold">
              <span ref={typingRef} className="inline-block"></span>
              <span className="animate-pulse">|</span>
            </h2>
          </motion.div>

          {/* Bio */}
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-slate max-w-xl">{personalInfo.bio}</p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="btn-primary flex items-center"
            >
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="px-5 py-3 rounded bg-teal text-navy font-mono text-sm transition-all duration-300 hover:bg-teal/90"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}