import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin, Mail, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#E8EAED] text-[#737987] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6655D9] to-[#A99AF5] flex items-center justify-center text-white shadow-button">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-[#171923] tracking-tight">
                Interview<span className="text-[#6655D9]">IQ</span>
              </span>
            </Link>
            
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6655D9]">
              Practice. Prepare. Perform. Get Hired.
            </p>
            <p className="text-xs text-[#737987] leading-relaxed max-w-sm">
              The AI-powered interview preparation and smart recruitment ecosystem bridging ambitious students with forward-thinking tech enterprises.
            </p>

            <div className="pt-2 flex items-center gap-3 text-gray-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:text-[#6655D9] hover:border-[#6655D9] transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:text-[#6655D9] hover:border-[#6655D9] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:text-[#6655D9] hover:border-[#6655D9] transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Student Portal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171923]">Student Portal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/student/mock-interview" className="hover:text-[#6655D9] transition-colors">AI Mock Interview Room</Link></li>
              <li><Link to="/student/history" className="hover:text-[#6655D9] transition-colors">Performance Reports & PDF</Link></li>
              <li><Link to="/student/roadmap" className="hover:text-[#6655D9] transition-colors">AI Personalized Roadmap</Link></li>
              <li><Link to="/student/jobs" className="hover:text-[#6655D9] transition-colors">Explore Verified Jobs</Link></li>
              <li><Link to="/student/profile" className="hover:text-[#6655D9] transition-colors">Resume & Profile Optimizer</Link></li>
            </ul>
          </div>

          {/* Company Portal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171923]">Recruiter Portal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/register/company" className="hover:text-[#6655D9] transition-colors">Company Registration</Link></li>
              <li><Link to="/company/jobs" className="hover:text-[#6655D9] transition-colors">Post Open Positions</Link></li>
              <li><Link to="/company/applicants" className="hover:text-[#6655D9] transition-colors">Applicant ATS Tracking</Link></li>
              <li><Link to="/company/screening" className="hover:text-[#6655D9] transition-colors">AI Candidate Screening</Link></li>
              <li><Link to="/company/interviews" className="hover:text-[#6655D9] transition-colors">Interview Scheduling</Link></li>
            </ul>
          </div>

          {/* Trust & Transparency */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171923]">AI Ethics & Trust</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Admin Verified Companies</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Advisory AI Matching Only</span>
              </li>
              <li className="text-[11px] text-[#737987] leading-relaxed pt-1">
                Student consent is strictly required before sharing any AI interview report with recruiters.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-[#E8EAED] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737987]">
          <p>© {new Date().getFullYear()} InterviewIQ. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#6655D9] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#6655D9] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#6655D9] cursor-pointer">Security Safeguards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
