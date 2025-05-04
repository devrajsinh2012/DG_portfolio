"use client";

import React, { useState } from "react";
import { usePortfolioData } from "@/context/data-context";
import { Save, Mail, Phone, MapPin, Linkedin, Instagram, Twitter, GitHub } from "lucide-react";

export function ContactForm() {
  const { data, updatePersonalInfo } = usePortfolioData();
  const [formData, setFormData] = useState({ 
    ...data.personalInfo,
    socialLinks: {
      linkedin: data.personalInfo.linkedin || "",
      github: "github.com/yourusername",
      twitter: "twitter.com/yourusername",
      instagram: "instagram.com/yourusername"
    },
    formSettings: {
      emailRecipient: data.personalInfo.email,
      emailSubjectPrefix: "[Portfolio Contact]",
      showPhone: true,
      showSocial: true
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const [parent, child] = name.split('.');
    
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...(prev as any)[parent],
        [child]: checked
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Extract the core personal info fields and update them
    const personalInfo = {
      name: formData.name,
      title: formData.title,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      linkedin: formData.socialLinks.linkedin,
      bio: formData.bio
    };
    
    // Simulate a delay for API call
    setTimeout(() => {
      updatePersonalInfo(personalInfo);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-light mb-6">Contact Information</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Primary Contact Info */}
          <div>
            <h3 className="text-lg font-medium text-slate-light mb-4">Primary Contact Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="your@email.com"
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
                  placeholder="+1 234 567 8900"
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="showPhone"
                    name="formSettings.showPhone"
                    checked={formData.formSettings.showPhone}
                    onChange={handleToggleChange}
                    className="mr-2"
                  />
                  <label htmlFor="showPhone" className="text-slate text-sm">
                    Display phone number on website
                  </label>
                </div>
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
                  placeholder="City, Country"
                />
              </div>
              
              <div>
                <label htmlFor="formSettings.emailRecipient" className="block text-slate mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-teal" />
                  Contact Form Recipient
                </label>
                <input
                  type="email"
                  id="formSettings.emailRecipient"
                  name="formSettings.emailRecipient"
                  value={formData.formSettings.emailRecipient}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="Where to receive form submissions"
                />
              </div>
            </div>
          </div>
          
          {/* Social Links */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-slate-light">Social Media Links</h3>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showSocial"
                  name="formSettings.showSocial"
                  checked={formData.formSettings.showSocial}
                  onChange={handleToggleChange}
                  className="mr-2"
                />
                <label htmlFor="showSocial" className="text-slate text-sm">
                  Display social links on website
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="socialLinks.linkedin" className="block text-slate mb-2 flex items-center">
                  <Linkedin className="w-4 h-4 mr-2 text-teal" />
                  LinkedIn
                </label>
                <input
                  type="text"
                  id="socialLinks.linkedin"
                  name="socialLinks.linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="linkedin.com/in/username"
                />
              </div>
              
              <div>
                <label htmlFor="socialLinks.github" className="block text-slate mb-2 flex items-center">
                  <GitHub className="w-4 h-4 mr-2 text-teal" />
                  GitHub
                </label>
                <input
                  type="text"
                  id="socialLinks.github"
                  name="socialLinks.github"
                  value={formData.socialLinks.github}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="github.com/username"
                />
              </div>
              
              <div>
                <label htmlFor="socialLinks.twitter" className="block text-slate mb-2 flex items-center">
                  <Twitter className="w-4 h-4 mr-2 text-teal" />
                  Twitter
                </label>
                <input
                  type="text"
                  id="socialLinks.twitter"
                  name="socialLinks.twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="twitter.com/username"
                />
              </div>
              
              <div>
                <label htmlFor="socialLinks.instagram" className="block text-slate mb-2 flex items-center">
                  <Instagram className="w-4 h-4 mr-2 text-teal" />
                  Instagram
                </label>
                <input
                  type="text"
                  id="socialLinks.instagram"
                  name="socialLinks.instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="instagram.com/username"
                />
              </div>
            </div>
          </div>
          
          {/* Contact Form Settings */}
          <div>
            <h3 className="text-lg font-medium text-slate-light mb-4">Contact Form Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="formSettings.emailSubjectPrefix" className="block text-slate mb-2">
                  Email Subject Prefix
                </label>
                <input
                  type="text"
                  id="formSettings.emailSubjectPrefix"
                  name="formSettings.emailSubjectPrefix"
                  value={formData.formSettings.emailSubjectPrefix}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="[Portfolio Contact]"
                />
              </div>
              
              <div>
                <label htmlFor="contactPreference" className="block text-slate mb-2">
                  Preferred Contact Method
                </label>
                <select
                  id="contactPreference"
                  name="contactPreference"
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="either">Either</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Map Integration */}
          <div>
            <h3 className="text-lg font-medium text-slate-light mb-4">Map Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="mapEnabled" className="block text-slate mb-2">
                  Show Map
                </label>
                <select
                  id="mapEnabled"
                  name="mapEnabled"
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="mapZoomLevel" className="block text-slate mb-2">
                  Map Zoom Level
                </label>
                <select
                  id="mapZoomLevel"
                  name="mapZoomLevel"
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                >
                  <option value="city">City Level</option>
                  <option value="region">Region Level</option>
                  <option value="country">Country Level</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="mapCoordinates" className="block text-slate mb-2">
                  Precise Map Coordinates (optional)
                </label>
                <input
                  type="text"
                  id="mapCoordinates"
                  name="mapCoordinates"
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="e.g. 40.7128,-74.0060"
                />
                <p className="text-slate text-xs mt-1">
                  Leave blank to use your location name for geocoding
                </p>
              </div>
            </div>
          </div>
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