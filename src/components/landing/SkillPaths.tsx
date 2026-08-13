import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import IconBadge from '../ui/IconBadge';
import { skillCategories } from '../../data/skills';

const accentBorder: Record<string, string> = {
  gold: 'hover:border-[#f59e0b]/40',
  sky: 'hover:border-[#38bdf8]/40',
  emerald: 'hover:border-[#10b981]/40',
  rose: 'hover:border-[#e11d48]/40',
  violet: 'hover:border-[#8b5cf6]/40',
};

const accentIcon: Record<string, string> = {
  gold: 'bg-[#f59e0b]/15 text-[#f59e0b]',
  sky: 'bg-[#38bdf8]/15 text-[#38bdf8]',
  emerald: 'bg-[#10b981]/15 text-[#10b981]',
  rose: 'bg-[#e11d48]/15 text-[#e11d48]',
  violet: 'bg-[#8b5cf6]/15 text-[#8b5cf6]',
};

export default function SkillPaths() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="paths" className="scroll-anchor py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-3 max-w-2xl">
            <IconBadge tone="gold" size="md">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Multi-Discipline Catalog
            </IconBadge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Seven trails. Infinite mastery.
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-tertiary)]">
              From Python DSA to circuit analysis — pick a discipline and start climbing.
            </p>
          </div>
          <Link
            to="/skills"
            className="inline-flex items-center gap-2 self-start md:self-auto px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:brightness-110 transition shrink-0"
          >
            Browse All Tracks
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to="/skills" className="block h-full group">
                  <GlassCard
                    variant="elevated"
                    interactive
                    className={`p-5 h-full space-y-3 transition-colors ${accentBorder[cat.accent]}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accentIcon[cat.accent]}`}>
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <IconBadge tone={cat.accent} size="sm">
                        {cat.trackCount} {cat.trackCount === 1 ? 'track' : 'tracks'}
                      </IconBadge>
                    </div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[#f59e0b] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                      {cat.description}
                    </p>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
