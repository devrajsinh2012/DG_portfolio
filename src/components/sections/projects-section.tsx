"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { usePortfolioData } from "@/context/data-context";
import { Layers, ExternalLink, X } from "lucide-react";

export function ProjectsSection() {
  const { data } = usePortfolioData();
  const { projects } = data;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  // Get unique technologies from all projects
  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  );

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

  // Filter projects based on selected technology
  const filteredProjects = filter
    ? projects.filter((project) => project.technologies.includes(filter))
    : projects;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-6 bg-navy"
    >
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="section-heading">
            <span className="text-teal font-mono mr-2">04.</span> Projects
          </h2>
          <p className="text-slate max-w-3xl mt-4">
            A showcase of projects that demonstrate my skills and expertise in various domains,
            highlighting my ability to deliver impactful solutions.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-12 flex flex-wrap justify-center gap-2"
        >
          <button
            onClick={() => setFilter(null)}
            className={`px-3 py-1 rounded-full text-sm font-mono transition-colors ${
              filter === null
                ? "bg-teal text-navy font-medium"
                : "bg-navy-light text-slate hover:text-teal"
            }`}
          >
            All
          </button>
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-3 py-1 rounded-full text-sm font-mono transition-colors ${
                filter === tech
                  ? "bg-teal text-navy font-medium"
                  : "bg-navy-light text-slate hover:text-teal"
              }`}
            >
              {tech}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="relative"
              layoutId={project.title}
            >
              <div
                onClick={() => setSelectedProject(project.title)}
                className="bg-navy-light rounded-lg p-6 h-full border border-navy-light hover:border-teal/30 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
              >
                {/* Project icon */}
                <div className="flex justify-between items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center">
                    <Layers className="w-5 h-5 text-teal" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-slate-light text-xl font-bold mb-2 group-hover:text-teal transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono text-teal"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-navy-dark/80 backdrop-blur-sm z-50"
                onClick={() => setSelectedProject(null)}
              />
              
              <motion.div
                layoutId={selectedProject}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-navy border border-navy-light rounded-lg p-8 z-50 max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {(() => {
                  const project = projects.find(p => p.title === selectedProject);
                  if (!project) return null;
                  
                  return (
                    <>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-4 right-4 p-1 rounded-full bg-navy-light text-slate hover:text-teal transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-light mb-2">
                          {project.title}
                        </h2>
                        <div className="flex items-center text-slate">
                          <span className="text-teal font-medium mr-2">Role:</span>
                          {project.role}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-slate-light mb-3">Overview</h3>
                        <p className="text-slate mb-4">
                          {project.description}
                        </p>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-slate-light mb-3">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-full text-xs font-mono bg-navy-light text-teal"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-slate-light mb-3">Outcome</h3>
                        <p className="text-slate">
                          {project.outcome}
                        </p>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-navy-light">
                        {/* Placeholder for project images */}
                        <div className="bg-navy-dark rounded-md h-48 flex items-center justify-center">
                          <p className="text-slate font-mono text-sm">Project visuals would be displayed here</p>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}