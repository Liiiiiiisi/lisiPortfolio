import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getProjectList } from '@/lib/projects';
import HomeVideoSection from '@/components/HomeVideoSection';
import ProjectCard from '@/components/ProjectCard';

export default async function Home() {
  const projects = await getProjectList();
  
  // TODO: Replace with your YouTube URL
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL || '';

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navigation />
      <main className="flex-1 pt-16">
        {/* Showreel Video Section */}
        <HomeVideoSection youtubeUrl={youtubeUrl} />

        {/* Projects Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={{
                  id: project.id,
                  title: project.title,
                  href: `/projects/${project.id}`,
                  cover: project.cover,
                  category: project.category,
                  // Note: description and technologies are not in the list index, 
                  // but Card handles them being optional.
                }}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
