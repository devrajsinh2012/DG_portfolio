
"use client"

import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

type ToastState = {
  toasts: ToasterToast[]
}

export const toastState = {
  toasts: [],
} as ToastState

type Toast = Omit<ToasterToast, "id">

function addToast(toast: Toast) {
  const id = Math.random().toString(36).slice(2, 9)
  const newToast = { ...toast, id }
  
  toastState.toasts = [...toastState.toasts, newToast].slice(-TOAST_LIMIT)
  
  setTimeout(() => {
    toastState.toasts = toastState.toasts.filter(t => t.id !== id)
  }, (toast.duration || 5000) + TOAST_REMOVE_DELAY)
  
  return id
}

export function useToast() {
  return {
    toast: (props: Toast) => addToast(props),
    dismiss: (toastId?: string) => {
      if (toastId) {
        toastState.toasts = toastState.toasts.filter(t => t.id !== toastId)
      } else {
        toastState.toasts = []
      }
    },
  }
}

export type { ToasterToast }
