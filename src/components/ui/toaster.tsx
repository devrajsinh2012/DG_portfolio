"use client";

import * as React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toast, ToastClose, ToastDescription, ToastTitle } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-0 z-[100] flex flex-col gap-2 p-4 max-w-md w-full">
      {toasts.map((toast, index) => (
        <Toast key={index} variant={toast.variant}>
          {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
          {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          <ToastClose onClick={() => {}} />
        </Toast>
      ))}
    </div>
  );
}