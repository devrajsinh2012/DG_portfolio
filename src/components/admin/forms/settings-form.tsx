"use client";

import React, { useState } from "react";
import { usePortfolioData } from "@/context/data-context";
import { useTheme } from "next-themes";
import { 
  Save, 
  Download, 
  Upload, 
  RefreshCw, 
  Moon, 
  Sun, 
  Monitor,
  AlertTriangle,
  Info
} from "lucide-react";

export function SettingsForm() {
  const { data, resetData } = usePortfolioData();
  const { theme, setTheme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  const [formData, setFormData] = useState({
    seoCare: {
      metaTitle: "Devrajsinh Gohil | Project Management Professional",
      metaDescription: "Portfolio website of Devrajsinh Gohil, a Project Management Professional with expertise in digital marketing, cross-functional coordination, and product management.",
      keywords: "project management, digital marketing, product management, portfolio, Devrajsinh Gohil",
      socialImage: "og-image.png"
    },
    advancedSettings: {
      analyticsId: "",
      cacheTime: "3600",
      lazyLoading: true,
      cookieConsent: true
    }
  });

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    }
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // In a real implementation, we would save these settings
    }, 800);
  };

  const handleExportData = () => {
    // Create a JSON blob and download it
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    // Trigger hidden file input
    const fileInput = document.getElementById("import-file");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        // Here we would validate and import the data
        // For now, just show a success message
        alert("Data imported successfully!");
      } catch (error) {
        alert("Error importing data. Please check the file format.");
      }
    };
    reader.readAsText(file);
  };

  const confirmReset = () => {
    setIsResetting(true);
    
    // Simulate API call
    setTimeout(() => {
      resetData();
      setIsResetting(false);
      setShowResetConfirm(false);
    }, 800);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-light mb-6">General Settings</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Theme Settings */}
          <div>
            <h3 className="text-lg font-medium text-slate-light mb-4">Appearance</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="theme" className="block text-slate mb-2">
                  Color Theme
                </label>
                <select
                  id="theme"
                  value={theme}
                  onChange={handleThemeChange}
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
                <p className="text-slate text-xs mt-1">
                  Choose the default color theme for your website
                </p>
              </div>
              
              <div className="flex items-center space-x-4 pt-8">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`p-2 rounded-full ${
                    theme === 'light' ? 'bg-teal text-navy' : 'bg-navy-light text-slate'
                  }`}
                >
                  <Sun className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`p-2 rounded-full ${
                    theme === 'dark' ? 'bg-teal text-navy' : 'bg-navy-light text-slate'
                  }`}
                >
                  <Moon className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('system')}
                  className={`p-2 rounded-full ${
                    theme === 'system' ? 'bg-teal text-navy' : 'bg-navy-light text-slate'
                  }`}
                >
                  <Monitor className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* SEO Settings */}
          <div>
            <h3 className="text-lg font-medium text-slate-light mb-4">SEO Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="seoCare.metaTitle" className="block text-slate mb-2">
                  Page Title
                </label>
                <input
                  type="text"
                  id="seoCare.metaTitle"
                  name="seoCare.metaTitle"
                  value={formData.seoCare.metaTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="Your page title for search engines"
                />
              </div>
              
              <div>
                <label htmlFor="seoCare.metaDescription" className="block text-slate mb-2">
                  Meta Description
                </label>
                <textarea
                  id="seoCare.metaDescription"
                  name="seoCare.metaDescription"
                  value={formData.seoCare.metaDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
                  placeholder="Brief description of your portfolio (150-160 characters recommended)"
                ></textarea>
                <p className="text-slate text-xs mt-1">
                  Characters: {formData.seoCare.metaDescription.length}/160
                </p>
              </div>
              
              <div>
                <label htmlFor="seoCare.keywords" className="block text-slate mb-2">
                  Keywords
                </label>
                <input
                  type="text"
                  id="seoCare.keywords"
                  name="seoCare.keywords"
                  value={formData.seoCare.keywords}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="Comma-separated keywords"
                />
              </div>
              
              <div>
                <label htmlFor="seoCare.socialImage" className="block text-slate mb-2">
                  Social Media Image
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="seoCare.socialImage"
                    name="seoCare.socialImage"
                    value={formData.seoCare.socialImage}
                    onChange={handleChange}
                    className="flex-grow px-4 py-2 rounded-l bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="Path to your OG image"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-navy-light text-slate rounded-r hover:text-teal transition-colors"
                  >
                    Browse
                  </button>
                </div>
                <p className="text-slate text-xs mt-1">
                  Recommended size: 1200x630 pixels
                </p>
              </div>
            </div>
          </div>
          
          {/* Advanced Settings */}
          <div>
            <h3 className="text-lg font-medium text-slate-light mb-4">Advanced Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="advancedSettings.analyticsId" className="block text-slate mb-2">
                  Google Analytics ID
                </label>
                <input
                  type="text"
                  id="advancedSettings.analyticsId"
                  name="advancedSettings.analyticsId"
                  value={formData.advancedSettings.analyticsId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="e.g. G-XXXXXXXXXX"
                />
              </div>
              
              <div>
                <label htmlFor="advancedSettings.cacheTime" className="block text-slate mb-2">
                  Browser Cache Duration (seconds)
                </label>
                <input
                  type="number"
                  id="advancedSettings.cacheTime"
                  name="advancedSettings.cacheTime"
                  value={formData.advancedSettings.cacheTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  min="0"
                  max="86400"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="advancedSettings.lazyLoading"
                  name="advancedSettings.lazyLoading"
                  checked={formData.advancedSettings.lazyLoading}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="advancedSettings.lazyLoading" className="text-slate">
                  Enable Lazy Loading for Images
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="advancedSettings.cookieConsent"
                  name="advancedSettings.cookieConsent"
                  checked={formData.advancedSettings.cookieConsent}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="advancedSettings.cookieConsent" className="text-slate">
                  Show Cookie Consent Banner
                </label>
              </div>
            </div>
          </div>
          
          {/* Data Management */}
          <div>
            <h3 className="text-lg font-medium text-slate-light mb-4">Data Management</h3>
            
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleExportData}
                className="px-4 py-2 bg-navy-light text-slate-light border border-navy rounded flex items-center hover:border-teal hover:text-teal transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
              
              <button
                type="button"
                onClick={handleImportClick}
                className="px-4 py-2 bg-navy-light text-slate-light border border-navy rounded flex items-center hover:border-teal hover:text-teal transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import Data
              </button>
              <input
                type="file"
                id="import-file"
                accept="application/json"
                onChange={handleFileImport}
                className="hidden"
              />
              
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2 bg-navy-light text-red-400 border border-red-400/30 rounded flex items-center hover:bg-red-400/10 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </button>
            </div>
            
            {showResetConfirm && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-400 font-medium">Are you sure you want to reset all data?</p>
                    <p className="text-slate text-sm mt-1">
                      This will revert all content, styling, and settings to their default values. This action cannot be undone.
                    </p>
                    <div className="flex space-x-3 mt-3">
                      <button
                        type="button"
                        onClick={confirmReset}
                        disabled={isResetting}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                      >
                        {isResetting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Resetting...
                          </>
                        ) : (
                          "Yes, Reset Everything"
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowResetConfirm(false)}
                        className="px-3 py-1 border border-slate text-slate rounded text-sm hover:text-white hover:border-white transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* About This Site */}
        <div className="mt-8 p-4 bg-navy-light/50 rounded-lg border border-navy-light">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-teal mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-slate-light font-medium">About This Website</h3>
              <p className="text-slate text-sm mt-1">
                This portfolio website was created with Next.js, Tailwind CSS, and Framer Motion.
                It features a custom admin panel for content management and full customization capabilities.
              </p>
              <p className="text-slate text-sm mt-2">
                Version 1.0.0 | Last updated: May 2025
              </p>
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
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}