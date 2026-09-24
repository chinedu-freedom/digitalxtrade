'use client';

import React from 'react';

export default function BroadenTradingSection() {
  const items = [
    {
      title: 'FUTURES',
      description: 'Trade Intraday & Overnight on CME, EUREX and IDEM. Up to 20x leverage with Micro E-Mini Futures.',
      icon: (
        <svg className="w-12 h-12 text-[#00529b] shrink-0" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M24 2V10M24 38V46M2 24H10M38 24H46" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: 'OPTIONS',
      description: 'Access CBOE market, Volatility Index (VIX) and options on S&P, DJ, Nasdaq and Russell Indices and US Stocks.',
      icon: (
        <svg className="w-12 h-12 text-[#00529b] shrink-0" viewBox="0 0 48 48" fill="none">
          {/* Bar Chart Icon */}
          <path d="M6 42H42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="10" y="24" width="6" height="14" stroke="currentColor" strokeWidth="1.8" />
          <path d="M13 14V24" stroke="currentColor" strokeWidth="1.8" />
          <rect x="21" y="12" width="6" height="26" stroke="currentColor" strokeWidth="1.8" />
          <path d="M24 6V12" stroke="currentColor" strokeWidth="1.8" />
          <rect x="32" y="28" width="6" height="10" stroke="currentColor" strokeWidth="1.8" />
          <path d="M35 18V28" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )
    },
    {
      title: 'BONDS',
      description: 'Gilts, Gov bonds and 6,000 sovereign, corporate and structured securities with real time direct market access.',
      icon: (
        <svg className="w-12 h-12 text-[#00529b] shrink-0" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.8" />
          <path d="M24 6V24H42" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M24 24L11 37" stroke="currentColor" strokeWidth="1.8" />
          <path d="M24 24L10 16" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )
    },
    {
      title: 'ETFS',
      description: 'Choose from a vast range of ETFs and ETCs or set your regular saving plan on multiple ETFs, from £2.95 per month.',
      icon: (
        <svg className="w-12 h-12 text-[#00529b] shrink-0" viewBox="0 0 48 48" fill="none">
          {/* Wireframe Pyramid */}
          <path d="M24 6L6 38H42L24 6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M24 6V38" stroke="currentColor" strokeWidth="1.8" />
          <path d="M15 22L33 22" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="18" cy="30" r="1" fill="currentColor" />
          <circle cx="24" cy="32" r="1" fill="currentColor" />
          <circle cx="30" cy="30" r="1" fill="currentColor" />
          <circle cx="21" cy="26" r="1" fill="currentColor" />
          <circle cx="27" cy="26" r="1" fill="currentColor" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-white py-20 px-4 md:px-8 font-sans border-t border-slate-100">
      <div className="max-w-5xl mx-auto space-y-14">
        
        {/* Title & Subtitle */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#00529b] tracking-tight">
            Broaden your trading horizons
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
            Find the products that match your needs and desired risk level and trade with an award-winning platform.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto pt-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-5">
              {item.icon}
              <div className="space-y-1.5 pt-0.5">
                <h3 className="text-sm md:text-base font-extrabold text-slate-900 uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
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
