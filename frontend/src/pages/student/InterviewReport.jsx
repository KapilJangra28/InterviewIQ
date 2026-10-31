import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import {
  Award,
  Sparkles,
  Download,
  Share2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileText,
  Printer,
  ChevronLeft,
  Target,
  Compass
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

export const InterviewReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(() => {
    // Try finding specific report in localStorage
    const saved = localStorage.getItem(`interview_report_${id}`);
    if (saved) return JSON.parse(saved);

    // Fallback default report for demonstration
    return {
      id: id || 'int_sample_01',
      category: 'Technical Interview',
      difficulty: 'Intermediate',
      topic: 'React & System Architecture',
      durationMinutes: 22,
      completedAt: new Date().toISOString(),
      overallScore: 8.6,
      technicalScore: 8.9,
      relevanceScore: 8.7,
      communicationScore: 8.3,
      completenessScore: 8.5,
      structureScore: 8.6,
      strengths: [
        'Exemplary conceptual clarity when explaining the JavaScript Event Loop, microtasks, and macrotasks.',
        'Demonstrated solid systems thinking regarding distributed caching and cache invalidation strategies.',
        'Structured problem-solving approach with proactive mention of latency and throughput trade-offs.'
      ],
      weaknesses: [
        'Could include more concrete mathematical calculations when estimating QPS and bandwidth limits.',
        'Slight tendency to rush initial explanations before establishing scope boundaries.'
      ],
      improvementRoadmap: [
        'Deepen understanding of Raft / Paxos consensus protocols in distributed data layers.',
        'Practice STAR behavioral transition techniques to keep answers under 2 minutes.',
        'Explore Redis cluster hash slot partitioning to handle multi-master failover.'
      ],
      responses: [
        {
          question: 'Can you explain the Event Loop in JavaScript and how microtasks differ from macrotasks?',
          topic: 'JavaScript Concurrency',
          studentAnswer: 'The Event Loop coordinates the execution of code, collecting and processing events, and executing queued sub-tasks. Microtasks (like resolved Promises and queueMicrotask) have higher priority than macrotasks (like setTimeout and setInterval) and are executed immediately after each task completes before rendering.',
          score: 9.2,
          feedback: 'Exceptional response. Accurately detailed call stack precedence and rendering loop mechanics.',
          expectedOutline: 'Call Stack • Microtask Queue (Promise callbacks) • Macrotask Queue (Timers, I/O) • Execution loop order'
        },
        {
          question: 'How would you architect a distributed rate limiter that handles 100,000 requests per second across multiple data centers?',
          topic: 'System Design',
          studentAnswer: 'I would deploy Redis clusters in each region utilizing a sliding window counter or token bucket algorithm executed via atomic Lua scripts to prevent race conditions. Edge CDNs like Cloudflare can perform initial tier filtering, and asynchronous cross-region syncing ensures sync without blocking user request threads.',
          score: 8.8,
          feedback: 'Strong grasp of atomic operations with Redis Lua. Good distinction between edge vs origin filtering.',
          expectedOutline: 'Token Bucket or Sliding Window • Redis Cluster with Lua scripts • Edge rate limiting • Multi-region eventual sync'
        },
        {
          question: 'Explain how you approach testing and CI/CD pipelines in a production microservice architecture.',
          topic: 'DevOps & Quality',
          studentAnswer: 'I follow the test pyramid: fast unit tests for business logic, contract testing with tools like Pact between microservices, and targeted integration tests. In CI/CD, we enforce PR linting, security scanning, and automated canary deployments with metrics monitoring.',
          score: 8.4,
          feedback: 'Great mention of contract testing which is crucial for microservices. Solid delivery.',
          expectedOutline: 'Unit Tests • Consumer-driven contract testing • Automated SAST/DAST • Canary deployments'
        }
      ]
    };
  });

  const radarData = [
    { subject: 'Technical Accuracy', score: report.technicalScore * 10, fullMark: 100 },
    { subject: 'Relevance', score: report.relevanceScore * 10, fullMark: 100 },
    { subject: 'Communication', score: report.communicationScore * 10, fullMark: 100 },
    { subject: 'Completeness', score: report.completenessScore * 10, fullMark: 100 },
    { subject: 'Structure', score: report.structureScore * 10, fullMark: 100 },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout
      title="AI Performance & Evaluation Report"
      subtitle={`Session ID: ${report.id} • Completed on ${new Date(report.completedAt).toLocaleDateString()}`}
    >
      <div className="space-y-8 max-w-5xl mx-auto">
        
        {/* Navigation & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/student/history')}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
          >
            Back to History
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrint}
              leftIcon={<Printer className="w-4 h-4" />}
            >
              Print / Save PDF Report
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/student/roadmap')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View Updated Roadmap
            </Button>
          </div>
        </div>

        {/* Hero Score Overview Card */}
        <Card className="p-6 sm:p-8 bg-gradient-to-br from-white to-[#F4F2FF]/40 border-[#6655D9]/20 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            {/* Left Score Gauge */}
            <div className="text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-[#E8EAED] pb-6 md:pb-0 md:pr-6">
              <Badge variant="primary" size="sm">{report.category}</Badge>
              <h2 className="text-2xl font-extrabold text-[#171923] tracking-tight">
                Overall Performance
              </h2>
              <div className="flex items-baseline justify-center md:justify-start gap-2 pt-2">
                <span className="text-5xl sm:text-6xl font-black text-[#6655D9]">
                  {report.overallScore}
                </span>
                <span className="text-xl text-[#737987] font-bold">/ 10</span>
              </div>
              <p className="text-xs text-emerald-600 font-semibold flex items-center justify-center md:justify-start gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> High Placement Readiness
              </p>
            </div>

            {/* Middle: Radar Chart */}
            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#E8EAED" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#737987' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Candidate" dataKey="score" stroke="#6655D9" fill="#6655D9" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Right: Dimension Scores */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#171923]">Technical Accuracy</span>
                <span className="font-bold text-[#6655D9]">{report.technicalScore}/10</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#171923]">Relevance & Precision</span>
                <span className="font-bold text-[#6655D9]">{report.relevanceScore}/10</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#171923]">Communication Clarity</span>
                <span className="font-bold text-[#6655D9]">{report.communicationScore}/10</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#171923]">Completeness of Solution</span>
                <span className="font-bold text-[#6655D9]">{report.completenessScore}/10</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#171923]">STAR / Answer Structure</span>
                <span className="font-bold text-[#6655D9]">{report.structureScore}/10</span>
              </div>
            </div>

          </div>
        </Card>

        {/* Strengths & Weaknesses 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Key Strengths */}
          <Card className="p-6 border-emerald-200/60 bg-emerald-50/20">
            <div className="flex items-center gap-2.5 pb-4 border-b border-emerald-100">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#171923]">Identified Strengths</h3>
            </div>
            <ul className="space-y-3 mt-4">
              {report.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-800 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Growth Opportunities */}
          <Card className="p-6 border-amber-200/60 bg-amber-50/20">
            <div className="flex items-center gap-2.5 pb-4 border-b border-amber-100">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#171923]">Target Growth Areas</h3>
            </div>
            <ul className="space-y-3 mt-4">
              {report.weaknesses.map((w, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-800 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </Card>

        </div>

        {/* Question-by-Question Deep Dive */}
        <Card className="p-6 sm:p-8">
          <div className="pb-4 border-b border-[#E8EAED] mb-6">
            <CardTitle>Question-Wise Rubric Breakdown</CardTitle>
            <p className="text-xs text-[#737987] mt-0.5">
              Review your submitted answers alongside AI evaluator feedback and ideal outline benchmarks.
            </p>
          </div>

          <div className="space-y-6">
            {report.responses.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#F8F9FC] border border-[#E8EAED] space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#6655D9] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-[#171923]">{item.question}</h4>
                  </div>
                  <Badge variant="primary" size="sm" className="shrink-0">
                    Score: {item.score}/10
                  </Badge>
                </div>

                {/* Candidate Answer */}
                <div className="p-3 bg-white rounded-xl border border-gray-200/80">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#737987] mb-1">Your Response:</p>
                  <p className="text-xs text-gray-800 leading-relaxed italic">
                    "{item.studentAnswer}"
                  </p>
                </div>

                {/* Evaluator Feedback */}
                <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#6655D9] mb-1">AI Evaluator Feedback:</p>
                  <p className="text-xs text-purple-950 leading-relaxed">
                    {item.feedback}
                  </p>
                </div>

                {/* Model Outline Benchmark */}
                <div className="text-[11px] text-[#737987]">
                  <span className="font-bold text-gray-700">Ideal Answer Outline:</span> {item.expectedOutline}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Personalized Improvement Roadmap Card */}
        <Card className="p-6 sm:p-8 bg-[#F4F2FF]/50 border-[#6655D9]/20">
          <div className="flex items-center justify-between pb-4 border-b border-[#6655D9]/10 mb-4">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-[#6655D9]" />
              <CardTitle>Personalized Improvement Roadmap</CardTitle>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/student/roadmap')}
            >
              Open Full Roadmap
            </Button>
          </div>

          <p className="text-xs text-[#737987] mb-4">
            Generated directly from your performance gaps in this session to accelerate your readiness.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {report.improvementRoadmap.map((task, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-[#E8EAED] space-y-1">
                <span className="text-[10px] font-bold text-[#6655D9] uppercase tracking-wider">Milestone {idx + 1}</span>
                <p className="text-xs font-semibold text-[#171923]">{task}</p>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
};
