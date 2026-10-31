import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Users,
  Building2,
  Briefcase,
  Mic,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const AdminDashboard = () => {
  const navigate = useNavigate();

  const platformGrowth = [
    { month: 'Jun', students: 1200, interviews: 2800 },
    { month: 'Jul', students: 2400, interviews: 5600 },
    { month: 'Aug', students: 4800, interviews: 11200 },
    { month: 'Sep', students: 8600, interviews: 21400 },
    { month: 'Oct', students: 14200, interviews: 34800 },
  ];

  const pendingCompanies = [
    {
      id: 'comp_pend_01',
      name: 'Synthetix Robotics Corp',
      email: 'recruiter@synthetix.ai',
      industry: 'Robotics & AI',
      website: 'https://synthetix.ai',
      submittedAt: 'Today, 2:15 PM',
      location: 'Boston, MA',
    },
    {
      id: 'comp_pend_02',
      name: 'HyperScale Fintech Labs',
      email: 'talent@hyperscale.io',
      industry: 'Fintech & Security',
      website: 'https://hyperscale.io',
      submittedAt: 'Yesterday',
      location: 'London & Singapore',
    }
  ];

  return (
    <DashboardLayout
      title="Platform Administrator Console"
      subtitle="System governance, corporate verifications, student oversight, and moderation metrics."
    >
      <div className="space-y-8">
        
        {/* Verification Action Needed Banner */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">2 Corporate Verification Requests Pending Review</h3>
              <p className="text-xs text-amber-100">Verify company tax IDs and domain validity before granting job posting rights.</p>
            </div>
          </div>
          <Button
            variant="dark"
            size="sm"
            onClick={() => navigate('/admin/companies')}
            className="shrink-0"
          >
            Review Applications
          </Button>
        </div>

        {/* 7 Key Admin Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card className="p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#737987]">Students</span>
            <p className="text-xl font-black text-[#171923] mt-1">14,280</p>
            <span className="text-[10px] text-emerald-600 font-semibold">+18% MoM</span>
          </Card>

          <Card className="p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#737987]">Companies</span>
            <p className="text-xl font-black text-[#171923] mt-1">852</p>
            <span className="text-[10px] text-[#6655D9] font-semibold">Total registered</span>
          </Card>

          <Card className="p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#737987]">Verified</span>
            <p className="text-xl font-black text-emerald-600 mt-1">850</p>
            <span className="text-[10px] text-emerald-700">99.7% safe</span>
          </Card>

          <Card className="p-4 border-amber-200 bg-amber-50/30">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Pending Review</span>
            <p className="text-xl font-black text-amber-600 mt-1">2</p>
            <span className="text-[10px] text-amber-700 font-bold">Requires Action</span>
          </Card>

          <Card className="p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#737987]">Job Postings</span>
            <p className="text-xl font-black text-[#171923] mt-1">1,940</p>
            <span className="text-[10px] text-emerald-600 font-semibold">Active listings</span>
          </Card>

          <Card className="p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#737987]">Applications</span>
            <p className="text-xl font-black text-[#171923] mt-1">48,650</p>
            <span className="text-[10px] text-[#737987]">Dispatched</span>
          </Card>

          <Card className="p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#737987]">AI Interviews</span>
            <p className="text-xl font-black text-[#6655D9] mt-1">52,140</p>
            <span className="text-[10px] text-[#6655D9] font-bold">Completed</span>
          </Card>
        </div>

        {/* Growth Analytics Chart & Pending Verifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Growth Chart */}
          <Card className="lg:col-span-7 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED] mb-4">
              <div>
                <CardTitle>Platform Scale & Mock Interviews</CardTitle>
                <p className="text-xs text-[#737987]">Monthly trend of active candidates and completed AI interview sessions</p>
              </div>
              <Badge variant="primary" size="sm">2026 Volume</Badge>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={platformGrowth}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8EAED" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#737987' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#737987' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#171923', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="interviews" stroke="#6655D9" fill="#6655D9" fillOpacity={0.3} name="Mock Interviews" />
                  <Area type="monotone" dataKey="students" stroke="#A99AF5" fill="#A99AF5" fillOpacity={0.2} name="Student Registrations" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Pending Verifications Mini-List */}
          <Card className="lg:col-span-5 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED] mb-3">
                <CardTitle className="text-base">Pending Company Verification</CardTitle>
                <Badge variant="pending" size="sm">2 Pending</Badge>
              </div>

              <div className="divide-y divide-gray-100">
                {pendingCompanies.map((c) => (
                  <div key={c.id} className="py-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#171923]">{c.name}</h4>
                      <span className="text-[10px] text-[#737987]">{c.submittedAt}</span>
                    </div>
                    <p className="text-[11px] text-[#737987]">{c.industry} • {c.location}</p>
                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/admin/companies')}
                        className="text-xs py-1"
                      >
                        Inspect & Verify
                      </Button>
                      <a
                        href={c.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#6655D9] hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/admin/companies')}
              className="w-full mt-4 justify-center"
            >
              Open Company Verification Queue
            </Button>
          </Card>

        </div>

      </div>
    </DashboardLayout>
  );
};
