"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { usePortfolioData } from "@/context/data-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SkillsSection() {
  const { data } = usePortfolioData();
  const { skills } = data;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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

  // Format skill categories for tabs
  const categories = skills.map((category) => ({
    value: category.category.toLowerCase().replace(/\s+/g, "-"),
    label: category.category,
  }));

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 px-6 bg-navy"
    >
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading justify-center">
            <span className="text-teal font-mono mr-2">02.</span> My Skills
          </h2>
          <p className="text-slate max-w-2xl mx-auto mt-4">
            A comprehensive set of skills acquired through experience and continuous learning,
            enabling me to deliver exceptional results across various domains.
          </p>
        </motion.div>

        <Tabs defaultValue={categories[0].value} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-navy-light">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  className="data-[state=active]:bg-teal/10 data-[state=active]:text-teal"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {skills.map((category) => (
            <TabsContent
              key={category.category}
              value={category.category.toLowerCase().replace(/\s+/g, "-")}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {category.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="relative"
                  >
                    <div className="bg-navy-light rounded-lg p-6 h-full border border-navy-light hover:border-teal/30 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-slate-light font-bold">{skill.name}</h3>
                        <span className="text-teal font-mono text-sm">
                          {skill.proficiency}%
                        </span>
                      </div>

                      <div className="skill-bar mb-4">
                        <motion.div
                          className="skill-progress"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        ></motion.div>
                      </div>

                      <p className="text-slate text-sm">
                        {skill.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Skill chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 p-8 bg-navy-light rounded-lg border border-navy-light"
        >
          <h3 className="text-xl font-bold text-slate-light mb-6 text-center">Skill Overview</h3>
          <div className="relative h-64">
            {/* This is a simple visual representation - would be enhanced with real chart in production */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="radar-chart">
                  {/* Concentric circles */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[80%] h-[80%] rounded-full border border-slate/10"></div>
                    <div className="w-[60%] h-[60%] rounded-full border border-slate/20"></div>
                    <div className="w-[40%] h-[40%] rounded-full border border-slate/30"></div>
                    <div className="w-[20%] h-[20%] rounded-full border border-slate/40"></div>
                  </div>

                  {/* Simulated radar chart points */}
                  {skills.flatMap((category) =>
                    category.items.map((skill, index, array) => {
                      const angle = (index * (360 / array.length) * Math.PI) / 180;
                      const radius = (skill.proficiency / 100) * 40; // 40% of container
                      const x = 50 + radius * Math.cos(angle);
                      const y = 50 + radius * Math.sin(angle);

                      return (
                        <div
                          key={skill.name}
                          className="absolute w-3 h-3 rounded-full bg-teal"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                        ></div>
                      );
                    })
                  )}

                  {/* Connect the dots to form the radar shape */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <polygon
                      points={skills
                        .flatMap((category) =>
                          category.items.map((skill, index, array) => {
                            const angle = (index * (360 / array.length) * Math.PI) / 180;
                            const radius = (skill.proficiency / 100) * 40;
                            const x = 50 + radius * Math.cos(angle);
                            const y = 50 + radius * Math.sin(angle);
                            return `${x},${y}`;
                          })
                        )
                        .join(" ")}
                      fill="rgba(100, 255, 218, 0.1)"
                      stroke="rgba(100, 255, 218, 0.5)"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}