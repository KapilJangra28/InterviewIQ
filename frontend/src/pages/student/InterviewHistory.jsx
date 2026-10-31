import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import {
  Mic,
  Calendar,
  Clock,
  Award,
  Search,
  Filter,
  ArrowRight,
  FileText,
  Plus
} from 'lucide-react';

export const InterviewHistory = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Load user's actual stored history + sample past records
  const [history] = useState(() => {
    const saved = localStorage.getItem('interviewiq_user_history');
    const parsed = saved ? JSON.parse(saved) : [];
    
    const defaults = [
      {
        id: 'int_01',
        title: 'Distributed Systems & Microservices Architecture',
        category: 'Technical Interview',
        completedAt: '2026-10-30T16:30:00Z',
        durationMinutes: 22,
        overallScore: 8.9,
        difficulty: 'Advanced',
      },
      {
        id: 'int_02',
        title: 'Executive Leadership & Cross-Functional Conflict',
        category: 'Behavioral Interview',
        completedAt: '2026-10-26T11:00:00Z',
        durationMinutes: 18,
        overallScore: 8.2,
        difficulty: 'Intermediate',
      },
      {
        id: 'int_03',
        title: 'Full Stack React & Node Pipeline',
        category: 'Technical Interview',
        completedAt: '2026-10-22T18:15:00Z',
        durationMinutes: 25,
        overallScore: 7.9,
        difficulty: 'Intermediate',
      },
      {
        id: 'int_04',
        title: 'Culture Fit & Work Ethics Assessment',
        category: 'HR Interview',
        completedAt: '2026-10-18T14:00:00Z',
        durationMinutes: 15,
        overallScore: 8.6,
        difficulty: 'Beginner',
      },
    ];

    return [...parsed, ...defaults];
  });

  const filtered = history.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <DashboardLayout
      title="Interview History & Evaluation Archive"
      subtitle="Review all your past AI mock sessions, rubric scoring breakdowns, and progress reports."
    >
      <div className="space-y-6">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 max-w-md">
              <Input
                placeholder="Search by topic, title, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="w-48">
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                options={[
                  { value: 'All', label: 'All Categories' },
                  { value: 'Technical Interview', label: 'Technical' },
                  { value: 'Behavioral Interview', label: 'Behavioral' },
                  { value: 'HR Interview', label: 'HR Interview' },
                ]}
              />
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/student/mock-interview')}
            leftIcon={<Plus className="w-4 h-4" />}
            className="w-full sm:w-auto shadow-button"
          >
            Start New Mock Session
          </Button>
        </div>

        {/* History Cards Grid */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <Card className="p-12 text-center text-[#737987]">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="text-base font-bold text-[#171923]">No interview sessions found</p>
              <p className="text-xs text-[#737987] mt-1">Try adjusting your filters or complete your first AI mock session.</p>
            </Card>
          ) : (
            filtered.map((session) => (
              <Card key={session.id} hover className="p-6 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Badge variant="primary" size="sm">{session.category}</Badge>
                      <Badge
                        variant={session.difficulty?.toLowerCase() === 'advanced' ? 'danger' : session.difficulty?.toLowerCase() === 'beginner' ? 'beginner' : 'intermediate'}
                        size="sm"
                      >
                        {session.difficulty}
                      </Badge>
                    </div>
                    <h3 className="text-base font-bold text-[#171923] hover:text-[#6655D9] transition-colors cursor-pointer" onClick={() => navigate(`/student/report/${session.id}`)}>
                      {session.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-[#737987]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(session.completedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {session.durationMinutes} minutes
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <div className="text-right">
                      <span className="text-2xl font-black text-[#6655D9]">{session.overallScore}</span>
                      <span className="text-xs text-gray-400 font-normal"> / 10</span>
                      <p className="text-[10px] text-emerald-600 font-semibold">Rubric Score</p>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/student/report/${session.id}`)}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      View Report
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};
