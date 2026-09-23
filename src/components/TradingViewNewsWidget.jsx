'use client';

import React, { useEffect, useRef } from 'react';

export default function TradingViewNewsWidget() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear existing content to prevent duplicate widgets on re-renders
    containerRef.current.innerHTML = '';

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container__widget';
    containerRef.current.appendChild(widgetContainer);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      feedMode: 'all_symbols',
      isTransparent: true,
      displayMode: 'regular',
      width: '100%',
      height: 550,
      colorTheme: 'dark',
      locale: 'en'
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <section className="bg-black py-8 px-4 md:px-8 no-scrollbar overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div ref={containerRef} className="tradingview-widget-container w-full min-h-[550px] no-scrollbar overflow-hidden" />
      </div>
    </section>
  );
}
