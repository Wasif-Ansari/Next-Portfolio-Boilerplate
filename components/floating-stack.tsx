"use client";
import { motion } from 'framer-motion';

// Floating layered stack to showcase subtle 3D perspective.
export function FloatingStack() {
  const layers = [
    { id: 'core', title: 'Core', items: ['TypeScript', 'React', 'Next.js'] },
    { id: 'platform', title: 'Platform', items: ['Node', 'Edge', 'CI/CD'] },
    { id: 'experience', title: 'Experience', items: ['DX', 'A11y', 'Perf'] },
  ];
  return (
    <div className="relative w-full max-w-md mx-auto perspective-1200">
      {layers.map((l, i) => (
        <motion.div
          key={l.id}
          initial={{ opacity: 0, y: 60, rotateX: -25, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotateX: -8 - i * 4, scale: 1 - i * 0.03 }}
          transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
          className="relative rounded-3xl border border-border/60 bg-background/70 backdrop-blur p-6 md:p-8 shadow-soft origin-center will-change-transform floating-layer"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-3">{l.title}</div>
          <ul className="flex flex-wrap gap-2 text-xs font-medium">
            {l.items.map(it => (
              <li key={it} className="px-3 py-2 rounded-lg border border-border/50 bg-background/50">{it}</li>
            ))}
          </ul>
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1.2, delay: 0.5 + i * 0.1 }}
            style={{ background: 'linear-gradient(120deg, hsla(var(--primary)/0.12), transparent 70%)' }}
          />
        </motion.div>
      ))}
    </div>
  );
}
