import React, { useState } from 'react';

export default function LeetCodeActivityHeatmap() {
  // Generate mock 12 months x 7 days activity grid (52 weeks)
  const weeks = 52;
  const daysPerWeek = 7;
  
  const generateActivityData = () => {
    const data = [];
    for (let w = 0; w < weeks; w++) {
      const weekDays = [];
      for (let d = 0; d < daysPerWeek; d++) {
        // Higher activity on certain days
        const val = Math.random() > 0.65 ? Math.floor(Math.random() * 5) + 1 : 0;
        weekDays.push(val);
      }
      data.push(weekDays);
    }
    return data;
  };

  const [grid] = useState(generateActivityData());

  const getColor = (val: number) => {
    if (val === 0) return 'bg-[#182333]/60';
    if (val === 1) return 'bg-[#0e4429] border border-[#006d32]';
    if (val === 2) return 'bg-[#006d32] border border-[#26a641]';
    if (val === 3) return 'bg-[#26a641] shadow-[0_0_8px_rgba(38,166,65,0.4)]';
    return 'bg-[#f59e0b] shadow-[0_0_10px_rgba(245,158,11,0.6)]';
  };

  const totalSubmissions = grid.flat().reduce((acc, curr) => acc + (curr > 0 ? curr : 0), 0);

  return (
    <div className="bg-[#0b1311] border border-[#1e293b] rounded-3xl p-6 space-y-4 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1e293b] pb-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>🔥</span> Submission Activity Heatmap
          </h3>
          <p className="text-xs text-gray-400">
            <span className="text-[#f59e0b] font-bold font-mono">{totalSubmissions} submissions</span> in the last 12 months
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded bg-[#182333]" />
          <span className="w-2.5 h-2.5 rounded bg-[#0e4429]" />
          <span className="w-2.5 h-2.5 rounded bg-[#006d32]" />
          <span className="w-2.5 h-2.5 rounded bg-[#26a641]" />
          <span className="w-2.5 h-2.5 rounded bg-[#f59e0b]" />
          <span>More</span>
        </div>
      </div>

      {/* Heatmap Grid Container */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1 min-w-[680px]">
          {grid.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1">
              {week.map((val, dIdx) => (
                <div
                  key={dIdx}
                  title={`${val} submissions on week ${wIdx + 1}, day ${dIdx + 1}`}
                  className={`w-3 h-3 rounded-[3px] transition-all hover:scale-125 hover:z-10 ${getColor(val)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
