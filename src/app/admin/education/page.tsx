"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { EducationForm } from "@/components/admin/forms/education-form";

export default function AdminEducationPage() {
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-light mb-2">Education & Activities</h1>
          <p className="text-slate">
            Manage your educational background, certifications, and extracurricular activities.
          </p>
        </header>

        <div className="p-6 border border-navy-light rounded-lg bg-navy">
          <EducationForm />
        </div>
      </div>
    </AdminLayout>
  );
}