"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from '@/lib/paths';

interface ProjectItem {
    id: string;
    title: string;
    cover?: string;
    video?: string;
    category?: string;
}

interface YouMayAlsoLikeProps {
    currentProjectId: string;
}

export default function YouMayAlsoLike({ currentProjectId }: YouMayAlsoLikeProps) {
    const [otherProjects, setOtherProjects] = useState<ProjectItem[]>([]);

    useEffect(() => {
        // Fetch other projects
        fetch(withBasePath('/projects/index.json'))
            .then(res => res.json())
            .then((projects: ProjectItem[]) => {
                // Filter out current project and get up to 3 other projects
                const filtered = projects
                    .filter(p => p.id !== currentProjectId)
                    .slice(0, 3);
                setOtherProjects(filtered);
            })
            .catch(err => console.error('Error loading projects:', err));
    }, [currentProjectId]);

    if (otherProjects.length === 0) {
        return null;
    }

    return (
        <section className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherProjects.map((project) => (
                    <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="group relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    >
                        <div className="relative w-full aspect-video overflow-hidden bg-black/20">
                            {project.video ? (
                                <video
                                    src={withBasePath(project.video)}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            ) : project.cover ? (
                                <Image
                                    src={withBasePath(project.cover)}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    unoptimized={true}
                                />
                            ) : null}
                        </div>
                        <div className="p-6">
                            {project.category && (
                                <span className="text-xs text-white/60 mb-2 block">
                                    {project.category}
                                </span>
                            )}
                            <h3 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">
                                {project.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

