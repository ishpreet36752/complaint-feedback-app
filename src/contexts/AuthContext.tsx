"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Try to get current user info from the backend
      const response = await fetch("/api/auth/me", {
        method: "GET",
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.user) {
          setUser(result.user);
          localStorage.setItem("user", JSON.stringify(result.user));
        } else {
          localStorage.removeItem("user");
          setUser(null);
        }
      } else {
        // User is not authenticated
        localStorage.removeItem("user");
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  const handleSetUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser: handleSetUser, 
      logout, 
      isLoading, 
      isAuthenticated: !!user 
    }}>
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
