"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import initialData from "@/data/portfolio-data";
import { 
  fetchPortfolioData,
  updatePersonalInfo as updatePersonalInfoService,
  updateSkills as updateSkillsService,
  updateExperience as updateExperienceService,
  updateEducation as updateEducationService,
  updateCertifications as updateCertificationsService,
  updateExtracurricular as updateExtracurricularService,
  updateProjects as updateProjectsService,
  updateWebsiteSettings as updateWebsiteSettingsService,
  resetToDefaults as resetToDefaultsService
} from "@/lib/data-service";

// Type definitions for our portfolio data
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  bio: string;
}

export interface SkillItem {
  name: string;
  proficiency: number;
  description: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  description: string;
}

export interface Extracurricular {
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  role: string;
  outcome: string;
}

export interface ColorTheme {
  primary: string;
  secondary: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
}

export interface Fonts {
  heading: string;
  body: string;
  code: string;
}

export interface Animations {
  enabled: boolean;
  speed: string;
  intensity: string;
}

export interface Layout {
  sections: string[];
  maxWidth: string;
  spacing: string;
}

export interface WebsiteSettings {
  colorTheme: ColorTheme;
  fonts: Fonts;
  animations: Animations;
  layout: Layout;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  extracurricular: Extracurricular[];
  projects: Project[];
  websiteSettings: WebsiteSettings;
}

interface DataContextType {
  data: PortfolioData;
  loading: boolean;
  error: string | null;
  updatePersonalInfo: (info: PersonalInfo) => Promise<void>;
  updateSkills: (skills: SkillCategory[]) => Promise<void>;
  updateExperience: (experience: Experience[]) => Promise<void>;
  updateEducation: (education: Education[]) => Promise<void>;
  updateCertifications: (certifications: Certification[]) => Promise<void>;
  updateExtracurricular: (extracurricular: Extracurricular[]) => Promise<void>;
  updateProjects: (projects: Project[]) => Promise<void>;
  updateWebsiteSettings: (settings: WebsiteSettings) => Promise<void>;
  resetData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch data on initialization
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const portfolioData = await fetchPortfolioData();
        setData(portfolioData);
        setError(null);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Failed to load data. Using default values.");
        // Use initial data as fallback
        setData(initialData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const updatePersonalInfo = async (info: PersonalInfo) => {
    try {
      // Update the local state immediately for a responsive UI
      setData(prev => ({ ...prev, personalInfo: info }));
      
      // Update the remote data
      const success = await updatePersonalInfoService(info);
      
      if (success) {
        toast({
          title: "Personal information updated",
          description: "Your changes have been saved",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: "Changes saved locally only. Will sync when connection is restored.",
        });
      }
    } catch (error) {
      console.error("Error updating personal info:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "An error occurred while updating your information",
      });
    }
  };

  const updateSkills = async (skills: SkillCategory[]) => {
    try {
      // Update the local state immediately
      setData(prev => ({ ...prev, skills }));
      
      // Update the remote data
      const success = await updateSkillsService(skills);
      
      if (success) {
        toast({
          title: "Skills updated",
          description: "Your skills have been updated",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: "Changes saved locally only. Will sync when connection is restored.",
        });
      }
    } catch (error) {
      console.error("Error updating skills:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "An error occurred while updating your skills",
      });
    }
  };

  const updateExperience = async (experience: Experience[]) => {
    try {
      // Update the local state immediately
      setData(prev => ({ ...prev, experience }));
      
      // Update the remote data
      const success = await updateExperienceService(experience);
      
      if (success) {
        toast({
          title: "Experience updated",
          description: "Your experience has been updated",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: "Changes saved locally only. Will sync when connection is restored.",
        });
      }
    } catch (error) {
      console.error("Error updating experience:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "An error occurred while updating your experience",
      });
    }
  };

  const updateEducation = async (education: Education[]) => {
    try {
      // Update the local state immediately
      setData(prev => ({ ...prev, education }));
      
      // Update the remote data
      const success = await updateEducationService(education);
      
      if (success) {
        toast({
          title: "Education updated",
          description: "Your education has been updated",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: "Changes saved locally only. Will sync when connection is restored.",
        });
      }
    } catch (error) {
      console.error("Error updating education:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "An error occurred while updating your education",
      });
    }
  };

  const updateCertifications = async (certifications: Certification[]) => {
    try {
      // Update the local state immediately
      setData(prev => ({ ...prev, certifications }));
      
      // Update the remote data
      const success = await updateCertificationsService(certifications);
      
      if (success) {
        toast({
          title: "Certifications updated",
          description: "Your certifications have been updated",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: "Changes saved locally only. Will sync when connection is restored.",
        });
      }
    } catch (error) {
      console.error("Error updating certifications:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "An error occurred while updating your certifications",
      });
    }
  };

  const updateExtracurricular = async (extracurricular: Extracurricular[]) => {
    try {
      // Update the local state immediately
      setData(prev => ({ ...prev, extracurricular }));
      
      // Update the remote data
      const success = await updateExtracurricularService(extracurricular);
      
      if (success) {
        toast({
          title: "Extracurricular activities updated",
          description: "Your extracurricular activities have been updated",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: "Changes saved locally only. Will sync when connection is restored.",
        });
      }
    } catch (error) {
      console.error("Error updating extracurricular activities:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "An error occurred while updating your extracurricular activities",
      });
    }
  };

  const updateProjects = async (projects: Project[]) => {
    try {
      // Update the local state immediately
      setData(prev => ({ ...prev, projects }));
      
      // Update the remote data
      const success = await updateProjectsService(projects);
      
      if (success) {
        toast({
          title: "Projects updated",
          description: "Your projects have been updated",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: "Changes saved locally only. Will sync when connection is restored.",
        });
      }
    } catch (error) {
      console.error("Error updating projects:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "An error occurred while updating your projects",
      });
    }
  };

  const updateWebsiteSettings = async (settings: WebsiteSettings) => {
    try {
      // Update the local state immediately
      setData(prev => ({ ...prev, websiteSettings: settings }));
      
      // Update the remote data
      const success = await updateWebsiteSettingsService(settings);
      
      if (success) {
        toast({
          title: "Website settings updated",
          description: "Your website settings have been updated",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: "Changes saved locally only. Will sync when connection is restored.",
        });
      }
    } catch (error) {
      console.error("Error updating website settings:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "An error occurred while updating your website settings",
      });
    }
  };

  const resetData = async () => {
    try {
      // Reset data remotely
      const success = await resetToDefaultsService();
      
      // Reset local data
      setData(initialData);
      
      if (success) {
        toast({
          title: "Data reset",
          description: "All data has been reset to default values",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Reset partially failed",
          description: "Local data reset, but there was an issue with the remote reset.",
        });
      }
    } catch (error) {
      console.error("Error resetting data:", error);
      toast({
        variant: "destructive",
        title: "Reset failed",
        description: "An error occurred while resetting your data",
      });
    }
  };

  return (
    <DataContext.Provider value={{
      data,
      loading,
      error,
      updatePersonalInfo,
      updateSkills,
      updateExperience,
      updateEducation,
      updateCertifications,
      updateExtracurricular,
      updateProjects,
      updateWebsiteSettings,
      resetData,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("usePortfolioData must be used within a DataProvider");
  }
  return context;
}