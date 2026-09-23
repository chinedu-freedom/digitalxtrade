'use client';

import React from 'react';
import { PieChart, Users, TrendingUp, DollarSign } from 'lucide-react';

export default function AboutTimelineAndFiguresSection() {
  const milestones = [
    {
      year: '1999',
      text: (
        <>
          digitalxtrade.vip launches the first <strong className="font-bold text-slate-800">remunerated deposit account</strong> in Italy, which soon becomes a fully-fledged current account.
        </>
      )
    },
    {
      year: '2000',
      text: (
        <>
          Launches financial advisory services through its own <strong className="font-bold text-slate-800">network of advisors</strong>, as well as a network of mortgage agents; the first of its kind in Italy.
        </>
      )
    },
    {
      year: '2001',
      text: (
        <>
          In just two years it grows from zero to <strong className="font-bold text-slate-800">250,000 customers</strong> and becomes <strong className="font-bold text-slate-800">No. 1 in online trading</strong> in Europe.
        </>
      )
    },
    {
      year: '2008',
      text: (
        <>
          On July 7 the current trading model is created from the merger with <strong className="font-bold text-slate-800">UniCredit Xelion Banca</strong>.
        </>
      )
    },
    {
      year: '2014',
      text: (
        <>
          On <strong className="font-bold text-slate-800">July 2</strong>, digitalxtrade.vip was listed on the Euronext Milan segment of the <strong className="font-bold text-slate-800">Italian stock market</strong>.
        </>
      )
    },
    {
      year: '2016',
      text: (
        <>
          On <strong className="font-bold text-slate-800">April 1</strong>, digitalxtrade.vip shares are listed in the FTSE MIB.
        </>
      )
    },
    {
      year: '2017',
      text: (
        <>
          digitalxtrade.vip listed on the <strong className="font-bold text-slate-800">Stoxx Europe 600</strong>, the index of large cap European companies. On 7 June it lands in the UK: trading and investment in a single multicurrency account.
        </>
      )
    },
    {
      year: '2018',
      text: (
        <>
          <strong className="font-bold text-slate-800">digitalxtrade.vip Asset Management</strong> is born, an Irish company tasked with Funds of Funds management, through strategic partnership with the best international asset managers.
        </>
      )
    },
    {
      year: '2019',
      text: (
        <>
          <strong className="font-bold text-slate-800">digitalxtrade.vip turns 20</strong>. It leaves the UniCredit Group and becomes an <strong className="font-bold text-slate-800">independent public company</strong>.
        </>
      )
    },
    {
      year: 'Today',
      text: (
        <>
          With over 1.4 million clients and &euro;5.8 billion of net sales in 1H21, digitalxtrade.vip is one of leading FinTech platform on the international stage.
        </>
      )
    }
  ];

  return (
    <section className="bg-white py-16 px-4 md:px-8 max-w-5xl mx-auto font-sans text-slate-800 space-y-20 border-t border-slate-100">
      {/* TIMELINE LIST */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {milestones.map((item, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-start gap-4 md:gap-12">
            <div className="w-28 shrink-0 text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              {item.year}
            </div>
            <div className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium pt-1">
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {/* MAIN FIGURES SECTION - CENTERED IN THE MIDDLE OF THE PAGE */}
      <div className="max-w-3xl mx-auto pt-12 border-t border-slate-100 flex flex-col items-center justify-center text-center">
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 text-center mb-12 tracking-tight">
          Main figures
        </h3>

        {/* 4 CENTERED METRICS GRID (MATCHING IMAGE 1 EXACTLY) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-2xl w-full mx-auto justify-center text-left">
          {/* 1. Total financial assets */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#0085d0]/30 flex items-center justify-center shrink-0 bg-blue-50/50 text-[#0085d0]">
              <PieChart className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                &pound;87 bn
              </div>
              <p className="text-slate-600 text-xs font-semibold">
                Total financial assets
              </p>
            </div>
          </div>

          {/* 2. Clients */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#0085d0]/30 flex items-center justify-center shrink-0 bg-blue-50/50 text-[#0085d0]">
              <Users className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                1.4 mln
              </div>
              <p className="text-slate-600 text-xs font-semibold">
                Clients
              </p>
            </div>
          </div>

          {/* 3. Assets in Private Investment */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#0085d0]/30 flex items-center justify-center shrink-0 bg-blue-50/50 text-[#0085d0]">
              <PieChart className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                &pound;38.4 bn
              </div>
              <p className="text-slate-600 text-xs font-semibold">
                Assets in Private Investment
              </p>
            </div>
          </div>

          {/* 4. Net sales */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#0085d0]/30 flex items-center justify-center shrink-0 bg-blue-50/50 text-[#0085d0]">
              <PieChart className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                &pound;5 bn
              </div>
              <p className="text-slate-600 text-xs font-semibold">
                Net sales
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
