'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function StatsCounterSection() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const [accounts, setAccounts] = useState(1);
  const [visitors, setVisitors] = useState(1);
  const [deposit, setDeposit] = useState(1);
  const [withdraw, setWithdraw] = useState(1);

  const targetAccounts = 57730;
  const targetVisitors = 964;
  const targetDeposit = 8363642891;
  const targetWithdraw = 9835726478;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - (1 - progress) * (1 - progress);

      setAccounts(Math.floor(1 + (targetAccounts - 1) * easeProgress));
      setVisitors(Math.floor(1 + (targetVisitors - 1) * easeProgress));
      setDeposit(Math.floor(1 + (targetDeposit - 1) * easeProgress));
      setWithdraw(Math.floor(1 + (targetWithdraw - 1) * easeProgress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated]);

  const formatCurrency = (val) => {
    return '$ ' + val.toLocaleString('en-US');
  };

  const formatNumber = (val) => {
    return val.toLocaleString('en-US');
  };

  return (
    <section ref={sectionRef} className="bg-[#f8fafd] border-b border-gray-200 py-10 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          
          {/* Total Accounts */}
          <div className="py-6 sm:py-0 text-center px-2 space-y-2">
            <span className="text-gray-500 text-sm font-medium tracking-wide">
              Total accounts
            </span>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#4a5568] tracking-tight whitespace-nowrap">
              {formatNumber(accounts)}
            </div>
          </div>

          {/* Visitors Online */}
          <div className="py-6 sm:py-0 text-center px-2 space-y-2">
            <span className="text-gray-500 text-sm font-medium tracking-wide">
              Visitors online
            </span>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#4a5568] tracking-tight whitespace-nowrap">
              {formatNumber(visitors)}
            </div>
          </div>

          {/* Last Deposit */}
          <div className="py-6 sm:py-0 text-center px-2 space-y-2">
            <span className="text-gray-500 text-sm font-medium tracking-wide">
              Last deposit
            </span>
            <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#4a5568] tracking-tight whitespace-nowrap">
              {formatCurrency(deposit)}
            </div>
          </div>

          {/* Last Withdraw */}
          <div className="py-6 sm:py-0 text-center px-2 space-y-2">
            <span className="text-gray-500 text-sm font-medium tracking-wide">
              Last withdraw
            </span>
            <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#4a5568] tracking-tight whitespace-nowrap">
              {formatCurrency(withdraw)}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
