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
  Building2,
  Globe,
  MapPin,
  Mail,
  User,
  ShieldCheck,
  ShieldAlert,
  Save,
  Image as ImageIcon
} from 'lucide-react';

export const CompanyProfile = () => {
  const { user, updateProfile } = useAuth();
  const toast = useToast();

  const [companyData, setCompanyData] = useState({
    companyName: user?.companyProfile?.companyName || 'TechPulse Cloud Solutions',
    description: user?.companyProfile?.description || 'Next-generation cloud infrastructure orchestration and developer toolchain platform.',
    industry: user?.companyProfile?.industry || 'Cloud Infrastructure & AI',
    website: user?.companyProfile?.website || 'https://techpulse.io',
    location: user?.companyProfile?.location || 'San Francisco, CA & Bengaluru, India',
    contactPerson: user?.companyProfile?.contactPerson || 'Sarah Jenkins (Head of Talent Acquisition)',
    logo: user?.companyProfile?.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    verificationStatus: user?.companyProfile?.verificationStatus || 'verified',
  });

  const [saving, setSaving] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      updateProfile({
        companyProfile: {
          ...user?.companyProfile,
          ...companyData,
        }
      });
      setSaving(false);
      toast.success('Company profile updated successfully!');
    }, 500);
  };

  const isVerified = companyData.verificationStatus === 'verified';

  return (
    <DashboardLayout
      title="Company Profile & Verification"
      subtitle="Manage corporate identity, office locations, and recruiter contact points."
    >
      <div className="space-y-8 max-w-4xl mx-auto">
        
        {/* Verification Status Card */}
        <div className={`p-5 rounded-2xl border flex items-center justify-between gap-4 ${
          isVerified
            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
            : 'bg-amber-50/70 border-amber-200 text-amber-950'
        }`}>
          <div className="flex items-center gap-3">
            {isVerified ? (
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            ) : (
              <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold">
                  {isVerified ? 'Enterprise Verification Approved' : 'Verification Under Review'}
                </h4>
                <Badge variant={isVerified ? 'verified' : 'pending'} size="sm">
                  {isVerified ? 'Verified Employer' : 'Pending Verification'}
                </Badge>
              </div>
              <p className="text-xs text-[#737987] mt-0.5">
                {isVerified
                  ? 'Your company is verified by Platform Admin. You have full access to publish jobs and invite candidates.'
                  : 'Platform Admin is reviewing your registration details. Verified status unlocks public job postings.'}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED] mb-6">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-5 h-5 text-[#6655D9]" />
              <CardTitle>Organization Details</CardTitle>
            </div>
            <Button
              variant="primary"
              size="sm"
              isLoading={saving}
              onClick={handleSave}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Profile
            </Button>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="companyName"
                label="Company Name"
                value={companyData.companyName}
                onChange={handleInputChange}
                required
              />
              <Input
                id="website"
                label="Official Website"
                value={companyData.website}
                onChange={handleInputChange}
                leftIcon={<Globe className="w-4 h-4" />}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="industry"
                label="Industry Vertical"
                value={companyData.industry}
                onChange={handleInputChange}
                required
              />
              <Input
                id="location"
                label="Locations / Headquarters"
                value={companyData.location}
                onChange={handleInputChange}
                leftIcon={<MapPin className="w-4 h-4" />}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#171923] mb-1.5">
                Company Overview & Mission
              </label>
              <textarea
                id="description"
                rows={3}
                value={companyData.description}
                onChange={handleInputChange}
                className="w-full text-xs p-3.5 border border-[#E8EAED] rounded-xl focus:border-[#6655D9] outline-none text-[#171923]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Input
                id="contactPerson"
                label="Primary Recruiter Contact"
                value={companyData.contactPerson}
                onChange={handleInputChange}
                leftIcon={<User className="w-4 h-4" />}
              />
              <Input
                id="logo"
                label="Logo Image URL"
                value={companyData.logo}
                onChange={handleInputChange}
                leftIcon={<ImageIcon className="w-4 h-4" />}
              />
            </div>
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
};
