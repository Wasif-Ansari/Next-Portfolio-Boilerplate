"use client";
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
const FooterScene = dynamic(()=>import('@/components/r3f/canvas-scene').then(m=>m.CanvasScene),{ssr:false});

const footerLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export function Footer() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const floatY = useTransform(scrollYProgress, [0,1], [0, -30]);
  const rotate = useTransform(scrollYProgress, [0,1], [0, 4]);
  return (
    <footer ref={ref} className="relative py-20 text-center text-sm text-muted-foreground border-t border-border/60 mt-24 overflow-hidden perspective-1200">
      <FooterScene />
      <motion.div style={{ y: floatY }} className="absolute inset-x-0 -top-20 h-64 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,hsl(var(--primary)/0.25),transparent_70%)]" />
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8">
        <motion.ul
          className="flex flex-wrap justify-center gap-6 text-xs font-medium uppercase tracking-wide [transform-style:preserve-3d]"
          style={{ rotateX: rotate }}
        >
          {footerLinks.map((l,i)=>(
            <motion.li
              key={l.href}
              whileHover={{ scale:1.18, rotateX:12, rotateY: i%2===0? -14:14, z:55 }}
              whileTap={{ scale:0.92 }}
              className="will-change-transform [transform-style:preserve-3d]"
            >
              <a href={l.href} className="px-3 py-1.5 rounded-xl border border-border/50 bg-background/60 backdrop-blur hover:border-primary/40 transition relative inline-block">
                <span className="relative z-10">{l.label}</span>
                <span aria-hidden className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 bg-gradient-to-br from-primary/20 to-fuchsia-500/20 blur transition" />
              </a>
            </motion.li>
          ))}
        </motion.ul>
        <motion.p
          initial={{ opacity:0, y:20, rotateX:10 }}
          whileInView={{ opacity:1, y:0, rotateX:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
          whileHover={{ scale:1.05, rotateX:8, rotateY:-6, z:40 }}
          className="will-change-transform [transform-style:preserve-3d]"
        >
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
