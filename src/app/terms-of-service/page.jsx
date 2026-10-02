'use client';

import React from 'react';
import Link from 'next/link';
import HeaderNav from '@/components/HeaderNav';
import SubNav from '@/components/SubNav';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';
import { ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <HeaderNav />
      <SubNav />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-[#003e6b] to-slate-900 text-white py-12 px-4 sm:px-6 shadow-md border-b border-slate-700">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0085d0]/30 border border-[#0085d0]/50 text-xs font-bold text-blue-200 uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-[#0085d0]" />
            Legal & Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Terms of Service
          </h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl">
            Please read these Terms and Conditions carefully before using the DigitalXTrade platform services.
          </p>
        </div>
      </section>

      {/* Content Container */}
      <section className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-10 space-y-6 text-slate-800 text-sm leading-relaxed">
          
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#0085d0]" />
              1. Agreement to Terms
            </h2>
            <p className="text-slate-600">
              By registering an account on DigitalXTrade, you agree to comply with and be legally bound by these Terms of Service. If you do not agree to these terms, you must not access or use our services.
            </p>
          </div>

          <hr className="border-slate-200" />

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#0085d0]" />
              2. Account Registration & Eligibility
            </h2>
            <p className="text-slate-600">
              To use our investment services, you must be at least 18 years of age and reside in a jurisdiction where cryptocurrency staking and digital asset investments are permitted by law. You are responsible for maintaining the confidentiality of your login credentials.
            </p>
          </div>

          <hr className="border-slate-200" />

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0085d0]" />
              3. Deposits & Withdrawals
            </h2>
            <ul className="list-disc pl-5 text-slate-600 space-y-2">
              <li>All deposits are processed securely through supported cryptocurrency networks (Bitcoin, USDT TRC20, USDT BEP20, and Litecoin).</li>
              <li>Withdrawals requested from Profit Balance incur 0.00% platform commission fees.</li>
              <li>Capital withdrawals requested directly from Deposit Balance incur a 50.00% early capital redemption fee.</li>
              <li>Automated payouts are processed within 1 to 60 minutes after security confirmation.</li>
            </ul>
          </div>

          <hr className="border-slate-200" />

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#0085d0]" />
              4. Amendments
            </h2>
            <p className="text-slate-600">
              DigitalXTrade reserves the right to update or modify these Terms of Service at any time. Continued use of the platform after changes take effect constitutes acceptance of the new terms.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <Link
              href="/register"
              className="bg-[#0085d0] hover:bg-[#0072ce] text-white font-bold px-6 py-2.5 rounded text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              Back to Registration
            </Link>
          </div>

        </div>
      </section>

      <FloatingWidgets />
      <Footer />
    </main>
  );
}
