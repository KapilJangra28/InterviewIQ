import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import {
  User,
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  Upload,
  Plus,
  X,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const StudentProfile = () => {
  const { user, updateProfile } = useAuth();
  const toast = useToast();

  const [personal, setPersonal] = useState({
    name: user?.name || 'Aarav Sharma',
    email: user?.email || 'aarav.sharma@example.edu',
    phone: user?.phone || '+91 9876543210',
    college: user?.studentProfile?.college || 'IIT Bombay',
    degree: user?.studentProfile?.degree || 'B.Tech',
    branch: user?.studentProfile?.branch || 'Computer Science & Engineering',
    graduationYear: user?.studentProfile?.graduationYear || 2025,
  });

  const [skills, setSkills] = useState(
    user?.studentProfile?.skills || ['React.js', 'Node.js', 'Python', 'Data Structures', 'System Design', 'PostgreSQL', 'Docker']
  );
  const [newSkill, setNewSkill] = useState('');

  const [projects, setProjects] = useState(
    user?.studentProfile?.projects || [
      {
        title: 'Distributed Cache System',
        description: 'Engineered an in-memory LRU cache with Raft consensus protocol in Go.',
        techStack: ['Go', 'Raft', 'gRPC'],
        link: 'https://github.com'
      },
      {
        title: 'AI Code Review Assistant',
        description: 'Built a GitHub action that generates security & performance summaries using LLMs.',
        techStack: ['TypeScript', 'Gemini API', 'GitHub Actions'],
        link: 'https://github.com'
      }
    ]
  );

  const [newProject, setNewProject] = useState({ title: '', description: '', techStack: '', link: '' });
  const [certifications, setCertifications] = useState(
    user?.studentProfile?.certifications || ['AWS Certified Solutions Architect', 'Meta Front-End Developer Specialization']
  );
  const [newCert, setNewCert] = useState('');

  const [resumeName, setResumeName] = useState('Aarav_Sharma_Resume_2026.pdf');
  const [saving, setSaving] = useState(false);

  const handlePersonalChange = (e) => {
    const { id, value } = e.target;
    setPersonal((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleAddProject = () => {
    if (newProject.title.trim()) {
      setProjects([
        ...projects,
        {
          ...newProject,
          techStack: newProject.techStack.split(',').map((s) => s.trim()).filter(Boolean),
        }
      ]);
      setNewProject({ title: '', description: '', techStack: '', link: '' });
    }
  };

  const handleRemoveProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleAddCert = () => {
    if (newCert.trim()) {
      setCertifications([...certifications, newCert.trim()]);
      setNewCert('');
    }
  };

  const handleRemoveCert = (cert) => {
    setCertifications(certifications.filter((c) => c !== cert));
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeName(file.name);
      toast.success(`Resume "${file.name}" uploaded and parsed successfully!`);
    }
  };

  const handleSaveProfile = () => {
    setSaving(true);
    setTimeout(() => {
      updateProfile({
        name: personal.name,
        phone: personal.phone,
        studentProfile: {
          ...user?.studentProfile,
          college: personal.college,
          degree: personal.degree,
          branch: personal.branch,
          graduationYear: Number(personal.graduationYear),
          skills,
          projects,
          certifications,
          resume: resumeName,
        }
      });
      setSaving(false);
      toast.success('Profile and resume updated successfully!');
    }, 600);
  };

  return (
    <DashboardLayout
      title="Student Profile & Resume Hub"
      subtitle="Keep your academic credentials, skills, and resume updated for AI matching."
    >
      <div className="space-y-8 max-w-4xl mx-auto">
        
        {/* Save Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED]">
          <div>
            <h2 className="text-base font-bold text-[#171923]">Profile Completeness</h2>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 95% Complete • Ready for Job Applications
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            isLoading={saving}
            onClick={handleSaveProfile}
            className="shadow-button"
          >
            Save All Changes
          </Button>
        </div>

        {/* Section 1: Resume Upload */}
        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED] mb-6">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-[#6655D9]" />
              <CardTitle>Current Master Resume</CardTitle>
            </div>
            <Badge variant="primary" size="sm">Auto-parsed by AI</Badge>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8F9FC] border-2 border-dashed border-[#6655D9]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E8EAED] text-rose-500 flex items-center justify-center font-bold text-xs shadow-sm">
                PDF
              </div>
              <div>
                <p className="text-sm font-bold text-[#171923]">{resumeName}</p>
                <p className="text-xs text-[#737987]">Uploaded & active for 1-click recruiter applications</p>
              </div>
            </div>

            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
              />
              <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-[#6655D9] text-white hover:bg-[#5542C6] transition-colors shadow-button">
                <Upload className="w-4 h-4" />
                Upload New Resume
              </span>
            </label>
          </div>
        </Card>

        {/* Section 2: Personal & Academic Info */}
        <Card className="p-6 sm:p-8">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#E8EAED] mb-6">
            <User className="w-5 h-5 text-[#6655D9]" />
            <CardTitle>Personal & Academic Details</CardTitle>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="name"
                label="Full Name"
                value={personal.name}
                onChange={handlePersonalChange}
              />
              <Input
                id="email"
                label="Email Address"
                value={personal.email}
                disabled
                helperText="Primary account email cannot be modified"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="phone"
                label="Contact Phone"
                value={personal.phone}
                onChange={handlePersonalChange}
              />
              <Input
                id="college"
                label="College / University"
                value={personal.college}
                onChange={handlePersonalChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                id="degree"
                label="Degree"
                value={personal.degree}
                onChange={handlePersonalChange}
              />
              <Input
                id="branch"
                label="Branch / Major"
                value={personal.branch}
                onChange={handlePersonalChange}
              />
              <Select
                id="graduationYear"
                label="Graduation Year"
                value={personal.graduationYear}
                onChange={handlePersonalChange}
                options={[
                  { value: 2024, label: '2024' },
                  { value: 2025, label: '2025' },
                  { value: 2026, label: '2026' },
                  { value: 2027, label: '2027' },
                  { value: 2028, label: '2028' },
                ]}
              />
            </div>
          </div>
        </Card>

        {/* Section 3: Technical Skills */}
        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED] mb-6">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#6655D9]" />
              <CardTitle>Technical Skills & Competencies</CardTitle>
            </div>
            <span className="text-xs text-[#737987]">{skills.length} skills</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4 p-4 rounded-2xl bg-[#F8F9FC] border border-[#E8EAED]">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#6655D9]/30 text-[#6655D9] shadow-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-rose-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              id="newSkill"
              placeholder="Add another skill (e.g. Kubernetes, Redis, GraphQL)"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
            />
            <Button variant="secondary" onClick={handleAddSkill} leftIcon={<Plus className="w-4 h-4" />}>
              Add
            </Button>
          </div>
        </Card>

        {/* Section 4: Projects */}
        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED] mb-6">
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-5 h-5 text-[#6655D9]" />
              <CardTitle>Key Projects</CardTitle>
            </div>
            <span className="text-xs text-[#737987]">{projects.length} added</span>
          </div>

          <div className="space-y-4 mb-6">
            {projects.map((proj, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#E8EAED] bg-[#F8F9FC] flex justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#171923]">{proj.title}</h4>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-[#6655D9] hover:underline flex items-center gap-1 text-xs">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-[#737987] mt-1">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {proj.techStack?.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-white border border-gray-200 text-[10px] text-gray-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveProject(idx)}
                  className="text-gray-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add project form */}
          <div className="p-4 rounded-2xl border border-gray-200 bg-white space-y-3">
            <h4 className="text-xs font-bold text-[#171923] uppercase tracking-wider">Add New Project</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Project Title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              />
              <Input
                placeholder="Repository or Live URL"
                value={newProject.link}
                onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
              />
            </div>
            <textarea
              rows={2}
              placeholder="Brief description of architecture, impact, and your role..."
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="w-full text-xs p-3 border rounded-xl outline-none focus:border-[#6655D9]"
            />
            <Input
              placeholder="Technologies used (comma-separated, e.g. React, Node.js, Redis)"
              value={newProject.techStack}
              onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
            />
            <Button variant="secondary" size="sm" onClick={handleAddProject} leftIcon={<Plus className="w-4 h-4" />}>
              Add Project
            </Button>
          </div>
        </Card>

        {/* Section 5: Certifications */}
        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED] mb-6">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-[#6655D9]" />
              <CardTitle>Certifications & Accreditations</CardTitle>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9FC] border border-[#E8EAED]">
                <span className="text-xs font-semibold text-[#171923]">{cert}</span>
                <button onClick={() => handleRemoveCert(cert)} className="text-gray-400 hover:text-rose-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="e.g. Certified Kubernetes Administrator (CKA)"
              value={newCert}
              onChange={(e) => setNewCert(e.target.value)}
            />
            <Button variant="secondary" onClick={handleAddCert} leftIcon={<Plus className="w-4 h-4" />}>
              Add
            </Button>
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
};
