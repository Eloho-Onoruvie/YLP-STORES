import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToastStore } from '../store/useToastStore';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const addToast = useToastStore((s) => s.addToast);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    addToast('Password reset link sent to your email', 'info');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xl space-y-6">
        <Link
          to="/login"
          className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-amber-600"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="font-editorial text-2xl font-bold text-zinc-900 dark:text-white">
            Reset Password
          </h1>
          <p className="text-xs text-zinc-500">Enter your account email to receive a password reset code</p>
        </div>

        {sent ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs text-center space-y-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
            <p className="font-bold">Instructions Sent!</p>
            <p>If an account exists for {email}, you will receive a reset link shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                />
                <Mail className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-lg shadow-amber-600/25 transition-transform hover:scale-[1.01]"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
