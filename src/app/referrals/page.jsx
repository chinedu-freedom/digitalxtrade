'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import QRCode from 'qrcode';
import { toast } from 'react-toastify';
import {
  Users,
  UserCheck,
  Award,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  ExternalLink,
  Search,
  ChevronRight,
  Filter,
  X,
  RotateCcw,
  Calendar,
  Layers,
  Activity,
  Loader2
} from 'lucide-react';
import HeaderNav from '@/components/HeaderNav';
import SubNav from '@/components/SubNav';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export default function ReferralsPage() {
  const { user } = useAuth();
  const username = user?.username || user?.fullName || 'Spark';
  const [origin, setOrigin] = useState('https://digitalxtrade.com');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      setOrigin(window.location.origin);
    }
  }, []);

  const referralLink = `${origin}/register?reference=${username}`;

  const [isCopied, setIsCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [totalTeamMembers, setTotalTeamMembers] = useState(0);
  const [totalActiveReferrals, setTotalActiveReferrals] = useState(0);
  const [teamCommission, setTeamCommission] = useState(0.00);
  const [referralsList, setReferralsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchFilter, setSearchFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  // Generate QR Code for referral link
  useEffect(() => {
    QRCode.toDataURL(referralLink, {
      width: 180,
      margin: 1,
      color: {
        dark: '#0085d0',
        light: '#ffffff'
      }
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('Failed to generate QR code:', err));
  }, [referralLink]);

  // Fetch real live referrals data from backend API
  useEffect(() => {
    let isMounted = true;
    const fetchReferralData = async () => {
      try {
        setLoading(true);
        let res;
        try {
          res = await api.get('/user/referrals');
        } catch (e1) {
          try {
            res = await api.get('/referrals');
          } catch (e2) {
            res = await api.get('/reports/referrals');
          }
        }

        if (isMounted && res && res.data) {
          const raw = res.data;
          const list = raw.referrals || raw.items || raw.data || (Array.isArray(raw) ? raw : []);
          
          const formatDateTime = (val) => {
            if (!val) return 'Sep-25-2026 12:00:00 PM';
            const d = new Date(val);
            if (isNaN(d.getTime())) return String(val);
            const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
            const timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
            return `${dateStr} ${timeStr}`;
          };

          const formatted = (Array.isArray(list) ? list : []).map((item, idx) => {
            const rawDateVal = item.created_at || item.createdAt || item.registeredAt;
            return {
              id: item.id || item._id || `ref-${idx}`,
              username: item.username || item.full_name || item.name || 'User',
              level: item.level ? `Level ${item.level}` : (item.tier ? `Level ${item.tier}` : 'Level 1'),
              rawDate: rawDateVal,
              registeredAt: rawDateVal ? formatDateTime(rawDateVal) : 'Sep-25-2026 12:00:00 PM',
              status: (item.status || item.account_status || 'Active').charAt(0).toUpperCase() + (item.status || item.account_status || 'Active').slice(1).toLowerCase(),
              commission: parseFloat(item.commission || item.amount || 0)
            };
          });

          setReferralsList(formatted);
          setTotalTeamMembers(typeof raw.totalMembers === 'number' ? raw.totalMembers : formatted.length);
          
          const activeCount = typeof raw.totalActiveReferrals === 'number'
            ? raw.totalActiveReferrals
            : formatted.filter(r => r.status === 'Active' || r.isActive).length;
          setTotalActiveReferrals(activeCount);
          
          const sumCommission = typeof raw.teamCommission === 'number' 
            ? raw.teamCommission 
            : formatted.reduce((acc, curr) => acc + (curr.commission || 0), 0);
          setTeamCommission(sumCommission);
        }
      } catch (err) {
        console.error('Failed to fetch referrals data:', err);
        if (isMounted) {
          setReferralsList([]);
          setTotalTeamMembers(0);
          setTeamCommission(0);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchReferralData();
    return () => { isMounted = false; };
  }, []);

  // Copy referral link handler
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setIsCopied(true);
    toast.success('Referral link copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Reset all active filters
  const handleResetFilters = () => {
    setSearchFilter('');
    setLevelFilter('All');
    setStatusFilter('All');
    setDateFilter('All');
  };

  const hasActiveFilters = searchFilter.trim() !== '' || levelFilter !== 'All' || statusFilter !== 'All' || dateFilter !== 'All';

  // Apply Search, Level, Status, and Date Filters
  const filteredReferrals = referralsList.filter((item) => {
    // 1. Search Username Filter
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      const u = (item.username || '').toLowerCase();
      if (!u.includes(q)) return false;
    }

    // 2. Level Filter
    if (levelFilter !== 'All') {
      if (item.level !== levelFilter) return false;
    }

    // 3. Status Filter
    if (statusFilter !== 'All') {
      if (item.status !== statusFilter) return false;
    }

    // 4. Date Range Filter
    if (dateFilter !== 'All' && item.registeredAt && item.registeredAt !== 'N/A') {
      const regDate = new Date(item.registeredAt);
      const now = new Date();
      if (!isNaN(regDate.getTime())) {
        if (dateFilter === 'Today') {
          if (regDate.toDateString() !== now.toDateString()) return false;
        }
        if (dateFilter === 'Last 7 Days') {
          const days7 = new Date(now);
          days7.setDate(days7.getDate() - 7);
          if (regDate < days7) return false;
        }
        if (dateFilter === 'Last 30 Days') {
          const days30 = new Date(now);
          days30.setDate(days30.getDate() - 30);
          if (regDate < days30) return false;
        }
      }
    }

    return true;
  });

  if (loading) {
    return <PageLoader />;
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <HeaderNav />
      <SubNav activeTab="REFERRALS" />

      {/* MAIN CONTAINER */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-6">

        {/* PAGE TITLE */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#00529b] tracking-tight">
            Referral Program
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Invite your team members to DigitalXTrade and earn instant affiliate commissions.
          </p>
        </div>

        {/* TOP CARD: REFERRAL LINK BOX */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Referral Link
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-semibold font-mono text-slate-900 truncate">
              {referralLink}
            </div>
            <button
              type="button"
              onClick={handleCopyLink}
              className="bg-[#0085d0] hover:bg-[#0072ce] text-white px-5 py-2.5 rounded-lg font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0"
              title="Copy link"
            >
              {isCopied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
              <span>{isCopied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>
        </div>

        {/* SUMMARY METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Card 1: Total Referrals */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0085d0]/10 border border-[#0085d0]/20 text-[#0085d0] flex items-center justify-center font-bold shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {totalTeamMembers}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                Total referrals
              </div>
            </div>
          </div>

          {/* Card 2: Total Active Referrals */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-bold shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {totalActiveReferrals}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                Total active referrals
              </div>
            </div>
          </div>

          {/* Card 3: Total Affiliates Commission */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-bold shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                ${teamCommission.toFixed(2)}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                Total affiliates commission
              </div>
            </div>
          </div>

        </div>

        {/* QR CODE CARD */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-center space-y-3 text-center">
          <div className="flex items-center gap-2 text-[#0085d0] font-bold text-base sm:text-lg">
            <QrCode className="w-5 h-5 text-[#0085d0]" />
            <span>Scan QR Code</span>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt="DigitalXTrade Referral QR Code"
                className="w-40 h-40 object-contain rounded-lg"
              />
            ) : (
              <div className="w-40 h-40 bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-xs text-slate-400">
                Generating QR...
              </div>
            )}
          </div>

          <p className="text-xs text-slate-500 font-medium">
            Scan to directly open registration with your referral code.
          </p>
        </div>

        {/* REFERRALS TABLE & FILTER HEADER */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-5">

          {/* Filter Header & Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Users className="w-5 h-5 text-[#0085d0]" />
              <span>Referred Team Members</span>
            </h2>

            {/* Filter Controls: Search Username & All Levels Dropdown */}
                        {/* Search Username Input Box (Extended Width, Level Dropdown Removed) */}
            <div className="relative w-full sm:w-80 md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search by username..."
                className="w-full h-10 bg-slate-50 border border-slate-300 focus:border-[#0085d0] focus:ring-2 focus:ring-[#0085d0]/20 rounded-lg pl-9 pr-8 text-sm text-slate-900 font-medium transition-all outline-none shadow-2xs"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/70 text-slate-600 font-bold border-b border-slate-100 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Username</th>
                  <th className="py-3 px-4">Tier Level</th>
                  <th className="py-3 px-4">Registration Date</th>
                  <th className="py-3 px-4 text-right">Account Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-500 font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <span>Loading referred team members...</span>
                        <Loader2 className="w-5 h-5 animate-spin text-[#0085d0]" />
                      </div>
                    </td>
                  </tr>
                ) : filteredReferrals.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-14 px-4 text-center">
                      <div className="max-w-md mx-auto flex flex-col items-center justify-center space-y-3">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-[#0085d0] flex items-center justify-center shadow-xs">
                          <Users className="w-7 h-7" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-slate-800">No Referred Team Members Found</h3>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredReferrals.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Username Column */}
                      <td className="py-3.5 px-4 font-extrabold text-slate-900 text-sm sm:text-base">
                        {item.username}
                      </td>

                      {/* Level Badge Column */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#0085d0]/10 text-[#0085d0] border border-[#0085d0]/20 text-xs font-bold tracking-wide">
                          {item.level || 'Level 1'}
                        </span>
                      </td>

                      {/* Timestamp Column */}
                      <td className="py-3.5 px-4 font-semibold text-slate-600 text-xs sm:text-sm font-mono whitespace-nowrap">
                        {item.registeredAt}
                      </td>

                      {/* Status Badge Column */}
                      <td className="py-3.5 px-4 text-right">
                        <span className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide ${
                          (item.status || 'Active').toLowerCase() === 'active'
                            ? 'bg-emerald-50 text-[#00a651] border border-emerald-300'
                            : 'bg-amber-50 text-amber-600 border border-amber-300'
                        }`}>
                          {item.status || 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </section>

      <FloatingWidgets />
      <Footer />
    </main>
  );
}
