import type { Metadata } from "next";
import { Montserrat, Fira_Code, Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/auth-context";
import { DataProvider } from "@/context/data-context";
import ThemeStylesProvider from "@/components/theme-styles-provider";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Devrajsinh Gohil | Portfolio",
  description: "Project Management professional with expertise in digital marketing campaigns, cross-functional coordination, and product management.",
  keywords: [
    "Devrajsinh Gohil", 
    "Project Management", 
    "Digital Marketing", 
    "Portfolio", 
    "Rajkot",
    "India",
    "AI",
    "Artificial Intelligence",
    "Operations",
    "Marketing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${firaCode.variable} ${openSans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <DataProvider>
              <ThemeStylesProvider />
              {children}
              <Toaster />
            </DataProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}