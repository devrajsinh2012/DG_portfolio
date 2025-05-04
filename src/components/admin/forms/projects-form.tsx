"use client";

import React, { useState } from "react";
import { usePortfolioData } from "@/context/data-context";
import { Plus, Trash2, Save, X, Edit } from "lucide-react";
import { Project } from "@/context/data-context";

export function ProjectsForm() {
  const { data, updateProjects } = usePortfolioData();
  const [projects, setProjects] = useState<Project[]>([...data.projects]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [currentTechnology, setCurrentTechnology] = useState("");
  
  const emptyProject: Project = {
    title: "",
    description: "",
    technologies: [],
    role: "",
    outcome: ""
  };
  
  const [editForm, setEditForm] = useState<Project>({ ...emptyProject });

  const startEditing = (project: Project) => {
    setIsEditing(project.title);
    setEditForm({ ...project });
  };

  const startCreating = () => {
    setIsEditing("new");
    setEditForm({ ...emptyProject });
  };

  const cancelEditing = () => {
    setIsEditing(null);
    setEditForm({ ...emptyProject });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
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

  const saveProject = () => {
    // Validation
    if (!editForm.title || !editForm.description || !editForm.role) {
      alert("Please fill in all required fields.");
      return;
    }
    
    if (isEditing === "new") {
      // Add new project
      setProjects(prev => [...prev, editForm]);
    } else {
      // Update existing project
      setProjects(prev => 
        prev.map(proj => proj.title === isEditing ? editForm : proj)
      );
    }
    
    setIsEditing(null);
    setEditForm({ ...emptyProject });
  };

  const removeProject = (title: string) => {
    if (confirm("Are you sure you want to remove this project?")) {
      setProjects(prev => prev.filter(proj => proj.title !== title));
    }
  };

  const saveAllChanges = () => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      updateProjects(projects);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-light">Projects</h2>
        <button
          onClick={startCreating}
          className="px-4 py-2 bg-teal/20 text-teal flex items-center rounded hover:bg-teal/30 transition-colors"
          disabled={isEditing !== null}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </button>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-navy-light rounded-lg">
          <p className="text-slate">No projects added yet.</p>
          <button
            onClick={startCreating}
            className="mt-4 px-4 py-2 bg-teal/20 text-teal flex items-center rounded hover:bg-teal/30 transition-colors mx-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="p-4 border border-navy-light rounded-lg bg-navy-light"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-slate-light">{project.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditing(project)}
                    className="p-1 text-slate hover:text-teal transition-colors"
                    disabled={isEditing !== null}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeProject(project.title)}
                    className="p-1 text-slate hover:text-red-500 transition-colors"
                    disabled={isEditing !== null}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-slate text-sm mt-2 line-clamp-2">{project.description}</p>
              
              <div className="flex items-center space-x-4 mt-3 text-xs">
                <span className="text-teal font-medium">Role:</span>
                <span className="text-slate-light">{project.role}</span>
              </div>
              
              {project.technologies.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 text-xs font-mono bg-navy rounded text-teal"
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
                {isEditing === "new" ? "Add New Project" : "Edit Project"}
              </h3>
              <button
                onClick={cancelEditing}
                className="p-1 text-slate hover:text-teal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <label htmlFor="title" className="block text-slate mb-1 text-sm">
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={editForm.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                placeholder="Project title"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="role" className="block text-slate mb-1 text-sm">
                Your Role *
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={editForm.role}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                placeholder="e.g. Project Lead, Developer, Designer"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-slate mb-1 text-sm">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={editForm.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
                placeholder="Describe your project"
                required
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label htmlFor="outcome" className="block text-slate mb-1 text-sm">
                Outcome
              </label>
              <textarea
                id="outcome"
                name="outcome"
                value={editForm.outcome}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
                placeholder="What was the result or impact of this project?"
              ></textarea>
            </div>
            
            <div className="mb-6">
              <label className="block text-slate mb-1 text-sm">
                Technologies
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={currentTechnology}
                  onChange={(e) => setCurrentTechnology(e.target.value)}
                  className="flex-grow px-4 py-2 rounded-l bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="Add a technology"
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
                onClick={saveProject}
                className="px-4 py-2 bg-teal text-navy font-medium rounded hover:bg-teal/90 transition-colors"
              >
                {isEditing === "new" ? "Add Project" : "Update Project"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save All Changes Button */}
      {projects.length > 0 && (
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