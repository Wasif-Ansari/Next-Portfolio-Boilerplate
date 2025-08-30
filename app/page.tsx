import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Projects } from '@/components/projects';
import { Resume } from '@/components/resume';
import { BlogList } from '@/components/blog-list';
import { Testimonials } from '@/components/testimonials';
import { Contact } from '@/components/contact';

export default async function Home() {
  const username = process.env.GITHUB_USERNAME || 'Wasif-Ansari';
  // Pre-fetch remote projects server-side with typed response; swallow network errors
  let remote: import('@/lib/github').GitHubProject[] = [];
  try { const { gatherAllGitHubProjects } = await import('@/lib/github'); remote = await gatherAllGitHubProjects(username); } catch { /* ignore */ }
  return (
    <>
      <Hero />
      <About />
      <Projects initialRemote={remote} />
      <Resume />
      <BlogList />
      <Testimonials />
      <Contact />
    </>
  );
}
