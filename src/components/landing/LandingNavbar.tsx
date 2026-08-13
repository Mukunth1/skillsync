import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ANCHORS = [
  { href: '#features', label: 'Features' },
  { href: '#paths', label: 'Skill Paths' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#cta', label: 'Get Started' },
];

export default function LandingNavbar() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-[#0a0f0e]/90 border-b border-[var(--border-default)] shadow-[0_1px_0_rgba(245,158,11,0.06)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
        </a>

        {/* Desktop anchors */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Landing">
          {ANCHORS.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="px-3.5 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors rounded-xl"
            >
              {a.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:brightness-110 transition"
            >
              Open Dashboard
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold rounded-xl bg-[var(--surface-1)] text-[var(--text-primary)] hover:bg-[#1e293b] border border-[var(--border-default)] transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:brightness-110 transition"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-white transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="w-4 h-4" aria-hidden="true" /> : <Menu className="w-4 h-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--border-default)] bg-[#0a0f0e]/95 backdrop-blur-xl">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile">
            {ANCHORS.map((a) => (
              <a
                key={a.href}
                href={a.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-medium text-[var(--text-secondary)] hover:text-white hover:bg-[var(--surface-1)] rounded-xl transition-colors"
              >
                {a.label}
              </a>
            ))}
            {!user && (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="sm:hidden mt-2 px-4 py-3 text-sm font-semibold text-center rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] text-[var(--text-primary)]"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
