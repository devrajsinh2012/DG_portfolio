"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function SiteNavigation() {
  // Local data
  const personalInfo = {
    name: "Devrajsinh Gohil"
  };
  
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Define navigation items
  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300",
          scrolled
            ? "bg-background/90 backdrop-blur-md shadow-md"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="text-xl md:text-2xl font-bold hover:text-teal transition-colors">
            <span className="text-teal">D</span>evrajsinh
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <ul className="flex items-center space-x-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href}
                    className="nav-link px-3 py-2 flex items-center"
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-navy-light transition-colors"
              aria-label="Toggle menu"
            >
              {mounted && (isMenuOpen ? (
                <X className="w-6 h-6 text-teal" />
              ) : (
                <Menu className="w-6 h-6 text-teal" />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && mounted && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-40 w-3/4 bg-navy shadow-xl md:hidden"
          >
            <div className="flex flex-col h-full py-20 px-8">
              <nav className="flex-grow">
                <ul className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="flex items-center text-lg py-2 hover:text-teal transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto">
                <p className="text-sm text-slate-light">
                  &copy; {new Date().getFullYear()} {personalInfo.name}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
