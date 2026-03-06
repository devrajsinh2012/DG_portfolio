
import "./globals.css";
import { Metadata } from "next";
import ClientLayout from "@/components/layout/client-layout";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Devrajsinh Gohil | Portfolio",
  description: "Project Management professional with expertise in digital marketing campaigns, cross-functional coordination, and product management.",
  icons: {
    icon: "/images/icon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ClientLayout>{children}</ClientLayout>
        <Toaster />
      </body>
    </html>
  );
}
