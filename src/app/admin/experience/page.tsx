"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { ExperienceForm } from "@/components/admin/forms/experience-form";

export default function AdminExperiencePage() {
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-light mb-2">Experience</h1>
          <p className="text-slate">
            Manage your work experience, job roles, and professional achievements.
          </p>
        </header>

        <div className="p-6 border border-navy-light rounded-lg bg-navy">
          <ExperienceForm />
        </div>
      </div>
    </AdminLayout>
  );
}