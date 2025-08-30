export interface BlogPostMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
}

export const posts: BlogPostMeta[] = [
  {
    slug: 'shipping-fast-with-confidence',
    title: 'Shipping Fast with Confidence',
    summary: 'Strategies to iterate rapidly without sacrificing reliability.',
    date: '2025-02-10',
    tags: ['process', 'devx'],
  },
  {
    slug: 'design-systems-that-scale',
    title: 'Design Systems that Scale',
    summary: 'Principles for building maintainable component libraries.',
    date: '2025-03-28',
    tags: ['frontend', 'design-system'],
  },
];
