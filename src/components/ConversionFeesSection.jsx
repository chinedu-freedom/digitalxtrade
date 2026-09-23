'use client';

import React from 'react';
import Link from 'next/link';

export default function ConversionFeesSection() {
  const currencyBullets = [
    'Real time, competitive exchange rates',
    'No currency conversion fees',
    'No account fees'
  ];

  return (
    <section className="bg-[#f8fafd] py-20 border-b border-gray-200 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 space-y-16">
        
        {/* Title & Subtitle */}
        <div className="space-y-4 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-[#0055a5] tracking-tight">
            Stop paying conversion fees on each trade
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto">
            For example, once you have converted your GBP into a foreign currency, like US dollars you are free to buy US shares without paying exchange fees every time you place a trade.
          </p>
        </div>

        {/* Split Section: Card Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center max-w-6xl mx-auto">
          {/* Left Overlapping Card */}
          <div className="lg:col-span-5 z-10">
            <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-100 space-y-6 text-left lg:-mr-16 relative">
              <h3 className="text-3xl sm:text-4xl font-black text-[#0055a5] tracking-tight leading-tight">
                Multiple currencies,<br />one account
              </h3>

              <p className="text-gray-600 text-sm font-medium leading-relaxed">
                Join digitalxtrade.com: you'll have access to 10+ currencies including BTC, ETH, LTC and DOGE.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-gray-700">
                {currencyBullets.map((item, idx) => (
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

          {/* Right Image */}
          <div className="lg:col-span-7 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
              <img
                src="/images/currency-exchange.jpg"
                alt="DigitalXTrade Currency Exchange App"
                className="w-full h-[440px] sm:h-[500px] object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* BE AWARE OF UNEXPECTED FEES Callout Box */}
        <div className="max-w-4xl mx-auto flex items-start gap-4 p-6 rounded-lg bg-white border border-sky-200 text-left shadow-sm">
          <div className="w-10 h-10 rounded-full border-2 border-[#0088cc] text-[#0088cc] flex items-center justify-center text-lg font-bold shrink-0">
            !
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-wide">
              BE AWARE OF UNEXPECTED FEES
            </h4>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Some brokers do not charge commissions, but they might include dealing charges as spread to the price.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
