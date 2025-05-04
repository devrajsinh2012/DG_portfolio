"use client";

import React from "react";
import { usePortfolioData } from "@/context/data-context";
import {
  User,
  Briefcase,
  GraduationCap,
  LayoutGrid,
  Palette,
  Settings,
  FileText,
  Mail,
  ArrowRight,
} from "lucide-react";

export function AdminDashboard() {
  const { data } = usePortfolioData();

  const stats = [
    {
      name: "Skills",
      value: data.skills.reduce((acc, category) => acc + category.items.length, 0),
      icon: <GraduationCap className="w-5 h-5 text-teal" />,
    },
    {
      name: "Experience",
      value: data.experience.length,
      icon: <Briefcase className="w-5 h-5 text-teal" />,
    },
    {
      name: "Projects",
      value: data.projects.length,
      icon: <LayoutGrid className="w-5 h-5 text-teal" />,
    },
    {
      name: "Education",
      value: data.education.length + data.certifications.length,
      icon: <FileText className="w-5 h-5 text-teal" />,
    },
  ];

  const quickLinks = [
    {
      name: "Edit Personal Info",
      icon: <User className="w-5 h-5" />,
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    },
    {
      name: "Manage Projects",
      icon: <LayoutGrid className="w-5 h-5" />,
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    },
    {
      name: "Update Skills",
      icon: <GraduationCap className="w-5 h-5" />,
      color: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    {
      name: "Customize Appearance",
      icon: <Palette className="w-5 h-5" />,
      color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    },
    {
      name: "Edit Experience",
      icon: <Briefcase className="w-5 h-5" />,
      color: "bg-red-500/10 text-red-500 border-red-500/20",
    },
    {
      name: "Update Contact Info",
      icon: <Mail className="w-5 h-5" />,
      color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-light mb-2">Admin Dashboard</h1>
        <p className="text-slate">
          Welcome back! Manage and customize your portfolio website.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-navy p-6 rounded-lg border border-navy-light shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-slate-light font-semibold">{stat.name}</h2>
              {stat.icon}
            </div>
            <p className="text-3xl font-bold text-slate-light">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <h2 className="text-xl font-bold text-slate-light mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {quickLinks.map((link) => (
          <button
            key={link.name}
            className={`flex items-center justify-between p-4 rounded-lg border ${link.color} transition-all hover:translate-x-1`}
          >
            <div className="flex items-center">
              {link.icon}
              <span className="ml-3 font-medium">{link.name}</span>
            </div>
            <ArrowRight className="w-4 h-4 opacity-70" />
          </button>
        ))}
      </div>

      {/* Preview and Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-navy p-6 rounded-lg border border-navy-light">
          <h2 className="text-xl font-bold text-slate-light mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-teal" />
            Site Settings
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate">Theme Mode</span>
              <span className="text-teal font-medium">Dark Mode</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate">Animations</span>
              <span className="text-teal font-medium">Enabled</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate">Accent Color</span>
              <div className="w-6 h-6 rounded-full bg-teal"></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate">Performance Mode</span>
              <span className="text-amber-400 font-medium">Standard</span>
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-navy-light text-teal border border-teal rounded hover:bg-teal/10 transition-colors font-medium text-sm w-full">
            Update Settings
          </button>
        </div>

        <div className="bg-navy p-6 rounded-lg border border-navy-light">
          <h2 className="text-xl font-bold text-slate-light mb-4 flex items-center">
            <Palette className="w-5 h-5 mr-2 text-teal" />
            Appearance Preview
          </h2>
          <div className="border border-navy-light rounded-lg p-4 bg-navy-dark mb-4">
            <div className="h-4 w-24 bg-navy-light rounded mb-3"></div>
            <div className="h-6 w-48 bg-teal/20 rounded mb-3"></div>
            <div className="h-4 w-full bg-navy-light rounded mb-2"></div>
            <div className="h-4 w-full bg-navy-light rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-navy-light rounded"></div>
          </div>
          <div className="flex space-x-3 mb-4">
            <div className="w-6 h-6 rounded-full bg-teal cursor-pointer ring-2 ring-offset-navy ring-offset-2 ring-teal"></div>
            <div className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer"></div>
            <div className="w-6 h-6 rounded-full bg-purple-500 cursor-pointer"></div>
            <div className="w-6 h-6 rounded-full bg-amber-500 cursor-pointer"></div>
            <div className="w-6 h-6 rounded-full bg-emerald-500 cursor-pointer"></div>
          </div>
          <button className="px-4 py-2 bg-navy-light text-teal border border-teal rounded hover:bg-teal/10 transition-colors font-medium text-sm w-full">
            Customize Theme
          </button>
        </div>
      </div>
    </div>
  );
}