"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Download, Github, Linkedin, Twitter } from "lucide-react";

export function ContactSection() {
  // Local data
  const personalInfo = {
    name: "Devrajsinh Gohil",
    email: "djgohil2012@gmail.com",
    phone: "+91-8160529391",
    location: "Rajkot, Gujarat, India",
    linkedin: "linkedin.com/in/devrajsinh2012/",
    resumeUrl: "https://drive.google.com/file/d/1vTrvd6heawMk6rik6WhBVNJyVJvcvxDF/view?usp=sharing"
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/devrajsinh2012",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: `https://linkedin.com/in/devrajsinh2012`,
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      url: "https://twitter.com/devrajsinh2012",
    },
    {
      name: "Medium",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
        </svg>
      ),
      url: "https://medium.com/@devrajsinh2012",
    },
  ];

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
      id="contact"
      ref={sectionRef}
      className="py-20 px-6 bg-slate-900"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-teal mb-4">
            <span className="text-teal font-mono mr-2">07.</span> Get In Touch
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto mt-4">
            Interested in working together? Feel free to reach out via email or connect with me on social media.
          </p>
        </motion.div>

        {/* Centered Card */}
        <div className="flex justify-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full max-w-lg"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-slate-100 mb-8 text-center"
            >
              Contact Information
            </motion.h3>

            {/* Contact Items */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center">
                <div className="bg-slate-800 p-3 rounded-full mr-4 flex-shrink-0">
                  <Mail className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium mb-1">Email</h4>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-slate-300 hover:text-teal transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-slate-800 p-3 rounded-full mr-4 flex-shrink-0">
                  <Phone className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium mb-1">Phone</h4>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="text-slate-300 hover:text-teal transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-slate-800 p-3 rounded-full mr-4 flex-shrink-0">
                  <MapPin className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium mb-1">Location</h4>
                  <p className="text-slate-300">{personalInfo.location}</p>
                </div>
              </div>
            </motion.div>

            {/* Social Media Links */}
            <motion.div variants={itemVariants} className="mt-8 text-center">
              <h4 className="text-slate-200 font-medium mb-4">Connect With Me</h4>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-800 p-3 rounded-full hover:bg-teal hover:text-slate-900 transition-colors text-slate-300"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Resume Download */}
            <motion.div
              variants={itemVariants}
              className="mt-10 p-6 bg-slate-800 rounded-lg border border-slate-700 text-center"
            >
              <h4 className="text-slate-200 font-bold mb-3">Download My Resume</h4>
              <p className="text-slate-300 mb-6">
                Get a comprehensive overview of my skills, experience, and qualifications.
              </p>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-3 bg-teal text-slate-900 font-medium rounded-md hover:bg-teal/80 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}