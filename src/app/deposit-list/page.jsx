'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  PlusCircle, 
  Wallet, 
  ArrowUpRight, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  Calculator
} from 'lucide-react';
import HeaderNav from '@/components/HeaderNav';
import SubNav from '@/components/SubNav';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';

export default function DepositListPage() {
  // Deposit plans based exactly on the provided design specifications
  const plans = [
    {
      id: 'foundation',
      title: 'FOUNDATION PLAN',
      planName: 'Plan 1',
      depositRange: '$40.00 - $4999.00',
      profitRate: '2.80',
      profitLabel: 'Daily Profit (%)',
      duration: 'Daily',
      deposits: []
    },
    {
      id: 'acceleration',
      title: 'ACCELERATION PLAN',
      planName: 'Plan 2',
      depositRange: '$5000.00 - $9999.00',
      profitRate: '5.50',
      profitLabel: 'Daily Profit (%)',
      duration: 'Daily',
      deposits: []
    },
    {
      id: 'stability',
      title: 'STABILITY PLAN',
      planName: 'Plan 3',
      depositRange: '$10000.00 - $19999.00',
      profitRate: '8.50',
      profitLabel: 'Daily Profit (%)',
      duration: 'Daily',
      deposits: []
    },
    {
      id: 'wealth',
      title: 'WEALTH PLAN',
      planName: 'Plan 4',
      depositRange: '$20000.00 and more',
      profitRate: '10.50',
      profitLabel: 'Daily Profit (%)',
      duration: 'Daily',
      deposits: []
    },
    {
      id: 'max-promo',
      title: 'DIGITALXTRADE MAX PLAN(250% In 48 hours)',
      planName: 'PROMO PLAN1',
      depositRange: '$1000.00 - $4999.00',
      profitRate: '300.00',
      profitLabel: 'Profit (%)',
      duration: '48 hours',
      deposits: []
    },
    {
      id: 'super-promo',
      title: 'DIGITALXTRADE SUPER PLAN(500% In 72 hours)',
      planName: 'PROMO PLAN 2',
      depositRange: '$5000.00 - $100000.00',
      profitRate: '500.00',
      profitLabel: 'Profit (%)',
      duration: '72 hours',
      deposits: []
    }
  ];

  // Calculate total active deposits across all plans
  const totalDepositAmount = plans.reduce((acc, plan) => {
    const planTotal = plan.deposits.reduce((sub, dep) => sub + (dep.amount || 0), 0);
    return acc + planTotal;
  }, 0);

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 flex flex-col justify-between">
      <HeaderNav />
      <SubNav activeTab="DEPOSITS LIST" />

      {/* CONTENT AREA */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        
        {/* PAGE TITLE & TOTAL */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#00529b] tracking-tight mb-3">
            Your deposits
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-base md:text-lg font-bold text-slate-900">
              Total: ${totalDepositAmount.toFixed(2)}
            </p>

            {/* QUICK ACTIONS */}
            <div className="flex items-center gap-3">
              <Link
                href="/investments"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#0085d0] hover:bg-[#0072ce] text-white text-xs font-bold uppercase tracking-wider shadow-xs transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Make a Deposit</span>
              </Link>
            </div>
          </div>
        </div>

        {/* LIST OF DEPOSIT PLANS (MATCHING EXACT SCREENSHOT LAYOUT) */}
        <div className="space-y-8">
          {plans.map((item) => (
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
                          {item.profitRate}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>

              {/* STATUS BOX BELOW TABLE */}
              <div className="border border-slate-300 rounded-xs p-3.5 bg-white shadow-2xs">
                {item.deposits && item.deposits.length > 0 ? (
                  <div className="space-y-2">
                    {item.deposits.map((dep, dIdx) => (
                      <div key={dIdx} className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-semibold text-slate-900">${dep.amount.toFixed(2)}</span>
                        <span className="text-emerald-600 font-bold">Active</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs sm:text-sm font-bold text-slate-800">
                    No deposits for this plan
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* BOTTOM HELPFUL NOTE */}
        <div className="mt-12 p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
          <ShieldCheck className="w-5 h-5 text-[#0085d0] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-slate-800">Automated Daily Compounding & Payouts</span>
            <p className="leading-relaxed">
              Profits are credited directly to your account balance every 24 hours from the exact minute of deposit confirmation. Promo plan yields are credited upon completion of the stated investment duration.
            </p>
          </div>
        </div>

      </section>

      <FloatingWidgets />
      <Footer />
    </main>
  );
}
