'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { 
  ChevronRight, 
  Wallet, 
  ArrowUpRight, 
  ShieldCheck, 
  Clock, 
  Edit3, 
  Check, 
  AlertCircle,
  CreditCard,
  Lock
} from 'lucide-react';
import HeaderNav from '@/components/HeaderNav';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';

export default function WithdrawFundsPage() {
  const [accountBalance, setAccountBalance] = useState(0.00);
  const [pendingWithdrawals, setPendingWithdrawals] = useState(0.00);
  const [selectedCurrencyId, setSelectedCurrencyId] = useState('bitcoin');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState(null);
  const [editAddressInput, setEditAddressInput] = useState('');

  // Default currencies matching the exact screenshot layout
  const [currencies, setCurrencies] = useState([
    {
      id: 'bitcoin',
      name: 'BITCOIN',
      symbol: 'BTC',
      badgeColor: 'bg-[#f7931a]',
      badgeSymbol: '₿',
      available: 0.00,
      pending: 0.00,
      accountId: '88888888',
      minWithdrawal: 20.00
    },
    {
      id: 'usdt_trc20',
      name: 'USDT(TRC20)',
      symbol: 'USDT',
      badgeColor: 'bg-[#26a17b]',
      badgeSymbol: '₮',
      available: 0.00,
      pending: 0.00,
      accountId: '88888888',
      minWithdrawal: 10.00
    },
    {
      id: 'usdt_bep20',
      name: 'USDT(BEP20)',
      symbol: 'USDT',
      badgeColor: 'bg-[#5068f2]',
      badgeSymbol: '₮',
      available: 0.00,
      pending: 0.00,
      accountId: 'Bbsjeie',
      minWithdrawal: 10.00
    },
    {
      id: 'litecoin',
      name: 'LITECOIN',
      symbol: 'LTC',
      badgeColor: 'bg-[#a6a9aa]',
      badgeSymbol: 'Ł',
      available: 0.00,
      pending: 0.00,
      accountId: 'Jsjwkwkw',
      minWithdrawal: 15.00
    }
  ]);

  // Fetch balances from backend API
  useEffect(() => {
    fetch('http://localhost:3001/api/withdraw')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.data) {
          if (typeof data.data.accountBalance === 'number') {
            setAccountBalance(data.data.accountBalance);
          }
          if (typeof data.data.pendingWithdrawals === 'number') {
            setPendingWithdrawals(data.data.pendingWithdrawals);
          }
          if (data.data.currencies && data.data.currencies.length > 0) {
            setCurrencies((prev) => 
              prev.map((c) => {
                const found = data.data.currencies.find(dc => dc.id === c.id);
                return found ? { ...c, ...found } : c;
              })
            );
          }
        }
      })
      .catch(() => {
        // Fallback to static defaults
      });
  }, []);

  const selectedCurrency = currencies.find(c => c.id === selectedCurrencyId) || currencies[0];

  // Handle Edit Account Address
  const handleOpenEdit = (curr) => {
    setEditingCurrency(curr);
    setEditAddressInput(curr.accountId);
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!editAddressInput.trim()) {
      toast.error('Account address cannot be empty.');
      return;
    }

    setCurrencies(prev => prev.map(c => 
      c.id === editingCurrency.id ? { ...c, accountId: editAddressInput.trim() } : c
    ));

    try {
      await fetch('http://localhost:3001/api/withdraw/account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currencyId: editingCurrency.id, accountId: editAddressInput.trim() })
      });
      toast.success(`Account ID updated for ${editingCurrency.name}`);
    } catch {
      toast.success(`Account ID updated locally.`);
    }

    setEditingCurrency(null);
  };

  // Handle Withdrawal Request Submission
  const handleWithdraw = async (e) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);

    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error('Please enter a valid withdrawal amount.');
      return;
    }

    if (amountNum > selectedCurrency.available) {
      toast.error(`Insufficient balance. You have $${selectedCurrency.available.toFixed(2)} available.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3001/api/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currencyId: selectedCurrency.id, amount: amountNum })
      });
      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setWithdrawAmount('');
        if (data.data) {
          setAccountBalance(data.data.accountBalance);
          setPendingWithdrawals(data.data.pendingWithdrawals);
          setCurrencies(prev => prev.map(c => {
            const found = data.data.currencies.find(dc => dc.id === c.id);
            return found ? { ...c, ...found } : c;
          }));
        }
      } else {
        toast.error(data.message || 'Withdrawal failed.');
      }
    } catch {
      toast.error('You have no funds to withdraw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <HeaderNav />

      {/* MAIN CONTAINER */}
      <section className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        
        {/* CARD CONTAINER (TWO COLUMNS MATCHING USER'S SCREENSHOT) */}
        <div className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT FORM / TABLE PANEL (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            
            {/* ACCOUNT BALANCES BAR WITH BLUE CHEVRONS */}
            <div className="space-y-1 text-sm text-slate-800 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="text-[#0085d0] font-black text-base select-none">&gt;</span>
                <span>Account balance <strong>${accountBalance.toFixed(2)}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#0085d0] font-black text-base select-none">&gt;</span>
                <span>Pending Withdrawals <strong>${pendingWithdrawals.toFixed(2)}</strong></span>
              </div>
            </div>

            {/* TITLE */}
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#00529b] tracking-tight">
                Withdraw funds
              </h1>
            </div>

            {/* WITHDRAWAL CURRENCY TABLE */}
            <div className="overflow-x-auto border border-slate-300 rounded-xs shadow-2xs">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0085d0] text-white">
                    <th className="py-2.5 px-3 w-8 border-r border-[#0072ce]/40 text-center"></th>
                    <th className="py-2.5 px-3 font-semibold border-r border-[#0072ce]/40">
                      Processing
                    </th>
                    <th className="py-2.5 px-3 font-semibold border-r border-[#0072ce]/40 text-center sm:text-left">
                      Available
                    </th>
                    <th className="py-2.5 px-3 font-semibold border-r border-[#0072ce]/40 text-center sm:text-left">
                      Pending
                    </th>
                    <th className="py-2.5 px-3 font-semibold">
                      Account
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {currencies.map((curr) => {
                    const isSelected = selectedCurrencyId === curr.id;
                    return (
                      <tr 
                        key={curr.id}
                        onClick={() => setSelectedCurrencyId(curr.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-blue-50/70' : 'hover:bg-slate-50/60'
                        }`}
                      >
                        {/* Radio Selector */}
                        <td className="py-3 px-3 border-r border-slate-300 text-center">
                          <input
                            type="radio"
                            name="selectedCurrency"
                            checked={isSelected}
                            onChange={() => setSelectedCurrencyId(curr.id)}
                            className="w-4 h-4 text-[#0085d0] border-slate-300 focus:ring-[#0085d0] cursor-pointer"
                          />
                        </td>

                        {/* Processing (Badge + Name) */}
                        <td className="py-3 px-3 border-r border-slate-300">
                          <div className="flex items-center gap-2">
                            <span className={`w-5 h-5 rounded-full ${curr.badgeColor} text-white flex items-center justify-center font-bold text-[11px] shadow-2xs shrink-0`}>
                              {curr.badgeSymbol}
                            </span>
                            <span className="font-bold text-slate-800 tracking-tight text-xs sm:text-sm">
                              {curr.name}
                            </span>
                          </div>
                        </td>

                        {/* Available Balance (Green) */}
                        <td className="py-3 px-3 border-r border-slate-300 font-bold text-[#00a651] whitespace-nowrap text-xs sm:text-sm">
                          ${curr.available.toFixed(2)}
                        </td>

                        {/* Pending Balance (Red) */}
                        <td className="py-3 px-3 border-r border-slate-300 font-bold text-[#e11d48] whitespace-nowrap text-xs sm:text-sm">
                          ${curr.pending.toFixed(2)}
                        </td>

                        {/* Account ID / Wallet Address */}
                        <td className="py-3 px-3 text-slate-700">
                          <div className="flex items-center justify-between gap-1 group">
                            <span className="font-medium text-xs truncate max-w-[130px] sm:max-w-[170px]" title={curr.accountId}>
                              Account ID: <strong className="text-slate-900">{curr.accountId || 'Not Set'}</strong>
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenEdit(curr);
                              }}
                              className="text-slate-400 hover:text-[#0085d0] p-1 rounded transition-colors"
                              title="Edit account wallet address"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* MESSAGE BELOW TABLE */}
            <div className="pt-2 text-sm text-slate-600 font-normal">
              {accountBalance <= 0 ? (
                <p className="text-slate-700">You have no funds to withdraw.</p>
              ) : (
                <p className="text-emerald-700 font-semibold">
                  You have ${accountBalance.toFixed(2)} eligible for withdrawal.
                </p>
              )}
            </div>

            {/* WITHDRAWAL FORM (EXPANDS IF USER WANTS TO WITHDRAW) */}
            <div className="pt-4 border-t border-slate-200">
              <form onSubmit={handleWithdraw} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Withdrawal Amount ($ USD)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      step="any"
                      placeholder="0.00"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-8 py-2.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0085d0] focus:ring-1 focus:ring-[#0072ce] transition-all"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Selected asset: <strong className="text-slate-800">{selectedCurrency.name}</strong> (Destination: <span className="font-mono text-slate-700">{selectedCurrency.accountId}</span>)
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting || selectedCurrency.available <= 0}
                    className="flex-1 bg-[#0085d0] hover:bg-[#0072ce] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-extrabold py-3 px-6 rounded text-xs sm:text-sm tracking-wider uppercase transition-colors shadow-sm flex items-center justify-center cursor-pointer"
                  >
                    {isSubmitting ? 'PROCESSING...' : 'REQUEST WITHDRAWAL'}
                  </button>

                  <Link
                    href="/investments"
                    className="py-3 px-4 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Deposit Funds
                  </Link>
                </div>
              </form>
            </div>

          </div>

          {/* RIGHT VISUAL PANEL (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 flex flex-col justify-between p-6 sm:p-8 relative overflow-hidden text-white">
            
            {/* ATM Visual Card */}
            <div className="relative w-full h-[260px] sm:h-[320px] md:h-[360px] rounded-lg overflow-hidden shadow-lg border border-slate-700">
              <Image
                src="/images/withdraw-atm.jpg"
                alt="Automated teller machine cash withdrawal"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-600/90 text-xs font-bold uppercase tracking-wider text-white mb-1.5 shadow-xs">
                  <CreditCard className="w-3.5 h-3.5" />
                  Instant Cashout
                </div>
                <h3 className="text-base font-extrabold text-white">
                  Fast & Automated Payouts
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                  Automated daemon relays broadcast crypto withdrawals direct to your personal wallet address with zero platform fees.
                </p>
              </div>
            </div>

            {/* WITHDRAWAL POLICY DETAILS */}
            <div className="mt-6 bg-slate-800/80 p-5 rounded-lg border border-slate-700/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-[#0085d0]" />
                Withdrawal Rules & Guarantees
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li>
                  <strong className="text-white">Fee Structure:</strong> 0.00% platform commission on all Bitcoin, USDT, and Litecoin cashouts.
                </li>
                <li>
                  <strong className="text-white">Processing Time:</strong> Automated processing dispatched within 1 - 60 minutes.
                </li>
                <li>
                  <strong className="text-white">Wallet Address Accuracy:</strong> Ensure your destination account address is correct before requesting.
                </li>
              </ul>
            </div>

          </div>

        </div>

      </section>

      {/* EDIT ACCOUNT WALLET MODAL */}
      {editingCurrency && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Edit3 className="w-4 h-4 text-[#0085d0]" />
                Edit {editingCurrency.name} Account ID
              </div>
              <button
                onClick={() => setEditingCurrency(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Destination Wallet Address / Account ID
                </label>
                <input
                  type="text"
                  required
                  value={editAddressInput}
                  onChange={(e) => setEditAddressInput(e.target.value)}
                  placeholder="Enter wallet address or account ID"
                  className="w-full bg-white border border-slate-300 rounded px-3.5 py-2.5 text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0085d0] focus:ring-1 focus:ring-[#0072ce] transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCurrency(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 rounded border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#0085d0] hover:bg-[#0072ce] text-white rounded uppercase tracking-wider transition-colors shadow-xs"
                >
                  Save Address
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
