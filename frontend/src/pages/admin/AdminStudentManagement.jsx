import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';
import {
  Users,
  Search,
  GraduationCap,
  Award,
  Ban,
  CheckCircle2,
  FileText,
  Mail,
  Phone
} from 'lucide-react';

export const AdminStudentManagement = () => {
  const toast = useToast();
  const [search, setSearch] = useState('');

  const [students, setStudents] = useState([
    {
      id: 'stu_01',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.edu',
      phone: '+91 9876543210',
      college: 'IIT Bombay',
      degree: 'B.Tech CS (2025)',
      interviewsCount: 12,
      avgScore: '8.4 / 10',
      status: 'Active',
      registeredAt: '2026-10-01',
      hasResume: true,
    },
    {
      id: 'stu_02',
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+91 9811223344',
      college: 'BITS Pilani',
      degree: 'B.E. EEE (2025)',
      interviewsCount: 8,
      avgScore: '8.1 / 10',
      status: 'Active',
      registeredAt: '2026-10-08',
      hasResume: true,
    },
    {
      id: 'stu_03',
      name: 'Rohan Verma',
      email: 'rohan.verma@example.com',
      phone: '+91 9722334455',
      college: 'NIT Trichy',
      degree: 'B.Tech IT (2024)',
      interviewsCount: 15,
      avgScore: '8.9 / 10',
      status: 'Active',
      registeredAt: '2026-09-24',
      hasResume: true,
    },
    {
      id: 'stu_04',
      name: 'Ananya Sen',
      email: 'ananya.sen@example.com',
      phone: '+91 9544332211',
      college: 'Jadavpur University',
      degree: 'B.Tech CS (2026)',
      interviewsCount: 1,
      avgScore: '7.2 / 10',
      status: 'Active',
      registeredAt: '2026-10-28',
      hasResume: false,
    }
  ]);

  const toggleStudentStatus = (id, name, currentStatus) => {
    const nextStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    setStudents(students.map((s) => (s.id === id ? { ...s, status: nextStatus } : s)));
    toast.info(`Account status for ${name} changed to ${nextStatus}`);
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.college.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      title="Student Directory & Accounts"
      subtitle="Search registered students, review mock engagement metrics, and manage account statuses."
    >
      <div className="space-y-6">
        
        {/* Search */}
        <div className="relative max-w-md">
          <Input
            placeholder="Search students by name, college, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        {/* Students Table */}
        <div className="space-y-3">
          {filtered.map((s) => (
            <Card key={s.id} hover className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={s.status === 'Active' ? 'success' : 'danger'} size="sm" dot>
                      {s.status}
                    </Badge>
                    <span className="text-xs text-[#737987]">Registered {s.registeredAt}</span>
                    {s.hasResume && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Resume Uploaded
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-[#171923]">{s.name}</h3>
                  <p className="text-xs text-[#737987] flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> {s.college} • {s.degree} • <Mail className="w-3.5 h-3.5 ml-1" /> {s.email}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 shrink-0">
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#6655D9]">{s.interviewsCount} Mocks</span>
                    <p className="text-[10px] text-[#737987]">Avg: {s.avgScore}</p>
                  </div>

                  <Button
                    variant={s.status === 'Active' ? 'ghost' : 'secondary'}
                    size="sm"
                    onClick={() => toggleStudentStatus(s.id, s.name, s.status)}
                    className={s.status === 'Active' ? 'text-rose-600 hover:bg-rose-50' : ''}
                  >
                    {s.status === 'Active' ? 'Suspend' : 'Activate'}
                  </Button>
                </div>

              </div>
            </Card>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};
