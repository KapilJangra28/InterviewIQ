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
  Calendar,
  Clock,
  Video,
  Plus,
  User,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Mail
} from 'lucide-react';

export const InterviewScheduling = () => {
  const toast = useToast();

  const [interviews, setInterviews] = useState([
    {
      id: 'int_sched_01',
      candidateName: 'Rohan Verma',
      candidateEmail: 'rohan.verma@example.com',
      jobTitle: 'Frontend UI/UX Platform Architect',
      date: '2026-11-04',
      time: '14:30',
      type: 'Technical Round 1 (Live Code & Architecture)',
      interviewer: 'Sarah Jenkins & Lead UI Architect',
      meetingUrl: 'https://meet.interviewiq.io/room/frontend-arch-01',
      status: 'Confirmed',
    },
    {
      id: 'int_sched_02',
      candidateName: 'Aarav Sharma',
      candidateEmail: 'aarav.sharma@example.edu',
      jobTitle: 'Full Stack AI Engineer',
      date: '2026-11-05',
      time: '16:00',
      type: 'AI System Design Screening',
      interviewer: 'Engineering Director',
      meetingUrl: 'https://meet.interviewiq.io/room/ai-system-02',
      status: 'Confirmed',
    },
    {
      id: 'int_sched_03',
      candidateName: 'Priya Patel',
      candidateEmail: 'priya.patel@example.com',
      jobTitle: 'Full Stack AI Engineer',
      date: '2026-11-08',
      time: '11:00',
      type: 'Preliminary HR & Culture Round',
      interviewer: 'Talent Acquisition Team',
      meetingUrl: 'https://meet.interviewiq.io/room/culture-03',
      status: 'Pending Confirmation',
    }
  ]);

  const [newModalOpen, setNewModalOpen] = useState(false);
  const [form, setForm] = useState({
    candidateName: '',
    candidateEmail: '',
    jobTitle: 'Full Stack AI Engineer',
    date: '2026-11-07',
    time: '15:00',
    type: 'Technical Deep-Dive',
  });

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    if (!form.candidateName || !form.candidateEmail) return;

    const newEntry = {
      id: `int_sched_${Date.now()}`,
      ...form,
      interviewer: 'Hiring Team',
      meetingUrl: `https://meet.interviewiq.io/room/${Date.now().toString(36)}`,
      status: 'Confirmed',
    };

    setInterviews([newEntry, ...interviews]);
    setNewModalOpen(false);
    toast.success(`Interview scheduled and invitation sent to ${form.candidateEmail}!`);
    setForm({
      candidateName: '',
      candidateEmail: '',
      jobTitle: 'Full Stack AI Engineer',
      date: '2026-11-07',
      time: '15:00',
      type: 'Technical Deep-Dive',
    });
  };

  const handleCancel = (id) => {
    setInterviews(interviews.filter((i) => i.id !== id));
    toast.info('Interview schedule cancelled and notification sent.');
  };

  return (
    <DashboardLayout
      title="Recruitment Interview Schedules"
      subtitle="Coordinate dates, time slots, and meeting invitations with shortlisted talent."
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        
        {/* Top Action Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#171923]">Upcoming Recruitment Rounds</h2>
            <p className="text-xs text-[#737987]">{interviews.length} sessions scheduled</p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => setNewModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
            className="shadow-button"
          >
            Schedule New Session
          </Button>
        </div>

        {/* Schedules Cards */}
        <div className="space-y-4">
          {interviews.map((item) => (
            <Card key={item.id} hover className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={item.status === 'Confirmed' ? 'success' : 'pending'} size="sm" dot>
                      {item.status}
                    </Badge>
                    <Badge variant="outline" size="sm">{item.jobTitle}</Badge>
                  </div>

                  <h3 className="text-base font-bold text-[#171923]">{item.candidateName}</h3>
                  <p className="text-xs text-[#737987] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> {item.candidateEmail} • <span className="font-semibold text-gray-800">{item.type}</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#6655D9] font-semibold pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {item.time} (IST)
                    </span>
                    <span className="text-[#737987] font-normal">
                      Interviewer: {item.interviewer}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100 shrink-0">
                  <a
                    href={item.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#6655D9] text-white hover:bg-[#5542C6] transition-colors shadow-button"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Meeting</span>
                  </a>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCancel(item.id)}
                    className="text-rose-600 hover:bg-rose-50"
                  >
                    Cancel
                  </Button>
                </div>

              </div>
            </Card>
          ))}
        </div>

      </div>

      {/* New Schedule Modal */}
      <Modal
        isOpen={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        title="Schedule Candidate Interview"
        description="Select candidate, position, and meeting time slot."
        size="md"
      >
        <form onSubmit={handleCreateSchedule} className="space-y-4">
          <Input
            label="Candidate Full Name"
            placeholder="e.g. Aarav Sharma"
            value={form.candidateName}
            onChange={(e) => setForm({ ...form, candidateName: e.target.value })}
            required
          />

          <Input
            label="Candidate Official Email"
            type="email"
            placeholder="candidate@example.edu"
            value={form.candidateEmail}
            onChange={(e) => setForm({ ...form, candidateEmail: e.target.value })}
            required
          />

          <Select
            label="Target Job Opening"
            value={form.jobTitle}
            onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
            options={[
              { value: 'Full Stack AI Engineer', label: 'Full Stack AI Engineer' },
              { value: 'Frontend UI/UX Platform Architect', label: 'Frontend UI/UX Platform Architect' },
              { value: 'Backend Distributed Systems Engineer', label: 'Backend Distributed Systems Engineer' },
            ]}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Interview Date"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
            <Input
              label="Meeting Time"
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              required
            />
          </div>

          <Input
            label="Interview Round Type"
            placeholder="e.g. Technical Round 1, System Design, or Culture Fit"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <Button variant="outline" size="sm" onClick={() => setNewModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Confirm & Dispatch Invitation
            </Button>
          </div>
        </form>
      </Modal>

    </DashboardLayout>
  );
};
