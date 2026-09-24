'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-80px)] flex items-center bg-slate-900 overflow-hidden">
      {/* Background Trader Image */}
      <Image
        src="/images/hero-bg-trader.jpg"
        alt="DigitalXTrade Trader"
        fill
        priority
        className="object-cover object-right opacity-90"
      />

      {/* Light Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100/90 via-slate-100/50 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-16">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#00529b] leading-[1.05]">
            EARN WITHOUT<br />
            COMPROMISE
          </h1>

          <p className="text-slate-700 text-lg md:text-xl font-medium max-w-lg leading-relaxed pt-2">
            Discover a premium trading experience based on awarded platforms.
          </p>

          <div className="pt-2">
            <Link
              href="/register"
              className="inline-block bg-[#0085d0] hover:bg-[#0072ce] text-white font-extrabold px-16 py-3.5 rounded text-xs md:text-sm tracking-wider uppercase transition-colors shadow-lg text-center min-w-[280px] md:min-w-[320px]"
            >
              OPEN ACCOUNT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
