"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { SettingsForm } from "@/components/admin/forms/settings-form";

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-light mb-2">General Settings</h1>
          <p className="text-slate">
            Manage general website settings and preferences.
          </p>
        </header>

        <div className="p-6 border border-navy-light rounded-lg bg-navy">
          <SettingsForm />
        </div>
      </div>
    </AdminLayout>
  );
}