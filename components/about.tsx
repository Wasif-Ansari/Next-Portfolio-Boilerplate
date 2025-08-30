"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { skillCategories } from '@/lib/data/skills';
import { SectionHeading } from './section-heading';
import { Tilt } from './tilt';

export function About() {
  // scroll-based subtle float for descriptive text
  const { scrollYProgress } = useScroll({ offset: ["start end", "end start"] });
  const floatY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const floatRotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)] bg-gradient-to-b from-primary/10 via-fuchsia-500/5 to-transparent" />
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="About"
          title="Engineering craft + product thinking"
          description={<motion.span style={{ y: floatY, rotateZ: floatRotate }} className="block will-change-transform">I thrive at the intersection of high‑level architecture & fine‑grained interaction detail—bridging product intent and technical execution with empathy for both users and developers.</motion.span>}
        />
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="p-8 rounded-3xl border border-border/60 bg-background/60 backdrop-blur relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/30 via-fuchsia-500/30 to-indigo-500/30 rounded-full blur-3xl opacity-40" />
            <h3 className="font-semibold tracking-tight text-lg">Principles</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">•</span><span>Design systems &gt; pages. Reuse is leverage.</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span>Measure before optimizing; ship intentional slices.</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span>Accessibility & performance are table stakes, not polish.</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span>Explicitness and constraints sustain velocity.</span></li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="p-8 rounded-3xl border border-border/60 bg-background/60 backdrop-blur">
            <h3 className="font-semibold tracking-tight text-lg">Skills snapshot</h3>
            <div className="mt-6 space-y-6">
              {skillCategories.slice(0, 2).map(cat => (
                <div key={cat.category}>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{cat.category}</div>
                  <ul className="space-y-3">
                    {cat.skills.slice(0, 5).map(s => (
                      <motion.div
                        key={s.name}
                        whileHover={{ scale: 1.06, rotateX: 14, rotateY: -10, rotateZ: 2, z: 45 }}
                        whileTap={{ scale: 0.96 }}
                        className="[transform-style:preserve-3d] will-change-transform"
                      >
                        <Tilt className="group block">
                          <li className="group p-3 rounded-xl border border-border/50 bg-background/50 backdrop-blur relative overflow-hidden">
                            <div className="flex justify-between text-xs font-medium"><span>{s.name}</span><span className="text-muted-foreground">{s.level}%</span></div>
                            <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${s.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.1, ease: 'easeOut' }}
                                className="h-full bg-gradient-to-r from-primary via-fuchsia-500 to-indigo-500"
                              />
                            </div>
                            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-primary/10 to-fuchsia-500/10 transition" />
                          </li>
                        </Tilt>
                      </motion.div>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="p-8 rounded-3xl border border-border/60 bg-background/60 backdrop-blur flex flex-col">
            <h3 className="font-semibold tracking-tight text-lg">Stack breadth</h3>
            <div className="mt-6 grid grid-cols-3 gap-3 text-xs font-medium">
              {skillCategories.flatMap(c => c.skills.map(s => s.name)).slice(0, 18).map(skill => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.12, rotateX: 18, rotateY: -12, z: 40 }}
                  whileTap={{ scale: 0.94 }}
                  className="px-3 py-2 rounded-lg border border-border/50 bg-background/40 hover:border-primary/40 transition text-center truncate [transform-style:preserve-3d] will-change-transform"
                >{skill}</motion.span>
              ))}
            </div>
            <div className="mt-auto pt-6 text-[11px] text-muted-foreground">Full skill matrix available on request.</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
