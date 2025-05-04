"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { PersonalInfoForm } from "@/components/admin/forms/personal-info-form";

export default function AdminPersonalPage() {
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-light mb-2">Personal Information</h1>
          <p className="text-slate">
            Edit your personal details, bio, and contact information.
          </p>
        </header>

        <div className="p-6 border border-navy-light rounded-lg bg-navy">
          <PersonalInfoForm />
        </div>
      </div>
    </AdminLayout>
  );
}