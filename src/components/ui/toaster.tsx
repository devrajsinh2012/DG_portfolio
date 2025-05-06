
"use client"

import { useEffect, useState } from "react"

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle } from "@/components/ui/toast"
import { toastState } from "@/components/ui/use-toast"

export function Toaster() {
  const [toasts, setToasts] = useState(toastState.toasts)

  useEffect(() => {
    const interval = setInterval(() => {
      setToasts([...toastState.toasts])
    }, 100)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose onClick={() => {
            toastState.toasts = toastState.toasts.filter(t => t.id !== id)
          }} />
        </Toast>
      ))}
    </ToastProvider>
  )
}
