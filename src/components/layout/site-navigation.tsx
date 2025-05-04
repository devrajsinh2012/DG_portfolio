"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoginModal } from "@/components/admin/login-modal";
import { useAuth } from "@/context/auth-context";
import { usePortfolioData } from "@/context/data-context";

export function SiteNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isAdmin } = useAuth();
  const { data } = usePortfolioData();

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
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
          <a href="#home" className="text-xl md:text-2xl font-bold text-primary hover:text-teal transition-colors">
            <span className="text-teal">D</span>evrajsinh
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <ul className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <li key={item.href}>
                  <a 
                    href={item.href}
                    className="nav-link px-3 py-2 flex items-center"
                  >
                    <span className="text-teal font-mono text-xs mr-1">{`0${index + 1}.`}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={toggleTheme}
                  className="p-2 ml-2 rounded-full hover:bg-navy-light transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-teal" />
                  ) : (
                    <Moon className="w-5 h-5 text-teal" />
                  )}
                </button>
              </li>
              <li>
                <button
                  onClick={openLoginModal}
                  className="p-2 ml-2 rounded-full hover:bg-navy-light transition-colors relative"
                  aria-label="Admin login"
                >
                  <User className={cn("w-5 h-5", isAdmin ? "text-teal" : "text-slate")} />
                  {isAdmin && (
                    <span className="absolute top-0 right-0 block w-2 h-2 rounded-full bg-teal"></span>
                  )}
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-navy-light transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-teal" />
              ) : (
                <Moon className="w-5 h-5 text-teal" />
              )}
            </button>
            <button
              onClick={openLoginModal}
              className="p-2 rounded-full hover:bg-navy-light transition-colors relative"
              aria-label="Admin login"
            >
              <User className={cn("w-5 h-5", isAdmin ? "text-teal" : "text-slate")} />
              {isAdmin && (
                <span className="absolute top-0 right-0 block w-2 h-2 rounded-full bg-teal"></span>
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-navy-light transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-teal" />
              ) : (
                <Menu className="w-6 h-6 text-teal" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-40 w-3/4 bg-navy shadow-xl md:hidden"
          >
            <div className="flex flex-col h-full py-20 px-8">
              <nav className="flex-grow">
                <ul className="flex flex-col space-y-4">
                  {navItems.map((item, index) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="flex items-center text-lg py-2 hover:text-teal transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-teal font-mono text-sm mr-2">{`0${index + 1}.`}</span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto">
                <p className="text-sm text-slate-light">
                  &copy; {new Date().getFullYear()} {data.personalInfo.name}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}