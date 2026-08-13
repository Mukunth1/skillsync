import React, { useState } from 'react';

interface WindingTrailProps {
  milestones?: any[];
  onSelectNode?: (node: any) => void;
  activeNodeId?: string | number;
  onLaunchChallenge?: (node: any, e: React.MouseEvent) => void;
}

export default function WindingTrail({ milestones = [], onSelectNode, activeNodeId, onLaunchChallenge }: WindingTrailProps) {
  const [bouncingNodeId] = useState<any>(null);

  const svgWidth = 800;
  const svgHeight = 650;

  const getNodeCoordinates = (index: number, total: number) => {
    const padding = 100;
    const usableHeight = svgHeight - 2 * padding;
    const stepY = total > 1 ? usableHeight / (total - 1) : 0;
    
    const y = padding + index * stepY;
    const x = svgWidth / 2 + Math.sin(index * 1.5) * 220;
    return { x, y };
  };

  const points = milestones.map((_, i) => getNodeCoordinates(i, milestones.length));

  let pathD = '';
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const midY = (p1.y + p2.y) / 2;
      pathD += ` C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
    }
  }

  const handleNodeBtnClick = (m: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLaunchChallenge) onLaunchChallenge(m, e);
  };

  const activeIndex = milestones.findIndex(m => m.id === activeNodeId || m.status === 'active');
  const activeCoord = activeIndex >= 0 ? points[activeIndex] : null;

  return (
    <div className="relative w-full max-w-4xl mx-auto py-8">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto overflow-visible"
        style={{ filter: 'drop-shadow(0 0 20px rgba(11, 19, 17, 0.8))' }}
      >
        <defs>
          <linearGradient id="trailGoldGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
          </linearGradient>

          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <path
          d={pathD}
          fill="none"
          stroke="#1e293b"
          strokeWidth="14"
          strokeLinecap="round"
        />

        <path
          d={pathD}
          fill="none"
          stroke="url(#trailGoldGlow)"
          strokeWidth="6"
          strokeLinecap="round"
          className="animate-drawPath"
          strokeDasharray="2000"
          strokeDashoffset="0"
        />

        {points.slice(0, -1).map((pt, i) => {
          const nextPt = points[i + 1];
          const midX = (pt.x + nextPt.x) / 2;
          const midY = (pt.y + nextPt.y) / 2;
          return (
            <g key={`arrow-${i}`} className="animate-pulse">
              <circle cx={midX} cy={midY} r="4" fill="#f59e0b" opacity="0.6" />
            </g>
          );
        })}

        {activeCoord && (
          <g className="pointer-events-none">
            <circle
              cx={activeCoord.x}
              cy={activeCoord.y}
              r="34"
              fill="rgba(245, 158, 11, 0.18)"
              className="animate-ping"
            />
            <circle
              cx={activeCoord.x}
              cy={activeCoord.y}
              r="26"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-spin-slow"
            />
          </g>
        )}

        {milestones.map((m, idx) => {
          const coord = points[idx];
          if (!coord) return null;

          const isCompleted = m.status === 'completed';
          const isActive = m.status === 'active' || m.id === activeNodeId;
          const isBouncing = bouncingNodeId === m.id;

          return (
            <g
              key={m.id}
              transform={`translate(${coord.x}, ${coord.y})`}
              className="cursor-pointer group"
              onClick={() => onSelectNode && onSelectNode(m)}
            >
              <circle
                r={isActive ? "22" : "18"}
                fill={isCompleted ? "#f59e0b" : isActive ? "#38bdf8" : "#1e293b"}
                opacity={isCompleted ? 0.35 : isActive ? 0.45 : 0.2}
                filter="url(#nodeGlow)"
              />

              <circle
                r={isActive ? "18" : "15"}
                fill={isCompleted ? "#f59e0b" : isActive ? "#0b1311" : "#1e293b"}
                stroke={isCompleted ? "#fbbf24" : isActive ? "#38bdf8" : "#475569"}
                strokeWidth={isActive ? "3.5" : "2.5"}
                className={`transition-all duration-300 ${
                  isBouncing ? 'animate-bounceScale' : 'group-hover:scale-125'
                }`}
              />

              <text
                textAnchor="middle"
                dy="4"
                fontSize="12"
                fontWeight="bold"
                fill={isCompleted ? "#000" : isActive ? "#38bdf8" : "#94a3b8"}
                className="pointer-events-none select-none"
              >
                {isCompleted ? '✓' : idx + 1}
              </text>

              <foreignObject
                x={idx % 2 === 0 ? "28" : "-208"}
                y="-24"
                width="180"
                height="65"
                className="overflow-visible"
              >
                <div
                  className={`p-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#0f1f18]/90 border-[#10b981]/40 text-[#a7f3d0]'
                      : isActive
                      ? 'bg-[#182333]/90 border-[#38bdf8]/50 text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                      : 'bg-[#0b1311]/80 border-[#1e293b] text-gray-400 group-hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold truncate max-w-[110px]">{m.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 font-mono text-[#f59e0b]">
                      +{m.xp_reward || 50} XP
                    </span>
                  </div>

                  {!isCompleted ? (
                    <button
                      onClick={(e) => handleNodeBtnClick(m, e)}
                      className="mt-1.5 w-full text-[10px] py-0.5 rounded bg-[#f59e0b]/20 hover:bg-[#f59e0b] text-[#f59e0b] hover:text-black font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      {m.type === 'quiz' ? 'Take Quiz' : 'Solve Code Task'}
                    </button>
                  ) : (
                    <div className="mt-1 text-[10px] text-[#10b981] font-semibold flex items-center gap-1">
                      ✓ Completed
                    </div>
                  )}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
