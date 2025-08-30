"use client";
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';
import { OrbField } from '@/components/orb-field';
import { FloatingStack } from '@/components/floating-stack';
import dynamic from 'next/dynamic';
const HeroScene = dynamic(()=>import('@/components/r3f/hero-scene').then(m=>m.HeroScene), { ssr:false });
import { MagneticButton } from '@/components/magnetic-button';

export function Hero() {
  return (
  <section id="hero" className="relative overflow-hidden pt-40 pb-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary))/18%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,hsl(var(--fuchsia-500,296_83%_40%))/25%,transparent_65%)] opacity-70" />
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2.4 }}
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{ background: 'repeating-linear-gradient(60deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 2px, transparent 2px, transparent 6px)' }}
        />
      </div>
  <OrbField density={18} />
  <HeroScene />
  <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 relative">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }} className="relative z-10 text-center lg:text-left">
            <SectionHeading
              title="Hi, I'm Your Name"
              eyebrow="Full‑Stack Engineer"
              align="left"
              description={<span>Building resilient, user‑obsessed products with TypeScript, React, and cloud native architectures.</span>}
            />
            <div className="mt-10 flex flex-col sm:flex-row gap-8 lg:justify-start justify-center perspective-1200">
              <motion.div whileHover={{ scale: 1.08, rotateX: 15, rotateY: -12, rotateZ: 1, z: 60 }} whileTap={{ scale: 0.94 }} className="[transform-style:preserve-3d] will-change-transform">
                <MagneticButton asAnchor href="#projects">View Projects</MagneticButton>
              </motion.div>
              <motion.a
                whileHover={{ scale: 1.1, rotateX: 12, rotateY: 10, rotateZ: -2, z: 50 }}
                whileTap={{ scale: 0.93 }}
                href="/resume.pdf"
                className="group relative inline-flex items-center justify-center px-7 py-4 rounded-2xl font-medium border border-border/60 bg-background/60 backdrop-blur overflow-hidden [transform-style:preserve-3d] will-change-transform"
              >
                <span className="absolute inset-0 bg-gradient-to-br from-primary/30 via-fuchsia-500/25 to-indigo-500/25 opacity-0 group-hover:opacity-100 transition" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_25%,white_10%,transparent_65%)] mix-blend-overlay" />
                <span className="relative">Download Resume</span>
              </motion.a>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-sm lg:max-w-none lg:grid-cols-3 text-center lg:text-left">
              {[
                { label: 'Years', value: '5+' },
                { label: 'Projects', value: '40+' },
                { label: 'OSS Stars', value: '1k+' }
              ].map(stat => (
                <div key={stat.label} className="p-4 rounded-xl border border-border/50 bg-background/40 backdrop-blur">
                  <div className="text-2xl font-bold bg-gradient-to-br from-primary via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="mt-1 text-xs tracking-wide font-medium text-muted-foreground uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }} className="flex-1 w-full relative">
          <FloatingStack />
        </motion.div>
      </div>
    </section>
  );
}
