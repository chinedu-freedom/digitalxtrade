'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderNav from '@/components/HeaderNav';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';
import { ChevronRight, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function SupportPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-800 relative">
      <HeaderNav />

      {/* BREADCRUMB BAR */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-2.5 px-4 md:px-8 text-xs font-medium text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="text-[#0085d0] hover:underline">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-700">Contacts</span>
        </div>
      </div>

      {/* HERO BANNER SECTION */}
      <section className="relative w-full h-[380px] md:h-[440px] bg-slate-900 overflow-hidden">
        <Image
          src="/images/support-hero-banner.jpg"
          alt="We have the answer you need"
          fill
          priority
          className="object-cover object-center opacity-85"
        />
        {/* Dark subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 md:px-12 text-white">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 drop-shadow-md">
            We have the answer you need.
          </h1>
          <p className="text-base md:text-xl font-medium max-w-xl text-slate-200 mb-8 leading-relaxed">
            Instant caring via email, chat or on the phone.
          </p>

          <div>
            <Link
              href="/register"
              className="inline-block bg-[#0085d0] hover:bg-[#0072ce] text-white font-extrabold px-16 py-3.5 rounded text-xs md:text-sm tracking-wider uppercase transition-colors shadow-lg text-center min-w-[280px] md:min-w-[320px]"
            >
              OPEN ACCOUNT
            </Link>
          </div>
        </div>
      </section>

      {/* HOW CAN WE HELP SECTION */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#00529b] tracking-tight mb-4">
          How can we help?
        </h2>
        <p className="text-xs md:text-sm font-bold text-slate-700 tracking-wider uppercase mb-2">
          GET IN TOUCH VIA EMAIL OR TELEPHONE
        </p>
        <p className="text-slate-600 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
          We are here to answer any question about our products or services, or help you opening an account.
        </p>
      </section>

      {/* DROP US A LINE FORM SECTION */}
      <section className="py-12 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="bg-[#f8f9fa] p-8 md:p-12 rounded-lg border border-slate-200/80 shadow-sm text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Drop us a line
          </h3>

          {/* Envelope Icon */}
          <div className="w-16 h-16 mx-auto mb-8 rounded-full border border-[#0085d0] flex items-center justify-center text-[#0085d0] bg-white shadow-sm">
            <Mail className="w-8 h-8 stroke-[1.5]" />
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-lg max-w-md mx-auto flex items-center justify-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <span className="text-sm font-bold">Thank you! Your request has been sent successfully. Our support team will get back to you shortly.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto text-left space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#0085d0] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#0085d0] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">Leave your request here</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#0085d0] transition-colors resize-none"
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="bg-[#0085d0] hover:bg-[#0072ce] text-white font-extrabold px-20 py-3.5 rounded text-xs md:text-sm tracking-wider uppercase transition-colors shadow-md min-w-[280px] md:min-w-[320px]"
                >
                  SEND
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* GET IN TOUCH BY PHONE SECTION */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          Get in touch by phone
        </h3>
        <p className="text-3xl md:text-4xl font-extrabold text-[#52b736] tracking-tight mb-10">
          +44 Coming Soon
        </p>

        {/* Center Call Center Image */}
        <div className="max-w-2xl mx-auto relative h-[300px] md:h-[380px] rounded-lg overflow-hidden shadow-md border border-slate-200 mb-16">
          <Image
            src="/images/client-support.jpg"
            alt="Customer Representative Team"
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Disclaimer Text */}
        <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto">
          This advertising message is for promotional purposes only. To view all the terms and conditions for the advertised services, please refer to the fact sheets and documentation required under current regulations. All services require the client to open a digitalxtrade.com current account.
        </p>
      </section>

      <FloatingWidgets />
      <Footer />
    </main>
  );
}
