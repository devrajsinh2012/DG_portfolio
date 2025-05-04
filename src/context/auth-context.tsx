"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

const ADMIN_PASSWORD = "admin123";

interface AuthContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      toast({
        title: "Login successful",
        description: "You are now logged in as admin",
      });
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid password",
      });
      return false;
    }
  };

  const logout = () => {
    setIsAdmin(false);
    toast({
      title: "Logged out",
      description: "You have been logged out",
    });
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}