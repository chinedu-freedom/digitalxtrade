'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function SubNav({ activeTab = 'ACCOUNT', adminNote }) {
  const { user, logout } = useAuth();

  const noteText = (adminNote !== undefined && adminNote !== null && adminNote !== '')
    ? adminNote
    : (user?.adminNote || user?.admin_note || '');

  const navItems = [
    { label: 'ACCOUNT', path: '/dashboard' },
    { label: 'MAKE DEPOSIT', path: '/deposit' },
    { label: 'WITHDRAW FUNDS', path: '/withdraw' },
    { label: 'DEPOSITS LIST', path: '/deposit-list' },
    { label: 'TRANSACTIONS', path: '/transactions' },
    { label: 'REFERRALS', path: '/referrals' },
    { label: 'SETTINGS', path: '/settings' },
    { label: 'LOGOUT', action: logout },
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-2xs sticky top-16 sm:top-20 z-40">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-8 lg:px-12 flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar py-2.5 sm:py-3 touch-pan-x">
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 shrink-0 min-w-max px-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.label;

            if (item.action) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.action}
                  className="text-[11px] sm:text-xs md:text-sm font-black tracking-wider uppercase whitespace-nowrap transition-colors cursor-pointer text-slate-700 hover:text-red-600 py-1"
                >
                  {item.label}
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.path}
                className={`text-[11px] sm:text-xs md:text-sm font-black tracking-wider uppercase whitespace-nowrap transition-colors cursor-pointer py-1 ${
                  isActive
                    ? 'text-[#0085d0] border-b-2 border-[#0085d0] pb-1'
                    : 'text-slate-700 hover:text-[#0085d0]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Moving Ticker Announcement Banner (Right to Left) */}
      {noteText && (
        <div className="w-full bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 text-white border-t border-amber-500/40 px-3 sm:px-6 py-2 overflow-hidden shadow-sm">
          <div className="overflow-hidden whitespace-nowrap w-full relative flex items-center cursor-default">
            <marquee
              behavior="scroll"
              direction="left"
              scrollamount="6"
              onMouseEnter={(e) => e.target?.stop?.()}
              onMouseLeave={(e) => e.target?.start?.()}
              className="text-white font-extrabold text-xs sm:text-sm tracking-wide drop-shadow-xs"
            >
              {noteText}
            </marquee>
          </div>
        </div>
      )}
    </div>
  );
}
