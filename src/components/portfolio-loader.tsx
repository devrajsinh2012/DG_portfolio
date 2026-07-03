"use client";

import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface PortfolioLoaderProps {
  children?: React.ReactNode;
}

export function PortfolioLoader({ children }: PortfolioLoaderProps = {}) {
  const [progress, setProgress] = useState(0);
  
  // Simulate progress for better UX
  useEffect(() => {
    // Start with 10% progress immediately
    setProgress(10);
    
    // Progress to 100% gradually
    const timer1 = setTimeout(() => setProgress(30), 300);
    const timer2 = setTimeout(() => setProgress(50), 600);
    const timer3 = setTimeout(() => setProgress(70), 900);
    const timer4 = setTimeout(() => setProgress(100), 1200);
    
    // Clean up timers
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-navy-dark">
      <div className="mb-6">
        <LoadingSpinner size="lg" color="teal" />
      </div>
      <h1 className="text-2xl font-bold text-teal mb-4">
        Loading Portfolio
      </h1>
      <div className="w-64 h-2 bg-navy-light rounded-full overflow-hidden mb-2">
        <div 
          className="h-full bg-teal transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-slate text-sm">{progress}%</p>
      <p className="text-slate text-center max-w-md mt-4">
        Please wait while we load the portfolio...
      </p>
    </div>
  );
}
