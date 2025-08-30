export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  repo?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'ai-companion',
    title: 'AI Companion',
    description: 'Conversational AI assistant with vector memory and tool integrations.',
    tech: ['Next.js', 'TypeScript', 'OpenAI', 'Postgres', 'Prisma'],
    repo: 'https://github.com/you/ai-companion',
    demo: 'https://ai-companion.example.com',
    image: '/projects/ai-companion.png',
    featured: true,
  },
  {
    slug: 'design-system',
    title: 'Design System',
    description: 'Composable, accessible component library built with Radix + Tailwind.',
    tech: ['React', 'Radix UI', 'TailwindCSS', 'Storybook'],
    repo: 'https://github.com/you/design-system',
    image: '/projects/design-system.png',
  },
  {
    slug: 'realtime-dashboard',
    title: 'Realtime Dashboard',
    description: 'Streaming analytics dashboard with websockets & server actions.',
    tech: ['Next.js', 'WebSockets', 'Redis', 'TailwindCSS'],
    repo: 'https://github.com/you/realtime-dashboard',
    demo: 'https://realtime.example.com',
  },
];
