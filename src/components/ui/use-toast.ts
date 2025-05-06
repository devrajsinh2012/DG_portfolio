
"use client"

import * as React from "react";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

type ToastActionElement = React.ReactElement;

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const toast = React.useCallback(({ ...props }: ToastProps) => {
    setToasts((prev) => [...prev, { ...props }]);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
    
    return {
      id: Date.now(),
      dismiss: () => setToasts((prev) => prev.slice(1)),
    };
  }, []);

  return {
    toast,
    toasts,
    dismiss: (id?: number) => {
      if (id) {
        setToasts((prev) => prev.filter((_, index) => index !== id));
      } else {
        setToasts([]);
      }
    },
  };
}

export type { ToastProps, ToastActionElement };
