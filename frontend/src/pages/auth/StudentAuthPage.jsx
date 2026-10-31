import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowLeft, Mail, Lock, User, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const StudentAuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, registerStudent, loginAsDemo } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleFillDemo = () => {
    setEmail('aarav.sharma@example.edu');
    setPassword('Student@123');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email.trim() || !password.trim()) {
      setError('Please provide both email address and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (isRegister) {
      if (!name.trim()) {
        setError('Please enter your full name.');
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
        const res = await registerStudent({
          name: name.trim(),
          email: email.trim(),
          password,
          college: 'Indian Institute of Technology (IIT) Bombay',
          degree: 'B.Tech',
          branch: 'Computer Science',
          graduationYear: 2025,
          skills: ['React.js', 'Node.js', 'Data Structures']
        });
        if (res.success) {
          toast.success(`Welcome to InterviewIQ, ${name}!`);
          navigate('/student/dashboard');
        } else {
          setError(res.message || 'Registration failed.');
        }
      } else {
        const res = await login(email.trim(), password, 'student', name.trim());
        if (res.success) {
          toast.success(`Welcome back, ${res.user.name}!`);
          navigate('/student/dashboard');
        } else {
          setError(res.message || 'Invalid email or password.');
        }
      }
    } catch (err) {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0C14] text-[#F1F5F9] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#6655D9]/20 via-[#A99AF5]/15 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 space-y-2">
        <Link to="/" className="inline-flex items-center gap-2 group mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6655D9] to-[#A99AF5] flex items-center justify-center text-white shadow-button group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            Interview<span className="text-[#38BDF8]">IQ</span>
          </span>
        </Link>
        <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#6655D9]/20 text-[#A99AF5] border border-[#6655D9]/40">
          Student Portal
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {isRegister ? 'Create Student Account' : 'Student Sign In'}
        </h2>
        <p className="text-xs text-[#94A3B8]">
          {isRegister
            ? 'Sign up to practice AI mock interviews and track your performance.'
            : 'Access your mock sessions, rubric evaluations, and roadmap.'}
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
                !isRegister ? 'bg-[#6655D9] text-white shadow-sm' : 'text-[#94A3B8] hover:text-white'
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
                isRegister ? 'bg-[#6655D9] text-white shadow-sm' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Create Account
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
            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-300">
                {isRegister ? 'Full Name' : 'Your Full Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kapil Sharma"
                  required={isRegister}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0A0C14] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 outline-none focus:border-[#6655D9]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. aarav.sharma@example.edu"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0A0C14] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 outline-none focus:border-[#6655D9]"
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
                    className="text-[11px] text-[#A99AF5] hover:underline"
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
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0A0C14] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 outline-none focus:border-[#6655D9]"
                />
              </div>
            </div>

            {/* Confirm Password for Registration */}
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
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0A0C14] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 outline-none focus:border-[#6655D9]"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#6655D9] hover:bg-[#5542C6] text-white transition-all shadow-button cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Processing...' : isRegister ? 'Create Account' : 'Login as Student'}
            </button>
          </form>

          {/* 1-Click Demo Fill */}
          {!isRegister && (
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={handleFillDemo}
                className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#A99AF5] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>⚡ 1-Click Demo Credentials (Aarav Sharma)</span>
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
