'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#00529b] text-white py-14 px-6 md:px-12 font-sans border-t border-[#00427c]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpeg"
            alt="DigitalXTrade Logo"
            className="w-9 h-9 aspect-square object-cover shrink-0"
          />
          <span className="text-xl font-black tracking-wider text-white">
            DIGITAL<span className="text-sky-300">X</span>TRADE
          </span>
        </div>

        {/* Navigation Links Row */}
        <div className="flex flex-wrap items-center gap-3 text-sm md:text-base font-bold">
          <Link href="/about" className="hover:underline transition-all">About Us</Link>
          <span className="text-white/60 font-light">|</span>
          <Link href="/investments" className="hover:underline transition-all">Investments</Link>
          <span className="text-white/60 font-light">|</span>
          <Link href="/faq" className="hover:underline transition-all">FAQ</Link>
          <span className="text-white/60 font-light">|</span>
          <Link href="/support" className="hover:underline transition-all">Support</Link>
        </div>

        {/* Registered Office */}
        <div className="text-xs md:text-sm text-white/90 font-medium">
          digitalxtrade.com - Registered Office 15 Kilravock Street, Kensington, London, W10 4HX
        </div>

        {/* Regulatory Disclosure Text */}
        <div className="text-xs md:text-sm text-white/80 leading-relaxed font-normal space-y-4 max-w-6xl">
          <p>
            digitalxtrade.com is a trademark licensed for use by digitalxtrade.com, authorised and regulated by digitalxtrade.com. Deemed authorised by the Prudential Regulation Authority. Subject to regulation by the Financial Conduct Authority and limited regulation by the Prudential Regulation Authority. The nature and extent of consumer protections may differ from those for firms based in the UK. Details of the Temporary Permissions Regime, which allows EEA-based firms to operate in the UK for a limited period while seeking full authorisation, are available on the Financial Conduct Authority's website.
          </p>
        </div>
      </div>
    </footer>
  );
}
