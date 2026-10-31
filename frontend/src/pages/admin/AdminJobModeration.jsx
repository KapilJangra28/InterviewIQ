import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';
import {
  Briefcase,
  Search,
  Building2,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye
} from 'lucide-react';

export const AdminJobModeration = () => {
  const toast = useToast();
  const [search, setSearch] = useState('');

  const [jobs, setJobs] = useState([
    {
      id: 'job_101',
      title: 'Full Stack AI Engineer',
      company: 'TechPulse Cloud Solutions',
      location: 'Bengaluru / Hybrid',
      salary: '$30,000 – $45,000 / yr',
      status: 'Active',
      reported: false,
      postedAt: '2026-10-15',
    },
    {
      id: 'job_102',
      title: 'Backend Distributed Systems Engineer',
      company: 'Nexus Scale Labs',
      location: 'Hyderabad, India',
      salary: '$28,000 – $38,000 / yr',
      status: 'Active',
      reported: false,
      postedAt: '2026-10-18',
    },
    {
      id: 'job_103',
      title: 'Frontend UI/UX Platform Architect',
      company: 'CloudMatrix Digital',
      location: 'Remote',
      salary: '$35,000 – $50,000 / yr',
      status: 'Active',
      reported: false,
      postedAt: '2026-10-20',
    },
    {
      id: 'job_reported_01',
      title: 'Data Entry Assistant (High Pay / No Experience)',
      company: 'Apex Global Telecomm',
      location: 'Remote',
      salary: '$80,000 / yr',
      status: 'Flagged',
      reported: true,
      reportReason: 'Suspicious compensation for entry level data entry role; potential scam.',
      postedAt: '2026-10-30',
    }
  ]);

  const handleRemove = (id, title) => {
    setJobs(jobs.filter((j) => j.id !== id));
    toast.success(`Job listing "${title}" removed by Admin moderator.`);
  };

  const handleApproveFlagged = (id) => {
    setJobs(jobs.map((j) => (j.id === id ? { ...j, status: 'Active', reported: false } : j)));
    toast.success('Listing approved and cleared from moderation queue.');
  };

  const filtered = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      title="Platform Job Moderation"
      subtitle="Inspect public job postings, moderate reported listings, and enforce community standards."
    >
      <div className="space-y-6">
        
        {/* Search */}
        <div className="relative max-w-md">
          <Input
            placeholder="Search by job title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        {/* Listings */}
        <div className="space-y-4">
          {filtered.map((job) => (
            <Card
              key={job.id}
              className={`p-6 ${job.reported ? 'border-rose-300 bg-rose-50/20' : ''}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge variant={job.reported ? 'danger' : 'success'} size="sm" dot>
                      {job.status}
                    </Badge>
                    <span className="text-xs text-[#737987]">Posted {job.postedAt}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#171923]">{job.title}</h3>
                  <p className="text-xs text-[#737987]">
                    Company: <span className="font-semibold text-gray-800">{job.company}</span> • {job.location} • {job.salary}
                  </p>

                  {job.reported && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 mt-2">
                      <p className="font-bold">Flagged by Candidate Community:</p>
                      <p>{job.reportReason}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {job.reported && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleApproveFlagged(job.id)}
                    >
                      Clear Flag
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemove(job.id, job.title)}
                    className="text-rose-600 hover:bg-rose-50 hover:border-rose-300"
                    leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                  >
                    Delete Listing
                  </Button>
                </div>

              </div>
            </Card>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};
