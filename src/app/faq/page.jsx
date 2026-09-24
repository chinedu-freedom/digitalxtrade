'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderNav from '@/components/HeaderNav';
import WhyChooseSection from '@/components/WhyChooseSection';
import BroadenTradingSection from '@/components/BroadenTradingSection';
import StartTradingSection from '@/components/StartTradingSection';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';
import { ChevronRight, ChevronDown, Search } from 'lucide-react';

const faqItems = [
  {
    q: 'Who can invest in digitalxtrade.com?',
    a: 'Any individual or corporate entity over 18 years old from supported countries can register an account and start investing with digitalxtrade.com.'
  },
  {
    q: 'What do I need in order to open an account?',
    a: 'You only need a valid email address, a password, and basic identification details. Registration takes less than 2 minutes and is completely free.'
  },
  {
    q: 'Can I open more than one account in my name?',
    a: 'No, each client is permitted to operate one primary account for security and regulatory compliance. However, within your account you can manage multiple currency wallets.'
  },
  {
    q: 'My account was stolen. What do I need to do now?',
    a: 'Immediately contact our 24/7 security support team at support@digitalxtrade.com or click Live Chat to freeze your account and reset your access credentials.'
  },
  {
    q: "What does 'Account Balance' mean?",
    a: 'Account Balance represents the total amount of available funds in your account, including active deposits, accrued earnings, and uninvested cash.'
  },
  {
    q: 'Can you explain the meanings of "Daily Profit"?',
    a: 'Daily Profit refers to the net returns generated on your active investment plans every 24 hours, calculated automatically based on your chosen strategy.'
  },
  {
    q: 'How can I make a deposit?',
    a: "Log into your client portal, navigate to 'Deposits', choose your preferred payment method (Crypto, Bank Wire, Credit Card, Debit Card), enter the amount, and confirm the transaction."
  },
  {
    q: 'What is the minimum to invest?',
    a: 'The minimum deposit starting amount is $100 depending on your selected investment tier (Foundation Plan starts at $100).'
  },
  {
    q: 'Which payment systems do you accept?',
    a: 'We accept Bitcoin (BTC), Ethereum (ETH), USDT (TRC20/ERC20), Bank Wire Transfers, Visa, Mastercard, and instant multi-currency debit card transfers.'
  },
  {
    q: 'Can I make additional investments at any time?',
    a: 'Yes, you can add funds or launch additional investment plans at any time directly from your user dashboard.'
  },
  {
    q: 'After making a deposit, it is not appearing in my account.',
    a: 'Blockchain transactions require network confirmations (typically 1-3 confirmations). If your deposit takes longer than 30 minutes, submit your TXID to our support desk.'
  },
  {
    q: 'I want to withdraw my profit, how can I do that?',
    a: "Navigate to 'Withdrawals' in your portal, specify your payout address or bank account, enter the withdrawal amount, and click submit."
  },
  {
    q: 'What is the minimum amount to withdraw?',
    a: 'The minimum withdrawal threshold is $10 across all supported payment methods with no hidden penalty fees.'
  },
  {
    q: 'How soon will you process a withdrawal request?',
    a: 'Most withdrawal requests are processed automatically within 1 to 2 hours, and guaranteed within a maximum of 24 hours.'
  },
  {
    q: 'How much is the withdrawal fee ?',
    a: 'digitalxtrade.com charges 0% withdrawal fees on standard transfers. Network gas/blockchain transaction fees may apply depending on the asset.'
  },
  {
    q: 'How much referral commission do I receive?',
    a: 'Our multi-tier affiliate program pays up to 10% instant referral commission on deposits made by your invited direct clients.'
  },
  {
    q: 'Do I need to invest if I want to start referring others and earn referral commissions?',
    a: 'No, having an active deposit is not mandatory to participate in our affiliate program and earn referral commissions.'
  },
  {
    q: "What does the link called 'Your affiliate link' mean?",
    a: 'Your unique affiliate referral link allows you to invite new investors. Anyone who registers via your link is permanently tagged as your referral.'
  },
  {
    q: 'How much is the Deposit fee ?',
    a: 'All deposits on digitalxtrade.com are 100% free with 0% platform deposit fees.'
  },
  {
    q: 'Do you pay referral commission from deposits from balance?',
    a: 'Yes, referral commissions are credited instantly whenever a referral makes a deposit from external wallets or re-invests internal funds.'
  }
];

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = faqItems.filter(item =>
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-800 relative">
      <HeaderNav />

      {/* BREADCRUMB BAR */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-2.5 px-4 md:px-8 text-xs font-medium text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5">
          <Link href="/" className="text-[#0085d0] hover:underline">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-700">Frequently asked questions</span>
        </div>
      </div>

      {/* HERO BANNER SECTION */}
      <section className="relative w-full h-[360px] md:h-[420px] bg-slate-900 overflow-hidden">
        <Image
          src="/images/skyscrapers-architecture.jpg"
          alt="It's a trading revolution"
          fill
          priority
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 md:px-12 text-white">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 drop-shadow-md uppercase">
            IT'S A TRADING REVOLUTION
          </h1>
          <p className="text-base md:text-xl font-medium max-w-xl text-slate-200 mb-8 leading-relaxed">
            Get inspired by 26 global markets and 0$ equities &amp; options.
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

      {/* MAIN FAQ CONTENT */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#00529b] text-center mb-8 tracking-tight">
          Frequently asked questions
        </h2>

        {/* SEARCH FILTER BAR */}
        <div className="relative max-w-2xl mx-auto mb-10">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 pl-11 text-sm focus:outline-none focus:border-[#0085d0] transition-all shadow-sm"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <p className="text-center text-slate-500 py-8 text-sm">
              No matching questions found for "{searchQuery}".
            </p>
          ) : (
            filteredFaqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-slate-200 border-l-4 border-l-[#0072ce] overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 font-bold text-sm md:text-base text-[#00529b] hover:bg-slate-50/50 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0085d0]' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/30">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      <WhyChooseSection />
      <BroadenTradingSection />
      {/* <StartTradingSection /> */}

      <FloatingWidgets />
      <Footer />
    </main>
  );
}
