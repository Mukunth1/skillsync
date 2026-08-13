import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Route, Terminal, Flame, Trophy, ShieldCheck, Fingerprint, Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import GlowCard from '../ui/GlowCard';
import IconBadge from '../ui/IconBadge';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: 'gold' | 'sky' | 'rose' | 'emerald' | 'violet';
  featured?: boolean;
}

const FEATURES: Feature[] = [
  {
    icon: Route,
    title: 'Adaptive Learning Paths',
    description: 'Quizzes, code challenges, and concept drills sequenced into progressive skill trails that adapt to your pace.',
    accent: 'gold',
    featured: true,
  },
  {
    icon: Terminal,
    title: 'Polyglot Code Terminal',
    description: 'Write and run Python, Java, C++, and JavaScript in a single in-browser terminal with instant feedback.',
    accent: 'sky',
  },
  {
    icon: Flame,
    title: 'Streaks & XP Gamification',
    description: 'Daily streaks, XP rewards, and rank progression from New Pathfinder to Grandmaster keep you coming back.',
    accent: 'rose',
  },
  {
    icon: Trophy,
    title: 'Live Weekly Leaderboard',
    description: 'Compete with peers across India. Climb ranks, claim milestones, and showcase your mastery publicly.',
    accent: 'gold',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Supabase Auth',
    description: 'Email/password authentication backed by Supabase. Admin roles, session isolation, and encrypted storage.',
    accent: 'emerald',
  },
  {
    icon: Fingerprint,
    title: 'Per-Account Progress',
    description: 'Every learner gets an isolated progress graph — XP, streaks, milestones, and rank stay private to you.',
    accent: 'violet',
  },
];

const accentIconBg: Record<Feature['accent'], string> = {
  gold: 'bg-[#f59e0b]/15 text-[#f59e0b]',
  sky: 'bg-[#38bdf8]/15 text-[#38bdf8]',
  rose: 'bg-[#e11d48]/15 text-[#e11d48]',
  emerald: 'bg-[#10b981]/15 text-[#10b981]',
  violet: 'bg-[#8b5cf6]/15 text-[#8b5cf6]',
};

export default function Features() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="features" className="scroll-anchor py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <IconBadge tone="gold" size="md" className="mx-auto">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Platform Features
          </IconBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Everything you need to level up
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-tertiary)]">
            From adaptive trails to live leaderboards — Skill Sync packs a complete EdTech toolkit into one dark, beautiful dashboard.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            const content = (
              <div className={`p-6 h-full flex flex-col gap-4 ${feat.featured ? 'sm:min-h-[220px]' : ''}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${accentIconBg[feat.accent]}`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{feat.title}</h3>
                  <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">{feat.description}</p>
                </div>
              </div>
            );

            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={feat.featured ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                {feat.featured ? (
                  <GlowCard accent="gold" className="h-full">{content}</GlowCard>
                ) : (
                  <GlassCard variant="elevated" interactive className="h-full">
                    {content}
                  </GlassCard>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
