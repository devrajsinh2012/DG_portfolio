"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { usePortfolioData } from "@/context/data-context";
import { Mail, Phone, MapPin, Send, Download } from "lucide-react";

export function ContactSection() {
  const { data } = usePortfolioData();
  const { personalInfo } = data;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus("success");
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-6 bg-navy"
    >
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading justify-center">
            <span className="text-teal font-mono mr-2">06.</span> Get In Touch
          </h2>
          <p className="text-slate max-w-2xl mx-auto mt-4">
            I'm currently open to new opportunities and collaborations. Feel free to reach out if you're looking 
            for a passionate project management professional to join your team or for any inquiries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-xl font-bold text-slate-light">Send a Message</h3>
              <div className="w-16 h-1 bg-teal mt-2"></div>
            </motion.div>

            <form onSubmit={handleSubmit}>
              <motion.div variants={itemVariants} className="mb-4">
                <label htmlFor="name" className="block text-slate mb-1 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="Your Name"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label htmlFor="email" className="block text-slate mb-1 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="Your Email"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label htmlFor="subject" className="block text-slate mb-1 text-sm">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="Subject"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <label htmlFor="message" className="block text-slate mb-1 text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
                  placeholder="Your Message"
                ></textarea>
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-teal text-navy font-medium rounded flex items-center justify-center hover:bg-teal/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal focus:ring-offset-navy disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Form Status */}
                {formStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-500/10 text-green-500 border border-green-500/20 rounded-md"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {formStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-md"
                  >
                    Error sending message. Please try again later.
                  </motion.div>
                )}
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-xl font-bold text-slate-light">Contact Information</h3>
              <div className="w-16 h-1 bg-teal mt-2"></div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-start">
                <div className="bg-navy-light p-3 rounded-full mr-4">
                  <Mail className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <h4 className="text-slate-light font-medium mb-1">Email</h4>
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="text-slate hover:text-teal transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-navy-light p-3 rounded-full mr-4">
                  <Phone className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <h4 className="text-slate-light font-medium mb-1">Phone</h4>
                  <a 
                    href={`tel:${personalInfo.phone}`}
                    className="text-slate hover:text-teal transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-navy-light p-3 rounded-full mr-4">
                  <MapPin className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <h4 className="text-slate-light font-medium mb-1">Location</h4>
                  <p className="text-slate">{personalInfo.location}</p>
                </div>
              </div>
            </motion.div>

            {/* Resume Download */}
            <motion.div
              variants={itemVariants}
              className="mt-12 p-6 bg-navy-light rounded-lg border border-navy text-center"
            >
              <h4 className="text-slate-light font-bold mb-3">Download My Resume</h4>
              <p className="text-slate mb-6">
                Get a comprehensive overview of my skills, experience, and qualifications.
              </p>
              <a
                href="/resume/DevrajsinhGohil_Resume.pdf"
                download
                className="inline-flex items-center px-5 py-3 bg-teal text-navy font-medium rounded-md hover:bg-teal/90 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Location Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 bg-navy-light p-4 rounded-lg overflow-hidden h-64 relative"
        >
          {/* Map Placeholder - Would be replaced with actual map in production */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-teal mx-auto mb-2" />
              <p className="text-slate-light font-medium">Rajkot, Gujarat, India</p>
              <p className="text-slate text-sm">Map integration would be here</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}