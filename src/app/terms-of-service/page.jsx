'use client';

import React from 'react';
import Link from 'next/link';
import HeaderNav from '@/components/HeaderNav';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';
import { Shield, CheckCircle, ArrowLeft, UserPlus } from 'lucide-react';

const TERMS = [
  {
    num: '1',
    title: 'Account',
    desc: 'Users must provide accurate information and are responsible for keeping their account details secure.',
  },
  {
    num: '2',
    title: 'Deposits & Activation',
    desc: 'All deposits must be made using the payment methods and instructions provided on the Digitalxtrade platform. A plan becomes active after the required deposit and activation process is completed.',
  },
  {
    num: '3',
    title: 'Daily Cycle',
    desc: 'Digitalxtrade operates on a 24-hour cycle. Each active plan is processed once per day according to the terms of the selected plan. Users should allow the full 24-hour cycle to be completed before expecting the next applicable update.',
  },
  {
    num: '4',
    title: 'Withdrawals',
    desc: 'Withdrawal requests are subject to the minimum withdrawal amount, applicable fees, processing conditions, and other requirements displayed on the platform.',
  },
  {
    num: '5',
    title: 'User Responsibility',
    desc: 'Users are responsible for entering correct payment and withdrawal details. Digitalxtrade is not responsible for losses caused by incorrect information supplied by a user.',
  },
  {
    num: '6',
    title: 'Prohibited Activities',
    desc: 'Fraud, unauthorized access, manipulation, multiple unauthorized accounts, or any unlawful use of the platform is prohibited and may result in account restriction or termination.',
  },
  {
    num: '7',
    title: 'Changes & Maintenance',
    desc: 'Digitalxtrade may update its services, plans, fees, or terms when necessary. Temporary maintenance or technical interruptions may occur.',
  },
  {
    num: '8',
    title: 'Risk Notice',
    desc: 'Financial and digital-asset activities involve risk. Users should understand the terms of a plan before committing funds.',
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <HeaderNav />

      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-xs font-semibold text-[#0085d0] uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            Rules & Agreements
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">
            DIGITAL<span className="text-[#0085d0]">X</span>TRADE TERMS & SERVICES
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            By creating an account and using Digitalxtrade, you agree to the following terms:
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden divide-y divide-slate-100">
          {TERMS.map((item) => (
            <div
              key={item.num}
              className="p-5 sm:p-6 md:p-7 hover:bg-slate-50/50 transition-colors flex items-start gap-4 sm:gap-5"
            >
              <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-sky-50 text-[#0085d0] font-black text-sm shrink-0 border border-sky-100">
                {item.num}
              </div>
              <div className="flex-1 pt-0.5">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 tracking-tight">
                  {item.num}. {item.title}
                </h2>
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Agreement Conclusion */}
          <div className="p-6 sm:p-8 bg-sky-50/40 border-t border-sky-100/80">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#0085d0] shrink-0 mt-0.5" />
              <p className="text-slate-800 text-sm sm:text-[15px] font-medium leading-relaxed">
                By using Digitalxtrade, you confirm that you have read, understood, and agreed to these Terms & Services.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold text-xs sm:text-sm tracking-wide transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#0085d0] hover:bg-[#0072ce] text-white font-bold text-xs sm:text-sm tracking-wide transition-colors shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            Open Account / Register
          </Link>
        </div>
      </section>

      <FloatingWidgets />
      <Footer />
    </main>
  );
}
