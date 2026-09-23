'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutFeaturesSection() {
  return (
    <section className="bg-white py-16 px-4 md:px-8 max-w-7xl mx-auto font-sans text-slate-800 space-y-20 md:space-y-28">
      {/* BLOCK 1: Everything in one place */}
      <div className="relative max-w-5xl mx-auto min-h-[380px] flex items-center">
        {/* Right Image Container */}
        <div className="w-full md:w-3/4 ml-auto h-[340px] md:h-[400px] relative rounded-lg overflow-hidden shadow-md">
          <Image
            src="/images/currency-exchange.jpg"
            alt="Everything in one place"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-blue-950/20 mix-blend-multiply" />
        </div>

        {/* Left Overlapping White Card */}
        <div className="relative md:absolute left-0 top-1/2 md:-translate-y-1/2 w-full md:w-[460px] bg-white p-6 md:p-8 rounded-lg shadow-xl border border-slate-100 z-10 my-4 md:my-0">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#00529b] mb-4 tracking-tight leading-tight">
            Everything in one place.
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Simplify your life with a single multi-currency account to manage your daily investments.
          </p>
        </div>
      </div>

      {/* BLOCK 2: Fair and transparent costs */}
      <div className="relative max-w-5xl mx-auto min-h-[380px] flex items-center">
        {/* Left Image Container */}
        <div className="w-full md:w-3/4 mr-auto h-[340px] md:h-[400px] relative rounded-lg overflow-hidden shadow-md">
          <Image
            src="/images/tools-workspace.jpg"
            alt="Fair and transparent costs"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Right Overlapping White Card */}
        <div className="relative md:absolute right-0 top-1/2 md:-translate-y-1/2 w-full md:w-[460px] bg-white p-6 md:p-8 rounded-lg shadow-xl border border-slate-100 z-10 my-4 md:my-0">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#00529b] mb-4 tracking-tight leading-tight">
            Fair and transparent costs.
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Don't pay for things you shouldn't have to. Current accounts should be free. With digitalxtrade.com, there's no minimum deposit and no custody or admin fees.
          </p>
        </div>
      </div>

      {/* BLOCK 3: Experts in trading and investing */}
      <div className="relative max-w-5xl mx-auto min-h-[380px] flex items-center">
        {/* Right Image Container */}
        <div className="w-full md:w-3/4 ml-auto h-[340px] md:h-[400px] relative rounded-lg overflow-hidden shadow-md">
          <Image
            src="/images/trading-platform-laptop.jpg"
            alt="Experts in trading and investing"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Left Overlapping White Card */}
        <div className="relative md:absolute left-0 top-1/2 md:-translate-y-1/2 w-full md:w-[460px] bg-white p-6 md:p-8 rounded-lg shadow-xl border border-slate-100 z-10 my-4 md:my-0">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#00529b] mb-4 tracking-tight leading-tight">
            Experts in trading and investing.
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Invest and trade the world with a wide choice of funds, stocks, ETF, bonds, CFDs.
          </p>
        </div>
      </div>

      {/* BLOCK 4: Your projects are important to us */}
      <div className="relative max-w-5xl mx-auto min-h-[380px] flex items-center">
        {/* Left Image Container */}
        <div className="w-full md:w-3/4 mr-auto h-[340px] md:h-[400px] relative rounded-lg overflow-hidden shadow-md">
          <Image
            src="/images/skyscrapers-architecture.jpg"
            alt="Your projects are important to us"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Right Overlapping White Card */}
        <div className="relative md:absolute right-0 top-1/2 md:-translate-y-1/2 w-full md:w-[460px] bg-white p-6 md:p-8 rounded-lg shadow-xl border border-slate-100 z-10 my-4 md:my-0">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#00529b] mb-4 tracking-tight leading-tight">
            Your projects are important to us.
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            If you're thinking about future projects, or realising an ambition, or even protecting your capital from inflation, digitalxtrade.com can find the right solution to invest your money safely.
          </p>
        </div>
      </div>

      {/* BLOCK 5: Good news, we have a five star app */}
      <div className="relative max-w-5xl mx-auto min-h-[380px] flex items-center">
        {/* Right Image Container */}
        <div className="w-full md:w-3/4 ml-auto h-[340px] md:h-[400px] relative rounded-lg overflow-hidden shadow-md">
          <Image
            src="/images/thoughtful-trader.jpg"
            alt="Good news, we have a five star app"
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Left Overlapping White Card */}
        <div className="relative md:absolute left-0 top-1/2 md:-translate-y-1/2 w-full md:w-[460px] bg-white p-6 md:p-8 rounded-lg shadow-xl border border-slate-100 z-10 my-4 md:my-0">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#00529b] mb-4 tracking-tight leading-tight">
            Good news, we have a five star app.
          </h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Understand your assets at a glance with a fingerprint-secured app for trading and investments. Control your finances with free budgeting tools and stay on top of the markets with real-time trading prices and charts.
          </p>
        </div>
      </div>
    </section>
  );
}
