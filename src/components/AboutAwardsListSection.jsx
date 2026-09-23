'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function AboutAwardsListSection() {
  const awardsList = [
    {
      title: 'BEST BROKER FOR GLOBAL TRADING 2021',
      description: 'ADVFN International Financial Awards awarded digitalxtrade.com as:',
      bullets: [
        'Best Broker for global trading',
        'Best live trading events'
      ]
    },
    {
      title: 'BEST PROVIDER OF THE YEAR 2020',
      description: 'The London Forex Show awarded digitalxtrade.com as:',
      bullets: [
        'Best trading tools',
        'Best trading platform',
        'Best provider of the year'
      ]
    },
    {
      title: 'BEST LIVE TRADING EVENTS 2020',
      description: 'AdvFn awarded digitalxtrade.com as Best Live Trading Events company'
    },
    {
      title: 'ALESSANDRO FOTI BEST EUROPEAN CEO 2018',
      description: 'Institutional Investor awarded Alessandro Foti as the best CEO in Europe in the banking category (Small & Mid-Cap) and included digitalxtrade.com among the "Most Honored Companies".'
    },
    {
      title: 'THE LONDON FOREX SHOW AWARDS 2018',
      description: 'The London Forex Show awarded digitalxtrade.com as:',
      bullets: [
        'Best Forex Provider of the Year 2018',
        'Best Forex Trading Platform',
        'Best Forex New Entrant 2018',
        'Best Forex Trading Tools'
      ]
    },
    {
      title: 'FINECO AWARDED BY THE BRITISH GOVERNMENT',
      description: 'digitalxtrade.com won the "UK-Italy Business Awards" of the British Government assigned by the Department for International Trade, based at the British Consulate In Milan.',
      subcaption: 'Department for International Trade of the British Government.'
    },
    {
      title: 'NO. 1 FOR SOLIDITY AS WELL',
      description: 'digitalxtrade.com is the top-ranked Italian trading platform on the FTSE Mib in terms of capital ratio (CET1), updated for the first half of 2017.',
      subcaption: 'Updated Money.it league table based on CET1 ratio (Common Equity Tier 1 ratio).'
    },
    {
      title: 'CUSTOMER SERVICE',
      description: 'Independent research by KPMG ranked digitalxtrade.com as the sixth best company in Italy for customer experience and best in the investment sector.'
    },
    {
      title: 'FONTI AWARDS 2017',
      description: 'digitalxtrade.com won "Best Private Investment Team" at the 2017 Fonti Awards.'
    },
    {
      title: 'INSTITUTIONAL INVESTOR AWARDS 2017',
      description: 'In 2017, Alessandro Foti was named Best European CEO in the small & mid-cap investment sector.'
    },
    {
      title: 'GLOBAL BRANDS MAGAZINE 2017',
      description: 'Global Brands Magazine awarded digitalxtrade.com:',
      bullets: [
        'Best Financial Brand, Italy',
        'Most Innovative Financial Advisory Brand, Italy',
        'Best Custom Financial Advisory Brand, Italy',
        'Most Trusted Financial Advisory Brand, Italy'
      ]
    },
    {
      title: 'BRAND ADVOCACY INDEX',
      description: "digitalxtrade.com is the world's most recommended investment platform by word of mouth, according to a survey by The Boston Consulting Group."
    },
    {
      title: 'WORLD FINANCE 100',
      description: 'World Finance 100 magazine listed digitalxtrade.com in the top 100 corporations of 2015.'
    },
    {
      title: 'GLOBAL BRANDS MAGAZINE 2016',
      description: 'Global Brands Magazine awarded digitalxtrade.com:',
      bullets: [
        'The Most Innovative Financial Brand, Italy',
        'The Best Financial Brand, Italy',
        'The Most Innovative Financial Advisory Brand, Italy'
      ]
    },
    {
      title: 'WEBSITE OF THE YEAR 2016',
      description: 'digitalxtrade.com won "Best Website" and "Most Popular Website" in the Banking and Finance Activity category.'
    }
  ];

  return (
    <section className="bg-white py-16 px-4 md:px-8 max-w-5xl mx-auto font-sans text-slate-800 border-t border-slate-100">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-14 tracking-tight">
        Global recognition
      </h2>

      <div className="space-y-10 max-w-4xl mx-auto">
        {awardsList.map((award, idx) => (
          <div key={idx} className="flex items-start gap-4 md:gap-6">
            {/* Star Badge Icon */}
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-10 h-10 overflow-visible" viewBox="0 0 24 24" fill="none">
                <defs>
                  <clipPath id={`top-half-clip-${idx}`}>
                    <rect x="0" y="0" width="24" height="11" />
                  </clipPath>
                </defs>
                <path
                  d="M12 2L14.8 8.5H21.5L16 12.8L18.2 19.5L12 15.2L5.8 19.5L8 12.8L2.5 8.5H9.2L12 2Z"
                  stroke="#00529b"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 2L14.8 8.5H21.5L16 12.8L18.2 19.5L12 15.2L5.8 19.5L8 12.8L2.5 8.5H9.2L12 2Z"
                  stroke="#ffd700"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  clipPath={`url(#top-half-clip-${idx})`}
                />
              </svg>
            </div>

            {/* Award Info */}
            <div className="pt-0.5">
              <h3 className="text-sm md:text-base font-extrabold text-slate-900 uppercase tracking-wide mb-1">
                {award.title}
              </h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
                {award.description}
              </p>

              {/* Bullet points if any */}
              {award.bullets && (
                <ul className="mt-2 space-y-1 text-xs md:text-sm text-slate-600 font-medium pl-0.5">
                  {award.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-[#00529b] shrink-0 stroke-[2.5]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Sub-caption if any */}
              {award.subcaption && (
                <p className="mt-1.5 text-xs text-slate-400 font-medium">
                  {award.subcaption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

