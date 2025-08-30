"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userRole: string) => void;
  initialMode?: "login" | "signup";
}

export function AuthModal({ isOpen, onClose, onSuccess, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);

  const handleSuccess = (userRole: string) => {
    onSuccess(userRole);
    onClose();
  };

  const handleSwitchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {mode === "login" ? "Sign In" : "Sign Up"}
          </DialogTitle>
        </DialogHeader>
        
        {mode === "login" ? (
          <LoginForm onSuccess={handleSuccess} onSwitchToSignup={handleSwitchMode} />
        ) : (
          <SignupForm onSuccess={handleSuccess} onSwitchToLogin={handleSwitchMode} />
        )}
      </DialogContent>
    </Dialog>
  );
}
