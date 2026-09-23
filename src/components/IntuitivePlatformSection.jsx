'use client';

import React from 'react';
import Link from 'next/link';

export default function IntuitivePlatformSection() {
  const points = [
    'Powerful, fast and secure',
    'Professional charting system',
    'Customisable workspaces',
    'Free live quotes and real-time news'
  ];

  return (
    <section className="bg-white py-20 border-b border-gray-100 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center max-w-6xl mx-auto">
          
          {/* Left Overlapping White Card */}
          <div className="lg:col-span-6 z-10">
            <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 border border-gray-100 space-y-6 text-left lg:-mr-12 relative">
              <h2 className="text-3xl sm:text-5xl font-black text-[#0055a5] tracking-tight leading-tight">
                A powerful and<br />intuitive platform
              </h2>

              <p className="text-gray-600 text-base font-medium leading-relaxed">
                Trade anytime and anywhere with our premium Platform.
              </p>

              <ul className="space-y-3 pt-2 text-sm font-semibold text-gray-700">
                {points.map((pt, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <span className="text-[#0088cc] font-black text-sm">❯</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Link
                  href="/register"
                  className="inline-block px-8 py-3 rounded border-2 border-[#0088cc] text-[#0088cc] hover:text-[#38bdf8] hover:bg-slate-50 font-extrabold text-sm uppercase tracking-wider transition-all"
                >
                  FIND OUT MORE
                </Link>
              </div>
            </div>
          </div>

          {/* Right Trading Laptop Image */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
              <img
                src="/images/trading-platform-laptop.jpg"
                alt="DigitalXTrade Trading Platform Laptop"
                className="w-full h-[450px] sm:h-[520px] object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
