import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';
import {
  Briefcase,
  PlusCircle,
  Search,
  Users,
  Calendar,
  Clock,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Trash2,
  Edit,
  ExternalLink
} from 'lucide-react';

export const JobManagement = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState([
    {
      id: 'job_101',
      title: 'Full Stack AI Engineer',
      location: 'Bengaluru / Remote',
      workMode: 'Hybrid',
      employmentType: 'Full-time',
      vacancies: 3,
      salary: '$30,000 – $45,000 / yr',
      status: 'Active',
      applicantsCount: 24,
      deadline: '2026-11-20',
      postedAt: '2026-10-15',
    },
    {
      id: 'job_103',
      title: 'Frontend UI/UX Platform Architect',
      location: 'Remote',
      workMode: 'Remote',
      employmentType: 'Full-time',
      vacancies: 2,
      salary: '$35,000 – $50,000 / yr',
      status: 'Active',
      applicantsCount: 18,
      deadline: '2026-11-30',
      postedAt: '2026-10-18',
    },
    {
      id: 'job_105',
      title: 'Cloud DevOps & Kubernetes Specialist',
      location: 'Bengaluru, India',
      workMode: 'On-site',
      employmentType: 'Full-time',
      vacancies: 1,
      salary: '$28,000 – $40,000 / yr',
      status: 'Closed',
      applicantsCount: 31,
      deadline: '2026-10-25',
      postedAt: '2026-09-20',
    }
  ]);

  const toggleStatus = (id) => {
    setJobs(jobs.map((j) => {
      if (j.id === id) {
        const next = j.status === 'Active' ? 'Closed' : 'Active';
        toast.info(`Job status updated to ${next}`);
        return { ...j, status: next };
      }
      return j;
    }));
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter((j) => j.id !== id));
    toast.success('Job posting removed successfully');
  };

  const filteredJobs = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      title="Job Postings Management"
      subtitle="Publish, edit, close, and monitor applicant funnels for corporate job listings."
    >
      <div className="space-y-6">
        
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Input
              placeholder="Search by job title or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/company/jobs/new')}
            leftIcon={<PlusCircle className="w-4 h-4" />}
            className="shadow-button w-full sm:w-auto"
          >
            Post New Job Opening
          </Button>
        </div>

        {/* Jobs Table / List Cards */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} hover className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={job.status === 'Active' ? 'success' : 'default'} size="sm" dot>
                      {job.status}
                    </Badge>
                    <Badge variant="outline" size="sm">{job.workMode}</Badge>
                    <Badge variant="outline" size="sm">{job.employmentType}</Badge>
                  </div>

                  <h3 className="text-base font-bold text-[#171923] hover:text-[#6655D9] transition-colors cursor-pointer" onClick={() => navigate('/company/applicants')}>
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#737987]">
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.salary}</span>
                    <span>•</span>
                    <span>{job.vacancies} vacancies</span>
                    <span>•</span>
                    <span>Deadline: {job.deadline}</span>
                  </div>
                </div>

                {/* Right Metrics & Actions */}
                <div className="flex items-center gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100 shrink-0">
                  <div
                    onClick={() => navigate('/company/applicants')}
                    className="p-3 rounded-xl bg-[#F8F9FC] border border-[#E8EAED] text-center cursor-pointer hover:border-[#6655D9] transition-colors"
                  >
                    <div className="flex items-center gap-1.5 justify-center text-xs font-bold text-[#6655D9]">
                      <Users className="w-4 h-4" />
                      <span>{job.applicantsCount}</span>
                    </div>
                    <span className="text-[10px] text-[#737987]">Applicants</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={job.status === 'Active' ? 'outline' : 'secondary'}
                      size="sm"
                      onClick={() => toggleStatus(job.id)}
                    >
                      {job.status === 'Active' ? 'Close Opening' : 'Reopen'}
                    </Button>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate('/company/applicants')}
                    >
                      View Applicants
                    </Button>

                    <button
                      onClick={() => handleDelete(job.id)}
                      className="p-2 text-gray-400 hover:text-rose-600 rounded-xl"
                      title="Delete Posting"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </Card>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};
