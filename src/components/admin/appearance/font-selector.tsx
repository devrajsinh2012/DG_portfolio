"use client";

import React from "react";
import { Fonts } from "@/context/data-context";

interface FontSelectorProps {
  fonts: Fonts;
  onChange: (key: string, value: string) => void;
}

export function FontSelector({ fonts, onChange }: FontSelectorProps) {
  const fontFamilies = {
    sans: [
      "Montserrat, sans-serif",
      "Poppins, sans-serif",
      "Inter, sans-serif",
      "Roboto, sans-serif",
      "Open Sans, sans-serif",
      "Lato, sans-serif",
      "Nunito, sans-serif",
      "Raleway, sans-serif"
    ],
    mono: [
      "Fira Code, monospace",
      "Source Code Pro, monospace",
      "JetBrains Mono, monospace",
      "IBM Plex Mono, monospace",
      "Ubuntu Mono, monospace"
    ],
    serif: [
      "Merriweather, serif",
      "Playfair Display, serif",
      "Georgia, serif",
      "Roboto Slab, serif",
      "Lora, serif"
    ]
  };

  const fontSizes = {
    base: ["14px", "16px", "18px"],
    heading: ["20px", "24px", "28px", "32px", "36px", "40px"],
    code: ["12px", "14px", "16px"]
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>, key: string) => {
    onChange(key, e.target.value);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-light mb-6">Typography Settings</h2>
      
      <div className="space-y-8">
        {/* Heading Font */}
        <div>
          <h3 className="text-slate-light font-medium mb-4">Heading Font</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-slate text-sm mb-2">Font Family</label>
              <select
                value={fonts.heading}
                onChange={(e) => handleFontChange(e, 'heading')}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              >
                {fontFamilies.sans.map((font) => (
                  <option key={font} value={font}>{font.split(',')[0]}</option>
                ))}
                {fontFamilies.serif.map((font) => (
                  <option key={font} value={font}>{font.split(',')[0]}</option>
                ))}
              </select>
            </div>
            
            <div 
              className="p-4 bg-navy-light rounded-lg"
              style={{ fontFamily: fonts.heading }}
            >
              <p className="text-xl font-bold text-slate-light mb-2">Heading Example</p>
              <p className="text-slate">This is how your headings will appear on the website.</p>
            </div>
          </div>
        </div>
        
        {/* Body Font */}
        <div>
          <h3 className="text-slate-light font-medium mb-4">Body Font</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-slate text-sm mb-2">Font Family</label>
              <select
                value={fonts.body}
                onChange={(e) => handleFontChange(e, 'body')}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              >
                {fontFamilies.sans.map((font) => (
                  <option key={font} value={font}>{font.split(',')[0]}</option>
                ))}
                {fontFamilies.serif.map((font) => (
                  <option key={font} value={font}>{font.split(',')[0]}</option>
                ))}
              </select>
            </div>
            
            <div 
              className="p-4 bg-navy-light rounded-lg"
              style={{ fontFamily: fonts.body }}
            >
              <p className="text-slate mb-2">Body Text Example</p>
              <p className="text-slate">
                This is how your body text will appear on the website. The body font is used for paragraphs,
                descriptions, and most of the content on your site. It should be easily readable and comfortable
                for extended reading.
              </p>
            </div>
          </div>
        </div>
        
        {/* Monospace Font */}
        <div>
          <h3 className="text-slate-light font-medium mb-4">Monospace Font (for code and accents)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-slate text-sm mb-2">Font Family</label>
              <select
                value={fonts.code}
                onChange={(e) => handleFontChange(e, 'code')}
                className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              >
                {fontFamilies.mono.map((font) => (
                  <option key={font} value={font}>{font.split(',')[0]}</option>
                ))}
              </select>
            </div>
            
            <div className="p-4 bg-navy-light rounded-lg">
              <p className="text-slate mb-2">Monospace Example</p>
              <pre 
                className="p-3 bg-navy rounded text-teal text-sm"
                style={{ fontFamily: fonts.code }}
              >
                {`function greet() {\n  console.log("Hello, world!");\n}`}
              </pre>
            </div>
          </div>
        </div>
        
        {/* Combined Preview */}
        <div className="p-6 border border-navy-light rounded-lg">
          <h3 className="text-slate-light font-medium mb-4">Typography Preview</h3>
          
          <div className="space-y-6">
            <div>
              <h1 
                className="text-3xl font-bold mb-2 text-slate-light"
                style={{ fontFamily: fonts.heading }}
              >
                Heading 1
              </h1>
              <h2 
                className="text-2xl font-bold mb-2 text-slate-light"
                style={{ fontFamily: fonts.heading }}
              >
                Heading 2
              </h2>
              <h3 
                className="text-xl font-bold mb-2 text-slate-light"
                style={{ fontFamily: fonts.heading }}
              >
                Heading 3
              </h3>
            </div>
            
            <div style={{ fontFamily: fonts.body }}>
              <p className="text-slate mb-3">
                This is a paragraph with body text. Your main content will be formatted like this.
                It should be readable and well-balanced with adequate line height and proper spacing.
              </p>
              <p className="text-slate">
                Another paragraph showcasing the body font. The font choice here impacts the overall readability
                and feel of your portfolio website.
              </p>
            </div>
            
            <div>
              <p className="text-slate mb-2">Code snippet example:</p>
              <pre 
                className="p-3 bg-navy rounded text-teal text-sm"
                style={{ fontFamily: fonts.code }}
              >
                {`// This is a code comment\nconst portfolio = {\n  name: "Devrajsinh Gohil",\n  role: "Project Management Professional"\n};`}
              </pre>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                className="px-4 py-2 bg-teal text-navy font-medium rounded"
                style={{ fontFamily: fonts.body }}
              >
                Primary Button
              </button>
              <button
                className="px-4 py-2 bg-transparent border border-teal text-teal font-medium rounded"
                style={{ fontFamily: fonts.body }}
              >
                Secondary Button
              </button>
              <span 
                className="font-mono text-teal"
                style={{ fontFamily: fonts.code }}
              >
                01. Section Number
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}