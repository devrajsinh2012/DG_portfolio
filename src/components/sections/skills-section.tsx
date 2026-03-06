"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  BarChart3, Sparkles, Code, PanelRightOpen, TrendingUp, PieChart, Search, GitBranch,
  LineChart, Target, Users, FileText, Zap,
  Briefcase, Calendar, CheckCircle2, Shield, Users2,
  Settings, Cog, Award, Activity, Truck,
  Cpu, FileSpreadsheet, Trello, BarChart, Database,
  Heart, Crown, MessageSquare, Brain, Lightbulb, Clock
} from 'lucide-react';

export function SkillsSection() {
  // Local data
  const skillsData = [
    {
      category: "Analysis",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "from-violet-500 to-purple-500",
      items: [
        {
          name: "Business Analysis",
          proficiency: 88,
          icon: <TrendingUp className="w-5 h-5" />,
          description: "Expertise in analyzing business processes, identifying gaps, and recommending solutions to improve efficiency and profitability."
        },
        {
          name: "Data Analysis & Interpretation",
          proficiency: 85,
          icon: <PieChart className="w-5 h-5" />,
          description: "Proficient in extracting insights from complex datasets to support strategic decision-making and business intelligence."
        },
        {
          name: "Market Research & Analysis",
          proficiency: 82,
          icon: <Search className="w-5 h-5" />,
          description: "Conducted comprehensive market studies to identify trends, competitive landscape, and growth opportunities."
        },
        {
          name: "Process Analysis & Mapping",
          proficiency: 86,
          icon: <GitBranch className="w-5 h-5" />,
          description: "Skilled in documenting and analyzing business processes to identify bottlenecks and optimization opportunities."
        }
      ]
    },
    {
      category: "Business Skills",
      icon: <LineChart className="w-6 h-6" />,
      color: "from-emerald-500 to-teal-500",
      items: [
        {
          name: "Strategic Planning",
          proficiency: 84,
          icon: <Target className="w-5 h-5" />,
          description: "Developed and executed strategic initiatives that align with organizational goals and market opportunities."
        },
        {
          name: "Stakeholder Management",
          proficiency: 90,
          icon: <Users className="w-5 h-5" />,
          description: "Successfully managed relationships with diverse stakeholders, ensuring alignment and effective communication."
        },
        {
          name: "Requirements Gathering",
          proficiency: 87,
          icon: <FileText className="w-5 h-5" />,
          description: "Expert in eliciting, documenting, and validating business requirements from various stakeholders."
        },
        {
          name: "Business Process Improvement",
          proficiency: 85,
          icon: <Zap className="w-5 h-5" />,
          description: "Implemented process improvements that resulted in increased efficiency and cost reduction."
        }
      ]
    },
    {
      category: "Project Management",
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-purple-500 to-blue-500",
      items: [
        {
          name: "Project Planning & Execution",
          proficiency: 89,
          icon: <Calendar className="w-5 h-5" />,
          description: "Led end-to-end project delivery with proven track record of meeting deadlines and budget constraints."
        },
        {
          name: "Agile & Scrum Methodologies",
          proficiency: 86,
          icon: <CheckCircle2 className="w-5 h-5" />,
          description: "Implemented Agile frameworks to improve team productivity and accelerate project delivery timelines."
        },
        {
          name: "Risk Management",
          proficiency: 83,
          icon: <Shield className="w-5 h-5" />,
          description: "Proactively identified and mitigated project risks, ensuring smooth project execution and delivery."
        },
        {
          name: "Cross-Functional Team Leadership",
          proficiency: 88,
          icon: <Users2 className="w-5 h-5" />,
          description: "Successfully led diverse teams across departments to achieve common objectives and deliverables."
        }
      ]
    },
    {
      category: "Operations",
      icon: <Settings className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      items: [
        {
          name: "Operations Management",
          proficiency: 87,
          icon: <Cog className="w-5 h-5" />,
          description: "Oversaw daily operations as COO intern, optimizing workflows and ensuring operational excellence."
        },
        {
          name: "Quality Assurance & Control",
          proficiency: 85,
          icon: <Award className="w-5 h-5" />,
          description: "Implemented quality control measures and standards to maintain high operational performance."
        },
        {
          name: "Performance Monitoring",
          proficiency: 86,
          icon: <Activity className="w-5 h-5" />,
          description: "Developed KPIs and monitoring systems to track operational efficiency and performance metrics."
        },
        {
          name: "Supply Chain Coordination",
          proficiency: 81,
          icon: <Truck className="w-5 h-5" />,
          description: "Coordinated with vendors and suppliers to ensure smooth operations and timely deliveries."
        }
      ]
    },
    {
      category: "Tools & Technologies",
      icon: <Cpu className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      items: [
        {
          name: "Microsoft Office Suite",
          proficiency: 92,
          icon: <FileSpreadsheet className="w-5 h-5" />,
          description: "Advanced proficiency in Excel, PowerPoint, and Word for data analysis, presentations, and documentation."
        },
        {
          name: "Project Management Tools",
          proficiency: 88,
          icon: <Trello className="w-5 h-5" />,
          description: "Experienced with Jira, Trello, Asana, and MS Project for project tracking and team collaboration."
        },
        {
          name: "Data Visualization",
          proficiency: 84,
          icon: <BarChart className="w-5 h-5" />,
          description: "Skilled in creating compelling visualizations using Power BI, Tableau, and advanced Excel charts."
        },
        {
          name: "Business Intelligence Tools",
          proficiency: 80,
          icon: <Database className="w-5 h-5" />,
          description: "Familiar with SQL, Power BI, and data analytics platforms for business intelligence and reporting."
        }
      ]
    },
    {
      category: "Soft Skills",
      icon: <Heart className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500",
      items: [
        {
          name: "Leadership & Mentoring",
          proficiency: 89,
          icon: <Crown className="w-5 h-5" />,
          description: "Demonstrated ability to lead teams, mentor junior staff, and drive organizational culture."
        },
        {
          name: "Communication & Presentation",
          proficiency: 93,
          icon: <MessageSquare className="w-5 h-5" />,
          description: "Exceptional verbal and written communication skills with experience presenting to senior management."
        },
        {
          name: "Problem-Solving & Critical Thinking",
          proficiency: 90,
          icon: <Brain className="w-5 h-5" />,
          description: "Strong analytical mindset with ability to solve complex problems and make data-driven decisions."
        },
        {
          name: "Adaptability & Learning Agility",
          proficiency: 91,
          icon: <Lightbulb className="w-5 h-5" />,
          description: "Quick to adapt to new environments and technologies, with a continuous learning mindset."
        },
        {
          name: "Time Management & Organization",
          proficiency: 88,
          icon: <Clock className="w-5 h-5" />,
          description: "Excellent at prioritizing tasks, managing multiple projects simultaneously, and meeting deadlines."
        }
      ]
    }
  ];
  
  const [activeCategory, setActiveCategory] = useState<string>("Analysis");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [skillsToShow, setSkillsToShow] = useState<any[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Skills filtering logic
  useEffect(() => {
    if (activeCategory === "all") {
      const allSkills = skillsData.flatMap(category => 
        category.items.map(item => ({
          ...item,
          categoryName: category.category,
          categoryColor: category.color,
          categoryIcon: category.icon
        }))
      );
      setSkillsToShow(allSkills);
    } else {
      const category = skillsData.find(cat => cat.category === activeCategory);
      if (category) {
        const skills = category.items.map(item => ({
          ...item,
          categoryName: category.category,
          categoryColor: category.color,
          categoryIcon: category.icon
        }));
        setSkillsToShow(skills);
      }
    }
  }, [activeCategory]);

  // Mouse tracking for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.setProperty("--rotateX", `${rotateX}deg`);
    card.style.setProperty("--rotateY", `${rotateY}deg`);
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rotateX", "0deg");
    card.style.setProperty("--rotateY", "0deg");
  };

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
      id="skills"
      ref={sectionRef}
      className="py-20 px-6 bg-navy relative overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="section-heading justify-center">
            <span className="text-teal font-mono mr-2">02.</span> Skills & Expertise
          </h2>
          <p className="text-slate max-w-3xl mt-4 mx-auto text-lg">
            A comprehensive overview of my professional capabilities, organized by domain expertise.
          </p>
        </motion.div>

        {/* Category Navigation - Keeping the new button format */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            <button 
              onClick={() => setActiveCategory("all")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                activeCategory === "all" 
                  ? "bg-teal text-navy shadow-lg shadow-teal/25" 
                  : "bg-navy-light text-slate-light hover:bg-navy-lighter border border-slate-700"
              }`}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              All Skills
            </button>
            
            {skillsData.map((category) => (
              <button 
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                  activeCategory === category.category 
                    ? "bg-teal text-navy shadow-lg shadow-teal/25" 
                    : "bg-navy-light text-slate-light hover:bg-navy-lighter border border-slate-700"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid - Bringing back the card style with gradients */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillsToShow.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 * index }}
                className="skill-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseOut={() => setHoveredSkill(null)}
                style={{
                  transform: `perspective(1000px) rotateX(var(--rotateX, 0deg)) rotateY(var(--rotateY, 0deg))`,
                  transition: "transform 0.3s ease"
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`p-6 rounded-lg border border-slate-700 bg-navy-light relative overflow-hidden h-full`}>
                  {/* Spotlight effect */}
                  <div 
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(100, 255, 218, 0.15), transparent 50%)`,
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Category badge with gradient */}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-gradient-to-r ${skill.categoryColor} text-slate-900`}>
                      {skill.categoryIcon}
                      <span className="ml-1">{skill.categoryName}</span>
                    </div>
                    
                    <div className="flex items-start mb-3">
                      <div className="p-2 bg-navy rounded-md mr-3">
                        <div className="text-teal">
                          {skill.icon}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-slate-light">{skill.name}</h3>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate">Proficiency</span>
                        <span className="text-teal font-mono text-sm">{skill.proficiency}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-navy overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.2 * index }}
                          className="h-full bg-gradient-to-r from-teal to-teal/80 rounded-full"
                        />
                      </div>
                    </div>
                    
                    <p className="text-slate text-sm leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}