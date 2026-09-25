'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function HeaderNav() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo.jpeg"
            alt="DigitalXTrade Logo"
            className="w-10 h-10 aspect-square object-cover shrink-0 transition-transform group-hover:scale-105 duration-300"
          />
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-wider text-slate-900 leading-none">
              DIGITAL<span className="text-[#0085d0]">X</span>TRADE
            </span>
          </div>
        </Link>

        {/* Main Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
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

        {/* Action Buttons (Logged In vs Logged Out) */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/security"
                className="border border-[#0085d0] text-[#0085d0] hover:bg-slate-50 transition-all px-7 py-2.5 rounded text-xs font-black tracking-wider uppercase flex items-center justify-center shadow-xs"
              >
                2FA
              </Link>
              <Link
                href="/dashboard"
                className="bg-[#0085d0] hover:bg-[#0072ce] text-white transition-all px-6 py-2.5 rounded text-xs font-black tracking-wider uppercase shadow-sm"
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
                <svg className="w-4 h-4 text-[#0085d0] transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 4h3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-3" />
                  <path d="M4 12h10M10 8l4 4-4 4" />
                </svg>
              </Link>
              <Link
                href="/register"
                className="bg-[#0085d0] hover:bg-[#0072ce] text-white transition-all px-5 py-2.5 rounded text-xs font-black tracking-wider uppercase shadow-sm"
              >
                OPEN ACCOUNT
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
