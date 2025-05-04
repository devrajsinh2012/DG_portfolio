"use client";

import React, { useState } from "react";
import { usePortfolioData } from "@/context/data-context";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PersonalInfoForm } from "@/components/admin/forms/personal-info-form";
import { ExperienceForm } from "@/components/admin/forms/experience-form";
import { SkillsForm } from "@/components/admin/forms/skills-form";
import { ProjectsForm } from "@/components/admin/forms/projects-form";
import { EducationForm } from "@/components/admin/forms/education-form";

export function AdminContentPanel() {
  const { data } = usePortfolioData();
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-light mb-2">Content Management</h1>
        <p className="text-slate">
          Edit and update the content of your portfolio website. Changes will be reflected immediately.
        </p>
      </header>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-5 mb-8 bg-navy-light">
          <TabsTrigger value="personal" className="data-[state=active]:bg-teal/10 data-[state=active]:text-teal">
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="skills" className="data-[state=active]:bg-teal/10 data-[state=active]:text-teal">
            Skills
          </TabsTrigger>
          <TabsTrigger value="experience" className="data-[state=active]:bg-teal/10 data-[state=active]:text-teal">
            Experience
          </TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-teal/10 data-[state=active]:text-teal">
            Projects
          </TabsTrigger>
          <TabsTrigger value="education" className="data-[state=active]:bg-teal/10 data-[state=active]:text-teal">
            Education
          </TabsTrigger>
        </TabsList>

        <div className="p-6 border border-navy-light rounded-lg bg-navy">
          <TabsContent value="personal">
            <PersonalInfoForm />
          </TabsContent>
          
          <TabsContent value="skills">
            <SkillsForm />
          </TabsContent>
          
          <TabsContent value="experience">
            <ExperienceForm />
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectsForm />
          </TabsContent>
          
          <TabsContent value="education">
            <EducationForm />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}