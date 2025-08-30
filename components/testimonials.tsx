"use client";
import { testimonials } from '@/lib/data/testimonials';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { SectionHeading } from './section-heading';
import dynamic from 'next/dynamic';
const CanvasSceneTestimonials = dynamic(()=>import('@/components/r3f/canvas-scene').then(m=>m.CanvasScene),{ssr:false});

export function Testimonials() {
  return (
    <section id="testimonials" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/5 to-background/40" />
      <CanvasSceneTestimonials />
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading align="center" eyebrow="Feedback" title="What collaborators say" description={<span>A few kind words from peers & stakeholders about collaboration, velocity, and quality.</span>} />
        <Carousel />
      </div>
    </section>
  );
}

function Carousel() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="mt-16">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${index * 100}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          style={{ width: `${testimonials.length * 100}%` }}
        >
          {testimonials.map(t => (
            <div key={t.id} className="w-full shrink-0 px-2 md:px-6">
              <figure className="p-8 rounded-3xl border border-border/60 bg-background/60 backdrop-blur relative overflow-hidden h-full flex flex-col">
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br from-primary/30 via-fuchsia-500/30 to-indigo-500/30 blur-3xl opacity-40" />
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-sm md:text-base leading-relaxed flex-1"
                >
                  “{t.quote}”
                </motion.p>
                <figcaption className="mt-6 text-xs font-medium text-muted-foreground">
                  — {t.name}, {t.role}
                </figcaption>
              </figure>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="mt-8 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${i === index ? 'bg-gradient-to-br from-primary via-fuchsia-500 to-indigo-500' : 'bg-border hover:bg-primary/40'}`}
          />
        ))}
      </div>
    </div>
  );
}
