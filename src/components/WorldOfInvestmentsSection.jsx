'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight, Star } from 'lucide-react';

export default function WorldOfInvestmentsSection() {
  return (
    <section className="bg-white py-16 px-4 md:px-8 max-w-7xl mx-auto font-sans text-slate-800">
      {/* SECTION 1: A WORLD OF INVESTMENT OPPORTUNITIES */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#00529b] tracking-tight mb-3">
          A world of investment opportunities
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-3xl mx-auto font-medium">
          Boost your opportunities by investing with digitalxtrade.com's open funds platform and our Stocks and Shares ISA.
        </p>
      </div>

      {/* BLOCK 1: Invest with confidence */}
      <div className="relative max-w-5xl mx-auto mb-24 min-h-[380px] flex items-center">
        {/* Right Image Background */}
        <div className="w-full md:w-3/4 ml-auto h-[340px] md:h-[400px] relative rounded-lg overflow-hidden shadow-md">
          <Image
            src="/images/skyscrapers-architecture.jpg"
            alt="Modern Glass Skyscrapers"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Left Overlapping White Card */}
        <div className="relative md:absolute left-0 top-1/2 md:-translate-y-1/2 w-full md:w-[460px] bg-white p-6 md:p-8 rounded-lg shadow-xl border border-slate-100 z-10 my-4 md:my-0">
          <h3 className="text-2xl font-bold text-[#00529b] mb-4">
            Invest with confidence
          </h3>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            Choose from our diverse list of worldwide asset managers and invest with fair and transparent prices.
          </p>

          <ul className="space-y-2.5 mb-8 text-xs md:text-sm text-slate-700 font-medium">
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 stroke-[3]" />
              <span>The more you invest, the less you pay</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 stroke-[3]" />
              <span>Regular Investment Plans on Funds or ETFs</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 stroke-[3]" />
              <span>No funds transfer, exit or dealing fees</span>
            </li>
          </ul>

          <button className="border border-[#0085d0] text-[#0072ce] hover:text-[#38bdf8] hover:bg-slate-50 transition-colors px-6 py-2.5 rounded text-xs md:text-sm font-bold tracking-wider uppercase">
            FIND OUT MORE
          </button>
        </div>
      </div>

      {/* BLOCK 2: Stocks & Shares ISA */}
      <div className="relative max-w-5xl mx-auto mb-10 min-h-[380px] flex items-center">
        {/* Left Image Background */}
        <div className="w-full md:w-3/4 mr-auto h-[340px] md:h-[400px] relative rounded-lg overflow-hidden shadow-md">
          <Image
            src="/images/thoughtful-trader.jpg"
            alt="Professional Investor with Tablet"
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Right Overlapping White Card */}
        <div className="relative md:absolute right-0 top-1/2 md:-translate-y-1/2 w-full md:w-[460px] bg-white p-6 md:p-8 rounded-lg shadow-xl border border-slate-100 z-10 my-4 md:my-0">
          <h3 className="text-2xl font-bold text-[#00529b] mb-4 leading-tight">
            Get more with our Stock&Shares ISA
          </h3>
          <p className="text-slate-600 text-sm mb-8 leading-relaxed">
            Maximise your tax benefits. After opening a standard digitalxtrade.com current account, open your ISA by December 31st &amp; get 0% platform fees until end of 2021/22 tax year.
          </p>

          <button className="border border-[#0085d0] text-[#0072ce] hover:text-[#38bdf8] hover:bg-slate-50 transition-colors px-6 py-2.5 rounded text-xs md:text-sm font-bold tracking-wider uppercase">
            OPEN ACCOUNT
          </button>
        </div>
      </div>

      {/* Small print notice & Important Information */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-20">
        <p className="text-[11px] text-slate-400 italic leading-snug">
          *ISA 0% platform fee: All 2021/22 tax year long if you open/transfer your ISA by 31st December 2021. Once you have opened your standard fineco account.
        </p>
        <p className="text-xs text-slate-600 font-medium leading-normal px-4">
          <span className="font-bold text-slate-800">Important Information</span> - Investments can go up and down in value. Tax rules and benefits are also subject to change depending on your circumstances. This could mean that you get less money back than you put in.
        </p>
      </div>

      {/* SECTION 2: ONE SINGLE ACCOUNT, MULTIPLE BENEFITS */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#00529b] tracking-tight mb-3">
          One single account, multiple benefits
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-3xl mx-auto font-medium">
          Make the most of our e-investment services! When you join digitalxtrade.com, you can manage all of your finances in one single multi-currency account- via our handy combination of brokerage, personal investment services.
        </p>
      </div>

      {/* BLOCK 3: Multi-currency investment simplified */}
      <div className="relative max-w-5xl mx-auto mb-16 min-h-[380px] flex items-center">
        {/* Right Image Background */}
        <div className="w-full md:w-3/4 ml-auto h-[340px] md:h-[400px] relative rounded-lg overflow-hidden shadow-md">
          <Image
            src="/images/multicurrency-card.jpg"
            alt="Multi-currency Debit Card"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Left Overlapping White Card */}
        <div className="relative md:absolute left-0 top-1/2 md:-translate-y-1/2 w-full md:w-[460px] bg-white p-6 md:p-8 rounded-lg shadow-xl border border-slate-100 z-10 my-4 md:my-0">
          <h3 className="text-2xl font-bold text-[#00529b] mb-4 leading-tight">
            Multi-currency investment simplified
          </h3>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            With our full set of investment services you can spend like a local anywhere in the U.K., Europe, World.
          </p>

          <ul className="space-y-2.5 mb-8 text-xs md:text-sm text-slate-700 font-medium">
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 stroke-[3]" />
              <span>0 annual fees on first GBP or EUR debit card</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 stroke-[3]" />
              <span>Free withdrawals in the UK with GBP card</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 stroke-[3]" />
              <span>Free withdrawals in EU zone with EUR card</span>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 stroke-[3]" />
              <span>Instant global payments in 10+ currencies</span>
            </li>
          </ul>

          <button className="border border-[#0085d0] text-[#0072ce] hover:text-[#38bdf8] hover:bg-slate-50 transition-colors px-6 py-2.5 rounded text-xs md:text-sm font-bold tracking-wider uppercase">
            FIND OUT MORE
          </button>
        </div>
      </div>

      {/* AWARDS ROW */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-8 border-t border-slate-100">
        {/* Award 1 */}
        <div className="flex flex-col items-center">
          <div className="relative w-12 h-12 flex items-center justify-center mb-3">
            <svg className="w-10 h-10 overflow-visible" viewBox="0 0 24 24" fill="none">
              <defs>
                <clipPath id="top-half-clip">
                  <rect x="0" y="0" width="24" height="11" />
                </clipPath>
              </defs>
              {/* Full Blue Base Star */}
              <path
                d="M12 2L14.8 8.5H21.5L16 12.8L18.2 19.5L12 15.2L5.8 19.5L8 12.8L2.5 8.5H9.2L12 2Z"
                stroke="#00529b"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Yellow Top Half Star */}
              <path
                d="M12 2L14.8 8.5H21.5L16 12.8L18.2 19.5L12 15.2L5.8 19.5L8 12.8L2.5 8.5H9.2L12 2Z"
                stroke="#ffd700"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                clipPath="url(#top-half-clip)"
              />
            </svg>
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">2021</span>
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide mb-1">
            BEST BROKER FOR GLOBAL TRADING
          </h4>
          <p className="text-[11px] text-slate-500">ADVFN International Financial Awards</p>
        </div>

        {/* Award 2 */}
        <div className="flex flex-col items-center">
          <div className="relative w-12 h-12 flex items-center justify-center mb-3">
            <svg className="w-10 h-10 overflow-visible" viewBox="0 0 24 24" fill="none">
              <defs>
                <clipPath id="top-half-clip">
                  <rect x="0" y="0" width="24" height="11" />
                </clipPath>
              </defs>
              {/* Full Blue Base Star */}
              <path
                d="M12 2L14.8 8.5H21.5L16 12.8L18.2 19.5L12 15.2L5.8 19.5L8 12.8L2.5 8.5H9.2L12 2Z"
                stroke="#00529b"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Yellow Top Half Star */}
              <path
                d="M12 2L14.8 8.5H21.5L16 12.8L18.2 19.5L12 15.2L5.8 19.5L8 12.8L2.5 8.5H9.2L12 2Z"
                stroke="#ffd700"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                clipPath="url(#top-half-clip)"
              />
            </svg>
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">2021</span>
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide mb-1">
            BEST LIVE TRADING EVENTS
          </h4>
          <p className="text-[11px] text-slate-500">ADVFN International Financial Awards</p>
        </div>

        {/* Award 3 */}
        <div className="flex flex-col items-center">
          <div className="relative w-12 h-12 flex items-center justify-center mb-3">
            <svg className="w-10 h-10 overflow-visible" viewBox="0 0 24 24" fill="none">
              <defs>
                <clipPath id="top-half-clip">
                  <rect x="0" y="0" width="24" height="11" />
                </clipPath>
              </defs>
              {/* Full Blue Base Star */}
              <path
                d="M12 2L14.8 8.5H21.5L16 12.8L18.2 19.5L12 15.2L5.8 19.5L8 12.8L2.5 8.5H9.2L12 2Z"
                stroke="#00529b"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Yellow Top Half Star */}
              <path
                d="M12 2L14.8 8.5H21.5L16 12.8L18.2 19.5L12 15.2L5.8 19.5L8 12.8L2.5 8.5H9.2L12 2Z"
                stroke="#ffd700"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                clipPath="url(#top-half-clip)"
              />
            </svg>
          </div>
          <span className="text-base font-bold text-slate-800 mb-1">2020</span>
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide mb-1">
            BEST TRADING PLATFORM
          </h4>
          <p className="text-[11px] text-slate-500">London Forex Show</p>
        </div>
      </div>
    </section>
  );
}
