"use client";

import React, { useState } from "react";
import { usePortfolioData } from "@/context/data-context";
import { Plus, Trash2, Save, X, Edit } from "lucide-react";
import { SkillCategory, SkillItem } from "@/context/data-context";

export function SkillsForm() {
  const { data, updateSkills } = usePortfolioData();
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([...data.skills]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  
  const [categoryForm, setCategoryForm] = useState<SkillCategory>({
    category: "",
    items: []
  });
  
  const [skillForm, setSkillForm] = useState<SkillItem>({
    name: "",
    proficiency: 70,
    description: ""
  });

  // Category operations
  const startAddingCategory = () => {
    setEditingCategory("new");
    setCategoryForm({
      category: "",
      items: []
    });
  };

  const editCategory = (category: SkillCategory) => {
    setEditingCategory(category.category);
    setCategoryForm({ ...category });
  };

  const cancelEditingCategory = () => {
    setEditingCategory(null);
    setCategoryForm({
      category: "",
      items: []
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryForm({
      ...categoryForm,
      category: e.target.value
    });
  };

  const saveCategory = () => {
    if (!categoryForm.category.trim()) {
      alert("Category name is required");
      return;
    }

    if (editingCategory === "new") {
      // Add new category
      setSkillCategories([...skillCategories, categoryForm]);
    } else {
      // Update existing category
      setSkillCategories(
        skillCategories.map(cat => 
          cat.category === editingCategory ? categoryForm : cat
        )
      );
    }

    setEditingCategory(null);
    setCategoryForm({
      category: "",
      items: []
    });
  };

  const deleteCategory = (categoryName: string) => {
    if (confirm("Are you sure you want to delete this category? All skills in this category will be lost.")) {
      setSkillCategories(skillCategories.filter(cat => cat.category !== categoryName));
    }
  };

  // Skill operations
  const startAddingSkill = (categoryName: string) => {
    setEditingSkill("new");
    setEditingCategory(categoryName);
    setSkillForm({
      name: "",
      proficiency: 70,
      description: ""
    });
  };

  const editSkill = (categoryName: string, skill: SkillItem) => {
    setEditingSkill(skill.name);
    setEditingCategory(categoryName);
    setSkillForm({ ...skill });
  };

  const cancelEditingSkill = () => {
    setEditingSkill(null);
    setSkillForm({
      name: "",
      proficiency: 70,
      description: ""
    });
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setSkillForm({
      ...skillForm,
      [name]: name === "proficiency" ? parseInt(value) : value
    });
  };

  const saveSkill = () => {
    if (!skillForm.name.trim() || !editingCategory) {
      alert("Skill name is required");
      return;
    }

    const targetCategory = skillCategories.find(cat => cat.category === editingCategory);
    if (!targetCategory) return;

    let updatedCategories = [...skillCategories];

    if (editingSkill === "new") {
      // Add new skill
      updatedCategories = skillCategories.map(cat => {
        if (cat.category === editingCategory) {
          return {
            ...cat,
            items: [...cat.items, skillForm]
          };
        }
        return cat;
      });
    } else {
      // Update existing skill
      updatedCategories = skillCategories.map(cat => {
        if (cat.category === editingCategory) {
          return {
            ...cat,
            items: cat.items.map(skill => 
              skill.name === editingSkill ? skillForm : skill
            )
          };
        }
        return cat;
      });
    }

    setSkillCategories(updatedCategories);
    setEditingSkill(null);
    setSkillForm({
      name: "",
      proficiency: 70,
      description: ""
    });
  };

  const deleteSkill = (categoryName: string, skillName: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      setSkillCategories(
        skillCategories.map(cat => {
          if (cat.category === categoryName) {
            return {
              ...cat,
              items: cat.items.filter(skill => skill.name !== skillName)
            };
          }
          return cat;
        })
      );
    }
  };

  const saveAllChanges = () => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      updateSkills(skillCategories);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-light">Skills Management</h2>
        <button
          onClick={startAddingCategory}
          className="px-4 py-2 bg-teal/20 text-teal flex items-center rounded hover:bg-teal/30 transition-colors"
          disabled={editingCategory !== null || editingSkill !== null}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </button>
      </div>

      {/* Categories List */}
      {skillCategories.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-navy-light rounded-lg">
          <p className="text-slate">No skill categories added yet.</p>
          <button
            onClick={startAddingCategory}
            className="mt-4 px-4 py-2 bg-teal/20 text-teal flex items-center rounded hover:bg-teal/30 transition-colors mx-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Category
          </button>
        </div>
      ) : (
        <div className="space-y-8 mb-8">
          {skillCategories.map((category) => (
            <div
              key={category.category}
              className="border border-navy-light rounded-lg overflow-hidden"
            >
              <div className="p-4 bg-navy-light flex justify-between items-center">
                <h3 className="text-xl font-semibold text-slate-light">{category.category}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startAddingSkill(category.category)}
                    className="p-1 text-slate hover:text-teal transition-colors"
                    disabled={editingCategory !== null || editingSkill !== null}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => editCategory(category)}
                    className="p-1 text-slate hover:text-teal transition-colors"
                    disabled={editingCategory !== null || editingSkill !== null}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteCategory(category.category)}
                    className="p-1 text-slate hover:text-red-500 transition-colors"
                    disabled={editingCategory !== null || editingSkill !== null}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Skills in this category */}
              <div className="p-4 bg-navy">
                {category.items.length === 0 ? (
                  <div className="text-center py-4 border border-dashed border-navy-light rounded-lg">
                    <p className="text-slate">No skills in this category yet.</p>
                    <button
                      onClick={() => startAddingSkill(category.category)}
                      className="mt-2 px-3 py-1 bg-teal/20 text-teal text-sm flex items-center rounded hover:bg-teal/30 transition-colors mx-auto"
                      disabled={editingCategory !== null || editingSkill !== null}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Skill
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {category.items.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex justify-between items-center p-3 bg-navy-light rounded-lg"
                      >
                        <div className="flex-grow">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="text-slate-light font-medium">{skill.name}</h4>
                            <span className="text-teal font-mono text-sm">{skill.proficiency}%</span>
                          </div>
                          <div className="skill-bar">
                            <div 
                              className="skill-progress" 
                              style={{ width: `${skill.proficiency}%` }}
                            ></div>
                          </div>
                          <p className="text-slate text-sm mt-1">{skill.description}</p>
                        </div>
                        <div className="flex ml-4 space-x-1">
                          <button
                            onClick={() => editSkill(category.category, skill)}
                            className="p-1 text-slate hover:text-teal transition-colors"
                            disabled={editingCategory !== null || editingSkill !== null}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteSkill(category.category, skill.name)}
                            className="p-1 text-slate hover:text-red-500 transition-colors"
                            disabled={editingCategory !== null || editingSkill !== null}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Edit Modal */}
      {editingCategory && !editingSkill && (
        <div className="fixed inset-0 bg-navy-dark/80 flex items-center justify-center z-50 p-4">
          <div className="bg-navy border border-navy-light rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-light">
                {editingCategory === "new" ? "Add New Category" : "Edit Category"}
              </h3>
              <button
                onClick={cancelEditingCategory}
                className="p-1 text-slate hover:text-teal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <label htmlFor="category" className="block text-slate mb-1 text-sm">
                Category Name *
              </label>
              <input
                type="text"
                id="category"
                value={categoryForm.category}
                onChange={handleCategoryChange}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                placeholder="e.g. Technical Skills"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={cancelEditingCategory}
                className="px-4 py-2 border border-slate text-slate rounded hover:text-red-500 hover:border-red-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveCategory}
                className="px-4 py-2 bg-teal text-navy font-medium rounded hover:bg-teal/90 transition-colors"
              >
                {editingCategory === "new" ? "Add Category" : "Update Category"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skill Edit Modal */}
      {editingSkill && editingCategory && (
        <div className="fixed inset-0 bg-navy-dark/80 flex items-center justify-center z-50 p-4">
          <div className="bg-navy border border-navy-light rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-light">
                {editingSkill === "new" ? "Add New Skill" : "Edit Skill"}
              </h3>
              <button
                onClick={cancelEditingSkill}
                className="p-1 text-slate hover:text-teal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-slate mb-1 text-sm">
                Skill Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={skillForm.name}
                onChange={handleSkillChange}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                placeholder="e.g. JavaScript"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="proficiency" className="block text-slate mb-1 text-sm">
                Proficiency: {skillForm.proficiency}%
              </label>
              <input
                type="range"
                id="proficiency"
                name="proficiency"
                min="10"
                max="100"
                step="5"
                value={skillForm.proficiency}
                onChange={handleSkillChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-navy-dark"
              />
              <div className="flex justify-between text-xs text-slate-light mt-1">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Expert</span>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="description" className="block text-slate mb-1 text-sm">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={skillForm.description}
                onChange={handleSkillChange}
                rows={3}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
                placeholder="Brief description of your skill level and experience"
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={cancelEditingSkill}
                className="px-4 py-2 border border-slate text-slate rounded hover:text-red-500 hover:border-red-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveSkill}
                className="px-4 py-2 bg-teal text-navy font-medium rounded hover:bg-teal/90 transition-colors"
              >
                {editingSkill === "new" ? "Add Skill" : "Update Skill"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save All Changes Button */}
      {skillCategories.length > 0 && (
        <div className="mt-8">
          <button
            onClick={saveAllChanges}
            disabled={isSubmitting || editingCategory !== null || editingSkill !== null}
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