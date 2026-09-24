'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';
import { toast } from 'sonner';
import { 
  Calculator, 
  Copy, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Wallet,
  Clock,
  Sparkles
} from 'lucide-react';
import HeaderNav from '@/components/HeaderNav';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';

export default function MakeDepositPage() {
  // Available investment deposit plans matching screenshots exactly
  const plans = [
    {
      id: 'foundation',
      title: 'FOUNDATION PLAN',
      planName: 'Plan 1',
      depositRange: '$40.00 - $4999.00',
      minAmount: 40.0,
      maxAmount: 4999.0,
      profitRate: '2.80%',
      profitNumber: 2.80,
      profitLabel: 'Daily Profit (%)',
      durationDays: 30,
      isPromo: false
    },
    {
      id: 'acceleration',
      title: 'ACCELERATION PLAN',
      planName: 'Plan 2',
      depositRange: '$5000.00 - $9999.00',
      minAmount: 5000.0,
      maxAmount: 9999.0,
      profitRate: '5.50%',
      profitNumber: 5.50,
      profitLabel: 'Daily Profit (%)',
      durationDays: 30,
      isPromo: false
    },
    {
      id: 'stability',
      title: 'STABILITY PLAN',
      planName: 'Plan 3',
      depositRange: '$10000.00 - $19999.00',
      minAmount: 10000.0,
      maxAmount: 19999.0,
      profitRate: '8.50%',
      profitNumber: 8.50,
      profitLabel: 'Daily Profit (%)',
      durationDays: 30,
      isPromo: false
    },
    {
      id: 'wealth',
      title: 'WEALTH PLAN',
      planName: 'Plan 4',
      depositRange: '$20000.00 - ∞',
      minAmount: 20000.0,
      maxAmount: Infinity,
      profitRate: '10.50%',
      profitNumber: 10.50,
      profitLabel: 'Daily Profit (%)',
      durationDays: 30,
      isPromo: false
    },
    {
      id: 'promo1',
      title: 'DIGITALXTRADE MAX PLAN(250% In 48 hours)',
      planName: 'PROMO PLAN1',
      depositRange: '$1000.00 - $4999.00',
      minAmount: 1000.0,
      maxAmount: 4999.0,
      profitRate: '300.00%',
      profitNumber: 300.0,
      profitLabel: 'Profit (%)',
      durationHours: 48,
      isPromo: true
    },
    {
      id: 'promo2',
      title: 'DIGITALXTRADE SUPER PLAN(500% In 72 hours)',
      planName: 'PROMO PLAN 2',
      depositRange: '$5000.00 - $100000.00',
      minAmount: 5000.0,
      maxAmount: 100000.0,
      profitRate: '500.00%',
      profitNumber: 500.0,
      profitLabel: 'Profit (%)',
      durationHours: 72,
      isPromo: true
    }
  ];

  // Payment processing options
  const processors = [
    {
      id: 'bitcoin',
      name: 'BITCOIN:',
      symbol: 'BTC',
      badgeColor: 'bg-[#f7931a]',
      badgeSymbol: '₿',
      address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
      balance: 0.00
    },
    {
      id: 'usdt_trc20',
      name: 'USDT(TRC20):',
      symbol: 'USDT',
      badgeColor: 'bg-[#26a17b]',
      badgeSymbol: '₮',
      address: 'TYDzsYUEpvnYmQk4zGP9sWWcTEd3GL6X7b',
      balance: 0.00
    },
    {
      id: 'usdt_bep20',
      name: 'USDT(BEP20):',
      symbol: 'USDT',
      badgeColor: 'bg-[#5068f2]',
      badgeSymbol: '₮',
      address: '0x71C83605273C1964f4fB34b07D14187f58b0D892',
      balance: 0.00
    },
    {
      id: 'litecoin',
      name: 'LITECOIN:',
      symbol: 'LTC',
      badgeColor: 'bg-[#a6a9aa]',
      badgeSymbol: 'Ł',
      address: 'ltc1qg62u6e45p20a6e026y24s9gsv9e49v3z27j7ea',
      balance: 0.00
    }
  ];

  // State
  const [selectedPlanId, setSelectedPlanId] = useState('foundation');
  const [selectedProcessorId, setSelectedProcessorId] = useState('bitcoin');
  const [paymentType, setPaymentType] = useState('topup'); // 'topup' | 'balance'
  const [spendAmount, setSpendAmount] = useState('40.00');
  const [accountBalance, setAccountBalance] = useState(0.00);

  // Profit Calculator Modal State (Calendar Date Picker)
  const todayDate = new Date();
  const [calcModalPlan, setCalcModalPlan] = useState(null);
  const [calcAmount, setCalcAmount] = useState('40.00');
  const [calendarMonth, setCalendarMonth] = useState(todayDate.getMonth());
  const [calendarYear, setCalendarYear] = useState(todayDate.getFullYear());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null); // Date object or null
  const [calcDays, setCalcDays] = useState(null);
  const [calcProfitResult, setCalcProfitResult] = useState(null);

  // Deposit Confirmation / Invoice State
  const [depositInvoice, setDepositInvoice] = useState(null);
  const [invoiceQrUrl, setInvoiceQrUrl] = useState('');
  const [txHashInput, setTxHashInput] = useState('');
  const [isCopiedAddress, setIsCopiedAddress] = useState(false);
  const [isProcessingSpend, setIsProcessingSpend] = useState(false);
  const [isConfirmingTx, setIsConfirmingTx] = useState(false);

  // Re-calculate profit based on selected calendar date, amount, and plan
  const recomputeProfit = (targetDate, amountVal, plan) => {
    if (!targetDate || !plan) return;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - now.getTime();
    const days = Math.max(0, Math.round(diffTime / (1000 * 60 * 60 * 24)));
    setCalcDays(days);

    const amt = parseFloat(amountVal) || 0;
    let profit = 0;
    if (plan.isPromo) {
      profit = amt * (plan.profitNumber / 100);
    } else {
      profit = amt * (plan.profitNumber / 100) * days;
    }
    setCalcProfitResult(profit);
  };

  // Update default spend amount when plan changes
  const handleSelectPlan = (plan) => {
    setSelectedPlanId(plan.id);
    setSpendAmount(plan.minAmount.toFixed(2));
  };

  const selectedPlan = plans.find(p => p.id === selectedPlanId) || plans[0];
  const selectedProcessor = processors.find(p => p.id === selectedProcessorId) || processors[0];

  // Handle open profit calculator
  const handleOpenCalculator = (plan, e) => {
    e.stopPropagation();
    setCalcModalPlan(plan);
    setCalcAmount(plan.minAmount.toString());
  };

  // Handle Spend submission
  const handleSpend = async (e) => {
    e.preventDefault();
    const amountNum = parseFloat(spendAmount);

    if (isNaN(amountNum) || amountNum < selectedPlan.minAmount) {
      toast.error(`Minimum deposit for ${selectedPlan.title} is $${selectedPlan.minAmount.toFixed(2)}.`);
      return;
    }

    if (selectedPlan.maxAmount && amountNum > selectedPlan.maxAmount) {
      toast.error(`Maximum deposit for ${selectedPlan.title} is $${selectedPlan.maxAmount.toFixed(2)}.`);
      return;
    }

    if (paymentType === 'balance' && amountNum > accountBalance) {
      toast.error('Insufficient account balance. Please select Topup payment.');
      return;
    }

    setIsProcessingSpend(true);

    try {
      const response = await fetch('http://localhost:3001/api/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan.id,
          amount: amountNum,
          paymentMethod: paymentType,
          processorId: selectedProcessor.id
        })
      });
      const data = await response.json();
      
      const orderData = data.order || {
        id: `DEP-${Date.now()}`,
        planName: selectedPlan.title,
        amount: amountNum,
        payAddress: selectedProcessor.address,
        processorName: selectedProcessor.name.replace(':', ''),
        network: selectedProcessor.symbol
      };

      setDepositInvoice(orderData);

      // Generate QR Code for invoice address
      const qrData = `${selectedProcessor.id}:${orderData.payAddress}?amount=${amountNum}`;
      QRCode.toDataURL(orderData.payAddress, { width: 180, margin: 1 })
        .then(url => setInvoiceQrUrl(url))
        .catch(() => {});

      toast.success('Deposit invoice generated successfully!');
    } catch {
      // Offline fallback invoice
      const fallbackOrder = {
        id: `DEP-${Date.now()}`,
        planName: selectedPlan.title,
        amount: amountNum,
        payAddress: selectedProcessor.address,
        processorName: selectedProcessor.name.replace(':', ''),
        network: selectedProcessor.symbol
      };
      setDepositInvoice(fallbackOrder);
      QRCode.toDataURL(fallbackOrder.payAddress, { width: 180, margin: 1 })
        .then(url => setInvoiceQrUrl(url))
        .catch(() => {});
      toast.success('Deposit order created!');
    } finally {
      setIsProcessingSpend(false);
    }
  };

  // Handle Copy Address
  const handleCopyAddress = () => {
    if (!depositInvoice) return;
    navigator.clipboard.writeText(depositInvoice.payAddress);
    setIsCopiedAddress(true);
    toast.success('Wallet address copied to clipboard!');
    setTimeout(() => setIsCopiedAddress(false), 2500);
  };

  // Handle Confirm Payment TXID
  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    if (!txHashInput.trim()) {
      toast.error('Please enter the transaction hash / TXID.');
      return;
    }

    setIsConfirmingTx(true);
    try {
      await fetch('http://localhost:3001/api/deposit/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: depositInvoice.id, txHash: txHashInput.trim() })
      });
      toast.success('Payment submitted for blockchain confirmation!');
      setDepositInvoice(null);
      setTxHashInput('');
    } catch {
      toast.success('Payment confirmation received!');
      setDepositInvoice(null);
      setTxHashInput('');
    } finally {
      setIsConfirmingTx(false);
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 flex flex-col justify-between">
      <HeaderNav />

      {/* MAIN CONTAINER */}
      <section className="py-6 md:py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        
        {/* HEADING */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Make a Deposit:
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Select a plan:
          </p>
        </div>

        {/* PLANS SELECTION LIST (MATCHING SCREENSHOTS EXACTLY) */}
        <form onSubmit={handleSpend} className="space-y-6">
          
          <div className="space-y-6">
            {plans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              return (
                <div 
                  key={plan.id}
                  onClick={() => handleSelectPlan(plan)}
                  className={`border border-slate-300 rounded-xs overflow-hidden transition-all bg-white cursor-pointer ${
                    isSelected ? 'ring-1 ring-[#0085d0] shadow-xs' : 'hover:border-slate-400'
                  }`}
                >
                  {/* PLAN HEADER BAR WITH RADIO */}
                  <div className="px-4 py-2.5 bg-slate-100/90 border-b border-slate-300 flex items-center gap-2.5 select-none">
                    <input
                      type="radio"
                      name="planSelection"
                      checked={isSelected}
                      onChange={() => handleSelectPlan(plan)}
                      className="w-4 h-4 text-[#0085d0] border-slate-300 focus:ring-[#0085d0] cursor-pointer"
                    />
                    <label className="text-xs sm:text-sm font-bold text-slate-900 tracking-wide uppercase cursor-pointer">
                      {plan.title}
                    </label>
                  </div>

                  {/* TABLE CONTENT */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-700 bg-white">
                          <th className="py-2 px-4 font-semibold w-1/3">
                            Plan
                          </th>
                          <th className="py-2 px-4 font-semibold w-1/3 text-right sm:text-center">
                            Spent Amount ($)
                          </th>
                          <th className="py-2 px-4 font-semibold w-1/3 text-right">
                            {plan.profitLabel}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-4 font-bold text-slate-900">
                            {plan.planName}
                          </td>
                          <td className="py-2.5 px-4 font-bold text-slate-900 text-right sm:text-center">
                            {plan.depositRange}
                          </td>
                          <td className="py-2.5 px-4 font-bold text-slate-900 text-right">
                            {plan.profitRate}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* CALCULATE YOUR PROFIT LINK */}
                  <div className="px-4 py-2.5 border-t border-slate-200/80 bg-white">
                    <button
                      type="button"
                      onClick={(e) => handleOpenCalculator(plan, e)}
                      className="text-xs sm:text-sm text-[#0085d0] hover:text-[#005596] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Calculate your profit &gt;&gt;</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* ACCOUNT BALANCE BAR */}
          <div className="flex items-center justify-between py-3.5 px-1 border-b border-slate-300 font-bold text-sm text-slate-900">
            <span>Account Balance:</span>
            <span>${accountBalance.toFixed(2)}</span>
          </div>

          {/* PAYMENT METHOD / PROCESSORS TABLE (SCREENSHOT 4) */}
          <div className="border border-slate-300 rounded-xs overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0085d0] text-white">
                  <th className="py-2.5 px-4 font-semibold w-1/2">
                    Processing
                  </th>
                  <th className="py-2.5 px-4 font-semibold w-1/4 text-center">
                    Topup
                  </th>
                  <th className="py-2.5 px-4 font-semibold w-1/4 text-center">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {processors.map((proc) => {
                  const isTopupSelected = selectedProcessorId === proc.id && paymentType === 'topup';
                  const isBalanceSelected = selectedProcessorId === proc.id && paymentType === 'balance';

                  return (
                    <tr 
                      key={proc.id} 
                      className={`hover:bg-slate-50/60 transition-colors ${
                        selectedProcessorId === proc.id ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      {/* Processing Name + Badge */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full ${proc.badgeColor} text-white flex items-center justify-center font-bold text-[11px] shrink-0 shadow-2xs`}>
                            {proc.badgeSymbol}
                          </span>
                          <span className="font-bold text-slate-900 tracking-tight">
                            {proc.name}
                          </span>
                        </div>
                      </td>

                      {/* Topup Radio Button */}
                      <td className="py-3 px-4 text-center">
                        <input
                          type="radio"
                          name="paymentOption"
                          checked={isTopupSelected}
                          onChange={() => {
                            setSelectedProcessorId(proc.id);
                            setPaymentType('topup');
                          }}
                          className="w-4 h-4 text-[#0085d0] border-slate-300 focus:ring-[#0085d0] cursor-pointer"
                        />
                      </td>

                      {/* Balance Radio Button */}
                      <td className="py-3 px-4 text-center">
                        <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-800 font-semibold">
                          <input
                            type="radio"
                            name="paymentOption"
                            checked={isBalanceSelected}
                            onChange={() => {
                              setSelectedProcessorId(proc.id);
                              setPaymentType('balance');
                            }}
                            className="w-4 h-4 text-[#0085d0] border-slate-300 focus:ring-[#0085d0] cursor-pointer"
                          />
                          <span>${proc.balance.toFixed(2)}</span>
                        </label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* AMOUNT TO SPEND INPUT & SPEND BUTTON (SCREENSHOT 4) */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center gap-4">
              <label className="text-xs sm:text-sm font-bold text-slate-900">
                Amount to Spend ($):
              </label>
              <div className="w-44">
                <input
                  type="number"
                  step="any"
                  required
                  value={spendAmount}
                  onChange={(e) => setSpendAmount(e.target.value)}
                  className="w-full bg-white border border-slate-400 rounded px-3 py-1.5 text-sm font-bold text-slate-900 text-center focus:outline-none focus:border-[#0085d0] focus:ring-1 focus:ring-[#0085d0]"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isProcessingSpend}
                className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold border border-slate-400 rounded text-xs sm:text-sm transition-colors cursor-pointer shadow-xs disabled:opacity-60"
              >
                {isProcessingSpend ? 'Processing...' : 'Spend'}
              </button>
            </div>
          </div>

        </form>

      </section>

      {/* PROFIT CALCULATOR MODAL (CALENDAR DATE-RANGE CALCULATOR) */}
      {calcModalPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full overflow-hidden border border-slate-300">
            
            {/* WINDOW TOP BAR */}
            <div className="bg-slate-900 text-white px-3 py-2 flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#f7931a] text-white flex items-center justify-center text-[10px] font-bold">
                  ₿
                </span>
                <span className="truncate">Calculator - {calcModalPlan.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setCalcModalPlan(null)}
                className="text-slate-400 hover:text-white font-bold px-1 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* CALENDAR & CALCULATION BODY */}
            <div className="p-4 space-y-3 bg-white text-xs text-slate-800">
              
              {/* MONTH / YEAR NAV CONTROLS */}
              <div className="flex items-center justify-center gap-2 font-bold text-xs select-none">
                <button
                  type="button"
                  onClick={() => {
                    if (calendarMonth === 0) {
                      setCalendarMonth(11);
                      setCalendarYear(y => y - 1);
                    } else {
                      setCalendarMonth(m => m - 1);
                    }
                  }}
                  className="text-[#0085d0] hover:underline px-1 cursor-pointer font-black"
                >
                  &lt;&lt;
                </button>

                <select
                  value={calendarMonth}
                  onChange={(e) => setCalendarMonth(parseInt(e.target.value))}
                  className="border border-amber-500 rounded px-1 py-0.5 text-xs bg-white cursor-pointer font-semibold text-slate-900"
                >
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, idx) => (
                    <option key={m} value={idx}>{m}</option>
                  ))}
                </select>

                <select
                  value={calendarYear}
                  onChange={(e) => setCalendarYear(parseInt(e.target.value))}
                  className="border border-amber-500 rounded px-1 py-0.5 text-xs bg-white cursor-pointer font-semibold text-slate-900"
                >
                  {[2024, 2025, 2026, 2027, 2028].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => {
                    if (calendarMonth === 11) {
                      setCalendarMonth(0);
                      setCalendarYear(y => y + 1);
                    } else {
                      setCalendarMonth(m => m + 1);
                    }
                  }}
                  className="text-[#0085d0] hover:underline px-1 cursor-pointer font-black"
                >
                  &gt;&gt;
                </button>
              </div>

              {/* CALENDAR TABLE */}
              <div className="border border-amber-500 rounded overflow-hidden">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="bg-amber-500 text-white font-bold text-[11px]">
                      <th className="py-1">Sun</th>
                      <th className="py-1">Mon</th>
                      <th className="py-1">Tue</th>
                      <th className="py-1">Wed</th>
                      <th className="py-1">Thu</th>
                      <th className="py-1">Fri</th>
                      <th className="py-1">Sat</th>
                    </tr>
                  </thead>
                  <tbody className="text-[11px]">
                    {(() => {
                      const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
                      const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
                      const rows = [];
                      let cells = [];

                      // Blank cells before first day
                      for (let i = 0; i < firstDay; i++) {
                        cells.push(<td key={`b-${i}`} className="py-1 px-1"></td>);
                      }

                      for (let day = 1; day <= daysInMonth; day++) {
                        const cellDate = new Date(calendarYear, calendarMonth, day);
                        cellDate.setHours(0, 0, 0, 0);
                        const isToday = cellDate.getTime() === new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()).getTime();
                        const isSelected = selectedCalendarDate && cellDate.getTime() === new Date(selectedCalendarDate).setHours(0, 0, 0, 0);

                        cells.push(
                          <td key={day} className="py-0.5 px-0.5">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCalendarDate(cellDate);
                                recomputeProfit(cellDate, calcAmount, calcModalPlan);
                              }}
                              className={`w-full py-0.5 text-center font-semibold rounded cursor-pointer transition-colors ${
                                isSelected 
                                  ? 'bg-[#0085d0] text-white font-bold ring-1 ring-blue-600' 
                                  : isToday 
                                  ? 'bg-amber-200 text-slate-900 font-bold hover:bg-amber-300' 
                                  : 'hover:bg-slate-100 text-slate-800'
                              }`}
                            >
                              {day}
                            </button>
                          </td>
                        );

                        if (cells.length === 7) {
                          rows.push(<tr key={`row-${rows.length}`}>{cells}</tr>);
                          cells = [];
                        }
                      }

                      // Remaining blank cells
                      if (cells.length > 0) {
                        while (cells.length < 7) {
                          cells.push(<td key={`e-${cells.length}`} className="py-1 px-1"></td>);
                        }
                        rows.push(<tr key={`row-${rows.length}`}>{cells}</tr>);
                      }

                      return rows;
                    })()}
                  </tbody>
                </table>
              </div>

              {/* CALCULATION RESULTS DATA (SCREENSHOT 1 & 2) */}
              <div className="space-y-1 pt-1 font-semibold text-xs leading-relaxed text-slate-900">
                <div className="flex items-center gap-2">
                  <span className="w-16 text-slate-700">From:</span>
                  <span>{todayDate.toLocaleDateString('en-US')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-16 text-slate-700">To:</span>
                  <span className={selectedCalendarDate ? 'font-bold text-slate-900' : 'text-slate-500 font-normal italic'}>
                    {selectedCalendarDate ? selectedCalendarDate.toLocaleDateString('en-US') : 'Select in the calendar'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-16 text-slate-700">Days:</span>
                  <span>{calcDays !== null ? calcDays : 'N/A'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-16 text-slate-700">Amount:</span>
                  <div className="flex items-center gap-1.5">
                    <span>$</span>
                    <input
                      type="number"
                      step="any"
                      value={calcAmount}
                      onChange={(e) => {
                        setCalcAmount(e.target.value);
                      }}
                      className="w-20 border border-amber-500 rounded px-1.5 py-0.5 text-xs font-bold text-slate-900 bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (selectedCalendarDate) {
                          recomputeProfit(selectedCalendarDate, calcAmount, calcModalPlan);
                        } else {
                          // Default 30 days calculation if no date clicked yet
                          const defaultTarget = new Date();
                          defaultTarget.setDate(defaultTarget.getDate() + 30);
                          setSelectedCalendarDate(defaultTarget);
                          recomputeProfit(defaultTarget, calcAmount, calcModalPlan);
                        }
                      }}
                      className="px-2 py-0.5 bg-amber-100 hover:bg-amber-200 border border-amber-500 rounded text-[11px] font-bold text-slate-900 cursor-pointer shadow-2xs"
                    >
                      Calculate
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-16 text-slate-700">Percent:</span>
                  <span>{selectedCalendarDate ? calcModalPlan.profitRate : 'N/A'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-16 text-slate-700">Profit $:</span>
                  <span className="font-bold text-emerald-600">
                    {calcProfitResult !== null ? calcProfitResult.toFixed(2) : 'N/A'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-16 text-slate-700">Deposit $:</span>
                  <span>{selectedCalendarDate ? parseFloat(calcAmount || 0).toFixed(2) : 'N/A'}</span>
                </div>

                {/* SPEND BUTTON (MATCHING SCREENSHOT) */}
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      handleSelectPlan(calcModalPlan);
                      setSpendAmount(parseFloat(calcAmount || calcModalPlan.minAmount).toFixed(2));
                      setCalcModalPlan(null);
                      toast.success(`Selected ${calcModalPlan.title} ($${calcAmount})`);
                    }}
                    className="px-4 py-1.5 bg-[#fef08a] hover:bg-[#fde047] border border-amber-500 rounded text-xs font-bold text-slate-900 cursor-pointer shadow-xs transition-colors"
                  >
                    Spend
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* DEPOSIT INVOICE MODAL (CRYPTO PAYMENT) */}
      {depositInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                <ShieldCheck className="w-5 h-5 text-[#0085d0]" />
                Deposit Invoice & Payment
              </div>
              <button
                onClick={() => setDepositInvoice(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* ORDER SUMMARY */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-700">
                <span>Selected Plan:</span>
                <strong className="text-slate-900">{depositInvoice.planName}</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Amount to Pay:</span>
                <strong className="text-[#0085d0] text-base">${depositInvoice.amount.toFixed(2)} USD</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Payment Asset:</span>
                <strong className="text-slate-900">{depositInvoice.processorName} ({depositInvoice.network})</strong>
              </div>
            </div>

            {/* QR CODE & WALLET ADDRESS */}
            <div className="flex flex-col items-center p-4 bg-white border border-slate-200 rounded-lg space-y-3">
              {invoiceQrUrl && (
                <img
                  src={invoiceQrUrl}
                  alt="Deposit QR Code"
                  className="w-40 h-40 object-contain rounded"
                />
              )}
              <div className="text-center space-y-1 w-full">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Send exact payment to address:
                </span>
                <div className="flex items-center justify-center gap-1.5 bg-slate-100 p-2 rounded border border-slate-200 max-w-full">
                  <span className="font-mono text-xs text-slate-900 truncate select-all">
                    {depositInvoice.payAddress}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="p-1 rounded text-[#0085d0] hover:bg-slate-200 transition-colors shrink-0"
                    title="Copy wallet address"
                  >
                    {isCopiedAddress ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* TRANSACTION CONFIRMATION FORM */}
            <form onSubmit={handleConfirmPayment} className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Transaction Hash / Payment Reference (TXID):
                </label>
                <input
                  type="text"
                  required
                  placeholder="Paste your transaction ID or hash here"
                  value={txHashInput}
                  onChange={(e) => setTxHashInput(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:border-[#0085d0]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDepositInvoice(null)}
                  className="flex-1 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded text-xs font-bold uppercase transition-colors"
                >
                  Pay Later
                </button>
                <button
                  type="submit"
                  disabled={isConfirmingTx}
                  className="flex-1 py-2.5 bg-[#0085d0] hover:bg-[#0072ce] text-white rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  {isConfirmingTx ? 'Verifying...' : 'I Have Paid'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      <FloatingWidgets />
      <Footer />
    </main>
  );
}
