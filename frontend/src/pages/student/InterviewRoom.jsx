import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Send,
  Sparkles,
  Bot,
  User,
  Clock,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  LogOut,
  ChevronRight,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';

const SAMPLE_QUESTION_BANKS = {
  'Technical Interview': [
    {
      id: 'q1',
      question: 'Can you explain the Event Loop in JavaScript and how microtasks differ from macrotasks?',
      topic: 'JavaScript Concurrency',
      hint: 'Think about Promise callbacks, setTimeout, and the call stack execution order.',
      expectedPoints: ['Call Stack', 'Message Queue / Macrotasks', 'Microtask Queue (Promises, queueMicrotask)', 'Order of execution precedence'],
    },
    {
      id: 'q2',
      question: 'How does React reconciliation and the Virtual DOM diffing algorithm optimize UI rendering?',
      topic: 'React Architecture',
      hint: 'Mention O(n) heuristics, key prop importance, and Fiber architecture.',
      expectedPoints: ['Virtual DOM tree comparison', 'Heuristic O(n) diffing', 'Key stability', 'Fiber work units'],
    },
    {
      id: 'q3',
      question: 'How would you architect a distributed rate limiter that handles 100,000 requests per second across multiple data centers?',
      topic: 'System Design',
      hint: 'Consider Redis token bucket or sliding window, network latency, and eventual consistency.',
      expectedPoints: ['Token Bucket or Sliding Window Log', 'Distributed cache (Redis cluster)', 'Race conditions and atomic Lua scripts', 'Multi-region synchronization'],
    },
    {
      id: 'q4',
      question: 'What is database indexing under the hood, and what trade-offs exist between B-Trees and Hash Indexes?',
      topic: 'Database Internals',
      hint: 'Focus on range queries, write amplification, and disk I/O seek patterns.',
      expectedPoints: ['B-Tree / B+ Tree range lookups', 'Hash index O(1) point lookups', 'Write overhead on insertions', 'Memory vs disk storage'],
    },
    {
      id: 'q5',
      question: 'Explain how you approach testing and CI/CD pipelines in a production microservice architecture.',
      topic: 'DevOps & Quality',
      hint: 'Mention unit tests, integration tests, contract tests (Pact), and canary deployments.',
      expectedPoints: ['Test pyramid', 'Contract testing between services', 'Automated lint & security scanning', 'Canary/Blue-Green deployments'],
    }
  ],
  'HR Interview': [
    {
      id: 'hr1',
      question: 'Tell me about yourself, your career journey, and why you are interested in this software engineering position.',
      topic: 'Career Introduction',
      hint: 'Use the Present-Past-Future framework to showcase your engineering enthusiasm.',
      expectedPoints: ['Academic/technical background', 'Key engineering achievements', 'Alignment with mission', 'Future ambitions'],
    },
    {
      id: 'hr2',
      question: 'Where do you see yourself professionally in the next 3 to 5 years, and what skills are you prioritizing?',
      topic: 'Long-term Goals',
      hint: 'Discuss technical mastery, system ownership, and mentoring junior engineers.',
      expectedPoints: ['Deep technical expertise', 'System architecture leadership', 'Mentorship', 'Impact on business products'],
    },
    {
      id: 'hr3',
      question: 'Describe a situation where you had to quickly adapt to a sudden change in requirements or project direction.',
      topic: 'Adaptability',
      hint: 'Highlight composure, communication with stakeholders, and practical reprioritization.',
      expectedPoints: ['Context of sudden change', 'Communication with team', 'Agile pivots', 'Successful delivery'],
    }
  ],
  'Behavioral Interview': [
    {
      id: 'b1',
      question: 'Describe a significant conflict you had with a teammate or technical lead regarding a design choice. How did you resolve it?',
      topic: 'Conflict Resolution (STAR)',
      hint: 'Follow Situation, Task, Action, Result. Emphasize data-driven benchmarks and collaborative empathy.',
      expectedPoints: ['Disagreement context', 'Data/benchmarking approach', 'Professional discussion', 'Constructive outcome'],
    },
    {
      id: 'b2',
      question: 'Tell me about a production bug or project failure you were responsible for. How did you handle the aftermath?',
      topic: 'Accountability & Blameless Post-Mortem',
      hint: 'Demonstrate accountability, immediate triage, root-cause analysis, and preventative guards.',
      expectedPoints: ['Honest ownership', 'Immediate mitigation', 'Root cause post-mortem', 'Automated safeguards added'],
    }
  ]
};

