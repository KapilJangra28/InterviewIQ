import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useToast } from '../../context/ToastContext';
import {
  Building2,
  ShieldCheck,
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Globe,
  MapPin,
  Mail,
  Ban
} from 'lucide-react';

export const AdminCompanyVerification = () => {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const [companies, setCompanies] = useState([
    {
      id: 'comp_01',
      companyName: 'TechPulse Cloud Solutions',
      officialEmail: 'recruiter@techpulse.io',
      website: 'https://techpulse.io',
      industry: 'Cloud Infrastructure & AI',
      location: 'San Francisco & Bengaluru',
      contactPerson: 'Sarah Jenkins (Head of Talent)',
      verificationStatus: 'verified',
      registeredAt: '2026-10-10',
      activeJobs: 3,
    },
    {
      id: 'comp_pend_01',
      companyName: 'Synthetix Robotics Corp',
      officialEmail: 'recruiter@synthetix.ai',
      website: 'https://synthetix.ai',
      industry: 'Robotics & Automation',
      location: 'Boston, MA',
      contactPerson: 'David Vance',
      verificationStatus: 'pending',
      registeredAt: '2026-10-31',
      activeJobs: 0,
    },
    {
      id: 'comp_pend_02',
      companyName: 'HyperScale Fintech Labs',
      officialEmail: 'talent@hyperscale.io',
      website: 'https://hyperscale.io',
      industry: 'Fintech & Security',
      location: 'London & Singapore',
      contactPerson: 'Elena Rostova',
      verificationStatus: 'pending',
      registeredAt: '2026-10-30',
      activeJobs: 0,
    },
    {
      id: 'comp_03',
      companyName: 'Nexus Scale Labs',
      officialEmail: 'careers@nexusscale.com',
      website: 'https://nexusscale.com',
      industry: 'Distributed Systems',
      location: 'Hyderabad, India',
      contactPerson: 'Vikram Seth',
      verificationStatus: 'verified',
      registeredAt: '2026-10-05',
      activeJobs: 2,
    }
  ]);

  const handleApprove = (id, name) => {
    setCompanies(companies.map((c) => (c.id === id ? { ...c, verificationStatus: 'verified' } : c)));
    toast.success(`${name} has been verified! Job publishing rights granted.`);
  };

  const handleReject = (id, name) => {
    setCompanies(companies.map((c) => (c.id === id ? { ...c, verificationStatus: 'rejected' } : c)));
    toast.warning(`Verification request for ${name} rejected.`);
  };

  const handleSuspend = (id, name) => {
    setCompanies(companies.map((c) => (c.id === id ? { ...c, verificationStatus: 'suspended' } : c)));
    toast.error(`${name} account has been suspended.`);
  };

  const filtered = companies.filter((c) => {
    const matchesSearch = c.companyName.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      c.officialEmail.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || c.verificationStatus === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout
      title="Company Verification & Management"
      subtitle="Verify corporate identities, authenticate domains, and manage employer privileges."
    >
      <div className="space-y-6">
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <Input
              placeholder="Search by company name, industry, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="w-44 w-full sm:w-auto">
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              options={[
                { value: 'All', label: 'All Verification' },
                { value: 'pending', label: 'Pending Approval' },
                { value: 'verified', label: 'Verified Employers' },
                { value: 'suspended', label: 'Suspended' },
              ]}
            />
          </div>
        </div>

        {/* List of Companies */}
        <div className="space-y-4">
          {filtered.map((company) => (
            <Card key={company.id} hover className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        company.verificationStatus === 'verified' ? 'verified' :
                        company.verificationStatus === 'pending' ? 'pending' : 'danger'
                      }
                      size="sm"
                      dot
                    >
                      {company.verificationStatus.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" size="sm">{company.industry}</Badge>
                    <span className="text-xs text-[#737987]">Registered {company.registeredAt}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#171923]">{company.companyName}</h3>
                    <a href={company.website} target="_blank" rel="noreferrer" className="text-[#6655D9] hover:underline flex items-center gap-0.5 text-xs">
                      <span>{company.website.replace('https://', '')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <p className="text-xs text-[#737987]">
                    Contact: <span className="font-semibold text-gray-800">{company.contactPerson}</span> ({company.officialEmail}) • {company.location}
                  </p>
                </div>

                {/* Verification Actions */}
                <div className="flex items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100 shrink-0">
                  {company.verificationStatus === 'pending' ? (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleApprove(company.id, company.companyName)}
                        leftIcon={<CheckCircle2 className="w-4 h-4" />}
                      >
                        Approve Company
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(company.id, company.companyName)}
                        className="text-rose-600 hover:bg-rose-50"
                      >
                        Reject
                      </Button>
                    </>
                  ) : company.verificationStatus === 'verified' ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSuspend(company.id, company.companyName)}
                      leftIcon={<Ban className="w-3.5 h-3.5" />}
                      className="text-rose-600 hover:bg-rose-50"
                    >
                      Suspend Employer
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleApprove(company.id, company.companyName)}
                    >
                      Re-instate Account
                    </Button>
                  )}
                </div>

              </div>
            </Card>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};
