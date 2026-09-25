'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import QRCode from 'qrcode';
import { toast } from 'sonner';
import { 
  Users, 
  Award, 
  Copy, 
  Check, 
  QrCode, 
  ShieldCheck, 
  ExternalLink,
  Search,
  ChevronRight
} from 'lucide-react';
import HeaderNav from '@/components/HeaderNav';
import SubNav from '@/components/SubNav';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

export default function ReferralsPage() {
  const { user } = useAuth();
  const username = user?.username || user?.fullName || 'Spark';
  const referralLink = `https://digitalxtrade.vip/register?reference=${username}`;

  const [isCopied, setIsCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [totalTeamMembers, setTotalTeamMembers] = useState(2);
  const [teamCommission, setTeamCommission] = useState(204.00);
  const [referralsList, setReferralsList] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');

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

  // Fetch referrals data from backend
  useEffect(() => {
    fetch('http://localhost:3001/api/referrals')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success) {
          if (typeof data.totalMembers === 'number') setTotalTeamMembers(data.totalMembers);
          if (typeof data.teamCommission === 'number') setTeamCommission(data.teamCommission);
          if (Array.isArray(data.referrals)) setReferralsList(data.referrals);
        }
      })
      .catch(() => {
        // Default static state matching screenshot
        setReferralsList([
          {
            id: 'ref-1',
            username: 'Mashezyy',
            level: 'Level 1',
            registeredAt: '9/9/2026, 3:53:52 PM',
            status: 'Active'
          },
          {
            id: 'ref-2',
            username: 'everstakesupport',
            level: 'Level 1',
            registeredAt: '9/8/2026, 1:14:43 PM',
            status: 'Active'
          }
        ]);
      });
  }, []);

  // Copy referral link handler
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setIsCopied(true);
    toast.success('Referral link copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Filtered referrals list
  const filteredReferrals = referralsList.filter((ref) => {
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      if (!ref.username.toLowerCase().includes(q)) return false;
    }
    if (levelFilter !== 'All' && ref.level !== levelFilter) return false;
    return true;
  });

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

        {/* TOP CARD: REFERRAL LINK BOX (MATCHING SCREENSHOT 2) */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Referral Link
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-100/90 border border-slate-300 rounded px-4 py-2.5 text-xs sm:text-sm font-semibold font-mono text-slate-900 truncate">
              {referralLink}
            </div>
            <button
              type="button"
              onClick={handleCopyLink}
              className="bg-[#0085d0] hover:bg-[#0072ce] text-white px-4 py-2.5 rounded font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
              title="Copy link"
            >
              {isCopied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
              <span>{isCopied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>
        </div>

        {/* SUMMARY METRICS GRID (MATCHING SCREENSHOT 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Total Team Members Metric */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0085d0]/10 border border-[#0085d0]/20 text-[#0085d0] flex items-center justify-center font-bold shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 tracking-tight">
                {totalTeamMembers}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                Total Team Members
              </div>
            </div>
          </div>

          {/* Team Commission Metric */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0085d0]/10 border border-[#0085d0]/20 text-[#0085d0] flex items-center justify-center font-bold shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 tracking-tight">
                ${teamCommission.toFixed(2)}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                Team Commission
              </div>
            </div>
          </div>

        </div>

        {/* QR CODE CARD (MATCHING SCREENSHOT 3) */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-2xs flex flex-col items-center justify-center space-y-3 text-center">
          <div className="flex items-center gap-2 text-[#0085d0] font-bold text-base sm:text-lg">
            <QrCode className="w-5 h-5 text-[#0085d0]" />
            <span>Scan QR Code</span>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs">
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt="DigitalXTrade Referral QR Code"
                className="w-40 h-40 object-contain rounded"
              />
            ) : (
              <div className="w-40 h-40 bg-slate-100 animate-pulse rounded flex items-center justify-center text-xs text-slate-400">
                Generating QR...
              </div>
            )}
          </div>

          <p className="text-xs text-slate-500 font-medium">
            Scan to directly open registration with your referral code.
          </p>
        </div>

        {/* REFERRALS TABLE CONTAINER (MATCHING SCREENSHOT 1 EXACTLY) */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Referred Team Members
            </h2>

            {/* Filter / Search Controls */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search username..."
                  className="bg-slate-50 border border-slate-300 rounded pl-8 pr-2.5 py-1 text-xs text-slate-900 focus:outline-none focus:border-[#0085d0]"
                />
              </div>

              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0085d0] cursor-pointer"
              >
                <option value="All">All Levels</option>
                <option value="Level 1">Level 1</option>
                <option value="Level 2">Level 2</option>
                <option value="Level 3">Level 3</option>
              </select>
            </div>
          </div>

          {/* TABLE (MATCHING SCREENSHOT 1) */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <tbody className="divide-y divide-slate-100">
                {filteredReferrals.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-slate-400 font-semibold">
                      No referred team members found.
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
                        <span className="inline-flex items-center px-3 py-1 rounded bg-[#0085d0]/10 text-[#0085d0] border border-[#0085d0]/20 text-xs font-bold tracking-wide">
                          {item.level || 'Level 1'}
                        </span>
                      </td>

                      {/* Timestamp Column */}
                      <td className="py-3.5 px-4 font-semibold text-slate-600 text-xs sm:text-sm font-mono whitespace-nowrap">
                        {item.registeredAt}
                      </td>

                      {/* Status Badge Column */}
                      <td className="py-3.5 px-4 text-right">
                        <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-emerald-50 text-[#00a651] border border-emerald-300 text-xs font-extrabold tracking-wide">
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
