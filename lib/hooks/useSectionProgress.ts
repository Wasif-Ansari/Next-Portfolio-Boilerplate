"use client";
import { useCallback, useEffect, useRef, useState } from 'react';

// Tracks a section's scroll progress (0 at enter, 1 at exit) for depth/parallax effects.
export function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);
  const update = useCallback(() => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height + vh; // distance from before entering to after leaving
    const scrolled = vh - rect.top;
    const p = Math.min(1, Math.max(0, scrolled / total));
    setProgress(p);
  }, []);
  useEffect(() => {
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [update]);
  return { ref, progress } as const;
}
