'use client';

import React from 'react';
import Link from 'next/link';

export default function ProfessionalToolsSection() {
  const toolsBullets = [
    'Free Stock Screener',
    'Stock order book on 5 levels',
    'Reuters and DJ real-time news',
    'Risk management: stops and limits',
    'Economic events calendar'
  ];

  const globalRevBullets = [
    'CFDs on Shares, Forex and Indices',
    'UK and Global Shares and ETFs',
    'Forex CFDs: 50+ pairs and 21 hours a day',
    'Options on S&P, Nasdaq, DJ, Russell',
    'CFDs with underlying futures on commodities',
    'Futures on CME, EUREX & IDEM'
  ];

  const mobileExpBullets = [
    'Mobile app',
    'Advanced tools',
    'Live feeds and P&L updates',
    'Customisable dynamic charts',
    'Mobile streaming quotes and news',
    'Global investments at your fingertips'
  ];

  return (
    <section className="bg-white py-20 border-b border-gray-100 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 space-y-16">
        
        {/* Split Section: Image Left, Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center max-w-6xl mx-auto">
          {/* Left Image */}
          <div className="lg:col-span-7 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
              <img
                src="/images/tools-workspace.jpg"
                alt="DigitalXTrade Professional Tools Workspace"
                className="w-full h-[440px] sm:h-[500px] object-cover object-center"
              />
            </div>
          </div>

          {/* Right Overlapping Card */}
          <div className="lg:col-span-5 z-10">
            <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-100 space-y-6 text-left lg:-ml-16 relative">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0055a5] tracking-tight">
                Professional tools
              </h2>

              <p className="text-gray-600 text-sm font-medium leading-relaxed">
                Trading has never been easier with our free trading tools to quickly seize any market opportunity.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-gray-700">
                {toolsBullets.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <span className="text-[#0088cc] font-black text-sm">❯</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <Link
                  href="/register"
                  className="inline-block px-7 py-3 rounded border-2 border-[#0088cc] text-[#0088cc] hover:text-[#38bdf8] hover:bg-slate-50 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all"
                >
                  FIND OUT MORE
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Card Bottom Grid: Global Revolution & Stellar Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left pt-6">
          
          {/* A global trading revolution */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-4">
            <h3 className="text-xl font-bold text-gray-800 tracking-tight">
              A global trading revolution
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-gray-600">
              {globalRevBullets.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <span className="text-[#0088cc] font-black text-sm">❯</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* A stellar mobile experience */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-4">
            <h3 className="text-xl font-bold text-gray-800 tracking-tight">
              A stellar mobile experience
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-gray-600">
              {mobileExpBullets.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <span className="text-[#0088cc] font-black text-sm">❯</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
