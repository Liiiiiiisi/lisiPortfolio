import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getProjectList } from '@/lib/projects';
import ProjectList from '@/components/ProjectList';

export default async function Project() {
  const projects = await getProjectList();

  return (
    <div className="min-h-screen flex flex-col bg-black" style={{ backgroundColor: '#000000' }}>
      <Navigation />
      <main className="flex-1 pt-16" style={{ backgroundColor: '#000000' }}>
        <ProjectList
          showThumbnail={false}
          projects={projects.map(project => ({
            id: project.id,
            title: project.title,
            title_zh: project.title_zh,
            href: `/projects/${project.id}`,
            video: project.video,
            cover: project.cover,
            category: project.category,
            category_zh: project.category_zh,
            features: project.features,
          }))}
        />
      </main>
      <Footer isDark={true} />
    </div>
  );
}
