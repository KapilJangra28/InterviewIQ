import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import {
  HelpCircle,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  Code2,
  BookOpen,
  Sparkles
} from 'lucide-react';

export const AdminQuestionBank = () => {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [questions, setQuestions] = useState([
    {
      id: 'q_01',
      category: 'Technical Interview',
      topic: 'JavaScript Concurrency',
      difficulty: 'Intermediate',
      question: 'Can you explain the Event Loop in JavaScript and how microtasks differ from macrotasks?',
      expectedAnswer: 'Call stack, Event loop tick, Promise microtask resolution priority, macrotasks (timers, I/O).',
    },
    {
      id: 'q_02',
      category: 'Technical Interview',
      topic: 'React Architecture',
      difficulty: 'Intermediate',
      question: 'How does React reconciliation and the Virtual DOM diffing algorithm optimize UI rendering?',
      expectedAnswer: 'Heuristic diffing O(n), stable key matching, Fiber incremental work scheduling.',
    },
    {
      id: 'q_03',
      category: 'Technical Interview',
      topic: 'System Design',
      difficulty: 'Advanced',
      question: 'How would you architect a distributed rate limiter that handles 100,000 requests per second across multiple data centers?',
      expectedAnswer: 'Token bucket / Sliding window counter, Redis cluster with atomic Lua scripts, multi-region sync.',
    },
    {
      id: 'q_04',
      category: 'Behavioral Interview',
      topic: 'Conflict Resolution',
      difficulty: 'Intermediate',
      question: 'Describe a significant conflict you had with a teammate regarding a design choice. How did you resolve it?',
      expectedAnswer: 'STAR methodology, benchmark data presentation, consensus seeking, ownership.',
    },
    {
      id: 'q_05',
      category: 'HR Interview',
      topic: 'Career Vision',
      difficulty: 'Beginner',
      question: 'Where do you see yourself professionally in the next 3 to 5 years, and what skills are you prioritizing?',
      expectedAnswer: 'Technical architecture leadership, systems ownership, mentorship, business impact.',
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    category: 'Technical Interview',
    topic: '',
    difficulty: 'Intermediate',
    question: '',
    expectedAnswer: '',
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({
      category: 'Technical Interview',
      topic: '',
      difficulty: 'Intermediate',
      question: '',
      expectedAnswer: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (q) => {
    setEditingId(q.id);
    setForm(q);
    setModalOpen(true);
  };

  const handleSaveQuestion = (e) => {
    e.preventDefault();
    if (!form.question || !form.topic) return;

    if (editingId) {
      setQuestions(questions.map((q) => (q.id === editingId ? { ...form, id: editingId } : q)));
      toast.success('Question updated successfully!');
    } else {
      const newQ = { id: `q_${Date.now()}`, ...form };
      setQuestions([newQ, ...questions]);
      toast.success('New question added to Platform Question Bank!');
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
    toast.info('Question deleted from bank');
  };

  const filtered = questions.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.topic.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || q.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <DashboardLayout
      title="Question Bank Management"
      subtitle="Curate technical, behavioral, and HR questions with expected benchmark outlines."
    >
      <div className="space-y-6">
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 max-w-md">
              <Input
                placeholder="Search questions by text or topic..."
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
            onClick={handleOpenCreate}
            leftIcon={<Plus className="w-4 h-4" />}
            className="shadow-button w-full sm:w-auto"
          >
            Add New Question
          </Button>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filtered.map((item) => (
            <Card key={item.id} hover className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="primary" size="sm">{item.category}</Badge>
                    <Badge variant="outline" size="sm">{item.topic}</Badge>
                    <Badge
                      variant={item.difficulty === 'Advanced' ? 'danger' : item.difficulty === 'Beginner' ? 'beginner' : 'intermediate'}
                      size="sm"
                    >
                      {item.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 text-gray-400 hover:text-[#6655D9] rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-[#171923]">{item.question}</h3>

                <div className="p-3 rounded-xl bg-[#F8F9FC] border border-[#E8EAED] text-xs text-[#737987]">
                  <span className="font-bold text-[#171923]">Expected Rubric Outline:</span> {item.expectedAnswer}
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>

      {/* Add / Edit Question Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Question' : 'Add Question to Question Bank'}
        description="Provide difficulty rating and expected answer criteria for AI evaluators."
        size="md"
      >
        <form onSubmit={handleSaveQuestion} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              options={[
                { value: 'Technical Interview', label: 'Technical Interview' },
                { value: 'Behavioral Interview', label: 'Behavioral Interview' },
                { value: 'HR Interview', label: 'HR Interview' },
                { value: 'Company-Specific', label: 'Company-Specific' },
              ]}
            />
            <Select
              label="Difficulty"
              value={form.difficulty}
              onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
              options={[
                { value: 'Beginner', label: 'Beginner' },
                { value: 'Intermediate', label: 'Intermediate' },
                { value: 'Advanced', label: 'Advanced' },
              ]}
            />
          </div>

          <Input
            label="Specific Topic / Sub-domain"
            placeholder="e.g. React Reconciliation, Redis Distributed Locks, STAR Conflict"
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
            required
          />

          <div>
            <label className="block text-xs font-semibold text-[#171923] mb-1.5">
              Interview Question Prompt
            </label>
            <textarea
              rows={3}
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              placeholder="Formulate the prompt as spoken by the AI interviewer..."
              className="w-full text-xs p-3 border rounded-xl outline-none focus:border-[#6655D9]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#171923] mb-1.5">
              Expected Answer Outline & Scoring Benchmarks
            </label>
            <textarea
              rows={3}
              value={form.expectedAnswer}
              onChange={(e) => setForm({ ...form, expectedAnswer: e.target.value })}
              placeholder="Bullet points and criteria the candidate should touch upon..."
              className="w-full text-xs p-3 border rounded-xl outline-none focus:border-[#6655D9]"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Question
            </Button>
          </div>
        </form>
      </Modal>

    </DashboardLayout>
  );
};
