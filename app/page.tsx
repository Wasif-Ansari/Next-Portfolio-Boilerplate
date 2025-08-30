import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Projects } from '@/components/projects';
import { gatherAllGitHubProjects } from '@/lib/github';
import { Resume } from '@/components/resume';
import { BlogList } from '@/components/blog-list';
import { Testimonials } from '@/components/testimonials';
import { Contact } from '@/components/contact';

export default async function Home() {
  const username = process.env.GITHUB_USERNAME || 'Wasif-Ansari';
  let remote = [] as any[];
  try {
    const mod = await import('@/lib/github');
    remote = await mod.gatherAllGitHubProjects(username);
  } catch {
    // swallow fetch errors (offline or rate limit)
  }
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
