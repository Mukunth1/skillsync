import type { LucideIcon } from 'lucide-react';
import { Brain, Code2, Cpu, Globe, Database, Zap, Shield, Sparkles } from 'lucide-react';

/**
 * Skill Sync Skill Catalog — Shared data for SkillsView, SkillPaths, and Dashboard.
 * Single source of truth for all skill tracks, categories, and metadata.
 */

export interface Skill {
  id: number;
  title: string;
  category: string;
  level: string;
  xp: number;
  difficulty: 'Easy' | 'Intermediate' | 'Hard' | 'Advanced';
  description: string;
  pathSlug: string;
  accent: 'gold' | 'sky' | 'emerald' | 'rose' | 'violet';
}

export interface SkillCategory {
  name: string;
  icon: LucideIcon;
  accent: 'gold' | 'sky' | 'emerald' | 'rose' | 'violet';
  description: string;
  trackCount: number;
}

/**
 * All available skill tracks across disciplines.
 * Update this array to add/remove/modify tracks — SkillsView, SkillPaths, and the landing
 * stats all read from here, so changes propagate automatically.
 */
export const skills: Skill[] = [
  /* ---------- Python & AI ---------- */
  { id: 101, title: 'Python Data Structures & Algorithms', category: 'Python & AI', level: 'Easy → Medium', xp: 1200, difficulty: 'Intermediate', description: 'Master list comprehensions, hash maps, binary search, dynamic programming, and recursion in Python 3.12.', pathSlug: 'python-dsa', accent: 'sky' },
  { id: 102, title: 'Neural Networks & Deep Learning',     category: 'Python & AI', level: 'Hard',          xp: 1800, difficulty: 'Hard',         description: 'Build gradient descent algorithms, matrix multiplications, activation functions, and model evaluations.', pathSlug: 'python-ai', accent: 'sky' },
  { id: 103, title: 'Python for Data Science & Visualization', category: 'Python & AI', level: 'Easy → Intermediate', xp: 1100, difficulty: 'Intermediate', description: 'Clean data with pandas, compute with NumPy, and tell stories with Matplotlib and Seaborn.', pathSlug: 'python-data-science', accent: 'sky' },
  { id: 104, title: 'Machine Learning Fundamentals',        category: 'Python & AI', level: 'Hard',          xp: 1700, difficulty: 'Hard',         description: 'Regression, classification, and clustering with scikit-learn, plus train/test splits and metrics.', pathSlug: 'ml-fundamentals', accent: 'sky' },

  /* ---------- Java & Enterprise ---------- */
  { id: 201, title: 'Java Object-Oriented Architecture',   category: 'Java & Enterprise', level: 'Intermediate', xp: 1300, difficulty: 'Intermediate', description: 'Polymorphism, inheritance, concurrency threads, Stream API, and Spring Boot microservice patterns.', pathSlug: 'java-dsa', accent: 'rose' },
  { id: 202, title: 'Java Collections, Streams & Lambdas', category: 'Java & Enterprise', level: 'Intermediate', xp: 1100, difficulty: 'Intermediate', description: 'Leverage the Collection framework, functional Stream pipelines, and method references in Java 21.', pathSlug: 'java-streams', accent: 'rose' },
  { id: 203, title: 'Spring Boot REST API Development',    category: 'Java & Enterprise', level: 'Advanced',     xp: 1500, difficulty: 'Advanced',     description: 'Build production REST APIs with controllers, JPA repositories, validation, and dependency injection.', pathSlug: 'spring-boot', accent: 'rose' },

  /* ---------- C / C++ Systems ---------- */
  { id: 301, title: 'C Systems Programming & Pointers',    category: 'C / C++ Systems', level: 'Hard',      xp: 1500, difficulty: 'Hard',         description: 'Dynamic memory allocation (malloc/free), pointer arithmetic, linked lists, and OS kernel concepts.', pathSlug: 'c-pointers', accent: 'emerald' },
  { id: 302, title: 'C++ Standard Template Library (STL)', category: 'C / C++ Systems', level: 'Advanced',  xp: 1600, difficulty: 'Advanced',     description: 'Master std::vector, std::unordered_map, custom iterators, and competitive programming algorithms.', pathSlug: 'cpp-stl', accent: 'emerald' },
  { id: 303, title: 'Operating Systems & Process Scheduling', category: 'C / C++ Systems', level: 'Hard',    xp: 1400, difficulty: 'Hard',         description: 'Process states, FCFS/SJF/Round-Robin scheduling, threads, mutexes, and memory paging concepts.', pathSlug: 'os-concepts', accent: 'emerald' },

  /* ---------- Web & JS ---------- */
  { id: 401, title: 'Fullstack Vector & Motion Trail',     category: 'Web & JS', level: 'Advanced',         xp: 1200, difficulty: 'Advanced',     description: 'Self-drawing SVG paths, 3D WebGL scenes, particle physics canvas, and high-performance CSS transitions.', pathSlug: 'web-dev-101', accent: 'violet' },
  { id: 402, title: 'React 19 & Next.js Architecture',     category: 'Web & JS', level: 'Advanced',         xp: 1400, difficulty: 'Advanced',     description: 'Server components, optimistic state updates, custom motion hooks, and clean routing.', pathSlug: 'react-19', accent: 'violet' },
  { id: 403, title: 'JavaScript Async & Event Loop',       category: 'Web & JS', level: 'Intermediate',     xp: 1000, difficulty: 'Intermediate', description: 'Promises, async/await, the microtask queue, and debouncing/rate-limiting patterns.', pathSlug: 'js-async', accent: 'violet' },
  { id: 404, title: 'TypeScript & Modern Frontend Tooling', category: 'Web & JS', level: 'Intermediate',   xp: 1100, difficulty: 'Intermediate', description: 'Type inference, generics, strict mode, Vite bundling, and production-grade editor tooling.', pathSlug: 'typescript', accent: 'violet' },

  /* ---------- Data & SQL ---------- */
  { id: 501, title: 'SQL Database Queries & Indexing',     category: 'Data & SQL', level: 'Medium',         xp: 1100, difficulty: 'Intermediate', description: 'JOIN operations, window functions, B-Tree indexing, CTEs, and query plan optimization.', pathSlug: 'sql-mastery', accent: 'sky' },
  { id: 502, title: 'Database Design & Normalization',     category: 'Data & SQL', level: 'Intermediate',   xp: 1000, difficulty: 'Intermediate', description: 'ER diagrams, 1NF–3NF normalization, primary/foreign keys, and referential integrity.', pathSlug: 'db-design', accent: 'sky' },
  { id: 503, title: 'NoSQL & MongoDB Modeling',            category: 'Data & SQL', level: 'Intermediate',   xp: 1000, difficulty: 'Intermediate', description: 'Document schemas, indexes, aggregation pipelines, and embedding vs referencing trade-offs.', pathSlug: 'nosql', accent: 'sky' },

  /* ---------- Aptitude & Logic ---------- */
  { id: 601, title: 'Quantitative Aptitude & Logic',       category: 'Aptitude & Logic', level: 'Intermediate', xp: 1000, difficulty: 'Intermediate', description: 'Number series, speed-distance-time, probability, permutations, and logical deduction patterns.', pathSlug: 'aptitude', accent: 'gold' },
  { id: 602, title: 'Data Interpretation & Graphs',        category: 'Aptitude & Logic', level: 'Easy → Intermediate', xp: 900, difficulty: 'Easy', description: 'Read bar charts, line graphs, pie charts, and tables under time pressure.', pathSlug: 'data-interpretation', accent: 'gold' },

  /* ---------- Engineering Disciplines ---------- */
  { id: 701, title: "Ohm's Law & Circuit Analysis",       category: 'Engineering Disciplines', level: 'Intermediate', xp: 1100, difficulty: 'Intermediate', description: "Equivalent parallel resistance, Kirchhoff's laws, AC/DC analysis, and digital logic gates.", pathSlug: 'circuits', accent: 'emerald' },
  { id: 702, title: 'Thermodynamics & Heat Transfer',      category: 'Engineering Disciplines', level: 'Advanced',     xp: 1300, difficulty: 'Advanced',     description: "Heat engine efficiency calculations, Bernoulli's principle, stress-strain tensor analysis.", pathSlug: 'thermo', accent: 'emerald' },
  { id: 703, title: 'Digital Logic & Combinational Circuits', category: 'Engineering Disciplines', level: 'Intermediate', xp: 1100, difficulty: 'Intermediate', description: 'Boolean algebra, K-maps, decoders/multiplexers, adders, and flip-flop state tables.', pathSlug: 'digital-logic', accent: 'emerald' },
  { id: 704, title: 'Computer Networks & Protocols',       category: 'Engineering Disciplines', level: 'Advanced',     xp: 1300, difficulty: 'Advanced',     description: 'OSI/TCP-IP layers, subnetting and CIDR, TCP handshake, DNS, and routing algorithms.', pathSlug: 'networks', accent: 'emerald' },
];

