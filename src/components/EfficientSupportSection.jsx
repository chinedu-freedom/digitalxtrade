'use client';

import React from 'react';
import Link from 'next/link';

export default function EfficientSupportSection() {
  const supportBullets = [
    'Direct support via telephone, email, or chat',
    'Skilled trading specialist support team',
    'Available Monday - Friday from 8am to 9pm',
    '96% customer service satisfaction rate'
  ];

  return (
    <section className="bg-white py-20 border-b border-gray-100 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Split Section: Image Left, Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center max-w-6xl mx-auto">
          {/* Left Image */}
          <div className="lg:col-span-7 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
              <img
                src="/images/client-support.jpg"
                alt="DigitalXTrade Client Support Specialist"
                className="w-full h-[450px] sm:h-[520px] object-cover object-center"
              />
            </div>
          </div>

          {/* Right Overlapping Card */}
          <div className="lg:col-span-5 z-10">
            <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-100 space-y-6 text-left lg:-ml-16 relative">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0055a5] tracking-tight leading-tight">
                Efficient client<br />support
              </h2>

              <p className="text-gray-600 text-sm font-medium leading-relaxed">
                Fast and effective customer care, with a very short wait time.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-gray-700">
                {supportBullets.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <span className="text-[#0088cc] font-black text-sm">❯</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/register"
                  className="px-6 py-3 rounded border-2 border-[#0088cc] text-[#0088cc] hover:text-[#38bdf8] hover:bg-slate-50 font-extrabold text-xs uppercase tracking-wider transition-all"
                >
                  OPEN ACCOUNT
                </Link>

                <Link
                  href="#about"
                  className="px-6 py-3 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs uppercase tracking-wider transition-all"
                >
                  MORE ABOUT US
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
