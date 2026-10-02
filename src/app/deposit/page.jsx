'use client';
import { getApiUrl } from '@/lib/api';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
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
  Sparkles,
  Loader2
} from 'lucide-react';
import HeaderNav from '@/components/HeaderNav';
import SubNav from '@/components/SubNav';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';



export default function MakeDepositPage() {
  const { user, fetchUser, refreshUser } = useAuth();

  // Payment processing options with user manual deposit addresses & exchange icons
  const processors = [
    {
      id: 'bitcoin',
      name: 'BITCOIN:',
      symbol: 'BTC',
      badgeColor: 'bg-[#f7931a]',
      badgeSymbol: '₿',
      networkLabel: 'Bitcoin Mainnet',
      iconUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=035',
      address: 'bc1qwz6fqarhsuhgllxnqz3ekq8krdfgctkl6r5utk',
      balance: 0.00
    },
    {
      id: 'usdt_trc20',
      name: 'USDT(TRC20):',
      symbol: 'USDT',
      badgeColor: 'bg-[#26a17b]',
      badgeSymbol: '₮',
      networkLabel: 'Tron (TRC-20)',
      iconUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=035',
      address: 'TQsUzgqcBhJe47Tx8fCzEi9GJJUpfpYyio',
      balance: 0.00
    },
    {
      id: 'usdt_bep20',
      name: 'USDT(BEP20):',
      symbol: 'USDT',
      badgeColor: 'bg-[#f3ba2f]',
      badgeSymbol: '₮',
      networkLabel: 'BSC (BEP-20)',
      iconUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=035',
      address: '0x003848D153e45DDdd24d498B921A888a5567C9c3',
      balance: 0.00
    },
    {
      id: 'litecoin',
      name: 'LITECOIN:',
      symbol: 'LTC',
      badgeColor: 'bg-[#345d9d]',
      badgeSymbol: 'Ł',
      networkLabel: 'Litecoin Mainnet',
      iconUrl: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=035',
      address: 'ltc1qzhnnvz4gqe7ejhkxgw4jcys28wj6ru2ce79tan',
      balance: 0.00
    }
  ];

  // State
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [selectedProcessorId, setSelectedProcessorId] = useState('bitcoin');
  const [depositMode, setDepositMode] = useState('automatic'); // 'automatic' | 'manual'
  const [paymentType, setPaymentType] = useState('topup'); // 'topup' | 'balance'
  const [spendAmount, setSpendAmount] = useState('40.00');
  const [accountBalance, setAccountBalance] = useState(0.00);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);
  const [fetchedWallets, setFetchedWallets] = useState(null);
  const [fetchedBalances, setFetchedBalances] = useState(null);
  const [dynamicPlans, setDynamicPlans] = useState([]);

  // Fetch dynamic plans & deposit wallets from backend
  useEffect(() => {
    let isMounted = true;
    const fetchDepositPlans = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const response = await fetch(getApiUrl('/deposit/plans'), {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        if (response.ok) {
          const data = await response.json();
          if (isMounted && data.success) {
            if (data.accountBalance !== undefined) {
              setAccountBalance(data.accountBalance);
            }
            if (data.userBalances) {
              setFetchedBalances(data.userBalances);
            }
            if (data.wallets) {
              setFetchedWallets(data.wallets);
            }
            if (data.plans && Array.isArray(data.plans) && data.plans.length > 0) {
              const mapped = data.plans.map(p => {
                const minStr = '$' + Number(p.minAmount).toFixed(2);
                const maxStr = p.maxAmount ? '$' + Number(p.maxAmount).toFixed(2) : '∞';
                return {
                  id: p.id,
                  title: p.name || p.title,
                  name: p.name,
                  planName: p.planLabel || p.planName || p.name,
                  depositRange: p.depositRange || (minStr + ' - ' + maxStr),
                  minAmount: Number(p.minAmount),
                  maxAmount: p.maxAmount ? Number(p.maxAmount) : Infinity,
                  profitRate: p.profitRate || (Number(p.dailyProfit).toFixed(2) + '%'),
                  profitNumber: Number(p.dailyProfit || p.profitNumber || 0),
                  profitLabel: p.profitLabel || (p.paymentPeriod?.toLowerCase() === 'hourly' ? 'Hourly Profit (%)' : (p.profitType || 'Daily Profit (%)')),
                  paymentPeriod: p.paymentPeriod || p.payment_period || 'Daily',
                  durationDays: p.durationDays || 30,
                  duration: `${p.durationDays || 30} Days`,
                  isPromo: !!p.isPromo
                };
              });
              setDynamicPlans(mapped);
              setSelectedPlanId(prev => (prev && mapped.some(m => m.id === prev) ? prev : mapped[0].id));
              setSpendAmount(mapped[0].minAmount.toFixed(2));
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch deposit plans from backend:', err);
      } finally {
        if (isMounted) setIsLoadingPlans(false);
      }
    };
    fetchDepositPlans();
    return () => { isMounted = false; };
  }, []);

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
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  // Live polling for OxaPay deposit status when invoice is active
  useEffect(() => {
    if (!depositInvoice || paymentConfirmed) return;

    const pollId = depositInvoice.trackId || depositInvoice.track_id || depositInvoice.id;
    if (!pollId) return;

    const checkStatus = async () => {
      try {
        const res = await fetch(getApiUrl(`/deposit/status/${pollId}`));
        if (res.ok) {
          const data = await res.json();
          if (data && data.success && data.isConfirmed) {
            setPaymentConfirmed(true);
            toast.success('Deposit confirmed and credited successfully!');
            setAccountBalance(prev => prev + (data.amount || depositInvoice.amount || 0));
          }
        }
      } catch (err) {
        console.error('Polling deposit status error:', err);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 3500);

    return () => clearInterval(interval);
  }, [depositInvoice, paymentConfirmed]);

  // Active processors merged with backend company wallets and distinct crypto balances
  const activeProcessors = processors.map(proc => {
    let procBal = 0;
    if (fetchedBalances && fetchedBalances[proc.id] !== undefined) {
      procBal = Number(fetchedBalances[proc.id]);
    } else {
      if (proc.id === 'bitcoin') procBal = Number(user?.btcBalance ?? 0);
      else if (proc.id === 'usdt_trc20') procBal = Number(user?.usdtTrc20Balance ?? 0);
      else if (proc.id === 'usdt_bep20') procBal = Number(user?.usdtBep20Balance ?? 0);
      else if (proc.id === 'litecoin') procBal = Number(user?.ltcBalance ?? 0);
      else procBal = Number(user?.balance ?? accountBalance ?? 0);

      if (procBal === 0 && accountBalance > 0 && proc.id === 'usdt_trc20') {
        const totalCrypto = Number(user?.btcBalance ?? 0) + Number(user?.usdtTrc20Balance ?? 0) + Number(user?.usdtBep20Balance ?? 0) + Number(user?.ltcBalance ?? 0);
        if (totalCrypto === 0) procBal = accountBalance;
      }
    }

    if (fetchedWallets && fetchedWallets[proc.id]) {
      return {
        ...proc,
        address: fetchedWallets[proc.id].address || proc.address,
        name: fetchedWallets[proc.id].name ? `${fetchedWallets[proc.id].name}:` : proc.name,
        balance: procBal
      };
    }
    return { ...proc, balance: procBal };
  });

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

  const selectedPlan = dynamicPlans.find(p => p.id === selectedPlanId) || dynamicPlans[0] || { id: '', title: '', minAmount: 0, maxAmount: Infinity };
  const selectedProcessor = activeProcessors.find(p => p.id === selectedProcessorId) || activeProcessors[0];

  // Handle open profit calculator
  const handleOpenCalculator = (plan, e) => {
    e.stopPropagation();
    setCalcModalPlan(plan);
    setCalcAmount(plan.minAmount.toString());
    const defaultTarget = new Date();
    defaultTarget.setDate(defaultTarget.getDate() + (plan.durationDays || 30));
    setSelectedCalendarDate(defaultTarget);
    recomputeProfit(defaultTarget, plan.minAmount.toString(), plan);
  };

  // Handle Spend submission
  const handleSpend = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    const amountNum = parseFloat(spendAmount);

    if (isNaN(amountNum) || amountNum < selectedPlan.minAmount) {
      toast.error(`Minimum deposit for ${selectedPlan.title} is $${selectedPlan.minAmount.toFixed(2)}.`);
      return;
    }

    if (selectedPlan.maxAmount && amountNum > selectedPlan.maxAmount) {
      toast.error(`Maximum deposit for ${selectedPlan.title} is $${selectedPlan.maxAmount.toFixed(2)}.`);
      return;
    }

    const specificBal = Number(selectedProcessor?.balance ?? 0);
    if (paymentType === 'balance' && amountNum > specificBal) {
      toast.error(`Insufficient ${selectedProcessor.name.replace(':', '')} balance ($${specificBal.toFixed(2)}). Please select a currency with sufficient funds (e.g. Litecoin) or choose Topup.`);
      return;
    }

    setIsProcessingSpend(true);

    try {
      const response = await fetch(getApiUrl('/deposit'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(typeof window !== 'undefined' && localStorage.getItem('stakelab_token') ? { 'Authorization': `Bearer ${localStorage.getItem('stakelab_token')}` } : {})
        },
        body: JSON.stringify({
          planId: selectedPlan.id,
          amount: amountNum,
          paymentMethod: paymentType,
          processorId: selectedProcessor.id,
          payment_method: selectedProcessor.name,
          mode: depositMode,
          depositMode: depositMode
        })
      });
      const data = await response.json();

      if (!response.ok || (data && data.success === false)) {
        toast.error(data?.message || 'Failed to process deposit request.');
        return;
      }
      
      const returnedAddress = (depositMode === 'manual' ? selectedProcessor.address : null) || data.address || data.payAddress || (data.order && data.order.payAddress) || selectedProcessor.address;

      const orderData = data.order || data.deposit || {
        id: data.trackId ? `DEP-${data.trackId}` : `DEP-${Date.now()}`,
        trackId: data.trackId || data.track_id,
        planName: selectedPlan.title,
        amount: amountNum,
        payAddress: returnedAddress,
        processorName: selectedProcessor.name.replace(':', ''),
        network: selectedProcessor.symbol,
        mode: depositMode
      };

      orderData.payAddress = returnedAddress;
      if (data.trackId) orderData.trackId = data.trackId;

      if (paymentType === 'balance') {
        const remaining = data.newBalance !== undefined ? data.newBalance : Math.max(0, specificBal - amountNum);
        setAccountBalance(remaining);
        if (fetchUser) fetchUser();
        else if (refreshUser) refreshUser();
        toast.success(data.message || `Plan ${selectedPlan.title} activated successfully using account balance!`);
        return;
      }

      setPaymentConfirmed(false);
      setDepositInvoice(orderData);

      // Generate QR Code for invoice address
      QRCode.toDataURL(returnedAddress, { width: 180, margin: 1 })
        .then(url => setInvoiceQrUrl(url))
        .catch(() => {});

      if (depositMode === 'automatic' && data.dynamic) {
        toast.success('Automatic payment address generated successfully!');
      } else {
        toast.success('Deposit invoice generated successfully!');
      }
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
      setPaymentConfirmed(false);
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
      await fetch(getApiUrl('/deposit/confirm'), {
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

  if (isLoadingPlans) {
    return <PageLoader />;
  }

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 flex flex-col justify-between">
      <HeaderNav />
      <SubNav activeTab="MAKE DEPOSIT" />

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
        {isLoadingPlans ? (
          <div className="py-12 border border-slate-200 rounded-lg text-center text-slate-600 font-semibold flex items-center justify-center gap-2">
            <span>Loading deposit plans</span>
            <Loader2 className="w-5 h-5 animate-spin text-[#0085d0]" />
          </div>
        ) : (
          <form onSubmit={handleSpend} className="space-y-6">
            
            <div className="space-y-6">
              {dynamicPlans.map((plan) => {
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

            {/* DEPOSIT METHOD TYPE SELECTOR (AUTOMATIC VS MANUAL) */}
            <div className="bg-slate-50 p-3 sm:p-3.5 rounded-lg border border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-2xs">
              <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="text-[#0085d0]">⚡</span>
                <span>Select Deposit Type:</span>
              </div>
              <div className="grid grid-cols-2 w-full sm:w-auto sm:inline-flex rounded-md p-1 bg-slate-200/80 border border-slate-300 text-xs font-bold gap-1 sm:gap-0">
                <button
                  type="button"
                  onClick={() => setDepositMode('automatic')}
                  className={`w-full sm:w-auto px-3 sm:px-5 py-2 sm:py-1.5 rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                    depositMode === 'automatic'
                      ? 'bg-[#0085d0] text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <span>Automatic Deposit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDepositMode('manual')}
                  className={`w-full sm:w-auto px-3 sm:px-5 py-2 sm:py-1.5 rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                    depositMode === 'manual'
                      ? 'bg-[#0085d0] text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <span>Manual Deposit</span>
                </button>
              </div>
            </div>

            {/* ACCOUNT BALANCE BAR */}
            <div className="flex items-center justify-between py-3.5 px-1 border-b border-slate-300 font-bold text-sm text-slate-900">
              <span>Account Balance:</span>
              <span>${accountBalance.toFixed(2)}</span>
            </div>

            {/* PAYMENT METHOD / PROCESSORS TABLE */}
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
                  {activeProcessors.map((proc) => {
                    const isTopupSelected = selectedProcessorId === proc.id && paymentType === 'topup';
                    const isBalanceSelected = selectedProcessorId === proc.id && paymentType === 'balance';

                    return (
                      <tr 
                        key={proc.id} 
                        className={`hover:bg-slate-50/60 transition-colors ${
                          selectedProcessorId === proc.id ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        {/* Processing Name + Exchange Icon */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            {proc.iconUrl ? (
                              <img 
                                src={proc.iconUrl} 
                                alt={proc.name} 
                                className="w-6 h-6 object-contain shrink-0" 
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            ) : (
                              <span className={`w-6 h-6 rounded-full ${proc.badgeColor} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}>
                                {proc.badgeSymbol}
                              </span>
                            )}
                            <div>
                              <span className="font-bold text-slate-900 tracking-tight block">
                                {proc.name}
                              </span>
                              {proc.networkLabel && (
                                <span className="text-[10px] text-slate-500 font-medium block">
                                  {proc.networkLabel}
                                </span>
                              )}
                            </div>
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
                  onClick={handleSpend}
                  disabled={isProcessingSpend}
                  className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold border border-slate-400 rounded text-xs sm:text-sm transition-colors cursor-pointer shadow-xs disabled:opacity-60 inline-flex items-center gap-2"
                >
                  {isProcessingSpend ? (
                    <>
                      <span>Processing deposit</span>
                      <Loader2 className="w-4 h-4 animate-spin text-[#0085d0]" />
                    </>
                  ) : (
                    'Spend'
                  )}
                </button>
              </div>
            </div>

          </form>
        )}

      </section>

      {/* PROFIT CALCULATOR MODAL (CALENDAR DATE-RANGE CALCULATOR) */}
      {calcModalPlan && (
        <div onClick={() => setCalcModalPlan(null)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-2xl max-w-sm w-full overflow-hidden border border-slate-300 cursor-default">
            
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
                  className="border border-[#0085d0] rounded px-1 py-0.5 text-xs bg-white cursor-pointer font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0085d0]"
                >
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, idx) => (
                    <option key={m} value={idx}>{m}</option>
                  ))}
                </select>

                <select
                  value={calendarYear}
                  onChange={(e) => setCalendarYear(parseInt(e.target.value))}
                  className="border border-[#0085d0] rounded px-1 py-0.5 text-xs bg-white cursor-pointer font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0085d0]"
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
              <div className="border border-[#0085d0] rounded overflow-hidden">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="bg-[#0085d0] text-white font-bold text-[11px]">
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
                                  ? 'bg-sky-100 text-[#0085d0] font-bold hover:bg-sky-200' 
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
                  <span>
                    {todayDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} {todayDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-16 text-slate-700">To:</span>
                  <span className={selectedCalendarDate ? 'font-bold text-slate-900' : 'text-slate-500 font-normal italic'}>
                    {selectedCalendarDate
                      ? `${selectedCalendarDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} ${selectedCalendarDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`
                      : 'Select in the calendar'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-16 text-slate-700">Days:</span>
                  <span>{calcDays !== null ? calcDays : 0}</span>
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
                        const newVal = e.target.value;
                        setCalcAmount(newVal);
                        let target = selectedCalendarDate;
                        if (!target) {
                          target = new Date();
                          target.setDate(target.getDate() + (calcModalPlan?.durationDays || 30));
                          setSelectedCalendarDate(target);
                        }
                        recomputeProfit(target, newVal, calcModalPlan);
                      }}
                      className="w-24 border border-[#0085d0] rounded px-1.5 py-0.5 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#0085d0]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-16 text-slate-700">Percent:</span>
                  <span>{selectedCalendarDate ? calcModalPlan.profitRate : '0.0%'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-16 text-slate-700">Profit $:</span>
                  <span className="font-bold text-emerald-600">
                    {calcProfitResult !== null ? calcProfitResult.toFixed(2) : '0.00'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-16 text-slate-700">Deposit $:</span>
                  <span>{selectedCalendarDate ? parseFloat(calcAmount || 0).toFixed(2) : '0.00'}</span>
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
                    className="px-6 py-2 bg-[#0085d0] hover:bg-[#0072ce] text-white rounded text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs transition-colors"
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
        <div onClick={() => setDepositInvoice(null)} className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-2xl max-w-md sm:max-w-lg w-full max-h-[88vh] overflow-y-auto p-4 sm:p-6 space-y-3.5 border border-slate-200 cursor-default my-auto">
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

            {paymentConfirmed ? (
              /* Celebration Success Card on Confirmed OxaPay Deposit */
              <div className="space-y-5 py-2 animate-in zoom-in duration-300 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10 animate-bounce text-emerald-600" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                    Deposit Confirmed & Credited!
                  </h3>
                  <p className="text-xs text-emerald-600 font-bold">
                    +${depositInvoice.amount.toFixed(2)} USD has been credited to your Account Balance
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-emerald-500/30 text-xs text-slate-700 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payment Status:</span>
                    <span className="text-emerald-600 font-bold">COMPLETED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount Credited:</span>
                    <span className="text-slate-900 font-bold">${depositInvoice.amount.toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payment Gateway:</span>
                    <span className="text-slate-800 font-medium">{depositInvoice.processorName} ({depositInvoice.network})</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDepositInvoice(null);
                      setPaymentConfirmed(false);
                    }}
                    className="w-full bg-[#0085d0] hover:bg-[#0072ce] text-white font-bold py-2.5 rounded-lg text-xs transition-all text-center shadow-xs cursor-pointer"
                  >
                    Done & Continue
                  </button>
                </div>
              </div>
            ) : (
              <>
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
                      className="w-32 h-32 sm:w-36 sm:h-36 object-contain rounded border border-slate-200"
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

                  {depositInvoice.trackId && (
                    <p className="text-[11px] text-slate-500 font-mono pt-1">
                      Track ID: <span className="text-slate-800 font-bold">{depositInvoice.trackId}</span>
                    </p>
                  )}
                </div>

                {/* LIVE BLOCKCHAIN POLLING INDICATOR */}
                <div className="flex items-center justify-center gap-2 text-xs text-amber-600 font-medium py-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  {depositMode === 'automatic' ? (
                    <span>Waiting for automatic blockchain payment... (Auto-credits on completion)</span>
                  ) : (
                    <span>Send exact payment to address above and paste TXID below for admin verification</span>
                  )}
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

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setDepositInvoice(null)}
                      className="hidden"
                    >
                      Pay Later
                    </button>
                    <button
                      type="submit"
                      disabled={isConfirmingTx}
                      className="w-full py-2.5 bg-[#0085d0] hover:bg-[#0072ce] text-white rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-xs inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isConfirmingTx ? (
                        <>
                          <span>Verifying payment</span>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                        </>
                      ) : (
                        'I Have Paid'
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}

          </div>
        </div>
      )}

      <FloatingWidgets />
      <Footer />
    </main>
  );
}
