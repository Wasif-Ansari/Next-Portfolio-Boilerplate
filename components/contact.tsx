'use client';
import { useState } from 'react';
import { SectionHeading } from './section-heading';
import { z } from 'zod';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
const ContactScene = dynamic(()=>import('@/components/r3f/contact-scene').then(m=>m.ContactScene), { ssr:false });

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export function Contact() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries()) as Record<string, string>;
    const parse = schema.safeParse(values);
    if (!parse.success) {
      setStatus(parse.error.issues[0].message);
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(parse.data) });
      if (!res.ok) throw new Error('Failed');
      setStatus('Message sent!');
      form.reset();
    } catch (e) {
      setStatus('Error sending message');
    } finally {
      setLoading(false);
    }
  }
  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <ContactScene />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,hsl(var(--primary))/12%,transparent_70%)]" />
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading align="center" eyebrow="Get in touch" title="Let’s build something impactful" description={<span>Have a challenge, opportunity, or idea? I’m open to selective freelance, collaboration, and product leadership roles.</span>} />
        <form onSubmit={handleSubmit} className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="md:col-span-1 space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">Name</label>
              <input name="name" required className="w-full px-4 py-3 rounded-2xl border border-border/60 bg-background/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-primary/40 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">Email</label>
              <input name="email" type="email" required className="w-full px-4 py-3 rounded-2xl border border-border/60 bg-background/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-primary/40 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">Message</label>
              <textarea name="message" rows={6} required className="w-full px-4 py-3 rounded-2xl border border-border/60 bg-background/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none transition" />
            </div>
            <div className="flex items-center gap-4 pt-2">
              <button disabled={loading} className="relative inline-flex items-center justify-center px-8 py-4 rounded-2xl font-medium text-primary-foreground disabled:opacity-50 overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-br from-primary via-fuchsia-500 to-indigo-500" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_30%,white_0%,transparent_65%)] mix-blend-overlay" />
                <span className="relative">{loading ? 'Sending…' : 'Send Message'}</span>
              </button>
              {status && <p className="text-xs text-muted-foreground">{status}</p>}
            </div>
          </div>
          <div className="md:col-span-1 flex flex-col rounded-3xl border border-border/60 bg-background/60 backdrop-blur p-8 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-primary/30 via-fuchsia-500/30 to-indigo-500/30 rounded-full blur-3xl opacity-40" />
            <h3 className="font-semibold tracking-tight text-lg">Signals</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">I&apos;m especially interested in developer tooling, design systems, and product experience work that blends performance, accessibility, and delightful execution.</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">•</span><span>Fractional product engineering</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span>Design system architecture</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span>Frontend platform leadership</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span><span>Performance & DX audits</span></li>
            </ul>
            <div className="mt-8 text-xs font-medium uppercase tracking-wider text-muted-foreground">Elsewhere</div>
            <div className="mt-3 flex flex-wrap gap-5 perspective-1200">
              {[
                { href: 'https://github.com/your', label: 'GitHub' },
                { href: 'https://linkedin.com/in/your', label: 'LinkedIn' },
                { href: 'https://twitter.com/your', label: 'Twitter' },
              ].map(s => (
                <motion.div
                  key={s.href}
                  whileHover={{ scale: 1.18, rotateX: 18, rotateY: -14, rotateZ: 2, z: 55 }}
                  whileTap={{ scale: 0.92 }}
                  className="relative group [transform-style:preserve-3d] will-change-transform"
                >
                  <motion.a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="peer block px-5 py-3 rounded-2xl border border-border/60 bg-background/40 hover:border-primary/40 transition text-xs font-medium [transform-style:preserve-3d]"
                    whileHover={{}}
                  >
                    <span className="relative z-10">{s.label}</span>
                    <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-primary/25 to-fuchsia-500/25 blur" />
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
