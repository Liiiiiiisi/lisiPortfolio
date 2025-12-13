import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getProjectList } from '@/lib/projects';
import HomeVideoSection from '@/components/HomeVideoSection';
import ProjectList from '@/components/ProjectList';

export default async function Home() {
  const projects = await getProjectList();
  
  // TODO: Replace with your YouTube URL
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL || '';

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navigation />
      <main className="flex-1">
        {/* Showreel Video Section */}
        <HomeVideoSection youtubeUrl={youtubeUrl} />

        {/* Projects Section with Hover Video Effect */}
        <ProjectList projects={projects.map(project => ({
          id: project.id,
          title: project.title,
          href: `/projects/${project.id}`,
          video: project.video,
          cover: project.cover,
          category: project.category,
        }))} />
      </main>
      <Footer isDark={true} />
    </div>
  );
}
