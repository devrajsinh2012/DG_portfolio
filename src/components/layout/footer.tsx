"use client";

import React from "react";
import { motion } from "framer-motion";
import { GitHub, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";
import { usePortfolioData } from "@/context/data-context";

export function Footer() {
  const { data } = usePortfolioData();
  const { personalInfo } = data;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <GitHub className="w-5 h-5" />,
      url: "https://github.com/",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: `https://${personalInfo.linkedin}`,
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      url: "https://twitter.com/",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      url: `mailto:${personalInfo.email}`,
    },
  ];

  return (
    <footer className="bg-navy-dark py-12 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          {/* Back to Top Button */}
          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ y: 0 }}
            onClick={scrollToTop}
            className="mb-8 p-3 rounded-full bg-navy-light text-teal hover:bg-navy transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>

          {/* Social Links */}
          <div className="flex space-x-6 mb-8">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, color: "#64ffda" }}
                className="text-slate hover:text-teal transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Bio Line */}
          <p className="text-center text-slate max-w-md mb-6">
            {personalInfo.name} - {personalInfo.title}
          </p>

          {/* Copyright */}
          <p className="text-center text-sm text-slate-dark">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>

          {/* Credit */}
          <p className="text-center text-xs text-slate-dark mt-2">
            <span className="text-teal">Designed & Built with ❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
}