"use client";

import React from "react";
import { usePortfolioData } from "@/context/data-context";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface PortfolioLoaderProps {
  children: React.ReactNode;
}

export function PortfolioLoader({ children }: PortfolioLoaderProps) {
  const { loading, error } = usePortfolioData();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-navy-dark">
        <div className="mb-6">
          <LoadingSpinner size="lg" color="teal" />
        </div>
        <h1 className="text-2xl font-bold text-teal mb-2">
          Loading Portfolio
        </h1>
        <p className="text-slate text-center max-w-md">
          Please wait while we fetch the latest content for Devrajsinh's portfolio...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-navy-dark px-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">
            Something went wrong
          </h1>
          <p className="text-slate mb-6">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-navy-light text-slate-light rounded hover:text-teal transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}