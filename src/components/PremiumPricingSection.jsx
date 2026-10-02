'use client';
import { getApiUrl } from '@/lib/api';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PremiumPricingSection() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch(getApiUrl('/deposit/plans'))
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.success && Array.isArray(data.plans)) {
          const targetPlans = data.plans.length > 4 ? data.plans.slice(-4) : data.plans;
          const mapped = targetPlans.map(p => {
            const minStr = `$${Number(p.minAmount).toFixed(0)}`;
            const maxStr = p.maxAmount ? `$${Number(p.maxAmount).toFixed(0)}` : '∞';
            const dur = `${p.durationDays || 30} DAYS`;
            return {
              title: p.name || p.title,
              dailyRoi: `${p.dailyProfit || p.profitNumber}%${p.profitLabel ? ' ' + p.profitLabel.toUpperCase() : ' DAILY'} FOR ${dur}`,
              amount: `${minStr} - ${maxStr}`,
              returnType: 'Principal return',
              referral: 'Basic referral commission 5%',
              representatives: 'Representatives 5%',
              withdrawals: 'Instant withdrawals'
            };
          });
          setPlans(mapped);
        }
      })
      .catch(err => {
        console.error('Failed to fetch pricing plans:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  return (
    <section id="investments" className="bg-[#f8fafd] py-20 border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 text-center space-y-12">
        
        {/* Title & Subtitle */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0055a5] font-sans tracking-tight">
            Premium trading without premium prices
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto">
            With digitalxtrade.com, trading meets one of the most convenient pricing on the market. Starting from $0.00 commission on FTSE100, US and EU Shares CFDs, market spread only and no additional markup.
          </p>
        </div>

        {/* Investment Blue Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left max-w-6xl mx-auto pt-4">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-[#0072ce] text-white rounded-xl p-6 shadow-xl flex flex-col justify-between hover:bg-[#0066b3] transition-colors"
            >
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white leading-tight">
                    {plan.title}
                  </h3>
                  <div className="text-xs font-black uppercase tracking-wider text-sky-100 mt-1">
                    {plan.dailyRoi}
                  </div>
                </div>

                <div className="space-y-2 text-xs font-semibold text-sky-50 pt-2 border-t border-white/20">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white">❯</span>
                    <span>{plan.amount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white">❯</span>
                    <span>{plan.returnType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white">❯</span>
                    <span>{plan.referral}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white">❯</span>
                    <span>{plan.representatives}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white">❯</span>
                    <span>{plan.withdrawals}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="pt-6">
          <Link
            href="/register"
            className="inline-block px-10 py-3.5 rounded bg-[#0088cc] hover:bg-[#0077bb] text-white font-extrabold text-sm uppercase tracking-wider shadow-md transition-all"
          >
            MAKE INVESTMENT
          </Link>
        </div>

      </div>
    </section>
  );
}
