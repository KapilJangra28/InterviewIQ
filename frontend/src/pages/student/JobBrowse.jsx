import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import {
  Briefcase,
  Search,
  MapPin,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  Building2,
  Sparkles,
  CheckCircle2,
  Clock,
  Filter,
  ArrowRight,
  Send
} from 'lucide-react';

const SAMPLE_JOBS = [
  {
    id: 'job_101',
    title: 'Full Stack AI Engineer',
    company: 'TechPulse Cloud Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    location: 'Bengaluru / Remote',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experience: '1-3 years',
    salary: '$30,000 – $45,000 / yr',
    vacancies: 3,
    deadline: '2026-11-20',
    skills: ['React.js', 'Node.js', 'Python', 'Docker', 'System Design'],
    matchScore: 92,
    description: 'We are seeking an ambitious Full Stack Engineer to architect high-throughput AI interview & workflow agents. You will design real-time WebSocket pipelines and scalable microservices.',
    responsibilities: [
      'Architect low-latency audio/video streaming ingestion pipelines.',
      'Build intuitive, glassmorphic React components with robust accessibility.',
      'Deploy and scale containerized services across Kubernetes clusters.'
    ],
    qualifications: 'B.Tech/M.Tech in CS or related field. Strong proficiency in JavaScript/TypeScript and Python.',
    isVerifiedCompany: true,
  },
  {
    id: 'job_102',
    title: 'Backend Distributed Systems Engineer',
    company: 'Nexus Scale Labs',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200',
    location: 'Hyderabad, India',
    workMode: 'On-site',
    employmentType: 'Full-time',
    experience: 'Fresher / 0-2 years',
    salary: '$28,000 – $38,000 / yr',
    vacancies: 5,
    deadline: '2026-11-15',
    skills: ['Go', 'PostgreSQL', 'Data Structures', 'System Design'],
    matchScore: 86,
    description: 'Nexus Scale Labs is developing core distributed consensus engines for Web3 and enterprise cloud backbones. Join our foundational platform engineering squad.',
    responsibilities: [
      'Implement multi-node Raft clustering algorithms in Go.',
      'Optimize database queries and handle partition recovery scenarios.'
    ],
    qualifications: 'Solid grasp of distributed systems, concurrency primitives, and OS fundamentals.',
    isVerifiedCompany: true,
  },
  {
    id: 'job_103',
    title: 'Frontend UI/UX Platform Architect',
    company: 'CloudMatrix Digital',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=200',
    location: 'Remote',
    workMode: 'Remote',
    employmentType: 'Full-time',
    experience: '2-4 years',
    salary: '$35,000 – $50,000 / yr',
    vacancies: 2,
    deadline: '2026-11-30',
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    matchScore: 95,
    description: 'Lead design systems and user delight engineering across our global developer portal suite. You will craft responsive micro-frontends with silky 60fps animations.',
    responsibilities: [
      'Maintain unified component libraries with Tailwind and TypeScript.',
      'Optimize Web Vitals (LCP, INP, CLS) for millisecond interactions.'
    ],
    qualifications: 'Proven experience building modern design systems in React and Tailwind.',
    isVerifiedCompany: true,
  },
  {
    id: 'job_104',
    title: 'AI Machine Learning Research Intern',
    company: 'DeepCognition AI',
    companyLogo: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&q=80&w=200',
    location: 'San Francisco, CA / Remote',
    workMode: 'Remote',
    employmentType: 'Internship',
    experience: 'College Senior / Graduate',
    salary: '$4,000 / month stipend',
    vacancies: 4,
    deadline: '2026-12-01',
    skills: ['Python', 'Machine Learning', 'PyTorch', 'Gemini API'],
    matchScore: 88,
    description: 'Work alongside leading research scientists on synthetic speech generation, voice agent evaluation metrics, and multimodal reasoning datasets.',
    responsibilities: [
      'Benchmark LLM reasoning prompts and fine-tune evaluation scorers.',
      'Publish research insights and open-source tooling.'
    ],
    qualifications: 'Demonstrated coursework or GitHub projects in NLP or deep learning architectures.',
    isVerifiedCompany: true,
  }
];

