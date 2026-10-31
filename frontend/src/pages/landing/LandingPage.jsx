import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AgencyHeroSection from '@/components/ui/hero-01';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';
import {
  Sparkles,
  Mic,
  Video,
  FileCheck,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Users,
  Compass,
  Building2,
  FileText,
  BarChart3
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { user, loginAsDemo } = useAuth();
  const [activeTab, setActiveTab] = useState('student');

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col">
      
      {/* 21st.dev Agency Hero Section (Header + Hero with Avatars + Marquee Brand Slider) */}
      <AgencyHeroSection />

      {/* Stats Counter Bar */}
      <section className="bg-white border-b border-[#E8EAED] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#6655D9]">50,000+</p>
              <p className="text-xs font-bold uppercase tracking-wider text-[#737987]">Mock Interviews Completed</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#171923]">850+</p>
              <p className="text-xs font-bold uppercase tracking-wider text-[#737987]">Verified Partner Companies</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#6655D9]">94.2%</p>
              <p className="text-xs font-bold uppercase tracking-wider text-[#737987]">Placement Offer Rate</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#171923]">0–10</p>
              <p className="text-xs font-bold uppercase tracking-wider text-[#737987]">Transparent Rubric Scoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Portals in One Platform Showcase */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <Badge variant="primary" size="md">Complete Full-Stack Ecosystem</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-[#171923] tracking-tight">
            One Platform. Three Powerful Portals.
          </h2>
          <p className="text-sm sm:text-base text-[#737987]">
            Tailored interfaces engineered for candidates, corporate recruiters, and platform administrators.
          </p>

          {/* Interactive Portal Tab Buttons */}
          <div className="flex items-center justify-center p-1.5 bg-white border border-[#E8EAED] rounded-2xl shadow-sm max-w-md mx-auto mt-6">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'student'
                  ? 'bg-[#6655D9] text-white shadow-button'
                  : 'text-[#737987] hover:text-[#171923]'
              }`}
            >
              Student Portal
            </button>
            <button
              onClick={() => setActiveTab('company')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'company'
                  ? 'bg-[#6655D9] text-white shadow-button'
                  : 'text-[#737987] hover:text-[#171923]'
              }`}
            >
              Recruiter ATS
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'admin'
                  ? 'bg-[#6655D9] text-white shadow-button'
                  : 'text-[#737987] hover:text-[#171923]'
              }`}
            >
              Admin Suite
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'student' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            <Card hover className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F2FF] text-[#6655D9] flex items-center justify-center mb-4">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#171923] mb-2">6 AI Mock Categories</h3>
              <p className="text-xs text-[#737987] leading-relaxed">
                Configure Technical, HR, Behavioral, Company-Specific (Google, Amazon, etc.), Resume-Based, or Custom interviews with beginner to advanced difficulty.
              </p>
            </Card>

            <Card hover className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F2FF] text-[#6655D9] flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#171923] mb-2">Detailed Reports & PDF</h3>
              <p className="text-xs text-[#737987] leading-relaxed">
                Receive question-by-question analysis, model answers, identified strengths, weaknesses, and downloadable comprehensive PDF performance reports.
              </p>
            </Card>

            <Card hover className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F2FF] text-[#6655D9] flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#171923] mb-2">AI Learning Roadmap</h3>
              <p className="text-xs text-[#737987] leading-relaxed">
                Personalized study plan automatically synthesized from your weak topics with daily drills, milestones, and progress tracking.
              </p>
            </Card>
          </div>
        )}

        {activeTab === 'company' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            <Card hover className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F2FF] text-[#6655D9] flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#171923] mb-2">Verified Job Publishing</h3>
              <p className="text-xs text-[#737987] leading-relaxed">
                Publish full-time, part-time, internship, and contract openings with salary ranges, required skills, and clear hiring stages once verified by Admin.
              </p>
            </Card>

            <Card hover className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F2FF] text-[#6655D9] flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#171923] mb-2">AI Candidate Screening</h3>
              <p className="text-xs text-[#737987] leading-relaxed">
                Objective parsing of candidate resumes against job requirements. Highlights missing skills and match percentages with transparent human-in-the-loop decisions.
              </p>
            </Card>

            <Card hover className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F2FF] text-[#6655D9] flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#171923] mb-2">Complete ATS Pipeline</h3>
              <p className="text-xs text-[#737987] leading-relaxed">
                Move candidates smoothly across Applied, Under Review, Shortlisted, Interview Scheduled, Interviewed, Selected, and Rejected stages.
              </p>
            </Card>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            <Card hover className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F2FF] text-[#6655D9] flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#171923] mb-2">Company Verification</h3>
              <p className="text-xs text-[#737987] leading-relaxed">
                Review corporate credentials, official domains, and documents before granting companies authorization to publish job openings.
              </p>
            </Card>

            <Card hover className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F2FF] text-[#6655D9] flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#171923] mb-2">Platform Metrics</h3>
              <p className="text-xs text-[#737987] leading-relaxed">
                Monitor student signups, hiring funnels, active mock interviews, job moderations, and platform throughput in real-time.
              </p>
            </Card>

            <Card hover className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F4F2FF] text-[#6655D9] flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#171923] mb-2">Curated Question Bank</h3>
              <p className="text-xs text-[#737987] leading-relaxed">
                Maintain standard question sets categorized across Technical, Behavioral, HR, and System Design with expected answer benchmarks.
              </p>
            </Card>
          </div>
        )}

      </section>

      {/* Step-by-step Workflow Section */}
      <section className="bg-white border-y border-[#E8EAED] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="primary" size="md">Simple 4-Step Process</Badge>
            <h2 className="text-3xl font-black text-[#171923] tracking-tight">
              How InterviewIQ Works
            </h2>
            <p className="text-xs sm:text-sm text-[#737987]">
              From your very first mock practice to receiving an official offer letter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-2xl bg-[#6655D9] text-white font-extrabold text-sm flex items-center justify-center shadow-button">
                1
              </div>
              <h4 className="text-base font-bold text-[#171923]">Build Profile & Resume</h4>
              <p className="text-xs text-[#737987] leading-relaxed">
                Add education, skills, projects, and upload your resume for automatic skill extraction.
              </p>
            </div>

            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-2xl bg-[#6655D9] text-white font-extrabold text-sm flex items-center justify-center shadow-button">
                2
              </div>
              <h4 className="text-base font-bold text-[#171923]">Practice AI Mock Tests</h4>
              <p className="text-xs text-[#737987] leading-relaxed">
                Engage in interactive voice or text sessions with follow-up questions tailored to your responses.
              </p>
            </div>

            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-2xl bg-[#6655D9] text-white font-extrabold text-sm flex items-center justify-center shadow-button">
                3
              </div>
              <h4 className="text-base font-bold text-[#171923]">Analyze & Upskill</h4>
              <p className="text-xs text-[#737987] leading-relaxed">
                Inspect 0–10 rubric scores, study optimal answer outlines, and follow your customized roadmap.
              </p>
            </div>

            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center shadow-button shadow-emerald-500/20">
                4
              </div>
              <h4 className="text-base font-bold text-[#171923]">Apply & Get Hired</h4>
              <p className="text-xs text-[#737987] leading-relaxed">
                Browse verified openings, participate in screening interviews, and receive company interview invites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl bg-gradient-to-tr from-[#6655D9] to-[#5542C6] text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl z-10">
            <Badge variant="accent" size="sm">Elevate Your Career</Badge>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to land your dream role?
            </h2>
            <p className="text-sm text-purple-100 leading-relaxed">
              Join thousands of students and hundreds of top companies hiring with data-backed interview intelligence.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 z-10 w-full sm:w-auto">
            <Button
              variant="dark"
              size="lg"
              className="w-full sm:w-auto text-sm px-6 py-3.5 rounded-2xl"
              onClick={() => {
                loginAsDemo('student');
                navigate('/student/dashboard');
              }}
            >
              Explore as Student
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto text-sm px-6 py-3.5 bg-white text-[#6655D9] hover:bg-gray-100 rounded-2xl"
              onClick={() => {
                loginAsDemo('company');
                navigate('/company/dashboard');
              }}
            >
              Explore as Recruiter
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
