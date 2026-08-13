import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatingInput from '../components/FloatingInput';
import CanvasBackground from '../components/CanvasBackground';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Mail, Lock, User, Sparkles, ShieldCheck, Zap, Trophy, ArrowRight, Loader2 } from 'lucide-react';
import GlowCard from '../components/ui/GlowCard';
import IconBadge from '../components/ui/IconBadge';

type Strength = 0 | 1 | 2 | 3 | 4;

function passwordStrength(pw: string): { score: Strength; label: string; color: string; pct: number } {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: 'Too short', color: 'bg-[#e11d48]', pct: 12 },
    { label: 'Weak',      color: 'bg-[#e11d48]', pct: 30 },
    { label: 'Fair',      color: 'bg-[#f59e0b]', pct: 55 },
    { label: 'Good',      color: 'bg-[#38bdf8]', pct: 80 },
    { label: 'Strong',    color: 'bg-[#10b981]', pct: 100 },
  ];
  return { score: score as Strength, ...map[score] };
}

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const strength = useMemo(() => passwordStrength(password), [password]);
  const passwordsMatch = !confirmPassword || confirmPassword === password;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    if (password.length < 6) {
      addToast('Use a password with at least 6 characters.', 'error');
      return;
    }
    if (password !== confirmPassword) {
      addToast('Passwords do not match.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const signedIn = await registerUser(cleanEmail, name, password);
      if (signedIn) {
        addToast(`Account created for ${name}! Starting fresh at 0 XP.`, 'success');
        navigate('/dashboard');
      } else {
        addToast('Account created. Check your email to confirm your account, then sign in.', 'success');
        navigate('/login');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create account';
      addToast(`Registration error: ${message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center relative px-4 py-12">
      <CanvasBackground dense={true} />

      <div className="w-full max-w-5xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Marketing panel */}
        <GlowCard accent="rose" className="hidden lg:flex flex-col justify-between p-8">
          <div className="space-y-3">
            <IconBadge tone="rose" size="md">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Join Skill Sync
            </IconBadge>
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)] leading-tight tracking-tight">
              Start your learning trail today.
            </h2>
            <p className="text-sm text-[var(--text-tertiary)] max-w-md">
              Free to start. Earn XP, build streaks, climb the leaderboard, and unlock advanced engineering tracks.
            </p>
          </div>

          <ul className="space-y-3 mt-8">
            <li className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-lg bg-[#f59e0b]/15">
                <Zap className="w-4 h-4 text-[#f59e0b]" aria-hidden="true" />
              </span>
              <div>
                <div className="font-semibold text-[var(--text-primary)]">Earn XP &amp; streaks</div>
                <div className="text-[var(--text-tertiary)] text-xs">Every challenge rewards consistent effort.</div>
              </div>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-lg bg-[#10b981]/15">
                <Trophy className="w-4 h-4 text-[#10b981]" aria-hidden="true" />
              </span>
              <div>
                <div className="font-semibold text-[var(--text-primary)]">Climb the ranks</div>
                <div className="text-[var(--text-tertiary)] text-xs">New Pathfinder → Master → Grandmaster.</div>
              </div>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-lg bg-[#38bdf8]/15">
                <ShieldCheck className="w-4 h-4 text-[#38bdf8]" aria-hidden="true" />
              </span>
              <div>
                <div className="font-semibold text-[var(--text-primary)]">Private progress</div>
                <div className="text-[var(--text-tertiary)] text-xs">Isolated to your account, stored securely.</div>
              </div>
            </li>
          </ul>
        </GlowCard>

        {/* Sign-up form */}
        <GlowCard accent="gold" className="p-8 space-y-5 animate-flyInBottom">
          <div className="text-center space-y-2">
            <IconBadge tone="gold" size="md" className="mx-auto">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Create Account
            </IconBadge>
            <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Join Skill Sync</h2>
            <p className="text-sm text-[var(--text-tertiary)]">
              Start learning with your own isolated dashboard &amp; progress tracking.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-3.5">
            <FloatingInput
              id="reg-name"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              icon={User}
              autoComplete="name"
            />

            <FloatingInput
              id="reg-email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={Mail}
              autoComplete="email"
            />

            <div>
              <FloatingInput
                id="reg-password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                icon={Lock}
                minLength={6}
                autoComplete="new-password"
              />
              {password.length > 0 && (
                <div className="mt-2 space-y-1.5" aria-live="polite">
                  <div className="h-1.5 w-full rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: `${strength.pct}%` }}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-[11px] text-[var(--text-tertiary)] flex items-center justify-between">
                    <span>Password strength: <span className="text-[var(--text-primary)] font-semibold">{strength.label}</span></span>
                    <span className="text-[var(--text-muted)]">Min 6 chars, mix cases, add a number/symbol.</span>
                  </p>
                </div>
              )}
            </div>

            <FloatingInput
              id="reg-confirm-password"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              icon={Lock}
              autoComplete="new-password"
            />
            {confirmPassword && !passwordsMatch && (
              <p className="text-[11px] text-[#fda4af] -mt-1" role="alert">Passwords do not match.</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full overflow-hidden rounded-xl px-5 py-3.5 text-sm font-bold transition-transform duration-150 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:brightness-110 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  Creating account...
                </>
              ) : (
                <>
                  Register Account
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          <div className="text-center text-sm text-[var(--text-tertiary)] pt-2 border-t border-[var(--border-subtle)]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#f59e0b] hover:underline font-semibold">
              Sign in here
            </Link>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