export const JobBrowse = () => {
  const { user } = useAuth();
  const toast = useToast();

  const [search, setSearch] = useState('');
  const [workModeFilter, setWorkModeFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);

  const [savedJobIds, setSavedJobIds] = useState(() => {
    return JSON.parse(localStorage.getItem('interviewiq_saved_jobs') || '["job_101"]');
  });

  const [appliedJobIds, setAppliedJobIds] = useState(() => {
    return JSON.parse(localStorage.getItem('interviewiq_applied_jobs') || '[]');
  });

  const toggleSave = (jobId) => {
    let updated;
    if (savedJobIds.includes(jobId)) {
      updated = savedJobIds.filter((id) => id !== jobId);
      toast.info('Job removed from saved bookmarks');
    } else {
      updated = [...savedJobIds, jobId];
      toast.success('Job saved to your bookmarks!');
    }
    setSavedJobIds(updated);
    localStorage.setItem('interviewiq_saved_jobs', JSON.stringify(updated));
  };

  const handleApply = (job) => {
    if (appliedJobIds.includes(job.id)) {
      toast.warning('You have already applied for this position.');
      return;
    }

    const applicationRecord = {
      id: `app_${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      companyLogo: job.companyLogo,
      location: job.location,
      salary: job.salary,
      appliedAt: new Date().toISOString(),
      status: 'Applied',
      matchScore: job.matchScore,
    };

    const existingApps = JSON.parse(localStorage.getItem('interviewiq_user_applications') || '[]');
    localStorage.setItem('interviewiq_user_applications', JSON.stringify([applicationRecord, ...existingApps]));

    const updatedApplied = [...appliedJobIds, job.id];
    setAppliedJobIds(updatedApplied);
    localStorage.setItem('interviewiq_applied_jobs', JSON.stringify(updatedApplied));

    setApplyingJob(null);
    setSelectedJob(null);
    toast.success(`Application successfully submitted to ${job.company}!`);
  };

  const filteredJobs = SAMPLE_JOBS.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchesMode = workModeFilter === 'All' || job.workMode === workModeFilter;
    const matchesType = typeFilter === 'All' || job.employmentType === typeFilter;
    return matchesSearch && matchesMode && matchesType;
  });

  return (
    <DashboardLayout
      title="Explore Verified Job Openings"
      subtitle="Discover career opportunities with transparent AI candidate match scoring."
    >
      <div className="space-y-6">
        
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <Input
              placeholder="Search by job title, company, or tech skill (e.g. React, Python)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-36">
              <Select
                value={workModeFilter}
                onChange={(e) => setWorkModeFilter(e.target.value)}
                options={[
                  { value: 'All', label: 'All Work Modes' },
                  { value: 'Remote', label: 'Remote' },
                  { value: 'Hybrid', label: 'Hybrid' },
                  { value: 'On-site', label: 'On-site' },
                ]}
              />
            </div>

            <div className="w-36">
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                options={[
                  { value: 'All', label: 'All Types' },
                  { value: 'Full-time', label: 'Full-time' },
                  { value: 'Internship', label: 'Internship' },
                  { value: 'Part-time', label: 'Part-time' },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => {
            const isSaved = savedJobIds.includes(job.id);
            const isApplied = appliedJobIds.includes(job.id);

            return (
              <Card key={job.id} hover className="p-6 flex flex-col justify-between">
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-12 h-12 rounded-2xl object-cover border border-[#E8EAED]"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-[#171923] hover:text-[#6655D9] transition-colors cursor-pointer" onClick={() => setSelectedJob(job)}>
                            {job.title}
                          </h3>
                        </div>
                        <p className="text-xs text-[#737987] flex items-center gap-1 mt-0.5">
                          <span>{job.company}</span>
                          {job.isVerifiedCompany && (
                            <span className="text-emerald-600 font-semibold text-[10px] bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
                              ✓ Verified
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSave(job.id)}
                      className={`p-2 rounded-xl border transition-colors ${
                        isSaved
                          ? 'bg-[#F4F2FF] border-[#6655D9] text-[#6655D9]'
                          : 'bg-white border-[#E8EAED] text-gray-400 hover:text-[#6655D9]'
                      }`}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="primary" size="sm">{job.workMode}</Badge>
                    <Badge variant="outline" size="sm">{job.employmentType}</Badge>
                    <span className="text-xs font-semibold text-[#171923] flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-[#6655D9]" />
                      {job.salary}
                    </span>
                  </div>

                  <p className="text-xs text-[#737987] line-clamp-2 leading-relaxed mb-4">
                    {job.description}
                  </p>

                  {/* Skills required */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-lg bg-gray-100 text-[10px] font-medium text-gray-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with AI Match and Actions */}
                <div className="pt-4 border-t border-[#E8EAED] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#6655D9]" />
                    <span className="text-xs font-bold text-[#6655D9]">{job.matchScore}% Profile Match</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedJob(job)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant={isApplied ? 'secondary' : 'primary'}
                      size="sm"
                      disabled={isApplied}
                      onClick={() => setApplyingJob(job)}
                    >
                      {isApplied ? 'Applied' : 'Apply Now'}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <Modal
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          title={selectedJob.title}
          description={`${selectedJob.company} • ${selectedJob.location}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-gray-100">
              <Badge variant="primary" size="sm">{selectedJob.workMode}</Badge>
              <Badge variant="outline" size="sm">{selectedJob.employmentType}</Badge>
              <Badge variant="verified" size="sm">Admin Verified Employer</Badge>
              <span className="text-xs font-bold text-[#6655D9] ml-auto">{selectedJob.salary}</span>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#171923] mb-2">Job Description</h4>
              <p className="text-xs text-[#737987] leading-relaxed">{selectedJob.description}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#171923] mb-2">Core Responsibilities</h4>
              <ul className="space-y-1.5 text-xs text-[#737987]">
                {selectedJob.responsibilities?.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6655D9] mt-1.5 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#171923] mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedJob.skills?.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-xl bg-[#F4F2FF] border border-[#6655D9]/20 text-[#6655D9] text-xs font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="text-xs text-[#737987]">Application Deadline: {selectedJob.deadline}</span>
              <Button
                variant="primary"
                size="md"
                disabled={appliedJobIds.includes(selectedJob.id)}
                onClick={() => {
                  setSelectedJob(null);
                  setApplyingJob(selectedJob);
                }}
              >
                {appliedJobIds.includes(selectedJob.id) ? 'Already Applied' : 'Proceed to Apply'}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Application Confirmation Modal */}
      {applyingJob && (
        <Modal
          isOpen={!!applyingJob}
          onClose={() => setApplyingJob(null)}
          title={`Apply to ${applyingJob.company}`}
          description={`Position: ${applyingJob.title}`}
          size="md"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#F8F9FC] border border-[#E8EAED] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#171923]">Candidate:</span>
                <span className="text-gray-700">{user?.name}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#171923]">Attached Resume:</span>
                <span className="text-[#6655D9] font-medium">Aarav_Sharma_Resume_2026.pdf</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#171923]">AI Match Score:</span>
                <span className="text-emerald-600 font-bold">{applyingJob.matchScore}% Match</span>
              </div>
            </div>

            <p className="text-[11px] text-[#737987] leading-relaxed">
              Your comprehensive student profile, skills, and resume will be securely transmitted to the recruiter's ATS pipeline.
            </p>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <Button variant="outline" size="sm" onClick={() => setApplyingJob(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleApply(applyingJob)}
                leftIcon={<Send className="w-4 h-4" />}
              >
                Submit Application
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </DashboardLayout>
  );
};
