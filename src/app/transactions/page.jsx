'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HeaderNav from '@/components/HeaderNav';
import SubNav from '@/components/SubNav';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';
import { 
  Receipt, 
  ArrowUpRight, 
  ArrowDownRight, 
  Scale, 
  Search, 
  Filter, 
  Clock, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Loader2
} from 'lucide-react';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch transactions from backend
  useEffect(() => {
    fetch('http://localhost:3001/api/transactions')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && Array.isArray(data.transactions)) {
          setTransactions(data.transactions);
        } else {
          setTransactions([]);
        }
      })
      .catch(() => {
        // Static clean fallback list
        setTransactions([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter transactions based on search, type, and date filters
  const filteredTransactions = transactions.filter((t) => {
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const desc = String(t.description || '').toLowerCase();
      const refId = String(t.id || t.reference_id || '').toLowerCase();
      const gateway = String(t.gateway || '').toLowerCase();
      if (!desc.includes(q) && !refId.includes(q) && !gateway.includes(q)) {
        return false;
      }
    }

    // Type filter
    const isMinus = ['WITHDRAWAL', 'ADMIN_DEBIT', 'STAKE', 'DEBIT'].includes((t.type || '').toUpperCase());
    if (typeFilter === 'Plus' && isMinus) return false;
    if (typeFilter === 'Minus' && !isMinus) return false;

    // Date filter
    if (dateFilter !== 'All') {
      const itemDate = new Date(t.created_at || t.createdAt || Date.now());
      const now = new Date();
      if (dateFilter === 'Today') {
        if (itemDate.toDateString() !== now.toDateString()) return false;
      } else if (dateFilter === 'Yesterday') {
        const yest = new Date(now);
        yest.setDate(yest.getDate() - 1);
        if (itemDate.toDateString() !== yest.toDateString()) return false;
      } else if (dateFilter === 'Last 7 Days') {
        const days7 = new Date(now);
        days7.setDate(days7.getDate() - 7);
        if (itemDate < days7) return false;
      } else if (dateFilter === 'Last 15 Days') {
        const days15 = new Date(now);
        days15.setDate(days15.getDate() - 15);
        if (itemDate < days15) return false;
      } else if (dateFilter === 'Last 30 Days') {
        const days30 = new Date(now);
        days30.setDate(days30.getDate() - 30);
        if (itemDate < days30) return false;
      } else if (dateFilter === 'This Month') {
        if (itemDate.getMonth() !== now.getMonth() || itemDate.getFullYear() !== now.getFullYear()) return false;
      } else if (dateFilter === 'Last Month') {
        const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        if (itemDate.getMonth() !== lastMonthDate.getMonth() || itemDate.getFullYear() !== lastMonthDate.getFullYear()) return false;
      } else if (dateFilter === 'This Year') {
        if (itemDate.getFullYear() !== now.getFullYear()) return false;
      }
    }

    return true;
  });

  // Calculate Metrics
  const totalVolume = transactions.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
  const totalCredit = transactions
    .filter((t) => !['WITHDRAWAL', 'ADMIN_DEBIT', 'STAKE', 'DEBIT'].includes((t.type || '').toUpperCase()))
    .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
  const totalDebit = transactions
    .filter((t) => ['WITHDRAWAL', 'ADMIN_DEBIT', 'STAKE', 'DEBIT'].includes((t.type || '').toUpperCase()))
    .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
  const netFlow = totalCredit - totalDebit;

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / pageSize));
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Format Date in two lines (Sep-25-2026 / 02:45:10 PM)
  const formatDateTwoLines = (dateString) => {
    if (!dateString) return { dateStr: 'Sep-25-2026', timeStr: '12:00:00 PM' };
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return { dateStr: 'Sep-25-2026', timeStr: '12:00:00 PM' };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');

    return {
      dateStr: `${month}-${day}-${year}`,
      timeStr: `${formattedHours}:${minutes}:${seconds} ${ampm}`,
    };
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <HeaderNav />
      <SubNav activeTab="TRANSACTIONS" />

      {/* MAIN CONTENT AREA */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-6">
        
        {/* PAGE TITLE */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#00529b] tracking-tight">
            Transaction History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            View all your investment yields, deposits, withdrawals, and account transactions.
          </p>
        </div>

        {/* SUMMARY METRIC CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Volume */}
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Volume</div>
              <div className="text-xl font-black text-slate-900 mt-1">${totalVolume.toFixed(2)}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center font-bold">
              <Receipt className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2: Total Credit */}
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Credit (+)</div>
              <div className="text-xl font-black text-[#00a651] mt-1">${totalCredit.toFixed(2)}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#00a651] border border-emerald-100 flex items-center justify-center font-bold">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>

          {/* Card 3: Total Debit */}
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Debit (-)</div>
              <div className="text-xl font-black text-[#e11d48] mt-1">${totalDebit.toFixed(2)}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-rose-50 text-[#e11d48] border border-rose-100 flex items-center justify-center font-bold">
              <ArrowDownRight className="w-5 h-5" />
            </div>
          </div>

          {/* Card 4: Net Flow */}
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Net Flow</div>
              <div className="text-xl font-black text-[#0085d0] mt-1">${netFlow.toFixed(2)}</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0085d0] border border-blue-100 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* FILTER CONTROLS BAR */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            
            {/* Search Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Search Transaction / Ref ID
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Enter keyword or ID..."
                  className="w-full bg-white border border-slate-300 rounded pl-9 pr-3 py-2 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0085d0] focus:ring-1 focus:ring-[#0085d0]"
                />
              </div>
            </div>

            {/* Type Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0085d0] focus:ring-1 focus:ring-[#0085d0] cursor-pointer"
              >
                <option value="All">All Transactions</option>
                <option value="Plus">Plus (+)</option>
                <option value="Minus">Minus (-)</option>
              </select>
            </div>

            {/* Date Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Date Range
              </label>
              <select
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0085d0] focus:ring-1 focus:ring-[#0085d0] cursor-pointer"
              >
                <option value="All">All Time</option>
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 15 Days">Last 15 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="This Month">This Month</option>
                <option value="Last Month">Last Month</option>
                <option value="This Year">This Year</option>
              </select>
            </div>

          </div>
        </div>

        {/* TRANSACTIONS TABLE */}
        <div className="bg-white rounded-lg border border-slate-300 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0085d0] text-white">
                  <th className="py-3 px-4 font-semibold w-6/12 border-r border-[#0072ce]/40">
                    Transaction Details
                  </th>
                  <th className="py-3 px-4 font-semibold w-3/12 border-r border-[#0072ce]/40 text-right">
                    Amount
                  </th>
                  <th className="py-3 px-4 font-semibold w-3/12 text-right">
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="py-12 text-center text-slate-500 font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-[#0085d0]" />
                        <span>Loading transactions data...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-12 text-center text-slate-600 font-bold">
                      Data not found
                    </td>
                  </tr>
                ) : (
                  paginatedTransactions.map((trx) => {
                    const rawType = (trx.type || '').toUpperCase();
                    const isPositive = !['WITHDRAWAL', 'ADMIN_DEBIT', 'STAKE', 'DEBIT'].includes(rawType);

                    let prefixLabel = 'Earning';
                    if (rawType.includes('DEPOSIT') || rawType.includes('CREDIT')) {
                      prefixLabel = 'Deposit';
                    } else if (rawType.includes('WITHDRAW') || rawType.includes('DEBIT')) {
                      prefixLabel = 'Withdrawal';
                    } else if (rawType.includes('COMMISSION') || rawType.includes('REFERRAL')) {
                      prefixLabel = 'Commission';
                    } else if (rawType.includes('STAKE')) {
                      prefixLabel = 'Staking';
                    }

                    const descText = trx.description || 'Investment Return Yield';
                    const gatewayStr = (trx.gateway || trx.currency || 'BTC').toUpperCase();

                    let assetIcon = '₿';
                    let assetBg = 'bg-[#f7931a] text-white';
                    if (gatewayStr.includes('LTC') || gatewayStr.includes('LITECOIN')) {
                      assetIcon = 'Ł';
                      assetBg = 'bg-[#a6a9aa] text-white';
                    } else if (gatewayStr.includes('USDT') || gatewayStr.includes('TRC20')) {
                      assetIcon = '₮';
                      assetBg = 'bg-[#26a17b] text-white';
                    } else if (gatewayStr.includes('BEP20')) {
                      assetIcon = '₮';
                      assetBg = 'bg-[#5068f2] text-white';
                    }

                    const formattedAmount = `${isPositive ? '+' : '-'}$${parseFloat(trx.amount || 0).toFixed(2)}`;
                    const { dateStr, timeStr } = formatDateTwoLines(trx.created_at || trx.createdAt);

                    return (
                      <tr key={trx.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Transaction Details & Description */}
                        <td className="py-3.5 px-4 space-y-1 align-top border-r border-slate-300">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider ${
                              isPositive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {prefixLabel}
                            </span>
                            <span className="font-mono text-xs text-slate-500">
                              ID: {trx.id}
                            </span>
                          </div>
                          <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                            {descText}
                          </p>
                        </td>

                        {/* Amount */}
                        <td className="py-3.5 px-4 align-top text-right border-r border-slate-300">
                          <div className="flex items-center justify-end gap-2">
                            <span className={`font-black text-sm sm:text-base ${isPositive ? 'text-[#00a651]' : 'text-[#e11d48]'}`}>
                              {formattedAmount}
                            </span>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-2xs shrink-0 ${assetBg}`}>
                              {assetIcon}
                            </span>
                          </div>
                        </td>

                        {/* Date & Time */}
                        <td className="py-3.5 px-4 align-top text-right">
                          <div className="font-bold text-slate-900 text-xs">{dateStr}</div>
                          <div className="text-slate-500 text-[11px] font-mono mt-0.5">{timeStr}</div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION FOOTER */}
          <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-slate-600">
              Showing {filteredTransactions.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredTransactions.length)} of {filteredTransactions.length} entries
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-bold cursor-pointer"
              >
                Previous
              </button>
              <span className="font-bold text-slate-900">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-bold cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>

      </section>

      <FloatingWidgets />
      <Footer />
    </main>
  );
}
