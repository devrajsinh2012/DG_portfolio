"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePortfolioData } from "@/context/data-context";
import { GraduationCap, Award, ExternalLink } from "lucide-react";

export function EducationSection() {
  const { data } = usePortfolioData();
  const { education, certifications, extracurricular } = data;
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
            <span className="text-teal font-mono mr-2">05.</span> Education & Certifications
          </h2>
          <p className="text-slate max-w-3xl mt-4">
            My educational background and professional certifications that have shaped my expertise
            and provided a strong foundation for my career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Education Column */}
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
              {education.map((edu) => (
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

            {/* Extracurricular Activities */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 mb-6 flex items-center"
            >
              <div className="mr-4 p-2 rounded-full bg-navy-light">
                <Award className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-2xl font-bold text-slate-light">Extracurricular</h3>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {extracurricular.map((activity) => (
                <motion.div
                  key={activity.role}
                  variants={itemVariants}
                  className="bg-navy-light p-4 rounded-lg border border-navy hover:border-teal/30 transition-all duration-300"
                >
                  <h4 className="text-slate-light font-bold">{activity.role}</h4>
                  <p className="text-teal font-mono text-xs mb-1">{activity.organization}</p>
                  <p className="text-slate-light text-xs mb-2">{activity.period}</p>
                  <p className="text-slate text-sm">{activity.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Certifications Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 flex items-center"
            >
              <div className="mr-4 p-2 rounded-full bg-navy-light">
                <Award className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-2xl font-bold text-slate-light">Certifications</h3>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  variants={itemVariants}
                  className="group relative bg-navy-light rounded-lg p-6 mb-6 border border-navy hover:border-teal/30 transition-all duration-300 overflow-hidden"
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-teal/5 rounded-bl-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-teal/5 rounded-tr-full"></div>

                  <div className="relative z-10">
                    <div className="flex justify-between">
                      <h4 className="text-xl font-bold text-slate-light group-hover:text-teal transition-colors duration-300">
                        {cert.name}
                      </h4>
                      <ExternalLink className="w-5 h-5 text-slate opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-teal font-mono text-sm mb-2">{cert.issuer}</p>
                    <p className="text-slate-light text-sm mb-2">{cert.date}</p>
                    <p className="text-slate">{cert.description}</p>
                  </div>

                  {/* Certification badge (visual placeholder) */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full border-4 border-navy-light bg-navy flex items-center justify-center text-teal font-mono text-xs">
                    {index + 1}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Learning Journey Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-12 p-6 bg-navy rounded-lg border border-navy-light"
            >
              <h3 className="text-xl font-bold text-slate-light mb-6">Learning Journey</h3>
              
              <div className="relative">
                {/* Timeline */}
                <div className="absolute left-0 top-0 h-full w-0.5 bg-navy-light"></div>
                
                {/* Journey Steps */}
                <div className="pl-8 relative mb-6">
                  <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-teal"></div>
                  <h4 className="text-slate-light font-bold">Computer Engineering Degree</h4>
                  <p className="text-slate text-sm">Foundation in technical concepts and programming</p>
                </div>
                
                <div className="pl-8 relative mb-6">
                  <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-teal"></div>
                  <h4 className="text-slate-light font-bold">Google Project Management</h4>
                  <p className="text-slate text-sm">Advanced project management methodologies and best practices</p>
                </div>
                
                <div className="pl-8 relative mb-6">
                  <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-teal"></div>
                  <h4 className="text-slate-light font-bold">Google AI Essentials</h4>
                  <p className="text-slate text-sm">Understanding of AI concepts and applications</p>
                </div>
                
                <div className="pl-8 relative">
                  <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-teal"></div>
                  <h4 className="text-slate-light font-bold">Continuous Learning</h4>
                  <p className="text-slate text-sm">Ongoing pursuit of knowledge and skills enhancement</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}