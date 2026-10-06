'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Share, PlusSquare, Smartphone } from 'lucide-react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    // Check if user is on iOS
    const ua = window.navigator.userAgent;
    const isAppleIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    setIsIOS(isAppleIOS);

    // Check if already running in standalone mode (installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isStandalone) return;

    // Check if user previously dismissed prompt in this session
    const isDismissed = sessionStorage.getItem('pwa_prompt_dismissed');
    if (isDismissed) return;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If on iOS and not standalone, show iOS install banner after 3 seconds
    if (isAppleIOS && !isStandalone) {
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the PWA install prompt');
    }
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <>
      {/* FLOATING PWA INSTALL BANNER */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300">
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/icon-192.png"
              alt="DigitalXTrade App Icon"
              className="w-12 h-12 rounded-xl shadow-md border border-slate-700 shrink-0 object-cover"
            />
            <div className="min-w-0">
              <h4 className="font-extrabold text-sm text-white truncate flex items-center gap-1.5">
                <span>Install DigitalXTrade App</span>
              </h4>
              <p className="text-xs text-slate-300 truncate mt-0.5">
                Add to Home Screen for fast 1-tap mobile access
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="px-3.5 py-2 bg-[#0085d0] hover:bg-[#0072ce] active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Install</span>
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* IOS INSTALL GUIDE MODAL */}
      {showIOSModal && (
        <div
          onClick={() => setShowIOSModal(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-sm w-full p-6 text-slate-900 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200 cursor-default"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <img src="/icon-192.png" alt="App Icon" className="w-8 h-8 rounded-lg" />
                <h3 className="font-bold text-base text-slate-900">Install on iPhone / iPad</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed font-medium">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <Share className="w-5 h-5 text-[#0085d0] shrink-0 mt-0.5" />
                <div>
                  1. Tap the <strong>Share button</strong> in Safari navigation bar.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <PlusSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  2. Scroll down and select <strong>"Add to Home Screen"</strong>.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <Smartphone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  3. Confirm and launch DigitalXTrade right from your iPhone home screen!
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="w-full py-3 bg-[#0085d0] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#0072ce] cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
