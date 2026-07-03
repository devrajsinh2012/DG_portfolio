"use client";

import { useThemeStyles } from "@/hooks/use-theme-styles";

export default function ThemeStylesProvider() {
  // This component doesn't render anything, it just applies the theme styles
  useThemeStyles();
  return null;
}