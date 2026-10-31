import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Select } from '../../components/ui/Select';
import { useToast } from '../../context/ToastContext';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  User,
  ArrowRight,
  Filter,
  BarChart2,
  SlidersHorizontal
} from 'lucide-react';

export const AiCandidateScreening = () => {
  const toast = useToast();
  const [selectedJobId, setSelectedJobId] = useState('job_101');
  const [screeningRunning, setScreeningRunning] = useState(false);

  const [candidates, setCandidates] = useState([
    {
      id: 'cand_01',
      name: 'Aarav Sharma',
      degree: 'B.Tech CS (IIT Bombay, 2025)',
      matchPercentage: 92,
      recommendation: 'Strong Match for Technical Interview',
      matchingQualifications: [
        'React.js and modern state management',
        'Node.js & microservices backend architecture',
        'Python & Gemini AI agent integration',
        'Demonstrated distributed cache engineering project'
      ],
      missingSkills: ['Kubernetes cluster production operations'],
      experienceRating: 'High Alignment (2 deep projects + AWS Certification)',
      mockInterviewConsent: true,
      recentAiMockScore: '8.9 / 10 (Distributed Systems)',
    },
    {
      id: 'cand_03',
      name: 'Rohan Verma',
      degree: 'B.Tech IT (NIT Trichy, 2024)',
      matchPercentage: 95,
      recommendation: 'Exceptional Frontend Architecture Candidate',
      matchingQualifications: [
        'Mastery of TypeScript, React 18, and Next.js',
        'Comprehensive UI/UX design systems portfolio',
        'Web Vitals optimization and performance tuning'
      ],
      missingSkills: [],
      experienceRating: 'Exceeds Qualifications',
      mockInterviewConsent: true,
      recentAiMockScore: '9.1 / 10 (Frontend Architecture)',
    },
    {
      id: 'cand_02',
      name: 'Priya Patel',
      degree: 'B.E. EEE (BITS Pilani, 2025)',
      matchPercentage: 88,
      recommendation: 'Strong Backend & Data Candidate',
      matchingQualifications: [
        'Solid Python, FastAPI, and Docker pipelines',
        'Redis cache implementation experience'
      ],
      missingSkills: ['Large-scale Distributed System Design'],
      experienceRating: 'Good Alignment with Junior/Mid profile',
      mockInterviewConsent: true,
      recentAiMockScore: '8.4 / 10 (Python & DB)',
    },
    {
      id: 'cand_04',
      name: 'Sneha Rao',
      degree: 'B.Tech SE (DTU, 2025)',
      matchPercentage: 81,
      recommendation: 'Solid Core Engineering Fundamentals',
      matchingQualifications: [
        'High proficiency in Go & PostgreSQL relational databases',
        'Strong Data Structures & Algorithms'
      ],
      missingSkills: ['Distributed Consensus (Raft)', 'Cloud orchestration'],
      experienceRating: 'Foundational Developer',
      mockInterviewConsent: false, // Student has not consented to share mock report
      recentAiMockScore: 'Report Protected (Student Consent Required)',
    }
  ]);

  const runReScreen = () => {
    setScreeningRunning(true);
    setTimeout(() => {
      setScreeningRunning(false);
      toast.success('AI candidate screening re-analyzed with latest job requirements!');
    }, 800);
  };

  return (
    <DashboardLayout
      title="AI Candidate Screening & Skill Matching"
      subtitle="Transparent comparison of candidate credentials against published job requirements."
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        
        {/* Ethical AI & Human-in-the-Loop Banner */}
        <div className="p-4 rounded-2xl bg-[#F4F2FF] border border-[#6655D9]/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#6655D9] shrink-0 mt-0.5" />
          <div className="text-xs text-[#171923] leading-relaxed">
            <span className="font-bold text-[#6655D9]">Ethical AI Advisory Notice:</span> AI match scoring and candidate summaries are designed exclusively to assist and accelerate recruiter review. All shortlisting, interview invitations, and hiring decisions remain strictly under human recruiter authority. No candidate is ever automatically rejected by AI.
          </div>
        </div>

        {/* Screening Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E8EAED]">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-bold text-[#171923]">Target Job:</span>
            <div className="w-72">
              <Select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                options={[
                  { value: 'job_101', label: 'Full Stack AI Engineer (Hybrid)' },
                  { value: 'job_103', label: 'Frontend UI/UX Platform Architect' },
                  { value: 'job_102', label: 'Backend Distributed Systems Engineer' },
                ]}
              />
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            isLoading={screeningRunning}
            onClick={runReScreen}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Re-run Screening Match
          </Button>
        </div>

        {/* Candidates Breakdown */}
        <div className="space-y-5">
          {candidates.map((cand) => (
            <Card key={cand.id} className="p-6 transition-all hover:shadow-card-hover">
              <div className="space-y-4">
                
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8EAED]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[#171923]">{cand.name}</h3>
                      <Badge variant="primary" size="sm">{cand.degree}</Badge>
                    </div>
                    <p className="text-xs text-[#6655D9] font-semibold mt-0.5">{cand.recommendation}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-2xl font-black text-[#6655D9]">{cand.matchPercentage}%</span>
                      <p className="text-[10px] text-[#737987] font-semibold">Match Compatibility</p>
                    </div>
                  </div>
                </div>

                {/* Grid Comparison: Matching vs Missing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Matching Qualifications */}
                  <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/60">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Matching Qualifications
                    </h4>
                    <ul className="space-y-1.5 text-xs text-emerald-950">
                      {cand.matchingQualifications.map((m, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Missing or Gap Skills */}
                  <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/60">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" /> Gaps / Missing Criteria
                    </h4>
                    {cand.missingSkills.length === 0 ? (
                      <p className="text-xs text-emerald-700 font-medium">None! Candidate covers 100% of required technical stack.</p>
                    ) : (
                      <ul className="space-y-1.5 text-xs text-amber-950">
                        {cand.missingSkills.map((gap, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                            <span>{gap}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* AI Mock Session Score / Consent Status */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 text-xs text-[#737987]">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#6655D9]" />
                    <span>
                      AI Practice Mock Score:{' '}
                      <strong className={cand.mockInterviewConsent ? 'text-emerald-700' : 'text-gray-500'}>
                        {cand.recentAiMockScore}
                      </strong>
                    </span>
                    {!cand.mockInterviewConsent && (
                      <Badge variant="outline" size="sm">Consent Required</Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => toast.success(`Candidate ${cand.name} shortlisted for review!`)}
                    >
                      Shortlist Candidate
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => toast.info(`Screening interview invitation sent to ${cand.name}!`)}
                    >
                      Invite to Screening Interview
                    </Button>
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
