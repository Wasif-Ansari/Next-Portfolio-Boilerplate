export interface TimelineItem {
  id: string;
  type: 'work' | 'education' | 'cert';
  title: string;
  org: string;
  start: string; // ISO
  end?: string; // ISO or undefined for present
  location?: string;
  description?: string;
  highlights?: string[];
  logo?: string;
}

export const timeline: TimelineItem[] = [
  {
    id: 'work-1',
    type: 'work',
    title: 'Senior Software Engineer',
    org: 'TechNova',
    start: '2023-06-01',
    description: 'Leading platform architecture & developer experience initiatives.',
    highlights: [
      'Cut cold-start latency by 40%',
      'Rolled out internal design system',
    ],
    logo: '/logos/technova.png',
  },
  {
    id: 'edu-1',
    type: 'education',
    title: 'B.Sc. Computer Science',
    org: 'State University',
    start: '2018-09-01',
    end: '2022-05-15',
    highlights: ['Graduated Magna Cum Laude', 'AI Research Assistant'],
  },
  {
    id: 'cert-1',
    type: 'cert',
    title: 'AWS Certified Solutions Architect',
    org: 'Amazon Web Services',
    start: '2024-01-01',
    end: '2026-01-01',
  },
];
