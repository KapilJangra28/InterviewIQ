import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Building2, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const WelcomeSelectionPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // If already logged in, redirect directly to user's dashboard
  React.useEffect(() => {
    if (user?.role === 'student') {
      navigate('/student/dashboard');
    } else if (user?.role === 'company') {
      navigate('/company/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#0A0C14] text-[#F1F5F9] relative overflow-hidden flex flex-col justify-between selection:bg-[#6655D9] selection:text-white">
      {/* Background Radiant Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#6655D9]/25 via-[#38BDF8]/15 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#6655D9]/15 blur-3xl pointer-events-none rounded-full" />

      {/* Header Bar */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex items-center justify-between z-10">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6655D9] to-[#38BDF8] flex items-center justify-center text-white shadow-button group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-[#A99AF5] transition-colors">
            Interview<span className="text-[#38BDF8]">IQ</span>
          </span>
        </Link>

        <Link
          to="/home"
          className="text-xs font-semibold text-[#94A3B8] hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
        >
          Explore Platform Features →
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 z-10 flex-1 flex flex-col justify-center">
        {/* Welcome Headline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e1b4b]/80 border border-[#6655D9]/50 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
            <span className="text-xs font-extrabold text-[#A99AF5] uppercase tracking-wider">
              ✦ Welcome to InterviewIQ ✦
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Welcome to <span className="bg-gradient-to-r from-[#A99AF5] via-[#818cf8] to-[#38BDF8] bg-clip-text text-transparent">InterviewIQ</span>
          </h1>

          <p className="text-base sm:text-xl text-[#94A3B8] font-normal leading-relaxed max-w-2xl mx-auto">
            Your AI-powered platform for smarter interview preparation and recruitment.
          </p>
        </motion.div>

        {/* Display Two Large Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Card 1: Student */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="rounded-3xl p-8 sm:p-10 flex flex-col justify-between group cursor-pointer border border-white/10 hover:border-[#A99AF5]/60 bg-gradient-to-b from-[#161B2E]/90 to-[#111422]/95 backdrop-blur-xl shadow-2xl transition-all"
            onClick={() => navigate('/login/student')}
          >
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#6655D9] to-[#A99AF5] flex items-center justify-center text-white shadow-glow-purple group-hover:scale-110 transition-transform">
                <GraduationCap className="w-9 h-9 text-white" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#6655D9]/20 text-[#A99AF5] border border-[#6655D9]/40">
                For Job Seekers & Students
              </span>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#A99AF5] transition-colors">
                  Student
                </h2>
                <p className="text-sm text-[#94A3B8] mt-2 leading-relaxed">
                  Practise interviews, improve your skills and prepare for your dream job.
                </p>
              </div>

              <ul className="space-y-2.5 pt-2 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real-time speech recognition & live AI evaluation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Technical, HR, and Mixed interview chambers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>0–10 rubric performance analytics & personalized roadmap</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/login/student');
                }}
                className="w-full py-4 px-6 text-sm sm:text-base font-bold rounded-2xl bg-gradient-to-r from-[#6655D9] to-[#818cf8] text-white hover:opacity-95 transition-all shadow-button flex items-center justify-center gap-2 group-hover:shadow-glow-purple cursor-pointer active:scale-95"
              >
                <span>Continue as Student</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Company */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="rounded-3xl p-8 sm:p-10 flex flex-col justify-between group cursor-pointer border border-white/10 hover:border-[#38BDF8]/60 bg-gradient-to-b from-[#161B2E]/90 to-[#111422]/95 backdrop-blur-xl shadow-2xl transition-all"
            onClick={() => navigate('/login/company')}
          >
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] flex items-center justify-center text-white shadow-glow-cyan group-hover:scale-110 transition-transform">
                <Building2 className="w-9 h-9 text-white" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#0284C7]/20 text-[#38BDF8] border border-[#0284C7]/40">
                For Recruiters & Enterprise
              </span>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#38BDF8] transition-colors">
                  Company
                </h2>
                <p className="text-sm text-[#94A3B8] mt-2 leading-relaxed">
                  Create interviews, discover talent and manage candidates.
                </p>
              </div>

              <ul className="space-y-2.5 pt-2 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Create custom multi-round interview campaigns</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Manage applicant pipeline & review rubric scores</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>End-to-end candidate screening & interview management</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/login/company');
                }}
                className="w-full py-4 px-6 text-sm sm:text-base font-bold rounded-2xl bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] text-white hover:opacity-95 transition-all shadow-button flex items-center justify-center gap-2 group-hover:shadow-glow-cyan cursor-pointer active:scale-95"
              >
                <span>Continue as Company</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* Back to Home Option */}
        <div className="mt-12 text-center">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#94A3B8] hover:text-white transition-colors px-4 py-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            <span>← Back to Home</span>
          </Link>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-6 text-center text-xs text-[#94A3B8] border-t border-white/5">
        <p>© 2026 InterviewIQ – AI-Powered Interview Preparation & Recruitment Platform.</p>
      </footer>
    </div>
  );
};
