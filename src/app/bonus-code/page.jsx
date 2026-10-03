'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import UserHeader from '../../components/UserHeader';

import FloatingWidgets from '../../components/FloatingWidgets';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { Ticket, Key, Gift, Info, Send, Wallet, History, ArrowRight, Loader2, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../lib/api';

export default function BonusCodePage() {
  const { user, refreshUser } = useAuth();
  const [giftCode, setGiftCode] = useState('');
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [claimedModalData, setClaimedModalData] = useState(null);

  const fetchClaims = async () => {
    try {
      setLoading(true);
      const res = await api.get('/user/gift-code-claims');
      if (res.data && res.data.success) {
        setClaims(res.data.claims || []);
      }
    } catch (err) {
      console.error('Failed to load user gift claims:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleClaim = async (e) => {
    e.preventDefault();
    if (!giftCode.trim()) {
      toast.error('Please enter a valid gift voucher code.');
      return;
    }

    try {
      setClaiming(true);
      const res = await api.post('/user/claim-gift-code', { code: giftCode.trim() });
      if (res.data && res.data.success) {
        const rewardAmt = res.data.amount || res.data.giftCode?.amount || 0;
        setClaimedModalData({ amount: rewardAmt, code: giftCode.trim() });
        setGiftCode('');
        fetchClaims();
        if (refreshUser) refreshUser();

        toast.success(res.data.message || `Congratulations! You received $${parseFloat(rewardAmt).toFixed(2)} bonus!`);

        // Auto close celebration modal after 4 seconds
        setTimeout(() => {
          setClaimedModalData(null);
        }, 4000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to claim bonus code.');
    } finally {
      setClaiming(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <UserHeader activeTab="BONUS CODE" />


      <div className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6 sm:space-y-8">
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-[#003e6b] to-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-10 text-center shadow-xl relative overflow-hidden space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0085d0]/30 border border-[#0085d0]/50 text-xs font-bold text-sky-200 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#0085d0]" />
            Bonus Reward Program
          </div>

          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0085d0] to-sky-400 flex items-center justify-center text-white text-3xl shadow-lg shadow-sky-500/25">
            🎁
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Redeem Gift & Bonus Codes
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Redeem your promo voucher & gift bonus codes to receive instant cash rewards credited directly to your account balance!
          </p>
        </div>

        {/* Claim Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0085d0]">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Enter Gift Voucher Code
              </h2>
              <p className="text-xs text-slate-500">
                Type or paste your alphanumeric bonus code below
              </p>
            </div>
          </div>

          <form onSubmit={handleClaim} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Key className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={giftCode}
                onChange={(e) => setGiftCode(e.target.value.toUpperCase())}
                placeholder="Enter code e.g. DXTBONUS50..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-10 pr-4 text-xs sm:text-sm font-mono font-bold text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#0085d0] focus:ring-1 focus:ring-[#0085d0] transition-all shadow-inner"
                disabled={claiming}
              />
            </div>

            <button
              type="submit"
              disabled={claiming || !giftCode.trim()}
              className="w-full bg-[#0085d0] hover:bg-[#0072ce] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {claiming ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying Code...
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4" /> Claim Reward
                </>
              )}
            </button>
          </form>
        </div>

        {/* How It Works Steps Grid */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 px-1">
            <Info className="w-4 h-4 text-[#0085d0]" />
            <h3 className="font-bold text-slate-900 text-sm">How It Works</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl flex flex-col items-center text-center shadow-xs">
              <div className="w-11 h-11 bg-sky-50 border border-sky-100 rounded-xl flex items-center justify-center text-[#0085d0] mb-2.5">
                <Send className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">1. Get Gift Code</p>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-relaxed">
                Receive codes from official Telegram announcements, promos, and VIP events.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl flex flex-col items-center text-center shadow-xs">
              <div className="w-11 h-11 bg-sky-50 border border-sky-100 rounded-xl flex items-center justify-center text-[#0085d0] mb-2.5">
                <Ticket className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">2. Enter Unique Code</p>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-relaxed">
                Type or paste your code into the redemption input field above.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl flex flex-col items-center text-center shadow-xs">
              <div className="w-11 h-11 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-2.5">
                <Wallet className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">3. Instant Reward</p>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-relaxed">
                Bonus cash is credited directly to your available balance immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Claimed History Table */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center space-x-2">
              <History className="w-4 h-4 text-[#0085d0]" />
              <h3 className="font-bold text-slate-900 text-sm">Your Claimed Rewards</h3>
            </div>
            <Link
              href="/dashboard"
              className="text-xs text-[#0085d0] hover:underline flex items-center gap-1 font-semibold"
            >
              Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            {loading ? (
              <div className="py-12 flex items-center justify-center text-slate-400 text-xs font-semibold gap-2">
                <span>Loading redemptions</span>
                <Loader2 className="w-4 h-4 animate-spin text-[#0085d0]" />
              </div>
            ) : claims.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center p-6 space-y-2">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <Gift className="w-6 h-6" />
                </div>
                <p className="text-xs text-slate-500 font-semibold">No gift code redemptions yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {claims.map((claim) => (
                  <div key={claim.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <Gift className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-mono font-bold text-slate-900">{claim.code}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {new Date(claim.claimed_at || claim.createdAt).toLocaleString('en-US', { hour12: true })}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm sm:text-base font-black text-emerald-600">
                        +${parseFloat(claim.amount).toFixed(2)}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-3 h-3" /> CLAIMED
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Celebratory Gift Code Claim Success Modal */}
        {claimedModalData && (
          <div
            onClick={() => setClaimedModalData(null)}
            className="fixed inset-0 z-50 w-full h-full min-h-screen bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer animate-in fade-in duration-200 overflow-y-auto"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-center font-sans space-y-5 animate-in zoom-in-95 duration-200 cursor-default"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setClaimedModalData(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Glowing Icon Circle */}
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-[#0085d0] to-sky-400 flex items-center justify-center shadow-[0_0_35px_rgba(0,133,208,0.35)] text-3xl transform hover:scale-105 transition-transform">
                🎁
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  🎉 Bonus Code Claimed!
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Congratulations! Your bonus has been claimed and added to your balance.
                </p>
              </div>

              {/* Bonus Credit Added Container */}
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 sm:p-5 text-center space-y-1 shadow-inner">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-widest block font-sans">
                  BONUS CREDIT ADDED
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#0085d0] tracking-tight">
                  + ${parseFloat(claimedModalData.amount || 0).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <FloatingWidgets />
      <Footer />
    </main>
  );
}
