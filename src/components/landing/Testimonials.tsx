import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import IconBadge from '../ui/IconBadge';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rank: string;
  initials: string;
  accent: 'gold' | 'sky' | 'emerald' | 'rose' | 'violet';
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Skill Sync turned my chaotic study schedule into a daily streak. The polyglot terminal alone is worth it — I practice Python and C++ without switching tabs.',
    name: 'Ananya Sharma',
    role: 'CS Undergrad, NIT Trichy',
    rank: 'Master',
    initials: 'AS',
    accent: 'gold',
  },
  {
    quote: 'The adaptive paths for aptitude + DSA helped me crack my campus placement. XP and ranks make grinding actually fun instead of soul-crushing.',
    name: 'Rahul Mehta',
    role: 'Final Year, VIT Vellore',
    rank: 'Grandmaster',
    initials: 'RM',
    accent: 'sky',
  },
  {
    quote: 'I love the engineering tracks — circuits and thermo alongside coding. No other platform covers multi-discipline learning this cleanly.',
    name: 'Priya Nair',
    role: 'ECE, BITS Pilani',
    rank: 'Intermediate',
    initials: 'PN',
    accent: 'emerald',
  },
];

const avatarBg: Record<Testimonial['accent'], string> = {
  gold: 'from-[#f59e0b] to-[#d97706]',
  sky: 'from-[#38bdf8] to-[#0284c7]',
  emerald: 'from-[#10b981] to-[#059669]',
  rose: 'from-[#e11d48] to-[#be123c]',
  violet: 'from-[#8b5cf6] to-[#6d28d9]',
};

export default function Testimonials() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <IconBadge tone="gold" size="md" className="mx-auto">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Learner Stories
          </IconBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Trusted by pathfinders across India
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-tertiary)]">
            Real learners. Real streaks. Real ranks.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard variant="elevated" className="p-6 h-full flex flex-col gap-5">
                <Quote className="w-8 h-8 text-[#f59e0b]/40" aria-hidden="true" />
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarBg[t.accent]} flex items-center justify-center text-xs font-bold text-black shrink-0`}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[var(--text-primary)] truncate">{t.name}</div>
                    <div className="text-[11px] text-[var(--text-tertiary)] truncate">{t.role}</div>
                  </div>
                  <IconBadge tone={t.accent} size="sm" className="ml-auto shrink-0">
                    {t.rank}
                  </IconBadge>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
