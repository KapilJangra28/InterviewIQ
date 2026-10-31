import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  Phone,
  GraduationCap,
  Calendar,
  BookOpen,
  Plus,
  X,
  CheckCircle2
} from 'lucide-react';

const COMMON_SKILLS = [
  'React.js', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
  'Data Structures & Algorithms', 'System Design', 'SQL', 'MongoDB',
  'AWS', 'Docker', 'Machine Learning', 'Java', 'C++', 'Git'
];

export const RegisterStudentPage = () => {
  const navigate = useNavigate();
  const { registerStudent } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    college: '',
    degree: 'B.Tech',
    branch: '',
    graduationYear: 2025,
  });

  const [skills, setSkills] = useState(['React.js', 'JavaScript', 'Data Structures & Algorithms']);
  const [skillInput, setSkillInput] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const addSkill = (skillToAdd) => {
    const trimmed = skillToAdd.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreeTerms) {
      setError('Please accept the Terms of Service and Privacy Policy to proceed.');
      return;
    }

    if (skills.length === 0) {
      setError('Please add at least one core skill to tailor your AI mock sessions.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await registerStudent({
        ...formData,
        skills,
      });

      if (res.success) {
        toast.success('Registration successful! Welcome to InterviewIQ.');
        navigate('/student/dashboard');
      } else {
        setError(res.message || 'Registration failed. Please check your information.');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#6655D9]/15 via-[#A99AF5]/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-2xl mx-auto relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6655D9] to-[#A99AF5] flex items-center justify-center text-white shadow-button group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-[#171923] tracking-tight">
              Interview<span className="text-[#6655D9]">IQ</span>
            </span>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171923] tracking-tight">
            Create Student Account
          </h2>
          <p className="mt-1 text-xs text-[#737987]">
            Unlock unlimited AI mock interviews, custom roadmaps, and verified job openings.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white/95 backdrop-blur-xl p-6 sm:p-10 shadow-2xl rounded-3xl border border-[#E8EAED]">
          
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Section 1: Basic Info */}
            <div className="border-b border-[#E8EAED]/60 pb-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6655D9] flex items-center gap-1.5">
                <User className="w-4 h-4" /> Personal Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="name"
                  label="Full Name"
                  placeholder="e.g. Aarav Sharma"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="name@university.edu"
                  value={formData.email}
                  onChange={handleInputChange}
                  leftIcon={<Mail className="w-4 h-4" />}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={handleInputChange}
                  leftIcon={<Lock className="w-4 h-4" />}
                  required
                />
                <Input
                  id="phone"
                  label="Phone Number"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  leftIcon={<Phone className="w-4 h-4" />}
                  required
                />
              </div>
            </div>

            {/* Section 2: Academic Profile */}
            <div className="border-b border-[#E8EAED]/60 pb-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6655D9] flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" /> Academic Background
              </h3>

              <Input
                id="college"
                label="College / University Name"
                placeholder="e.g. IIT Bombay / University of California"
                value={formData.college}
                onChange={handleInputChange}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Select
                  id="degree"
                  label="Degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  options={[
                    { value: 'B.Tech', label: 'B.Tech / B.E.' },
                    { value: 'M.Tech', label: 'M.Tech / M.E.' },
                    { value: 'BCA', label: 'BCA' },
                    { value: 'MCA', label: 'MCA' },
                    { value: 'B.Sc', label: 'B.Sc Computer Science' },
                    { value: 'MBA', label: 'MBA' },
                    { value: 'Other', label: 'Other Degree' },
                  ]}
                  required
                />

                <Input
                  id="branch"
                  label="Branch / Major"
                  placeholder="e.g. Computer Science"
                  value={formData.branch}
                  onChange={handleInputChange}
                  required
                />

                <Select
                  id="graduationYear"
                  label="Graduation Year"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  options={[
                    { value: 2024, label: '2024' },
                    { value: 2025, label: '2025' },
                    { value: 2026, label: '2026' },
                    { value: 2027, label: '2027' },
                    { value: 2028, label: '2028' },
                  ]}
                  required
                />
              </div>
            </div>

            {/* Section 3: Skills Selection */}
            <div className="space-y-3 pb-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6655D9]">
                  Technical Skills & Domains
                </h3>
                <span className="text-[11px] text-[#737987]">
                  {skills.length} skills selected
                </span>
              </div>

              {/* Added Skills Chips */}
              <div className="flex flex-wrap gap-2 min-h-[40px] p-3 rounded-2xl bg-[#F8F9FC] border border-[#E8EAED]">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#6655D9]/30 text-[#6655D9] shadow-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:text-rose-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Custom Skill Input */}
              <div className="flex gap-2">
                <Input
                  id="skillInput"
                  placeholder="Type a skill (e.g. Go, GraphQL, Next.js) and press Enter"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(skillInput);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => addSkill(skillInput)}
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  Add
                </Button>
              </div>

              {/* Suggested quick chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] text-[#737987] mr-1 self-center">Popular:</span>
                {COMMON_SKILLS.filter((s) => !skills.includes(s)).slice(0, 6).map((suggested) => (
                  <button
                    key={suggested}
                    type="button"
                    onClick={() => addSkill(suggested)}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-gray-100 hover:bg-[#F4F2FF] hover:text-[#6655D9] text-[#737987] transition-colors"
                  >
                    + {suggested}
                  </button>
                ))}
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300 text-[#6655D9] focus:ring-[#6655D9] w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-[#737987] leading-relaxed">
                  I agree to the <span className="text-[#6655D9] font-semibold underline">Terms of Service</span>, understand that AI recommendations are advisory, and consent to store my interview responses for rubric evaluation.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={submitting}
              className="w-full justify-center shadow-button shadow-[#6655D9]/25 text-base py-3.5"
            >
              Complete Student Registration
            </Button>
          </form>

          {/* Already have account */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-[#737987]">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#6655D9] hover:underline">
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
