import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import {
  Mic,
  Code2,
  Users2,
  Building,
  FileText,
  Sliders,
  Sparkles,
  Clock,
  Layers,
  ArrowRight,
  Volume2
} from 'lucide-react';

export const MockInterviewConfig = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState('Technical Interview');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [duration, setDuration] = useState('20');
  const [questionCount, setQuestionCount] = useState('5');
  const [language, setLanguage] = useState('JavaScript');
  const [topic, setTopic] = useState('React, System Design & Async APIs');
  const [mode, setMode] = useState('voice'); // 'voice' | 'text'

  const categories = [
    {
      id: 'Technical Interview',
      title: 'Technical Interview',
      desc: 'Coding paradigms, system architecture, algorithms, and frameworks.',
      icon: <Code2 className="w-5 h-5 text-[#6655D9]" />,
      badge: 'Popular',
    },
    {
      id: 'HR Interview',
      title: 'HR Interview',
      desc: 'Culture fit, career trajectory, expectations, and workplace ethics.',
      icon: <Users2 className="w-5 h-5 text-emerald-600" />,
    },
    {
      id: 'Behavioral Interview',
      title: 'Behavioral Interview',
      desc: 'STAR technique responses, leadership challenges, conflict resolution.',
      icon: <Layers className="w-5 h-5 text-purple-600" />,
    },
    {
      id: 'Company-Specific Interview',
      title: 'Company-Specific',
      desc: 'Targeted rounds modeled after Google, Amazon, Microsoft, or Meta.',
      icon: <Building className="w-5 h-5 text-blue-600" />,
    },
    {
      id: 'Resume-Based Interview',
      title: 'Resume-Based',
      desc: 'Deep-dive questions grilled directly from your uploaded projects & skills.',
      icon: <FileText className="w-5 h-5 text-amber-600" />,
    },
    {
      id: 'Custom Interview',
      title: 'Custom Focus',
      desc: 'Specify custom domains, niche stacks, or custom company prompts.',
      icon: <Sliders className="w-5 h-5 text-rose-600" />,
    },
  ];

  const handleStartInterview = () => {
    // Save configuration in sessionStorage to pass to the active room
    const sessionConfig = {
      category,
      difficulty,
      duration: Number(duration),
      questionCount: Number(questionCount),
      language,
      topic,
      mode,
      startedAt: new Date().toISOString(),
    };
    sessionStorage.setItem('current_mock_session', JSON.stringify(sessionConfig));
    navigate('/student/interview-room');
  };

  return (
    <DashboardLayout
      title="Configure AI Mock Interview"
      subtitle="Select your interview category, difficulty level, and interaction mode."
    >
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Step 1: Select Category */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-[#171923]">1. Choose Interview Category</h2>
              <p className="text-xs text-[#737987]">Select the type of evaluation round you want to simulate.</p>
            </div>
            <Badge variant="primary" size="sm">Step 1 of 3</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#6655D9] ring-2 ring-[#6655D9]/20 shadow-md'
                      : 'bg-white border-[#E8EAED] hover:border-[#6655D9]/40 hover:bg-[#F8F9FC]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F4F2FF] flex items-center justify-center">
                      {cat.icon}
                    </div>
                    {cat.badge && (
                      <Badge variant="accent" size="sm">{cat.badge}</Badge>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-[#171923]">{cat.title}</h3>
                  <p className="text-xs text-[#737987] mt-1 leading-relaxed">{cat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Session Parameters */}
        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED] mb-6">
            <div>
              <h2 className="text-base font-bold text-[#171923]">2. Customize Parameters</h2>
              <p className="text-xs text-[#737987]">Tune difficulty and topics to match your target job profile.</p>
            </div>
            <Badge variant="primary" size="sm">Step 2 of 3</Badge>
          </div>

          <div className="space-y-6">
            
            {/* Difficulty Level Buttons */}
            <div>
              <label className="block text-xs font-semibold text-[#171923] mb-2">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDifficulty(lvl)}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border ${
                      difficulty === lvl
                        ? 'bg-[#6655D9] text-white border-[#6655D9] shadow-button shadow-[#6655D9]/20'
                        : 'bg-white text-[#737987] border-[#E8EAED] hover:border-[#6655D9]/40'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Selects: Duration, Question Count, Programming Language */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select
                id="duration"
                label="Target Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                options={[
                  { value: '15', label: '15 minutes (Quick)' },
                  { value: '20', label: '20 minutes (Standard)' },
                  { value: '30', label: '30 minutes (In-depth)' },
                ]}
              />

              <Select
                id="questionCount"
                label="Number of Questions"
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
                options={[
                  { value: '3', label: '3 Questions (Sprint)' },
                  { value: '5', label: '5 Questions (Standard)' },
                  { value: '8', label: '8 Questions (Comprehensive)' },
                ]}
              />

              <Select
                id="language"
                label="Primary Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                options={[
                  { value: 'JavaScript', label: 'JavaScript' },
                  { value: 'TypeScript', label: 'TypeScript' },
                  { value: 'Python', label: 'Python' },
                  { value: 'Java', label: 'Java' },
                  { value: 'C++', label: 'C++' },
                  { value: 'Go', label: 'Go' },
                ]}
              />
            </div>

            {/* Topic Specification */}
            <Input
              id="topic"
              label="Focus Topics / Specialization"
              placeholder="e.g. React hooks, distributed caching, GraphQL, STAR leadership"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              helperText="The AI will weave these specific domains into questions and follow-ups."
            />

          </div>
        </Card>

        {/* Step 3: Interaction Mode (Voice vs Text) */}
        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED] mb-6">
            <div>
              <h2 className="text-base font-bold text-[#171923]">3. Interaction Mode</h2>
              <p className="text-xs text-[#737987]">Choose how you will communicate with the AI interviewer.</p>
            </div>
            <Badge variant="primary" size="sm">Step 3 of 3</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setMode('voice')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                mode === 'voice'
                  ? 'bg-[#F4F2FF] border-[#6655D9] ring-2 ring-[#6655D9]/20 shadow-sm'
                  : 'bg-white border-[#E8EAED] hover:border-[#6655D9]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-white text-[#6655D9] flex items-center justify-center shadow-sm">
                  <Mic className="w-5 h-5" />
                </div>
                <Badge variant="primary" size="sm">Recommended</Badge>
              </div>
              <h3 className="text-sm font-bold text-[#171923]">Voice Mode (Speech-to-Text & TTS)</h3>
              <p className="text-xs text-[#737987] mt-1 leading-relaxed">
                The AI speaks the questions aloud and transcribes your microphone input in real-time, simulating a true phone/video screen.
              </p>
            </div>

            <div
              onClick={() => setMode('text')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                mode === 'text'
                  ? 'bg-[#F4F2FF] border-[#6655D9] ring-2 ring-[#6655D9]/20 shadow-sm'
                  : 'bg-white border-[#E8EAED] hover:border-[#6655D9]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-white text-[#6655D9] flex items-center justify-center shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-[#171923]">Text Mode (Written Form)</h3>
              <p className="text-xs text-[#737987] mt-1 leading-relaxed">
                Ideal for quiet environments or practicing structured written system design and technical explanations.
              </p>
            </div>
          </div>
        </Card>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-4 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={handleStartInterview}
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="w-full sm:w-auto px-10 py-4 shadow-button shadow-[#6655D9]/30 text-base"
          >
            Launch AI Mock Room
          </Button>
        </div>

      </div>
    </DashboardLayout>
  );
};
