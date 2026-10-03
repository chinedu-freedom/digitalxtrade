'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TablePagination({
  currentPage = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
  itemLabel = 'items'
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers array (max 5 page buttons around current page)
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="bg-slate-50/90 px-4 py-3 border-t border-slate-200 rounded-b-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans">
      {/* Item Range Counter */}
      <div className="text-slate-600 font-medium">
        Showing <span className="font-extrabold text-slate-900">{startItem}</span> to{' '}
        <span className="font-extrabold text-slate-900">{endItem}</span> of{' '}
        <span className="font-extrabold text-slate-900">{totalItems}</span> {itemLabel}
      </div>

      {/* Prev / Page Numbers / Next Buttons */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* PREV BUTTON */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-extrabold text-slate-700 hover:bg-blue-50 hover:text-[#0085d0] hover:border-[#0085d0] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
          title="Previous 10 items"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Prev</span>
        </button>

        {/* NUMBERED PAGE BUTTONS */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((pg) => {
            const isCurrent = pg === currentPage;
            return (
              <button
                key={pg}
                type="button"
                onClick={() => onPageChange && onPageChange(pg)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-black text-xs transition-all cursor-pointer flex items-center justify-center ${
                  isCurrent
                    ? 'bg-[#0085d0] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {pg}
              </button>
            );
          })}
        </div>

        {/* NEXT BUTTON */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-extrabold text-slate-700 hover:bg-blue-50 hover:text-[#0085d0] hover:border-[#0085d0] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
          title="Next 10 items"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
