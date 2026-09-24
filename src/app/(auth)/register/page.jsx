'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { Eye, EyeOff, ChevronDown, Check } from 'lucide-react';
import { toast } from 'react-toastify';

const SECRET_QUESTIONS = [
  "What is your mother's maiden name?",
  "What was the name of your first pet?",
  "What city were you born in?",
  "What was your high school nickname?",
  "What is your favorite book?",
  "Which school did you attend?",
];

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();

  // Step 1 State: Registration
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secretQuestion, setSecretQuestion] = useState('');
  const [secretAnswer, setSecretAnswer] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Step 2 State: Payment Processors
  const [bitcoinId, setBitcoinId] = useState('');
  const [usdtTrc20Id, setUsdtTrc20Id] = useState('');
  const [usdtBep20Id, setUsdtBep20Id] = useState('');
  const [litecoinId, setLitecoinId] = useState('');
  const [savingPayment, setSavingPayment] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('reference') || params.get('ref') || params.get('referral') || params.get('referral_code') || '';
      if (ref) {
        setReferralCode(ref);
      }
    }
  }, []);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};

    if (!secretQuestion) {
      toast.error('Please select a secret question.');
      return;
    }

    if (!secretAnswer.trim()) {
      toast.error('Please provide an answer to your secret question.');
      return;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match. Please verify both passwords.';
    }

    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the Terms and Conditions.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    try {
      const res = await registerUser({
        full_name: fullName,
        username,
        email,
        password,
        secret_question: secretQuestion,
        secret_answer: secretAnswer,
        referral_code: referralCode,
      });

      if (res && res.success) {
        // Transition to Step 2: Payment Processors form
        setStep(2);
      } else {
        const errMsg = res?.message || 'Failed to create account';
        if (errMsg.toLowerCase().includes('email')) {
          setErrors({ email: 'User with this email already exists' });
        } else {
          toast.error(errMsg);
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setSavingPayment(true);
    try {
      // Complete setup and navigate to dashboard
      toast.success('Payment account details saved!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 600);
    } catch (err) {
      toast.error('Failed to save payment processors');
      setSavingPayment(false);
    }
  };

  const handleSkipPayment = () => {
    toast.info('You can update your payment processors anytime in settings.');
    router.push('/dashboard');
  };

  return (
    <div className="h-screen flex flex-col bg-[#07193b] text-slate-100 font-sans overflow-hidden">
      {/* Main Container Split: 50% Left Form / 50% Right Logo Graphic */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Form Container (50% - Centered / Top Padded with Slide Animation) */}
        <div className="flex flex-col justify-start items-center w-full lg:w-1/2 px-6 sm:px-12 lg:px-16 pt-8 sm:pt-12 pb-20 h-full overflow-y-auto no-scrollbar relative z-10">
          <div className="w-full max-w-md my-0 relative">
            
            {/* STEP 1: REGISTRATION FORM */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                step === 1
                  ? 'opacity-100 translate-x-0 pointer-events-auto block'
                  : 'opacity-0 -translate-x-full pointer-events-none hidden'
              }`}
            >
              {/* Header Title & Copy */}
              <div className="mb-6 text-left space-y-1">
                <h1 className="text-3xl font-extrabold text-white font-righteous tracking-wide">
                  Sign <span className="text-gradient-stakelab">up</span>
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Sign up in digitalxtrade.com is very simple. Just fill out the form below to become a member. All you need is your desire login ID, Password and a valid email. Please keep your information safe.
                </p>

                {/* Conditional Upline Line (Shown ONLY if referral ref URL param exists) */}
                {referralCode && (
                  <div className="pt-2 text-xs sm:text-sm text-slate-300 font-sans">
                    Your Upline:<strong className="text-white font-bold ml-1">{referralCode.toLowerCase() === 'spark' ? 'Chinedu freedom afamefuna (Spark)' : referralCode}</strong>
                  </div>
                )}
              </div>

              {/* Register Form */}
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full h-11 bg-[#0c1424] border-0 outline-none focus:outline-none rounded-md px-3.5 text-white placeholder-slate-500 font-sans text-xs sm:text-sm focus:ring-1 focus:ring-[#0085d0] transition-all shadow-inner"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Define Username"
                    className="w-full h-11 bg-[#0c1424] border-0 outline-none focus:outline-none rounded-md px-3.5 text-white placeholder-slate-500 font-sans text-xs sm:text-sm focus:ring-1 focus:ring-[#0085d0] transition-all shadow-inner"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="name@example.com"
                    className={`w-full h-11 bg-[#0c1424] outline-none focus:outline-none rounded-md px-3.5 text-white placeholder-slate-500 font-sans text-xs sm:text-sm transition-all shadow-inner ${
                      errors.email ? 'border border-red-500/80 focus:ring-1 focus:ring-red-500' : 'border-0 focus:ring-1 focus:ring-[#0085d0]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.email}</p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                      }}
                      placeholder="••••••••"
                      className="w-full h-11 bg-[#0c1424] border-0 outline-none focus:outline-none rounded-md px-3.5 pr-10 text-white placeholder-slate-500 font-sans text-xs sm:text-sm focus:ring-1 focus:ring-[#0085d0] transition-all shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                      }}
                      placeholder="••••••••"
                      className={`w-full h-11 bg-[#0c1424] outline-none focus:outline-none rounded-md px-3.5 pr-10 text-white placeholder-slate-500 font-sans text-xs sm:text-sm transition-all shadow-inner ${
                        errors.confirmPassword ? 'border border-red-500/80 focus:ring-1 focus:ring-red-500' : 'border-0 focus:ring-1 focus:ring-[#0085d0]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Secret Question Dropdown (Shadcn UI Style) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Secret Question
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full h-11 bg-[#0c1424] border border-[#1a2744] hover:border-[#0085d0]/60 outline-none focus:outline-none rounded-md px-3.5 text-left text-white font-sans text-xs sm:text-sm focus:ring-1 focus:ring-[#0085d0] transition-all shadow-inner flex items-center justify-between cursor-pointer"
                    >
                      <span className={secretQuestion ? "text-white font-medium" : "text-slate-500"}>
                        {secretQuestion || "Select a Secret Question..."}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-[#0085d0]" : ""}`} />
                    </button>

                    {isDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsDropdownOpen(false)}
                        />
                        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#0c1424] border border-[#1c2844] rounded-md shadow-2xl overflow-hidden py-1 max-h-60 overflow-y-auto">
                          {SECRET_QUESTIONS.map((q, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                setSecretQuestion(q);
                                setIsDropdownOpen(false);
                              }}
                              className={`px-3.5 py-2.5 text-xs sm:text-sm cursor-pointer flex items-center justify-between transition-colors ${
                                secretQuestion === q
                                  ? "bg-[#0085d0]/20 text-[#0085d0] font-semibold"
                                  : "text-slate-200 hover:bg-[#15233c] hover:text-white"
                              }`}
                            >
                              <span>{q}</span>
                              {secretQuestion === q && <Check className="w-4 h-4 text-[#0085d0]" />}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Secret Answer */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Secret Answer
                  </label>
                  <input
                    type="text"
                    required
                    value={secretAnswer}
                    onChange={(e) => setSecretAnswer(e.target.value)}
                    placeholder="Your secret answer"
                    className="w-full h-11 bg-[#0c1424] border-0 outline-none focus:outline-none rounded-md px-3.5 text-white placeholder-slate-500 font-sans text-xs sm:text-sm focus:ring-1 focus:ring-[#0085d0] transition-all shadow-inner"
                  />
                </div>

                {/* Terms & Policies Checkbox Row */}
                <div className="pt-1">
                  <label className="flex items-start space-x-2.5 cursor-pointer select-none text-xs leading-relaxed">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => {
                        setAgreeTerms(e.target.checked);
                        if (errors.terms) setErrors((prev) => ({ ...prev, terms: '' }));
                      }}
                      className="w-4 h-4 mt-0.5 rounded border-[#1c2844] bg-[#0c1424] text-[#0085d0] focus:ring-0 accent-[#0085d0] cursor-pointer shrink-0"
                    /> 
                    <span className="text-slate-200">
                      I agree with{' '}
                      <Link href="/terms-of-service" target="_blank" className="text-[#0085d0] font-bold hover:underline">Terms and Conditions</Link>
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.terms}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-stakelab py-3 rounded-md text-white font-righteous text-sm tracking-wider uppercase font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50 mt-2 cursor-pointer"
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
                        <animate id="SVGUiS2jeZq" fill="freeze" attributeName="y" begin="SVG7WybndBt.end" dur="0.2s" values="1;13"/>
                        <animate id="SVGU0vu2GEM" fill="freeze" attributeName="x" begin="SVGVoKldbWM.end" dur="0.2s" values="1;13"/>
                        <animate id="SVGOIboFeLf" fill="freeze" attributeName="y" begin="SVGKsXgPbui.end" dur="0.2s" values="1;13"/>
                        <animate id="SVG14lAaeuv" fill="freeze" attributeName="x" begin="SVG7JzAfdGT.end" dur="0.2s" values="1;13"/>
                      </rect>
                      <rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1">
                        <animate id="SVGFpk9ncYc" fill="freeze" attributeName="x" begin="SVGUiS2jeZq.end" dur="0.2s" values="1;13"/>
                        <animate id="SVGaI8owdNK" fill="freeze" attributeName="y" begin="SVGU0vu2GEM.end" dur="0.2s" values="13;1"/>
                        <animate id="SVG28A4To9L" fill="freeze" attributeName="x" begin="SVGOIboFeLf.end" dur="0.2s" values="13;1"/>
                        <animate id="SVGo3aOUHlJ" fill="freeze" attributeName="y" begin="SVG14lAaeuv.end" dur="0.2s" values="13;1"/>
                      </rect>
                    </svg>
                  ) : (
                    'Sign Up'
                  )}
                </button>
              </form>

              {/* Login Link */}
              <p className="text-center text-xs text-slate-400 mt-5">
                Already registered?{' '}
                <Link href="/login" className="text-[#0085d0] font-bold hover:underline">
                  Login
                </Link>
              </p>
            </div>

            {/* STEP 2: PAYMENT PROCESSORS FORM (Slides in from the right when step === 2) */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                step === 2
                  ? 'opacity-100 translate-x-0 pointer-events-auto block'
                  : 'opacity-0 translate-x-full pointer-events-none hidden'
              }`}
            >
              {/* Header Title & Copy */}
              <div className="mb-8 text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-righteous tracking-wide">
                  Payment <span className="text-gradient-stakelab">processors</span>
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Enter your crypto account IDs below to receive automated withdrawals directly to your wallets.
                </p>
              </div>

              {/* Payment Processors Form */}
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                {/* BITCOIN Account ID */}
                <div>
                  <input
                    type="text"
                    value={bitcoinId}
                    onChange={(e) => setBitcoinId(e.target.value)}
                    placeholder="BITCOIN Account ID"
                    className="w-full h-12 bg-[#0c1424] border border-[#1a2744] outline-none focus:outline-none rounded-md px-4 text-white placeholder-slate-500 font-sans text-xs sm:text-sm focus:ring-1 focus:ring-[#0085d0] transition-all shadow-inner"
                  />
                </div>

                {/* USDT(TRC20) Account ID */}
                <div>
                  <input
                    type="text"
                    value={usdtTrc20Id}
                    onChange={(e) => setUsdtTrc20Id(e.target.value)}
                    placeholder="USDT(TRC20) Account ID"
                    className="w-full h-12 bg-[#0c1424] border border-[#1a2744] outline-none focus:outline-none rounded-md px-4 text-white placeholder-slate-500 font-sans text-xs sm:text-sm focus:ring-1 focus:ring-[#0085d0] transition-all shadow-inner"
                  />
                </div>

                {/* USDT(BEP20) Account ID */}
                <div>
                  <input
                    type="text"
                    value={usdtBep20Id}
                    onChange={(e) => setUsdtBep20Id(e.target.value)}
                    placeholder="USDT(BEP20) Account ID"
                    className="w-full h-12 bg-[#0c1424] border border-[#1a2744] outline-none focus:outline-none rounded-md px-4 text-white placeholder-slate-500 font-sans text-xs sm:text-sm focus:ring-1 focus:ring-[#0085d0] transition-all shadow-inner"
                  />
                </div>

                {/* LITECOIN Account ID */}
                <div>
                  <input
                    type="text"
                    value={litecoinId}
                    onChange={(e) => setLitecoinId(e.target.value)}
                    placeholder="LITECOIN Account ID"
                    className="w-full h-12 bg-[#0c1424] border border-[#1a2744] outline-none focus:outline-none rounded-md px-4 text-white placeholder-slate-500 font-sans text-xs sm:text-sm focus:ring-1 focus:ring-[#0085d0] transition-all shadow-inner"
                  />
                </div>

                {/* Submit & Skip Actions */}
                <div className="pt-3 space-y-3">
                  <button
                    type="submit"
                    disabled={savingPayment}
                    className="w-full btn-stakelab py-3.5 rounded-md text-white font-righteous text-sm tracking-wider uppercase font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {savingPayment ? (
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
                      'Save & Continue'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleSkipPayment}
                    className="w-full text-xs text-slate-400 hover:text-white font-semibold py-2 transition-colors cursor-pointer text-center block"
                  >
                    Skip for now
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>

        {/* Right Side: Auth Brand Panel (Fixed & Intact Throughout All Steps) */}
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
