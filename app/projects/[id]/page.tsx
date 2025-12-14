import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProjectHeader from '@/components/project/ProjectHeader';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import VideoHero from '@/components/project/VideoHero';
import { getProject, projectExists } from '@/lib/projects';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  
  // Check if project exists
  const exists = await projectExists(id);
  if (!exists) {
    notFound();
  }

  // Load project data
  const project = await getProject(id);
  if (!project) {
    notFound();
  }

  // For VR Education project, hide VideoHero and ProjectHeader
  const hideHeaderAndVideo = id === 'vr-education';

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navigation />
      <main className="flex-1 pt-16">
        {/* Project Video at the top */}
        {!hideHeaderAndVideo && <VideoHero projectId={id} />}
        
        {!hideHeaderAndVideo && <ProjectHeader metadata={project.metadata} />}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <MarkdownRenderer content={project.content} projectId={id} />
        </article>
      </main>
      <Footer isDark={true} />
    </div>
  );
}

// Generate static params for known projects (optional, for SSG)
export async function generateStaticParams() {
  try {
    const { getProjectList, projectExists } = await import('@/lib/projects');
    const projects = await getProjectList();
    // Only generate params for projects that actually exist
    const existingProjects = await Promise.all(
      projects.map(async (project) => ({
        project,
        exists: await projectExists(project.id),
      }))
    );
    return existingProjects
      .filter(({ exists }) => exists)
      .map(({ project }) => ({
        id: project.id,
      }));
  } catch (error) {
    return [];
  }
}
