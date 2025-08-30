"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ComplaintTable } from "@/components/ComplaintTable";
import { Navbar } from "@/components/Navbar";
import { AuthModal } from "@/components/auth/AuthModal";

export default function AdminComplaintsPage() {
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
      name: userRole === "admin" ? "Admin User" : "Regular User",
      email: userRole === "admin" ? "admin@example.com" : "user@example.com",
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
            Please sign in to access the admin dashboard.
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

  // Show access denied for non-admin users
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F2F2F2] via-white to-[#E8F4FD] flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#DC3545] to-[#C82333] rounded-xl mx-auto mb-6 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-heading font-bold text-[#003366] mb-4">
            Access Restricted
          </h1>
          <p className="text-[#6C757D] font-body mb-6">
            You need admin privileges to access this dashboard.
          </p>
          <button
            onClick={() => window.location.href = "/"}
            className="bg-[#FF6600] text-white px-6 py-3 rounded-xl hover:bg-[#E55A00] font-body font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2F2F2] via-white to-[#E8F4FD]">
      <Navbar userRole="admin" onLogout={() => setUser(null)} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-[#003366] to-[#004080] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-heading font-bold text-[#003366] mb-4">
              Travel Experience Dashboard
            </h1>
            <p className="text-lg text-[#6C757D] font-body max-w-2xl mx-auto leading-relaxed">
              Manage and respond to guest feedback to ensure exceptional travel experiences. 
              Your insights help us maintain our high standards of service.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#E9ECEF]">
            <ComplaintTable />
          </div>
        </div>
      </main>
    </div>
  );
}
