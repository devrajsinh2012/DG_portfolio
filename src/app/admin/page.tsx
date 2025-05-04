"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default function AdminPage() {
  const { isAdmin } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAdmin) {
      router.push("/");
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return null;
  }

  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}