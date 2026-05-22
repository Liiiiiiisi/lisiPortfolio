'use client';

import Link from 'next/link';
import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { withBasePath } from '@/lib/paths';
import ProjectTechMenu from './ProjectTechMenu';
import { useLanguage } from '@/context/LanguageContext';

interface Project {
  id: string;
  title: string;
  title_zh?: string;
  href: string;
  video?: string;
  cover?: string;
  category?: string;
  category_zh?: string;
  features?: string[];
}

interface ProjectListProps {
  projects: Project[];
  enableHoverVideo?: boolean;
  showThumbnail?: boolean;
}

// Technology stack mapping for each project (legacy - only used if tools/features are not provided)
const projectTechData: Record<string, string[]> = {
  "signie": ["Unity", "Blender", "Dollars Mocap", "Wit.ai", "Eleven Labs"],
  "vr-education": ["Unity", "C#", "Oculus SDK", "VR Interaction"],
  "micro-invasion": ["Lens Studio", "JavaScript", "AR", "3D Modeling"],
  "pray-for-blessing": ["Unity", "Photoshop", "OpenXR", "XR Interaction Toolkit", "Shader Graph", "VFX Graph", "Cinemachine", "C#"],
  "carbon-neutral": ["Arduino", "Processing", "Sensors", "Physical Computing"],
  "canopy-of-echo": ["TouchDesigner", "Unreal Engine", "Blender", "OSC"],
  "datnie": ["React", "Next.js", "TypeScript", "Design System"]
};

// Tools mapping for each project (software with logos)
const projectToolsData: Record<string, string[]> = {
  "signie": ["Unity", "Blender", "Dollars Mocap", "Wit.ai", "Eleven Labs"],
  "vr-education": ["Unity", "Unity Version Control", "Blender", "Illustrator"],
  "micro-invasion": ["Lens Studio"],
  "pray-for-blessing": ["Unity", "Photoshop"],
  "carbon-neutral": ["Unity", "Vuforia", "Cinema 4D", "Adobe Illustrator"],
  "canopy-of-echo": ["TouchDesigner", "Unreal Engine", "Blender", "Illustrator"],
  "datnie": ["Unreal Engine", "Unity", "Blender", "Figma", "Suno AI", "Eleven Lab"]
};

// Features mapping for each project
const projectFeaturesData: Record<string, string[]> = {
  "signie": ["Hand Tracking", "Gesture Recognition", "Micro-Gestures", "Voice-to-Text", "Virtual Guide", "Animation State Machine"],
  "vr-education": ["C#", "OpenXR", "Collision & UI-Based Scoring", "Practice-Based Learning"],
  "micro-invasion": ["Body Tracking", "Segmentation", "World Mesh", "Particle System", "Image Tracking"],
  "pray-for-blessing": ["OpenXR", "XR Interaction Toolkit", "Shader Graph", "VFX Graph", "Cinemachine", "C#"],
  "carbon-neutral": ["Plane Tracking", "State-Driven Interaction", "Animator State Machine", "C#"],
  "canopy-of-echo": ["OSC Communication", "Computer Vision", "Laser Cutting", "Kinetic Control"],
  "datnie": ["Microgesture", "Character Groom & Animation", "Control Rig Motion", "Spatial UI / UX"]
};

// GitHub URLs mapping for each project
const projectGithubUrls: Record<string, string> = {
  "signie": "https://github.com/yourusername/signie",
};

