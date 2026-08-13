import React, { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Search, ArrowRight, SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import IconBadge from '../components/ui/IconBadge';
import EmptyState from '../components/ui/EmptyState';
import SectionHeader from '../components/ui/SectionHeader';
import { skills, filterCategories, difficultyTone } from '../data/skills';

export default function SkillsView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const reduceMotion = useReducedMotion();

  const filteredSkills = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return skills.filter(skill => {
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
      const matchesSearch = !q || skill.title.toLowerCase().includes(q) || skill.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: skills.length };
    skills.forEach(s => { counts[s.category] = (counts[s.category] ?? 0) + 1; });
    return counts;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      <SectionHeader
        eyebrow="Multi-Language & Engineering Catalog"
        title="Master Code & Engineering Disciplines"
        description="Choose from Python, Java, C++, C, Rust, SQL, Quantitative Aptitude, or Engineering skill tracks."
        trailing={
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[var(--text-tertiary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Python, C++, Circuits..."
              aria-label="Search skill tracks"
              className="w-full bg-[var(--surface-1)] border border-[var(--border-default)] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20 transition"
            />
          </div>
        }
      />

      {/* Filter Tabs with category counts */}
      <div className="flex flex-wrap gap-2">
        {filterCategories.map((cat) => {
          const isActive = selectedCategory === cat.name;
          const Icon = cat.icon;
          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                isActive
                  ? 'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black border-transparent shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'bg-[var(--surface-1)] text-[var(--text-secondary)] hover:text-white border-[var(--border-default)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {cat.name}
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] tabular-nums font-mono ${
                isActive ? 'bg-black/15 text-black' : 'bg-white/5 text-[var(--text-tertiary)]'
              }`}>
                {categoryCounts[cat.name] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Staggered grid */}
      {filteredSkills.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No matching skill tracks"
          body={`No tracks match ${searchQuery ? `"${searchQuery}"` : 'this filter'}. Try a different category or clear the search.`}
          accent="gold"
          action={
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:brightness-110 transition"
            >
              Reset filters
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: reduceMotion ? 0 : index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
            >
              <GlassCard
                interactive
                variant="elevated"
                className="p-6 h-full flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <IconBadge tone={skill.accent} size="md">
                      {skill.category}
                    </IconBadge>
                    <IconBadge tone="gold" size="sm">
                      +{skill.xp.toLocaleString()} XP
                    </IconBadge>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--text-primary)] leading-snug">{skill.title}</h3>
                  <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">{skill.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <IconBadge tone={difficultyTone[skill.difficulty]} size="sm">
                    {skill.difficulty}
                  </IconBadge>
                  <Link
                    to={`/path/${skill.pathSlug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:brightness-110 active:scale-[0.97] transition"
                  >
                    Start Track
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}