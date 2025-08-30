"use client";
import { timeline } from '@/lib/data/resume';
import { formatDate } from '@/lib/utils';
import { SectionHeading } from './section-heading';
import { useState, useMemo } from 'react';
import { useSectionProgress } from '@/lib/hooks/useSectionProgress';
import { motion, useReducedMotion } from 'framer-motion';

export function Resume() {
  const reduce = useReducedMotion();
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const depthScale = useMemo(() => (p: number, idx: number) => {
    const base = 1 - p * 0.15;
    const offset = (idx % 2 === 0 ? -1 : 1) * p * 20; // horizontal drift
    const z = (idx * -40) + p * 120; // translateZ dynamic layering
    return { base, offset, z };
  }, []);
  return (
    <section id="resume" className="py-28 relative perspective-1200">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <SectionHeading eyebrow="Experience" title="Impact & growth timeline" description={<span>Selected roles & milestones—focused on shipped value, technical depth, and collaborative leverage.</span>} />
        <div className="mt-16 relative">
          <ol className="hidden md:grid grid-cols-9 gap-8 [transform-style:preserve-3d]">
            {timeline.map((item, idx) => {
              const left = idx % 2 === 0;
              const { base, offset, z } = depthScale(progress, idx);
              return (
                <motion.li
                  key={item.id}
                  style={{
                    transform: `translateZ(${z}px) translateX(${offset}px) scale(${base}) rotateY(${left? -progress*12: progress*12}deg) rotateX(${progress*6}deg)` ,
                    opacity: 0.25 + (1 - Math.min(1, Math.abs(z) / 240)) * 0.75,
                  }}
                  initial={{ opacity: 0, y: 40, rotateY: left ? -25 : 25, rotateX: 10 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={reduce ? {} : { scale: 1.05, z: 60, rotateX: -4, rotateY: left ? -6 : 6 }}
                  className={`col-span-9 md:col-span-4 ${left ? 'md:col-start-1' : 'md:col-start-6'} relative will-change-transform [transform-style:preserve-3d]`}
                >
                  <div className={`p-6 rounded-3xl border border-border/60 bg-background/60 backdrop-blur hover:border-primary/40 transition group shadow-soft relative overflow-hidden`}> 
                    <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_25%,hsl(var(--primary)/0.15),transparent_70%)]" />
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-semibold tracking-tight">{item.title}</h3>
                      <span className="text-sm text-muted-foreground font-medium">{item.org}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{formatDate(item.start)} – {item.end ? formatDate(item.end) : 'Present'}</span>
                    </div>
                    {item.description && <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>}
                    {item.highlights && (
                      <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                        {item.highlights.slice(0, 4).map(h => <li key={h} className="flex gap-2"><span className="text-primary">•</span><span>{h}</span></li>)}
                      </ul>
                    )}
                  </div>
                  <span className={`hidden md:block absolute top-6 ${left ? 'right-[-37px]' : 'left-[-37px]'} w-5 h-5 rounded-full bg-gradient-to-br from-primary via-fuchsia-500 to-indigo-500 ring-4 ring-background`} />
                </motion.li>
              );
            })}
          </ol>
          {/* Mobile stacked timeline */}
          <div className="md:hidden space-y-6">
            {timeline.map(item => (
              <MobileTimelineItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-14 flex">
            <a href="/resume.pdf" className="mx-auto px-7 py-4 rounded-2xl bg-gradient-to-br from-primary via-fuchsia-500 to-indigo-500 text-primary-foreground font-medium shadow hover:shadow-lg relative group overflow-hidden">
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_30%,white_0%,transparent_60%)] mix-blend-overlay" />
              Download full PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

interface MobileProps { item: typeof timeline[number]; }
function MobileTimelineItem({ item }: MobileProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border/60 bg-background/60 backdrop-blur">
      <button onClick={() => setOpen(o => !o)} className="w-full text-left px-5 py-4 flex items-start gap-3">
        <span className="mt-1 w-2 h-2 rounded-full bg-gradient-to-br from-primary via-fuchsia-500 to-indigo-500" />
        <div className="flex-1">
          <div className="font-medium tracking-tight">{item.title}</div>
          <div className="text-xs text-muted-foreground font-medium">{item.org} • {formatDate(item.start)} – {item.end ? formatDate(item.end) : 'Present'}</div>
          {open && item.description && <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{item.description}</p>}
          {open && item.highlights && (
            <ul className="mt-2 space-y-1 text-[11px] text-muted-foreground">
              {item.highlights.map(h => <li key={h} className="flex gap-2"><span className="text-primary">•</span><span>{h}</span></li>)}
            </ul>
          )}
        </div>
        <span className="text-xs text-muted-foreground ml-2 mt-1">{open ? '–' : '+'}</span>
      </button>
    </div>
  );
}
