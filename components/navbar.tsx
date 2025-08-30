'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';
import { motion, useReducedMotion } from 'framer-motion';

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#resume', label: 'Resume' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const reduce = useReducedMotion();
  const floatAnim = reduce ? {} : { y: [0, -2, 0, 2, 0] };
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-background/60 border-b border-border/60"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-16 perspective-1200">
        <motion.div
          whileHover={{ scale: 1.18, rotateX: 14, rotateY: -10, rotateZ: 2, z: 55 }}
          whileTap={{ scale: 0.94 }}
          animate={floatAnim}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="[transform-style:preserve-3d] will-change-transform"
        >
          <Link href="/" className="font-bold tracking-tight text-lg block relative">
            <span className="relative z-10">DevPortfolio</span>
            <span aria-hidden className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition bg-gradient-to-br from-primary/10 to-fuchsia-500/10 blur" />
          </Link>
        </motion.div>
        <div className="hidden md:flex gap-6 text-sm [transform-style:preserve-3d]">
          {links.map(l => (
            <motion.a
              key={l.href}
              href={l.href}
              whileHover={{ scale: 1.2, rotateX: 16, rotateY: -12, rotateZ: 1.5, z: 60 }}
              whileTap={{ scale: 0.92 }}
              className={cn('transition-colors relative group [transform-style:preserve-3d] will-change-transform')}
              style={{ transformPerspective: 1200 }}
            >
              <span className="relative z-10 block px-1 py-0.5">{l.label}</span>
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary group-hover:w-full transition-all" />
              <span aria-hidden className="absolute inset-0 rounded-md bg-gradient-to-br from-primary/25 to-fuchsia-500/25 opacity-0 group-hover:opacity-100 blur-sm transition" />
              <span aria-hidden className="absolute -inset-3 rounded-xl bg-background/10 border border-border/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 -z-10 transition" />
            </motion.a>
          ))}
        </div>
        <div className="flex items-center gap-3 [transform-style:preserve-3d]">
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
