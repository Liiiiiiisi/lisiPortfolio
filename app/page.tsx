import Hero from '@/components/Hero';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import MoreWork from '@/components/MoreWork';
import Contact from '@/components/Contact';

/**
 * Homepage.
 *
 * 1. Hero — full-screen landing section (unchanged, first section).
 * 2. ProjectsShowcase — scroll-driven, pinned-stage project gallery.
 *    Target of the floating nav's "Projects" item (#projects).
 * 3. MoreWork — filmstrip index of additional projects (#more-work,
 *    placeholder content for now).
 * 4. Contact — final full-screen curtain section (#contact).
 *
 * Still kept in components/ for rollback (not rendered here):
 * Navigation, FeaturedWork, About, Footer, HeroProjectPreview.
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <ProjectsShowcase />
      <MoreWork />
      <Contact />
    </main>
  );
}
