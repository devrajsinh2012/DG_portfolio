"use client";

import React from "react";
import { motion } from "framer-motion";
import { Animations } from "@/context/data-context";

interface AnimationsControlProps {
  animations: Animations;
  onChange: (key: string, value: string | boolean) => void;
}

export function AnimationsControl({ animations, onChange }: AnimationsControlProps) {
  const handleToggleAnimations = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange('enabled', e.target.checked);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange('speed', e.target.value);
  };

  const handleIntensityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange('intensity', e.target.value);
  };
  
  const cardAnimation = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: animations.speed === 'slow' ? 1 : animations.speed === 'normal' ? 0.5 : 0.2,
        ease: 'easeOut'
      }
    }
  };

  const buttonAnimation = {
    initial: { scale: 1 },
    hover: { 
      scale: animations.intensity === 'low' ? 1.02 : animations.intensity === 'medium' ? 1.05 : 1.1,
      transition: { 
        duration: animations.speed === 'slow' ? 0.4 : animations.speed === 'normal' ? 0.2 : 0.1
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-light mb-6">Animation Settings</h2>
      
      <div className="space-y-8">
        {/* Global Toggle */}
        <div className="p-4 bg-navy-light rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-slate-light font-medium">Enable Animations</h3>
              <p className="text-slate text-sm mt-1">
                Toggle all animations on or off throughout your portfolio
              </p>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
              <input
                type="checkbox"
                id="toggle-animations"
                checked={animations.enabled}
                onChange={handleToggleAnimations}
                className="absolute w-0 h-0 opacity-0"
              />
              <label
                htmlFor="toggle-animations"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                  animations.enabled ? 'bg-teal' : 'bg-navy-dark'
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-300 ${
                    animations.enabled ? 'translate-x-7' : 'translate-x-1'
                  } my-0.5`}
                ></span>
              </label>
            </div>
          </div>
        </div>
        
        <div className={animations.enabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}>
          {/* Animation Speed */}
          <div className="mb-6">
            <h3 className="text-slate-light font-medium mb-3">Animation Speed</h3>
            <select
              value={animations.speed}
              onChange={handleSpeedChange}
              className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              disabled={!animations.enabled}
            >
              <option value="slow">Slow</option>
              <option value="normal">Normal</option>
              <option value="fast">Fast</option>
            </select>
            <p className="text-slate text-sm mt-2">
              Adjust how quickly animations play across your portfolio
            </p>
          </div>
          
          {/* Animation Intensity */}
          <div className="mb-8">
            <h3 className="text-slate-light font-medium mb-3">Animation Intensity</h3>
            <select
              value={animations.intensity}
              onChange={handleIntensityChange}
              className="w-full px-4 py-2 rounded bg-navy-dark border border-navy-light text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              disabled={!animations.enabled}
            >
              <option value="low">Subtle</option>
              <option value="medium">Medium</option>
              <option value="high">Bold</option>
            </select>
            <p className="text-slate text-sm mt-2">
              Control how pronounced your animations appear
            </p>
          </div>
          
          {/* Animation Preview */}
          <div className="p-6 border border-navy-light rounded-lg">
            <h3 className="text-slate-light font-medium mb-6">Animation Preview</h3>
            
            <div className="space-y-6">
              {/* Entrance Animation */}
              <div>
                <p className="text-slate mb-3">Entrance Animation</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      const preview = document.getElementById('animation-preview');
                      if (preview) {
                        preview.classList.remove('animate-in');
                        void preview.offsetWidth; // Trigger reflow
                        preview.classList.add('animate-in');
                      }
                    }}
                    className="px-4 py-2 bg-teal text-navy font-medium rounded"
                  >
                    Play Animation
                  </button>
                  
                  <motion.div
                    id="animation-preview"
                    className="animate-in"
                    variants={cardAnimation}
                    initial="initial"
                    animate={animations.enabled ? "animate" : "initial"}
                  >
                    <div className="w-48 h-24 bg-navy-light rounded-lg flex items-center justify-center border border-navy overflow-hidden">
                      <div className="p-3 text-center">
                        <p className="text-slate-light font-medium">Fade In & Slide Up</p>
                        <p className="text-slate text-xs mt-1">Entrance animation</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Hover Animation */}
              <div>
                <p className="text-slate mb-3">Hover Animation</p>
                <div className="flex space-x-4">
                  <motion.button
                    variants={buttonAnimation}
                    initial="initial"
                    whileHover={animations.enabled ? "hover" : "initial"}
                    className="px-4 py-2 bg-navy-light text-teal font-medium rounded border border-teal"
                  >
                    Hover Me
                  </motion.button>
                  
                  <motion.div
                    variants={buttonAnimation}
                    initial="initial"
                    whileHover={animations.enabled ? "hover" : "initial"}
                    className="w-48 h-24 bg-navy-light rounded-lg flex items-center justify-center border border-navy cursor-pointer"
                  >
                    <div className="text-center">
                      <p className="text-slate-light">Card Hover</p>
                      <p className="text-slate text-xs mt-1">Scale animation</p>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Typing Animation */}
              <div>
                <p className="text-slate mb-3">Typing Animation</p>
                <div className="p-4 bg-navy-light rounded-lg inline-block">
                  <div className="flex items-center">
                    <p className="text-slate-light mr-1">I am a</p>
                    <span className="text-teal font-medium">
                      Project Manager
                      <span className={`inline-block w-0.5 h-5 bg-teal ml-0.5 ${animations.enabled ? 'animate-pulse' : ''}`}></span>
                    </span>
                  </div>
                </div>
                <p className="text-slate text-xs mt-2">Cursor blink speed reflects your animation speed setting</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}