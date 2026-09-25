'use client';

import React from 'react';
import HeaderNav from '@/components/HeaderNav';
import SubNav from '@/components/SubNav';
import PersonalInformationSettings from '@/components/PersonalInformationSettings';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      <HeaderNav />
      <SubNav activeTab="SETTINGS" />

      {/* MAIN CONTENT AREA */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <PersonalInformationSettings />
      </section>

      <FloatingWidgets />
      <Footer />
    </main>
  );
}
