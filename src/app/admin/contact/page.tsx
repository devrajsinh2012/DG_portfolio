"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { ContactForm } from "@/components/admin/forms/contact-form";

export default function AdminContactPage() {
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-light mb-2">Contact Settings</h1>
          <p className="text-slate">
            Manage your contact information and form settings.
          </p>
        </header>

        <div className="p-6 border border-navy-light rounded-lg bg-navy">
          <ContactForm />
        </div>
      </div>
    </AdminLayout>
  );
}