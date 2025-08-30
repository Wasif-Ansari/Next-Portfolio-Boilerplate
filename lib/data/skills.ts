export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; icon?: string }[]; // level 0-100
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 88 },
      { name: 'TypeScript', level: 92 },
      { name: 'TailwindCSS', level: 90 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'PostgreSQL', level: 78 },
      { name: 'Prisma', level: 80 },
      { name: 'Redis', level: 70 },
    ],
  },
  {
    category: 'DevOps',
    skills: [
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 65 },
      { name: 'CI/CD', level: 72 },
    ],
  },
];
