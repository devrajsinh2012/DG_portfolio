"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";

export function ExperienceSection() {
  // Local data
  const experienceData = [
    {
      company: "Integers: Beyond the Decimal Point",
      position: "Chief Operating Officer ",
      period: "Nov 2024 - Mar 2025",
      description: "Leading operations and strategic initiatives to drive business growth.",
      achievements: [
        "Process Optimization Expert: Analyzed and redesigned operational workflows across 5+ departments, delivering 30% efficiency improvements through systematic process mapping and stakeholder collaboration",
        "Data-Driven Performance Management: Developed comprehensive KPI frameworks and performance metrics to monitor operational effectiveness, enabling real-time decision-making and stakeholder satisfaction tracking",
        "Cross-Functional Leadership: Led requirements gathering initiatives across multiple teams, achieving 95% on-time delivery through strategic planning and agile project coordination"
      ],
      technologies: ["Process mapping", "KPI development", "Performance analytics" , "stakeholder management" ,  "Strategic Planning", "Operations Management"]
    },
    {
      company: "ORSCOPE TECHNOLOGIES",
      position: "Project Management Intern",
      period: "Apr 2024 - Jun 2024",
      description: "Contributed to project management processes and product development initiatives.",
      achievements: [
        "Requirements Engineering Specialist: Conducted 30+stakeholder interviews to gather and document comprehensive business requirements, accelerating development cycles by 20% through clear specification documentation",
        "Data-Driven Product Optimization: Executed A/B testing campaigns and analyzed user behavior data, resulting in 15% increase in user engagement through evidence-based feature improvements",
        "Accelerated the delivery of innovative products to market"
      ],
      technologies: ["Market Research", "Product Development", "Technical specification writing"]
    },
    {
      company: "Self Employed",
      position: "Teacher",
      period: "Jun 2022 - May 2024",
      description: "Designed and delivered educational content for primary grade students.",
      achievements: [
        "Created and implemented effective lessons for primary grades",
        "Empowered student success through engaging and interactive teaching methods"
      ],
      technologies: ["Curriculum Development", "Interactive Learning", "Student Engagement"]
    }
  ];
  
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
          {experienceData.map((job, index) => (
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
      </div>
    </section>
  );
}