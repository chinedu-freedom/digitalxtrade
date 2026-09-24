'use client';

import { useState, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyOtp, requestPasswordReset } = useAuth();

  const emailParam = searchParams.get('email') || '';
  const [email, setEmail] = useState(emailParam);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (errors.otp) setErrors((prev) => ({ ...prev, otp: '' }));

    // Auto-advance to next input digit
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    const fullOtp = otp.join('');

    if (fullOtp.length < 4) {
      newErrors.otp = 'Please enter the complete 4-digit code.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await verifyOtp(email, fullOtp);
      if (res && res.success) {
        setTimeout(() => {
          router.push(`/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(fullOtp)}`);
        }, 1000);
      } else {
        setErrors({ otp: res?.message || 'Invalid or expired OTP code.' });
      }
    } catch (err) {
      setErrors({ otp: err.message || 'Invalid code. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error('Email address missing. Please go back to forgot password.');
      return;
    }
    await requestPasswordReset(email);
  };

  return (
    <div className="min-h-screen lg:h-screen flex flex-col bg-[#07193b] text-slate-100 font-sans overflow-hidden">
      {/* Main Container Split: 50% Left Form / 50% Right Image */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Form Container (50% - Vertically Centered & Hidden Scrollbar) */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 sm:px-12 lg:px-16 py-8 h-full overflow-y-auto no-scrollbar relative z-10">
          <div className="w-full max-w-md text-center my-auto">
            {/* Header Title & Copy */}
            <div className="mb-8 space-y-2">
              <h1 className="text-3xl font-extrabold text-white font-righteous tracking-wide">
                Verify <span className="text-gradient-stakelab">OTP</span>
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                Enter the 4-digit code sent to your email.
              </p>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 4-Digit Input Boxes */}
              <div>
                <div className="flex justify-center gap-3 my-4">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={inputRefs[idx]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className={`w-14 h-14 text-center text-xl font-bold font-righteous bg-[#0c1424] outline-none focus:outline-none rounded-xl text-white transition-all shadow-inner ${
                        errors.otp ? 'border border-red-500/80 focus:ring-2 focus:ring-red-500' : 'border-0 focus:ring-2 focus:ring-[#0085d0]'
                      }`}
                    />
                  ))}
                </div>  
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-stakelab py-3 rounded-md text-white font-righteous text-sm tracking-wider uppercase font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24">
                    <rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1">
                      <animate id="SVG7WybndBt" fill="freeze" attributeName="x" begin="0;SVGo3aOUHlJ.end" dur="0.2s" values="1;13"/>
                      <animate id="SVGVoKldbWM" fill="freeze" attributeName="y" begin="SVGFpk9ncYc.end" dur="0.2s" values="1;13"/>
                      <animate id="SVGKsXgPbui" fill="freeze" attributeName="x" begin="SVGaI8owdNK.end" dur="0.2s" values="13;1"/>
                      <animate id="SVG7JzAfdGT" fill="freeze" attributeName="y" begin="SVG28A4To9L.end" dur="0.2s" values="13;1"/>
                    </rect>
                    <rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1">
                      <animate id="SVGUiS2jeZq" fill="freeze" attributeName="y" begin="SVG7WybndBt.end" dur="0.2s" values="13;1"/>
                      <animate id="SVGU0vu2GEM" fill="freeze" attributeName="x" begin="SVGVoKldbWM.end" dur="0.2s" values="1;13"/>
                      <animate id="SVGOIboFeLf" fill="freeze" attributeName="y" begin="SVGKsXgPbui.end" dur="0.2s" values="13;1"/>
                      <animate id="SVG14lAaeuv" fill="freeze" attributeName="x" begin="SVG7JzAfdGT.end" dur="0.2s" values="13;1"/>
                    </rect>
                    <rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1">
                      <animate id="SVGFpk9ncYc" fill="freeze" attributeName="x" begin="SVGUiS2jeZq.end" dur="0.2s" values="13;1"/>
                      <animate id="SVGaI8owdNK" fill="freeze" attributeName="y" begin="SVGU0vu2GEM.end" dur="0.2s" values="13;1"/>
                      <animate id="SVG28A4To9L" fill="freeze" attributeName="x" begin="SVGOIboFeLf.end" dur="0.2s" values="13;1"/>
                      <animate id="SVGo3aOUHlJ" fill="freeze" attributeName="y" begin="SVG14lAaeuv.end" dur="0.2s" values="13;1"/>
                    </rect>
                  </svg>
                ) : (
                  'Verify OTP'
                )}
              </button>
            </form>

            {/* Resend Code Link */}
            <p className="text-center text-xs text-slate-400 mt-6">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={handleResend}
                className="text-[#0085d0] font-bold hover:underline bg-transparent border-0 cursor-pointer"
              >
                Resend
              </button>
            </p>
          </div>
        </div>

        {/* Right Side: Auth Brand Panel */}
        <div className="hidden lg:flex w-1/2 h-full items-center justify-center bg-[#030919] relative overflow-hidden p-6 xl:p-10">
          <img
            src="/logo.jpeg"
            alt="DigitalXTrade Logo"
            className="w-full max-w-xl xl:max-w-2xl max-h-[85vh] object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}

import PageLoader from '../../../components/PageLoader';

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <VerifyOtpContent />
    </Suspense>
  );
}
