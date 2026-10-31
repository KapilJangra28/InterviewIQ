import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import {
  Users,
  Search,
  Filter,
  FileText,
  Calendar,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Sparkles,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  Video
} from 'lucide-react';

export const ApplicantManagement = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [schedulingCandidate, setSchedulingCandidate] = useState(null);
  const [interviewDate, setInterviewDate] = useState('2026-11-05');
  const [interviewTime, setInterviewTime] = useState('15:00');
  const [instructions, setInstructions] = useState('Please review system design architecture concepts before this round.');

  const [applicants, setApplicants] = useState([
    {
      id: 'cand_01',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.edu',
      phone: '+91 9876543210',
      jobTitle: 'Full Stack AI Engineer',
      appliedAt: '2026-10-28',
      matchScore: 92,
      status: 'Shortlisted',
      college: 'IIT Bombay',
      degree: 'B.Tech',
      branch: 'Computer Science',
      skills: ['React.js', 'Node.js', 'Python', 'System Design', 'Docker', 'PostgreSQL'],
      resume: 'Aarav_Sharma_Resume.pdf',
      recentMockScore: '8.9 / 10',
      missingSkills: ['Kubernetes (Cluster Admin)'],
    },
    {
      id: 'cand_02',
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+91 9811223344',
      jobTitle: 'Full Stack AI Engineer',
      appliedAt: '2026-10-29',
      matchScore: 88,
      status: 'Under Review',
      college: 'BITS Pilani',
      degree: 'B.E.',
      branch: 'Electrical & CS',
      skills: ['Python', 'FastAPI', 'Docker', 'React.js', 'Redis'],
      resume: 'Priya_Patel_CV.pdf',
      recentMockScore: '8.4 / 10',
      missingSkills: ['System Design (Multi-region)'],
    },
    {
      id: 'cand_03',
      name: 'Rohan Verma',
      email: 'rohan.verma@example.com',
      phone: '+91 9722334455',
      jobTitle: 'Frontend UI/UX Platform Architect',
      appliedAt: '2026-10-27',
      matchScore: 95,
      status: 'Interview Scheduled',
      college: 'NIT Trichy',
      degree: 'B.Tech',
      branch: 'Information Technology',
      skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Next.js'],
      resume: 'Rohan_Verma_Resume.pdf',
      recentMockScore: '9.1 / 10',
      missingSkills: [],
    },
    {
      id: 'cand_04',
      name: 'Sneha Rao',
      email: 'sneha.rao@example.com',
      phone: '+91 9633445566',
      jobTitle: 'Backend Distributed Systems Engineer',
      appliedAt: '2026-10-26',
      matchScore: 81,
      status: 'Applied',
      college: 'DTU Delhi',
      degree: 'B.Tech',
      branch: 'Software Engineering',
      skills: ['Go', 'PostgreSQL', 'Data Structures', 'C++'],
      resume: 'Sneha_Rao_Backend.pdf',
      recentMockScore: '7.8 / 10',
      missingSkills: ['Distributed Consensus (Raft)'],
    }
  ]);

  const updateCandidateStatus = (id, newStatus) => {
    setApplicants(applicants.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
    toast.info(`Candidate status updated to "${newStatus}"`);
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate({ ...selectedCandidate, status: newStatus });
    }
  };

  const handleScheduleConfirm = () => {
    if (!schedulingCandidate) return;
    updateCandidateStatus(schedulingCandidate.id, 'Interview Scheduled');
    toast.success(`Interview invitation sent to ${schedulingCandidate.name} for ${interviewDate} at ${interviewTime}!`);
    setSchedulingCandidate(null);
  };

  const filtered = applicants.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      a.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout
      title="Candidate Pipeline & ATS"
      subtitle="Review applicants, inspect AI skill match summaries, and coordinate interviews."
    >
      <div className="space-y-6">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 max-w-md">
              <Input
                placeholder="Search candidates by name, job, or skill..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="w-44">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: 'All', label: 'All Statuses' },
                  { value: 'Applied', label: 'Applied' },
                  { value: 'Under Review', label: 'Under Review' },
                  { value: 'Shortlisted', label: 'Shortlisted' },
                  { value: 'Interview Scheduled', label: 'Interview Scheduled' },
                  { value: 'Selected', label: 'Selected' },
                  { value: 'Rejected', label: 'Rejected' },
                ]}
              />
            </div>
          </div>

          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/company/screening')}
            leftIcon={<Sparkles className="w-4 h-4 text-[#6655D9]" />}
            className="w-full sm:w-auto"
          >
            Run AI Candidate Screener
          </Button>
        </div>

        {/* Applicants List */}
        <div className="space-y-4">
          {filtered.map((cand) => (
            <Card key={cand.id} hover className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        cand.status === 'Selected' ? 'selected' :
                        cand.status === 'Interview Scheduled' ? 'primary' :
                        cand.status === 'Shortlisted' ? 'shortlisted' :
                        cand.status === 'Under Review' ? 'pending' :
                        cand.status === 'Rejected' ? 'rejected' : 'default'
                      }
                      size="sm"
                      dot
                    >
                      {cand.status}
                    </Badge>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {cand.matchScore}% Match
                    </span>
                    <span className="text-xs text-[#737987]">Applied {cand.appliedAt}</span>
                  </div>

                  <h3
                    className="text-base font-bold text-[#171923] hover:text-[#6655D9] transition-colors cursor-pointer"
                    onClick={() => setSelectedCandidate(cand)}
                  >
                    {cand.name}
                  </h3>
                  <p className="text-xs text-[#737987]">
                    Role: <span className="font-semibold text-gray-800">{cand.jobTitle}</span> • {cand.college} ({cand.degree} {cand.branch})
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {cand.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-lg bg-gray-100 text-[10px] text-gray-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCandidate(cand)}
                  >
                    Profile
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => updateCandidateStatus(cand.id, 'Shortlisted')}
                    disabled={cand.status === 'Shortlisted'}
                  >
                    Shortlist
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSchedulingCandidate(cand)}
                    leftIcon={<Calendar className="w-3.5 h-3.5" />}
                  >
                    Schedule
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateCandidateStatus(cand.id, 'Rejected')}
                    className="text-rose-600 hover:bg-rose-50"
                  >
                    Reject
                  </Button>
                </div>

              </div>
            </Card>
          ))}
        </div>

      </div>

      {/* Candidate Profile Details Modal */}
      {selectedCandidate && (
        <Modal
          isOpen={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          title={selectedCandidate.name}
          description={`Applicant for ${selectedCandidate.jobTitle}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F8F9FC] border border-[#E8EAED]">
              <div>
                <p className="text-xs font-bold text-[#171923]">AI Match Compatibility</p>
                <p className="text-xs text-[#737987]">Calculated from resume vs role criteria</p>
              </div>
              <span className="text-xl font-black text-[#6655D9]">{selectedCandidate.matchScore}%</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-semibold text-gray-500">Email:</span>
                <p className="text-[#171923] font-bold">{selectedCandidate.email}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-500">Phone:</span>
                <p className="text-[#171923] font-bold">{selectedCandidate.phone}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-500">Education:</span>
                <p className="text-[#171923] font-bold">{selectedCandidate.college}</p>
                <p className="text-[#737987]">{selectedCandidate.degree} - {selectedCandidate.branch}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-500">Recent AI Mock Score:</span>
                <p className="text-emerald-600 font-bold">{selectedCandidate.recentMockScore}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#171923] mb-2">Technical Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCandidate.skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-xl bg-[#F4F2FF] text-[#6655D9] font-semibold text-xs border border-[#6655D9]/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {selectedCandidate.missingSkills?.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Missing / Gap Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.missingSkills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-800 text-xs border border-amber-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 rounded-xl border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-rose-500" />
                <span className="text-xs font-bold text-[#171923]">{selectedCandidate.resume}</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => toast.info(`Downloading ${selectedCandidate.resume}...`)}
              >
                Download Resume PDF
              </Button>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <Select
                value={selectedCandidate.status}
                onChange={(e) => updateCandidateStatus(selectedCandidate.id, e.target.value)}
                options={[
                  { value: 'Applied', label: 'Status: Applied' },
                  { value: 'Under Review', label: 'Status: Under Review' },
                  { value: 'Shortlisted', label: 'Status: Shortlisted' },
                  { value: 'Interview Scheduled', label: 'Status: Interview Scheduled' },
                  { value: 'Selected', label: 'Status: Selected / Offer' },
                  { value: 'Rejected', label: 'Status: Rejected' },
                ]}
                className="w-56"
              />
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setSchedulingCandidate(selectedCandidate);
                  setSelectedCandidate(null);
                }}
              >
                Schedule Interview
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Schedule Interview Modal */}
      {schedulingCandidate && (
        <Modal
          isOpen={!!schedulingCandidate}
          onClose={() => setSchedulingCandidate(null)}
          title={`Schedule Interview with ${schedulingCandidate.name}`}
          description={`Position: ${schedulingCandidate.jobTitle}`}
          size="md"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Interview Date"
                type="date"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                required
              />
              <Input
                label="Interview Time"
                type="time"
                value={interviewTime}
                onChange={(e) => setInterviewTime(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#171923] mb-1.5">
                Special Candidate Instructions & Meeting Agenda
              </label>
              <textarea
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full text-xs p-3 border rounded-xl outline-none focus:border-[#6655D9]"
              />
            </div>

            <div className="p-3 bg-purple-50 rounded-xl text-xs text-purple-900 leading-relaxed border border-purple-100">
              An invitation notification and meeting calendar entry will be dispatched to <span className="font-bold">{schedulingCandidate.email}</span>.
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <Button variant="outline" size="sm" onClick={() => setSchedulingCandidate(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleScheduleConfirm}>
                Confirm & Send Invitation
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </DashboardLayout>
  );
};
