import React, { useState } from 'react';
import type { ComponentType } from 'react';

interface FloatingInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: ComponentType<{ className?: string }>;
  placeholder?: string;
  minLength?: number;
  /** Forwarded to the underlying <input> for password manager / autofill support. */
  autoComplete?: string;
}

export default function FloatingInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  icon: Icon,
  placeholder = '',
  minLength,
  autoComplete,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || (value && value.toString().length > 0);

  return (
    <div className="relative my-4">
      <div
        className={`relative flex items-center rounded-xl bg-[#0f1715]/80 backdrop-blur-md border transition-all duration-300 ${
          focused
            ? 'border-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.25)] text-white'
            : 'border-[#1e293b] text-gray-300 hover:border-gray-600'
        }`}
      >
        {Icon && (
          <div className="pl-4 text-gray-400">
            <Icon className={`w-5 h-5 transition-colors ${focused ? 'text-[#f59e0b]' : ''}`} />
          </div>
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          placeholder={focused ? placeholder : ''}
          className="w-full bg-transparent px-4 py-3.5 text-sm text-white focus:outline-none z-10"
        />

        <label
          htmlFor={id}
          className={`absolute left-10 pointer-events-none transition-all duration-200 ease-out z-20 ${
            isFloating
              ? '-top-2.5 left-3 bg-[#0b1311] px-2 text-xs font-semibold text-[#f59e0b] rounded'
              : 'top-3.5 left-11 text-sm text-gray-400'
          }`}
        >
          {label}
        </label>
      </div>
    </div>
  );
}
