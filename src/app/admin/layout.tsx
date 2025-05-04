"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return <>{children}</>;
}