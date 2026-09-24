'use client';

import React from 'react';
import { Search, ShieldCheck } from 'lucide-react';

export default function WhyChooseSection() {
  return (
    <section className="bg-[#00529b] text-white py-16 px-6 md:px-12 font-sans">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        
        {/* Header Title & Subtitle */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight uppercase">
            WHY CHOOSE <span className="text-[#ffd700]">DIGITALXTRADE.COM</span>?
          </h2>
          <p className="text-blue-100 text-xs md:text-sm font-medium leading-relaxed max-w-2xl mx-auto">
            Online trading pioneer since 1999, we have processed +33.4 million orders in 2020 and we are part of the EuroStoxx 600 Index.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 max-w-5xl mx-auto text-center pt-2">
          
          {/* Column 1: CONVENIENT PRICING */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 relative flex items-center justify-center mb-1">
              <svg className="w-14 h-14" viewBox="0 0 48 48" fill="none">
                <circle cx="22" cy="22" r="14" stroke="#ffffff" strokeWidth="2" />
                <path d="M32 32L40 40" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                <path d="M22 8C27 8 32 12 32 17" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-sm md:text-base font-extrabold text-white uppercase tracking-wide">
              CONVENIENT PRICING
            </h3>
            <p className="text-xs md:text-sm text-blue-100 leading-relaxed font-normal max-w-xs">
              One of the most convenient pricing on the the market. Starting from &pound;0 on FTSE100, US and EU Shares CFDs without additional markup.
            </p>
          </div>

          {/* Column 2: LISTED COMPANY */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 relative flex items-center justify-center mb-1">
              <svg className="w-14 h-14" viewBox="0 0 48 48" fill="none">
                <path d="M24 6L38 12V24C38 33 32 40 24 44C16 40 10 33 10 24V12L24 6Z" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" />
                <path d="M18 24L22 28L30 18" stroke="#ffd700" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-sm md:text-base font-extrabold text-white uppercase tracking-wide">
              LISTED COMPANY
            </h3>
            <p className="text-xs md:text-sm text-blue-100 leading-relaxed font-normal max-w-xs">
              One of Europe's largest banks, listed and part of Euro Stoxx 600, with &pound;82.4 billion in total financial assets.
            </p>
          </div>

          {/* Column 3: A GLOBAL AWARD-WINNER */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 relative flex items-center justify-center mb-1">
              <svg className="w-14 h-14 overflow-visible" viewBox="0 0 24 24" fill="none">
                <defs>
                  <clipPath id="top-half-clip-why">
                    <rect x="0" y="0" width="24" height="11" />
                  </clipPath>
                </defs>
                <path
                  d="M12 2L14.8 8.5H21.5L16 12.8L18.2 19.5L12 15.2L5.8 19.5L8 12.8L2.5 8.5H9.2L12 2Z"
                  stroke="#ffffff"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 2L14.8 8.5H21.5L16 12.8L18.2 19.5L12 15.2L5.8 19.5L8 12.8L2.5 8.5H9.2L12 2Z"
                  stroke="#ffd700"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  clipPath="url(#top-half-clip-why)"
                />
              </svg>
            </div>
            <h3 className="text-sm md:text-base font-extrabold text-white uppercase tracking-wide">
              A GLOBAL AWARD-WINNER
            </h3>
            <p className="text-xs md:text-sm text-blue-100 leading-relaxed font-normal max-w-xs">
              Awarded for Best Broker for Global Trading 2021 by ADVFN International Financial Awards and Best trading Platform 2020 by London Forex Show.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

