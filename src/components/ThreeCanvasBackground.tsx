import React from 'react';
import ParticleCanvas from './ParticleCanvas';

interface ThreeCanvasBackgroundProps {
  dense?: boolean;
}

export default function ThreeCanvasBackground({ dense = false }: ThreeCanvasBackgroundProps) {
  // Ultra-stable 2D Canvas background renderer guaranteed to work in all iframe previews and mobile browsers
  return <ParticleCanvas dense={dense} />;
}
