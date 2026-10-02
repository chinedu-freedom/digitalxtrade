'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Shield, User, LogIn, UserPlus, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function HeaderNav() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close drawer on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Investments', href: '/investments' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Support', href: '/support' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs font-sans">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <img
              src="/logo.jpeg"
              alt="DigitalXTrade Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 aspect-square object-cover shrink-0 transition-transform group-hover:scale-105 duration-300 rounded"
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-wider text-slate-900 leading-none">
                DIGITAL<span className="text-[#0085d0]">X</span>TRADE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-bold transition-colors ${
                    isActive ? 'text-[#0085d0]' : 'text-slate-700 hover:text-[#0085d0]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Action Buttons (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    href="/security"
                    className="border border-[#0085d0] text-[#0085d0] hover:bg-slate-50 transition-all px-5 py-2 rounded text-xs font-black tracking-wider uppercase flex items-center justify-center shadow-xs"
                  >
                    2FA
                  </Link>
                  <Link
                    href="/dashboard"
                    className="bg-[#0085d0] hover:bg-[#0072ce] text-white transition-all px-6 py-2 rounded text-xs font-black tracking-wider uppercase shadow-sm"
                  >
                    ACCOUNT
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="border border-[#0085d0] text-[#0085d0] hover:bg-slate-50 transition-all px-4 py-2 rounded text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-xs group"
                  >
                    <span>LOGIN</span>
                    <svg className="w-3.5 h-3.5 text-[#0085d0] transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 4h3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-3" />
                      <path d="M4 12h10M10 8l4 4-4 4" />
                    </svg>
                  </Link>
                  <Link
                    href="/register"
                    className="bg-[#0085d0] hover:bg-[#0072ce] text-white transition-all px-5 py-2 rounded text-xs font-black tracking-wider uppercase shadow-sm"
                  >
                    OPEN ACCOUNT
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger Toggle Button (Shown on Mobile, Replaces the Two Buttons) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-slate-800 hover:text-[#0085d0] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0085d0]/30"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>

        </div>
      </header>

      {/* Slide-In Mobile Navigation Drawer & Backdrop */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-visibility duration-300 ${
          mobileMenuOpen ? 'visible' : 'invisible pointer-events-none'
        }`}
      >
        {/* Darkened Backdrop Overlay */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Slide-in Drawer Container */}
        <aside
          className={`fixed top-0 right-0 bottom-0 w-[82%] max-w-[320px] bg-white shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out z-10 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.jpeg"
                alt="DigitalXTrade Logo"
                className="w-7 h-7 aspect-square object-cover rounded"
              />
              <span className="text-base font-black tracking-wider text-slate-900">
                DIGITAL<span className="text-[#0085d0]">X</span>TRADE
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1">
              Menu Navigation
            </div>

            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-[#0085d0]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#0085d0]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}

            {user && (
              <>
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 pt-4 pb-1">
                  Portal Links
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#0085d0] transition-colors"
                >
                  <span>Trading Dashboard</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/deposit"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#0085d0] transition-colors"
                >
                  <span>Make Deposit</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/withdraw"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#0085d0] transition-colors"
                >
                  <span>Withdraw Funds</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </>
            )}
          </div>

          {/* Drawer Action Buttons (Slid in with Drawer) */}
          <div className="p-5 border-t border-slate-100 bg-slate-50/70 space-y-2.5">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-[#0085d0] hover:bg-[#0072ce] text-white py-3 px-4 rounded-lg text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <User className="w-4 h-4" />
                  <span>ACCOUNT PORTAL</span>
                </Link>
                <Link
                  href="/security"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-white border border-[#0085d0] text-[#0085d0] hover:bg-blue-50/50 py-2.5 px-4 rounded-lg text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-2xs transition-all"
                >
                  <Shield className="w-4 h-4" />
                  <span>2FA SECURITY</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-slate-500 hover:text-rose-600 hover:bg-rose-50/50 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-[#0085d0] hover:bg-[#0072ce] text-white py-3 px-4 rounded-lg text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>OPEN ACCOUNT</span>
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-white border border-[#0085d0] text-[#0085d0] hover:bg-blue-50/50 py-2.5 px-4 rounded-lg text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-2xs transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>LOGIN</span>
                </Link>
              </>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
