'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const plans = [
  { id: 'foundation', name: 'Foundation Plan', percent: 35.00, min: 50 },
  { id: 'acceleration', name: 'Acceleration Plan', percent: 55.00, min: 5000 },
  { id: 'stability', name: 'Stability Plan', percent: 85.00, min: 20000 },
  { id: 'wealth', name: 'Wealth Plan', percent: 120.00, min: 50000 }
];

export default function ProfitCalculatorSection() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [depositAmount, setDepositAmount] = useState(50);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const calculateTotalReturn = () => {
    const amount = Number(depositAmount) || 0;
    const returnAmount = amount * (1 + selectedPlan.percent / 100);
    return returnAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <section className="bg-white py-14 md:py-20 px-4 sm:px-6 md:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#00529b] text-center mb-10 md:mb-12 tracking-tight">
          Profit calculator
        </h2>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Custom Shadcn UI Style Select Dropdown */}
          <div ref={dropdownRef} className="relative">
            <label className="block text-slate-600 text-sm md:text-base font-normal mb-2">
              Choose your Investment plan
            </label>
            
            {/* Trigger Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-slate-700 text-sm md:text-base font-medium flex items-center justify-between shadow-xs hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00529b]/20 transition-all cursor-pointer"
            >
              <span>{selectedPlan.name}</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#00529b]' : ''}`} />
            </button>

            {/* Custom Popover Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-lg shadow-xl z-30 overflow-hidden py-1 animate-in fade-in-80 zoom-in-95 duration-150">
                {plans.map((plan) => {
                  const isSelected = selectedPlan.id === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => {
                        setSelectedPlan(plan);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-[#0072ce] text-white font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{plan.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Deposit Amount Input */}
          <div>
            <label className="block text-slate-600 text-sm md:text-base font-normal mb-2">
              Enter deposit amount
            </label>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-slate-700 text-sm md:text-base font-medium focus:outline-none focus:border-[#00529b] focus:ring-2 focus:ring-[#00529b]/20 shadow-xs transition-all"
            />
          </div>
        </div>

        {/* Results Container with Vertical Divider */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-center justify-center text-center">
          {/* Total Return */}
          <div className="px-4 py-2">
            <span className="block text-slate-500 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2">
              TOTAL RETURN
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-black text-[#00529b] tracking-tight">
              ${calculateTotalReturn()}
            </span>
          </div>

          {/* Vertical Separator Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-[1px] bg-slate-300 -translate-x-1/2" />

          {/* Total Percent */}
          <div className="px-4 py-2">
            <span className="block text-slate-500 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2">
              TOTAL PERCENT
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-black text-[#00529b] tracking-tight">
              {selectedPlan.percent.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* How Do We Do It Info Block */}
        <div className="mt-14 pt-8 flex items-start gap-4 md:gap-5 max-w-4xl mx-auto">
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-[#00529b] text-[#00529b] flex items-center justify-center text-lg md:text-xl font-normal shrink-0">
            ?
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide mb-1">
              HOW DO WE DO IT?
            </h4>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
              In a nutshell: economies of scale: our platforms are fully developed in-house with proprietary technologies and execute over 30 million orders processed in 2020 (2020 figure). This helps dilute fixed costs and thus reduce our trading fees.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
