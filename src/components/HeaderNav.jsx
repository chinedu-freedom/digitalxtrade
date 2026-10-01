'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function HeaderNav() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <img
            src="/logo.jpeg"
            alt="DigitalXTrade Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 aspect-square object-cover shrink-0 transition-transform group-hover:scale-105 duration-300"
          />
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-wider text-slate-900 leading-none">
              DIGITAL<span className="text-[#0085d0]">X</span>TRADE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          <Link
            href="/about"
            className="text-sm font-bold text-[#0085d0] hover:text-[#005596] transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/investments"
            className="text-sm font-bold text-[#0085d0] hover:text-[#005596] transition-colors"
          >
            Investments
          </Link>
          <Link
            href="/faq"
            className="text-sm font-bold text-[#0085d0] hover:text-[#005596] transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/support"
            className="text-sm font-bold text-[#0085d0] hover:text-[#005596] transition-colors"
          >
            Support
          </Link>
        </nav>

        {/* Action Buttons & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <Link
                href="/security"
                className="border border-[#0085d0] text-[#0085d0] hover:bg-slate-50 transition-all px-3 sm:px-7 py-1.5 sm:py-2.5 rounded text-[11px] sm:text-xs font-black tracking-wider uppercase flex items-center justify-center shadow-xs"
              >
                2FA
              </Link>
              <Link
                href="/dashboard"
                className="bg-[#0085d0] hover:bg-[#0072ce] text-white transition-all px-3.5 sm:px-6 py-1.5 sm:py-2.5 rounded text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-sm"
              >
                ACCOUNT
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="border border-[#0085d0] text-[#0085d0] hover:bg-slate-50 transition-all px-3 sm:px-4 py-1.5 sm:py-2 rounded text-[11px] sm:text-xs font-black tracking-wider uppercase flex items-center gap-1 shadow-xs group"
              >
                <span>LOGIN</span>
                <svg className="w-3.5 h-3.5 text-[#0085d0] transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 4h3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-3" />
                  <path d="M4 12h10M10 8l4 4-4 4" />
                </svg>
              </Link>
              <Link
                href="/register"
                className="bg-[#0085d0] hover:bg-[#0072ce] text-white transition-all px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-sm"
              >
                OPEN ACCOUNT
              </Link>
            </>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-[#0085d0] rounded-md focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Collapsible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-[#0085d0] hover:bg-blue-50 px-3 rounded-md transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/investments"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-[#0085d0] hover:bg-blue-50 px-3 rounded-md transition-colors"
          >
            Investments
          </Link>
          <Link
            href="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-[#0085d0] hover:bg-blue-50 px-3 rounded-md transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/support"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-[#0085d0] hover:bg-blue-50 px-3 rounded-md transition-colors"
          >
            Support
          </Link>
        </div>
      )}
    </header>
  );
}
