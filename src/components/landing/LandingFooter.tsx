import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { skillCategories } from '../../data/skills';

const PRODUCT_LINKS = [
  { to: '/skills', label: 'Skill Paths' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/tasks', label: 'Code Terminal' },
  { to: '/register', label: 'Sign Up' },
  { to: '/login', label: 'Sign In' },
];

export default function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-default)] bg-[#060b0a]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#f59e0b] to-[#e11d48] p-0.5 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
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
            <p className="text-sm text-[var(--text-tertiary)] leading-relaxed max-w-xs">
              Adaptive multi-discipline learning dashboard. Master code, aptitude, and engineering — one trail at a time.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">Product</h4>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-[var(--text-tertiary)] hover:text-[#f59e0b] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Skill Tracks */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">Skill Tracks</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {skillCategories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    to="/skills"
                    className="text-sm text-[var(--text-tertiary)] hover:text-[#f59e0b] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-muted)]">
            © {year} Skill Sync EdTech. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Adaptive Multi-Discipline Learning
          </p>
        </div>
      </div>
    </footer>
  );
}
