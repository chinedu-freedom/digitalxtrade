'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderNav from '@/components/HeaderNav';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    retypePassword: '',
    email: '',
    retypeEmail: '',
    secretQuestion: '',
    secretAnswer: '',
    btcAccount: '',
    usdtTrc20Account: '',
    usdtErc20Account: '',
    ltcAccount: '',
    agreeTerms: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.retypePassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.email !== formData.retypeEmail) {
      setError('Email addresses do not match.');
      return;
    }

    if (!formData.agreeTerms) {
      setError('You must agree with the Terms and conditions.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-100 font-sans text-slate-800 relative flex flex-col justify-between">
      <HeaderNav />

      {/* BACKGROUND & FLOATING FORM SECTION */}
      <section className="relative w-full py-12 md:py-16 px-4 flex items-center justify-center min-h-[calc(100vh-160px)] bg-slate-900 overflow-hidden">
        {/* Background Trader Image (Far-right trader) */}
        <Image
          src="/images/hero-bg-trader.jpg"
          alt="Sign up background"
          fill
          priority
          className="object-cover object-right opacity-80"
        />
        <div className="absolute inset-0 bg-slate-950/30" />

        {/* WHITE FLOATING SIGN UP CARD */}
        <div className="relative z-10 w-full max-w-[540px] bg-white rounded-lg shadow-2xl p-6 md:p-10 border border-slate-100 my-8 text-center">
          <div className="flex justify-center mb-4">
            <img
              src="/logo.jpeg"
              alt="DigitalXTrade Logo"
              className="w-14 h-14 aspect-square object-cover shadow-sm"
            />
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-[#00529b] mb-3 tracking-tight">
            Sign up form
          </h1>

          <p className="text-slate-600 text-xs leading-relaxed mb-6 max-w-md mx-auto">
            Sign up in digitalxtrade.com is very simple. Just fill out the form below to become a member, all you need is your desire login ID, Password and a valid email. Please keep your information safe.
          </p>

          {error && (
            <div className="mb-4 text-xs font-bold text-red-600 bg-red-50 border border-red-200 p-3 rounded">
              {error}
            </div>
          )}

          {success ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </div>
              <h2 className="text-xl font-bold text-slate-900">Registration Successful!</h2>
              <p className="text-slate-600 text-xs">
                Your account has been created successfully. You can now log into your account portal.
              </p>
              <Link
                href="/login"
                className="inline-block bg-[#0085d0] hover:bg-[#0072ce] text-white font-bold px-8 py-3 rounded text-xs tracking-wider uppercase transition-colors"
              >
                GO TO LOGIN
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-left text-xs md:text-sm">
              {/* Personal Details */}
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0085d0] transition-all"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Define Username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0085d0] transition-all"
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Define Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0085d0] transition-all"
                />
              </div>

              <div>
                <input
                  type="password"
                  name="retypePassword"
                  placeholder="Retype Password"
                  required
                  value={formData.retypePassword}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0085d0] transition-all"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0085d0] transition-all"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="retypeEmail"
                  placeholder="Retype E-mail"
                  required
                  value={formData.retypeEmail}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0085d0] transition-all"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="secretQuestion"
                  placeholder="Secret question"
                  value={formData.secretQuestion}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0085d0] transition-all"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="secretAnswer"
                  placeholder="Secret answer"
                  value={formData.secretAnswer}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0085d0] transition-all"
                />
              </div>

              {/* Payment Processors (optional) */}
              <div className="pt-3 pb-1 text-center">
                <h4 className="text-xs font-extrabold text-slate-700">
                  Payment processors (optional)
                </h4>
              </div>

              <div>
                <input
                  type="text"
                  name="btcAccount"
                  placeholder="BITCOIN Account ID"
                  value={formData.btcAccount}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0085d0] transition-all"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="usdtTrc20Account"
                  placeholder="USDT(TRC20) Account ID"
                  value={formData.usdtTrc20Account}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0085d0] transition-all"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="usdtErc20Account"
                  placeholder="USDT(ERC20) Account ID"
                  value={formData.usdtErc20Account}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0085d0] transition-all"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="ltcAccount"
                  placeholder="LITECOIN Account ID"
                  value={formData.ltcAccount}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0085d0] transition-all"
                />
              </div>

              {/* Upline & Checkbox */}
              <div className="pt-2 text-center text-[11px] text-slate-500 font-medium">
                Your Upline: N/A (n/a)
              </div>

              <div className="flex items-center justify-center gap-2 pt-1 pb-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#0085d0] rounded border-slate-300 focus:ring-[#0072ce]"
                />
                <label htmlFor="agreeTerms" className="text-xs text-slate-600 font-medium">
                  I agree with <Link href="#" className="text-[#0085d0] font-bold hover:underline">Terms and conditions</Link>
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#0085d0] hover:bg-[#0072ce] text-white font-bold py-3 rounded text-xs md:text-sm tracking-wider uppercase transition-colors shadow-md disabled:opacity-70"
                >
                  {isLoading ? 'REGISTERING...' : 'REGISTER'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <FloatingWidgets />
      <Footer />
    </main>
  );
}
