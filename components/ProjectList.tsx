'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { withBasePath } from '@/lib/paths';
import ProjectTechMenu from './ProjectTechMenu';

interface Project {
  id: string;
  title: string;
  href: string;
  video?: string;
  cover?: string;
  category?: string;
  features?: string[];
}

interface ProjectListProps {
  projects: Project[];
  enableHoverVideo?: boolean;
  showThumbnail?: boolean;
}

// Technology stack mapping for each project
const projectTechData: Record<string, string[]> = {
  "signie": ["React", "Next.js", "OpenAI API", "TailwindCSS"],
  "vr-education": ["Unity", "C#", "Oculus SDK", "VR Interaction"],
  "micro-invasion": ["Lens Studio", "JavaScript", "AR", "3D Modeling"],
  "pray-for-blessing": ["Unity", "Shader Graph", "VR", "Particle Systems"],
  "carbon-neutral": ["Arduino", "Processing", "Sensors", "Physical Computing"],
  "canopy-of-echo": ["TouchDesigner", "Unreal Engine", "Blender", "OSC"],
  "datnie": ["React", "Next.js", "TypeScript", "Design System"]
};

// Tools mapping for each project (software with logos)
const projectToolsData: Record<string, string[]> = {
  "signie": ["React", "Next.js"],
  "vr-education": ["Unity"],
  "micro-invasion": ["Lens Studio"],
  "pray-for-blessing": ["Unity"],
  "carbon-neutral": ["Arduino", "Processing"],
  "canopy-of-echo": ["TouchDesigner", "Unreal Engine", "Blender", "Illustrator"],
  "datnie": ["React", "Next.js", "TypeScript"]
};

// Features mapping for each project
const projectFeaturesData: Record<string, string[]> = {
  "signie": ["ASL", "Education", "Translation"],
  "vr-education": ["XR", "Education", "ASD"],
  "micro-invasion": ["AR", "Interactive"],
  "pray-for-blessing": ["VR", "Cultural"],
  "carbon-neutral": ["Interactive", "Sustainability", "Installation"],
  "canopy-of-echo": ["OSC Communication", "Computer Vision", "Laser Cutting", "Kinetic Control"],
  "datnie": []
};

export default function ProjectList({ projects, enableHoverVideo = true }: ProjectListProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      className="relative min-h-screen bg-black" 
      style={{ backgroundColor: '#000000' }}
    >
      {/* Background Video/Image Container */}
      {enableHoverVideo && (
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              key={hoveredProject}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {(() => {
                const project = projects.find(p => p.id === hoveredProject);
                if (project?.video) {
                  return (
                    <video
                      src={withBasePath(project.video)}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  );
                } else if (project?.cover) {
                  return (
                    <Image
                      src={withBasePath(project.cover)}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  );
                }
                return null;
              })()}
              {/* 遮罩层，用于确保文字可读性 */}
              <div className={`absolute inset-0 bg-black transition-opacity duration-700 ease-in-out ${
                hoveredProject ? 'opacity-40' : 'opacity-90'
              }`} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      )}

      {/* Project List */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-32 perspective-[1000px]">
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div key={project.id} id={project.id} className="relative">
              <Link href={project.href}>
                <motion.div
                  onMouseEnter={() => {
                    if (enableHoverVideo) {
                      setHoveredProject(project.id);
                      setHoveredIndex(index);
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredProject(null);
                    setHoveredIndex(null);
                  }}
                  style={{
                    transition: "opacity 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1), scale 0.25s ease-out"
                  }}
                  className={cn(
                    "group relative p-8 border-b border-white/10 cursor-pointer will-change-transform",
                    // Default state (no hover)
                    hoveredIndex === null && "opacity-100 scale-100 translate-y-0 translate-z-0",
                    // Hovered state (Primary)
                    hoveredIndex === index && "opacity-100 scale-125 z-20 translate-z-0 border-white/40",
                    // Non-hovered state (dimmed & pushed back)
                    hoveredIndex !== null && hoveredIndex !== index && "opacity-30 scale-85 grayscale -translate-z-[10px]",
                    // Above hovered
                    hoveredIndex !== null && index < hoveredIndex && "-translate-y-4",
                    // Below hovered
                    hoveredIndex !== null && index > hoveredIndex && "translate-y-4"
                  )}
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pointer-events-none">
                    <h2 className={cn(
                      "text-4xl md:text-6xl font-bold transition-colors duration-300",
                      hoveredIndex === index
                        ? "text-white font-[700]"
                        : "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
                    )}>
                      {project.title}
                    </h2>
                    {project.category && (
                      <span className={cn(
                        "text-lg text-gray-500 transition-colors duration-300",
                        hoveredIndex === index && "text-white"
                      )}>
                        {project.category}
                      </span>
                    )}
                  </div>

                  {/* Tech Stack Dropdown */}
                  <ProjectTechMenu
                    techStack={projectTechData[project.id] || []}
                    tools={projectToolsData[project.id]}
                    features={project.features && project.features.length > 0 ? project.features.map(f => f.charAt(0).toUpperCase() + f.slice(1)) : projectFeaturesData[project.id]}
                    isVisible={hoveredIndex === index}
                  />
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
