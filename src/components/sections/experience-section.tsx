"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { usePortfolioData } from "@/context/data-context";
import { Briefcase, Calendar, ChevronRight, ExternalLink } from "lucide-react";

export function ExperienceSection() {
  const { data } = usePortfolioData();
  const { experience } = data;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

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

  const toggleExpand = (company: string) => {
    if (expandedCompany === company) {
      setExpandedCompany(null);
    } else {
      setExpandedCompany(company);
    }
  };

  return (
    <section
      id="experience"
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
            <span className="text-teal font-mono mr-2">03.</span> Work Experience
          </h2>
          <p className="text-slate max-w-3xl mt-4">
            My professional journey showcases a progressive track record in project management,
            strategic leadership, and operational excellence across various roles.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-0 top-0 h-full w-0.5 bg-navy-light"></div>

          {/* Experience items */}
          {experience.map((job, index) => (
            <motion.div
              key={job.company}
              variants={itemVariants}
              className="timeline-item mb-12 last:mb-0 last:pb-0"
            >
              <div className="relative">
                {/* Company and role */}
                <div 
                  className="flex flex-col md:flex-row md:items-center justify-between mb-3 cursor-pointer group"
                  onClick={() => toggleExpand(job.company)}
                >
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-light group-hover:text-teal transition-colors">
                      {job.position}
                      <span className="text-teal"> @ {job.company}</span>
                    </h3>
                  </div>
                  <div className="flex items-center mt-1 md:mt-0 text-slate font-mono text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-teal" />
                    {job.period}
                  </div>
                </div>

                {/* Job description */}
                <p className="text-slate mb-4">{job.description}</p>

                {/* Achievements with expand/collapse */}
                <div>
                  <div 
                    className="flex items-center cursor-pointer text-teal hover:text-teal-dark mb-2"
                    onClick={() => toggleExpand(job.company)}
                  >
                    <ChevronRight 
                      className={`w-4 h-4 mr-1 transition-transform duration-300 ${
                        expandedCompany === job.company ? "rotate-90" : ""
                      }`} 
                    />
                    <span className="font-medium">
                      {expandedCompany === job.company ? "Hide details" : "Show details"}
                    </span>
                  </div>

                  {expandedCompany === job.company && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pl-4 ml-2 border-l border-teal/20"
                    >
                      <h4 className="text-slate-light font-medium mb-2">Key Achievements:</h4>
                      <ul className="space-y-2 mb-4">
                        {job.achievements.map((achievement, i) => (
                          <li 
                            key={i} 
                            className="flex items-start text-slate"
                          >
                            <span className="text-teal mr-2">▹</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>

                      {job.technologies.length > 0 && (
                        <div className="mb-2">
                          <h4 className="text-slate-light font-medium mb-2">Technologies & Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.technologies.map((tech, i) => (
                              <span 
                                key={i}
                                className="px-3 py-1 rounded-full text-xs font-mono bg-navy-light text-teal"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 bg-navy p-8 rounded-lg border border-navy-light"
        >
          <h3 className="text-xl font-bold text-slate-light mb-6 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-teal" />
            Professional Growth Spotlight
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative bg-navy-light rounded-lg p-6 border border-navy-light hover:border-teal/30 transition-all duration-300">
              <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-teal flex items-center justify-center font-mono text-navy font-bold">1</div>
              <h4 className="text-slate-light font-bold mb-2">Project Leadership</h4>
              <p className="text-slate text-sm">
                Demonstrated exceptional project management skills, reducing planning time by 10% and accelerating product delivery.
              </p>
            </div>
            
            <div className="relative bg-navy-light rounded-lg p-6 border border-navy-light hover:border-teal/30 transition-all duration-300">
              <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-teal flex items-center justify-center font-mono text-navy font-bold">2</div>
              <h4 className="text-slate-light font-bold mb-2">Strategic Operations</h4>
              <p className="text-slate text-sm">
                Spearheaded cross-functional operations to ensure seamless execution of business strategies and growth plans.
              </p>
            </div>
            
            <div className="relative bg-navy-light rounded-lg p-6 border border-navy-light hover:border-teal/30 transition-all duration-300">
              <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-teal flex items-center justify-center font-mono text-navy font-bold">3</div>
              <h4 className="text-slate-light font-bold mb-2">Digital Marketing</h4>
              <p className="text-slate text-sm">
                Led comprehensive digital marketing campaigns that increased brand visibility and customer engagement.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}