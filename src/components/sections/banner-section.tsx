"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export function BannerSection() {
  // Local data
  const personalInfo = {
    name: "Devrajsinh Gohil",
    title: "LEARNER",
    email: "djgohil2012@gmail.com",
    phone: "+91-8160529391"
  };
  
  const [scrollToAbout, setScrollToAbout] = useState(false);
  
  useEffect(() => {
    if (scrollToAbout) {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
      setScrollToAbout(false);
    }
  }, [scrollToAbout]);
  
  return (
    <section id="banner" className="relative w-full min-h-screen flex items-center justify-center">
      {/* Video background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/banner1.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ objectPosition: "center" }}
        />
        <div className="absolute inset-0 bg-navy/70" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 mb-8 relative">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-teal relative">
              <Image
                src="/images/profile1.webp"
                alt="Devrajsinh Gohil"
                fill
                className="object-cover object-center"
                style={{ 
                  objectPosition: 'center',
                  borderRadius: '50%',
                }}
                priority
                quality={70}
              />
            </div>
          </div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-slate-light mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {personalInfo.name.toUpperCase()}
          </motion.h1>
          
          <motion.h2
            className="text-xl md:text-2xl text-teal font-mono mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {personalInfo.title}
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <button
              onClick={() => setScrollToAbout(true)}
              className="flex items-center justify-center text-teal hover:text-teal-light transition-colors duration-300 flex-col"
            >
              <span className="mb-2">Learn More</span>
              <ArrowDown className="animate-bounce" />
            </button>
          </motion.div>
          
          <motion.div 
            className="mt-8 text-slate-light flex items-center justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div>{personalInfo.phone}</div>
            <div className="w-1 h-1 bg-teal rounded-full"></div>
            <div>{personalInfo.email}</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 