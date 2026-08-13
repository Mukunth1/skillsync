import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'gold' | 'slate' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  /** Shows a spinner and auto-disables. */
  loading?: boolean;
  /** Optional left-side icon (Lucide). */
  icon?: React.ComponentType<{ className?: string }>;
  /** ARIA label for icon-only buttons. */
  ariaLabel?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const sizeMap = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-sm',
} as const;

const variantMap = {
  gold:    'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black font-semibold hover:brightness-110 shadow-[0_0_20px_rgba(245,158,11,0.3)]',
  slate:   'bg-[#1e293b] text-white hover:bg-[#334155] border border-gray-700',
  danger:  'bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white font-semibold hover:brightness-110',
  ghost:   'bg-transparent text-[var(--text-secondary)] hover:text-white hover:bg-white/5 border border-transparent',
} as const;

export default function RippleButton({
  children,
  onClick,
  className = '',
  type = 'button',
  variant = 'gold',
  size = 'md',
  disabled = false,
  loading = false,
  icon: Icon,
  ariaLabel,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const isDisabled = disabled || loading;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      className={`relative overflow-hidden rounded-xl transition-transform duration-150
        active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none will-change-transform
        ${variantMap[variant]} ${sizeMap[size]} ${className}`}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute bg-white/40 rounded-full animate-ripple pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: r.x,
            top: r.y,
            width: 140,
            height: 140,
          }}
        />
      ))}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        ) : Icon ? (
          <Icon className="w-4 h-4" aria-hidden="true" />
        ) : null}
        {!loading && children}
      </span>
    </button>
  );
}
