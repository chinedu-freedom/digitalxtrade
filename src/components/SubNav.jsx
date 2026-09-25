'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function SubNav({ activeTab = 'ACCOUNT' }) {
  const { logout } = useAuth();

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
    <div className="w-full bg-white border-b border-gray-200 shadow-2xs sticky top-20 z-40">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-center overflow-x-auto no-scrollbar py-3">
        <div className="flex items-center justify-center gap-6 sm:gap-8 shrink-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.label;

            if (item.action) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.action}
                  className="text-xs sm:text-sm font-black tracking-wider uppercase whitespace-nowrap transition-colors cursor-pointer text-slate-700 hover:text-red-600"
                >
                  {item.label}
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.path}
                className={`text-xs sm:text-sm font-black tracking-wider uppercase whitespace-nowrap transition-colors cursor-pointer ${
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
    </div>
  );
}
