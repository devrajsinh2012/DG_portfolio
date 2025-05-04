"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePortfolioData } from "@/context/data-context";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ColorPicker } from "@/components/admin/appearance/color-picker";
import { FontSelector } from "@/components/admin/appearance/font-selector";
import { AnimationsControl } from "@/components/admin/appearance/animations-control";
import { LayoutSettings } from "@/components/admin/appearance/layout-settings";

export function AdminAppearancePanel() {
  const { data, updateWebsiteSettings } = usePortfolioData();
  const { websiteSettings } = data;
  const [localSettings, setLocalSettings] = useState({ ...websiteSettings });
  const [activeTab, setActiveTab] = useState("colors");
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const handleColorChange = (key: string, value: string) => {
    setLocalSettings({
      ...localSettings,
      colorTheme: {
        ...localSettings.colorTheme,
        [key]: value
      }
    });
  };

  const handleFontChange = (key: string, value: string) => {
    setLocalSettings({
      ...localSettings,
      fonts: {
        ...localSettings.fonts,
        [key]: value
      }
    });
  };

  const handleAnimationChange = (key: string, value: string | boolean) => {
    setLocalSettings({
      ...localSettings,
      animations: {
        ...localSettings.animations,
        [key]: value
      }
    });
  };

  const handleLayoutChange = (key: string, value: any) => {
    setLocalSettings({
      ...localSettings,
      layout: {
        ...localSettings.layout,
        [key]: value
      }
    });
  };

  const saveChanges = () => {
    updateWebsiteSettings(localSettings);
  };

  const discardChanges = () => {
    setLocalSettings({ ...websiteSettings });
  };

  const hasChanges = JSON.stringify(localSettings) !== JSON.stringify(websiteSettings);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-light mb-2">Appearance Settings</h1>
        <p className="text-slate">
          Customize the look and feel of your portfolio website.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Settings Controls */}
        <div className="lg:col-span-3">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-8 bg-navy-light">
              <TabsTrigger value="colors" className="data-[state=active]:bg-teal/10 data-[state=active]:text-teal">
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography" className="data-[state=active]:bg-teal/10 data-[state=active]:text-teal">
                Typography
              </TabsTrigger>
              <TabsTrigger value="animations" className="data-[state=active]:bg-teal/10 data-[state=active]:text-teal">
                Animations
              </TabsTrigger>
              <TabsTrigger value="layout" className="data-[state=active]:bg-teal/10 data-[state=active]:text-teal">
                Layout
              </TabsTrigger>
            </TabsList>

            <div className="p-6 border border-navy-light rounded-lg bg-navy">
              <TabsContent value="colors">
                <ColorPicker 
                  colors={localSettings.colorTheme} 
                  onChange={handleColorChange} 
                />
              </TabsContent>
              
              <TabsContent value="typography">
                <FontSelector 
                  fonts={localSettings.fonts} 
                  onChange={handleFontChange} 
                />
              </TabsContent>
              
              <TabsContent value="animations">
                <AnimationsControl 
                  animations={localSettings.animations} 
                  onChange={handleAnimationChange} 
                />
              </TabsContent>
              
              <TabsContent value="layout">
                <LayoutSettings 
                  layout={localSettings.layout} 
                  onChange={handleLayoutChange} 
                />
              </TabsContent>
            </div>
          </Tabs>

          {/* Action Buttons */}
          {hasChanges && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 flex gap-4"
            >
              <button
                onClick={saveChanges}
                className="px-5 py-2 bg-teal text-navy font-medium rounded hover:bg-teal/90 transition-colors"
              >
                Save Changes
              </button>
              
              <button
                onClick={discardChanges}
                className="px-5 py-2 bg-transparent border border-slate text-slate rounded hover:border-red-500 hover:text-red-500 transition-colors"
              >
                Discard Changes
              </button>
            </motion.div>
          )}
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
          <div className="sticky top-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-light">Live Preview</h3>
              
              <div className="flex bg-navy-light rounded-md p-1">
                <button
                  onClick={() => setPreviewMode("desktop")}
                  className={`p-1 rounded ${previewMode === "desktop" ? "bg-navy text-teal" : "text-slate"}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </button>
                
                <button
                  onClick={() => setPreviewMode("tablet")}
                  className={`p-1 rounded ${previewMode === "tablet" ? "bg-navy text-teal" : "text-slate"}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </button>
                
                <button
                  onClick={() => setPreviewMode("mobile")}
                  className={`p-1 rounded ${previewMode === "mobile" ? "bg-navy text-teal" : "text-slate"}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Preview Frame */}
            <div className="border border-navy-light rounded-lg overflow-hidden bg-navy-dark">
              <div className="border-b border-navy-light p-2 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mx-1"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mx-1"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mx-1"></div>
              </div>
              
              <div 
                className={`p-4 overflow-hidden ${
                  previewMode === "desktop" ? "w-full h-[500px]" : 
                  previewMode === "tablet" ? "w-[768px] max-w-full h-[500px] mx-auto" : 
                  "w-[375px] max-w-full h-[500px] mx-auto"
                }`}
              >
                {/* Website Preview */}
                <div 
                  style={{
                    "--primary-color": localSettings.colorTheme.primary,
                    "--secondary-color": localSettings.colorTheme.secondary,
                    "--background-color": localSettings.colorTheme.background,
                    "--text-primary": localSettings.colorTheme.textPrimary,
                    "--text-secondary": localSettings.colorTheme.textSecondary,
                    "--accent-color": localSettings.colorTheme.accent,
                  } as React.CSSProperties}
                  className="w-full h-full rounded border border-navy-light overflow-y-auto bg-[color:var(--background-color)]"
                >
                  {/* Navigation Preview */}
                  <div className="bg-[color:var(--primary-color)] px-4 py-3 flex justify-between items-center">
                    <div className="text-[color:var(--accent-color)] font-bold">Devrajsinh</div>
                    <div className="flex space-x-4">
                      <div className="w-8 h-2 bg-[color:var(--text-secondary)] rounded-sm"></div>
                      <div className="w-8 h-2 bg-[color:var(--text-secondary)] rounded-sm"></div>
                      <div className="w-8 h-2 bg-[color:var(--text-secondary)] rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* Hero Section Preview */}
                  <div className="px-6 py-10 flex flex-col items-start">
                    <div className="w-40 h-4 bg-[color:var(--accent-color)] rounded-sm mb-4"></div>
                    <div className="w-60 h-8 bg-[color:var(--text-primary)] rounded-sm mb-2"></div>
                    <div className="w-52 h-6 bg-[color:var(--text-secondary)] rounded-sm mb-6"></div>
                    <div className="w-full max-w-md h-16 bg-[color:var(--text-secondary)] opacity-60 rounded-sm mb-8"></div>
                    <div className="flex space-x-4">
                      <div className="w-32 h-10 bg-transparent border border-[color:var(--accent-color)] rounded-md"></div>
                      <div className="w-32 h-10 bg-[color:var(--accent-color)] rounded-md"></div>
                    </div>
                  </div>
                  
                  {/* About Section Preview */}
                  <div className="px-6 py-10 bg-[color:var(--primary-color)] bg-opacity-50">
                    <div className="flex items-center mb-6">
                      <div className="w-5 h-5 bg-[color:var(--accent-color)] rounded-full mr-2"></div>
                      <div className="w-40 h-6 bg-[color:var(--text-primary)] rounded-sm"></div>
                    </div>
                    <div className="flex flex-col space-y-3">
                      <div className="w-full h-4 bg-[color:var(--text-secondary)] rounded-sm"></div>
                      <div className="w-full h-4 bg-[color:var(--text-secondary)] rounded-sm"></div>
                      <div className="w-3/4 h-4 bg-[color:var(--text-secondary)] rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}