/**
 * Filter tabs used by SkillsView — includes the "All" option.
 */
export const filterCategories = [
  { name: 'All', icon: Sparkles, accent: 'gold' as const },
  { name: 'Python & AI', icon: Brain, accent: 'sky' as const },
  { name: 'Java & Enterprise', icon: Code2, accent: 'rose' as const },
  { name: 'C / C++ Systems', icon: Cpu, accent: 'emerald' as const },
  { name: 'Web & JS', icon: Globe, accent: 'violet' as const },
  { name: 'Data & SQL', icon: Database, accent: 'sky' as const },
  { name: 'Aptitude & Logic', icon: Zap, accent: 'gold' as const },
  { name: 'Engineering Disciplines', icon: Shield, accent: 'emerald' as const },
];

/**
 * Marketing-facing categories for the landing page SkillPaths section.
 */
export const skillCategories: SkillCategory[] = [
  {
    name: 'Python & AI',
    icon: Brain,
    accent: 'sky',
    description: 'Data structures, algorithms, neural networks, and ML fundamentals.',
    trackCount: 4,
  },
  {
    name: 'Java & Enterprise',
    icon: Code2,
    accent: 'rose',
    description: 'OOP patterns, concurrency, Stream API, Spring Boot microservices.',
    trackCount: 3,
  },
  {
    name: 'C / C++ Systems',
    icon: Cpu,
    accent: 'emerald',
    description: 'Pointers, memory management, STL, competitive programming.',
    trackCount: 3,
  },
  {
    name: 'Web & JS',
    icon: Globe,
    accent: 'violet',
    description: 'Fullstack vector motion, React 19, Next.js architecture.',
    trackCount: 4,
  },
  {
    name: 'Data & SQL',
    icon: Database,
    accent: 'sky',
    description: 'JOINs, window functions, indexing, query optimization.',
    trackCount: 3,
  },
  {
    name: 'Aptitude & Logic',
    icon: Zap,
    accent: 'gold',
    description: 'Number series, probability, permutations, logical deduction.',
    trackCount: 2,
  },
  {
    name: 'Engineering Disciplines',
    icon: Shield,
    accent: 'emerald',
    description: 'Circuits, thermodynamics, digital logic, heat transfer.',
    trackCount: 4,
  },
];

/**
 * Difficulty → color tone mapping used by badge components.
 */
export const difficultyTone: Record<Skill['difficulty'], 'emerald' | 'sky' | 'rose' | 'violet'> = {
  Easy: 'emerald',
  Intermediate: 'sky',
  Hard: 'rose',
  Advanced: 'violet',
};
