'use client';

import React from 'react';
import { Monitor, Award, Search, CheckCircle2 } from 'lucide-react';

export default function LevelUpTradingSection() {
  const features = [
    {
      title: 'PREMIUM TRADING',
      description:
        'Enjoy an advanced platform that is powerful, fast, customisable, accessible on any device and easy to use.',
      icon: (
        <div className="w-14 h-14 rounded-full border-2 border-[#0066b3] text-[#0066b3] flex items-center justify-center shrink-0">
          <Monitor className="w-7 h-7 stroke-[1.5]" />
        </div>
      )
    },
    {
      title: 'LEADER ON BROKERAGE',
      description:
        "One of Europe's leading FinTech company. Est. in 1999, with 1.3mn clients and +33.4mn orders processed in 2020.",
      icon: (
        <div className="w-14 h-14 rounded-full border-2 border-[#0066b3] text-[#0066b3] flex items-center justify-center shrink-0">
          <Award className="w-7 h-7 stroke-[1.5]" />
        </div>
      )
    },
    {
      title: 'FAIR PRICING',
      description:
        "Don't pay for things you shouldn't have to - benefit from competitive exchange rates, low spreads and no hidden charges.",
      icon: (
        <div className="w-14 h-14 rounded-full border-2 border-[#0066b3] text-[#0066b3] flex items-center justify-center shrink-0">
          <Search className="w-7 h-7 stroke-[1.5]" />
        </div>
      )
    },
    {
      title: 'ONE-STOP SOLUTION',
      description:
        'An extraordinary combination in the UK-brokerage and investment services, all via one single bank account.',
      icon: (
        <div className="w-14 h-14 rounded-full border-2 border-[#0066b3] text-[#0066b3] flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-7 h-7 stroke-[1.5]" />
        </div>
      )
    }
  ];

  return (
    <section className="bg-white py-20 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 text-center space-y-12">
        
        {/* Title & Subtitle */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-[#0055a5] font-sans tracking-tight">
            Level up your trading with digitalxtrade.com
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-medium leading-relaxed">
            Since 1999 over 1.3 million clients have already chosen digitalxtrade.com to invest and trade on world markets.
          </p>
        </div>

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-5xl mx-auto pt-4 text-left">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-start gap-6">
              {item.icon}
              <div className="space-y-2">
                <h3 className="text-base font-extrabold text-gray-800 tracking-wide uppercase">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
