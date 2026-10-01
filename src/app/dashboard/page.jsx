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
import { 
  Receipt, 
  ArrowUpRight, 
  ArrowDownRight, 
  Scale, 
  Copy, 
  Check, 
  Loader2, 
  ShieldCheck, 
  Wallet,
  Clock,
  Megaphone
} from 'lucide-react';
import { toast } from 'react-toastify';
import api from '@/lib/api';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams ? searchParams.get('tab') : null;
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState(tabParam || 'ACCOUNT');
  const [lastAccessTime, setLastAccessTime] = useState('');
  const [origin, setOrigin] = useState('https://digitalxtrade.com');
  const [isCopied, setIsCopied] = useState(false);

  // Dynamic Dashboard Stats State
  const [statsLoading, setStatsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    earnedTotal: 0.00,
    totalDeposit: 0.00,
    lastDeposit: 0.00,
    pendingWithdrawal: 0.00,
    withdrewTotal: 0.00,
    lastWithdrawal: 0.00,
    transactions: [],
    adminNote: '',
  });

  // Detect current hostname / origin dynamically
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      setOrigin(window.location.origin);
    }
  }, []);

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

  // Fetch dynamic stats from backend
  useEffect(() => {
    if (!user) return;
    
    api.get(`/user/dashboard?userId=${user.id || ''}`)
      .then((res) => {
        const resData = res.data;
        if (resData && resData.success && resData.data) {
          setDashboardData({
            earnedTotal: resData.data.earnedTotal || 0.00,
            totalDeposit: resData.data.totalDeposit || 0.00,
            lastDeposit: resData.data.lastDeposit || 0.00,
            pendingWithdrawal: resData.data.pendingWithdrawal || 0.00,
            withdrewTotal: resData.data.withdrewTotal || 0.00,
            lastWithdrawal: resData.data.lastWithdrawal || 0.00,
            transactions: resData.data.transactions || [],
            adminNote: resData.data.adminNote || resData.data.admin_note || resData.user?.adminNote || resData.user?.admin_note || '',
          });
        }
      })
      .catch((err) => {
        console.error('Failed fetching dashboard stats:', err);
      })
      .finally(() => {
        setStatsLoading(false);
      });
  }, [user]);

  if (loading || !user || statsLoading) {
    return <PageLoader />;
  }

  const username = user?.username || user?.fullName || 'Spark';
  const referralLink = `${origin}/register?reference=${username}`;

  // Formatted registration date
  const regDateFormatted = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) +
      ' ' +
      new Date(user.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
    : 'Sep-24-2026 12:47:44 PM';

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setIsCopied(true);
    toast.success('Referral link copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f9] text-slate-800 font-sans">
      {/* Primary Header Navigation Bar */}
      <HeaderNav />

      {/* Secondary Dashboard Sub-Navigation Bar with Moving Notice Ticker */}
      <SubNav activeTab={activeTab} adminNote={dashboardData.adminNote} />

      {/* Main Dashboard Workspace Content */}
      <main className="flex-1 max-w-[1300px] w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {activeTab === 'SETTINGS' ? (
          <PersonalInformationSettings />
        ) : (
          <>
            {/* Welcome & Balance Hero Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="max-w-xl space-y-5">
                <h2 className="text-slate-600 text-base font-normal">
                  Welcome, <span className="font-semibold text-slate-900">{username}</span>
                </h2>

                <div className="text-3xl sm:text-4xl font-extrabold text-[#0085d0] tracking-tight">
                  Total Balance <span className="text-[#0085d0] font-black">${parseFloat(user.balance || 0).toFixed(2)}</span>
                </div>

                {/* Separate Deposit & Profit Balance Units */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-lg">
                  <div className="bg-blue-50/80 border border-blue-100 rounded-lg p-3.5 flex items-center justify-between shadow-2xs">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Deposit Balance</div>
                      <div className="text-xl font-extrabold text-slate-900">${parseFloat(user.depositBalance || user.deposit_balance || 0).toFixed(2)}</div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md">Capital</span>
                  </div>

                  <div className="bg-emerald-50/80 border border-emerald-100 rounded-lg p-3.5 flex items-center justify-between shadow-2xs">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Profit Balance</div>
                      <div className="text-xl font-extrabold text-emerald-600">${parseFloat(user.profitBalance || user.profit_balance || 0).toFixed(2)}</div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-md">Earnings</span>
                  </div>
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
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <Link
                    href="/deposit"
                    className="bg-white border border-[#0085d0] text-[#0085d0] hover:bg-[#f0f8fd] hover:text-[#0085d0] transition-colors duration-150 px-6 sm:px-8 py-2.5 rounded-md text-xs sm:text-sm font-black tracking-wider uppercase shadow-2xs cursor-pointer outline-none focus:outline-none focus:ring-0 select-none inline-flex items-center justify-center w-full sm:w-auto"
                  >
                    MAKE DEPOSIT
                  </Link>
                  <Link
                    href="/withdraw"
                    className="bg-white border border-[#0085d0] text-[#0085d0] hover:bg-[#f0f8fd] hover:text-[#0085d0] transition-colors duration-150 px-8 py-2.5 rounded-md text-xs sm:text-sm font-black tracking-wider uppercase shadow-2xs cursor-pointer outline-none focus:outline-none focus:ring-0 select-none inline-flex items-center justify-center"
                  >
                    WITHDRAW FUNDS
                  </Link>
                </div>
              </div>
            </div>

            {/* Referral Link Box */}
            <div className="bg-[#eaf4fb] border border-[#b3d7f0] rounded-md p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 min-w-0 flex-1">
                <h3 className="text-sm font-bold text-slate-800">
                  Referral link
                </h3>
                <div className="text-xs sm:text-sm text-slate-700 font-medium font-mono break-all select-all">
                  {referralLink}
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyReferral}
                className="text-xs font-bold text-[#0085d0] hover:text-[#0072ce] flex items-center gap-1.5 cursor-pointer shrink-0 bg-white/80 hover:bg-white border border-[#b3d7f0] px-3.5 py-2 rounded-md shadow-2xs transition-all w-full sm:w-auto justify-center"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'COPIED' : 'COPY'}</span>
              </button>
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
                    <span className="text-slate-900 font-black text-base">${dashboardData.earnedTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-slate-600 font-medium">Total Deposit</span>
                    <span className="text-slate-900 font-black text-base">${dashboardData.totalDeposit.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-slate-600 font-medium">Last Deposit</span>
                    <span className="text-slate-900 font-black text-base">${dashboardData.lastDeposit > 0 ? dashboardData.lastDeposit.toFixed(2) : '0.00'}</span>
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
                    <span className="text-slate-900 font-black text-base">${dashboardData.pendingWithdrawal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-slate-600 font-medium">Withdrew Total</span>
                    <span className="text-slate-900 font-black text-base">${dashboardData.withdrewTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <span className="text-slate-600 font-medium">Last Withdrawal</span>
                    <span className="text-slate-900 font-black text-base">${dashboardData.lastWithdrawal > 0 ? dashboardData.lastWithdrawal.toFixed(2) : '0.00'}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Financial Statistics Section */}
            <div className="pt-4 space-y-4">
              <h3 className="text-xl font-bold text-slate-800">
                Financial statistics
              </h3>

              <div className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-2xs">
                {statsLoading ? (
                  <div className="p-8 text-center text-slate-500 font-semibold flex items-center justify-center gap-2 text-xs sm:text-sm">
                    <span>Loading financial statistics</span>
                    <Loader2 className="w-5 h-5 animate-spin text-[#0085d0]" />
                  </div>
                ) : dashboardData.transactions.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="max-w-md mx-auto flex flex-col items-center justify-center space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-[#0085d0] flex items-center justify-center shadow-xs">
                        <Receipt className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-slate-800">No Financial Transactions Recorded Yet</h3>
                        {/* <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                          Your account history will automatically track all yields, deposits, and withdrawal activities here once created.
                        </p> */}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-[#0085d0] text-white">
                          <th className="py-3 px-4 font-semibold w-5/12 border-r border-[#0072ce]/40">
                            Transaction Details
                          </th>
                          <th className="py-3 px-4 font-semibold w-2/12 border-r border-[#0072ce]/40 text-right">
                            Amount
                          </th>
                          <th className="py-3 px-4 font-semibold w-2/12 border-r border-[#0072ce]/40 text-center">
                            Status
                          </th>
                          <th className="py-3 px-4 font-semibold w-3/12 text-right">
                            Date & Time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {dashboardData.transactions.map((trx) => {
                          const rawType = (trx.type || '').toUpperCase();
                          const isPositive = !['WITHDRAWAL', 'ADMIN_DEBIT', 'STAKE', 'DEBIT'].includes(rawType);
                          const formattedAmount = `${isPositive ? '+' : '-'}$${parseFloat(trx.amount || 0).toFixed(2)}`;
                          const dateObj = new Date(trx.created_at || Date.now());
                          const dateStr = !isNaN(dateObj.getTime()) ? dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Sep-25-2026';
                          const timeStr = !isNaN(dateObj.getTime()) ? dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }) : '12:00:00 PM';

                          const rawStatus = (trx.status || 'COMPLETED').toUpperCase();
                          const isCompleted = ['COMPLETED', 'APPROVED', 'SUCCESSFUL', 'SUCCESS'].includes(rawStatus);
                          const isPending = ['PENDING', 'PROCESSING', 'INITIATED'].includes(rawStatus);

                          let statusText = 'Completed';
                          let statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';

                          if (rawType === 'ADMIN_CREDIT') {
                            statusText = 'Deposit credited';
                            statusColor = 'bg-blue-50 text-blue-700 border-blue-200';
                          } else if (rawType === 'ADMIN_DEBIT') {
                            statusText = 'Deposit debited';
                            statusColor = 'bg-rose-50 text-rose-700 border-rose-200';
                          } else if (rawType === 'DEPOSIT') {
                            if (isCompleted) {
                              statusText = 'Deposit successful';
                              statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                            } else if (isPending) {
                              statusText = 'Pending';
                              statusColor = 'bg-amber-50 text-amber-700 border-amber-200';
                            } else {
                              statusText = 'Rejected';
                              statusColor = 'bg-rose-50 text-rose-700 border-rose-200';
                            }
                          } else if (rawType === 'WITHDRAWAL' || rawType === 'WITHDRAW') {
                            if (isCompleted) {
                              statusText = 'Withdrawal successful';
                              statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                            } else if (isPending) {
                              statusText = 'Pending';
                              statusColor = 'bg-amber-50 text-amber-700 border-amber-200';
                            } else {
                              statusText = 'Rejected';
                              statusColor = 'bg-rose-50 text-rose-700 border-rose-200';
                            }
                          } else {
                            if (isCompleted) {
                              statusText = 'Completed';
                              statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                            } else if (isPending) {
                              statusText = 'Pending';
                              statusColor = 'bg-amber-50 text-amber-700 border-amber-200';
                            } else {
                              statusText = 'Rejected';
                              statusColor = 'bg-rose-50 text-rose-700 border-rose-200';
                            }
                          }

                          let prefixLabel = isPositive ? 'Deposit' : 'Withdrawal';
                          if (rawType === 'ADMIN_CREDIT') prefixLabel = 'Admin Credit';
                          else if (rawType === 'ADMIN_DEBIT') prefixLabel = 'Admin Debit';

                          return (
                            <tr key={trx.id} className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-3.5 px-4 space-y-1 align-top border-r border-slate-200">
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider ${
                                    isPositive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                  }`}>
                                    {prefixLabel}
                                  </span>
                                  <span className="font-mono text-xs text-slate-500">
                                    ID: {trx.id}
                                  </span>
                                </div>
                                <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                                  {trx.description}
                                </p>
                              </td>
                              <td className="py-3.5 px-4 align-top text-right border-r border-slate-200">
                                <span className={`font-black text-sm sm:text-base ${isPositive ? 'text-[#00a651]' : 'text-[#e11d48]'}`}>
                                  {formattedAmount}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 align-top text-center border-r border-slate-200 whitespace-nowrap">
                                <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider ${statusColor}`}>
                                  {statusText}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                                <div className="font-bold text-slate-900 text-xs">{dateStr}</div>
                                <div className="text-slate-500 text-[11px] font-mono mt-0.5">{timeStr}</div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
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
