import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import {
  Briefcase,
  DollarSign,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  ShieldAlert,
  ArrowLeft,
  Plus
} from 'lucide-react';

export const CreateJobPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();

  const isVerified = user?.companyProfile?.verificationStatus === 'verified';

  const [formData, setFormData] = useState({
    title: '',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experience: '1-3 years',
    vacancies: 2,
    salary: '$30,000 – $45,000 / yr',
    location: user?.companyProfile?.location || 'Bengaluru, India',
    deadline: '2026-11-30',
    skills: 'React.js, Node.js, Python, System Design',
    qualifications: 'B.Tech / M.Tech in Computer Science or related degree',
    description: '',
    responsibilities: '• Design and develop high-throughput microservices.\n• Collaborate with product teams on system requirements.\n• Write clean, test-driven TypeScript and Python code.',
    benefits: '• Competitive compensation and equity options.\n• Health and wellness coverage.\n• Flexible work environment and learning budget.',
    selectionProcess: 'Round 1: AI Mock / Screening Evaluation\nRound 2: Technical Deep Dive\nRound 3: Leadership & Cultural Alignment',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isVerified) {
      setError('Your company profile is still awaiting Admin verification. You cannot publish jobs until approved.');
      return;
    }

    if (!formData.title || !formData.description) {
      setError('Please fill in the Job Title and Description.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Job opening published successfully! Candidates can now apply.');
      navigate('/company/jobs');
    }, 600);
  };

  return (
    <DashboardLayout
      title="Create New Job Opening"
      subtitle="Publish an opening with required skills, compensation range, and selection stages."
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/company/jobs')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Job Listings
          </Button>
          <Badge variant={isVerified ? 'verified' : 'pending'} size="sm">
            {isVerified ? 'Verified Company • Publishing Allowed' : 'Pending Verification'}
          </Badge>
        </div>

        {/* Verification Check Warning */}
        {!isVerified && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Company Verification Required</p>
              Only admin-verified companies can publish public job postings. If you are using the demo, switch role to Admin or verify your account.
            </div>
          </div>
        )}

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#E8EAED] pb-4">
              <CardTitle>Role Basics & Parameters</CardTitle>
              <p className="text-xs text-[#737987] mt-0.5">Specify core job properties and work arrangements.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="title"
                label="Job Title"
                placeholder="e.g. Senior Full Stack AI Engineer"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <Input
                id="location"
                label="Job Location"
                placeholder="e.g. Bengaluru / San Francisco / Remote"
                value={formData.location}
                onChange={handleInputChange}
                leftIcon={<MapPin className="w-4 h-4" />}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Select
                id="workMode"
                label="Work Mode"
                value={formData.workMode}
                onChange={handleInputChange}
                options={[
                  { value: 'Remote', label: 'Remote' },
                  { value: 'Hybrid', label: 'Hybrid' },
                  { value: 'On-site', label: 'On-site' },
                ]}
              />

              <Select
                id="employmentType"
                label="Employment Type"
                value={formData.employmentType}
                onChange={handleInputChange}
                options={[
                  { value: 'Full-time', label: 'Full-time' },
                  { value: 'Part-time', label: 'Part-time' },
                  { value: 'Internship', label: 'Internship' },
                  { value: 'Contract', label: 'Contract' },
                ]}
              />

              <Input
                id="experience"
                label="Experience Level"
                placeholder="e.g. 0-2 yrs / 3+ yrs"
                value={formData.experience}
                onChange={handleInputChange}
              />

              <Input
                id="vacancies"
                label="Open Vacancies"
                type="number"
                value={formData.vacancies}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="salary"
                label="Annual Salary / Compensation"
                placeholder="e.g. $30,000 – $45,000 / yr"
                value={formData.salary}
                onChange={handleInputChange}
                leftIcon={<DollarSign className="w-4 h-4" />}
              />
              <Input
                id="deadline"
                label="Application Deadline"
                type="date"
                value={formData.deadline}
                onChange={handleInputChange}
                leftIcon={<Calendar className="w-4 h-4" />}
              />
            </div>

            <Input
              id="skills"
              label="Required Skills (comma-separated for AI candidate matching)"
              placeholder="e.g. React.js, Node.js, Python, PostgreSQL, System Design"
              value={formData.skills}
              onChange={handleInputChange}
              helperText="The AI candidate screener matches these exact skills against candidate profiles & resumes."
              required
            />

            <Input
              id="qualifications"
              label="Required Educational Qualifications"
              placeholder="e.g. B.Tech/M.Tech in CS or related field"
              value={formData.qualifications}
              onChange={handleInputChange}
            />

            <div>
              <label className="block text-xs font-semibold text-[#171923] mb-1.5">
                Job Overview & Team Culture <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide a comprehensive description of the role, challenges, and team expectations..."
                className="w-full text-xs p-3.5 border border-[#E8EAED] rounded-xl focus:border-[#6655D9] outline-none text-[#171923]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#171923] mb-1.5">
                Key Responsibilities (One per line)
              </label>
              <textarea
                id="responsibilities"
                rows={3}
                value={formData.responsibilities}
                onChange={handleInputChange}
                className="w-full text-xs p-3.5 border border-[#E8EAED] rounded-xl focus:border-[#6655D9] outline-none text-[#171923] font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#171923] mb-1.5">
                  Benefits & Perks
                </label>
                <textarea
                  id="benefits"
                  rows={3}
                  value={formData.benefits}
                  onChange={handleInputChange}
                  className="w-full text-xs p-3.5 border border-[#E8EAED] rounded-xl focus:border-[#6655D9] outline-none text-[#171923]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171923] mb-1.5">
                  Hiring & Selection Stages
                </label>
                <textarea
                  id="selectionProcess"
                  rows={3}
                  value={formData.selectionProcess}
                  onChange={handleInputChange}
                  className="w-full text-xs p-3.5 border border-[#E8EAED] rounded-xl focus:border-[#6655D9] outline-none text-[#171923]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8EAED] flex justify-end gap-3">
              <Button variant="outline" onClick={() => navigate('/company/jobs')}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={submitting}
                className="shadow-button"
              >
                Publish Job Opening
              </Button>
            </div>
          </Card>
        </form>

      </div>
    </DashboardLayout>
  );
};
