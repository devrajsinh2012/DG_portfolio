"use client";

import * as React from "react";

type ToastType = "default" | "destructive";

export type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: ToastType;
};

interface ToastContextType {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, "id">) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { addToast } = context;

  return {
    toast: (props: Omit<ToastProps, "id">) => {
      addToast(props);
    },
    dismiss: (id: string) => {
      context.removeToast(id);
    },
  };
}