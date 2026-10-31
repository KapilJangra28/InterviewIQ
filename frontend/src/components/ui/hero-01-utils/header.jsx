import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Sparkles,
  Menu,
  X,
  LayoutDashboard,
  User,
  LogOut,
  ChevronDown,
  Building2,
  GraduationCap
} from 'lucide-react';

export const NavigationSection = {};

export default function Header({ navigationData = [] }) {
  const { user, logout, isStudent, isCompany, isAdmin, loginAsDemo } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const getDashboardLink = () => {
    if (isAdmin) return '/admin/dashboard';
    if (isCompany) return '/company/dashboard';
    return '/student/dashboard';
  };

  const defaultNav = [
    { title: 'Home', href: '/', isActive: true },
    { title: 'AI Mock Tests', href: isStudent ? '/student/mock-interview' : '/login' },
    { title: 'Explore Jobs', href: isStudent ? '/student/jobs' : '/jobs' },
    { title: 'For Recruiters', href: '/register/company' },
    { title: 'Learning Roadmap', href: isStudent ? '/student/roadmap' : '/login' },
  ];

  const navItems = navigationData.length > 0 ? navigationData : defaultNav;

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 flex items-center justify-between border border-[#E8EAED]/80 shadow-glass">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6655D9] to-[#A99AF5] flex items-center justify-center text-white shadow-button group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-[#171923] group-hover:text-[#6655D9] transition-colors leading-none">
                Interview<span className="text-[#6655D9]">IQ</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#737987] mt-0.5">
                AI RECRUITMENT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F8F9FC]/80 px-3 py-1.5 rounded-full border border-[#E8EAED]/60">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all ${
                  item.isActive
                    ? 'bg-white text-[#6655D9] shadow-sm font-bold'
                    : 'text-[#737987] hover:text-[#171923] hover:bg-white/60'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center gap-2.5">
            {!user ? (
              <>
                {/* Demo Switcher Pill */}
                <div className="hidden xl:flex items-center bg-[#F8F9FC] p-1 rounded-full border border-gray-200/80 text-[11px] text-[#737987]">
                  <span className="px-2 font-medium">Demo:</span>
                  <button
                    onClick={() => { loginAsDemo('student'); navigate('/student/dashboard'); }}
                    className="px-2.5 py-0.5 bg-white hover:bg-[#F4F2FF] hover:text-[#6655D9] rounded-full shadow-xs font-bold text-gray-700 transition-colors"
                  >
                    Student
                  </button>
                  <button
                    onClick={() => { loginAsDemo('company'); navigate('/company/dashboard'); }}
                    className="px-2.5 py-0.5 bg-white hover:bg-[#F4F2FF] hover:text-[#6655D9] rounded-full shadow-xs font-bold text-gray-700 transition-colors"
                  >
                    Recruiter
                  </button>
                  <button
                    onClick={() => { loginAsDemo('admin'); navigate('/admin/dashboard'); }}
                    className="px-2.5 py-0.5 bg-white hover:bg-[#F4F2FF] hover:text-[#6655D9] rounded-full shadow-xs font-bold text-gray-700 transition-colors"
                  >
                    Admin
                  </button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="rounded-full px-4 text-xs font-bold"
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                  rightIcon={<Sparkles className="w-3.5 h-3.5" />}
                  className="rounded-full px-5 text-xs font-bold shadow-button"
                >
                  Get Started
                </Button>
              </>
            ) : (
              <div className="relative">
                <div className="flex items-center gap-2.5">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(getDashboardLink())}
                    leftIcon={<LayoutDashboard className="w-3.5 h-3.5" />}
                    className="rounded-full px-4 text-xs font-bold"
                  >
                    Portal Dashboard
                  </Button>

                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100/80 transition-all border border-gray-200"
                  >
                    <img
                      src={user.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-[#6655D9]/20"
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 mr-1" />
                  </button>
                </div>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl glass-dropdown p-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-[#171923] truncate">{user.name}</p>
                      <p className="text-[11px] text-[#737987] truncate">{user.email}</p>
                      <div className="mt-1">
                        <Badge variant="primary" size="sm">
                          {user.role?.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="py-1">
                      <Link
                        to={getDashboardLink()}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-[#6655D9] hover:bg-[#F4F2FF] rounded-xl"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                    </div>
                    <div className="pt-1 border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-black rounded-full hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 glass-panel rounded-2xl p-4 border border-[#E8EAED] space-y-3">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#171923] hover:bg-[#F4F2FF] hover:text-[#6655D9]"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            <div className="pt-2 border-t border-gray-200 flex flex-col gap-2">
              {!user ? (
                <>
                  <Button
                    variant="outline"
                    className="w-full justify-center rounded-xl"
                    onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="primary"
                    className="w-full justify-center rounded-xl"
                    onClick={() => { setMobileMenuOpen(false); navigate('/register'); }}
                  >
                    Register as Candidate
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full justify-center rounded-xl"
                    onClick={() => { setMobileMenuOpen(false); navigate('/register/company'); }}
                  >
                    Register as Recruiter
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  className="w-full justify-center rounded-xl"
                  onClick={() => { setMobileMenuOpen(false); navigate(getDashboardLink()); }}
                >
                  Open Dashboard
                </Button>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
