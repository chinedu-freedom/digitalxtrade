'use client';

import React, { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';

export default function AboutCertificateSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="bg-white py-12 px-4 md:px-8 font-sans text-slate-900 border-t border-slate-100">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* CERTIFICATE DOCUMENT CONTAINER */}
        <div className="w-full max-w-2xl bg-white border border-slate-400 p-8 md:p-12 text-slate-900 font-sans relative shadow-sm">
          
          {/* Top Label: FILE COPY */}
          <div className="text-center mb-4">
            <span className="text-xs md:text-sm font-bold tracking-wider text-slate-900 uppercase">
              FILE COPY
            </span>
          </div>

          {/* UK ROYAL COAT OF ARMS EMBLEM SVG */}
          <div className="w-24 md:w-28 h-20 md:h-24 mx-auto mb-6 flex items-center justify-center">
            <svg viewBox="0 0 200 160" className="w-full h-full text-slate-900 fill-current">
              {/* Crown */}
              <path d="M 85,25 L 100,10 L 115,25 L 130,20 L 120,40 L 80,40 L 70,20 Z" fill="currentColor" />
              {/* Lion (Left Supporter) */}
              <path d="M 40,50 C 30,40 25,60 20,80 C 25,100 35,110 45,115 C 50,100 55,80 50,60 Z" fill="currentColor" />
              {/* Unicorn (Right Supporter) */}
              <path d="M 160,50 C 170,40 175,60 180,80 C 175,100 165,110 155,115 C 150,100 145,80 150,60 Z" fill="currentColor" />
              {/* Shield (Center) */}
              <path d="M 65,45 L 135,45 L 135,90 C 135,115 100,130 100,130 C 100,130 65,115 65,90 Z" fill="none" stroke="currentColor" strokeWidth="4" />
              {/* Shield Quarters */}
              <line x1="100" y1="45" x2="100" y2="128" stroke="currentColor" strokeWidth="2" />
              <line x1="65" y1="85" x2="135" y2="85" stroke="currentColor" strokeWidth="2" />
              {/* Motto Ribbon */}
              <path d="M 35,135 Q 100,150 165,135 L 155,145 Q 100,160 45,145 Z" fill="currentColor" />
              <text x="100" y="143" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#ffffff">DIEU ET MON DROIT</text>
            </svg>
          </div>

          {/* CERTIFICATE HEADINGS */}
          <div className="text-center mb-8">
            <h2 className="text-base md:text-xl font-bold tracking-wide uppercase mb-1 text-slate-900">
              CERTIFICATE OF INCORPORATION
            </h2>
            <h3 className="text-xs md:text-sm font-bold tracking-wide uppercase mb-6 text-slate-900">
              OF A PRIVATE LIMITED COMPANY
            </h3>
            <p className="text-sm md:text-base font-semibold text-slate-900">
              Company No. 4490004
            </p>
          </div>

          {/* CERTIFICATE BODY TEXT */}
          <div className="text-center space-y-6 text-xs md:text-sm leading-relaxed max-w-lg mx-auto py-2 text-slate-800">
            <p className="font-medium">
              The Registrar of Companies for England and Wales hereby certifies that
            </p>
            <p className="text-base md:text-lg font-black uppercase tracking-wider text-slate-950 py-1 font-sans">
              DIGITAL X TRADE LIMITED
            </p>
            <p className="font-medium">
              is this day incorporated under the Companies Act 1985 as a private company and that the company is limited.
            </p>
            <p className="font-medium pt-4">
              Given at Companies House, Cardiff, the 19th July 2002
            </p>
          </div>

          {/* FOOTER BARCODE, LOGOS & CODES */}
          <div className="mt-12 pt-6 flex flex-wrap items-end justify-between gap-4 text-[10px]">
            {/* Barcode (Left) */}
            <div className="flex flex-col items-start space-y-1">
              <div className="flex gap-[2px] h-9 items-center bg-slate-900 p-0.5">
                <div className="w-1 h-full bg-white" />
                <div className="w-[1px] h-full bg-white" />
                <div className="w-1.5 h-full bg-white" />
                <div className="w-2 h-full bg-white" />
                <div className="w-[1px] h-full bg-white" />
                <div className="w-1 h-full bg-white" />
                <div className="w-2 h-full bg-white" />
                <div className="w-1.5 h-full bg-white" />
                <div className="w-[1px] h-full bg-white" />
                <div className="w-2 h-full bg-white" />
                <div className="w-1 h-full bg-white" />
              </div>
              <span className="font-mono text-[11px] font-bold text-slate-900 tracking-wider">
                *N044900048*
              </span>
            </div>

            {/* Companies House Logo (Center) */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center font-bold text-xs mb-0.5">
                C<span className="text-[9px]">H</span>
              </div>
              <span className="font-bold text-slate-900 text-[11px] leading-tight">Companies House</span>
              <span className="italic text-slate-700 text-[9px]">for the record</span>
            </div>

            {/* Official Seal (Right) */}
            <div className="flex flex-col items-center text-center max-w-[130px]">
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 flex flex-col items-center justify-center text-[7px] font-bold p-1 leading-none text-center">
                <span>REGISTRAR OF COMPANIES</span>
                <span className="font-black text-[9px] my-0.5">C H</span>
                <span>FOR ENGLAND AND WALES</span>
              </div>
              <span className="text-[7px] font-bold text-slate-900 uppercase leading-tight mt-1">
                THE OFFICIAL SEAL OF THE REGISTRAR OF COMPANIES
              </span>
            </div>

            {/* Code (Bottom Right) */}
            <div className="w-full text-right pt-2">
              <span className="font-mono text-[11px] font-bold text-slate-900">HC007B</span>
            </div>
          </div>

        </div>

        {/* BOTTOM ACTION BUTTON: CHECK OUR CERTIFICATE */}
        <div className="mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#0083ca] hover:bg-[#0072ce] text-white font-extrabold px-8 py-3 rounded-none text-xs md:text-sm tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
          >
            CHECK OUR CERTIFICATE
          </button>
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
            <div className="bg-white border border-slate-400 p-8 md:p-12 text-slate-900 font-sans my-4">
              <div className="text-center mb-4">
                <span className="text-xs md:text-sm font-bold tracking-wider text-slate-900 uppercase">FILE COPY</span>
              </div>
              <div className="text-center mb-6">
                <h2 className="text-lg md:text-xl font-bold uppercase mb-1">CERTIFICATE OF INCORPORATION</h2>
                <h3 className="text-xs md:text-sm font-bold uppercase mb-4">OF A PRIVATE LIMITED COMPANY</h3>
                <p className="text-sm font-semibold">Company No. 4490004</p>
              </div>

              <div className="text-center space-y-6 text-sm leading-relaxed max-w-lg mx-auto py-4">
                <p>The Registrar of Companies for England and Wales hereby certifies that</p>
                <p className="text-xl font-black uppercase tracking-wider text-slate-950 py-1">
                  DIGITAL X TRADE LIMITED
                </p>
                <p>is this day incorporated under the Companies Act 1985 as a private company and that the company is limited.</p>
                <p className="pt-2 font-semibold">Given at Companies House, Cardiff, the 19th July 2002</p>
              </div>

              <div className="mt-12 pt-6 border-t border-slate-300 flex items-end justify-between text-xs">
                <div>
                  <span className="font-mono font-bold text-slate-900">*N044900048*</span>
                </div>
                <div className="text-center">
                  <span className="font-bold">Companies House - for the record</span>
                </div>
                <div>
                  <span className="font-mono font-bold text-slate-900">HC007B</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

