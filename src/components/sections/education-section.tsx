"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Award, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export function EducationSection() {
  // Local data
  const educationData = [
    {
      degree: "Bachelor of Technology in Computer Engineering",
      institution: "Marwadi University (NAAC A+)",
      period: "2020 - 2024",
      description: "Comprehensive education in computer engineering fundamentals and applications."
    }
  ];
  
  const extracurricularData = [
    {
      role: "Chair of Innovation Vertical",
      organization: "Young Indians",
      period: "2023 - Present",
      description: "Lead innovation initiatives and projects within the Young Indians organization."
    },
    {
      role: "Anchor, Public Speaking",
      organization: "Marwadi University",
      period: "2022 - 2024",
      description: "Hosted university events and developed public speaking skills through regular presentations."
    },
    {
      role: "Community Member",
      organization: "Research Activity Club",
      period: "2022 - 2025",
      description: "Participated in research activities and collaborative projects."
    },
    {
      role: "Theatre Artist",
      organization: "Utsav Natak Academy",
      period: "2023 - Present",
      description: "Performed in theatrical productions and developed creative expression skills."
    }
  ];
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [currentExtracurricularSlide, setCurrentExtracurricularSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

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

  // Handle auto-play for extracurricular slider
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay && extracurricularData.length > 1) {
      interval = setInterval(() => {
        setCurrentExtracurricularSlide((prev) => (prev + 1) % extracurricularData.length);
      }, 6000); // Slower speed (6 seconds)
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, extracurricularData.length]);

  const goToPrevSlide = () => {
    setCurrentExtracurricularSlide((prev) => (prev - 1 + extracurricularData.length) % extracurricularData.length);
  };

  const goToNextSlide = () => {
    setCurrentExtracurricularSlide((prev) => (prev + 1) % extracurricularData.length);
  };

  const toggleAutoPlay = () => {
    setAutoPlay((prev) => !prev);
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-20 px-6 bg-navy-dark"
    >
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="section-heading">
            <span className="text-teal font-mono mr-2">06.</span> Education & Activities
          </h2>
          <p className="text-slate max-w-3xl mt-4">
            My educational background and extracurricular activities that have shaped my
            professional development and personal growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 flex items-center"
            >
              <div className="mr-4 p-2 rounded-full bg-navy-light">
                <GraduationCap className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-2xl font-bold text-slate-light">Education</h3>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {educationData.map((edu) => (
                <motion.div
                  key={edu.degree}
                  variants={itemVariants}
                  className="mb-8 relative pl-6 border-l border-navy-light"
                >
                  <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-teal"></div>
                  <h4 className="text-xl font-bold text-slate-light">{edu.degree}</h4>
                  <p className="text-teal font-mono text-sm mb-2">{edu.institution}</p>
                  <p className="text-slate-light text-sm mb-2">{edu.period}</p>
                  <p className="text-slate">{edu.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Extracurricular Activities with Slider */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="mr-4 p-2 rounded-full bg-navy-light">
                  <Award className="w-6 h-6 text-teal" />
                </div>
                <h3 className="text-2xl font-bold text-slate-light">Extracurricular</h3>
              </div>
              
              <button 
                onClick={toggleAutoPlay}
                className="p-2 rounded-full bg-navy-light text-teal hover:bg-navy transition-colors"
                aria-label={autoPlay ? "Pause slider" : "Play slider"}
              >
                {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </motion.div>

            {/* Extracurricular Slider */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div 
                ref={sliderRef}
                className="overflow-hidden rounded-lg border border-navy-light"
              >
                <div 
                  className="transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentExtracurricularSlide * 100}%)` }}
                >
                  <div className="flex">
                    {extracurricularData.map((activity) => (
                      <div 
                        key={activity.role} 
                        className="min-w-full p-6 bg-navy-light"
                        style={{ width: "100%" }}
                      >
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-xl font-bold text-slate-light group-hover:text-teal transition-colors">
                              {activity.role}
                            </h4>
                            <span className="text-teal font-mono text-sm px-2 py-1 border border-teal rounded-md">
                              {activity.period}
                            </span>
                          </div>
                          <p className="text-teal font-mono text-sm mb-4">{activity.organization}</p>
                          <p className="text-slate mb-6">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              {extracurricularData.length > 1 && (
                <div className="flex justify-between mt-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={goToPrevSlide}
                      className="p-3 rounded-full bg-navy-light text-teal hover:bg-navy transition-colors"
                      aria-label="Previous item"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={goToNextSlide}
                      className="p-3 rounded-full bg-navy-light text-teal hover:bg-navy transition-colors"
                      aria-label="Next item"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Pagination Indicators */}
                  <div className="flex gap-2 items-center">
                    {extracurricularData.map((_, index) => (
                      <button 
                        key={index} 
                        onClick={() => setCurrentExtracurricularSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentExtracurricularSlide === index ? "bg-teal w-4" : "bg-slate"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}