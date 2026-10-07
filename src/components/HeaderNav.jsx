'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Shield, 
  User, 
  LogIn, 
  UserPlus, 
  LogOut, 
  ChevronRight,
  LayoutDashboard,
  PlusCircle,
  ArrowUpRight,
  Layers,
  Receipt,
  Users,
  Gift,
  Settings,
  Wallet
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function HeaderNav({ isNested = false }) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Prevent background scrolling when sidebar drawer is open & notify floating widgets
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-mobile-menu-open', 'true');
      window.dispatchEvent(new CustomEvent('mobile-menu-toggle', { detail: { open: true } }));
    } else {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-mobile-menu-open');
      window.dispatchEvent(new CustomEvent('mobile-menu-toggle', { detail: { open: false } }));
    }
    return () => {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-mobile-menu-open');
      window.dispatchEvent(new CustomEvent('mobile-menu-toggle', { detail: { open: false } }));
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

  const userAccountTabs = [
    { label: 'ACCOUNT', href: '/dashboard', icon: LayoutDashboard },
    { label: 'MAKE DEPOSIT', href: '/deposit', icon: PlusCircle },
    { label: 'WITHDRAW FUNDS', href: '/withdraw', icon: ArrowUpRight },
    { label: 'DEPOSITS LIST', href: '/deposit-list', icon: Layers },
    { label: 'TRANSACTIONS', href: '/transactions', icon: Receipt },
    { label: 'REFERRALS', href: '/referrals', icon: Users },
    { label: 'BONUS CODE', href: '/bonus-code', icon: Gift },
    { label: 'SETTINGS', href: '/security', icon: Settings },
  ];

  return (
    <>
      <header className={`${isNested ? 'w-full' : 'sticky top-0 z-40'} bg-white border-b border-gray-100 shadow-xs font-sans`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.jpeg"
              alt="DigitalXTrade Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 aspect-square object-cover rounded-md shadow-2xs group-hover:scale-105 transition-transform"
            />
            <span className="text-lg sm:text-xl font-black tracking-wider text-slate-900 font-sans">
              DIGITAL<span className="text-[#0085d0]">X</span>TRADE
            </span>
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

          {/* Header Right Action & Hamburger Menu */}
          <div className="flex items-center gap-3">
            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    href="/security"
                    className="border border-[#0085d0] text-[#0085d0] hover:bg-slate-50 transition-all px-4 py-2 rounded text-xs font-black tracking-wider uppercase flex items-center justify-center shadow-xs"
                  >
                    2FA
                  </Link>
                  <Link
                    href="/dashboard"
                    className="bg-[#0085d0] hover:bg-[#0072ce] text-white transition-all px-5 py-2 rounded text-xs font-black tracking-wider uppercase shadow-sm"
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

            {/* Mobile Quick Action Button (Shown on small screens next to hamburger) */}
            {user ? (
              <Link
                href="/dashboard"
                className="md:hidden bg-[#0085d0] hover:bg-[#0072ce] text-white px-3 py-1.5 rounded text-[11px] font-black tracking-wider uppercase shadow-xs transition-all whitespace-nowrap"
              >
                ACCOUNT
              </Link>
            ) : (
              <Link
                href="/register"
                className="md:hidden bg-[#0085d0] hover:bg-[#0072ce] text-white px-3 py-1.5 rounded text-[11px] font-black tracking-wider uppercase shadow-xs transition-all whitespace-nowrap"
              >
                OPEN ACCOUNT
              </Link>
            )}

            {/* Hamburger Toggle Button (Shown on Mobile Only) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-slate-800 hover:text-[#0085d0] hover:bg-slate-100 transition-all focus:outline-none cursor-pointer"
              aria-label="Open sidebar menu"
              title="Menu navigation"
            >
              <Menu className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

        </div>
      </header>

      {/* Slide-In Navigation Sidebar Drawer & Backdrop */}
      <div
        className={`fixed inset-0 z-[100] md:hidden transition-visibility duration-300 ${
          mobileMenuOpen ? 'visible' : 'invisible pointer-events-none'
        }`}
      >
        {/* Darkened Backdrop Overlay */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Slide-in Drawer Container */}
        <aside
          className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-[340px] bg-white shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out z-10 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.jpeg"
                alt="DigitalXTrade Logo"
                className="w-8 h-8 aspect-square object-cover rounded-md shadow-2xs"
              />
              <span className="text-base font-black tracking-wider text-slate-900">
                DIGITAL<span className="text-[#0085d0]">X</span>TRADE
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Drawer Content Area */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">

            {/* LOGGED-IN USER ACCOUNT SUBNAV SECTION */}
            {user ? (
              <div className="space-y-3">
                {/* User Info Card */}
                <div className="bg-gradient-to-br from-blue-50/80 to-slate-50 border border-blue-100 p-3.5 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0085d0] text-white flex items-center justify-center font-black text-sm uppercase shrink-0 shadow-sm">
                    {(user?.username || user?.fullName || 'U').charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-extrabold text-sm text-slate-900 truncate">
                      {user?.fullName || user?.username || 'Account User'}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 truncate">
                      {user?.email || 'Active Member'}
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-black uppercase tracking-widest text-[#0085d0] px-2 pt-1">
                  ACCOUNT NAVIGATION MENU
                </div>

                <div className="space-y-1">
                  {userAccountTabs.map((item) => {
                    const IconComp = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all ${
                          isActive
                            ? 'bg-[#0085d0] text-white shadow-sm'
                            : 'text-slate-800 hover:bg-blue-50/70 hover:text-[#0085d0]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#0085d0]'}`} />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white/80' : 'text-slate-400'}`} />
                      </Link>
                    );
                  })}

                  {/* LOGOUT BUTTON INSIDE SIDEBAR */}
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-extrabold tracking-wide uppercase text-rose-600 hover:bg-rose-50 transition-all cursor-pointer mt-2 border border-rose-100"
                  >
                    <div className="flex items-center gap-2.5">
                      <LogOut className="w-4 h-4 text-rose-600" />
                      <span>LOGOUT</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-rose-400" />
                  </button>
                </div>
              </div>
            ) : null}

            {/* MAIN NAVIGATION LINKS */}
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">
                MAIN NAVIGATION
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-slate-100 text-[#0085d0]'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-[#0085d0]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Drawer Footer Action Buttons */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/80 space-y-2">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/security"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 bg-white border border-slate-300 hover:border-[#0085d0] text-slate-800 hover:text-[#0085d0] py-2.5 px-3 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-2xs transition-all"
                >
                  <Shield className="w-3.5 h-3.5 text-[#0085d0]" />
                  <span>2FA SECURITY</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="bg-rose-50 text-rose-600 hover:bg-rose-100 py-2.5 px-4 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-rose-200"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>EXIT</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-[#0085d0] hover:bg-[#0072ce] text-white py-3 px-4 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>OPEN ACCOUNT</span>
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-white border border-[#0085d0] text-[#0085d0] hover:bg-blue-50/50 py-2.5 px-4 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-2xs transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>LOGIN</span>
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
