'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';
import { toast } from 'react-toastify';
import PageLoader from '../../components/PageLoader';
import { Mail, CheckCircle, ArrowRight, RefreshCw, ShieldAlert } from 'lucide-react';

export default function VerifyEmailPage() {
  const router = useRouter();
  const { user, loading, refreshUser } = useAuth();

  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [autoSent, setAutoSent] = useState(false);

  useEffect(() => {
    if (!loading && !user && typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    if (!loading && user && user.email_verified && typeof window !== 'undefined') {
      window.location.href = '/dashboard';
    }
  }, [user, loading]);

  // Check or dispatch code when user arrives at /verify-email page
  useEffect(() => {
    if (!loading && user && user.email_verified === false && !autoSent) {
      setAutoSent(true);
      handleResendCode(false);
    }
  }, [user, loading, autoSent]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    const cleanCode = code.trim();
    if (!cleanCode || cleanCode.length < 4) {
      toast.error('Please enter a valid 6-digit verification code');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/auth/verify-email', { code: cleanCode });
      if (res.data && res.data.success) {
        toast.success('Email address verified successfully!');
        await refreshUser();
        window.location.href = '/dashboard';
      } else {
        toast.error(res.data?.message || 'Invalid verification code');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Verification failed. Please check code and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendCode = async (isManualClick = true) => {
    if (isManualClick && (countdown > 0 || resending)) return;
    setResending(true);
    try {
      const res = await api.post('/auth/send-email-verification', { force: isManualClick });
      if (res.data && res.data.success) {
        if (res.data.code_already_active) {
          toast.info(res.data.message || 'Your verification code is still valid. Please check your inbox or spam folder.');
        } else {
          toast.success(res.data.message || 'Verification code sent to your email address!');
          setCountdown(60);
        }
      } else {
        toast.error(res.data?.message || 'Failed to resend code');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to resend verification code');
    } finally {
      setResending(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl p-6 sm:p-8 space-y-6">
        {/* Glowing Mail Icon Badge */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[#0085d0]/10 border border-[#0085d0]/20 text-[#0085d0] flex items-center justify-center mx-auto shadow-sm">
            <Mail className="w-8 h-8 stroke-[2]" />
          </div>

          <h1 className="text-2xl font-extrabold text-[#00529b] tracking-tight">
            Verify Email Address
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            We sent a 6-digit verification code to{' '}
            <span className="text-slate-900 font-bold">{user?.email || 'your email'}</span>. Please enter it below to activate full account capabilities.
          </p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
              6-Digit Verification Code
            </label>
            <input
              type="text"
              required
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              className="w-full h-14 bg-slate-50 border border-slate-300 focus:border-[#0085d0] focus:ring-2 focus:ring-[#0085d0]/20 rounded-xl text-center text-2xl font-mono font-extrabold text-slate-900 tracking-[0.4em] outline-none transition-all shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || code.length < 4}
            className="w-full py-3.5 bg-[#0085d0] hover:bg-[#0072ce] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{submitting ? 'Verifying...' : 'Verify Email'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Resend & Status Footer */}
        <div className="pt-4 border-t border-slate-100 text-center space-y-3">
          <p className="text-xs text-slate-500 font-sans">
            Didn't receive the email code?
          </p>

          <button
            type="button"
            onClick={() => handleResendCode(true)}
            disabled={countdown > 0 || resending}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0085d0] hover:text-[#00529b] transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
            <span>
              {countdown > 0
                ? `Resend Code in ${countdown}s`
                : resending
                ? 'Sending Code...'
                : 'Resend Verification Code'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
