import React, { useState } from 'react';
import SkillSyncTerminal, { TerminalTask } from '../components/SkillSyncTerminal';
import { Terminal, LayoutGrid, Clock } from 'lucide-react';
import { tasks } from '../data/tasks';
import IconBadge from '../components/ui/IconBadge';
import { useAuth } from '../contexts/AuthContext';
import { tasksApi } from '../lib/apiClient';
import { useToast } from '../contexts/ToastContext';

const difficultyStyles: Record<string, { badge: string; dot: string }> = {
  Easy: { badge: 'bg-[#10b981]/15 text-[#6ee7b7] border-[#10b981]/35', dot: 'bg-[#10b981]' },
  Medium: { badge: 'bg-[#f59e0b]/15 text-[#fbbf24] border-[#f59e0b]/35', dot: 'bg-[#f59e0b]' },
  Hard: { badge: 'bg-[#e11d48]/15 text-[#fda4af] border-[#e11d48]/35', dot: 'bg-[#e11d48]' },
};

export default function TaskEditorPage() {
  const { updateUserStats } = useAuth();
  const { addToast } = useToast();
  const [selectedId, setSelectedId] = useState<string | number>(tasks[0]?.id ?? 1);
  const [completedSet, setCompletedSet] = useState<Set<string | number>>(new Set());

  const currentTask: TerminalTask | undefined = tasks.find((t) => t.id === selectedId) ?? tasks[0];

  const handleTaskCompleted = (task: TerminalTask, language: string, latencyMs: number) => {
    setCompletedSet((prev) => {
      if (task.id == null || prev.has(task.id)) return prev;
      const next = new Set(prev);
      next.add(task.id);
      return next;
    });
    if (task.id == null) return;
    const id = String(task.id);
    // Record the submission server-side and bump the user's stats via the
    // existing AuthContext helper (which already POSTs to /users/me/stats).
    tasksApi
      .submit(id, { language, status: 'Passed', latencyMs })
      .then(() => {
        updateUserStats(task.xp_reward, `code-${id}`);
      })
      .catch((err) => {
        addToast(
          'Could not sync submission: ' + (err instanceof Error ? err.message : 'unknown'),
          'error',
        );
      });
  };

  const solvedCount = completedSet.size;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#f59e0b]/20 text-[#f59e0b]">
          <Terminal className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Polyglot Code Terminal</h1>
          <p className="text-xs text-gray-400">
            Write code in JavaScript, Python, Java, C++, or C. Execute test assertions and measure latency in real time.
          </p>
        </div>
      </div>

      {/* Problem Bank picker */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconBadge tone="gold" size="md">
              <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
              Problem Bank
            </IconBadge>
            <span className="text-xs text-[var(--text-secondary)] font-semibold">
              {tasks.length} challenges · {solvedCount} solved
            </span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[var(--text-tertiary)]">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            Rotates daily — pick any problem to attempt
          </span>
        </div>

        <div
          className="flex gap-2.5 overflow-x-auto pb-3 -mx-1 px-1 snap-x"
          role="listbox"
          aria-label="Problem selection"
          aria-orientation="horizontal"
        >
          {tasks.map((task) => {
            const taskId = task.id;
            if (!taskId) return null;
            const isActive = taskId === selectedId;
            const isSolved = completedSet.has(taskId);
            const diff = difficultyStyles[task.difficulty ?? 'Easy'] ?? difficultyStyles.Easy;

            return (
              <button
                key={taskId}
                role="option"
                aria-selected={isActive}
                onClick={() => setSelectedId(taskId)}
                className={`relative snap-start shrink-0 w-48 p-3 rounded-xl text-left border transition-all duration-200 ${
                  isActive
                    ? 'border-[#f59e0b]/60 bg-[#f59e0b]/[0.07] shadow-[0_0_18px_rgba(245,158,11,0.18)]'
                    : 'border-[var(--border-default)] bg-[var(--surface-1)] hover:border-[var(--border-strong)]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold border ${diff.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} aria-hidden="true" />
                    {task.difficulty}
                  </span>
                  {isSolved && (
                    <span className="text-[10px] font-bold text-[#10b981] px-1.5 py-0.5 rounded-md bg-[#10b981]/10 border border-[#10b981]/30">
                      Solved ✓
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-[var(--text-primary)] leading-snug line-clamp-2">
                  {task.title}
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-[var(--text-tertiary)]">
                  <span className="font-mono">+{task.xp_reward} XP</span>
                  <span className="font-mono truncate">{task.tags?.[0]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <SkillSyncTerminal
        key={String(currentTask.id)}
        task={currentTask}
        onTaskCompleted={handleTaskCompleted}
      />
    </div>
  );
}