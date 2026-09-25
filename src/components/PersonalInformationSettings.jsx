'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function PersonalInformationSettings() {
  const { user, fetchUser } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    newPassword: '',
    retypePassword: '',
    bitcoinAddress: '',
    usdtTrc20Address: '',
    usdtBep20Address: '',
    litecoinAddress: '',
    email: '',
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || user.full_name || '',
        newPassword: '',
        retypePassword: '',
        bitcoinAddress: user.bitcoinAddress || '',
        usdtTrc20Address: user.usdtTrc20Address || '',
        usdtBep20Address: user.usdtBep20Address || '',
        litecoinAddress: user.litecoinAddress || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const username = user?.username || user?.fullName || 'Spark';
  const regDateFormatted = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }) +
      ' ' +
      new Date(user.createdAt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
    : 'Sep-22-2026 12:52:08 PM';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword && formData.newPassword !== formData.retypePassword) {
      toast.error('New password and retype password do not match');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post('/auth/profile', {
        userId: user?.id,
        email: formData.email,
        fullName: formData.fullName,
        newPassword: formData.newPassword,
        bitcoinAddress: formData.bitcoinAddress,
        usdtTrc20Address: formData.usdtTrc20Address,
        usdtBep20Address: formData.usdtBep20Address,
        litecoinAddress: formData.litecoinAddress,
      });

      if (res.data && res.data.success) {
        toast.success('Personal information updated successfully');
        if (fetchUser) fetchUser();
        setFormData((prev) => ({ ...prev, newPassword: '', retypePassword: '' }));
      } else {
        toast.error(res.data?.message || 'Failed to update personal information');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update personal information');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto">
      {/* Title */}
      <h2 className="text-3xl font-extrabold text-[#0085d0] tracking-tight">
        Personal information
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Section: Personal Information Table */}
        <div className="lg:col-span-7 bg-white border border-gray-300 shadow-xs overflow-hidden">
          <form onSubmit={handleSubmit}>
            <table className="w-full border-collapse text-xs sm:text-sm">
              <tbody>
                {/* Account Name */}
                <tr className="border-b border-gray-300">
                  <td className="w-[42%] p-3 sm:p-4 bg-white font-semibold text-slate-700 border-r border-gray-300">
                    Account Name:
                  </td>
                  <td className="w-[58%] p-3 sm:p-4 bg-white text-slate-900 font-medium">
                    {username}
                  </td>
                </tr>

                {/* Registration date */}
                <tr className="border-b border-gray-300">
                  <td className="p-3 sm:p-4 bg-white font-semibold text-slate-700 border-r border-gray-300">
                    Registration date:
                  </td>
                  <td className="p-3 sm:p-4 bg-white text-slate-800 font-medium">
                    {regDateFormatted}
                  </td>
                </tr>

                {/* Your Full Name */}
                <tr className="border-b border-gray-300">
                  <td className="p-3 sm:p-4 bg-white font-semibold text-slate-700 border-r border-gray-300">
                    Your Full Name:
                  </td>
                  <td className="p-2.5 sm:p-3 bg-white">
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-800 text-xs sm:text-sm focus:border-[#0085d0] focus:outline-none transition-all shadow-2xs"
                    />
                  </td>
                </tr>

                {/* New Password */}
                <tr className="border-b border-gray-300">
                  <td className="p-3 sm:p-4 bg-white font-semibold text-slate-700 border-r border-gray-300">
                    New Password:
                  </td>
                  <td className="p-2.5 sm:p-3 bg-white">
                    <input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-800 text-xs sm:text-sm focus:border-[#0085d0] focus:outline-none transition-all shadow-2xs"
                    />
                  </td>
                </tr>

                {/* Retype Password */}
                <tr className="border-b border-gray-300">
                  <td className="p-3 sm:p-4 bg-white font-semibold text-slate-700 border-r border-gray-300">
                    Retype Password:
                  </td>
                  <td className="p-2.5 sm:p-3 bg-white">
                    <input
                      type="password"
                      value={formData.retypePassword}
                      onChange={(e) => setFormData({ ...formData, retypePassword: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-800 text-xs sm:text-sm focus:border-[#0085d0] focus:outline-none transition-all shadow-2xs"
                    />
                  </td>
                </tr>

                {/* Your BITCOIN Account ID */}
                <tr className="border-b border-gray-300">
                  <td className="p-3 sm:p-4 bg-white font-semibold text-slate-700 border-r border-gray-300">
                    Your BITCOIN Account ID:
                  </td>
                  <td className="p-2.5 sm:p-3 bg-white">
                    <input
                      type="text"
                      value={formData.bitcoinAddress}
                      onChange={(e) => setFormData({ ...formData, bitcoinAddress: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-800 text-xs sm:text-sm focus:border-[#0085d0] focus:outline-none transition-all shadow-2xs"
                    />
                  </td>
                </tr>

                {/* Your USDT(TRC20) Account ID */}
                <tr className="border-b border-gray-300">
                  <td className="p-3 sm:p-4 bg-white font-semibold text-slate-700 border-r border-gray-300">
                    Your USDT(TRC20) Account ID:
                  </td>
                  <td className="p-2.5 sm:p-3 bg-white">
                    <input
                      type="text"
                      value={formData.usdtTrc20Address}
                      onChange={(e) => setFormData({ ...formData, usdtTrc20Address: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-800 text-xs sm:text-sm focus:border-[#0085d0] focus:outline-none transition-all shadow-2xs"
                    />
                  </td>
                </tr>

                {/* Your USDT(BEP20) Account ID */}
                <tr className="border-b border-gray-300">
                  <td className="p-3 sm:p-4 bg-white font-semibold text-slate-700 border-r border-gray-300">
                    Your USDT(BEP20) Account ID:
                  </td>
                  <td className="p-2.5 sm:p-3 bg-white">
                    <input
                      type="text"
                      value={formData.usdtBep20Address}
                      onChange={(e) => setFormData({ ...formData, usdtBep20Address: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-800 text-xs sm:text-sm focus:border-[#0085d0] focus:outline-none transition-all shadow-2xs"
                    />
                  </td>
                </tr>

                {/* Your LITECOIN Account ID */}
                <tr className="border-b border-gray-300">
                  <td className="p-3 sm:p-4 bg-white font-semibold text-slate-700 border-r border-gray-300">
                    Your LITECOIN Account ID:
                  </td>
                  <td className="p-2.5 sm:p-3 bg-white">
                    <input
                      type="text"
                      value={formData.litecoinAddress}
                      onChange={(e) => setFormData({ ...formData, litecoinAddress: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-800 text-xs sm:text-sm focus:border-[#0085d0] focus:outline-none transition-all shadow-2xs"
                    />
                  </td>
                </tr>

                {/* Your E-mail address */}
                <tr className="border-b border-gray-300">
                  <td className="p-3 sm:p-4 bg-white font-semibold text-slate-700 border-r border-gray-300">
                    Your E-mail address:
                  </td>
                  <td className="p-2.5 sm:p-3 bg-white">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-slate-800 text-xs sm:text-sm focus:border-[#0085d0] focus:outline-none transition-all shadow-2xs"
                    />
                  </td>
                </tr>

                {/* Submit Row */}
                <tr>
                  <td className="p-3 sm:p-4 bg-white border-r border-gray-300"></td>
                  <td className="p-3 sm:p-4 bg-white">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#0085d0] hover:bg-[#0072ce] text-white font-bold py-3 px-6 rounded text-xs tracking-wider uppercase transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <svg className="w-5 h-5 text-white animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                      ) : (
                        'UPDATE'
                      )}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>

        {/* Right Section: Laptop Business Image */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <img
              src="/settings-bg.jpg"
              alt="Personal Information"
              className="w-full h-auto object-cover max-h-[560px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
