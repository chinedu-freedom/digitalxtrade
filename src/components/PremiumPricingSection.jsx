'use client';

import React from 'react';
import Link from 'next/link';

export default function PremiumPricingSection() {
  const plans = [
    {
      title: 'Foundation Plan',
      dailyRoi: '2.8% DAILY FOR 30 DAYS',
      amount: '$40.00 - $4999',
      returnType: 'Principal return',
      referral: 'Basic referral commission 5%',
      representatives: 'Representatives 5%',
      withdrawals: 'Instant withdrawals'
    },
    {
      title: 'Acceleration Plan',
      dailyRoi: '5.5% DAILY FOR 30 DAYS',
      amount: '$5000 - $9999',
      returnType: 'Principal return',
      referral: 'Basic referral commission 5%',
      representatives: 'Representatives 5%',
      withdrawals: 'Instant withdrawals'
    },
    {
      title: 'Stability Plan',
      dailyRoi: '8.5% DAILY FOR 30 DAYS',
      amount: '$10000 - $19999',
      returnType: 'Principal return',
      referral: 'Basic referral commission 5%',
      representatives: 'Representatives 5%',
      withdrawals: 'Instant withdrawals'
    },
    {
      title: 'Wealth Plan',
      dailyRoi: '10.5% DAILY FOR 30 DAYS',
      amount: '$20000 - $0.00',
      returnType: 'Principal return',
      referral: 'Basic referral commission 5%',
      representatives: 'Representatives 5%',
      withdrawals: 'Instant withdrawals'
    }
  ];

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

        {/* 4 Investment Blue Cards */}
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
