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
  Building2,
  Mail,
  Lock,
  Globe,
  MapPin,
  User,
  ShieldAlert,
  ShieldCheck,
  Image as ImageIcon
} from 'lucide-react';

export const RegisterCompanyPage = () => {
  const navigate = useNavigate();
  const { registerCompany } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    website: '',
    industry: 'Technology & Software',
    description: '',
    location: '',
    contactPerson: '',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.companyName || !formData.email || !formData.password || !formData.contactPerson) {
      setError('Please fill out all required company registration fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await registerCompany(formData);
      if (res.success) {
        toast.success('Company registered! Your account is submitted for Admin verification.');
        navigate('/company/dashboard');
      } else {
        setError(res.message || 'Registration failed. Please check your information.');
      }
    } catch (err) {
      setError('An error occurred during company registration.');
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
            Register Employer Account
          </h2>
          <p className="mt-1 text-xs text-[#737987]">
            Publish openings, track applicants, and leverage AI candidate screening.
          </p>
        </div>

        {/* Verification Notice Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-800 leading-relaxed">
            <p className="font-bold text-amber-900">Verification Requirement Notice</p>
            To maintain strict candidate trust, all registered companies undergo admin review before job postings can be made publicly visible to students.
          </div>
        </div>

        {/* Card Form */}
        <div className="bg-white/95 backdrop-blur-xl p-6 sm:p-10 shadow-2xl rounded-3xl border border-[#E8EAED]">
          
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Company Details */}
            <div className="border-b border-[#E8EAED]/60 pb-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6655D9] flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> Company Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="companyName"
                  label="Registered Company Name"
                  placeholder="e.g. TechPulse Solutions Inc."
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  id="email"
                  label="Official Corporate Email"
                  type="email"
                  placeholder="careers@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  leftIcon={<Mail className="w-4 h-4" />}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="password"
                  label="Account Password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={handleInputChange}
                  leftIcon={<Lock className="w-4 h-4" />}
                  required
                />
                <Input
                  id="website"
                  label="Official Website URL"
                  placeholder="https://company.com"
                  value={formData.website}
                  onChange={handleInputChange}
                  leftIcon={<Globe className="w-4 h-4" />}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  id="industry"
                  label="Industry Vertical"
                  value={formData.industry}
                  onChange={handleInputChange}
                  options={[
                    { value: 'Technology & Software', label: 'Technology & Software' },
                    { value: 'Fintech & Banking', label: 'Fintech & Banking' },
                    { value: 'E-Commerce & Retail', label: 'E-Commerce & Retail' },
                    { value: 'Healthcare & Biotech', label: 'Healthcare & Biotech' },
                    { value: 'Consulting & Services', label: 'Consulting & Services' },
                    { value: 'Hardware & Embedded', label: 'Hardware & Embedded' },
                    { value: 'Other', label: 'Other Industry' },
                  ]}
                  required
                />
                <Input
                  id="location"
                  label="Headquarters / Office Location"
                  placeholder="e.g. San Francisco, CA / Bengaluru, India"
                  value={formData.location}
                  onChange={handleInputChange}
                  leftIcon={<MapPin className="w-4 h-4" />}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171923] mb-1.5">
                  Company Overview & Mission <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your company culture, technology stack, and hiring focus..."
                  className="w-full text-sm bg-white border border-[#E8EAED] rounded-xl p-3.5 focus:border-[#6655D9] focus:ring-2 focus:ring-[#6655D9]/20 outline-none text-[#171923]"
                  required
                />
              </div>
            </div>

            {/* Recruiter / Point of Contact */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6655D9] flex items-center gap-1.5">
                <User className="w-4 h-4" /> Recruiter / Talent Lead Contact
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="contactPerson"
                  label="Contact Person Name & Title"
                  placeholder="e.g. Sarah Jenkins (Head of Talent)"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  id="logo"
                  label="Company Logo Image URL"
                  placeholder="https://..."
                  value={formData.logo}
                  onChange={handleInputChange}
                  leftIcon={<ImageIcon className="w-4 h-4" />}
                  helperText="Provide public image URL or keep default placeholder"
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={submitting}
              className="w-full justify-center shadow-button shadow-[#6655D9]/25 text-base py-3.5 mt-4"
            >
              Submit Company for Verification
            </Button>
          </form>

          {/* Already have account */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-[#737987]">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-[#6655D9] hover:underline">
              Sign In to ATS
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
