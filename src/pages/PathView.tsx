import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import WindingTrail from '../components/WindingTrail';
import SkillSyncTerminal, { TerminalTask } from '../components/SkillSyncTerminal';
import QuizTaskModal from '../components/QuizTaskModal';
import { getAptitudeTopicQuestions } from '../lib/aptitudeQuestionBank';
import { Sparkles, Award, ArrowLeft, Terminal, Target, Zap, Trophy } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import GlowCard from '../components/ui/GlowCard';
import StatTile from '../components/ui/StatTile';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import IconBadge from '../components/ui/IconBadge';

export default function PathView() {
  const { id = 'web-dev-101' } = useParams();
  const challengeSectionRef = useRef<HTMLDivElement | null>(null);
  const { updateUserStats } = useAuth();
  const { addToast } = useToast();

  const getPathData = (slug: string) => {
    switch (slug) {
      case 'aptitude':
        return {
          title: 'Quantitative Aptitude & Logical Reasoning Mastery',
          description: 'Master Clock Angles, Direction Sense, Ages & Ratios, Calendar Day Calculations, and Number System across 30-question milestone quizzes.',
          milestones: [
            {
              id: 'apt1',
              title: 'Level 1: Number System & Divisibility',
              type: 'quiz',
              status: 'active',
              xp_reward: 100,
              quizData: {
                title: 'Level 1: Number System & Simplification (30 Questions)',
                xp_reward: 100,
                questions: getAptitudeTopicQuestions('number_system')
              }
            },
            {
              id: 'apt2',
              title: 'Level 2: Clock Angles & Time Gain/Loss',
              type: 'quiz',
              status: 'locked',
              xp_reward: 120,
              quizData: {
                title: 'Level 2: Clock & Angle Calculation (30 Questions)',
                xp_reward: 120,
                questions: getAptitudeTopicQuestions('clocks')
              }
            },
            {
              id: 'apt3',
              title: 'Level 3: Direction Sense & Shortest Distance',
              type: 'quiz',
              status: 'locked',
              xp_reward: 140,
              quizData: {
                title: 'Level 3: Direction Sense & Spatial Reasoning (30 Questions)',
                xp_reward: 140,
                questions: getAptitudeTopicQuestions('direction')
              }
            },
            {
              id: 'apt4',
              title: 'Level 4: Problems on Ages & Ratios',
              type: 'quiz',
              status: 'locked',
              xp_reward: 160,
              quizData: {
                title: 'Level 4: Problems on Ages & Ratios (30 Questions)',
                xp_reward: 160,
                questions: getAptitudeTopicQuestions('ages')
              }
            },
            {
              id: 'apt5',
              title: 'Level 5: Calendar & Day Calculations',
              type: 'quiz',
              status: 'locked',
              xp_reward: 180,
              quizData: {
                title: 'Level 5: Calendar Odd Days & Leap Years (30 Questions)',
                xp_reward: 180,
                questions: getAptitudeTopicQuestions('calendar')
              }
            }
          ]
        };

      case 'python-dsa':
        return {
          title: 'Python Data Structures & Algorithms Track',
          description: 'Master Python 3.12 list comprehensions, hash maps, two pointers, and binary trees.',
          milestones: [
            {
              id: 'py1',
              title: 'Python List Comprehensions',
              type: 'quiz',
              status: 'completed',
              xp_reward: 80,
              quizData: {
                title: 'Python Essentials Quiz',
                xp_reward: 80,
                questions: [
                  {
                    id: 1,
                    question: 'Which syntax creates a list of squared numbers for x in range(5)?',
                    options: ['[x^2 for x in range(5)]', '[x**2 for x in range(5)]', 'map(x^2, range(5))', 'list(range(5)^2)'],
                    correctAnswer: 1,
                    explanation: 'In Python, exponentiation is written as `**`.'
                  }
                ]
              }
            },
            {
              id: 'py2',
              title: 'Two Sum in Python / JS',
              type: 'code',
              status: 'active',
              xp_reward: 140,
              taskData: {
                title: 'Two Sum & Array Hash Index',
                difficulty: 'Easy',
                acceptance: '89.2%',
                tags: ['Arrays', 'Hash Map'],
                instructions: 'Given an array of numbers and a target, return indices of two numbers that add up to target.',
                hints: ['Use a hash map to store visited elements and their index.'],
                starter_code: {
                  javascript: `function twoSum(nums, target) {\n  // Write JS solution\n\n}`,
                  python: `def twoSum(nums, target):\n    # Write Python solution\n    pass`,
                  java: `class Solution {}`,
                  cpp: `class Solution {}`,
                  c: `int* twoSum() {}`
                },
                functionName: 'twoSum',
                test_cases: [
                  { name: 'Test 1: [2, 7, 11, 15], target 9', args: [[2, 7, 11, 15], 9], expected: [0, 1] }
                ],
                xp_reward: 140
              }
            }
          ]
        };

      case 'circuits':
        return {
          title: 'Electrical Eng: Ohm\'s Law & Circuit Analysis',
          description: 'Solve resistance equations, Kirchhoff\'s voltage laws, and digital logic gate problems.',
          milestones: [
            {
              id: 'c1',
              title: 'Ohm\'s Law Essentials',
              type: 'quiz',
              status: 'completed',
              xp_reward: 70,
              quizData: {
                title: 'Ohm\'s Law & Voltage Assessment',
                xp_reward: 70,
                questions: [
                  {
                    id: 1,
                    question: 'If voltage V = 12V and resistance R = 4 Ω, what is the current I?',
                    options: ['48 A', '3 A', '0.33 A', '16 A'],
                    correctAnswer: 1,
                    explanation: 'By Ohm\'s law I = V / R = 12 / 4 = 3 Amperes.'
                  }
                ]
              }
            },
            {
              id: 'c2',
              title: 'Circuit Current Calculator',
              type: 'code',
              status: 'active',
              xp_reward: 130,
              taskData: {
                title: 'Calculate Parallel Resistance R_eq',
                difficulty: 'Easy',
                acceptance: '94.0%',
                tags: ['Circuits', 'Electrical', 'Physics'],
                instructions: 'Write a function calculateParallelR(r1, r2) that returns (r1 * r2) / (r1 + r2) for two parallel resistors.',
                hints: ['Formula is (r1 * r2) / (r1 + r2)'],
                starter_code: {
                  javascript: `function calculateParallelR(r1, r2) {\n  // Implement function\n\n}`,
                  python: `def calculateParallelR(r1, r2):\n    pass`,
                  java: `class Solution {}`,
                  cpp: `class Solution {}`,
                  c: `float calculateParallelR() {}`
                },
                functionName: 'calculateParallelR',
                test_cases: [
                  { name: 'Test 1: Two 10 ohm resistors', args: [10, 10], expected: 5 },
                  { name: 'Test 2: 12 ohm and 6 ohm resistors', args: [12, 6], expected: 4 }
                ],
                xp_reward: 130
              }
            }
          ]
        };

      default:
        return {
          title: 'Fullstack Vector & Motion Trail',
          description: 'Solve coding tasks and pass concept quizzes along the winding path to clear skill levels!',
          milestones: [
            {
              id: 'm1',
              title: 'HTML5 & DOM Architecture',
              type: 'quiz',
              status: 'completed',
              xp_reward: 60,
              quizData: {
                title: 'HTML5 & DOM Architecture Assessment',
                xp_reward: 60,
                questions: [
                  {
                    id: 1,
                    question: 'Which element is most appropriate for independent article content?',
                    options: ['<section>', '<article>', '<div>', '<main>'],
                    correctAnswer: 1,
                    explanation: '<article> is designed for standalone distribution or reuse.'
                  }
                ]
              }
            },
            {
              id: 'm2',
              title: 'Calculate Path Total XP',
              type: 'code',
              status: 'active',
              xp_reward: 120,
              taskData: {
                title: 'Calculate Path Total XP',
                difficulty: 'Easy',
                acceptance: '92.1%',
                tags: ['Arrays', 'Accumulator'],
                instructions: 'Write a function sumPathXP(milestones) that returns the sum of all xp_reward values in the milestones array.',
                hints: ['Use Array.reduce to accumulate values.'],
                starter_code: {
                  javascript: `function sumPathXP(milestones) {\n  // Write function\n\n}`,
                  python: `def sumPathXP(milestones):\n    pass`,
                  java: `class Solution {}`,
                  cpp: `class Solution {}`,
                  c: `int sumPathXP() {}`
                },
                functionName: 'sumPathXP',
                test_cases: [
                  { name: 'Test 1: Sums multiple milestone XP values', args: [[{ xp_reward: 50 }, { xp_reward: 100 }]], expected: 150 },
                  { name: 'Test 2: Returns 0 for empty array', args: [[]], expected: 0 }
                ],
                xp_reward: 120
              }
            }
          ]
        };
    }
  };

  const initialPath = getPathData(id);
  const [milestones, setMilestones] = useState<any[]>(initialPath.milestones);
  const [selectedNode, setSelectedNode] = useState<any>(initialPath.milestones[0]);
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [activeCodeTask, setActiveCodeTask] = useState<any>(null);

  useEffect(() => {
    const data = getPathData(id);
    setMilestones(data.milestones);
    setSelectedNode(data.milestones[0]);
    setActiveQuiz(null);
    setActiveCodeTask(null);
  }, [id]);

  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  const handleLaunchChallenge = (m: any) => {
    setSelectedNode(m);
    if (m.type === 'quiz') {
      setActiveCodeTask(null);
      setActiveQuiz(m.quizData);
    } else {
      setActiveQuiz(null);
      setActiveCodeTask(m.taskData);
    }

    setTimeout(() => {
      challengeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleMarkTaskPassed = (_task?: unknown, language?: string, latencyMs?: number) => {
    if (!selectedNode) return;

    // Award XP and record the milestone on the server. The local milestone
    // IDs (e.g. "m1", "py1") are presentational — we still bump stats
    // server-side and the next milestone is unlocked locally as before.
    const xp = selectedNode.xp_reward ?? 0;
    try {
      updateUserStats(xp, selectedNode.id);
    } catch (err) {
      addToast(
        'Could not sync milestone: ' + (err instanceof Error ? err.message : 'unknown'),
        'error',
      );
    }
    if (language && selectedNode.taskData) {
      const taskId = selectedNode.taskData.functionName;
      if (taskId) {
        import('../lib/apiClient').then(({ tasksApi }) =>
          tasksApi
            .submit(String(taskId), { language, status: 'Passed', latencyMs: Math.round(latencyMs ?? 0) })
            .catch(() => {}),
        );
      }
    }

    setMilestones(prev => {
      const updated = prev.map(item => {
        if (item.id === selectedNode.id) {
          return { ...item, status: 'completed' };
        }
        return item;
      });

      const currentIdx = updated.findIndex(item => item.id === selectedNode.id);
      if (currentIdx >= 0 && currentIdx + 1 < updated.length) {
        if (updated[currentIdx + 1].status === 'locked') {
          updated[currentIdx + 1].status = 'active';
        }
      }

      return updated;
    });

    setActiveQuiz(null);
    setActiveCodeTask(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">

      {/* Path Header */}
      <GlassCard variant="elevated" className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2 flex-1">
            <Link
              to="/skills"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#f59e0b]/10 text-[#fbbf24] border border-[#f59e0b]/30 hover:bg-[#f59e0b]/15 transition"
            >
              <ArrowLeft className="w-3 h-3" aria-hidden="true" />
              Back to Skills Catalog
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              {initialPath.title}
            </h1>
            <p className="text-sm text-[var(--text-tertiary)] max-w-2xl">
              {initialPath.description}
            </p>
          </div>

          {/* Track Status Indicator */}
          <div className="flex items-center gap-3 bg-[var(--surface-1)] p-3.5 rounded-2xl border border-[var(--border-default)]">
            <div className="w-11 h-11 rounded-xl bg-[#f59e0b]/15 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-[#f59e0b]" aria-hidden="true" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[var(--text-tertiary)]">Track Status</div>
              <div className="text-base font-bold text-[var(--text-primary)] tabular-nums">
                {progressPercent === 100 ? 'All Levels Cleared' : `${progressPercent}% Completed`}
              </div>
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatTile value={milestones.length} label="Total Levels" icon={Target} accent="sky" compact />
          <StatTile value={completedCount} label="Cleared" icon={Award} accent="emerald" compact />
          <StatTile value={milestones.reduce((sum, m) => sum + (m.xp_reward || 0), 0)} label="Track XP Pool" icon={Zap} accent="gold" compact />
          <StatTile value={milestones.filter(m => m.status === 'active').length} label="Active Now" icon={Terminal} accent="violet" compact />
        </div>
      </GlassCard>

      {/* SVG Winding Trail Canvas */}
      <GlowCard accent="gold" className="p-6">
        <WindingTrail
          milestones={milestones}
          activeNodeId={selectedNode?.id}
          onSelectNode={(node: any) => setSelectedNode(node)}
          onLaunchChallenge={handleLaunchChallenge}
        />
      </GlowCard>

      {/* Anchor Ref for Smooth Scroll Target */}
      <div ref={challengeSectionRef} className="scroll-mt-20 scroll-anchor space-y-4">
        {activeCodeTask && (
          <GlassCard variant="elevated" className="p-6 space-y-4 animate-slideInRight">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[#f59e0b]" aria-hidden="true" />
                Skill Sync Code Terminal
              </h3>
              <button
                onClick={() => setActiveCodeTask(null)}
                className="text-xs text-[var(--text-tertiary)] hover:text-white px-2.5 py-1 rounded-lg hover:bg-white/5 transition"
              >
                Close Terminal
              </button>
            </div>

            <SkillSyncTerminal
              task={activeCodeTask}
              onTaskCompleted={handleMarkTaskPassed}
            />
          </GlassCard>
        )}

        {/* Quiz Modal Container */}
        {activeQuiz && (
          <QuizTaskModal
            quiz={activeQuiz}
            onComplete={handleMarkTaskPassed}
            onClose={() => setActiveQuiz(null)}
          />
        )}
      </div>
    </div>
  );
}
