"use client";

import { useEffect } from "react";
import { usePortfolioData } from "@/context/data-context";

// This hook applies the theme colors from the admin settings to the website
export function useThemeStyles() {
  const { data } = usePortfolioData();
  const { websiteSettings } = data;
  
  useEffect(() => {
    // Apply CSS variables for theme colors
    const root = document.documentElement;
    
    // Apply color theme
    const { colorTheme } = websiteSettings;
    root.style.setProperty('--color-primary', colorTheme.primary);
    root.style.setProperty('--color-secondary', colorTheme.secondary);
    root.style.setProperty('--color-background', colorTheme.background);
    root.style.setProperty('--color-text-primary', colorTheme.textPrimary);
    root.style.setProperty('--color-text-secondary', colorTheme.textSecondary);
    root.style.setProperty('--color-accent', colorTheme.accent);
    
    // Apply fonts
    const { fonts } = websiteSettings;
    root.style.setProperty('--font-heading', fonts.heading);
    root.style.setProperty('--font-body', fonts.body);
    root.style.setProperty('--font-mono', fonts.code);
    
    // Apply animations
    const { animations } = websiteSettings;
    if (!animations.enabled) {
      // Disable all animations if they're turned off
      root.style.setProperty('--animations-enabled', 'none');
    } else {
      root.style.setProperty('--animations-enabled', 'all');
      
      // Apply animation speed
      let speedFactor = 1;
      switch (animations.speed) {
        case 'slow':
          speedFactor = 1.5;
          break;
        case 'fast':
          speedFactor = 0.5;
          break;
        default:
          speedFactor = 1;
      }
      root.style.setProperty('--animation-speed-factor', speedFactor.toString());
      
      // Apply animation intensity
      let intensityFactor = 1;
      switch (animations.intensity) {
        case 'low':
          intensityFactor = 0.5;
          break;
        case 'high':
          intensityFactor = 1.5;
          break;
        default:
          intensityFactor = 1;
      }
      root.style.setProperty('--animation-intensity-factor', intensityFactor.toString());
    }
    
    // Apply layout
    const { layout } = websiteSettings;
    root.style.setProperty('--layout-max-width', layout.maxWidth);
    
    // Apply spacing
    let spacingFactor = 1;
    switch (layout.spacing) {
      case 'compact':
        spacingFactor = 0.8;
        break;
      case 'spacious':
        spacingFactor = 1.2;
        break;
      default:
        spacingFactor = 1;
    }
    root.style.setProperty('--spacing-factor', spacingFactor.toString());
    
  }, [websiteSettings]);
  
  return null;
}