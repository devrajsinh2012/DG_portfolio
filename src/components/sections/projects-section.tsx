"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Layers, ExternalLink, X, Github, Globe, ArrowRight } from "lucide-react";
import SpotlightCard from "@/components/ui/spotlight-card";

export function ProjectsSection() {
  // Local data
  const projectsData = [
    {
      title: "Analyzing Startup Fundraising Deals from Crunchbase",
      description: "Comprehensive data analysis project examining startup fundraising patterns, investment trends, and market dynamics using Crunchbase dataset. Performed statistical analysis, trend identification, and predictive modeling to uncover insights about successful fundraising strategies and market opportunities.",
      technologies: ["Python", "Pandas", "SQLite", "Jupyter Notebook", "Data Visualization", "Statistical Analysis"],
      category: "Data Analysis",
      role: "Data Analyst",
      outcome: "Generated actionable insights on fundraising trends, identified key success factors for startups, and created predictive models with 85% accuracy for investment success prediction.",
      sourceCodeUrl: "https://github.com/devrajsinh2012",
      demoUrl: ""
    },
    
    // Existing Projects
    {
      title: "Digital Marketing Campaign Optimization",
      description: "Led a comprehensive digital marketing campaign that increased brand visibility and customer engagement through strategic planning and execution. Implemented data-driven marketing strategies, A/B testing, and performance analytics to maximize campaign effectiveness.",
      technologies: ["Digital Marketing", "Analytics", "Campaign Management", "A/B Testing", "Performance Tracking"],
      category: "Digital Marketing",
      role: "Project Lead",
      outcome: "Increased engagement metrics by 25% through targeted content strategies and optimization, resulting in 40% improvement in conversion rates and 30% growth in brand awareness.",
      sourceCodeUrl: "https://github.com/devrajsinh2012",
      demoUrl: "https://github.com/devrajsinh2012"
    },
    {
      title: "Process Optimization Initiative",
      description: "Streamlined internal processes to reduce redundancies and improve operational efficiency across departments. Conducted thorough process mapping, identified bottlenecks, and implemented workflow automation solutions to enhance productivity.",
      technologies: ["Process Mapping", "Workflow Optimization", "Change Management", "Automation", "Business Analysis"],
      category: "Business Analysis",
      role: "Process Improvement Specialist",
      outcome: "Reduced project planning time by 10% and overall operational costs by 15% through implementation of streamlined requirement gathering processes and automated workflow systems.",
      sourceCodeUrl: "",
      demoUrl: ""
    },
    
    // New Projects
    {
      title: "Regional Sign Language Interpreter with Deep Learning",
      description: "Developed an intelligent sign language recognition system using advanced deep learning techniques to bridge communication gaps for hearing-impaired individuals. Implemented multiple ML models including CNN for image processing, LSTM for sequence recognition, and SVM for classification optimization.",
      technologies: ["Python", "TensorFlow", "CNN", "LSTM", "SVM", "Computer Vision", "Deep Learning", "OpenCV"],
      category: "AI & Machine Learning",
      role: "ML Engineer",
      outcome: "Achieved 92% accuracy in sign language recognition with real-time processing capabilities, enabling seamless communication for 500+ regional sign language gestures.",
      sourceCodeUrl: "https://github.com/devrajsinh2012",
      demoUrl: ""
    },
    {
      title: "Card Game - Java Socket Programming",
      description: "Developed a multiplayer card game application enabling real-time gameplay between two players using Java socket programming. Implemented robust network communication protocols, game state synchronization, and user-friendly interface for seamless gaming experience.",
      technologies: ["Java", "Socket Programming", "Network Communication", "Game Development", "Multi-threading", "GUI"],
      category: "Game Development",
      role: "Software Developer",
      outcome: "Successfully implemented real-time multiplayer functionality with 99.5% uptime, supporting concurrent gameplay sessions and smooth network communication with minimal latency.",
      sourceCodeUrl: "https://github.com/devrajsinh2012",
      demoUrl: ""
    },
    {
      title: "Smart Grocery List App with AI",
      description: "Created an intelligent grocery list application powered by AI recommendations and smart categorization features. Integrated machine learning algorithms for predictive shopping patterns, price comparison, and nutritional analysis to enhance user shopping experience.",
      technologies: ["Flutter", "Firebase", "AI Integration", "Mobile Development", "Machine Learning", "API Integration"],
      category: "Mobile Development",
      role: "Project Lead",
      outcome: "Delivered a user-friendly mobile application with 95% user satisfaction rate, featuring AI-powered grocery recommendations that reduced shopping time by 30% and food waste by 25%.",
      sourceCodeUrl: "https://github.com/devrajsinh2012",
      demoUrl: ""
    },
    {
      title: "Smayati - Heritage Site Booking App",
      description: "Developed a comprehensive heritage site booking platform enabling users to discover, book, and manage visits to cultural heritage sites. Integrated payment gateways, real-time availability tracking, virtual tour features, and multilingual support to enhance cultural tourism experience.",
      technologies: ["MongoDB", "Express.js", "React", "Node.js", "MERN Stack", "Payment Integration", "RESTful APIs"],
      category: "MERN Stack",
      role: "Project Lead",
      outcome: "Created a complete booking platform facilitating 10,000+ heritage site bookings, increasing tourism revenue by 35% and providing seamless reservation management for 50+ heritage sites.",
      sourceCodeUrl: "https://github.com/devrajsinh2012",
      demoUrl: ""
    },
    {
      title: "Library Management System",
      description: "Built a comprehensive full-stack library management system to automate book lending, user management, inventory tracking, and fine calculation processes. Implemented advanced search functionality, automated notifications, and detailed reporting capabilities.",
      technologies: ["MongoDB", "Express.js", "React", "Node.js", "MERN Stack", "Authentication", "Database Design"],
      category: "MERN Stack",
      role: "Full Stack Developer",
      outcome: "Streamlined library operations serving 2,000+ users, reduced manual work by 60%, and improved book tracking accuracy by 98% with automated inventory management system.",
      sourceCodeUrl: "https://github.com/devrajsinh2012",
      demoUrl: ""
    },
    {
      title: "Hotel Management Data Analysis",
      description: "Conducted comprehensive exploratory data analysis on hotel management operations to identify patterns, trends, and optimization opportunities. Analyzed customer behavior, revenue patterns, occupancy rates, and seasonal trends to provide strategic business insights.",
      technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "EDA", "Data Visualization", "Statistical Analysis"],
      category: "Data Analysis",
      role: "Data Analyst",
      outcome: "Provided actionable insights resulting in 20% increase in occupancy rates and 15% revenue growth through data-driven pricing strategies and operational optimization recommendations.",
      sourceCodeUrl: "https://github.com/devrajsinh2012",
      demoUrl: ""
    },
    {
      title: "MysticGraze - Astrology Website",
      description: "Designed and developed an interactive astrology website providing personalized horoscopes, astrological readings, and celestial insights. Implemented dynamic content generation, user personalization, and responsive design for optimal user experience across all devices.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Web Development", "Responsive Design", "API Integration"],
      category: "Web Development",
      role: "Web Developer",
      outcome: "Created an engaging user experience with 5,000+ active users, featuring interactive astrological features, 98% mobile responsiveness, and 40% increase in user engagement through personalized content.",
      sourceCodeUrl: "https://github.com/devrajsinh2012",
      demoUrl: ""
    },
    {
      title: "Soup and Saur - Project Management Documentation",
      description: "Comprehensive project management documentation and planning initiative to establish standardized processes, improve project delivery efficiency, and create scalable project management frameworks. Developed templates, workflows, and best practices documentation.",
      technologies: ["Project Management", "Documentation", "Process Design", "Planning", "Agile Methodology", "Quality Assurance"],
      category: "Project Management",
      role: "Project Manager",
      outcome: "Established comprehensive project management framework improving team coordination by 45%, reducing project delivery time by 25%, and achieving 95% on-time project completion rate.",
      sourceCodeUrl: "",
      demoUrl: ""
    }
  ];
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>("Business Analysis");

  // Define clean categories for filtering
  const categories = [
   "Business Analysis",
    "Data Analysis",
    "AI & Machine Learning", 
    "MERN Stack",
    "Web Development",
    "Mobile Development",
    "Digital Marketing",
    "Project Management",
    "Game Development"
  ];

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

  // Filter projects based on selected category
  const filteredProjects = filter
    ? projectsData.filter((project) => project.category === filter)
    : projectsData;

  const handleProjectClick = (projectTitle: string) => {
    setSelectedProject(projectTitle);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
    // Re-enable scrolling
    document.body.style.overflow = "auto";
  };

  // Find the selected project
  const selectedProjectData = projectsData.find(
    (project) => project.title === selectedProject
  );

  return (
    <section
      id="projects"
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
            <span className="text-teal font-mono mr-2">04.</span> Featured Projects
          </h2>
          <p className="text-slate max-w-3xl mt-4">
            A collection of projects that showcase my skills, expertise, and problem-solving
            approach. Each project reflects my dedication to delivering high-quality
            solutions.
          </p>
        </motion.div>

        {/* Category filter - Clean and organized */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setFilter(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === null
                  ? "bg-teal text-navy-dark shadow-lg"
                  : "bg-navy-light text-slate-light hover:text-teal hover:bg-navy-light/80"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? "bg-teal text-navy-dark shadow-lg"
                    : "bg-navy-light text-slate-light hover:text-teal hover:bg-navy-light/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project count indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-8"
        >
          <p className="text-slate font-mono text-sm">
            {filter ? `${filteredProjects.length} projects in ${filter}` : `${filteredProjects.length} total projects`}
          </p>
        </motion.div>

        {/* Project cards */}
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
            >
              <SpotlightCard 
                className="h-full flex flex-col p-6"
                spotlightColor="rgba(100, 255, 218, 0.15)"
              >
                {/* Project card content */}
                <div className="flex-1">
                  {/* Category badge */}
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-mono bg-teal/20 text-teal">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-light hover:text-teal transition-colors mb-3">
                    {project.title}
                  </h3>
                  <p className="text-slate mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-full text-xs font-mono bg-navy text-teal"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 rounded-full text-xs font-mono bg-navy text-slate">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Call to Action Button */}
                <div className="mt-4">
                  <button
                    onClick={() => handleProjectClick(project.title)}
                    className="w-full py-2 px-4 border border-teal rounded text-teal font-medium hover:bg-teal/10 transition-colors flex justify-between items-center"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Project detail modal */}
        <AnimatePresence>
          {selectedProject && selectedProjectData && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-navy-dark/90 backdrop-blur-sm z-50"
                onClick={closeProjectDetail}
              />
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                  <SpotlightCard 
                    className="overflow-hidden"
                    spotlightColor="rgba(100, 255, 218, 0.2)"
                  >
                    <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-navy-dark border-b border-navy-light">
                      <h2 className="text-2xl font-bold text-slate-light">
                        {selectedProjectData.title}
                      </h2>
                      <button
                        onClick={closeProjectDetail}
                        className="p-2 rounded-full hover:bg-navy-light transition-colors"
                        aria-label="Close details"
                      >
                        <X className="w-5 h-5 text-slate-light" />
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="mb-8">
                        {/* Category badge */}
                        <div className="mb-4">
                          <span className="inline-block px-3 py-1 rounded-full text-sm font-mono bg-teal/20 text-teal">
                            {selectedProjectData.category}
                          </span>
                        </div>

                        {/* Project header image (placeholder) */}
                        <div className="bg-navy-light h-48 rounded-md mb-6 flex items-center justify-center">
                          <p className="text-slate font-mono">Project preview image</p>
                        </div>

                        <h3 className="text-lg font-medium text-slate-light mb-3">Description</h3>
                        <p className="text-slate mb-4">
                          {selectedProjectData.description}
                        </p>

                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-slate-light mb-3">Role</h3>
                          <p className="text-slate">
                            {selectedProjectData.role}
                          </p>
                        </div>

                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-slate-light mb-3">Technologies Used</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProjectData.technologies.map((tech) => (
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
                            {selectedProjectData.outcome}
                          </p>
                        </div>

                        {/* External Links */}
                        <div className="mt-8 pt-6 border-t border-navy-light flex gap-4 justify-center">
                          {selectedProjectData.sourceCodeUrl && (
                            <a
                              href={selectedProjectData.sourceCodeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-teal text-navy-dark font-medium hover:bg-teal/90 transition-colors"
                            >
                              <Github className="w-4 h-4" />
                              <span>Source Code</span>
                            </a>
                          )}
                          
                          {selectedProjectData.demoUrl && (
                            <a
                              href={selectedProjectData.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-navy-light text-slate-light hover:text-teal transition-colors"
                            >
                              <Globe className="w-4 h-4" />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}