import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../ui/Badge';
import {
  Menu,
  Bell,
  Sparkles,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardLayout = ({ children, title, subtitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, isStudent, isCompany, isAdmin } = useAuth();

  // Mock Notifications for rich interactive dashboard experience
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Interview Evaluation Ready',
      message: 'Your Technical System Design mock interview scored 8.6/10. View your detailed breakdown.',
      time: '15m ago',
      type: 'interview',
      read: false,
    },
    {
      id: 2,
      title: 'Application Shortlisted',
      message: 'TechPulse Cloud Solutions shortlisted your profile for Full Stack AI Engineer.',
      time: '2h ago',
      type: 'application',
      read: false,
    },
    {
      id: 3,
      title: 'Company Verification Status',
      message: 'Your recruiter credentials have been verified by Platform Admin.',
      time: '1d ago',
      type: 'admin',
      read: true,
    }
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-20 bg-white/90 backdrop-blur-md border-b border-[#E8EAED] px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-black rounded-xl hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#171923] tracking-tight">
                {title || 'Dashboard'}
              </h1>
              {subtitle && (
                <p className="text-xs text-[#737987] hidden sm:block">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            
            {/* Quick Link to Landing */}
            <Link
              to="/"
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-[#737987] hover:text-[#6655D9] px-3 py-1.5 rounded-xl border border-[#E8EAED] bg-white transition-colors"
            >
              <span>Main Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 rounded-xl border border-[#E8EAED] bg-white text-gray-600 hover:text-[#6655D9] hover:border-[#6655D9]/40 transition-colors shadow-sm"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#6655D9] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Drawer Popover */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl glass-dropdown p-4 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#171923]">Notifications</h4>
                      <Badge variant="primary" size="sm">
                        {unreadCount} new
                      </Badge>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-[11px] font-semibold text-[#6655D9] hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="py-2 space-y-2 max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 rounded-xl border transition-all ${
                          n.read
                            ? 'bg-white border-gray-100 opacity-70'
                            : 'bg-[#F4F2FF]/60 border-[#6655D9]/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-[#171923]">{n.title}</p>
                          <span className="text-[10px] text-[#737987] shrink-0">{n.time}</span>
                        </div>
                        <p className="text-xs text-[#737987] mt-1 leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Mini Badge */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
              <img
                src={user?.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`}
                alt={user?.name}
                className="w-9 h-9 rounded-xl object-cover ring-2 ring-[#6655D9]/20"
              />
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-[#171923]">{user?.name?.split(' ')[0]}</p>
                <p className="text-[10px] text-[#6655D9] font-medium capitalize">{user?.role}</p>
              </div>
            </div>

          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
