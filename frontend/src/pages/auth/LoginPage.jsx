import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import {
  Sparkles,
  Lock,
  Mail,
  GraduationCap,
  Building2,
  ShieldCheck,
  ArrowRight,
  UserCheck
} from 'lucide-react';

export const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState('student'); // 'student' | 'company' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, loginAsDemo } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setError('');
    // Auto-fill demo credentials for convenience
    if (role === 'student') {
      setEmail('aarav.sharma@example.edu');
      setPassword('Student@123');
    } else if (role === 'company') {
      setEmail('recruiter@techpulse.io');
      setPassword('Recruiter@123');
    } else if (role === 'admin') {
      setEmail('admin@interviewiq.ai');
      setPassword('Admin@123');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email address and password.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await login(email, password, selectedRole);
      if (res.success) {
        toast.success(`Welcome back, ${res.user.name}!`);
        if (selectedRole === 'admin') navigate('/admin/dashboard');
        else if (selectedRole === 'company') navigate('/company/dashboard');
        else navigate('/student/dashboard');
      } else {
        setError(res.message || 'Invalid credentials. Please verify your email and password.');
      }
    } catch (err) {
      setError('An error occurred during sign in.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemo = (role) => {
    const demoUser = loginAsDemo(role);
    toast.info(`Logged in with Demo ${role.toUpperCase()} account`);
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'company') navigate('/company/dashboard');
    else navigate('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-[#6655D9]/15 via-[#A99AF5]/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#6655D9] to-[#A99AF5] flex items-center justify-center text-white shadow-button group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold text-[#171923] tracking-tight">
            Interview<span className="text-[#6655D9]">IQ</span>
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171923] tracking-tight">
          Welcome back
        </h2>
        <p className="mt-1 text-xs text-[#737987]">
          Sign in to access your mock sessions, job applications, or recruiter dashboard.
        </p>
      </div>

      {/* Login Card (Crystal inspired glassmorphism card) */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-white/95 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-[#E8EAED]">
          
          {/* Role Switcher Tabs */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-[#171923] mb-2 text-center">
              Select Your Portal Role
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F8F9FC] border border-[#E8EAED] rounded-2xl">
              <button
                type="button"
                onClick={() => handleRoleChange('student')}
                className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  selectedRole === 'student'
                    ? 'bg-white text-[#6655D9] shadow-sm border border-[#6655D9]/20'
                    : 'text-[#737987] hover:text-[#171923]'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('company')}
                className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  selectedRole === 'company'
                    ? 'bg-white text-[#6655D9] shadow-sm border border-[#6655D9]/20'
                    : 'text-[#737987] hover:text-[#171923]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Recruiter</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  selectedRole === 'admin'
                    ? 'bg-white text-[#6655D9] shadow-sm border border-[#6655D9]/20'
                    : 'text-[#737987] hover:text-[#171923]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="email"
              label="Official Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@example.com"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#171923]">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-[#6655D9] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your account password"
                leftIcon={<Lock className="w-4 h-4" />}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={submitting}
              className="w-full mt-2 justify-center shadow-button shadow-[#6655D9]/25"
            >
              Sign In to {selectedRole === 'student' ? 'Student Portal' : selectedRole === 'company' ? 'Company ATS' : 'Admin Console'}
            </Button>
          </form>

          {/* 1-Click Demo Login Box */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-center text-[#737987] mb-3">
              One-Click Instant Testing
            </p>
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleQuickDemo(selectedRole)}
                leftIcon={<UserCheck className="w-3.5 h-3.5" />}
                className="w-full text-xs"
              >
                Instant Demo as {selectedRole.toUpperCase()}
              </Button>
            </div>
          </div>

          {/* Registration Links */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-[#737987]">
            {selectedRole === 'student' ? (
              <p>
                Don't have a student account?{' '}
                <Link to="/register" className="font-bold text-[#6655D9] hover:underline">
                  Create Account Free
                </Link>
              </p>
            ) : selectedRole === 'company' ? (
              <p>
                Want to hire top talent?{' '}
                <Link to="/register/company" className="font-bold text-[#6655D9] hover:underline">
                  Register Your Company
                </Link>
              </p>
            ) : (
              <p className="text-[11px] text-[#737987]">
                Public admin registration is restricted. Contact system master.
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
