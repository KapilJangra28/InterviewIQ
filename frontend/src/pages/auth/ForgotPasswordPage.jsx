import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Sparkles, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
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
          Reset your password
        </h2>
        <p className="mt-1 text-xs text-[#737987]">
          Enter your registered email and we'll send you recovery instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white p-8 shadow-2xl rounded-3xl border border-[#E8EAED]">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#171923]">Password Reset Link Sent</h3>
              <p className="text-xs text-[#737987] leading-relaxed">
                If an account exists for <span className="font-semibold text-[#171923]">{email}</span>, you will receive an email shortly with reset instructions.
              </p>
              <Link to="/login" className="inline-block pt-2 text-xs font-bold text-[#6655D9] hover:underline">
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="email"
                label="Registered Email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full justify-center shadow-button"
              >
                Send Reset Link
              </Button>
              <div className="text-center pt-2">
                <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-[#737987] hover:text-[#6655D9]">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
