import React, { useState } from 'react';
import { Play, CheckCircle2, Maximize2, Minimize2, RotateCcw, Award, AlertCircle, Lightbulb, Clock, History, FileText } from 'lucide-react';
import RippleButton from './RippleButton';
import { triggerConfettiBurst } from '../lib/confetti';
import { useToast } from '../contexts/ToastContext';

export interface CodeTask {
  id?: string | number;
  title: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  acceptance?: string;
  instructions: string;
  hints?: string[];
  starter_code: string;
  functionName: string;
  test_cases: {
    name: string;
    args: any[];
    expected: any;
  }[];
  xp_reward: number;
}

interface CodeTaskEditorProps {
  task?: CodeTask;
  onTaskCompleted?: (task: CodeTask) => void;
  skillName?: string;
}

export default function CodeTaskEditor({ task, onTaskCompleted, skillName = 'Fullstack Web' }: CodeTaskEditorProps) {
  const defaultTask: CodeTask = {
    title: 'Calculate Path Total XP',
    difficulty: 'Easy',
    acceptance: '88.4%',
    instructions: 'Write a function sumPathXP(milestones) that returns the sum of all xp_reward values in the milestones array.',
    hints: [
      'Use Array.prototype.reduce() to accumulate total values.',
      'Check for missing or undefined xp_reward values: item.xp_reward || 0'
    ],
    // Clean starter code without pre-filled solution!
    starter_code: `function sumPathXP(milestones) {\n  // Write your code here\n\n}`,
    functionName: 'sumPathXP',
    test_cases: [
      { name: 'Test 1: Sums multiple milestone XP values', args: [[{ xp_reward: 50 }, { xp_reward: 100 }]], expected: 150 },
      { name: 'Test 2: Returns 0 for empty array', args: [[]], expected: 0 },
      { name: 'Test 3: Handles missing xp_reward safely', args: [[{ xp_reward: 80 }, { title: 'No XP' }]], expected: 80 }
    ],
    xp_reward: 120
  };

  const currentTask = task || defaultTask;
  const [code, setCode] = useState(currentTask.starter_code);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<any[] | null>(null);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [activeTab, setActiveTab] = useState<'problem' | 'hints' | 'submissions'>('problem');
  const [submissionHistory, setSubmissionHistory] = useState<any[]>([]);
  const [focusMode, setFocusMode] = useState(false);
  const { addToast } = useToast();

  const handleRunTests = async () => {
    setIsRunning(true);
    setTestResults(null);
    setRuntimeError(null);

    setTimeout(() => {
      setIsRunning(false);

      try {
        const evalCode = `'use strict';\n${code}\n; return ${currentTask.functionName};`;
        const userFn = new Function(evalCode)();

        if (typeof userFn !== 'function') {
          throw new Error(`Expected function '${currentTask.functionName}' was not found.`);
        }

        const results = currentTask.test_cases.map((tc) => {
          try {
            const got = userFn(...tc.args);
            const passed = JSON.stringify(got) === JSON.stringify(tc.expected);
            return {
              name: tc.name,
              passed,
              details: passed
                ? `Passed! Output: ${JSON.stringify(got)}`
                : `Failed. Expected: ${JSON.stringify(tc.expected)}, Got: ${JSON.stringify(got)}`
            };
          } catch (err: any) {
            return {
              name: tc.name,
              passed: false,
              details: `Execution Error: ${err.message}`
            };
          }
        });

        setTestResults(results);
        const allPassed = results.every(r => r.passed);

        // Record Submission History
        setSubmissionHistory(prev => [
          { time: new Date().toLocaleTimeString(), status: allPassed ? 'Accepted' : 'Wrong Answer', passedCount: `${results.filter(r => r.passed).length}/${results.length}` },
          ...prev
        ]);

        if (allPassed) {
          addToast(`🎉 Challenge Passed! +${currentTask.xp_reward} XP awarded!`, 'success');
          triggerConfettiBurst(window.innerWidth / 2, window.innerHeight / 2);
          if (onTaskCompleted) onTaskCompleted(currentTask);
        } else {
          addToast('Code did not pass test cases. Click "Show Hint" if needed!', 'error');
        }
      } catch (err: any) {
        setRuntimeError(err.message || 'Syntax Error in user code');
        addToast(`Code evaluation error: ${err.message}`, 'error');
      }
    }, 800);
  };

  return (
    <div
      className={`relative transition-all duration-300 ${
        focusMode
          ? 'fixed inset-0 z-50 bg-[#060b0a] p-6 flex flex-col justify-between overflow-y-auto'
          : 'w-full space-y-4'
      }`}
    >
      {/* LeetCode Style Problem & Navigation Bar */}
      <div className="bg-[#0f1715]/90 border border-[#1e293b] rounded-2xl p-4 backdrop-blur-md space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1e293b] pb-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#f59e0b]" /> {currentTask.title}
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
              currentTask.difficulty === 'Easy' ? 'bg-[#10b981]/20 text-[#10b981]' :
              currentTask.difficulty === 'Medium' ? 'bg-[#f59e0b]/20 text-[#f59e0b]' : 'bg-[#e11d48]/20 text-[#e11d48]'
            }`}>
              {currentTask.difficulty || 'Easy'}
            </span>
            <span className="text-[10px] text-gray-400 font-mono">Acceptance: {currentTask.acceptance || '85%'}</span>
          </div>

          {/* Tab Controls */}
          <div className="flex items-center gap-2 text-xs font-medium">
            <button
              onClick={() => setActiveTab('problem')}
              className={`px-3 py-1 rounded-lg transition-colors ${activeTab === 'problem' ? 'bg-[#182333] text-[#f59e0b]' : 'text-gray-400 hover:text-white'}`}
            >
              Problem
            </button>
            <button
              onClick={() => setActiveTab('hints')}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1 ${activeTab === 'hints' ? 'bg-[#182333] text-[#f59e0b]' : 'text-gray-400 hover:text-white'}`}
            >
              <Lightbulb className="w-3.5 h-3.5" /> Hints
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1 ${activeTab === 'submissions' ? 'bg-[#182333] text-[#f59e0b]' : 'text-gray-400 hover:text-white'}`}
            >
              <History className="w-3.5 h-3.5" /> Submissions ({submissionHistory.length})
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'problem' && (
          <p className="text-xs text-gray-300 leading-relaxed">{currentTask.instructions}</p>
        )}

        {activeTab === 'hints' && (
          <div className="space-y-2 text-xs text-gray-300">
            <div className="font-semibold text-[#f59e0b] flex items-center gap-1">
              <Lightbulb className="w-4 h-4" /> Algorithmic Guidance
            </div>
            {currentTask.hints && currentTask.hints.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                {currentTask.hints.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            ) : (
              <p>Break down the input array, iterate through elements, and accumulate the target values.</p>
            )}
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="space-y-2 text-xs font-mono">
            {submissionHistory.length === 0 ? (
              <p className="text-gray-500">No submissions yet for this session.</p>
            ) : (
              submissionHistory.map((sub, i) => (
                <div key={i} className="flex justify-between items-center p-2 rounded bg-[#0b1311] border border-[#1e293b]">
                  <span className={sub.status === 'Accepted' ? 'text-[#10b981] font-bold' : 'text-[#e11d48] font-bold'}>
                    {sub.status}
                  </span>
                  <span className="text-gray-400">{sub.passedCount} Passed</span>
                  <span className="text-gray-500">{sub.time}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Editor Terminal Frame */}
      <div className="bg-[#0b1311] border border-[#1e293b] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 bg-[#0f1715] border-b border-[#1e293b]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#e11d48]" />
            <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
            <span className="w-3 h-3 rounded-full bg-[#10b981]" />
            <span className="ml-3 text-xs font-mono text-gray-400">solution.js</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFocusMode(!focusMode)}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              title={focusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
            >
              {focusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setCode(currentTask.starter_code)}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              title="Reset Code"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Code Input Area with Line Numbers */}
        <div className="relative flex min-h-[260px] bg-[#070d0b] font-mono text-sm text-gray-200">
          <div className="w-10 py-4 select-none text-right pr-3 text-gray-600 bg-[#09100e] border-r border-[#1e293b]">
            {code.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            className="w-full h-full p-4 bg-transparent text-gray-100 font-mono resize-none focus:outline-none leading-relaxed"
          />
        </div>

        {/* Test Controls & Runner Footer */}
        <div className="p-4 bg-[#0f1715] border-t border-[#1e293b] flex items-center justify-between">
          <div className="text-xs text-gray-400">
            Function: <span className="font-semibold text-white font-mono">{currentTask.functionName}()</span>
          </div>

          <RippleButton onClick={handleRunTests} disabled={isRunning} variant="gold">
            {isRunning ? (
              <div className="flex items-center gap-2">
                <span>Executing Sandbox</span>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounceDots" />
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounceDots [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounceDots [animation-delay:0.4s]" />
                </div>
              </div>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Run Test Suite</span>
              </>
            )}
          </RippleButton>
        </div>

        {runtimeError && (
          <div className="p-4 bg-[#2a0e14] border-t border-[#e11d48]/40 text-[#fecdd3] text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#e11d48] shrink-0" />
            <span>{runtimeError}</span>
          </div>
        )}

        {testResults && (
          <div className="p-4 bg-[#070d0b] border-t border-[#1e293b] space-y-2 animate-fadeIn">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Test Assertions Evaluation
            </div>
            {testResults.map((res: any, i: number) => (
              <div
                key={i}
                className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
                  res.passed
                    ? 'bg-[#0f1f18] border-[#10b981]/30 text-[#a7f3d0]'
                    : 'bg-[#2a0e14] border-[#e11d48]/30 text-[#fecdd3]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${res.passed ? 'text-[#10b981]' : 'text-[#e11d48]'}`} />
                  <span>{res.name}</span>
                </div>
                <span className="text-[10px] opacity-80">{res.details}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
