"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: "login" | "signup" }>({
    isOpen: false,
    mode: "login",
  });

  const [intendedAction, setIntendedAction] = useState<"submit" | "admin" | null>(null);

  const handleAuthSuccess = (userRole: string) => {
    if (intendedAction === "admin" && userRole === "admin") {
      window.location.href = "/complaints/admin";
    } else if (intendedAction === "submit") {
      window.location.href = "/complaints/submit";
    } else if (intendedAction === "admin" && userRole === "user") {
      alert("You need admin privileges to access the admin dashboard.");
      setIntendedAction(null);
    }
  };

  const handleButtonClick = (action: "submit" | "admin") => {
    if (!isAuthenticated) {
      setIntendedAction(action);
      setAuthModal({ isOpen: true, mode: "login" });
    } else {
      if (action === "submit") {
        window.location.href = "/complaints/submit";
      } else if (action === "admin" && user?.role === "admin") {
        window.location.href = "/complaints/admin";
      } else if (action === "admin" && user?.role !== "admin") {
        alert("You need admin privileges to access the admin dashboard.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003366] via-[#004080] to-[#0055AA] flex items-center justify-center">
        <div className="text-white text-lg font-heading">Loading your journey...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2F2F2] via-white to-[#E8F4FD] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#99CC99] rounded-full opacity-10 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#FF6600] rounded-full opacity-15 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-[#003366] rounded-full opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-[#FF6600] rounded-full opacity-20 animate-float" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-[#003366] to-[#004080] rounded-2xl shadow-lg flex items-center justify-center transform rotate-3 animate-pulse-glow">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FF6600] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl font-heading font-bold text-[#003366] mb-6 leading-tight">
            Prime Vacations
            <span className="block text-4xl text-[#FF6600] font-medium mt-2">Feedback Portal</span>
          </h1>
          
          <p className="text-xl font-body text-[#333333] max-w-3xl mx-auto leading-relaxed">
            Your journey with us matters. Share your experiences, suggestions, and feedback 
            to help us create even more extraordinary travel memories for you and fellow adventurers.
          </p>
        </div>

                {/* CTA Buttons */}
        <div className="text-center mb-20">
          <div className="space-y-6 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-[#FF6600] hover:bg-[#E55A00] text-white font-heading font-medium text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0"
              onClick={() => handleButtonClick("submit")}
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
              Share Your Experience
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white font-heading font-medium text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => handleButtonClick("admin")}
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Admin Dashboard
            </Button>
          </div>

          <p className="text-sm text-[#6C757D] mt-6 font-body">
            {isAuthenticated 
              ? `Welcome back, ${user?.name || "Traveler"}! Ready to share your journey?`
              : "New to our community? Sign up to start sharing your travel experiences."
            }
          </p>
        </div>
        
        {/* How It Works Section */}
        <div className="mt-20 bg-white rounded-3xl shadow-xl p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#003366] via-[#FF6600] to-[#99CC99]"></div>
          
          <h3 className="text-3xl font-heading font-bold text-center mb-12 text-[#003366]">
            How Your Feedback Journey Works
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#003366] to-[#004080] rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FF6600] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
              </div>
              <h4 className="font-heading font-semibold mb-3 text-[#003366] text-lg">Share Your Story</h4>
              <p className="text-sm text-[#6C757D] font-body leading-relaxed">Tell us about your travel experience, suggestions, or any concerns you'd like us to address</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#FF6600] to-[#E55A00] rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#003366] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
              </div>
              <h4 className="font-heading font-semibold mb-3 text-[#003366] text-lg">We Review</h4>
              <p className="text-sm text-[#6C757D] font-body leading-relaxed">Our travel experts carefully review your feedback to understand your experience</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#99CC99] to-[#88BB88] rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FF6600] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
              </div>
              <h4 className="font-heading font-semibold mb-3 text-[#003366] text-lg">Take Action</h4>
              <p className="text-sm text-[#6C757D] font-body leading-relaxed">We implement improvements and address concerns to enhance future travel experiences</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#003366] to-[#004080] rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#99CC99] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
              </div>
              <h4 className="font-heading font-semibold mb-3 text-[#003366] text-lg">Stay Updated</h4>
              <p className="text-sm text-[#6C757D] font-body leading-relaxed">Receive updates on your feedback and see how we're improving our services</p>
            </div>
          </div>
        </div>

        {/* Trust Building Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E9ECEF]">
            <h4 className="font-heading font-semibold text-[#003366] mb-4 text-lg">
              Your Feedback Shapes Better Journeys
            </h4>
            <p className="text-[#6C757D] font-body text-sm max-w-2xl mx-auto">
              Every piece of feedback helps us create more memorable travel experiences. 
              Your voice matters in our mission to deliver exceptional vacation packages.
            </p>
          </div>
        </div>

        {/* Authentication Modal */}
        <AuthModal
          isOpen={authModal.isOpen}
          onClose={() => setAuthModal({ isOpen: false, mode: "login" })}
          onSuccess={handleAuthSuccess}
          initialMode={authModal.mode}
        />
      </div>
    </div>
  );
}
