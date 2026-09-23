'use client';

import React from 'react';
import { Shrink, Power, AppWindow } from 'lucide-react';

export default function AboutStorySection() {
  return (
    <section className="bg-white py-16 px-4 md:px-8 max-w-6xl mx-auto font-sans text-slate-800 space-y-20 border-t border-slate-100">
      {/* PART 1: Market-leading customer service */}
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Market-leading customer service.
        </h2>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-12 font-medium">
          At digitalxtrade.com, we quickly solve your problems over the phone, Monday to Friday, 8.00am to 9.00pm. Plus, we have an emergency 24 hour service.
        </p>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Item 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center mb-4 bg-slate-50 shadow-sm text-[#0072ce]">
              <Shrink className="w-8 h-8 stroke-[1.5]" />
            </div>
            <p className="text-slate-700 text-xs md:text-sm font-medium leading-relaxed max-w-xs">
              Join the most used platform in Europe with pioneering tools and features.
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center mb-4 bg-slate-50 shadow-sm text-[#0072ce]">
              <Power className="w-8 h-8 stroke-[1.5]" />
            </div>
            <p className="text-slate-700 text-xs md:text-sm font-medium leading-relaxed max-w-xs">
              Access a world of investment opportunities with a click.
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center mb-4 bg-slate-50 shadow-sm text-[#0072ce]">
              <AppWindow className="w-8 h-8 stroke-[1.5]" />
            </div>
            <p className="text-slate-700 text-xs md:text-sm font-medium leading-relaxed max-w-xs">
              Platform services from one single, multicurrency account.
            </p>
          </div>
        </div>
      </div>

      {/* PART 2: Find out more about digitalxtrade.com's success story */}
      <div className="max-w-4xl mx-auto pt-6 text-left">
        <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Find out more about digitalxtrade.com's success story.
        </h3>
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-normal text-justify">
          Since launching in 1999, digitalxtrade.com's mission has been to enhance the experience of online platform. Our business model allows us to offer a range of financial services designed to meet our clients' banking and investment needs, which they can access from an innovative and user-friendly platform. This unique approach has helped distinguish us from our competitors and become the world's most recommended investment platform.
        </p>
      </div>
    </section>
  );
}
