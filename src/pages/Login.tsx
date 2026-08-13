import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatingInput from '../components/FloatingInput';
import CanvasBackground from '../components/CanvasBackground';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Mail, Lock, Sparkles, ShieldCheck, Zap, Trophy, ArrowRight, Loader2 } from 'lucide-react';
import GlowCard from '../components/ui/GlowCard';
import IconBadge from '../components/ui/IconBadge';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loginUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const isAdministrator = await loginUser(cleanEmail, password);

      if (isAdministrator) {
        addToast('Signed in as Admin Overseer!', 'success');
        navigate('/admin');
      } else {
        addToast(`Signed in as ${cleanEmail.split('@')[0]}!`, 'success');
        navigate('/dashboard');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to sign in';
      addToast(`Login error: ${message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center relative px-4 py-12">
      <CanvasBackground dense={true} />

      <div className="w-full max-w-5xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Marketing panel */}
        <GlowCard accent="gold" className="hidden lg:flex flex-col justify-between p-8">
          <div className="space-y-3">
            <IconBadge tone="gold" size="md">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Skill Sync
            </IconBadge>
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)] leading-tight tracking-tight">
              Master code, aptitude, and engineering — one trail at a time.
            </h2>
            <p className="text-sm text-[var(--text-tertiary)] max-w-md">
              Join thousands of learners building streaks, earning XP, and unlocking new ranks across Python, Java, C++, SQL, and beyond.
            </p>
          </div>

          <ul className="space-y-3 mt-8">
            <li className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-lg bg-[#f59e0b]/15">
                <Zap className="w-4 h-4 text-[#f59e0b]" aria-hidden="true" />
              </span>
              <div>
                <div className="font-semibold text-[var(--text-primary)]">Adaptive learning paths</div>
                <div className="text-[var(--text-tertiary)] text-xs">Quizzes, code, and concepts — all in one trail.</div>
              </div>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-lg bg-[#10b981]/15">
                <Trophy className="w-4 h-4 text-[#10b981]" aria-hidden="true" />
              </span>
              <div>
                <div className="font-semibold text-[var(--text-primary)]">Live leaderboard</div>
                <div className="text-[var(--text-tertiary)] text-xs">Compete weekly with peers across India.</div>
              </div>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-lg bg-[#38bdf8]/15">
                <ShieldCheck className="w-4 h-4 text-[#38bdf8]" aria-hidden="true" />
              </span>
              <div>
                <div className="font-semibold text-[var(--text-primary)]">Secure Supabase auth</div>
                <div className="text-[var(--text-tertiary)] text-xs">Your progress is isolated per account.</div>
              </div>
            </li>
          </ul>
        </GlowCard>

        {/* Sign-in form */}
        <GlowCard accent="sky" className="p-8 space-y-6 animate-flyInBottom">
          <div className="text-center space-y-2">
            <IconBadge tone="sky" size="md" className="mx-auto">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Skill Sync Sign In
            </IconBadge>
            <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Welcome Back</h2>
            <p className="text-sm text-[var(--text-tertiary)]">
              Sign in to access your learning dashboard and progress.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <FloatingInput
              id="login-email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={Mail}
              autoComplete="email"
            />

            <FloatingInput
              id="login-password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={Lock}
              autoComplete="current-password"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full overflow-hidden rounded-xl px-5 py-3.5 text-sm font-bold transition-transform duration-150 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:brightness-110 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          <div className="text-center text-sm text-[var(--text-tertiary)] pt-2 border-t border-[var(--border-subtle)]">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#f59e0b] hover:underline font-semibold">
              Create an account
            </Link>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
