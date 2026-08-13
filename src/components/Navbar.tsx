import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, BookOpen, Flame, Code, ShieldCheck, Sparkles, LogOut, Trophy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import IconBadge from './ui/IconBadge';
import Switch from './ui/Switch';

interface NavbarProps {
  noiseEnabled: boolean;
  toggleNoise: () => void;
}

export default function Navbar({ noiseEnabled, toggleNoise }: NavbarProps) {
  const location = useLocation();
  const { user, signOut, isAdmin, userStats } = useAuth();

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: Compass },
    { path: '/skills', label: 'Skill Paths', icon: BookOpen },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/path/web-dev-101', label: 'Current Trail', icon: Flame },
    { path: '/tasks', label: 'Code Terminal', icon: Code },
  ];

  if (isAdmin || user?.email?.includes('admin')) {
    navLinks.push({ path: '/admin', label: 'Admin Panel', icon: ShieldCheck });
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0a0f0e]/80 border-b border-[var(--border-default)] shadow-[0_1px_0_rgba(245,158,11,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* App Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#f59e0b] to-[#e11d48] p-0.5 shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0a0f0e] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#f59e0b]" aria-hidden="true" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-white text-lg leading-none">
              Skill Sync
            </span>
            <span className="text-[10px] font-medium text-[var(--text-tertiary)]">Adaptive Multi-Discipline Learning</span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-xl flex items-center gap-2 group ${
                  isActive ? 'text-[#f59e0b]' : 'text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-[#f59e0b]' : 'text-[var(--text-tertiary)]'}`}
                  aria-hidden="true"
                />
                <span>{link.label}</span>
                <span
                  className={`absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-[#f59e0b] to-[#e11d48] rounded-full transition-all duration-300 ${
                    isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Actions & User Account Info */}
        <div className="flex items-center gap-3">
          {/* User Streak Badge */}
          {user && (
            <IconBadge tone="gold" size="md" className="hidden sm:inline-flex animate-badgeFloat">
              <Flame className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" aria-hidden="true" />
              {userStats?.streak ?? 0}d Streak
            </IconBadge>
          )}

          {/* Noise Overlay Toggle */}
          <div className="flex items-center gap-2" title="Toggle noise texture overlay">
            <Sparkles className="w-3.5 h-3.5 text-[var(--text-tertiary)]" aria-hidden="true" />
            <Switch
              checked={noiseEnabled}
              onChange={toggleNoise}
              size="sm"
              accent="gold"
              ariaLabel="Toggle noise texture overlay"
            />
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-xs font-semibold text-[var(--text-secondary)] bg-[var(--surface-1)] px-3 py-1.5 rounded-xl border border-[var(--border-default)]">
                {user.fullName || user.email}
              </span>
              <button
                onClick={signOut}
                aria-label="Sign out"
                className="relative overflow-hidden rounded-xl p-2.5 bg-[var(--surface-1)] text-[var(--text-secondary)] hover:text-white hover:bg-[#1e293b] border border-[var(--border-default)] transition-colors"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-[var(--surface-1)] text-[var(--text-primary)] hover:bg-[#1e293b] border border-[var(--border-default)] transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:brightness-110 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
