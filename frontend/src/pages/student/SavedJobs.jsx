import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Bookmark, BookmarkCheck, ArrowRight, Briefcase, Trash2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const SavedJobs = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [savedJobs, setSavedJobs] = useState([
    {
      id: 'job_101',
      title: 'Full Stack AI Engineer',
      company: 'TechPulse Cloud Solutions',
      location: 'Bengaluru / Remote',
      salary: '$30,000 – $45,000 / yr',
      skills: ['React.js', 'Node.js', 'Python', 'Docker'],
      matchScore: 92,
    },
    {
      id: 'job_103',
      title: 'Frontend UI/UX Platform Architect',
      company: 'CloudMatrix Digital',
      location: 'Remote',
      salary: '$35,000 – $50,000 / yr',
      skills: ['React.js', 'TypeScript', 'Tailwind CSS'],
      matchScore: 95,
    }
  ]);

  const handleRemove = (id) => {
    setSavedJobs(savedJobs.filter((j) => j.id !== id));
    toast.info('Job removed from saved bookmarks');
  };

  return (
    <DashboardLayout
      title="Saved Jobs & Bookmarks"
      subtitle="Quick access to opportunities you have bookmarked for later review."
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {savedJobs.length === 0 ? (
          <Card className="p-12 text-center text-[#737987]">
            <Bookmark className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <h3 className="text-base font-bold text-[#171923]">No Saved Jobs Yet</h3>
            <p className="text-xs text-[#737987] mt-1 mb-4">Explore verified openings and bookmark your top picks.</p>
            <Button variant="primary" size="sm" onClick={() => navigate('/student/jobs')}>
              Browse Jobs Now
            </Button>
          </Card>
        ) : (
          savedJobs.map((job) => (
            <Card key={job.id} hover className="p-6 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-[#171923] hover:text-[#6655D9] transition-colors cursor-pointer" onClick={() => navigate('/student/jobs')}>
                    {job.title}
                  </h3>
                  <Badge variant="success" size="sm">{job.matchScore}% Match</Badge>
                </div>
                <p className="text-xs text-[#737987]">{job.company} • {job.location} • {job.salary}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {job.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-lg bg-gray-100 text-[10px] text-gray-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => handleRemove(job.id)} className="text-gray-400 hover:text-rose-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button variant="primary" size="sm" onClick={() => navigate('/student/jobs')}>
                  Apply
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};
