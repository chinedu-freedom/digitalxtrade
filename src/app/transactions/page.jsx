'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HeaderNav from '@/components/HeaderNav';
import SubNav from '@/components/SubNav';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import api from '@/lib/api';
import { 
  Receipt, 
  Search, 
  Filter, 
  Clock, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Loader2,
  RotateCcw,
  Calendar
} from 'lucide-react';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleResetFilters = () => {
    setSearchQuery('');
    setTypeFilter('All');
    setDateFilter('All');
    setCustomStartDate('');
    setCustomEndDate('');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery.trim() !== '' || typeFilter !== 'All' || dateFilter !== 'All' || customStartDate !== '' || customEndDate !== '';

  // Fetch transactions from backend
  useEffect(() => {
    api.get('/transactions')
      .then((res) => {
        const data = res.data;
        if (data && data.success && Array.isArray(data.transactions)) {
          setTransactions(data.transactions);
        } else {
          setTransactions([]);
        }
      })
      .catch(() => {
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
      const rawDate = t.created_at || t.createdAt;
      if (!rawDate) return false;
      const itemDate = new Date(rawDate);
      if (isNaN(itemDate.getTime())) return false;

      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
      const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

      if (dateFilter === 'Today') {
        if (itemDate < startOfToday || itemDate > endOfToday) return false;
      } else if (dateFilter === 'Yesterday') {
        const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0, 0);
        const endOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59, 999);
        if (itemDate < startOfYesterday || itemDate > endOfYesterday) return false;
      } else if (dateFilter === 'Last 7 Days') {
        const start7 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6, 0, 0, 0, 0);
        if (itemDate < start7 || itemDate > endOfToday) return false;
      } else if (dateFilter === 'Last 15 Days') {
        const start15 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14, 0, 0, 0, 0);
        if (itemDate < start15 || itemDate > endOfToday) return false;
      } else if (dateFilter === 'Last 30 Days') {
        const start30 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29, 0, 0, 0, 0);
        if (itemDate < start30 || itemDate > endOfToday) return false;
      } else if (dateFilter === 'This Month') {
        const startThisMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
        const endThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        if (itemDate < startThisMonth || itemDate > endThisMonth) return false;
      } else if (dateFilter === 'Last Month') {
        const startLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
        const endLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
        if (itemDate < startLastMonth || itemDate > endLastMonth) return false;
      } else if (dateFilter === 'This Year') {
        const startThisYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
        const endThisYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
        if (itemDate < startThisYear || itemDate > endThisYear) return false;
      } else if (dateFilter === 'Custom') {
        if (customStartDate) {
          const start = new Date(customStartDate + 'T00:00:00');
          if (!isNaN(start.getTime()) && itemDate < start) return false;
        }
        if (customEndDate) {
          const end = new Date(customEndDate + 'T23:59:59.999');
          if (!isNaN(end.getTime()) && itemDate > end) return false;
        }
      }
    }

    return true;
  });

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

  const getStatusBadge = (tx) => {
    const rawType = (tx.type || '').toUpperCase();
    const rawStatus = (tx.status || 'COMPLETED').toUpperCase();
    const isCompleted = ['COMPLETED', 'APPROVED', 'SUCCESSFUL', 'SUCCESS'].includes(rawStatus);
    const isPending = ['PENDING', 'PROCESSING', 'INITIATED'].includes(rawStatus);

    let statusText = 'Completed';
    let statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';

    if (rawType === 'ADMIN_CREDIT') {
      statusText = 'Deposit credited';
      statusColor = 'bg-blue-50 text-blue-700 border-blue-200';
    } else if (rawType === 'ADMIN_DEBIT') {
      statusText = 'Deposit debited';
      statusColor = 'bg-rose-50 text-rose-700 border-rose-200';
    } else if (rawType === 'DEPOSIT') {
      if (isCompleted) {
        statusText = 'Deposit successful';
        statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      } else if (isPending) {
        statusText = 'Pending';
        statusColor = 'bg-amber-50 text-amber-700 border-amber-200';
      } else {
        statusText = 'Rejected';
        statusColor = 'bg-rose-50 text-rose-700 border-rose-200';
      }
    } else if (rawType === 'WITHDRAWAL' || rawType === 'WITHDRAW') {
      if (isCompleted) {
        statusText = 'Withdrawal successful';
        statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      } else if (isPending) {
        statusText = 'Pending';
        statusColor = 'bg-amber-50 text-amber-700 border-amber-200';
      } else {
        statusText = 'Rejected';
        statusColor = 'bg-rose-50 text-rose-700 border-rose-200';
      }
    } else {
      if (isCompleted) {
        statusText = 'Completed';
        statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      } else if (isPending) {
        statusText = 'Pending';
        statusColor = 'bg-amber-50 text-amber-700 border-amber-200';
      } else {
        statusText = 'Rejected';
        statusColor = 'bg-rose-50 text-rose-700 border-rose-200';
      }
    }

    return { statusText, statusColor };
  };

  if (loading) {
    return <PageLoader />;
  }

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



        {/* FILTER CONTROLS BAR (USING SHADCN SELECT DROPDOWNS MATCHING IMAGE 2) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            
            {/* Search Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Search Transaction / Ref ID
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Enter keyword or ID..."
                  className="w-full h-10 bg-white border border-slate-300 rounded-lg pl-9 pr-3 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0085d0] focus:ring-1 focus:ring-[#0085d0] transition-all"
                />
              </div>
            </div>

            {/* Type Shadcn Select Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                TYPE
              </label>
              <Select
                value={typeFilter}
                onValueChange={(val) => {
                  setTypeFilter(val);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-full h-10 bg-white border-slate-300 text-slate-900 rounded-lg text-xs font-bold focus:ring-[#0085d0]">
                  <SelectValue placeholder="All Transactions" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 text-slate-800 shadow-lg">
                  <SelectItem value="All">All Transactions</SelectItem>
                  <SelectItem value="Plus">Plus (+)</SelectItem>
                  <SelectItem value="Minus">Minus (-)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range Shadcn Select Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                DATE RANGE
              </label>
              <Select
                value={dateFilter}
                onValueChange={(val) => {
                  setDateFilter(val);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-full h-10 bg-white border-slate-300 text-slate-900 rounded-lg text-xs font-bold focus:ring-[#0085d0]">
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 text-slate-800 shadow-lg">
                  <SelectItem value="All">All Time</SelectItem>
                  <SelectItem value="Today">Today</SelectItem>
                  <SelectItem value="Yesterday">Yesterday</SelectItem>
                  <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
                  <SelectItem value="Last 15 Days">Last 15 Days</SelectItem>
                  <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                  <SelectItem value="This Month">This Month</SelectItem>
                  <SelectItem value="Last Month">Last Month</SelectItem>
                  <SelectItem value="This Year">This Year</SelectItem>
                  <SelectItem value="Custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>

          {/* Custom Date Inputs (when Custom Range selected) */}
          {dateFilter === 'Custom' && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3 animate-in fade-in duration-200">
              <div className="flex-1 min-w-[140px]">
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 uppercase mb-1">
                  <Calendar className="w-3 h-3 text-[#0085d0]" />
                  <span>From Date</span>
                </label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => {
                    setCustomStartDate(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full h-10 bg-white border border-slate-300 rounded-lg px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0085d0] focus:ring-1 focus:ring-[#0085d0]"
                />
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 uppercase mb-1">
                  <Calendar className="w-3 h-3 text-[#0085d0]" />
                  <span>To Date</span>
                </label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => {
                    setCustomEndDate(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full h-10 bg-white border border-slate-300 rounded-lg px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0085d0] focus:ring-1 focus:ring-[#0085d0]"
                />
              </div>
              {(customStartDate || customEndDate) && (
                <button
                  type="button"
                  onClick={() => {
                    setCustomStartDate('');
                    setCustomEndDate('');
                    setCurrentPage(1);
                  }}
                  className="mt-5 text-xs text-rose-600 hover:text-rose-700 font-semibold px-3 py-2 rounded-lg border border-rose-200 hover:bg-rose-50 transition-colors"
                >
                  Clear Dates
                </button>
              )}
            </div>
          )}

          {/* Reset Filters Option if any filter is active */}
          {hasActiveFilters && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                Showing <strong className="text-slate-800">{filteredTransactions.length}</strong> of {transactions.length} transactions
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0085d0] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* TRANSACTIONS TABLE */}
        <div className="bg-white rounded-lg border border-slate-300 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0085d0] text-white">
                  <th className="py-3 px-4 font-semibold w-5/12 border-r border-[#0072ce]/40">
                    Transaction Details
                  </th>
                  <th className="py-3 px-4 font-semibold w-2/12 border-r border-[#0072ce]/40 text-right">
                    Amount
                  </th>
                  <th className="py-3 px-4 font-semibold w-2/12 border-r border-[#0072ce]/40 text-center">
                    Status
                  </th>
                  <th className="py-3 px-4 font-semibold w-3/12 text-right">
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-500 font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <span>Loading transactions data</span>
                        <Loader2 className="w-5 h-5 animate-spin text-[#0085d0]" />
                      </div>
                    </td>
                  </tr>
                ) : paginatedTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-16 px-4 text-center">
                      <div className="max-w-md mx-auto flex flex-col items-center justify-center space-y-3">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-[#0085d0] flex items-center justify-center shadow-xs">
                          <Receipt className="w-7 h-7" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-slate-800">No Transactions Found</h3>
                          <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                            There are currently no transactions matching your criteria. When you make deposits, withdrawals, or earn staking rewards, your activity history will appear here.
                          </p>
                        </div>
                      </div>
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
                    const fullText = `${trx.currency || ''} ${trx.gateway || ''} ${trx.description || ''}`.toUpperCase();
                    let assetIcon = '₮';
                    let assetBg = 'bg-[#26a17b] text-white';

                    if (fullText.includes('BEP20')) {
                      assetIcon = '₮';
                      assetBg = 'bg-[#5068f2] text-white';
                    } else if (fullText.includes('USDT') || fullText.includes('TRC20') || fullText.includes('TETHER')) {
                      assetIcon = '₮';
                      assetBg = 'bg-[#26a17b] text-white';
                    } else if (fullText.includes('LTC') || fullText.includes('LITECOIN')) {
                      assetIcon = 'Ł';
                      assetBg = 'bg-[#345d9d] text-white';
                    } else if (fullText.includes('ETH') || fullText.includes('ETHEREUM')) {
                      assetIcon = 'Ξ';
                      assetBg = 'bg-[#627eea] text-white';
                    } else if (fullText.includes('BTC') || fullText.includes('BITCOIN')) {
                      assetIcon = '₿';
                      assetBg = 'bg-[#f7931a] text-white';
                    }

                    const formattedAmount = `${isPositive ? '+' : '-'}$${parseFloat(trx.amount || 0).toFixed(2)}`;
                    const { dateStr, timeStr } = formatDateTwoLines(trx.created_at || trx.createdAt);
                    const { statusText, statusColor } = getStatusBadge(trx);

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

                        {/* Status Badge with Distinct Color */}
                        <td className="py-3.5 px-4 align-top text-center border-r border-slate-300 whitespace-nowrap">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider ${statusColor}`}>
                            {statusText}
                          </span>
                        </td>

                        {/* Date & Time */}
                        <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
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

          {/* PAGINATION CONTROLS */}
          {filteredTransactions.length > pageSize && (
            <div className="bg-slate-50/80 px-4 py-3 border-t border-slate-200 flex items-center justify-between text-xs">
              <div className="text-slate-500 font-medium">
                Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredTransactions.length)} of {filteredTransactions.length} transactions
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded border border-slate-300 bg-white font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>
                <span className="font-bold text-slate-800 px-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded border border-slate-300 bg-white font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>


      </section>

      <FloatingWidgets />
      <Footer />
    </main>
  );
}
