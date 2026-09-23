'use client';

import React, { useState } from 'react';
import { FileText, ExternalLink, X, CheckCircle } from 'lucide-react';

export default function AboutCertificateSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="bg-slate-50 py-16 px-4 md:px-8 font-sans border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Top Action Button: CHECK OUR CERTIFICATE */}
        <div className="mb-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#0085d0] hover:bg-[#0072ce] text-white font-extrabold px-8 py-3.5 rounded text-xs md:text-sm tracking-wider uppercase transition-all shadow-md flex items-center gap-2.5 cursor-pointer"
          >
            <span>CHECK OUR CERTIFICATE</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* EMBEDDED CERTIFICATE OF INCORPORATION DOCUMENT FRAME */}
        <div className="w-full max-w-2xl bg-white border border-slate-300 shadow-2xl p-6 md:p-10 text-slate-900 font-serif relative rounded-sm">
          {/* Header Copy label */}
          <div className="text-center mb-6">
            <span className="text-xs font-sans font-bold tracking-widest text-slate-800 uppercase block mb-3">
              FILE COPY
            </span>

            {/* UK Royal Coat of Arms Emblem SVG */}
            <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-900">
                <path d="M50 5 L58 22 L76 22 L62 33 L67 50 L50 39 L33 50 L38 33 L24 22 L42 22 Z" />
                <circle cx="50" cy="55" r="22" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M40 55 C40 45, 60 45, 60 55 C60 65, 40 65, 40 55 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M30 80 Q50 90 70 80" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </div>

            <h2 className="text-lg md:text-xl font-bold tracking-wider uppercase mb-1">
              CERTIFICATE OF INCORPORATION
            </h2>
            <h3 className="text-sm md:text-base font-bold tracking-wide uppercase mb-4">
              OF A PRIVATE LIMITED COMPANY
            </h3>
            <p className="text-xs md:text-sm font-semibold tracking-wide">
              Company No. 4490004
            </p>
          </div>

          {/* Certificate Body Text */}
          <div className="text-center space-y-6 text-xs md:text-sm leading-relaxed max-w-lg mx-auto py-4">
            <p className="font-medium">
              The Registrar of Companies for England and Wales hereby certifies that
            </p>
            <p className="text-base md:text-lg font-black uppercase tracking-wider text-slate-950 py-1">
              DIGITAL X TRADE LIMITED
            </p>
            <p className="font-medium">
              is this day incorporated under the Companies Act 1985 as a private company and that the company is limited.
            </p>
            <p className="font-medium pt-2">
              Given at Companies House, Cardiff, the 19th July 2002
            </p>
          </div>

          {/* Footer Seals & Barcode Row */}
          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap items-end justify-between gap-6 text-[10px] font-sans">
            {/* Barcode */}
            <div className="flex flex-col items-start space-y-1">
              <div className="flex gap-1 h-8 items-center">
                <div className="w-1.5 h-full bg-slate-900" />
                <div className="w-0.5 h-full bg-slate-900" />
                <div className="w-1 h-full bg-slate-900" />
                <div className="w-2 h-full bg-slate-900" />
                <div className="w-0.5 h-full bg-slate-900" />
                <div className="w-1.5 h-full bg-slate-900" />
                <div className="w-1 h-full bg-slate-900" />
                <div className="w-2 h-full bg-slate-900" />
                <div className="w-0.5 h-full bg-slate-900" />
                <div className="w-1.5 h-full bg-slate-900" />
              </div>
              <span className="font-mono text-[11px] font-bold text-slate-800">*N044900048*</span>
            </div>

            {/* Companies House Logo */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center font-bold text-sm mb-1">
                C
              </div>
              <span className="font-bold text-slate-900 leading-tight">Companies House</span>
              <span className="italic text-slate-600 text-[9px]">for the record</span>
            </div>

            {/* Registrar Seal */}
            <div className="flex flex-col items-center text-center max-w-[120px]">
              <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-[8px] font-bold p-1 mb-1 leading-none text-center">
                SEAL OF REGISTRAR
              </div>
              <span className="text-[8px] font-bold text-slate-800 uppercase leading-tight">
                THE OFFICIAL SEAL OF THE REGISTRAR OF COMPANIES
              </span>
            </div>

            {/* Code */}
            <div className="text-right ml-auto">
              <span className="font-mono text-[10px] font-bold text-slate-600">HC007B</span>
            </div>
          </div>
        </div>

      </div>

      {/* FULLSCREEN PREVIEW MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-white rounded-lg p-6 max-h-[90vh] flex flex-col overflow-y-auto shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full p-2 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Certificate View */}
            <div className="bg-white border border-slate-300 p-8 md:p-12 text-slate-900 font-serif my-4">
              <div className="text-center mb-8">
                <span className="text-xs font-sans font-bold tracking-widest text-slate-800 uppercase block mb-4">
                  FILE COPY
                </span>
                <h2 className="text-xl font-bold uppercase mb-1">CERTIFICATE OF INCORPORATION</h2>
                <h3 className="text-base font-bold uppercase mb-4">OF A PRIVATE LIMITED COMPANY</h3>
                <p className="text-sm font-semibold">Company No. 4490004</p>
              </div>

              <div className="text-center space-y-6 text-sm leading-relaxed max-w-lg mx-auto py-6">
                <p>The Registrar of Companies for England and Wales hereby certifies that</p>
                <p className="text-xl font-black uppercase tracking-wider text-slate-950 py-2">
                  DIGITAL X TRADE LIMITED
                </p>
                <p>is this day incorporated under the Companies Act 1985 as a private company and that the company is limited.</p>
                <p className="pt-2 font-semibold">Given at Companies House, Cardiff, the 19th July 2002</p>
              </div>

              <div className="mt-16 pt-6 border-t border-slate-200 flex items-end justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-slate-800">*N044900048*</span>
                </div>
                <div className="text-center">
                  <span className="font-bold text-xs">Companies House - for the record</span>
                </div>
                <div>
                  <span className="font-mono text-xs text-slate-600">HC007B</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
