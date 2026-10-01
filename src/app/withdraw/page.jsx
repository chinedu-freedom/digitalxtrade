'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
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
  Lock,
  Loader2
} from 'lucide-react';
import HeaderNav from '@/components/HeaderNav';
import SubNav from '@/components/SubNav';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import { useAuth } from '@/context/AuthContext';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import api from '@/lib/api';

export default function WithdrawFundsPage() {
  const { user } = useAuth();
  const [walletType, setWalletType] = useState('deposit');
  const [accountBalance, setAccountBalance] = useState(0.00);
  const [pendingWithdrawals, setPendingWithdrawals] = useState(0.00);
  const [selectedCurrencyId, setSelectedCurrencyId] = useState('bitcoin');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingCurrency, setEditingCurrency] = useState(null);
  const [editAddressInput, setEditAddressInput] = useState('');

  // Currencies state dynamically bound to backend API user wallet data
  const [currencies, setCurrencies] = useState([
    {
      id: 'bitcoin',
      name: 'BITCOIN',
      symbol: 'BTC',
      badgeColor: 'bg-[#f7931a]',
      badgeSymbol: '₿',
      iconUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=035',
      available: 0.00,
      pending: 0.00,
      accountId: 'Not Set',
      minWithdrawal: 20.00
    },
    {
      id: 'usdt_trc20',
      name: 'USDT(TRC20)',
      symbol: 'USDT',
      badgeColor: 'bg-[#26a17b]',
      badgeSymbol: '₮',
      iconUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=035',
      available: 0.00,
      pending: 0.00,
      accountId: 'Not Set',
      minWithdrawal: 10.00
    },
    {
      id: 'usdt_bep20',
      name: 'USDT(BEP20)',
      symbol: 'USDT',
      badgeColor: 'bg-[#f3ba2f]',
      badgeSymbol: '₮',
      iconUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=035',
      available: 0.00,
      pending: 0.00,
      accountId: 'Not Set',
      minWithdrawal: 10.00
    },
    {
      id: 'litecoin',
      name: 'LITECOIN',
      symbol: 'LTC',
      badgeColor: 'bg-[#345d9d]',
      badgeSymbol: 'Ł',
      iconUrl: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=035',
      available: 0.00,
      pending: 0.00,
      accountId: 'Not Set',
      minWithdrawal: 15.00
    }
  ]);

  // Fetch live account balance, pending withdrawals & wallet addresses from backend API
  const fetchWithdrawalData = async () => {
    try {
      setLoading(true);
      let res;
      try {
        res = await api.get('/withdraw');
      } catch (e) {
        res = await api.get('/user/dashboard');
      }

      if (res && res.data) {
        const d = res.data.data || res.data;
        if (d.accountBalance !== undefined) setAccountBalance(parseFloat(d.accountBalance));
        if (d.pendingWithdrawals !== undefined) setPendingWithdrawals(parseFloat(d.pendingWithdrawals));
        if (d.currencies && Array.isArray(d.currencies)) {
          setCurrencies(d.currencies);
        } else if (res.data.user) {
          const u = res.data.user;
          const totalBal = parseFloat(u.balance || 0);
          const totalPending = parseFloat(u.pending_withdrawals || 0);
          setAccountBalance(totalBal);
          setPendingWithdrawals(totalPending);
        }
      }
    } catch (err) {
      console.error('Failed to load withdrawal details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawalData();
  }, []);

  const selectedCurrency = currencies.find(c => c.id === selectedCurrencyId) || currencies[0];

  // Handle Edit Account Address
  const handleOpenEdit = (curr) => {
    setEditingCurrency(curr);
    setEditAddressInput(curr.accountId === 'Not Set' ? '' : curr.accountId);
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    const cleanAddress = editAddressInput.trim();
    if (!cleanAddress) {
      toast.error('Account address cannot be empty.');
      return;
    }

    try {
      const payload = {
        currencyId: editingCurrency.id,
        accountId: cleanAddress,
        wallet_address: cleanAddress
      };

      const res = await api.post('/withdraw/account', payload);
      toast.success(res.data?.message || `Account ID updated for ${editingCurrency.name}`);
      setEditingCurrency(null);
      fetchWithdrawalData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update account address');
    }
  };

  // Handle Withdrawal Request Submission
  const handleWithdraw = async (e) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);

    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error('Please enter a valid withdrawal amount.');
      return;
    }

    if (amountNum < selectedCurrency.minWithdrawal) {
      toast.error(`Minimum withdrawal amount for ${selectedCurrency.name} is $${selectedCurrency.minWithdrawal.toFixed(2)}`);
      return;
    }

    if (amountNum > selectedCurrency.available) {
      toast.error(`Insufficient balance in ${selectedCurrency.name}. You have ${selectedCurrency.available.toFixed(2)} available.`);
      return;
    }

    if (!selectedCurrency.accountId || selectedCurrency.accountId === 'Not Set') {
      toast.error(`Please set your ${selectedCurrency.name} wallet address before requesting a withdrawal.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        currencyId: selectedCurrency.id,
        currency: selectedCurrency.id,
        amount: amountNum,
        walletType,
        wallet_type: walletType
      };

      const res = await api.post('/withdraw', payload);
      toast.success(res.data?.message || 'Withdrawal request submitted successfully!');
      setWithdrawAmount('');
      fetchWithdrawalData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit withdrawal request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <HeaderNav />
      <SubNav activeTab="WITHDRAW FUNDS" />

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
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300 text-xs uppercase tracking-wider">
                    <th className="py-2.5 px-3">Processing</th>
                    <th className="py-2.5 px-3">Available</th>
                    <th className="py-2.5 px-3">Pending</th>
                    <th className="py-2.5 px-3">Account</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {currencies.map((curr) => {
                    const isSelected = selectedCurrencyId === curr.id;
                    const hasAddress = curr.accountId && curr.accountId !== 'Not Set';

                    return (
                      <tr 
                        key={curr.id}
                        onClick={() => setSelectedCurrencyId(curr.id)}
                        className={`transition-colors cursor-pointer ${
                          isSelected ? 'bg-blue-50/60 font-semibold' : 'hover:bg-slate-50'
                        }`}
                      >
                        {/* Processing Column: Radio + Single Primary Icon + Name */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="currencySelect"
                              checked={isSelected}
                              onChange={() => setSelectedCurrencyId(curr.id)}
                              className="w-4 h-4 text-[#0085d0] border-slate-300 focus:ring-[#0072ce] cursor-pointer"
                            />
                            {curr.iconUrl ? (
                              <img 
                                src={curr.iconUrl} 
                                alt={curr.name} 
                                className="w-6 h-6 object-contain shrink-0" 
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            ) : (
                              <span className={`w-6 h-6 rounded-full ${curr.badgeColor} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}>
                                {curr.badgeSymbol}
                              </span>
                            )}
                            <span className="font-bold text-slate-800 text-xs sm:text-sm whitespace-nowrap">
                              {curr.name}
                            </span>
                          </div>
                        </td>

                        {/* Available Column */}
                        <td className="py-3 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                          ${curr.available.toFixed(2)}
                        </td>

                        {/* Pending Column */}
                        <td className="py-3 px-3 font-mono font-semibold text-slate-500 whitespace-nowrap">
                          ${curr.pending.toFixed(2)}
                        </td>

                        {/* Account ID / Not Set Column */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            {hasAddress ? (
                              <span className="font-mono text-xs text-slate-800 font-bold bg-slate-100 border border-slate-200 px-2 py-0.5 rounded truncate max-w-[120px] sm:max-w-[160px]">
                                {curr.accountId}
                              </span>
                            ) : (
                              <span className="text-xs text-amber-700 italic font-medium bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                                Not Set
                              </span>
                            )}

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenEdit(curr);
                              }}
                              className="text-[#0085d0] hover:text-[#0072ce] font-bold text-xs underline underline-offset-2 ml-1 cursor-pointer flex items-center gap-0.5"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>{hasAddress ? 'Edit' : 'Set'}</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ELIGIBILITY STATUS MSG */}
            <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs sm:text-sm font-medium">
              {accountBalance <= 0 ? (
                <p className="text-slate-700">You have no funds to withdraw.</p>
              ) : (
                <p className="text-emerald-700 font-semibold">
                  You have ${accountBalance.toFixed(2)} eligible for withdrawal.
                </p>
              )}
            </div>

            {/* WITHDRAWAL FORM */}
            <div className="pt-4 border-t border-slate-200">
              <form onSubmit={handleWithdraw} className="space-y-4">
                  {/* Select Source Wallet (Deposit vs Profit Balance) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Withdraw From (Source Wallet)
                    </label>
                    <Select value={walletType} onValueChange={(val) => setWalletType(val)}>
                      <SelectTrigger className="w-full bg-white border border-slate-300 rounded-lg h-12 px-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-[#0085d0]">
                        <SelectValue placeholder="Select Source Wallet" />
                      </SelectTrigger>
                      <SelectContent searchable={false} className="bg-white border border-slate-200 shadow-xl rounded-lg">
                        <SelectItem 
                          value="deposit" 
                          label={`Deposit Balance ($${parseFloat(user?.depositBalance || user?.deposit_balance || 0).toFixed(2)})`}
                          className="py-2.5 text-slate-800 hover:bg-slate-50 cursor-pointer"
                        >
                          <div className="flex items-center justify-between w-full gap-4">
                            <span className="font-bold">Deposit Balance</span>
                            <span className="font-extrabold text-blue-600">${parseFloat(user?.depositBalance || user?.deposit_balance || 0).toFixed(2)}</span>
                          </div>
                        </SelectItem>
                        <SelectItem 
                          value="profit" 
                          label={`Profit Balance ($${parseFloat(user?.profitBalance || user?.profit_balance || 0).toFixed(2)})`}
                          className="py-2.5 text-slate-800 hover:bg-slate-50 cursor-pointer"
                        >
                          <div className="flex items-center justify-between w-full gap-4">
                            <span className="font-bold">Profit Balance</span>
                            <span className="font-extrabold text-emerald-600">${parseFloat(user?.profitBalance || user?.profit_balance || 0).toFixed(2)}</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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

                {/* DYNAMIC FEE & NET PAYOUT SUMMARY */}
                {withdrawAmount && !isNaN(parseFloat(withdrawAmount)) && parseFloat(withdrawAmount) > 0 && (
                  <div className={`p-3.5 rounded text-xs border ${walletType === 'deposit' ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-blue-50 border-blue-200 text-blue-900'}`}>
                    {walletType === 'deposit' ? (
                      <div className="space-y-1">
                        <div className="flex justify-between font-bold">
                          <span>Early Capital Withdrawal Fee (50%):</span>
                          <span className="text-amber-700">-${(parseFloat(withdrawAmount) * 0.50).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-extrabold text-sm border-t border-amber-200 pt-1 mt-1 text-slate-900">
                          <span>Net Payout Amount:</span>
                          <span className="text-emerald-600">${(parseFloat(withdrawAmount) * 0.50).toFixed(2)}</span>
                        </div>
                        <p className="text-[11px] text-amber-800 mt-1">
                          ⚠️ Note: Capital withdrawals from Deposit Balance incur a 50% early withdrawal fee.
                        </p>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center font-bold">
                        <span>Withdrawal Fee (0%): <span className="text-emerald-600 font-normal">$0.00</span></span>
                        <span>Net Payout: <span className="text-emerald-600 font-extrabold text-sm">${parseFloat(withdrawAmount).toFixed(2)}</span></span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting || accountBalance <= 0}
                    className="flex-1 bg-[#0085d0] hover:bg-[#0072ce] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-extrabold py-3 px-6 rounded text-xs sm:text-sm tracking-wider uppercase transition-colors shadow-sm flex items-center justify-center cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span>Submitting withdrawal request</span>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                      </span>
                    ) : (
                      'REQUEST WITHDRAWAL'
                    )}
                  </button>

                  <Link
                    href="/deposit-list"
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
                  <strong className="text-white">Profit Balance Payouts:</strong> 0.00% fee (100% of requested earnings are paid out).
                </li>
                <li>
                  <strong className="text-white">Deposit Balance Payouts:</strong> 50.00% early capital withdrawal fee applies to capital redemptions.
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
        <div onClick={() => setEditingCurrency(null)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 cursor-default">
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
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 rounded border border-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#0085d0] hover:bg-[#0072ce] text-white rounded uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
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
