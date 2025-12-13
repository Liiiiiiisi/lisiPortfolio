'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { withBasePath } from '@/lib/paths';

interface Project {
  id: string;
  title: string;
  href: string;
  video?: string;
  cover?: string;
  category?: string;
}

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen bg-black" style={{ backgroundColor: '#000000' }}>
      {/* Background Video/Image Container */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {hoveredProject && (
          <div className="absolute inset-0 transition-opacity duration-500">
            {(() => {
              const project = projects.find(p => p.id === hoveredProject);
              if (project?.video) {
                return (
                  <video
                    key={hoveredProject}
                    src={withBasePath(project.video)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-40"
                  />
                );
              } else if (project?.cover) {
                return (
                  <Image
                    src={withBasePath(project.cover)}
                    alt=""
                    fill
                    className="object-cover opacity-20"
                  />
                );
              }
              return null;
            })()}
            <div className="absolute inset-0 bg-black/60" />
          </div>
        )}
      </div>

      {/* Project List */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="space-y-1">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={project.href}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="block group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 sm:py-6 px-4 sm:px-8 border-b border-gray-900 hover:border-gray-700 transition-all duration-300">
                <div className="flex items-center gap-4 sm:gap-12">
                  <span className="text-xs text-gray-600 font-mono w-6 sm:w-8 flex-shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold transition-all duration-500 ease-out ${
                      hoveredProject === project.id
                        ? 'text-white scale-[1.02]'
                        : 'text-gray-700 group-hover:text-gray-500'
                    }`}
                    style={{
                      textShadow: hoveredProject === project.id 
                        ? '0 0 30px rgba(255, 255, 255, 0.3)' 
                        : 'none'
                    }}
                  >
                    {project.title}
                  </h2>
                </div>
                {project.category && (
                  <span
                    className={`text-xs uppercase tracking-widest transition-all duration-300 mt-2 sm:mt-0 ${
                      hoveredProject === project.id
                        ? 'text-white opacity-100 translate-x-0'
                        : 'text-gray-600 opacity-0 sm:opacity-0 translate-x-4 group-hover:opacity-30'
                    }`}
                  >
                    {project.category}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
