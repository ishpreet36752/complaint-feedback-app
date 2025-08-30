"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ComplaintForm } from "@/components/ComplaintForm";
import { Navbar } from "@/components/Navbar";
import { AuthModal } from "@/components/auth/AuthModal";

export default function SubmitComplaintPage() {
  const { user, isAuthenticated, isLoading, setUser } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isLoading, isAuthenticated]);

  const handleAuthSuccess = (userRole: string) => {
    const tempUser = {
      id: `temp-${Date.now()}`,
      name: "User",
      email: userRole.includes("admin") ? "admin@example.com" : "user@example.com",
      role: userRole as "user" | "admin",
    };
    setUser(tempUser);
    setShowAuthModal(false);
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003366] via-[#004080] to-[#0055AA] flex items-center justify-center">
        <div className="text-white text-lg font-heading">Loading your journey...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F2F2F2] via-white to-[#E8F4FD] flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#003366] to-[#004080] rounded-xl mx-auto mb-6 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-heading font-bold text-[#003366] mb-4">
            Welcome to Prime Vacations
          </h1>
          <p className="text-[#6C757D] font-body mb-6">
            Please sign in to share your travel experience with us.
          </p>
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => window.location.href = "/"}
            onSuccess={handleAuthSuccess}
            initialMode="login"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2F2F2] via-white to-[#E8F4FD]">
      <Navbar userRole={user?.role || "user"} onLogout={() => setUser(null)} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FF6600] to-[#E55A00] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-heading font-bold text-[#003366] mb-4">
              Share Your Travel Experience
            </h1>
            <p className="text-lg text-[#6C757D] font-body max-w-2xl mx-auto leading-relaxed">
              Your feedback helps us create better travel experiences for everyone. 
              Whether it&apos;s a suggestion, compliment, or concern, we value your input.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#E9ECEF]">
            <ComplaintForm 
              onSuccess={() => {
                alert("Thank you for sharing your experience! We'll review your feedback and get back to you soon.");
              }} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
