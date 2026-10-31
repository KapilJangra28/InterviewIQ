import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Sparkles,
  ArrowRight,
  Building2,
  Mic,
  Bot,
  CheckCircle2,
  Star,
  Play,
  Volume2
} from 'lucide-react';

export const AvatarList = {};

export default function HeroSection({ avatarList = [] }) {
  const navigate = useNavigate();
  const { user, loginAsDemo } = useAuth();

  const defaultAvatars = [
    { image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150' },
    { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
    { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
    { image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
  ];

  const avatars = avatarList.length > 0 ? avatarList : defaultAvatars;

  return (
    <section className="relative pt-6 pb-20 sm:pt-12 sm:pb-28 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#6655D9]/20 via-[#A99AF5]/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Social Proof Avatar Stack + Rating Badge */}
          <div className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white/80 border border-[#E8EAED] shadow-sm backdrop-blur-md">
            <div className="flex -space-x-2 overflow-hidden pl-1">
              {avatars.slice(0, 4).map((av, idx) => (
                <img
                  key={idx}
                  src={av.image}
                  alt={`Student ${idx + 1}`}
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-extrabold text-[#171923]">4.9/5</span>
              <span className="text-[#737987] hidden sm:inline">• 50,000+ Students Placed</span>
            </div>
          </div>

          {/* Pill Headline Badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4F2FF] border border-[#6655D9]/30 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#6655D9]" />
              <span className="text-xs font-bold text-[#6655D9] uppercase tracking-wider">
                Next-Gen AI Interview & Recruitment Platform
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#171923] tracking-tight leading-[1.1]">
            Practice. Prepare. Perform.{' '}
            <span className="gradient-text">Get Hired.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-[#737987] max-w-2xl mx-auto font-normal leading-relaxed">
            Master technical, HR, and behavioral interviews with real-time AI voice evaluation. Connect directly with verified recruiters through transparent, skill-first candidate screening.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                if (user) {
                  navigate(user.role === 'student' ? '/student/mock-interview' : '/company/dashboard');
                } else {
                  loginAsDemo('student');
                  navigate('/student/mock-interview');
                }
              }}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto text-sm sm:text-base px-8 py-4 rounded-2xl shadow-button shadow-[#6655D9]/30"
            >
              Start Free AI Mock Interview
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/register/company')}
              leftIcon={<Building2 className="w-5 h-5 text-[#6655D9]" />}
              className="w-full sm:w-auto text-sm sm:text-base px-7 py-4 rounded-2xl border-gray-300 hover:border-[#6655D9]"
            >
              For Employers & Recruiters
            </Button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-[#737987]">
            <span className="flex items-center gap-1.5 text-[#171923]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-time Speech-to-Text & TTS
            </span>
            <span className="flex items-center gap-1.5 text-[#171923]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 0–10 Objective Rubric Scores
            </span>
            <span className="flex items-center gap-1.5 text-[#171923]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Admin-Verified Hiring Companies
            </span>
          </div>

        </div>

        {/* Litmus/Hoosty Inspired AI Interview Room Preview Widget */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="relative rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-white/90 to-white/60 border border-[#E8EAED] shadow-2xl backdrop-blur-xl">
            
            {/* Window Header */}
            <div className="flex items-center justify-between pb-4 px-2 border-b border-[#E8EAED]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                <span className="text-xs font-mono font-medium text-gray-500 pl-2">
                  ai-mock-room.interviewiq.io • Live Session
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm" dot>Active Audio Stream</Badge>
                <span className="text-xs font-mono font-semibold text-[#6655D9]">14:28 remaining</span>
              </div>
            </div>

            {/* Mockup Interview Screen Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-4">
              
              {/* AI Interviewer Video/Avatar Window */}
              <div className="lg:col-span-2 bg-[#171923] rounded-2xl p-6 text-white flex flex-col justify-between min-h-[340px] relative overflow-hidden">
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                    <Bot className="w-4 h-4 text-[#A99AF5]" />
                    <span className="text-xs font-bold">InterviewIQ Senior Tech Lead</span>
                  </div>
                  <span className="text-xs bg-rose-500/80 text-white px-2.5 py-1 rounded-lg font-mono font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> LIVE
                  </span>
                </div>

                {/* Dynamic Waveform Representation */}
                <div className="py-8 text-center z-10">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#6655D9] to-[#A99AF5] flex items-center justify-center shadow-lg shadow-[#6655D9]/40 mb-4 animate-voice-pulse">
                    <Mic className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-300 max-w-lg mx-auto">
                    "Could you walk me through how you would architect a horizontally scalable distributed rate limiter?"
                  </p>
                  <div className="flex items-center justify-center gap-1.5 mt-4">
                    <span className="w-1.5 h-6 bg-[#A99AF5] rounded-full animate-bounce" />
                    <span className="w-1.5 h-10 bg-[#6655D9] rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-1.5 h-14 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-8 bg-[#A99AF5] rounded-full animate-bounce [animation-delay:0.3s]" />
                    <span className="w-1.5 h-4 bg-[#6655D9] rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>

                {/* Audio Controls */}
                <div className="flex items-center justify-between z-10 pt-4 border-t border-white/10 text-xs text-gray-400">
                  <span>Question 3 of 6 • Technical Architecture</span>
                  <span className="text-[#A99AF5] font-semibold">Speech Recognition Active</span>
                </div>
              </div>

              {/* Real-time Rubric Evaluation Card */}
              <div className="bg-white rounded-2xl p-5 border border-[#E8EAED] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8EAED]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#171923]">Real-time Rubric</h4>
                    <Badge variant="primary" size="sm">Score: 8.8/10</Badge>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-[#171923]">Technical Accuracy</span>
                        <span className="text-[#6655D9]">9.2 / 10</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#6655D9] h-full rounded-full" style={{ width: '92%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-[#171923]">Relevance & Completeness</span>
                        <span className="text-emerald-600">8.7 / 10</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '87%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-[#171923]">Communication Clarity</span>
                        <span className="text-[#8975F0]">8.5 / 10</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#8975F0] h-full rounded-full" style={{ width: '85%' }} />
                      </div>
                    </div>

                    <div className="p-3 bg-[#F4F2FF] rounded-xl border border-[#6655D9]/20">
                      <p className="text-[11px] font-bold text-[#6655D9] uppercase tracking-wider">AI Follow-up Insight</p>
                      <p className="text-xs text-[#171923] mt-1 leading-relaxed">
                        "Great explanation of token bucket in Redis. Let's explore how you handle network partition scenarios with replication."
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  className="w-full mt-4 justify-center rounded-xl shadow-button"
                  onClick={() => {
                    loginAsDemo('student');
                    navigate('/student/mock-interview');
                  }}
                >
                  Try Live Mock Room
                </Button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
