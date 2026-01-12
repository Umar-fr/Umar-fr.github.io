import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Projects } from '@/components/projects';
import { Skills } from '@/components/skills';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { GitHubActivity } from '@/components/github-activity';

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <GitHubActivity />
      <Contact />
      <Footer />
    </main>
  );
}
