'use client';

import React from 'react';
import Link from 'next/link';

export default function StartTradingSection() {
  return (
    <section className="bg-[#f8f9fa] py-20 px-4 md:px-8 font-sans border-t border-slate-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#00529b] tracking-tight mb-4">
          Start trading without compromise
        </h2>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-10 font-medium">
          Create your online platform account and explore our easy-to-use trading platform. Trade without compromise starting from 0.00$ commission on FTSE100, US and EU Shares CFDs, market spread only and no additional markup. Opening your account is free, with no obligation to fund or trade.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="w-full sm:w-auto bg-[#0085d0] hover:bg-[#0072ce] text-white px-8 py-3.5 rounded font-bold text-xs md:text-sm tracking-wider uppercase transition-colors shadow-sm text-center"
          >
            OPEN AN ACCOUNT
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto bg-white border border-[#0085d0] text-[#0085d0] hover:text-[#38bdf8] hover:bg-slate-50 px-8 py-3.5 rounded font-bold text-xs md:text-sm tracking-wider uppercase transition-colors text-center"
          >
            CLIENT LOGIN
          </Link>
        </div>
      </div>
    </section>
  );
}
