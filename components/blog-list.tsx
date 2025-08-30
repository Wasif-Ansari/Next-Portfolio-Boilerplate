"use client";
import Link from 'next/link';
import { posts } from '@/lib/data/posts';
import { formatDate } from '@/lib/utils';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

export function BlogList() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end","end start"] });
  const bgTranslate = useTransform(scrollYProgress, [0,1], [0, -120]);
  return (
    <section id="blog" ref={ref} className="py-24 relative overflow-hidden">
      <motion.div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-fuchsia-500/5 to-background" style={{ y: bgTranslate }} />
      <div className="max-w-5xl mx-auto px-6 perspective-1200">
        <h2 className="text-3xl font-bold tracking-tight mb-14">Blog</h2>
        <div className="space-y-12">
          {posts.map((p, idx) => (
            <BlogCard key={p.slug} post={p} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface BlogCardProps { post: typeof posts[number]; idx: number; }
function BlogCard({ post, idx }: BlogCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%","end 10%"] });
  const y = useTransform(scrollYProgress, [0,1], [60, -40]);
  const rotateY = useTransform(scrollYProgress, [0,1], [idx % 2 === 0 ? -15: 15, 0]);
  const rotateX = useTransform(scrollYProgress, [0,1], [8, 0]);
  return (
    <motion.article
      ref={ref}
      style={{ y, rotateY, rotateX }}
      initial={{ opacity: 0, y: 40, rotateY: idx % 2 === 0 ? -20 : 20, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: [0.22,1,0.36,1] }}
      className="group relative will-change-transform [transform-style:preserve-3d]"
    >
      <Link href={`/blog/${post.slug}`} className="block p-6 rounded-3xl border border-border/60 bg-background/60 backdrop-blur hover:border-primary/40 transition relative overflow-hidden">
        <span aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_25%,hsl(var(--primary)/0.15),transparent_70%)]" />
        <motion.h3
          whileHover={reduce ? {} : { scale: 1.04, rotateX: 8, rotateY: -6, z: 40 }}
          className="font-semibold tracking-tight text-lg group-hover:text-primary transition-colors [transform-style:preserve-3d]"
        >{post.title}</motion.h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{post.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2 items-center text-[11px] text-muted-foreground">
          <time>{formatDate(post.date)}</time>
          {post.tags.map(t => (
            <motion.span
              key={t}
              whileHover={reduce ? {} : { scale: 1.2, rotateY: 180, z: 30 }}
              className="px-2 py-0.5 rounded-full bg-muted uppercase font-medium tracking-wide [transform-style:preserve-3d]"
            >{t}</motion.span>
          ))}
        </div>
      </Link>
    </motion.article>
  );
}
