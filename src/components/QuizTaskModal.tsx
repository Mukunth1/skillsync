import React, { useState } from 'react';
import { CheckCircle2 as CheckIcon, XCircle as CrossIcon, Sparkles as SparkleIcon, Trophy as TrophyIcon, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import RippleButton from './RippleButton';
import { triggerConfettiBurst } from '../lib/confetti';
import { useToast } from '../contexts/ToastContext';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizTaskModalProps {
  quiz: {
    title: string;
    questions: QuizQuestion[];
    xp_reward: number;
  };
  onComplete: () => void;
  onClose: () => void;
}

export default function QuizTaskModal({ quiz, onComplete, onClose }: QuizTaskModalProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<{ [key: number]: boolean }>({});
  const [isFinished, setIsFinished] = useState(false);
  const { addToast } = useToast();

  const currentQ = quiz.questions[currentIdx] || quiz.questions[0];
  const selectedOption = selectedAnswers[currentIdx] ?? null;
  const isSubmitted = submittedQuestions[currentIdx] || false;

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: idx }));
  };

  const handleSubmitCurrent = () => {
    if (selectedOption === null) return;
    setSubmittedQuestions(prev => ({ ...prev, [currentIdx]: true }));
  };

  const handleNext = () => {
    if (currentIdx + 1 < quiz.questions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Evaluate all 30 questions
      let correctCount = 0;
      quiz.questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctAnswer) {
          correctCount++;
        }
      });

      setIsFinished(true);
      const passed = correctCount >= Math.ceil(quiz.questions.length * 0.6);

      if (passed) {
        addToast(`🎉 Level Cleared! Scored ${correctCount}/${quiz.questions.length} | +${quiz.xp_reward} XP Earned!`, 'success');
        triggerConfettiBurst(window.innerWidth / 2, window.innerHeight / 2);
        onComplete();
      } else {
        addToast(`Scored ${correctCount}/${quiz.questions.length}. Need at least 60% to clear this level. Try again!`, 'error');
      }
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b1311] border border-[#1e293b] rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative animate-flyInBottom max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1e293b] pb-4">
          <div className="flex items-center gap-2">
            <SparkleIcon className="w-5 h-5 text-[#f59e0b]" />
            <div>
              <h2 className="text-lg font-bold text-white">{quiz.title}</h2>
              <span className="text-[10px] font-mono text-[#f59e0b]">30 Questions Challenge</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-sm p-1">
            ✕
          </button>
        </div>

        {!isFinished ? (
          <div className="space-y-6">
            {/* Question Selector Grid Bar */}
            <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto p-2 rounded-xl bg-[#0f1715] border border-[#1e293b]">
              {quiz.questions.map((_, i) => {
                const isCurrent = i === currentIdx;
                const isAns = selectedAnswers[i] !== undefined;
                const isSub = submittedQuestions[i];

                let bg = 'bg-[#182333] text-gray-400';
                if (isCurrent) bg = 'bg-[#f59e0b] text-black font-bold ring-2 ring-white';
                else if (isSub) bg = 'bg-[#10b981] text-black font-semibold';
                else if (isAns) bg = 'bg-[#38bdf8] text-black font-semibold';

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`w-6 h-6 rounded text-[10px] font-mono flex items-center justify-center transition-all ${bg}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            {/* Question Progress Header */}
            <div className="flex justify-between items-center text-xs font-mono text-gray-400 border-b border-[#1e293b]/60 pb-2">
              <span className="text-white font-bold">Question {currentIdx + 1} of {quiz.questions.length}</span>
              <span className="text-[#f59e0b] font-semibold">Pass Threshold: 60%</span>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = 'bg-[#0f1715] border-[#1e293b] text-gray-200 hover:border-gray-500';
                if (selectedOption === idx) {
                  btnStyle = 'bg-[#182333] border-[#f59e0b] text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]';
                }
                if (isSubmitted) {
                  if (idx === currentQ.correctAnswer) {
                    btnStyle = 'bg-[#0f1f18] border-[#10b981] text-[#a7f3d0]';
                  } else if (selectedOption === idx && idx !== currentQ.correctAnswer) {
                    btnStyle = 'bg-[#2a0e14] border-[#e11d48] text-[#fecdd3]';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmitted && idx === currentQ.correctAnswer && (
                      <CheckIcon className="w-5 h-5 text-[#10b981]" />
                    )}
                    {isSubmitted && selectedOption === idx && idx !== currentQ.correctAnswer && (
                      <CrossIcon className="w-5 h-5 text-[#e11d48]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box on submission */}
            {isSubmitted && (
              <div className="p-4 rounded-xl bg-[#0f1715] border border-[#1e293b] text-xs text-gray-300 space-y-1">
                <span className="font-bold text-[#f59e0b]">Solution Explanation:</span>
                <p>{currentQ.explanation}</p>
              </div>
            )}

            {/* Footer Navigation Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-[#1e293b]">
              <RippleButton
                onClick={handlePrev}
                disabled={currentIdx === 0}
                variant="slate"
                className="text-xs py-2.5"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </RippleButton>

              {!isSubmitted ? (
                <RippleButton
                  onClick={handleSubmitCurrent}
                  disabled={selectedOption === null}
                  variant="gold"
                  className="text-xs py-2.5"
                >
                  Submit Answer
                </RippleButton>
              ) : (
                <RippleButton onClick={handleNext} variant="gold" className="text-xs py-2.5">
                  <span>{currentIdx + 1 < quiz.questions.length ? 'Next Question' : 'Complete 30-Q Quiz'}</span>
                  <ChevronRight className="w-4 h-4" />
                </RippleButton>
              )}
            </div>
          </div>
        ) : (
          /* Quiz Results Overview */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] mx-auto flex items-center justify-center">
              <TrophyIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">30-Question Evaluation Complete!</h3>
            <p className="text-sm text-gray-300">
              You correctly answered{' '}
              <span className="text-[#f59e0b] font-bold font-mono">
                {Object.keys(selectedAnswers).filter(k => selectedAnswers[Number(k)] === quiz.questions[Number(k)].correctAnswer).length} / {quiz.questions.length}
              </span>{' '}
              questions.
            </p>

            <div className="pt-4 flex justify-center">
              <RippleButton onClick={onClose} variant="gold" className="text-xs py-2.5">
                Return to Aptitude Trail
              </RippleButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
