"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { ProjectsForm } from "@/components/admin/forms/projects-form";

export default function AdminProjectsPage() {
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-light mb-2">Projects</h1>
          <p className="text-slate">
            Showcase your projects, including details, technologies used, and outcomes.
          </p>
        </header>

        <div className="p-6 border border-navy-light rounded-lg bg-navy">
          <ProjectsForm />
        </div>
      </div>
    </AdminLayout>
  );
}