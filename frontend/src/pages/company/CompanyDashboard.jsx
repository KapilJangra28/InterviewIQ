import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { Card, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Briefcase,
  Users,
  Calendar,
  CheckCircle2,
  TrendingUp,
  PlusCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Eye,
  Clock
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const CompanyDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const company = user?.companyProfile || {
    companyName: 'TechPulse Cloud Solutions',
    verificationStatus: 'verified',
    industry: 'Cloud Infrastructure & AI'
  };

  const isVerified = company.verificationStatus === 'verified';

  // Analytics funnel data
  const funnelData = [
    { stage: 'Applied', count: 42 },
    { stage: 'Screened', count: 28 },
    { stage: 'Shortlisted', count: 14 },
    { stage: 'Interviews', count: 8 },
    { stage: 'Offers', count: 3 },
  ];

  const recentApplicants = [
    {
      id: 'app_1',
      name: 'Aarav Sharma',
      role: 'Full Stack AI Engineer',
      appliedAt: '2h ago',
      matchScore: 92,
      skills: ['React.js', 'Node.js', 'System Design'],
      status: 'Shortlisted',
    },
    {
      id: 'app_2',
      name: 'Priya Patel',
      role: 'Full Stack AI Engineer',
      appliedAt: '5h ago',
      matchScore: 88,
      skills: ['Python', 'Docker', 'FastAPI'],
      status: 'Under Review',
    },
    {
      id: 'app_3',
      name: 'Rohan Verma',
      role: 'Frontend UI/UX Architect',
      appliedAt: 'Yesterday',
      matchScore: 94,
      skills: ['TypeScript', 'React.js', 'Tailwind'],
      status: 'Interview Scheduled',
    },
  ];

  return (
    <DashboardLayout
      title={`${company.companyName} ATS Hub`}
      subtitle="Recruitment pipeline analytics, candidate scoring, and interview coordination."
    >
      <div className="space-y-8">
        
        {/* Verification Alert Banner if pending */}
        {!isVerified && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>
                <strong>Verification Pending:</strong> Your company profile is currently undergoing review by the Platform Admin. Job publishing will be unlocked upon verification.
              </span>
            </div>
            <Button variant="secondary" size="sm" onClick={() => navigate('/company/profile')}>
              View Profile
            </Button>
          </div>
        )}

        {/* Action Header Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#171923] via-[#2F2173] to-[#6655D9] text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <Badge variant="verified" size="sm">Admin Verified Recruiter</Badge>
              <span className="text-xs text-purple-200">Active Autumn Campus Hiring Cycle</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              Recruit High-Caliber Engineering Talent
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Use AI candidate matching to screen technical portfolios, conduct initial AI screening rounds, and schedule candidate interviews.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/company/jobs/new')}
              leftIcon={<PlusCircle className="w-4 h-4" />}
              className="shadow-button"
            >
              Post Open Position
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/company/screening')}
              leftIcon={<Sparkles className="w-4 h-4 text-[#A99AF5]" />}
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              AI Candidate Screening
            </Button>
          </div>
        </div>

        {/* 6 Key Recruiter Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="p-4">
            <span className="text-[11px] font-semibold text-[#737987]">Total Openings</span>
            <p className="text-2xl font-black text-[#171923] mt-1">4</p>
            <span className="text-[10px] text-[#6655D9] font-medium">3 Active</span>
          </Card>

          <Card className="p-4">
            <span className="text-[11px] font-semibold text-[#737987]">Total Applicants</span>
            <p className="text-2xl font-black text-[#171923] mt-1">42</p>
            <span className="text-[10px] text-emerald-600 font-medium">+12 this week</span>
          </Card>

          <Card className="p-4">
            <span className="text-[11px] font-semibold text-[#737987]">Shortlisted</span>
            <p className="text-2xl font-black text-[#6655D9] mt-1">14</p>
            <span className="text-[10px] text-[#737987]">33% conversion</span>
          </Card>

          <Card className="p-4">
            <span className="text-[11px] font-semibold text-[#737987]">Interviews Set</span>
            <p className="text-2xl font-black text-purple-600 mt-1">8</p>
            <span className="text-[10px] text-purple-700">3 this week</span>
          </Card>

          <Card className="p-4">
            <span className="text-[11px] font-semibold text-[#737987]">Offers Made</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">3</p>
            <span className="text-[10px] text-emerald-700 font-semibold">2 Accepted</span>
          </Card>

          <Card className="p-4">
            <span className="text-[11px] font-semibold text-[#737987]">Avg AI Match</span>
            <p className="text-2xl font-black text-[#171923] mt-1">89%</p>
            <span className="text-[10px] text-emerald-600 font-medium">High alignment</span>
          </Card>
        </div>

        {/* Analytics Funnel Chart & Recent Applicants */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Funnel Chart */}
          <Card className="lg:col-span-7 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED] mb-4">
              <div>
                <CardTitle>Recruitment Pipeline Funnel</CardTitle>
                <p className="text-xs text-[#737987]">Candidate distribution across current hiring stages</p>
              </div>
              <Badge variant="primary" size="sm">Live ATS</Badge>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8EAED" />
                  <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#737987' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#737987' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#171923', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    formatter={(val) => [`${val} Candidates`, 'Count']}
                  />
                  <Bar dataKey="count" fill="#6655D9" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Recent Candidates */}
          <Card className="lg:col-span-5 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED] mb-3">
                <CardTitle>Recent Applicants</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/company/applicants')}
                  className="text-xs font-semibold text-[#6655D9]"
                >
                  View All
                </Button>
              </div>

              <div className="divide-y divide-gray-100">
                {recentApplicants.map((cand) => (
                  <div key={cand.id} className="py-3 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-[#171923] hover:text-[#6655D9] cursor-pointer" onClick={() => navigate('/company/applicants')}>
                        {cand.name}
                      </h4>
                      <p className="text-[11px] text-[#737987]">{cand.role} • {cand.appliedAt}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {cand.matchScore}%
                      </span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate('/company/applicants')}
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/company/applicants')}
              className="w-full mt-4 justify-center"
            >
              Open Complete Applicant Pipeline
            </Button>
          </Card>

        </div>

      </div>
    </DashboardLayout>
  );
};
