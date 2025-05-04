"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const { login, isAdmin } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = login(password);
    
    if (success) {
      onClose();
      router.push("/admin");
    } else {
      setIsError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (isError) setIsError(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`relative bg-navy border border-navy-light rounded-lg p-8 w-full max-w-md z-10 ${
              isShaking ? "animate-shake" : ""
            }`}
            style={{
              animation: isShaking ? "shake 0.5s cubic-bezier(.36,.07,.19,.97) both" : "none",
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate hover:text-teal transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-navy-light mb-4">
                <Lock className="w-6 h-6 text-teal" />
              </div>
              <h2 className="text-xl font-bold text-slate-light">Admin Access</h2>
              <p className="text-slate text-sm mt-1">
                Enter your password to access the admin area
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded bg-navy-dark border ${
                    isError ? "border-red-500" : "border-navy-light"
                  } text-slate-light focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent`}
                  placeholder="Enter admin password"
                  autoComplete="off"
                />
                {isError && (
                  <p className="mt-1 text-sm text-red-500">
                    Invalid password. Please try again.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-navy-light text-teal border border-teal rounded hover:bg-teal/10 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-navy"
              >
                Login
              </button>
            </form>

            <style jsx>{`
              @keyframes shake {
                10%, 90% { transform: translate3d(-1px, 0, 0); }
                20%, 80% { transform: translate3d(2px, 0, 0); }
                30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                40%, 60% { transform: translate3d(4px, 0, 0); }
              }
            `}</style>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}