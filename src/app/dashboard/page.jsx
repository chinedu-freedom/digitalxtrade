'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import HeaderNav from '../../components/HeaderNav';
import SubNav from '../../components/SubNav';
import Footer from '../../components/Footer';
import PageLoader from '../../components/PageLoader';
import PersonalInformationSettings from '../../components/PersonalInformationSettings';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams ? searchParams.get('tab') : null;
  const { user, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(tabParam || 'ACCOUNT');
  const [lastAccessTime, setLastAccessTime] = useState('');

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam.toUpperCase());
    }
  }, [tabParam]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) +
      ' ' +
      now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    setLastAccessTime(formatted);
  }, []);

  if (loading || !user) {
    return <PageLoader />;
  }

  const username = user?.username || user?.fullName || 'Spark';
  const referralLink = `https://digitalxtrade.vip/?ref=${username}`;

  // Formatted registration date
  const regDateFormatted = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    : 'Sep-24-2026';

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f9] text-slate-800 font-sans">
      {/* Primary Header Navigation Bar */}
      <HeaderNav />

      {/* Secondary Dashboard Sub-Navigation Bar */}
      <SubNav activeTab={activeTab} />

      {/* Main Dashboard Workspace Content */}
      <main className="flex-1 max-w-[1300px] w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {activeTab === 'SETTINGS' ? (
          <PersonalInformationSettings />
        ) : (
          <>
            {/* Welcome & Balance Hero Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-10 relative overflow-hidden">
              <div className="max-w-xl space-y-5">
                <h2 className="text-slate-600 text-base font-normal">
                  Welcome, <span className="font-semibold text-slate-900">{username}</span>
                </h2>
                
                <div className="text-4xl sm:text-5xl font-extrabold text-[#0085d0] tracking-tight">
                  Balance <span className="text-[#0085d0] font-black">${user.balance || 0}</span>
                </div>

                <div className="space-y-1.5 text-xs sm:text-sm text-slate-600 pt-2 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-[#0085d0] font-bold">&gt;</span>
                    <span>Registration date: <strong className="text-slate-900 font-bold">{regDateFormatted}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#0085d0] font-bold">&gt;</span>
                    <span>Last Access: <strong className="text-slate-900 font-bold">{lastAccessTime || 'Sep-24-2026 12:47:44 PM'}</strong></span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href="/deposit"
                    className="border-2 border-[#0085d0] text-[#0085d0] hover:bg-[#0085d0] hover:text-white transition-all px-8 py-3 rounded text-xs font-black tracking-wider uppercase shadow-xs cursor-pointer"
                  >
                    MAKE DEPOSIT
                  </Link>
                  <Link
                    href="/withdraw"
                    className="border-2 border-[#0085d0] text-[#0085d0] hover:bg-[#0085d0] hover:text-white transition-all px-8 py-3 rounded text-xs font-black tracking-wider uppercase shadow-xs cursor-pointer"
                  >
                    WITHDRAW FUNDS
                  </Link>
                </div>
              </div>
            </div>

            {/* Referral Link Box */}
            <div className="bg-[#eaf4fb] border border-[#b3d7f0] rounded-md p-5 sm:p-6 space-y-2">
              <h3 className="text-sm font-bold text-slate-800">
                Referral link
              </h3>
              <div className="text-xs sm:text-sm text-slate-700 font-medium break-all select-all">
                {referralLink}
              </div>
            </div>

            {/* Statistics Two-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Deposit Statistics Card */}
              <div className="bg-white rounded-md border border-gray-200 shadow-2xs overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Deposit statistics
                </div>
                <div className="divide-y divide-gray-100 text-xs sm:text-sm">
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-slate-600 font-medium">Earned Total</span>
                    <span className="text-slate-900 font-black text-base">$0.00</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-slate-600 font-medium">Total Deposit</span>
                    <span className="text-slate-900 font-black text-base">$0.00</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-slate-600 font-medium">Last Deposit</span>
                    <span className="text-slate-900 font-black text-base">$</span>
                  </div>
                </div>
              </div>

              {/* Withdrawal Statistics Card */}
              <div className="bg-white rounded-md border border-gray-200 shadow-2xs overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Withdrawal statistics
                </div>
                <div className="divide-y divide-gray-100 text-xs sm:text-sm">
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-slate-600 font-medium">Pending Withdrawal</span>
                    <span className="text-slate-900 font-black text-base">$0.00</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-slate-600 font-medium">Withdrew Total</span>
                    <span className="text-slate-900 font-black text-base">$0.00</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-slate-600 font-medium">Last Withdrawal</span>
                    <span className="text-slate-900 font-black text-base">$</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Financial Statistics Section */}
            <div className="pt-4">
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Financial statistics
              </h3>
              <div className="bg-white rounded-md border border-gray-200 p-8 text-center text-slate-500 text-xs sm:text-sm font-medium">
                No financial transactions recorded yet.
              </div>
            </div>
          </>
        )}
      </main>

      {/* Main Site Footer */}
      <Footer />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardContent />
    </Suspense>
  );
}
