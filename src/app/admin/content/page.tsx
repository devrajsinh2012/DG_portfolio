"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminContentPanel } from "@/components/admin/admin-content-panel";

export default function AdminContentPage() {
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
      <AdminContentPanel />
    </AdminLayout>
  );
}