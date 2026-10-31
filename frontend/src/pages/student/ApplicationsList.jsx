import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Briefcase,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  Send,
  Video,
  CheckCircle2,
  Clock3
} from 'lucide-react';

export const ApplicationsList = () => {
  const navigate = useNavigate();

  const [applications] = useState(() => {
    const saved = localStorage.getItem('interviewiq_user_applications');
    const parsed = saved ? JSON.parse(saved) : [];

    const defaults = [
      {
        id: 'app_01',
        jobId: 'job_101',
        jobTitle: 'Full Stack AI Engineer',
        company: 'TechPulse Cloud Solutions',
        companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
        location: 'Bengaluru / Remote',
        appliedAt: '2026-10-28T10:15:00Z',
        status: 'Interview Scheduled',
        matchScore: 92,
        interviewDate: '2026-11-04 at 3:00 PM IST',
        recruiterNotes: 'Candidate demonstrated exemplary backend distributed systems background. Invited for Technical Round 1.',
        screeningInvite: true,
      },
      {
        id: 'app_02',
        jobId: 'job_103',
        jobTitle: 'Frontend UI/UX Platform Architect',
        company: 'CloudMatrix Digital',
        companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200',
        location: 'Remote',
        appliedAt: '2026-10-25T14:40:00Z',
        status: 'Shortlisted',
        matchScore: 95,
        recruiterNotes: 'Resume matched 95% of frontend and design system requirements. Portfolio review in progress.',
      },
      {
        id: 'app_03',
        jobId: 'job_102',
        jobTitle: 'Backend Distributed Systems Engineer',
        company: 'Nexus Scale Labs',
        companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200',
        location: 'Hyderabad, India',
        appliedAt: '2026-10-20T09:00:00Z',
        status: 'Under Review',
        matchScore: 86,
        recruiterNotes: 'Application received and undergoing recruiter preliminary screening.',
      }
    ];

    return [...parsed, ...defaults];
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Selected':
        return <Badge variant="selected" size="sm" dot>Selected / Offer</Badge>;
      case 'Interview Scheduled':
        return <Badge variant="primary" size="sm" dot>Interview Scheduled</Badge>;
      case 'Shortlisted':
        return <Badge variant="shortlisted" size="sm" dot>Shortlisted</Badge>;
      case 'Under Review':
        return <Badge variant="pending" size="sm" dot>Under Review</Badge>;
      case 'Rejected':
        return <Badge variant="rejected" size="sm">Not Selected</Badge>;
      default:
        return <Badge variant="default" size="sm" dot>Applied</Badge>;
    }
  };

  return (
    <DashboardLayout
      title="My Job Applications"
      subtitle="Track your application statuses across verified hiring partners."
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {applications.map((app) => (
          <Card key={app.id} hover className="p-6 transition-all">
            <div className="space-y-4">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={app.companyLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200'}
                    alt={app.company}
                    className="w-12 h-12 rounded-2xl object-cover border border-[#E8EAED]"
                  />
                  <div>
                    <h3 className="text-base font-bold text-[#171923]">{app.jobTitle}</h3>
                    <p className="text-xs text-[#737987]">{app.company} • {app.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(app.status)}
                  <span className="text-xs font-bold text-[#6655D9]">{app.matchScore}% Match</span>
                </div>
              </div>

              {/* Recruiter Notes or Screening Invite */}
              {app.recruiterNotes && (
                <div className="p-3.5 rounded-xl bg-[#F8F9FC] border border-[#E8EAED] text-xs text-[#171923]">
                  <p className="font-semibold text-[#6655D9] text-[11px] uppercase tracking-wider mb-0.5">Recruiter Feedback / Notes:</p>
                  <p className="text-[#737987] leading-relaxed">{app.recruiterNotes}</p>
                </div>
              )}

              {/* If interview scheduled */}
              {app.interviewDate && (
                <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Video className="w-5 h-5 text-[#6655D9]" />
                    <div>
                      <p className="text-xs font-bold text-purple-950">Recruitment Interview Confirmed</p>
                      <p className="text-xs text-purple-800">{app.interviewDate}</p>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/student/mock-interview')}
                    leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                  >
                    Practice For This Round
                  </Button>
                </div>
              )}

              {/* Footer info */}
              <div className="flex items-center justify-between text-xs text-[#737987] pt-2 border-t border-gray-100">
                <span>Applied on {new Date(app.appliedAt).toLocaleDateString()}</span>
                <span>Application ID: {app.id}</span>
              </div>

            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};
