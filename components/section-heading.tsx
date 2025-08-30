"use client";
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  align?: 'left' | 'center';
  description?: ReactNode;
  className?: string;
}

export function SectionHeading({ title, eyebrow, description, align = 'left', className = '' }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`w-full ${align === 'center' ? 'text-center mx-auto' : ''} ${className}`}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary/80 dark:text-primary/70 mb-3 bg-primary/10 dark:bg-primary/15 px-3 py-1 rounded-full border border-primary/20">
          {eyebrow}
        </span>
      )}
      <h2 className={`section-heading text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-primary via-fuchsia-500 to-indigo-500 ${align === 'center' ? 'mx-auto' : ''}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-muted-foreground leading-relaxed max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>{description}</p>
      )}
    </motion.div>
  );
}
