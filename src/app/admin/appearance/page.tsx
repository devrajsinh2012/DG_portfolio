"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminAppearancePanel } from "@/components/admin/admin-appearance-panel";

export default function AdminAppearancePage() {
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
      <AdminAppearancePanel />
    </AdminLayout>
  );
}