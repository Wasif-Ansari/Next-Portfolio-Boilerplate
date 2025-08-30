"use client";
import { useEffect, useRef, useState } from 'react';

// Animated soft orbs field with additive blend for subtle depth.
export function OrbField({ density = 14, className = '' }: { density?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const listener = () => setReduced(mq.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);
  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true }); if (!ctx) return;
    let w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    let h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    const orbs = Array.from({ length: density }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 60 + 40) * devicePixelRatio,
      dx: (Math.random() - 0.5) * 0.15 * devicePixelRatio,
      dy: (Math.random() - 0.5) * 0.15 * devicePixelRatio,
      hue: 250 + Math.random() * 80,
    }));
    let frame: number;
    const render = () => {
      frame = requestAnimationFrame(render);
      ctx.clearRect(0,0,w,h);
      ctx.globalCompositeOperation = 'lighter';
      for (const o of orbs) {
        o.x += o.dx; o.y += o.dy;
        if (o.x < -o.r) o.x = w + o.r; else if (o.x > w + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = h + o.r; else if (o.y > h + o.r) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue} 90% 60% / 0.35)`);
        g.addColorStop(0.6, `hsla(${o.hue} 90% 60% / 0.08)`);
        g.addColorStop(1, 'hsla(0 0% 0% / 0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2); ctx.fill();
      }
    };
    render();
    const resize = () => { w = canvas.width = canvas.offsetWidth * devicePixelRatio; h = canvas.height = canvas.offsetHeight * devicePixelRatio; };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, [density, reduced]);
  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full pointer-events-none opacity-60 mix-blend-screen ${className}`} />;
}
