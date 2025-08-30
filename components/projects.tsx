"use client";
import { projects as localProjects } from '@/lib/data/projects';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useReducedMotion } from 'framer-motion';

const allTags = Array.from(new Set(localProjects.flatMap(p => p.tech))).sort();

type LocalProject = typeof localProjects[number];
interface RemoteProject {
  slug: string; title: string; description: string; tech: string[]; repo: string; demo?: string; stars?: number; source?: string;
}
interface ProjectsProps { initialRemote?: RemoteProject[] }

export function Projects({ initialRemote = [] }: ProjectsProps) {
  const [tag, setTag] = useState<string | null>(null);
  const [remote, setRemote] = useState<RemoteProject[]>(initialRemote);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialRemote.length === 0) {
      const ghUser = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'Wasif-Ansari';
      (async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/github-projects-all?username=${encodeURIComponent(ghUser)}`);
          if (!res.ok) throw new Error('Failed');
          const json = await res.json();
          setRemote(json.projects || []);
        } catch (e) {
          setError('Could not load GitHub');
        } finally { setLoading(false); }
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const baseFiltered = tag ? localProjects.filter(p => p.tech.includes(tag)) : localProjects;
  const merged = [...baseFiltered, ...remote.filter(r => !baseFiltered.some(b => b.slug === r.slug))] as (LocalProject | RemoteProject)[];
  const textFiltered = merged.filter(p => !query || (p.title + p.description).toLowerCase().includes(query.toLowerCase()));
  const withStars = (p: RemoteProject | (typeof localProjects)[number]): p is RemoteProject & { stars: number } => typeof (p as RemoteProject).stars === 'number';
  const sorted = [...textFiltered].sort((a,b) => (withStars(b)?b.stars:0) - (withStars(a)?a.stars:0));

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <h2 className="section-heading text-3xl">Projects</h2>
          <div className="flex items-center gap-3 text-sm">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search…" className="px-3 py-2 rounded-md bg-background/60 border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm w-40" />
            {loading && <span className="text-xs text-muted-foreground">Loading…</span>}
            {error && <span className="text-xs text-red-500">{error}</span>}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8 text-sm">
          <button onClick={() => setTag(null)} className={`px-3 py-1 rounded-full border ${tag===null?'bg-primary text-primary-foreground border-primary':'border-border hover:bg-accent/40'}`}>All</button>
          {allTags.map(t => (
            <button key={t} onClick={() => setTag(t)} className={`px-3 py-1 rounded-full border ${tag===t?'bg-primary text-primary-foreground border-primary':'border-border hover:bg-accent/40'}`}>{t}</button>
          ))}
        </div>
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 perspective-1200">
          <AnimatePresence mode="popLayout">
            {loading && sorted.length === 0 && Array.from({length:6}).map((_,i)=>(
              <div key={i} className="p-5 rounded-2xl border border-border/60 bg-background/40 backdrop-blur card-elevated hover-lift">
                <div className="h-5 w-40 skeleton rounded mb-3" />
                <div className="h-3 w-full skeleton rounded mb-2" />
                <div className="h-3 w-5/6 skeleton rounded mb-4" />
                <div className="flex gap-2">
                  <div className="h-5 w-16 skeleton rounded" />
                  <div className="h-5 w-12 skeleton rounded" />
                  <div className="h-5 w-14 skeleton rounded" />
                </div>
              </div>
            ))}
            {sorted.map(p => {
              const key = `${p.slug}-${'source' in p ? (p as RemoteProject).source || 'local' : 'local'}`;
              const source = 'source' in p ? (p as RemoteProject).source : undefined;
              const stars = withStars(p) ? p.stars : undefined;
              const project: InteractiveCardProject = { slug: p.slug, title: p.title, description: p.description, tech: p.tech, repo: p.repo, demo: (p as RemoteProject).demo };
              return <InteractiveProjectCard key={key} project={project} stars={stars} source={source} />;
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

interface InteractiveCardProject { slug: string; title: string; description: string; tech: string[]; repo?: string; demo?: string; }
interface InteractiveProjectCardProps { project: InteractiveCardProject; stars?: number; source?: string; }

function InteractiveProjectCard({ project, stars, source }: InteractiveProjectCardProps) {
  const reduce = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const translateZ = useMotionValue(0);
  const handleMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (reduce) return;
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x / rect.width - 0.5; // -0.5 .. 0.5
    const dy = y / rect.height - 0.5;
    rotateX.set(dy * -18);
    rotateY.set(dx * 24);
    translateZ.set(40);
  };
  const reset = () => { rotateX.set(0); rotateY.set(0); translateZ.set(0); };
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
  whileHover={reduce ? { } : { scale: 1.03 }}
      className="group relative p-5 rounded-2xl border border-border/60 bg-gradient-to-br from-background/80 via-background/60 to-background/40 backdrop-blur transition overflow-hidden card-elevated will-change-transform [transform-style:preserve-3d]"
      style={{ rotateX, rotateY, z: translateZ }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-primary/10 via-fuchsia-500/10 to-indigo-500/10" />
      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="font-semibold text-lg tracking-tight flex items-center gap-2 [transform-style:preserve-3d]">
          <span>{project.title}</span>
          {typeof stars === 'number' && stars > 0 && (
            <motion.span whileHover={{ rotateY: 360 }} transition={{ duration: 1, ease: 'easeInOut' }} className="tag bg-amber-500/10 text-amber-400 border border-amber-500/20 [transform-style:preserve-3d]">★ {stars}</motion.span>
          )}
          {source && <span className="tag bg-muted text-muted-foreground border border-border/50">{source}</span>}
        </h3>
        <motion.p className="text-sm text-muted-foreground line-clamp-4 min-h-[3.25rem]" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>{project.description}</motion.p>
        <div className="mt-1 flex flex-wrap gap-1">
          {project.tech.map(t => (
            <motion.span
              key={t}
              whileHover={reduce ? { } : { scale: 1.25, rotateY: 180, z: 30 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="tag bg-muted text-muted-foreground border border-border/40 cursor-default select-none [transform-style:preserve-3d] will-change-transform"
            >{t}</motion.span>
          ))}
        </div>
        <div className="mt-3 text-xs flex gap-4">
          {project.repo && <a href={project.repo} className="hover:underline">Repo</a>}
          {project.demo && <a href={project.demo} className="hover:underline">Live</a>}
        </div>
      </div>
      <motion.div
        aria-hidden
        className="absolute -inset-10 opacity-0 group-hover:opacity-60 transition bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.35),transparent_70%)] mix-blend-plus-lighter"
        style={{ rotateX, rotateY, z: translateZ }}
      />
    </motion.div>
  );
}
