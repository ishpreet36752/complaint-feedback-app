"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  userRole?: "user" | "admin";
  onLogout?: () => void;
}

export function Navbar({ userRole = "user", onLogout }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      
      if (response.ok) {
        onLogout?.();
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-[#E9ECEF] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#003366] to-[#004080] rounded-xl shadow-md flex items-center justify-center transform group-hover:rotate-3 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6600] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold text-[#003366]">Prime Vacations</span>
                <span className="text-xs font-body text-[#FF6600] -mt-1">Feedback Portal</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {userRole === "admin" ? (
              <>
                <Link
                  href="/complaints/admin"
                  className="text-[#333333] hover:text-[#FF6600] px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-300 hover:bg-[#F8F9FA] group"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span>Manage Feedback</span>
                  </div>
                </Link>
                <Link
                  href="/complaints/submit"
                  className="text-[#333333] hover:text-[#FF6600] px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-300 hover:bg-[#F8F9FA] group"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                    </svg>
                    <span>Share Experience</span>
                  </div>
                </Link>
              </>
            ) : (
              <Link
                href="/complaints/submit"
                className="text-[#333333] hover:text-[#FF6600] px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-300 hover:bg-[#F8F9FA] group"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                  </svg>
                  <span>Share Experience</span>
                </div>
              </Link>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2 border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white font-body font-medium transition-all duration-300 rounded-lg px-4 py-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
              <span>Sign Out</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-[#333333] hover:text-[#FF6600] hover:bg-[#F8F9FA] rounded-lg"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3 border-t border-[#E9ECEF] bg-white rounded-b-lg shadow-lg">
              {userRole === "admin" ? (
                <>
                  <Link
                    href="/complaints/admin"
                    className="text-[#333333] hover:text-[#FF6600] block px-4 py-3 rounded-lg text-base font-body font-medium transition-all duration-300 hover:bg-[#F8F9FA] group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span>Manage Feedback</span>
                    </div>
                  </Link>
                  <Link
                    href="/complaints/submit"
                    className="text-[#333333] hover:text-[#FF6600] block px-4 py-3 rounded-lg text-base font-body font-medium transition-all duration-300 hover:bg-[#F8F9FA] group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                      </svg>
                      <span>Share Experience</span>
                    </div>
                  </Link>
                </>
              ) : (
                <Link
                  href="/complaints/submit"
                  className="text-[#333333] hover:text-[#FF6600] block px-4 py-3 rounded-lg text-base font-body font-medium transition-all duration-300 hover:bg-[#F8F9FA] group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                    </svg>
                    <span>Share Experience</span>
                  </div>
                </Link>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full justify-start border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white font-body font-medium transition-all duration-300 rounded-lg px-4 py-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
