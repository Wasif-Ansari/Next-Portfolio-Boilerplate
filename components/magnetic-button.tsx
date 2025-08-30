"use client";
import { useRef, useEffect, ReactNode } from 'react';

interface MagneticButtonProps { children: ReactNode; className?: string; href?: string; asAnchor?: boolean; strength?: number; }

export function MagneticButton({ children, className = '', href, asAnchor = false, strength = 24 }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const wrapper = el.parentElement; if (!wrapper) return;
    const move = (e: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      const dx = (x / rect.width - 0.5) * 2; const dy = (y / rect.height - 0.5) * 2;
      el.animate({ transform: `translate(${dx * strength}px, ${dy * strength}px)` }, { duration: 300, fill: 'forwards', easing: 'cubic-bezier(.22,1,.36,1)' });
    };
    const leave = () => { el.animate({ transform: 'translate(0,0)' }, { duration: 500, fill: 'forwards', easing: 'cubic-bezier(.22,1,.36,1)' }); };
    wrapper.addEventListener('pointermove', move);
    wrapper.addEventListener('pointerleave', leave);
    return () => { wrapper.removeEventListener('pointermove', move); wrapper.removeEventListener('pointerleave', leave); };
  }, [strength]);
  const base = `magnetic-btn relative inline-flex items-center justify-center px-7 py-4 rounded-2xl font-medium overflow-hidden group ${className}`;
  const inner = <>
    <span className="absolute inset-0 bg-gradient-to-br from-primary via-fuchsia-500 to-indigo-500" />
    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_30%,white_0%,transparent_65%)] mix-blend-overlay" />
    <span className="relative">{children}</span>
  </>;
  if (asAnchor && href) return <div className="magnetic-wrapper inline-block"><a ref={ref as any} href={href} className={base}>{inner}</a></div>;
  return <div className="magnetic-wrapper inline-block"><button ref={ref as any} className={base}>{inner}</button></div>;
}
