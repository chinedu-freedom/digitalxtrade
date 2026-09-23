'use client';

import React from 'react';
import HeaderNav from '@/components/HeaderNav';
import HeroSection from '@/components/HeroSection';
import CryptoTicker from '@/components/CryptoTicker';
import StatsCounterSection from '@/components/StatsCounterSection';
import LevelUpTradingSection from '@/components/LevelUpTradingSection';
import PremiumPricingSection from '@/components/PremiumPricingSection';
import ProfitCalculatorSection from '@/components/ProfitCalculatorSection';
import IntuitivePlatformSection from '@/components/IntuitivePlatformSection';
import ProfessionalToolsSection from '@/components/ProfessionalToolsSection';
import ConversionFeesSection from '@/components/ConversionFeesSection';
import EfficientSupportSection from '@/components/EfficientSupportSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import WorldOfInvestmentsSection from '@/components/WorldOfInvestmentsSection';
import StartTradingSection from '@/components/StartTradingSection';
import TradingViewNewsWidget from '@/components/TradingViewNewsWidget';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';

export default function UserHomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-sky-500 selection:text-white">
      {/* Header Navigation Bar */}
      <HeaderNav />

      {/* Hero Banner */}
      <HeroSection />

      {/* Full Width Live TradingView Ticker Tape Bar */}
      <CryptoTicker />

      {/* Animated Counter Stats Section */}
      <StatsCounterSection />

      {/* Level Up Your Trading Feature Grid Section */}
      <LevelUpTradingSection />

      {/* Premium Trading Without Premium Prices Investment Plans Section */}
      <PremiumPricingSection />

      {/* Profit Calculator Section */}
      <ProfitCalculatorSection />

      {/* A Powerful and Intuitive Platform Section */}
      <IntuitivePlatformSection />

      {/* Professional Tools & Global Revolution Section */}
      <ProfessionalToolsSection />

      {/* Stop Paying Conversion Fees & Multiple Currencies Section */}
      <ConversionFeesSection />

      {/* Efficient Client Support Section */}
      <EfficientSupportSection />

      {/* Why Choose DigitalXTrade Banner Section */}
      <WhyChooseSection />
      <WorldOfInvestmentsSection />
      <StartTradingSection />
      <TradingViewNewsWidget />
      <Footer />

      {/* Floating Support & Chat Badges */}
      <FloatingWidgets />

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-center text-sm">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <p className="font-semibold text-slate-200">
            © {new Date().getFullYear()} DIGITALXTRADE. All Rights Reserved.
          </p>
          <p className="text-xs text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Trading financial instruments involves substantial risk of loss and is not suitable for all investors. Please ensure you fully understand the risks before trading.
          </p>
        </div>
      </footer>
    </div>
  );
}
