"use client";

import React, { useState } from "react";
import { usePortfolioData } from "@/context/data-context";
import { Plus, Trash2, Save, X, Edit } from "lucide-react";
import { Experience } from "@/context/data-context";

export function ExperienceForm() {
  const { data, updateExperience } = usePortfolioData();
  const [experiences, setExperiences] = useState<Experience[]>([...data.experience]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [currentAchievement, setCurrentAchievement] = useState("");
  const [currentTechnology, setCurrentTechnology] = useState("");
  
  const emptyExperience: Experience = {
    company: "",
    position: "",
    period: "",
    description: "",
    achievements: [],
    technologies: []
  };
  
  const [editForm, setEditForm] = useState<Experience>({ ...emptyExperience });

  const startEditing = (experience: Experience) => {
    setIsEditing(experience.company);
    setEditForm({ ...experience });
  };

  const startCreating = () => {
    setIsEditing("new");
    setEditForm({ ...emptyExperience });
  };

  const cancelEditing = () => {
    setIsEditing(null);
    setEditForm({ ...emptyExperience });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addAchievement = () => {
    if (!currentAchievement.trim()) return;
    
    setEditForm(prev => ({
      ...prev,
      achievements: [...prev.achievements, currentAchievement]
    }));
    
    setCurrentAchievement("");
  };

  const removeAchievement = (index: number) => {
    setEditForm(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const addTechnology = () => {
    if (!currentTechnology.trim()) return;
    
    setEditForm(prev => ({
      ...prev,
      technologies: [...prev.technologies, currentTechnology]
    }));
    
    setCurrentTechnology("");
  };

  const removeTechnology = (index: number) => {
    setEditForm(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const saveExperience = () => {
    // Validation
    if (!editForm.company || !editForm.position || !editForm.period) {
      alert("Please fill in all required fields.");
      return;
    }
    
    if (isEditing === "new") {
      // Add new experience
      setExperiences(prev => [...prev, editForm]);
    } else {
      // Update existing experience
      setExperiences(prev => 
        prev.map(exp => exp.company === isEditing ? editForm : exp)
      );
    }
    
    setIsEditing(null);
    setEditForm({ ...emptyExperience });
  };

  const removeExperience = (company: string) => {
    if (confirm("Are you sure you want to remove this experience?")) {
      setExperiences(prev => prev.filter(exp => exp.company !== company));
    }
  };

  const saveAllChanges = () => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      updateExperience(experiences);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-light">Work Experience</h2>
        <button
          onClick={startCreating}
          className="px-4 py-2 bg-teal/20 text-teal flex items-center rounded hover:bg-teal/30 transition-colors"
          disabled={isEditing !== null}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </button>
      </div>

      {/* Experience List */}
      {experiences.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-navy-light rounded-lg">
          <p className="text-slate">No work experience added yet.</p>
          <button
            onClick={startCreating}
            className="mt-4 px-4 py-2 bg-teal/20 text-teal flex items-center rounded hover:bg-teal/30 transition-colors mx-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Experience
          </button>
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {experiences.map((experience) => (
            <div
              key={experience.company}
              className="p-4 border border-navy-light rounded-lg bg-navy-light"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-light">
                    {experience.position}
                    <span className="text-teal"> @ {experience.company}</span>
                  </h3>
                  <p className="text-slate-light text-sm">{experience.period}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditing(experience)}
                    className="p-1 text-slate hover:text-teal transition-colors"
                    disabled={isEditing !== null}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeExperience(experience.company)}
                    className="p-1 text-slate hover:text-red-500 transition-colors"
                    disabled={isEditing !== null}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-slate mt-2">{experience.description}</p>
              
              {experience.achievements.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-slate-light text-sm font-medium mb-1">Achievements:</h4>
                  <ul className="space-y-1">
                    {experience.achievements.map((achievement, i) => (
                      <li key={i} className="text-slate text-sm flex items-start">
                        <span className="text-teal mr-2">▹</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {experience.technologies.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-slate-light text-sm font-medium mb-1">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 text-xs font-mono text-teal bg-navy rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit Form */}
      {isEditing && (
        <div className="fixed inset-0 bg-navy-dark/80 flex items-center justify-center z-50 p-4">
          <div className="bg-navy border border-navy-light rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-light">
                {isEditing === "new" ? "Add New Experience" : "Edit Experience"}
              </h3>
              <button
                onClick={cancelEditing}
                className="p-1 text-slate hover:text-teal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="company" className="block text-slate mb-1 text-sm">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={editForm.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="Company name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="position" className="block text-slate mb-1 text-sm">
                  Position/Title *
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={editForm.position}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="Your job title"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="period" className="block text-slate mb-1 text-sm">
                  Period *
                </label>
                <input
                  type="text"
                  id="period"
                  name="period"
                  value={editForm.period}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="e.g. Jan 2020 - Present"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-slate mb-1 text-sm">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={editForm.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
                placeholder="Brief description of your role"
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-slate mb-1 text-sm">
                Achievements
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={currentAchievement}
                  onChange={(e) => setCurrentAchievement(e.target.value)}
                  className="flex-grow px-4 py-2 rounded-l bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="Add an achievement"
                  onKeyDown={(e) => e.key === 'Enter' && addAchievement()}
                />
                <button
                  type="button"
                  onClick={addAchievement}
                  className="px-4 py-2 bg-teal/20 text-teal rounded-r hover:bg-teal/30 transition-colors"
                >
                  Add
                </button>
              </div>
              
              {editForm.achievements.length > 0 && (
                <ul className="space-y-2 mt-2">
                  {editForm.achievements.map((achievement, index) => (
                    <li 
                      key={index}
                      className="flex items-center justify-between p-2 bg-navy-dark rounded"
                    >
                      <span className="text-slate text-sm">{achievement}</span>
                      <button
                        type="button"
                        onClick={() => removeAchievement(index)}
                        className="text-slate hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-slate mb-1 text-sm">
                Technologies/Skills
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={currentTechnology}
                  onChange={(e) => setCurrentTechnology(e.target.value)}
                  className="flex-grow px-4 py-2 rounded-l bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="Add a technology or skill"
                  onKeyDown={(e) => e.key === 'Enter' && addTechnology()}
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="px-4 py-2 bg-teal/20 text-teal rounded-r hover:bg-teal/30 transition-colors"
                >
                  Add
                </button>
              </div>
              
              {editForm.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {editForm.technologies.map((tech, index) => (
                    <div 
                      key={index}
                      className="flex items-center bg-navy-dark px-2 py-1 rounded text-teal text-sm"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(index)}
                        className="ml-1 text-slate hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={cancelEditing}
                className="px-4 py-2 border border-slate text-slate rounded hover:text-red-500 hover:border-red-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveExperience}
                className="px-4 py-2 bg-teal text-navy font-medium rounded hover:bg-teal/90 transition-colors"
              >
                {isEditing === "new" ? "Add Experience" : "Update Experience"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save All Changes Button */}
      {experiences.length > 0 && (
        <div className="mt-8">
          <button
            onClick={saveAllChanges}
            disabled={isSubmitting || isEditing !== null}
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
                Save All Changes
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}