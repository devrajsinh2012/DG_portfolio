
"use client";

import * as React from "react";
import { uuidv4 } from "@/lib/uuid-helper";
import { ToastContext, ToastProps } from "./use-toast";
import { Toast, ToastTitle, ToastDescription, ToastAction } from "./toast";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      { id: uuidv4(), ...toast },
    ]);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prevToasts) =>
      prevToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  // Auto-dismiss toasts after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (toasts.length > 0) {
        setToasts((prevToasts) => prevToasts.slice(1));
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}

export function Toaster() {
  const { toasts, removeToast } = React.useContext(ToastContext) || { toasts: [], removeToast: () => {} };

  return (
    <div className="fixed top-0 z-[100] flex flex-col items-end gap-2 px-4 py-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col-reverse">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          onClose={() => removeToast(toast.id)}
          className="w-full sm:w-80"
        >
          <div className="flex flex-col gap-1">
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            {toast.description && (
              <ToastDescription>{toast.description}</ToastDescription>
            )}
          </div>
          {toast.action && <ToastAction>{toast.action}</ToastAction>}
        </Toast>
      ))}
    </div>
  );
}
