"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ExternalLink, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";

export function CertificationsSection() {
  // Local data
  const certificationsData = [
    {
      "name": "Google AI Essentials",
      "issuer": "Coursera.org",
      "date": "2024",
      "description": "Successfully completed an online non-credit course in Google AI Essentials, authorized by Google and offered through Coursera.",
      "skills": ["Artificial Intelligence (AI)", "Machine Learning Fundamentals", "AI Concepts", "Prompt Engineering", "Google AI"],
      "imageUrl": "/images/certi/AI.png",
      "url": "https://coursera.org/verify/CT579R2V78X5"
    },
    {
      "name": "Google Business Intelligence Professional Certificate",
      "issuer": "Coursera.org",
      "date": "2024",
      "description": "Completed a professional certificate consisting of three courses, designed to prepare for entry-level roles in business intelligence, focusing on transforming data into actionable insights, data visualizations, and dashboard creation.",
      "skills": ["Business Intelligence", "Data Modeling", "Data Pipelines", "Data Visualization", "Dashboards", "Reports", "Business Decisions"],
      "imageUrl": "/images/certi/BI.png",
      "url": "https://www.coursera.org/account/accomplishments/specialization/II1FSYEHWR80"
    },
    {
      "name": "CCNAv7: Introduction to Networks",
      "issuer": "Cisco Networking Academy",
      "date": "2024",
      "description": "Successfully completed the CCNAv7: Introduction to Networks course through the Cisco Networking Academy program.",
      "skills": ["Networking Fundamentals", "Network Protocols", "IP Addressing", "Network Devices", "Cisco Routers and Switches"],
      "imageUrl": "/images/certi/CCNA.png",
      "url": "https://www.credly.com/badges/bb627b5a-e982-4977-9103-9e7dc763fe26"
    },
    {
      "name": "Google Data Analytics Professional Certificate",
      "issuer": "Coursera.org",
      "date": "2024",
      "description": "Completed an eight-course professional certificate developed by Google, covering data analysis from preparation to sharing for thoughtful action, and utilizing tools like spreadsheets, SQL, Tableau, and R.",
      "skills": ["Data Analytics", "Spreadsheets", "SQL", "Tableau", "R Programming", "Data Cleaning", "Data Processing", "Data Visualization", "Case Study Analysis"],
      "imageUrl": "/images/certi/DA.png",
      "url": "https://coursera.org/verify/professional-cert/HCSYCWHN6PJ3"
    },
    {
      "name": "Foundations of Data Science",
      "issuer": "Coursera.org",
      "date": "2024",
      "description": "Successfully completed an online non-credit course in the foundations of data science, authorized by Google and offered through Coursera.",
      "skills": ["Data Science Fundamentals", "Data Analysis", "Statistical Concepts", "Data Interpretation", "Problem Solving"],
      "imageUrl": "/images/certi/FDS.png",
      "url": "https://coursera.org/verify/LMUC1J86WPR7"
    },
    {
      "name": "Machine Learning with Scikit-Learn in Python",
      "issuer": "Infosys Springboard",
      "date": "2025",
      "description": "Successfully completed a course on Machine Learning with Scikit-Learn in Python.",
      "skills": ["Machine Learning", "Scikit-Learn", "Python Programming", "Data Preprocessing", "Model Training", "Model Evaluation"],
      "imageUrl": "/images/certi/ML.png",
      "url": "https://verify.onwingspan.com"
    },
    {
      "name": "Google Project Management Professional Certificate",
      "issuer": "Coursera.org",
      "date": "2024",
      "description": "Completed a six-course professional certificate developed by Google, covering initiating, planning, and running both traditional and agile projects, designed for introductory-level roles in project management.",
      "skills": ["Project Management", "Project Initiation", "Project Planning", "Project Execution", "Agile Methodologies", "Scrum", "Team Leadership"],
      "imageUrl": "/images/certi/PM.jpg",
      "url": "https://coursera.org/verify/professional-cert/5B9AXP6FALC2"
    },
    {
      "name": "Google Prompting Essentials",
      "issuer": "Coursera.org",
      "date": "2024",
      "description": "Successfully completed an online non-credit course in Google Prompting Essentials, authorized by Google and offered through Coursera.",
      "skills": ["Prompt Engineering", "AI Prompting", "Generative AI", "Effective Communication", "AI Tools"],
      "imageUrl": "/images/certi/PROMP.png",
      "url": "https://coursera.org/verify/DZBQ3GM1SWQQ"
    },
    {
      "name": "Programming for Everybody (Getting Started with Python)",
      "issuer": "University of Michigan (Coursera)",
      "date": "2023",
      "description": "Successfully completed an online non-credit course on Python programming fundamentals, authorized by the University of Michigan and offered through Coursera.",
      "skills": ["Python Programming", "Programming Fundamentals", "Basic Data Structures", "Functions", "Problem Solving"],
      "imageUrl": "/images/certi/PY.png",
      "url": "https://coursera.org/verify/8TTXAWW83DMU"
    },
    {
      "name": "Database Programming with SQL",
      "issuer": "Oracle Academy",
      "date": "2023",
      "description": "Satisfactorily completed all coursework for Database Programming with SQL.",
      "skills": ["SQL", "Database Management", "Database Queries", "Data Manipulation Language (DML)", "Data Definition Language (DDL)"],
      "imageUrl": "/images/certi/SQL.png",
      "url": "https://www.credly.com/badges/100000000000000000000000/public_url"
    },
    {
      "name": "Google UX Design Professional Certificate",
      "issuer": "Coursera.org",
      "date": "2024",
      "description": "Completed a seven-course professional certificate developed by Google, covering the UX design process from beginning to end, including empathizing with users, ideation, wireframing, prototyping, and testing designs.",
      "skills": ["User Experience (UX) Design", "User Research", "Wireframing", "Prototyping", "Figma", "User Interface (UI) Design", "User Testing", "Design Thinking"],
      "imageUrl": "/images/certi/UX.png",
      "url": "https://www.coursera.org/account/accomplishments/specialization/87LU21IW8QCY"
    }
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [currentCertSlide, setCurrentCertSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const certSliderRef = useRef<HTMLDivElement>(null);

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

  // Handle auto-play for certification slider (slower speed - 8 seconds)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay && certificationsData.length > 1) {
      interval = setInterval(() => {
        setCurrentCertSlide((prev) => (prev + 1) % certificationsData.length);
      }, 8000); // Medium speed (8 seconds)
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, certificationsData.length]);

  const goToPrevSlide = () => {
    setCurrentCertSlide((prev) => (prev - 1 + certificationsData.length) % certificationsData.length);
  };

  const goToNextSlide = () => {
    setCurrentCertSlide((prev) => (prev + 1) % certificationsData.length);
  };

  const toggleAutoPlay = () => {
    setAutoPlay((prev) => !prev);
  };

  return (
    <section
      id="certifications"
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
            <span className="text-teal font-mono mr-2">05.</span> Certifications
          </h2>
          <p className="text-slate max-w-3xl mt-4">
            Professional certifications that have enhanced my skills and expertise in various domains.
          </p>
        </motion.div>

        {/* Certification Slider Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center">
            <div className="mr-4 p-2 rounded-full bg-navy-light">
              <Award className="w-6 h-6 text-teal" />
            </div>
            <h3 className="text-2xl font-bold text-slate-light">My Certifications</h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleAutoPlay}
              className="p-2 rounded-full bg-navy-light text-teal hover:bg-navy-dark transition-colors"
              aria-label={autoPlay ? "Pause slider" : "Play slider"}
            >
              {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {certificationsData.length > 1 && (
              <>
                <button
                  onClick={goToPrevSlide}
                  className="p-3 rounded-full bg-navy-light text-teal hover:bg-navy-dark transition-colors"
                  aria-label="Previous certification"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNextSlide}
                  className="p-3 rounded-full bg-navy-light text-teal hover:bg-navy-dark transition-colors"
                  aria-label="Next certification"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Big Card Certification Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative"
        >
          <div 
            ref={certSliderRef}
            className="overflow-hidden rounded-lg"
          >
            <div 
              className="transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentCertSlide * 100}%)` }}
            >
              <div className="flex">
                {certificationsData.map((cert) => (
                  <div 
                    key={cert.name} 
                    className="min-w-full"
                    style={{ width: "100%" }}
                  >
                    <div className="p-6 bg-navy-light rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Certificate Image */}
                        {/* Updated Image Container and Image Styling */}
                        <div className="relative h-64 md:h-auto flex items-center justify-center bg-navy-dark rounded-md overflow-hidden">
                          {cert.imageUrl ? (
                            <a 
                              href={cert.url} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full h-full relative group"
                            >
                              <Image 
                                src={cert.imageUrl}
                                alt={cert.name}
                                // Changed object-cover to object-contain
                                className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105 p-2" 
                                width={500}
                                height={300}
                                priority
                                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.style.display = 'none';
                                  // Show fallback content
                                  const parent = target.parentElement;
                                  if (parent) {
                                    const fallback = document.createElement('div');
                                    fallback.className = 'w-full h-full flex items-center justify-center bg-navy-dark';
                                    const award = document.createElement('div');
                                    award.className = 'text-teal/30 text-6xl flex items-center justify-center';
                                    award.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>';
                                    fallback.appendChild(award);
                                    parent.appendChild(fallback);
                                  }
                                }}
                              />
                              <div className="absolute inset-0 bg-teal/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <div className="p-3 rounded-full bg-navy-dark">
                                  <ExternalLink className="w-6 h-6 text-teal" />
                                </div>
                              </div>
                            </a>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-navy-dark rounded-md">
                              <Award className="w-16 h-16 text-teal/30" />
                            </div>
                          )}
                        </div>

                        {/* Certificate Details */}
                        <div>
                          <h4 className="text-2xl font-bold text-slate-light mb-3">
                            {cert.name}
                          </h4>
                          <p className="text-teal font-mono text-sm mb-2">{cert.issuer}</p>
                          <p className="text-slate-light text-sm mb-4">{cert.date}</p>
                          <p className="text-slate mb-6">{cert.description}</p>

                          {/* Skills covered */}
                          <div className="mt-4">
                            <h5 className="text-sm font-semibold text-slate-light mb-2">Skills Covered:</h5>
                            <div className="flex flex-wrap gap-2">
                              {cert.skills && cert.skills.map((skill) => (
                                <span 
                                  key={skill} 
                                  className="px-3 py-1 bg-navy-dark rounded-full text-xs font-mono text-teal"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* View Certificate Button */}
                          {cert.url && (
                            <a 
                              href={cert.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 mt-6 px-4 py-2 border border-teal rounded text-teal hover:bg-teal/10 transition-colors"
                            >
                              View Certificate <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pagination Indicators */}
          {certificationsData.length > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {certificationsData.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => setCurrentCertSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentCertSlide === index ? "bg-teal" : "bg-slate-light/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}