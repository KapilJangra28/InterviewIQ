import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, ArrowLeft, Mail, Lock, User, Briefcase, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const CompanyAuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [recruiterName, setRecruiterName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, registerCompany, loginAsDemo } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleFillDemo = () => {
    setEmail('recruiter@techpulse.io');
    setPassword('Recruiter@123');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email.trim() || !password.trim()) {
      setError('Please provide both official email and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (isRegister) {
      if (!companyName.trim() || !recruiterName.trim()) {
        setError('Please provide both Company Name and Recruiter Name.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please verify.');
        return;
      }
    }

    setLoading(true);
    try {
      if (isRegister) {
        const res = await registerCompany({
          companyName: companyName.trim(),
          contactPerson: recruiterName.trim(),
          email: email.trim(),
          password,
          industry: 'Enterprise Cloud & AI Developer Tools',
          website: 'https://' + companyName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.io',
          location: 'San Francisco, CA & Bengaluru, India'
        });
        if (res.success) {
          toast.success(`Welcome to InterviewIQ ATS, ${companyName}!`);
          navigate('/company/dashboard');
        } else {
          setError(res.message || 'Company registration failed.');
        }
      } else {
        const res = await login(email.trim(), password, 'company', recruiterName.trim());
        if (res.success) {
          toast.success(`Welcome back, ${res.user.name || 'Recruiter'}!`);
          navigate('/company/dashboard');
        } else {
          setError(res.message || 'Invalid email or password.');
        }
      }
    } catch (err) {
      setError('An error occurred during company sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0C14] text-[#F1F5F9] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#0284C7]/20 via-[#38BDF8]/15 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 space-y-2">
        <Link to="/" className="inline-flex items-center gap-2 group mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] flex items-center justify-center text-white shadow-button group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            Interview<span className="text-[#38BDF8]">IQ</span>
          </span>
        </Link>
        <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#0284C7]/20 text-[#38BDF8] border border-[#0284C7]/40">
          Company ATS Portal
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {isRegister ? 'Register Company Account' : 'Company Sign In'}
        </h2>
        <p className="text-xs text-[#94A3B8]">
          {isRegister
            ? 'Create interviews, screen engineering talent, and coordinate hiring pipelines.'
            : 'Access your active interview campaigns and candidate evaluations.'}
        </p>
      </div>

      {/* Card Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10"
      >
        <div className="bg-[#161B2E]/90 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-white/10 space-y-6">
          
          {/* Mode Switcher */}
          <div className="flex p-1 bg-[#0A0C14] rounded-2xl border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setError('');
              }}
              className={`flex-1 py-2 font-bold rounded-xl transition-all ${
                !isRegister ? 'bg-[#0284C7] text-white shadow-sm' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegister(true);
                setError('');
              }}
              className={`flex-1 py-2 font-bold rounded-xl transition-all ${
                isRegister ? 'bg-[#0284C7] text-white shadow-sm' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Create Company Account
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company Name (Registration only) */}
            {isRegister && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-300">Company Name</label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. TechPulse Cloud Solutions"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0A0C14] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 outline-none focus:border-[#38BDF8]"
                  />
                </div>
              </div>
            )}

            {/* Recruiter Name (Registration only) */}
            {isRegister && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-300">Recruiter Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={recruiterName}
                    onChange={(e) => setRecruiterName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0A0C14] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 outline-none focus:border-[#38BDF8]"
                  />
                </div>
              </div>
            )}

            {/* Official Email */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-300">Official Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. recruiter@techpulse.io"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0A0C14] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 outline-none focus:border-[#38BDF8]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-gray-300">Password</label>
                {!isRegister && (
                  <Link
                    to="/forgot-password"
                    className="text-[11px] text-[#38BDF8] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0A0C14] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 outline-none focus:border-[#38BDF8]"
                />
              </div>
            </div>

            {/* Confirm Password (Registration only) */}
            {isRegister && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-300">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0A0C14] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 outline-none focus:border-[#38BDF8]"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#0284C7] hover:bg-[#0369a1] text-white transition-all shadow-button cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Processing...' : isRegister ? 'Create Company Account' : 'Login as Company'}
            </button>
          </form>

          {/* 1-Click Demo Fill */}
          {!isRegister && (
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={handleFillDemo}
                className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#38BDF8] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>⚡ 1-Click Demo Credentials (TechPulse Cloud)</span>
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex items-center justify-between pt-2 text-xs text-[#94A3B8]">
            <Link to="/" className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Change Role</span>
            </Link>
            <Link to="/home" className="hover:text-white">
              Back to Home
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