export default function ProjectList({ projects, enableHoverVideo = true }: ProjectListProps) {
  const { language } = useLanguage();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile on client side only
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Debounced hover handlers to prevent rapid state changes
  const handleMouseEnter = useCallback((projectId: string, index: number) => {
    // Clear any pending leave timeout
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    
    // Clear any existing hover timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Set hover state after a small delay to debounce rapid movements
    hoverTimeoutRef.current = setTimeout(() => {
      if (enableHoverVideo) {
        setHoveredProject(projectId);
        setHoveredIndex(index);
      }
    }, 50);
  }, [enableHoverVideo]);

  const handleMouseLeave = useCallback(() => {
    // Clear any pending hover timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    // Clear any existing leave timeout
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    
    // Reset hover state after a small delay to prevent flickering
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredProject(null);
      setHoveredIndex(null);
    }, 100);
  }, []);

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
                const isYoutube = project?.video?.includes('youtube.com');
                const embedUrl = isYoutube && project?.video
                  ? (() => {
                      const m = project.video.match(/(?:v=|\/embed\/)([a-zA-Z0-9_-]{11})/);
                      const vid = m ? m[1] : '';
                      return vid ? `https://www.youtube.com/embed/${vid}?autoplay=1&mute=1&loop=1&playlist=${vid}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1` : null;
                    })()
                  : null;
                if (embedUrl) {
                  return (
                    <iframe
                      src={embedUrl}
                      title=""
                      className="absolute pointer-events-none border-0"
                      style={{
                        width: '120%',
                        height: '120%',
                        top: '-10%',
                        left: '-10%',
                      }}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  );
                }
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
          {projects.map((project, index) => {
            // Calculate transform values for GPU acceleration
            const isHovered = hoveredIndex === index;
            const isNotHovered = hoveredIndex !== null && hoveredIndex !== index;
            const isAbove = hoveredIndex !== null && index < hoveredIndex;
            const isBelow = hoveredIndex !== null && index > hoveredIndex;
            
            // Calculate scale values based on screen size
            const scale = isHovered 
              ? (isMobile ? 1.05 : 1.25)
              : isNotHovered
              ? (isMobile ? 0.95 : 0.85)
              : 1;
            
            // Calculate translate Y values (in pixels)
            const translateY = isAbove ? -16 : isBelow ? 16 : 0;
            
            // Calculate translate Z values (for 3D perspective)
            const translateZ = isNotHovered ? -10 : 0;
            
            // Calculate opacity
            const opacity = isHovered ? 1 : isNotHovered ? 0.3 : 1;
            
            return (
            <div key={project.id} id={project.id} className="relative" style={{ overflow: 'visible' }}>
              <Link href={project.href}>
                <motion.div
                  layoutId={`project-${project.id}`}
                  layout
                  onMouseEnter={() => handleMouseEnter(project.id, index)}
                  onMouseLeave={handleMouseLeave}
                  transition={{
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.25, ease: "easeOut" }
                  }}
                  style={{
                    transform: `translate3d(0, ${translateY}px, ${translateZ}px) scale(${scale})`,
                    opacity,
                    willChange: 'transform, opacity',
                  }}
                  className={cn(
                    "group relative p-4 md:p-8 border-b cursor-pointer transform-gpu",
                    // Border color based on hover state
                    isHovered ? "border-white/40" : "border-white/10",
                    // Z-index for hovered item
                    isHovered && "z-20",
                    // Grayscale for non-hovered items
                    isNotHovered && "grayscale"
                  )}
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pointer-events-none">
                    <h2 className={cn(
                      "text-4xl md:text-6xl font-bold transition-colors duration-300",
                      hoveredIndex === index
                        ? "text-white font-[700]"
                        : "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
                    )}>
                      {language === 'CN' && project.title_zh ? project.title_zh : project.title}
                    </h2>
                    {project.category && (
                      <span className={cn(
                        "text-lg text-gray-500 transition-colors duration-300",
                        hoveredIndex === index && "text-white"
                      )}>
                        {language === 'CN' && project.category_zh ? project.category_zh : project.category}
                      </span>
                    )}
                  </div>

                  {/* Tech Stack Dropdown */}
                  <ProjectTechMenu
                    techStack={projectTechData[project.id] || []}
                    tools={projectToolsData[project.id] || []}
                    features={project.features && project.features.length > 0 ? project.features.map(f => f.charAt(0).toUpperCase() + f.slice(1)) : (projectFeaturesData[project.id] || [])}
                    isVisible={hoveredIndex === index}
                    githubUrl={projectGithubUrls[project.id]}
                  />
                </motion.div>
              </Link>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
