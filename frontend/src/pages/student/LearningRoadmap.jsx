import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Compass,
  CheckCircle2,
  Circle,
  Sparkles,
  Calendar,
  Target,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Mic
} from 'lucide-react';

export const LearningRoadmap = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([
    {
      id: 't1',
      day: 'Day 1 (Today)',
      title: 'Distributed System Concurrency & Redis Lua Scripts',
      topic: 'System Design',
      type: 'Technical Drill',
      duration: '25 mins',
      completed: true,
      weaknessOrigin: 'Identified in Mock #5 (Race condition handling)',
    },
    {
      id: 't2',
      day: 'Day 2 (Tomorrow)',
      title: 'STAR Method: Resolving Senior Architectural Deadlocks',
      topic: 'Behavioral',
      type: 'Verbal Practice',
      duration: '20 mins',
      completed: false,
      weaknessOrigin: 'Identified in Behavioral Mock #2 (Conciseness)',
    },
    {
      id: 't3',
      day: 'Day 3',
      title: 'Database B+ Tree Indexing & Range Scan Optimization',
      topic: 'Databases',
      type: 'Code Exercise',
      duration: '30 mins',
      completed: false,
      weaknessOrigin: 'Identified in Technical Mock #1 (Index selection)',
    },
    {
      id: 't4',
      day: 'Day 4',
      title: 'Multi-Region Eventual Consistency & CAP Trade-offs',
      topic: 'Distributed Systems',
      type: 'Architecture Review',
      duration: '35 mins',
      completed: false,
      weaknessOrigin: 'Identified in System Design Session',
    },
    {
      id: 't5',
      day: 'Day 5',
      title: 'Full 30-min AI Mock Simulation: Senior Backend Round',
      topic: 'Comprehensive',
      type: 'Live AI Simulation',
      duration: '30 mins',
      completed: false,
      weaknessOrigin: 'Weekly Milestone Assessment',
    },
  ]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <DashboardLayout
      title="Personalized AI Learning Roadmap"
      subtitle="Tailored study plan synthesized from your mock interview evaluation gaps."
    >
      <div className="space-y-8 max-w-5xl mx-auto">
        
        {/* Progress Header Card */}
        <Card className="p-6 sm:p-8 bg-gradient-to-r from-white to-[#F4F2FF]/60 border-[#6655D9]/20 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <Badge variant="primary" size="sm">Active Study Track</Badge>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#171923] tracking-tight">
                Senior Full Stack & Distributed Systems Track
              </h2>
              <p className="text-xs text-[#737987] leading-relaxed">
                This roadmap dynamically updates after every mock interview. Focus on the high-yield weak areas to maximize placement conversion.
              </p>
            </div>

            <div className="w-full sm:w-48 text-right shrink-0">
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-xs font-bold text-[#737987]">Sprint Progress</span>
                <span className="text-xl font-extrabold text-[#6655D9]">{progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#6655D9] h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-[#737987] mt-1">
                {completedCount} of {tasks.length} tasks completed
              </p>
            </div>
          </div>
        </Card>

        {/* 2-Column: Identified Weaknesses & Weekly Goals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Card className="p-6 border-rose-200/60 bg-rose-50/20">
            <div className="flex items-center gap-2 pb-3 border-b border-rose-100 mb-3">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-900">Priority Weak Topics</h3>
            </div>
            <ul className="space-y-2 text-xs text-rose-950">
              <li className="font-semibold">• Multi-region Redis Cache Partitioning</li>
              <li className="font-semibold">• Quantitative Estimation (QPS & I/O)</li>
              <li className="font-semibold">• STAR Story Compression under 90s</li>
            </ul>
          </Card>

          <Card className="p-6 border-emerald-200/60 bg-emerald-50/20">
            <div className="flex items-center gap-2 pb-3 border-b border-emerald-100 mb-3">
              <Target className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900">Sprint Goal</h3>
            </div>
            <p className="text-xs text-emerald-950 font-medium leading-relaxed">
              Achieve an 8.8+ rubric score on Advanced System Design and secure shortlisting for TechPulse Cloud Solutions.
            </p>
          </Card>

          <Card className="p-6 border-[#6655D9]/20 bg-[#F4F2FF]/40">
            <div className="flex items-center gap-2 pb-3 border-b border-[#6655D9]/10 mb-3">
              <Sparkles className="w-4 h-4 text-[#6655D9]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6655D9]">Practice Drill</h3>
            </div>
            <p className="text-xs text-purple-950 font-medium leading-relaxed mb-3">
              Ready to test today's topic with the AI interviewer?
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/student/mock-interview')}
              leftIcon={<Mic className="w-3.5 h-3.5" />}
              className="w-full text-xs"
            >
              Start Focus Mock
            </Button>
          </Card>

        </div>

        {/* Daily Schedule List */}
        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED] mb-6">
            <div>
              <CardTitle>Daily Task Roadmap</CardTitle>
              <p className="text-xs text-[#737987] mt-0.5">Click any task checkbox to record your progress.</p>
            </div>
            <Badge variant="primary" size="sm">5-Day Action Plan</Badge>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  task.completed
                    ? 'bg-emerald-50/40 border-emerald-200/80 opacity-80'
                    : 'bg-white border-[#E8EAED] hover:border-[#6655D9]/40 hover:shadow-sm'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-gray-400 hover:text-[#6655D9] transition-colors"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#6655D9]">{task.day}</span>
                    <Badge variant="outline" size="sm">{task.topic}</Badge>
                    <span className="text-[11px] text-[#737987]">• {task.duration}</span>
                  </div>
                  <h4 className={`text-sm font-bold ${task.completed ? 'line-through text-gray-500' : 'text-[#171923]'}`}>
                    {task.title}
                  </h4>
                  <p className="text-xs text-[#737987] mt-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#A99AF5] shrink-0" />
                    <span>{task.weaknessOrigin}</span>
                  </p>
                </div>

                <Button
                  variant={task.completed ? 'outline' : 'secondary'}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/student/mock-interview');
                  }}
                  className="hidden sm:inline-flex shrink-0"
                >
                  Practice Now
                </Button>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
};
