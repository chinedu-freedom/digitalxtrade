'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'ALESSANDRO FOTI',
    title: 'Chief Executive Officer and General Manager',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80',
    localFallback: '/images/management/alessandro-foti.jpg'
  },
  {
    name: 'FABIO MILANESI',
    title: 'Deputy General Manager and Head of IT, Operations, Customer Care',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
    localFallback: '/images/management/fabio-milanesi.jpg'
  },
  {
    name: 'PAOLO DI GRAZIA',
    title: 'Deputy General Manager and Head of Global Business',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    localFallback: '/images/management/paolo-di-grazia.jpg'
  },
  {
    name: 'MAURO ALBANESE',
    title: 'Deputy General Manager and Head of Network PFA & Private Banking',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    localFallback: '/images/management/mauro-albanese.jpg'
  },
  {
    name: 'LORENA PELLICIARI',
    title: 'Chief Financial Officer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    localFallback: '/images/management/lorena-pelliciari.jpg'
  },
  {
    name: 'STEFANO ORFANINI',
    title: 'Chief Risk Officer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80',
    localFallback: '/images/management/stefano-orfanini.jpg'
  },
  {
    name: 'SILVIO PUCHAR',
    title: 'Head of Compliance',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80',
    localFallback: '/images/management/silvio-puchar.jpg'
  },
  {
    name: 'ANDREA PEPE',
    title: 'Head of Legal & Corporate Affairs',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80',
    localFallback: '/images/management/andrea-pepe.jpg'
  }
];

export default function AboutManagementSection() {
  const [imgErrors, setImgErrors] = useState({});

  const handleImageError = (index) => {
    setImgErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section className="bg-white py-16 px-4 md:px-8 max-w-6xl mx-auto font-sans text-slate-800 border-t border-slate-100">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Management
        </h2>
      </div>

      {/* 3-COLUMN GRID OF REAL PEOPLE PORTRAITS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8  max-w-5xl mx-auto">
        {teamMembers.map((member, idx) => {
          const imgSrc = imgErrors[idx] ? member.localFallback : member.image;
          return (
            <div key={idx} className="flex flex-col items-center text-center group">
              {/* Square Portrait Image Container */}
              <div className="w-48 h-48 md:w-56 md:h-56 relative mb-4 rounded-md overflow-hidden shadow-md bg-slate-100 border border-slate-200">
                <img
                  src={imgSrc}
                  alt={member.name}
                  onError={() => handleImageError(idx)}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Name */}
              <h3 className="text-sm font-black text-[#0072ce] uppercase tracking-wide mb-1">
                {member.name}
              </h3>

              {/* Title */}
              <p className="text-slate-600 text-xs leading-relaxed font-medium max-w-[220px]">
                {member.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
