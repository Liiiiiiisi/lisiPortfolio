import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getProjectList } from '@/lib/projects';
import HomeVideoSection from '@/components/HomeVideoSection';
import ProjectList from '@/components/ProjectList';

export default async function Home() {
  const projects = await getProjectList();
  
  // TODO: Replace with your YouTube URL
  const youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  return (
    <div className="min-h-screen flex flex-col bg-black" style={{ backgroundColor: '#000000' }}>
      <Navigation />
      <main className="flex-1" style={{ backgroundColor: '#000000' }}>
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