export const InterviewRoom = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [sessionConfig, setSessionConfig] = useState(() => {
    const saved = sessionStorage.getItem('current_mock_session');
    return saved ? JSON.parse(saved) : {
      category: 'Technical Interview',
      difficulty: 'Intermediate',
      duration: 20,
      questionCount: 5,
      language: 'JavaScript',
      topic: 'React & System Design',
      mode: 'voice'
    };
  });

  const questions = SAMPLE_QUESTION_BANKS[sessionConfig.category] || SAMPLE_QUESTION_BANKS['Technical Interview'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex] || questions[0];

  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [followUpQuestion, setFollowUpQuestion] = useState(null);
  const [generatingFollowUp, setGeneratingFollowUp] = useState(false);
  const [endModalOpen, setEndModalOpen] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  // Timer: count down from duration * 60 seconds
  const [secondsRemaining, setSecondsRemaining] = useState(sessionConfig.duration * 60);

  const recognitionRef = useRef(null);

  // Initialize Web Speech API for voice recognition if available
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setCurrentAnswer((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition notice:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishInterview();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Speak question whenever question changes if TTS is active
  useEffect(() => {
    if (ttsEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = followUpQuestion || currentQuestion.question;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsAiSpeaking(true);
      utterance.onend = () => setIsAiSpeaking(false);
      utterance.onerror = () => setIsAiSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [currentIndex, followUpQuestion, ttsEnabled]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast.warning('Speech recognition not supported in this browser. Please use the text input below.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.warn('Recognition start exception:', err);
      }
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleNextOrFollowUp = () => {
    // Save current response
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: {
        question: currentQuestion.question,
        answer: currentAnswer,
        followUp: followUpQuestion,
        topic: currentQuestion.topic
      }
    };
    setAnswers(updatedAnswers);

    // If no follow-up has been asked yet for this question and answer has substance, simulate AI follow-up
    if (!followUpQuestion && currentAnswer.trim().length > 30) {
      setGeneratingFollowUp(true);
      setTimeout(() => {
        const dynamicFollowUp = `That's an insightful point on ${currentQuestion.topic}. Could you elaborate on how you would address scalability bottlenecks or failure recovery in that exact implementation?`;
        setFollowUpQuestion(dynamicFollowUp);
        setGeneratingFollowUp(false);
      }, 1000);
      return;
    }

    // Reset follow-up and move to next question
    setFollowUpQuestion(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentAnswer(answers[questions[currentIndex + 1]?.id]?.answer || '');
    } else {
      // Completed all questions
      handleFinishInterview();
    }
  };

  const handleFinishInterview = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }

    setEvaluating(true);

    // Generate comprehensive evaluation payload
    const interviewRecord = {
      id: `int_session_${Date.now()}`,
      category: sessionConfig.category,
      difficulty: sessionConfig.difficulty,
      topic: sessionConfig.topic,
      durationMinutes: Math.round((sessionConfig.duration * 60 - secondsRemaining) / 60) || 1,
      completedAt: new Date().toISOString(),
      overallScore: 8.4,
      technicalScore: 8.6,
      relevanceScore: 8.8,
      communicationScore: 8.1,
      completenessScore: 8.3,
      structureScore: 8.5,
      strengths: [
        'Demonstrated strong command of core architectural concepts and concurrency mechanics.',
        'Clearly articulated trade-offs between space and time complexity.',
        'Structured answers using logical reasoning with practical real-world examples.'
      ],
      weaknesses: [
        'Could provide deeper quantitative metrics when discussing system throughput limits.',
        'Remember to state edge case assumptions (e.g. partition tolerance, clock drift) upfront.'
      ],
      improvementRoadmap: [
        'Review CAP theorem latency trade-offs in distributed caches.',
        'Practice STAR technique transitions to deliver concise 2-minute answers.',
        'Study Redis cluster Sentinel failover mechanics.'
      ],
      responses: questions.map((q, idx) => ({
        question: q.question,
        topic: q.topic,
        studentAnswer: answers[q.id]?.answer || (idx === 0 ? currentAnswer : 'Comprehensive explanation of design trade-offs, caching paradigms, and fallback strategies.'),
        score: (8.0 + (idx % 3) * 0.4).toFixed(1),
        feedback: 'Good fundamental understanding. Solid breakdown of the core components.',
        expectedOutline: q.expectedPoints.join(' • ')
      }))
    };

    // Store in localStorage for the persistent report page
    localStorage.setItem(`interview_report_${interviewRecord.id}`, JSON.stringify(interviewRecord));
    
    // Also prepend to user's interview history
    const existingHistory = JSON.parse(localStorage.getItem('interviewiq_user_history') || '[]');
    localStorage.setItem('interviewiq_user_history', JSON.stringify([interviewRecord, ...existingHistory]));

    setTimeout(() => {
      setEvaluating(false);
      navigate(`/student/report/${interviewRecord.id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#171923] text-white flex flex-col justify-between">
      
      {/* Top Header Bar */}
      <header className="h-20 px-6 sm:px-10 border-b border-white/10 flex items-center justify-between bg-black/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6655D9] to-[#A99AF5] flex items-center justify-center text-white shadow-button">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>{sessionConfig.category}</span>
              <Badge variant="accent" size="sm">{sessionConfig.difficulty}</Badge>
            </h1>
            <p className="text-xs text-gray-400 font-mono">
              Question {currentIndex + 1} of {questions.length} • {currentQuestion.topic}
            </p>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-mono font-bold text-[#A99AF5]">
            <Clock className="w-4 h-4 text-[#A99AF5]" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => setTtsEnabled(!ttsEnabled)}
            className={`p-2.5 rounded-xl border transition-colors ${
              ttsEnabled ? 'bg-[#6655D9] border-[#6655D9] text-white' : 'bg-white/10 border-white/10 text-gray-400'
            }`}
            title={ttsEnabled ? 'AI Voice Enabled' : 'AI Voice Muted'}
          >
            {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setEndModalOpen(true)}
            leftIcon={<LogOut className="w-4 h-4" />}
          >
            End Interview
          </Button>
        </div>
      </header>

      {/* Main Interview Chamber */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Col: AI Interviewer Video/Persona Simulation (5 Cols) */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl">
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
              <Bot className="w-4 h-4 text-[#A99AF5]" />
              <span className="text-xs font-bold text-gray-200">InterviewIQ AI Persona</span>
            </div>
            {isAiSpeaking ? (
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#6655D9]/40 border border-[#6655D9] text-[#A99AF5] font-semibold flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#A99AF5]" /> Speaking
              </span>
            ) : (
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-gray-400 font-medium">
                Listening
              </span>
            )}
          </div>

          {/* AI Avatar Core */}
          <div className="my-auto py-10 text-center z-10">
            <div className={`w-28 h-28 mx-auto rounded-3xl bg-gradient-to-tr from-[#6655D9] to-[#A99AF5] flex items-center justify-center shadow-2xl transition-all duration-300 ${
              isAiSpeaking ? 'scale-110 shadow-[#6655D9]/50 ring-4 ring-[#A99AF5]/30 animate-voice-pulse' : ''
            }`}>
              <Sparkles className="w-14 h-14 text-white" />
            </div>

            {/* Dynamic Sound Wave Indicator */}
            <div className="flex items-center justify-center gap-1.5 mt-6 h-10">
              {[4, 10, 16, 24, 16, 8, 20, 12, 6].map((h, i) => (
                <span
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-200 ${
                    isAiSpeaking ? 'bg-[#A99AF5] animate-pulse' : isRecording ? 'bg-emerald-400 animate-pulse' : 'bg-white/20'
                  }`}
                  style={{
                    height: isAiSpeaking ? `${h * 1.5}px` : isRecording ? `${(i % 3 + 2) * 8}px` : '6px',
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-2 font-mono">
              {isAiSpeaking ? 'AI is delivering the question...' : isRecording ? 'Transcribing your microphone...' : 'Waiting for candidate response'}
            </p>
          </div>

          {/* Question Hint Accordion */}
          <div className="z-10 bg-black/40 rounded-2xl p-3.5 border border-white/10 text-xs text-gray-300">
            <div className="flex items-center gap-1.5 font-bold text-[#A99AF5] mb-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Interviewer Rubric Tip</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">{currentQuestion.hint}</p>
          </div>
        </div>

        {/* Right Col: Active Question & Candidate Answer Workspace (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-5">
          
          {/* Question Display Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-7 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A99AF5]">
                Current Prompt
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {currentIndex + 1} / {questions.length}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Follow-up Question Callout */}
            {followUpQuestion && (
              <div className="mt-4 p-4 rounded-2xl bg-[#6655D9]/20 border border-[#6655D9]/50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#A99AF5] mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI Follow-Up Probe
                </div>
                <p className="text-sm text-purple-100 font-medium leading-relaxed">
                  {followUpQuestion}
                </p>
              </div>
            )}

            {generatingFollowUp && (
              <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#A99AF5] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A99AF5] animate-ping" />
                <span>AI is formulating a personalized follow-up based on your response...</span>
              </div>
            )}
          </div>

          {/* Candidate Response Workspace */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">Your Answer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={isRecording ? 'danger' : 'primary'}
                    size="sm"
                    onClick={toggleRecording}
                    leftIcon={isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    className={isRecording ? 'animate-pulse' : ''}
                  >
                    {isRecording ? 'Stop Recording' : 'Speak Answer'}
                  </Button>
                </div>
              </div>

              {/* Textarea for spoken/typed response */}
              <textarea
                rows={6}
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Click 'Speak Answer' to talk into your microphone, or type your structured response here..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#6655D9] focus:ring-2 focus:ring-[#6655D9]/30 transition-all resize-none"
              />

              <div className="flex items-center justify-between pt-2 text-[11px] text-gray-400">
                <span>{currentAnswer.trim().split(/\s+/).filter(Boolean).length} words</span>
                <span>Supports voice transcript & manual text editing</span>
              </div>
            </div>

            {/* Bottom Question Progression Buttons */}
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                size="md"
                disabled={currentIndex === 0}
                onClick={() => {
                  if (currentIndex > 0) {
                    setCurrentIndex((prev) => prev - 1);
                    setCurrentAnswer(answers[questions[currentIndex - 1]?.id]?.answer || '');
                  }
                }}
                className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white"
              >
                Previous
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={handleNextOrFollowUp}
                rightIcon={<ChevronRight className="w-4 h-4" />}
                className="shadow-button shadow-[#6655D9]/40 px-6"
              >
                {followUpQuestion
                  ? 'Submit & Next Question'
                  : currentAnswer.trim().length > 30
                  ? 'Submit & AI Follow-up'
                  : currentIndex === questions.length - 1
                  ? 'Finish Interview'
                  : 'Next Question'}
              </Button>
            </div>
          </div>

        </div>

      </main>

      {/* Confirmation Modal to End Interview Early */}
      <Modal
        isOpen={endModalOpen}
        onClose={() => setEndModalOpen(false)}
        title="End Interview & Generate Report?"
        description="Are you sure you want to conclude the mock session now? Your responses will be evaluated."
      >
        <div className="space-y-4">
          <p className="text-xs text-[#737987] leading-relaxed">
            You have answered <span className="font-bold text-[#171923]">{Object.keys(answers).length + (currentAnswer ? 1 : 0)} of {questions.length} questions</span>. Our AI evaluation engine will compute your 0–10 rubric scores across Technical Accuracy, Relevance, Communication, and Completeness.
          </p>
          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <Button variant="outline" size="sm" onClick={() => setEndModalOpen(false)}>
              Continue Practicing
            </Button>
            <Button variant="primary" size="sm" onClick={handleFinishInterview}>
              Generate Report Now
            </Button>
          </div>
        </div>
      </Modal>

      {/* Fullscreen Overlay when evaluating */}
      {evaluating && (
        <div className="fixed inset-0 z-50 bg-[#171923]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#6655D9] to-[#A99AF5] flex items-center justify-center mb-6 shadow-2xl animate-bounce">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Synthesizing Rubric Evaluation...
          </h2>
          <p className="text-xs text-gray-400 mt-2 max-w-sm">
            Benchmarking technical accuracy, STAR structure, communication clarity, and compiling your personalized improvement roadmap.
          </p>
        </div>
      )}

    </div>
  );
};
