"use client";

import React, { useState } from "react";
import { usePortfolioData } from "@/context/data-context";
import { User, Mail, Phone, MapPin, Linkedin, Save } from "lucide-react";

export function PersonalInfoForm() {
  const { data, updatePersonalInfo } = usePortfolioData();
  const [formData, setFormData] = useState({ ...data.personalInfo });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a delay for API call
    setTimeout(() => {
      updatePersonalInfo(formData);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-light mb-6">Personal Information</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="name" className="block text-slate mb-2 flex items-center">
              <User className="w-4 h-4 mr-2 text-teal" />
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <label htmlFor="title" className="block text-slate mb-2 flex items-center">
              <User className="w-4 h-4 mr-2 text-teal" />
              Professional Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              placeholder="Your professional title"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-slate mb-2 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-teal" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              placeholder="Your email address"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-slate mb-2 flex items-center">
              <Phone className="w-4 h-4 mr-2 text-teal" />
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              placeholder="Your phone number"
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-slate mb-2 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-teal" />
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              placeholder="Your location"
            />
          </div>
          
          <div>
            <label htmlFor="linkedin" className="block text-slate mb-2 flex items-center">
              <Linkedin className="w-4 h-4 mr-2 text-teal" />
              LinkedIn URL
            </label>
            <input
              type="text"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              placeholder="Your LinkedIn URL"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="bio" className="block text-slate mb-2">
            Professional Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
            placeholder="Write a short professional bio"
          ></textarea>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-teal text-navy font-medium rounded flex items-center justify-center hover:bg-teal/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal focus:ring-offset-navy disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}