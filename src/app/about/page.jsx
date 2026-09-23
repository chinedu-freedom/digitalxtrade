'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderNav from '@/components/HeaderNav';
import AboutFeaturesSection from '@/components/AboutFeaturesSection';
import AboutStorySection from '@/components/AboutStorySection';
import AboutTimelineAndFiguresSection from '@/components/AboutTimelineAndFiguresSection';
import AboutManagementSection from '@/components/AboutManagementSection';
import AboutAwardsListSection from '@/components/AboutAwardsListSection';
import AboutCertificateSection from '@/components/AboutCertificateSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import WorldOfInvestmentsSection from '@/components/WorldOfInvestmentsSection';
import StartTradingSection from '@/components/StartTradingSection';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';
import { Layers, PieChart, Landmark, Award, ChevronRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-800 relative">
      <HeaderNav />

      {/* BREADCRUMB BAR */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-2.5 px-4 md:px-8 text-xs font-medium text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="text-[#0072ce] hover:underline">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-700">Why digitalxtrade.com</span>
        </div>
      </div>

      {/* HERO BANNER SECTION */}
      <section className="relative w-full h-[420px] md:h-[480px] bg-slate-900 overflow-hidden">
        <Image
          src="/images/about-hero-woman.jpg"
          alt="Why digitalxtrade.com"
          fill
          priority
          className="object-cover object-center opacity-85"
        />
        {/* Dark subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 md:px-12 text-white">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 drop-shadow-md">
            Why digitalxtrade.com.
          </h1>
          <p className="text-base md:text-xl font-medium max-w-xl text-slate-200 mb-2 leading-relaxed">
            Find out why we are the world's most recommended platform.
          </p>
          <p className="text-sm md:text-base font-bold tracking-wider text-slate-300 uppercase mb-8">
            FIND OUT WHO WE ARE.
          </p>

          <div>
            <Link
              href="/register"
              className="inline-block bg-[#0085d0] hover:bg-[#0072ce] text-white font-bold px-8 py-3.5 rounded text-xs md:text-sm tracking-wider uppercase transition-colors shadow-lg"
            >
              OPEN ACCOUNT
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: NEW IN UK, BUT WITH 12 YEARS OF EXPERIENCE */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto text-slate-800">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#00529b] tracking-tight mb-4">
            New in UK, but with 12 years of experience.
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-3xl mx-auto font-medium leading-relaxed">
            We are not just another trading platform. Putting your money in the hands of a platform requires huge confidence. And that's what we offer.
          </p>
        </div>

        {/* 2x2 FEATURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 max-w-5xl mx-auto">
          {/* Item 1 */}
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center shrink-0 bg-slate-50 shadow-sm">
              <Layers className="w-7 h-7 text-[#0072ce] stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                LISTED COMPANY
              </h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                One of Europe's largest platforms, listed and part of Euro Stoxx 600.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center shrink-0 bg-slate-50 shadow-sm">
              <PieChart className="w-7 h-7 text-[#0072ce] stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                FINANCIAL STRENGTH
              </h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                Over 1.3 million clients in Italy and &pound;82.4 billion in total financial assets.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center shrink-0 bg-slate-50 shadow-sm">
              <Landmark className="w-7 h-7 text-[#0072ce] stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                A GLOBAL AWARD-WINNER
              </h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                Recognised and awarded for best platform, provider and live trading events of the year.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center shrink-0 bg-slate-50 shadow-sm">
              <Award className="w-7 h-7 text-[#0072ce] stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                LEADER ON BROKERAGE
              </h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                20+ years in brokerage, 30+ mln orders processed every year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ALTERNATING ABOUT FEATURE CARDS */}
      <AboutFeaturesSection />
      <AboutStorySection />
      <AboutTimelineAndFiguresSection />
      <AboutManagementSection />
      <AboutAwardsListSection />
      <AboutCertificateSection />

      {/* CONTINUATION SECTIONS */}
      <WhyChooseSection />
      <WorldOfInvestmentsSection />
      <StartTradingSection />

      <FloatingWidgets />
      <Footer />
    </main>
  );
}
