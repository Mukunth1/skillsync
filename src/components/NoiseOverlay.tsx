import React from 'react';

interface NoiseOverlayProps {
  enabled: boolean;
  onToggle?: () => void;
}

export default function NoiseOverlay({ enabled }: NoiseOverlayProps) {
  return (
    <>
      <svg className="hidden">
        <filter id="feTurbulenceNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      {enabled && (
        <div
          className="fixed inset-0 pointer-events-none z-[40] opacity-[0.035] mix-blend-overlay"
          style={{ filter: 'url(#feTurbulenceNoise)' }}
        />
      )}
    </>
  );
}
