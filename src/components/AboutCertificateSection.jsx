'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, X, ZoomIn } from 'lucide-react';

export default function AboutCertificateSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="bg-slate-50 py-14 px-4 md:px-8 font-sans border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Section Heading & Action Button */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <span className="text-xs md:text-sm font-bold tracking-widest text-[#0085d0] uppercase">
            Official Registration
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Company Certificate of Incorporation
          </h3>
          <p className="text-xs md:text-sm text-slate-600 font-medium max-w-xl">
            DIGITAL X TRADE LIMITED is officially registered and incorporated under the Companies Act in England &amp; Wales (Company No. 4490004).
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-3 bg-[#0085d0] hover:bg-[#0072ce] text-white font-extrabold px-8 py-3.5 rounded text-xs md:text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 cursor-pointer"
          >
            <span>CHECK OUR CERTIFICATE</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* HIGH DEFINITION CERTIFICATE IMAGE CARD */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="group relative w-full max-w-2xl bg-white border border-slate-300/90 shadow-2xl rounded-sm overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
        >
          {/* Subtle Hover overlay */}
          <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/5 transition-colors z-10 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/90 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <ZoomIn className="w-4 h-4" /> Click to View Full Certificate
            </span>
          </div>

          <div className="flex flex-col w-full bg-white">
            {/* Top Half of Certificate */}
            <div className="relative w-full aspect-[800/520]">
              <Image
                src="/images/cert-top.png"
                alt="Certificate of Incorporation Top - Digital X Trade Limited"
                fill
                priority
                className="object-contain object-top block"
              />
            </div>
            {/* Bottom Half of Certificate */}
            <div className="relative w-full aspect-[800/540] -mt-1">
              <Image
                src="/images/cert-bottom.png"
                alt="Certificate of Incorporation Bottom - Digital X Trade Limited"
                fill
                priority
                className="object-contain object-top block"
              />
            </div>
          </div>
        </div>

      </div>

      {/* FULLSCREEN PREVIEW MODAL */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative max-w-3xl w-full bg-white rounded-lg p-2 md:p-4 max-h-[92vh] flex flex-col overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 mb-2">
              <div>
                <h4 className="text-sm md:text-base font-extrabold text-slate-900">
                  DIGITAL X TRADE LIMITED — Certificate of Incorporation
                </h4>
                <p className="text-xs text-slate-500 font-medium">Company No. 4490004 &bull; Companies House Cardiff</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full p-2 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Certificate View */}
            <div className="flex flex-col w-full bg-white p-2">
              <div className="relative w-full aspect-[800/520]">
                <Image
                  src="/images/cert-top.png"
                  alt="Certificate of Incorporation Top"
                  fill
                  className="object-contain object-top"
                />
              </div>
              <div className="relative w-full aspect-[800/540] -mt-1">
                <Image
                  src="/images/cert-bottom.png"
                  alt="Certificate of Incorporation Bottom"
                  fill
                  className="object-contain object-top"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

