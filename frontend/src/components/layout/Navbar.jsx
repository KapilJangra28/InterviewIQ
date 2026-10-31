import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  Sparkles,
  Briefcase,
  BookOpen,
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  Building2,
  GraduationCap
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout, isStudent, isCompany, isAdmin, loginAsDemo } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getDashboardLink = () => {
    if (isAdmin) return '/admin/dashboard';
    if (isCompany) return '/company/dashboard';
    return '/student/dashboard';
  };

  const navLinks = [
    { label: 'AI Mock Interviews', path: isStudent ? '/student/mock-interview' : '/login' },
    { label: 'Explore Jobs', path: isStudent ? '/student/jobs' : '/jobs' },
    { label: 'For Recruiters', path: '/register/company' },
    { label: 'Learning Roadmap', path: isStudent ? '/student/roadmap' : '/login' },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-[#E8EAED]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#6655D9] to-[#A99AF5] flex items-center justify-center text-white shadow-button group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-[#171923] group-hover:text-[#6655D9] transition-colors">
                  Interview<span className="text-[#6655D9]">IQ</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F4F2FF] text-[#6655D9] border border-[#6655D9]/20">
                  AI 2.0
                </span>
              </div>
              <span className="text-[10px] font-medium text-[#737987] -mt-0.5 tracking-tight hidden sm:block">
                Practice. Prepare. Perform. Get Hired.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-sm font-medium px-3.5 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'text-[#6655D9] bg-[#F4F2FF] font-semibold'
                      : 'text-[#737987] hover:text-[#171923] hover:bg-gray-100/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Demo Switcher when not logged in or for testing */}
            {!user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-gray-100/80 p-1 rounded-xl border border-gray-200/80 text-xs text-[#737987]">
                  <span className="px-2 font-medium">Demo as:</span>
                  <button
                    onClick={() => { loginAsDemo('student'); navigate('/student/dashboard'); }}
                    className="px-2 py-1 bg-white hover:bg-[#F4F2FF] hover:text-[#6655D9] rounded-lg shadow-sm font-semibold text-gray-700 transition-colors"
                  >
                    Student
                  </button>
                  <button
                    onClick={() => { loginAsDemo('company'); navigate('/company/dashboard'); }}
                    className="px-2 py-1 bg-white hover:bg-[#F4F2FF] hover:text-[#6655D9] rounded-lg shadow-sm font-semibold text-gray-700 transition-colors"
                  >
                    Recruiter
                  </button>
                  <button
                    onClick={() => { loginAsDemo('admin'); navigate('/admin/dashboard'); }}
                    className="px-2 py-1 bg-white hover:bg-[#F4F2FF] hover:text-[#6655D9] rounded-lg shadow-sm font-semibold text-gray-700 transition-colors"
                  >
                    Admin
                  </button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                  rightIcon={<Sparkles className="w-4 h-4" />}
                >
                  Get Started Free
                </Button>
              </div>
            ) : (
              <div className="relative">
                <div className="flex items-center gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(getDashboardLink())}
                    leftIcon={<LayoutDashboard className="w-4 h-4" />}
                  >
                    Go to Portal
                  </Button>

                  {/* Profile Dropdown Toggle */}
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 p-1.5 rounded-2xl hover:bg-gray-100/80 transition-all border border-gray-200/80"
                  >
                    <img
                      src={user.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                      alt={user.name}
                      className="w-8 h-8 rounded-xl object-cover ring-2 ring-[#6655D9]/20"
                    />
                    <div className="text-left hidden lg:block pr-1">
                      <p className="text-xs font-bold text-[#171923] truncate max-w-[120px]">{user.name}</p>
                      <p className="text-[10px] capitalize text-[#6655D9] font-medium">{user.role}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl glass-dropdown p-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-xs font-semibold text-[#171923] truncate">{user.name}</p>
                      <p className="text-[11px] text-[#737987] truncate">{user.email}</p>
                      <div className="mt-1.5">
                        <Badge variant="primary" size="sm">
                          {user.role === 'student' ? 'Student Account' : user.role === 'company' ? 'Verified Recruiter' : 'Super Admin'}
                        </Badge>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        to={getDashboardLink()}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:text-[#6655D9] hover:bg-[#F4F2FF] rounded-xl transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      {isStudent && (
                        <Link
                          to="/student/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:text-[#6655D9] hover:bg-[#F4F2FF] rounded-xl transition-colors"
                        >
                          <User className="w-4 h-4" />
                          Profile & Resume
                        </Link>
                      )}
                      {isCompany && (
                        <Link
                          to="/company/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:text-[#6655D9] hover:bg-[#F4F2FF] rounded-xl transition-colors"
                        >
                          <Building2 className="w-4 h-4" />
                          Company Profile
                        </Link>
                      )}
                    </div>

                    <div className="pt-1 border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-black rounded-xl hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-[#E8EAED] px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#171923] hover:bg-[#F4F2FF] hover:text-[#6655D9]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-gray-200/60 flex flex-col gap-2">
            {!user ? (
              <>
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => { setMobileMenuOpen(false); navigate('/register'); }}
                >
                  Register as Student
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-center"
                  onClick={() => { setMobileMenuOpen(false); navigate('/register/company'); }}
                >
                  Register as Company
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => { setMobileMenuOpen(false); navigate(getDashboardLink()); }}
                >
                  Go to {user.role.toUpperCase()} Portal
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-center text-rose-600"
                  onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                >
                  Log Out
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
