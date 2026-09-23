'use client';

import React from 'react';
import { Check, Award } from 'lucide-react';
import Link from 'next/link';

export default function InvestmentPlans() {
  const plans = [
    {
      name: 'Starter Plan',
      roi: '1.5% Daily',
      duration: '7 Days',
      minDeposit: '$100',
      maxDeposit: '$4,999',
      recommended: false,
      features: ['24/7 Dedicated Support', 'Instant Profit Withdrawal', 'Standard Referral Bonus (5%)', 'Risk Protection Guard']
    },
    {
      name: 'Professional Trader',
      roi: '3.0% Daily',
      duration: '14 Days',
      minDeposit: '$5,000',
      maxDeposit: '$19,999',
      recommended: true,
      features: ['VIP Account Manager', 'Daily Direct Payouts', 'Tiered Referral Bonus (10%)', 'Guaranteed Principal Return', 'Automated Trading Signal']
    },
    {
      name: 'Institutional VIP',
      roi: '5.0% Daily',
      duration: '30 Days',
      minDeposit: '$20,000',
      maxDeposit: '$Unlimited',
      recommended: false,
      features: ['1-on-1 Trading Advisor', 'Zero Withdrawal Fees', 'Exclusive Staking Pool Access', 'Custom Asset Portfolio']
    }
  ];

  return (
    <section id="investments" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-[#0088cc] text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            High Yield Investment Packages
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
            Choose Your <span className="text-[#0088cc]">Investment Strategy</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Flexible investment tiers tailored for maximum returns with institutional risk management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={
                plan.recommended
                  ? 'relative rounded-2xl p-8 transition-all flex flex-col justify-between bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-[#0088cc] shadow-2xl shadow-sky-500/20 scale-105 z-10'
                  : 'relative rounded-2xl p-8 transition-all flex flex-col justify-between bg-slate-800/60 border border-slate-700/80 hover:border-slate-600'
              }
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0088cc] text-white text-xs font-extrabold uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-[#0088cc]">{plan.roi}</span>
                    <span className="text-sm font-medium text-slate-400">for {plan.duration}</span>
                  </div>
                </div>

                <div className="py-3 px-4 rounded-xl bg-slate-950/60 border border-slate-700/50 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Min Deposit:</span>
                    <span className="font-bold text-white">{plan.minDeposit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Max Deposit:</span>
                    <span className="font-bold text-white">{plan.maxDeposit}</span>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-slate-300">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href="/register"
                  className={
                    plan.recommended
                      ? 'w-full py-3.5 rounded-lg font-extrabold text-sm uppercase text-center block transition-all shadow-lg bg-[#0088cc] hover:bg-blue-600 text-white shadow-sky-500/30'
                      : 'w-full py-3.5 rounded-lg font-extrabold text-sm uppercase text-center block transition-all shadow-lg bg-slate-700 hover:bg-slate-600 text-white'
                  }
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
