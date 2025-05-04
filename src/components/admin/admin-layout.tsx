"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Briefcase,
  GraduationCap,
  Palette,
  Settings,
  FileText,
  LayoutGrid,
  Mail,
  LogOut,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Determine active page from pathname
  const getActivePage = () => {
    if (pathname?.includes('/admin/dashboard')) return 'dashboard';
    if (pathname?.includes('/admin/personal')) return 'personal';
    if (pathname?.includes('/admin/experience')) return 'experience';
    if (pathname?.includes('/admin/skills')) return 'skills';
    if (pathname?.includes('/admin/projects')) return 'projects';
    if (pathname?.includes('/admin/education')) return 'education';
    if (pathname?.includes('/admin/contact')) return 'contact';
    if (pathname?.includes('/admin/appearance')) return 'appearance';
    if (pathname?.includes('/admin/settings')) return 'settings';
    return 'dashboard';
  };

  const [activePage, setActivePage] = useState(getActivePage());

  // Update active page when pathname changes
  useEffect(() => {
    setActivePage(getActivePage());
  }, [pathname]);

  const navigation = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      id: "dashboard",
      href: "/admin/dashboard",
    },
    {
      name: "Personal Info",
      icon: <User className="w-5 h-5" />,
      id: "personal",
      href: "/admin/personal",
    },
    {
      name: "Experience",
      icon: <Briefcase className="w-5 h-5" />,
      id: "experience",
      href: "/admin/experience",
    },
    {
      name: "Skills",
      icon: <GraduationCap className="w-5 h-5" />,
      id: "skills",
      href: "/admin/skills",
    },
    {
      name: "Projects",
      icon: <LayoutGrid className="w-5 h-5" />,
      id: "projects",
      href: "/admin/projects",
    },
    {
      name: "Education",
      icon: <FileText className="w-5 h-5" />,
      id: "education",
      href: "/admin/education",
    },
    {
      name: "Contact",
      icon: <Mail className="w-5 h-5" />,
      id: "contact",
      href: "/admin/contact",
    },
    {
      name: "Appearance",
      icon: <Palette className="w-5 h-5" />,
      id: "appearance",
      href: "/admin/appearance",
    },
    {
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      id: "settings",
      href: "/admin/settings",
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Navigate to a page
  const navigateTo = (href: string) => {
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-navy-dark flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-navy border-r border-navy-light transition-all duration-300 fixed inset-y-0 z-50 flex flex-col`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-navy-light">
          {sidebarOpen ? (
            <h1 className="text-teal font-bold text-xl">Admin Portal</h1>
          ) : (
            <span className="text-teal font-bold text-xl mx-auto">A</span>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-navy-light text-slate"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`${
                    activePage === item.id
                      ? "bg-navy-light text-teal"
                      : "text-slate hover:bg-navy-light hover:text-slate-light"
                  } flex items-center px-3 py-3 rounded-md w-full transition-colors`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {sidebarOpen && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-navy-light">
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-3 text-slate hover:text-red-400 hover:bg-navy-light rounded-md w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-navy border border-navy-light text-teal"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Main content */}
      <main
        className={`flex-1 bg-navy-dark transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        } min-h-screen`}
      >
        <div className="py-6 px-6">{children}</div>
      </main>
    </div>
  );
}