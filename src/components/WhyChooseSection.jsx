'use client';

import React from 'react';
import { Award, Layers, ShieldCheck, Trophy } from 'lucide-react';

export default function WhyChooseSection() {
  const items = [
    {
      title: 'YEARS OF EXPERIENCE',
      description: 'Online trading pioneer since 1999, we now process over 30mn orders annually.',
      icon: (
        <div className="w-14 h-14 rounded-full border-2 border-white/80 flex items-center justify-center shrink-0 relative bg-white/5">
          <Award className="w-7 h-7 text-amber-400 stroke-[1.5]" />
        </div>
      )
    },
    {
      title: 'LISTED COMPANY',
      description: "One of Europe's largest platforms, listed and part of Euro Stoxx 600.",
      icon: (
        <div className="w-14 h-14 rounded-full border-2 border-white/80 flex items-center justify-center shrink-0 relative bg-white/5">
          <Layers className="w-7 h-7 text-amber-400 stroke-[1.5]" />
        </div>
      )
    },
    {
      title: 'ONE-STOP SOLUTION',
      description: 'A combination of brokerage and investment services, all via one single platform account.',
      icon: (
        <div className="w-14 h-14 rounded-full border-2 border-white/80 flex items-center justify-center shrink-0 relative bg-white/5">
          <ShieldCheck className="w-7 h-7 text-amber-400 stroke-[1.5]" />
        </div>
      )
    },
    {
      title: 'A GLOBAL AWARD-WINNER',
      description: 'Recognised and awarded for best platform, provider and live trading events of the year.',
      icon: (
        <div className="w-14 h-14 rounded-full border-2 border-white/80 flex items-center justify-center shrink-0 relative bg-white/5">
          <Trophy className="w-7 h-7 text-amber-400 stroke-[1.5]" />
        </div>
      )
    }
  ];

  return (
    <section className="bg-[#0055a5] text-white py-20 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 space-y-14 text-center">
        
        {/* Title & Subtitle */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase">
            WHY CHOOSE <span className="text-[#ffd700]">DIGITALXTRADE.VIP</span>?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto">
            digitalxtrade.com is one of Europe's leading FinTech platform with over 1.3 million clients and £82.4 billion in total financial assets.
          </p>
        </div>

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-5xl mx-auto text-left pt-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-6">
              {item.icon}
              <div className="space-y-2">
                <h3 className="text-base font-black tracking-wide text-white uppercase">
                  {item.title}
                </h3>
                <p className="text-sm text-blue-100 font-medium leading-relaxed">
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
