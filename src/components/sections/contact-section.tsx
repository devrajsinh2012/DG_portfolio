"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, Download, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import emailjs from '@emailjs/browser';

export function ContactSection() {
  // Initialize EmailJS
  React.useEffect(() => {
    emailjs.init("Uj-VVrQiWzviJMn0C");
  }, []);
  
  // Local data
  const personalInfo = {
    name: "Devrajsinh Gohil",
    email: "djgohil2012@gmail.com",
    phone: "+91-8160529391",
    location: "Rajkot, Gujarat, India",
    linkedin: "linkedin.com/in/devrajsinh2012/",
    resumeUrl: "https://drive.google.com/file/d/1TdFy_gL_1CclA9OiDNQYjKFuEifVORFF/view?usp=sharing"
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
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      url: "https://instagram.com/devrajsinh2012",
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
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    
    try {
      // Validate form fields
      if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
        throw new Error("Please fill in all required fields");
      }
      
      // EmailJS template parameters
      const templateParams = {
        to_name: "Devrajsinh Gohil",
        from_name: formState.name,
        from_email: formState.email,
        subject: formState.subject || "New Contact Form Submission",
        message: formState.message,
        reply_to: formState.email,
      };
      
      // Send email using EmailJS
      const response = await emailjs.send(
        "service_vrqmj3c",
        "template_48qioyh", 
        templateParams,
        "Uj-VVrQiWzviJMn0C" // Public key as 4th parameter
      );
      
      console.log("Email sent successfully:", response);
      setFormStatus("success");
      
      // Reset form
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
    } catch (error) {
      console.error("Failed to send email:", error);
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
      
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-6 bg-slate-900"
    >
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-teal mb-4">
            <span className="text-teal font-mono mr-2">07.</span> Get In Touch
          </h2>
          <p className="text-slate-300 max-w-3xl mt-4">
            Interested in working together? Feel free to reach out through the contact form
            or connect with me on social media.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-2xl font-bold text-slate-100 mb-8"
            >
              Send a Message
            </motion.h3>

            <motion.form
              variants={itemVariants}
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-slate-200 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-transparent text-slate-100"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-slate-200 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-transparent text-slate-100"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-slate-200 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-transparent text-slate-100"
                  placeholder="Project Inquiry"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-slate-200 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-transparent text-slate-100 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center bg-teal text-slate-900 px-6 py-3 rounded-md font-medium transition-colors hover:bg-teal/80 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </motion.button>

              {formStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-teal/10 border border-teal rounded-md text-teal"
                >
                  Your message has been sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {formStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500 rounded-md text-red-400"
                >
                  Failed to send your message. Please check your connection and try again later.
                </motion.div>
              )}
            </motion.form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-2xl font-bold text-slate-100 mb-8"
            >
              Contact Information
            </motion.h3>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-start">
                <div className="bg-slate-800 p-3 rounded-full mr-4">
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

              <div className="flex items-start">
                <div className="bg-slate-800 p-3 rounded-full mr-4">
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

              <div className="flex items-start">
                <div className="bg-slate-800 p-3 rounded-full mr-4">
                  <MapPin className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium mb-1">Location</h4>
                  <p className="text-slate-300">{personalInfo.location}</p>
                </div>
              </div>
              
              {/* Social Media Links */}
              <motion.div variants={itemVariants} className="mt-8">
                <h4 className="text-slate-200 font-medium mb-3">Connect With Me</h4>
                <div className="flex space-x-4">
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
            </motion.div>

            {/* Resume Download */}
            <motion.div
              variants={itemVariants}
              className="mt-12 p-6 bg-slate-800 rounded-lg border border-slate-700 text-center"
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