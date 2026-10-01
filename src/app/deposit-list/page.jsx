'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { 
  Plus, 
  ArrowUpRight, 
  ChevronRight, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Loader2
} from 'lucide-react';
import HeaderNav from '@/components/HeaderNav';
import SubNav from '@/components/SubNav';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import api from '@/lib/api';

export default function DepositListPage() {
  const [livePlans, setLivePlans] = useState([]);
  const [activeDeposits, setActiveDeposits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingDep, setCancellingDep] = useState(null);
  const [isSubmittingCancel, setIsSubmittingCancel] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchRealData = async () => {
      try {
        setIsLoading(true);
        const [plansRes, dashRes] = await Promise.all([
          api.get('/deposit/plans').catch(() => null),
          api.get('/user/dashboard').catch(() => null)
        ]);

        if (plansRes && plansRes.data) {
          const plansData = plansRes.data;
          if (isMounted && plansData.success && Array.isArray(plansData.plans)) {
            const formatted = plansData.plans.map(p => {
              const minStr = '$' + Number(p.minAmount).toFixed(2);
              const maxStr = p.maxAmount ? '$' + Number(p.maxAmount).toFixed(2) : '∞';
              return {
                id: p.id,
                title: p.name || p.title,
                name: p.name || p.title,
                planName: p.planLabel || p.planName || 'Plan',
                depositRange: p.depositRange || (minStr + ' - ' + maxStr),
                profitRate: p.profitRate ? p.profitRate.replace('%', '') : Number(p.dailyProfit || 0).toFixed(2),
                profitLabel: p.profitLabel || p.profitType || 'Daily Profit (%)',
                duration: p.duration || (p.durationHours ? p.durationHours + ' hours' : 'Daily'),
                minAmount: Number(p.minAmount),
                maxAmount: p.maxAmount ? Number(p.maxAmount) : null
              };
            });
            setLivePlans(formatted);
          }
        }

        if (dashRes && dashRes.data) {
          const dashData = dashRes.data;
          if (isMounted && dashData.success && dashData.user) {
            setActiveDeposits(dashData.user.deposits || []);
          }
        }
      } catch (err) {
        console.error('Failed to fetch real deposit data from database:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchRealData();
    return () => { isMounted = false; };
  }, []);

  const handleConfirmCancel = async () => {
    if (!cancellingDep) return;
    try {
      setIsSubmittingCancel(true);
      const res = await api.post('/user/deposits/' + cancellingDep.id + '/cancel');
      if (res.data && res.data.success) {
        toast.success(res.data.message || 'Investment cancelled! 50% principal returned to balance.');
        setCancellingDep(null);
        window.location.reload();
      } else {
        toast.error(res.data?.message || 'Failed to cancel investment.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel investment.');
    } finally {
      setIsSubmittingCancel(false);
    }
  };


  const formatDateTime = (dateVal) => {
    if (!dateVal) return '';
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    return dateStr + ' ' + timeStr;
  };

  // Dynamically group live database deposits under the real investment plans from PostgreSQL
  const dynamicPlans = livePlans.map(p => {
    const matchedDeps = activeDeposits.filter(d => {
      const st = String(d.status || '').toUpperCase();
      const isApprovedOrActive = st === 'APPROVED' || st === 'ACTIVE' || st === 'COMPLETED' || st === 'SUCCESS';
      if (!isApprovedOrActive) return false;

      return (
        d.planId === p.id || 
        (d.planName && (
          d.planName.toLowerCase().includes(p.name.toLowerCase()) || 
          p.name.toLowerCase().includes(d.planName.toLowerCase()) ||
          (p.planName && d.planName.toLowerCase().includes(p.planName.toLowerCase()))
        ))
      );
    });
    return {
      ...p,
      deposits: matchedDeps
    };
  });

  // Calculate total active deposits across all plans (only approved/active deposits)
  const totalDepositAmount = dynamicPlans.reduce((acc, plan) => {
    const planTotal = (plan.deposits || []).reduce((sub, dep) => {
      const st = String(dep.status || '').toUpperCase();
      if (st === 'APPROVED' || st === 'ACTIVE' || st === 'COMPLETED' || st === 'SUCCESS') {
        return sub + (parseFloat(dep.amount) || 0);
      }
      return sub;
    }, 0);
    return acc + planTotal;
  }, 0);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 flex flex-col justify-between">
      <HeaderNav />
      <SubNav activeTab="DEPOSITS LIST" />

      {/* CONTENT AREA */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        
        {/* PAGE TITLE & TOTAL */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#00529b] tracking-tight mb-3">
            Deposits List
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-slate-500 block mb-1">
                Total Active Deposits
              </span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                ${totalDepositAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <Link
                href="/deposit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#0085d0] hover:bg-[#0072ce] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Make a Deposit</span>
              </Link>
            </div>
          </div>
        </div>

        {/* LIST OF DEPOSIT PLANS (MATCHING EXACT SCREENSHOT LAYOUT) */}
        {isLoading ? (
          <div className="py-12 border border-slate-200 rounded-lg text-center text-slate-600 font-semibold flex items-center justify-center gap-2">
            <span>Loading user deposits</span>
            <Loader2 className="w-5 h-5 animate-spin text-[#0085d0]" />
          </div>
        ) : (
          <div className="space-y-8">
            {dynamicPlans.map((item) => (
              <div key={item.id} className="space-y-3">
              
              {/* PLAN CONTAINER */}
              <div className="border border-slate-300 rounded-xs overflow-hidden shadow-2xs bg-white">
                
                {/* SUBHEADER TITLE BAR */}
                <div className="px-4 py-2.5 bg-slate-50/70 border-b border-slate-300">
                  <h2 className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide uppercase">
                    {item.title}
                  </h2>
                </div>

                {/* TABLE HEADER & ROW */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#0085d0] text-white text-xs sm:text-sm font-semibold">
                        <th className="py-2.5 px-4 font-semibold w-1/2 border-r border-[#0072ce]/40">
                          Plan
                        </th>
                        <th className="py-2.5 px-4 font-semibold w-1/4 border-r border-[#0072ce]/40">
                          Deposit Amount
                        </th>
                        <th className="py-2.5 px-4 font-semibold w-1/4">
                          {item.profitLabel}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-800">
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-900 border-r border-slate-300">
                          {item.planName}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900 border-r border-slate-300">
                          {item.depositRange}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {item.profitRate}%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>

              {/* ACTIVE DEPOSITS UNDER THIS PLAN OR EMPTY STATE */}
              {item.deposits.length === 0 ? (
                <div className="px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xs text-xs font-semibold text-slate-500 italic">
                  No deposits for this plan
                </div>
              ) : (
                <div className="border border-slate-300 rounded-xs overflow-hidden shadow-2xs bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold">
                          <th className="py-2.5 px-4">Amount</th>
                          <th className="py-2.5 px-4">Status</th>
                          <th className="py-2.5 px-4">Deposit Date & Time</th>
                          <th className="py-2.5 px-4">Yield / Profit</th>
                          <th className="py-2.5 px-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-800">
                        {item.deposits.map((dep, idx) => (
                          <tr key={dep.id || idx} className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-3 px-4 font-extrabold text-slate-900">
                              ${parseFloat(dep.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="py-3 px-4">
                              {(() => {
                                const st = String(dep.status || 'Active').toUpperCase();
                                if (st === 'PENDING' || st === 'INITIATED') {
                                  return (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                      Pending
                                    </span>
                                  );
                                }
                                if (st === 'REJECTED' || st === 'FAILED') {
                                  return (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                      Rejected
                                    </span>
                                  );
                                }
                                return (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    {dep.status || 'Active'}
                                  </span>
                                );
                              })()}
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-600">
                              {formatDateTime(dep.createdAt || dep.created_at || dep.date)}
                            </td>
                            <td className="py-3 px-4 font-bold text-emerald-600">
                              +${(parseFloat(dep.amount || 0) * (parseFloat(item.profitRate) / 100)).toFixed(2)} / cycle
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      )}

      </section>

      <FloatingWidgets />
      <Footer />
    
      {/* CANCELLATION CONFIRMATION MODAL */}
      {cancellingDep && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Cancel Investment</h3>
              <button
                type="button"
                onClick={() => setCancellingDep(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Are you sure you want to cancel your <strong className="text-slate-900">${parseFloat(cancellingDep.amount || 0).toFixed(2)}</strong> investment in <strong className="text-slate-900">{cancellingDep.planName || 'Plan'}</strong>?
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 space-y-1 font-medium leading-relaxed">
                <div className="font-bold flex items-center gap-1 text-amber-800">
                  <span>⚠️ Early Release Policy</span>
                </div>
                <div>
                  • You will receive a <strong>50% principal refund (${(parseFloat(cancellingDep.amount || 0) * 0.50).toFixed(2)})</strong> credited directly back to your balance.
                </div>
                <div>
                  • The remaining 50% is deducted as the early release fee.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCancellingDep(null)}
                disabled={isSubmittingCancel}
                className="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Keep Active
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                disabled={isSubmittingCancel}
                className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all cursor-pointer shadow-md disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmittingCancel ? 'Cancelling...' : 'Confirm Cancel & Get 50%'}
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
