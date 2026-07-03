"use client";

import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteNavigation } from "@/components/layout/site-navigation";
import ThemeStylesProvider from "@/components/theme-styles-provider";
import { Footer } from "@/components/layout/footer";
import DotGrid from "@/components/DotGrid";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <ThemeStylesProvider />
      <div className="relative">
        <div className="fixed inset-0 -z-1 opacity-100">
          <DotGrid
            dotSize={6}
            gap={30}
            baseColor="#64FFDA"
            activeColor="#FFFFFF"
            proximity={180}
            shockRadius={350}
            shockStrength={5}
            resistance={500}
            returnDuration={2}
          />
        </div>
        <div className="fixed inset-0 -z-1 bg-[#0a192f]/80 pointer-events-none"></div>
        <SiteNavigation />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
} 