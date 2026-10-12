'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center bg-slate-900 overflow-hidden">
      {/* Background Executive Trader Image - Optimized for Mobile & Desktop */}
      <Image
        src="/images/hero-bg-trader.jpg"
        alt="DigitalXTrade Executive Trader"
        fill
        priority
        className="object-cover object-[78%_center] sm:object-right opacity-95"
      />

      {/* Light Overlay Gradient for Crisp Text Legibility on Left */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent sm:from-white/90 sm:via-white/50 sm:to-transparent pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full py-12 sm:py-16 md:py-20">
        <div className="max-w-xl md:max-w-2xl space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#00529b] leading-[1.1] uppercase">
            EARN WITHOUT<br />
            COMPROMISE
          </h1>

          <p className="text-slate-700 text-sm sm:text-base md:text-xl font-medium max-w-md md:max-w-lg leading-relaxed">
            Discover a premium trading experience based on awarded platforms.
          </p>

          {/* Desktop Call to Action Button */}
          <div className="hidden md:block pt-4">
            <Link
              href="/register"
              className="inline-block bg-[#0085d0] hover:bg-[#0072ce] text-white font-extrabold px-14 py-3.5 rounded text-xs md:text-sm tracking-wider uppercase transition-colors shadow-lg text-center"
            >
              OPEN ACCOUNT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
