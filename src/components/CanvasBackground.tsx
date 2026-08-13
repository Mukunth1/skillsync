import React, { useEffect, useRef } from 'react';

interface CanvasBackgroundProps {
  dense?: boolean;
}

export default function CanvasBackground({ dense = false }: CanvasBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Particles
    const count = dense ? 120 : 70;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? '#f59e0b' : Math.random() > 0.5 ? '#38bdf8' : '#e11d48',
      alpha: Math.random() * 0.5 + 0.2
    }));

    // 3D Wireframe Icosahedron Projection Nodes
    let angleX = 0;
    let angleY = 0;

    const vertices3D = [
      [-1, 1.618, 0], [1, 1.618, 0], [-1, -1.618, 0], [1, -1.618, 0],
      [0, -1, 1.618], [0, 1, 1.618], [0, -1, -1.618], [0, 1, -1.618],
      [1.618, 0, -1], [1.618, 0, 1], [-1.618, 0, -1], [-1.618, 0, 1]
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Draw Particles & Connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 100) * 0.12;
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Draw 3D Wireframe Shape Projection in Background
      angleX += 0.005;
      angleY += 0.007;

      const scale = 110;
      const offsetX = width > 768 ? width * 0.8 : width / 2;
      const offsetY = height * 0.35;

      const projected = vertices3D.map(([x, y, z]) => {
        // Rotate X
        const y1 = y * Math.cos(angleX) - z * Math.sin(angleX);
        const z1 = y * Math.sin(angleX) + z * Math.cos(angleX);
        // Rotate Y
        const x2 = x * Math.cos(angleY) + z1 * Math.sin(angleY);
        const z2 = -x * Math.sin(angleY) + z1 * Math.cos(angleY);

        const mouseOffsetOffsetX = (mouse.x - width / 2) * 0.05;
        const mouseOffsetOffsetY = (mouse.y - height / 2) * 0.05;

        return {
          px: x2 * scale + offsetX + mouseOffsetOffsetX,
          py: y1 * scale + offsetY + mouseOffsetOffsetY
        };
      });

      // Draw Wireframe Lines
      ctx.save();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.22)';
      ctx.lineWidth = 1.2;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].px - projected[j].px;
          const dy = projected[i].py - projected[j].py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < scale * 2.2) {
            ctx.beginPath();
            ctx.moveTo(projected[i].px, projected[i].py);
            ctx.lineTo(projected[j].px, projected[j].py);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, [dense]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
