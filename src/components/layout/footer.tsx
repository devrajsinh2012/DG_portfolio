"use client";

import React from "react";
import { Heart } from "lucide-react";
import { cn } from '@/lib/utils';

export function Footer() {
  // Local data
  const personalInfo = {
    name: "Devrajsinh Gohil",
  };

  return (
    <footer className="bg-navy-dark py-12 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          {/* Footer Text */}
          <div className="text-center">
            <p className="text-slate mb-2">
              &copy; {new Date().getFullYear()} All rights reserved by Devrajsinh
            </p>
            <p className="text-slate flex items-center justify-center">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> by Devrajsinh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}