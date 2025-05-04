"use client";

import React, { useState } from "react";
import { Upload, X, Image as ImageIcon, Edit } from "lucide-react";
import { MediaUpload } from "@/components/admin/media-upload";

interface ImageUploadFieldProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  placeholder?: string;
  helperText?: string;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  placeholder = "Upload an image",
  helperText,
}: ImageUploadFieldProps) {
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  
  const handleSelect = (url: string) => {
    onChange(url);
    setIsMediaPickerOpen(false);
  };
  
  const handleRemove = () => {
    onChange("");
  };
  
  return (
    <div>
      <label className="block text-slate mb-2">{label}</label>
      
      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-navy-light group">
          <img 
            src={value} 
            alt={label} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-navy-dark/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setIsMediaPickerOpen(true)}
              className="p-2 bg-teal/80 rounded-full text-navy"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-red-500/80 rounded-full text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => setIsMediaPickerOpen(true)}
          className="w-full h-48 rounded-lg border-2 border-dashed border-navy-light flex flex-col items-center justify-center cursor-pointer hover:border-teal/50 transition-colors bg-navy-dark/50"
        >
          <div className="p-3 rounded-full bg-navy-dark mb-2">
            <ImageIcon className="w-6 h-6 text-slate" />
          </div>
          <p className="text-slate font-medium">{placeholder}</p>
          <p className="text-slate-dark text-xs mt-1">Click to browse</p>
        </div>
      )}
      
      {helperText && (
        <p className="mt-1 text-slate-dark text-xs">{helperText}</p>
      )}
      
      {isMediaPickerOpen && (
        <MediaUpload 
          onSelect={handleSelect}
          onClose={() => setIsMediaPickerOpen(false)}
        />
      )}
    </div>
  );
}