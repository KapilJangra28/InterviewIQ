import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Sparkles, Lock, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    toast.success('Password updated successfully! Please log in.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6655D9] to-[#A99AF5] flex items-center justify-center text-white shadow-button">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold text-[#171923]">
            Interview<span className="text-[#6655D9]">IQ</span>
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-[#171923]">
          Create new password
        </h2>
        <p className="mt-1 text-xs text-[#737987]">
          Enter your new secure password below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white p-8 shadow-2xl rounded-3xl border border-[#E8EAED]">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 text-xs text-rose-700">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="newPassword"
              label="New Password"
              type="password"
              placeholder="Minimum 8 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />
            <Input
              id="confirmPassword"
              label="Confirm New Password"
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center shadow-button"
            >
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
