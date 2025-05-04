"use client";

import React from "react";
import { Layout } from "@/context/data-context";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical, Eye, EyeOff } from "lucide-react";

interface LayoutSettingsProps {
  layout: Layout;
  onChange: (key: string, value: any) => void;
}

export function LayoutSettings({ layout, onChange }: LayoutSettingsProps) {
  const handleMaxWidthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange('maxWidth', e.target.value);
  };

  const handleSpacingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange('spacing', e.target.value);
  };

  const toggleSectionVisibility = (section: string) => {
    // If section is in the array, keep it; otherwise filter it out
    const updatedSections = layout.sections.includes(section)
      ? layout.sections.filter(s => s !== section)
      : [...layout.sections, section];
    
    onChange('sections', updatedSections);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(layout.sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onChange('sections', items);
  };

  // All possible sections
  const allSections = [
    { id: 'hero', name: 'Hero Section' },
    { id: 'about', name: 'About Me' },
    { id: 'skills', name: 'Skills' },
    { id: 'experience', name: 'Experience' },
    { id: 'projects', name: 'Projects' },
    { id: 'education', name: 'Education & Certifications' },
    { id: 'contact', name: 'Contact' }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-light mb-6">Layout Settings</h2>
      
      <div className="space-y-8">
        {/* Container Width */}
        <div>
          <h3 className="text-slate-light font-medium mb-3">Maximum Content Width</h3>
          <select
            value={layout.maxWidth}
            onChange={handleMaxWidthChange}
            className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
          >
            <option value="1000px">Narrow (1000px)</option>
            <option value="1200px">Standard (1200px)</option>
            <option value="1400px">Wide (1400px)</option>
            <option value="100%">Full Width</option>
          </select>
          <p className="text-slate text-sm mt-2">
            Control the maximum width of your content on large screens
          </p>
        </div>
        
        {/* Content Density */}
        <div>
          <h3 className="text-slate-light font-medium mb-3">Content Spacing</h3>
          <select
            value={layout.spacing}
            onChange={handleSpacingChange}
            className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
          >
            <option value="compact">Compact</option>
            <option value="comfortable">Comfortable</option>
            <option value="spacious">Spacious</option>
          </select>
          <p className="text-slate text-sm mt-2">
            Adjust the amount of space between elements throughout your portfolio
          </p>
        </div>
        
        {/* Section Arrangement */}
        <div>
          <h3 className="text-slate-light font-medium mb-3">Section Order & Visibility</h3>
          <p className="text-slate text-sm mb-4">
            Drag to reorder sections and toggle visibility. Hidden sections will not be displayed on your portfolio.
          </p>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {layout.sections.map((sectionId, index) => {
                    const section = allSections.find(s => s.id === sectionId);
                    if (!section) return null;
                    
                    return (
                      <Draggable key={section.id} draggableId={section.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="flex items-center justify-between p-3 bg-navy-light rounded-lg border border-navy"
                          >
                            <div className="flex items-center">
                              <div
                                {...provided.dragHandleProps}
                                className="mr-3 text-slate hover:text-teal transition-colors cursor-move"
                              >
                                <GripVertical className="w-5 h-5" />
                              </div>
                              <span className="text-slate-light">{section.name}</span>
                            </div>
                            <button
                              onClick={() => toggleSectionVisibility(section.id)}
                              className={`p-1 rounded ${
                                layout.sections.includes(section.id)
                                  ? 'text-teal hover:bg-navy'
                                  : 'text-slate hover:bg-navy'
                              }`}
                            >
                              {layout.sections.includes(section.id) ? (
                                <Eye className="w-4 h-4" />
                              ) : (
                                <EyeOff className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          
          {/* Hidden Sections */}
          {allSections.some(section => !layout.sections.includes(section.id)) && (
            <div className="mt-4">
              <h4 className="text-slate font-medium mb-2">Hidden Sections</h4>
              <div className="space-y-2">
                {allSections
                  .filter(section => !layout.sections.includes(section.id))
                  .map(section => (
                    <div
                      key={section.id}
                      className="flex items-center justify-between p-3 bg-navy rounded-lg border border-navy-light"
                    >
                      <span className="text-slate">{section.name}</span>
                      <button
                        onClick={() => toggleSectionVisibility(section.id)}
                        className="p-1 rounded text-slate hover:text-teal transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Layout Preview */}
        <div className="p-4 border border-navy-light rounded-lg">
          <h3 className="text-slate-light font-medium mb-4">Layout Preview</h3>
          
          <div className="bg-navy-dark rounded-lg p-4 border border-navy overflow-hidden">
            <div 
              className="mx-auto bg-navy p-2 rounded relative" 
              style={{ 
                maxWidth: layout.maxWidth,
                padding: layout.spacing === 'compact' ? '0.5rem' : layout.spacing === 'comfortable' ? '1rem' : '1.5rem'
              }}
            >
              {layout.sections.map((sectionId, index) => {
                const section = allSections.find(s => s.id === sectionId);
                if (!section) return null;
                
                return (
                  <div 
                    key={section.id}
                    className="mb-2 p-2 bg-navy-light rounded-md flex items-center justify-between"
                    style={{
                      height: sectionId === 'hero' ? '40px' : '28px',
                      marginBottom: layout.spacing === 'compact' ? '0.5rem' : layout.spacing === 'comfortable' ? '1rem' : '1.5rem'
                    }}
                  >
                    <div className="w-24 h-3 bg-slate-light rounded-sm opacity-70"></div>
                    <div className="w-12 h-3 bg-teal rounded-sm opacity-40"></div>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-slate text-xs text-center mt-2">
            Visual representation of your current layout configuration
          </p>
        </div>
      </div>
    </div>
  );
}