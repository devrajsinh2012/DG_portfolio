"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  // Local data
  const aboutData = {
    aboutText: [
      "Hello! I'm Devrajsinh, a Project Coordinator and tech-driven professional with hands-on experience in agile delivery, stakeholder management, and translating complex requirements into actionable plans. I bridge the gap between business objectives and technical execution, ensuring that projects are delivered successfully and align with strategic goals.",
      "With experience conducting stakeholder interviews, managing sprint planning, and coordinating cross-functional teams, I thrive at the intersection of people, process, and technology. My background spans from leading operational initiatives to developing user-centric applications with ML integration.",
      "What sets me apart is my analytical mindset combined with practical execution skills. I leverage tools like Jira, Trello, and Excel, along with data analytics, to maintain clear visibility into project health and streamline workflows for enhanced team velocity.",
      "Beyond my professional pursuits, I'm passionate about innovation leadership as Chair of Innovation Vertical at Young Indians, and I find creative balance through theatre performances with Utsav Natak Academy – experiences that enhance my collaborative and communication skills."
    ],
    strengths: [
      {
        title: "Strategic Thinker",
        description: "Applying strategic insights to drive impactful projects and business growth through innovative solutions."
      },
      {
        title: "Cross-Functional Leader",
        description: "Leading diverse teams to achieve common goals while leveraging individual strengths and expertise."
      },
      {
        title: "Process Optimizer",
        description: "Streamlining workflows to enhance efficiency, reduce operational costs, and improve project delivery."
      }
    ]
  };
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
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
      className="py-20 px-6"
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
              {aboutData.aboutText.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={itemVariants}
            className="relative group"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 border-2 rounded-md border-teal translate-x-5 translate-y-5 transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
              <div className="absolute inset-0 bg-navy-light rounded-md overflow-hidden">
                <Image 
                  src="/images/profile1.webp" 
                  alt="Devrajsinh Gohil" 
                  fill 
                  className="object-cover"
                  priority
                  quality={70}
                />
              </div>
              <div className="absolute inset-0 bg-teal/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        </motion.div>

        {/* Strengths */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {aboutData.strengths.map((strength, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-navy p-6 rounded-lg border border-navy-light hover:border-teal/30 transition-colors duration-300"
            >
              <h3 className="text-slate-light text-xl font-bold mb-3">{strength.title}</h3>
              <p className="text-slate">
                {strength.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}