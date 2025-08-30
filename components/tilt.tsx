"use client";
import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface TiltProps {
  children: ReactNode;
  className?: string;
  max?: number; // max tilt degrees
  glare?: boolean;
  scale?: number;
  transitionSpeed?: number; // ms
}

// Lightweight pointer-based 3D tilt with optional glare highlight.
export function Tilt({ children, className = '', max = 14, glare = true, scale = 1.02, transitionSpeed = 280 }: TiltProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const listener = () => setReduced(mq.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (!ref.current || reduced) return;
    const el = ref.current;
    const handlePointerMove = (e: PointerEvent) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width) - 0.5; // -0.5 .. 0.5
      const py = (y / rect.height) - 0.5;
      const rx = (+py * max * 2); // invert for natural tilt
      const ry = (-px * max * 2);
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
        if (glare) {
          const glareLayer = el.querySelector('[data-tilt-glare]') as HTMLDivElement | null;
          if (glareLayer) {
            const angle = Math.atan2(py, px) * 180 / Math.PI + 180;
            const intensity = (Math.hypot(px, py) * 2);
            glareLayer.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,${0.25 * intensity}), rgba(255,255,255,0) 70%)`;
            glareLayer.style.filter = `brightness(1.1) saturate(1.2) rotate(${angle}deg)`;
          }
        }
      });
    };
    const reset = () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      el.style.transition = `transform ${transitionSpeed}ms ease`;
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
      setTimeout(() => { if (el) el.style.transition = ''; }, transitionSpeed + 20);
      const glareLayer = el.querySelector('[data-tilt-glare]') as HTMLDivElement | null;
      if (glareLayer) glareLayer.style.background = 'transparent';
    };
    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerleave', reset);
    el.addEventListener('pointercancel', reset);
    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', reset);
      el.removeEventListener('pointercancel', reset);
    };
  }, [max, glare, scale, transitionSpeed, reduced]);

  return (
    <div ref={ref} className={`tilt-container will-change-transform ${className}`} style={{ transformStyle: 'preserve-3d' }}>
      {children}
      {glare && <div data-tilt-glare aria-hidden className="pointer-events-none absolute inset-0 rounded-inherit mix-blend-overlay" />}
    </div>
  );
}
