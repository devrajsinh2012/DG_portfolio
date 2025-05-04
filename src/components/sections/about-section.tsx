"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePortfolioData } from "@/context/data-context";
import Image from "next/image";

export function AboutSection() {
  const { data } = usePortfolioData();
  const { personalInfo } = data;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-6 bg-navy-dark"
    >
      <div className="container mx-auto max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants}>
            <h2 className="section-heading mb-8">
              <span className="text-teal font-mono mr-2">01.</span> About Me
            </h2>
            
            <div className="space-y-4 text-slate">
              <p>
                Hello! I'm Devrajsinh, a Project Management professional passionate about 
                driving business growth through strategic thinking and effective leadership. 
                My journey in the realm of project management has equipped me with valuable 
                skills in cross-functional coordination and digital marketing campaigns.
              </p>
              
              <p>
                Currently serving as the Chief Operating Officer at Integers: Beyond the Decimal Point, 
                I spearhead operations to ensure seamless execution of business strategies and lead 
                digital marketing initiatives to enhance brand visibility.
              </p>
              
              <p>
                What sets me apart is my dedication to process optimization and data-driven 
                decision making. I believe in leveraging analytical insights to streamline 
                workflows and maximize operational efficiency.
              </p>
              
              <p>
                When I'm not immersed in the world of project management, you can find me 
                engaged in theatre performances with Utsav Natak Academy or contributing 
                to innovation initiatives as Chair of Innovation Vertical at Young Indians.
              </p>
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="relative order-first lg:order-last mx-auto"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Placeholder for profile image - will be replaced via admin */}
              <div className="w-full h-full bg-navy-light rounded-md overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-transparent opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center text-teal">
                  <span className="font-mono text-lg">Profile Image</span>
                </div>
                
                {/* Image border effect */}
                <div className="absolute -inset-0.5 rounded-md bg-teal/20 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute w-full h-full border-2 rounded-md border-teal top-4 left-4 -z-10">
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-teal -mb-2 -mr-2"></div>
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-teal -mt-2 -ml-2"></div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Key Highlights */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-navy p-6 rounded-lg border border-navy-light hover:border-teal/30 transition-colors duration-300"
          >
            <h3 className="text-slate-light text-xl font-bold mb-3">Strategic Thinker</h3>
            <p className="text-slate">
              Applying strategic insights to drive impactful projects and business growth through innovative solutions.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-navy p-6 rounded-lg border border-navy-light hover:border-teal/30 transition-colors duration-300"
          >
            <h3 className="text-slate-light text-xl font-bold mb-3">Cross-Functional Leader</h3>
            <p className="text-slate">
              Leading diverse teams to achieve common goals while leveraging individual strengths and expertise.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-navy p-6 rounded-lg border border-navy-light hover:border-teal/30 transition-colors duration-300"
          >
            <h3 className="text-slate-light text-xl font-bold mb-3">Process Optimizer</h3>
            <p className="text-slate">
              Streamlining workflows to enhance efficiency, reduce operational costs, and improve project delivery.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}