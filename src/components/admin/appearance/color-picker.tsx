"use client";

import React, { useState } from "react";
import { Copy } from "lucide-react";
import { ColorTheme } from "@/context/data-context";

interface ColorPickerProps {
  colors: ColorTheme;
  onChange: (key: string, value: string) => void;
}

export function ColorPicker({ colors, onChange }: ColorPickerProps) {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [colorValue, setColorValue] = useState("");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  
  const presetThemes = [
    {
      name: "Default Dark",
      colors: {
        primary: "#0a192f",
        secondary: "#64ffda",
        background: "#0a192f",
        textPrimary: "#ccd6f6",
        textSecondary: "#8892b0",
        accent: "#64ffda"
      }
    },
    {
      name: "Ocean Blue",
      colors: {
        primary: "#1a2980",
        secondary: "#26d0ce",
        background: "#1a2980",
        textPrimary: "#ffffff",
        textSecondary: "#bdd4e7",
        accent: "#26d0ce"
      }
    },
    {
      name: "Purple Dream",
      colors: {
        primary: "#4a2c82",
        secondary: "#f67280",
        background: "#2b2149",
        textPrimary: "#f9f9f9",
        textSecondary: "#c3addb",
        accent: "#f67280"
      }
    },
    {
      name: "Emerald Dark",
      colors: {
        primary: "#112222",
        secondary: "#4ecdc4",
        background: "#112222",
        textPrimary: "#f7fff7",
        textSecondary: "#a9c5c3",
        accent: "#4ecdc4"
      }
    }
  ];

  const handleColorClick = (key: string, value: string) => {
    setActiveColor(key);
    setColorValue(value);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColorValue(value);
    
    if (activeColor) {
      onChange(activeColor, value);
    }
  };

  const applyTheme = (themeColors: ColorTheme) => {
    Object.entries(themeColors).forEach(([key, value]) => {
      onChange(key, value);
    });
  };

  const copyColorToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-light mb-6">Color Theme</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-slate-light font-medium mb-4">Current Colors</h3>
          
          <div className="space-y-4">
            {Object.entries(colors).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <div
                  className="w-12 h-12 rounded-md border border-navy-light cursor-pointer relative overflow-hidden"
                  style={{ backgroundColor: value }}
                  onClick={() => handleColorClick(key, value)}
                >
                  {activeColor === key && (
                    <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    </div>
                  )}
                </div>
                <div className="ml-3 flex-grow">
                  <p className="text-slate-light text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <div className="flex items-center">
                    <code className="text-xs text-slate font-mono">{value}</code>
                    <button
                      onClick={() => copyColorToClipboard(value)}
                      className="ml-2 text-slate hover:text-teal transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    {copiedColor === value && (
                      <span className="ml-2 text-xs text-teal">Copied!</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {activeColor && (
            <div className="mt-6 p-4 bg-navy-light rounded-lg">
              <p className="text-slate-light text-sm mb-2 capitalize">
                Editing: {activeColor.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <div className="flex">
                <input
                  type="color"
                  value={colorValue}
                  onChange={handleColorChange}
                  className="h-10 w-20 bg-transparent border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={colorValue}
                  onChange={handleColorChange}
                  className="flex-grow ml-2 px-3 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent font-mono text-sm"
                  placeholder="#000000"
                />
              </div>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-slate-light font-medium mb-4">Preset Themes</h3>
          
          <div className="space-y-4">
            {presetThemes.map((theme) => (
              <div
                key={theme.name}
                className="p-4 border border-navy-light rounded-lg hover:border-teal/30 transition-colors cursor-pointer"
                onClick={() => applyTheme(theme.colors)}
              >
                <p className="text-slate-light font-medium mb-2">{theme.name}</p>
                <div className="flex space-x-2">
                  {Object.values(theme.colors).map((color, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border border-navy-light"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-navy-light rounded-lg">
        <h3 className="text-slate-light font-medium mb-4">Preview</h3>
        <div 
          className="h-40 rounded-lg p-4 flex flex-col justify-between overflow-hidden relative border border-navy"
          style={{ backgroundColor: colors.background }}
        >
          <div>
            <div 
              className="text-xl font-bold mb-1"
              style={{ color: colors.textPrimary }}
            >
              Devrajsinh Gohil
            </div>
            <div 
              className="text-sm"
              style={{ color: colors.textSecondary }}
            >
              Project Management Professional
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 text-sm rounded-md"
              style={{ 
                backgroundColor: 'transparent', 
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: colors.secondary,
                color: colors.secondary
              }}
            >
              Contact Me
            </button>
            <button
              className="px-3 py-1 text-sm rounded-md"
              style={{ 
                backgroundColor: colors.secondary,
                color: colors.primary
              }}
            >
              View Projects
            </button>
          </div>
          
          <div 
            className="absolute top-0 right-0 h-24 w-24 rounded-full -mt-12 -mr-12"
            style={{ 
              backgroundColor: colors.secondary,
              opacity: 0.1
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}