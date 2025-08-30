export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Jane Doe',
    role: 'Product Manager @ TechNova',
    quote: 'An engineer who blends craftsmanship with pragmatism—delivers impact fast.',
    avatar: '/avatars/jane.png',
  },
  {
    id: 't2',
    name: 'Carlos Rivera',
    role: 'Engineering Lead',
    quote: 'Elevated our architecture and mentoring culture—instrumental to our success.',
  },
];
