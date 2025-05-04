"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { SkillsForm } from "@/components/admin/forms/skills-form";

export default function AdminSkillsPage() {
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-light mb-2">Skills</h1>
          <p className="text-slate">
            Manage your skills, proficiency levels, and organize them into categories.
          </p>
        </header>

        <div className="p-6 border border-navy-light rounded-lg bg-navy">
          <SkillsForm />
        </div>
      </div>
    </AdminLayout>
  );
}