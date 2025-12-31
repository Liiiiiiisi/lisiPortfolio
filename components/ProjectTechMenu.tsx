'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import { useState } from "react";

interface ProjectTechMenuProps {
  techStack: string[];
  isVisible: boolean;
  tools?: string[];
  features?: string[];
}

// Helper component for tool logos that handles both PNG and SVG
function ToolLogo({ name, alt }: { name: string; alt: string }) {
    const [imgSrc, setImgSrc] = useState(withBasePath(`/assets/logos/${name}.svg`));
    const [hasError, setHasError] = useState(false);

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={20}
            height={20}
            className="object-contain"
            unoptimized={true}
            onError={() => {
                if (imgSrc.includes('.svg')) {
                    // Try PNG if SVG fails
                    setImgSrc(withBasePath(`/assets/logos/${name}.png`));
                } else {
                    // Hide if both fail
                    setHasError(true);
                }
            }}
            style={{ display: hasError ? 'none' : 'block' }}
        />
    );
}

// Map tool names to logo file names
const toolLogoMap: Record<string, string> = {
    "TouchDesigner": "touchdesigner",
    "Unreal Engine": "unreal-engine",
    "Blender": "blender",
    "Illustrator": "illustrator",
    "React": "react",
    "Next.js": "nextjs",
    "Nextjs": "nextjs",
    "Unity": "unity",
    "Lens Studio": "lens-studio",
    "Arduino": "arduino",
    "Processing": "processing",
    "TypeScript": "typescript",
};

export default function ProjectTechMenu({ techStack, isVisible, tools, features }: ProjectTechMenuProps) {
    const hasContent = (techStack && techStack.length > 0) || (tools && tools.length > 0) || (features && features.length > 0);
    
    if (!hasContent) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scaleY: isVisible ? 1 : 0
            }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="absolute top-full left-0 mt-4 w-full z-20 pointer-events-none"
        >
            <div className="p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md space-y-4">
                {/* Tools Section */}
                {tools && tools.length > 0 && (
                    <div>
                        <h4 className="text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">Tools</h4>
                        <div className="flex flex-wrap gap-2">
                            {tools.map((tool, index) => {
                                const logoName: string | undefined = toolLogoMap[tool];
                                return (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 text-xs font-medium text-white/80 bg-white/10 rounded-full border border-white/5 flex items-center gap-2"
                                    >
                                        {logoName && <ToolLogo name={logoName} alt={tool} />}
                                        {tool}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                )}
                
                {/* Features Section */}
                {features && features.length > 0 && (
                    <div>
                        <h4 className="text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">Features</h4>
                        <div className="flex flex-wrap gap-2">
                            {features.map((feature, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 text-xs font-medium text-white/80 bg-white/10 rounded-full border border-white/5 whitespace-nowrap"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Legacy Tech Stack (if no tools/features provided) */}
                {techStack && techStack.length > 0 && (!tools || tools.length === 0) && (!features || features.length === 0) && (
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 text-xs font-medium text-white/80 bg-white/10 rounded-full border border-white/5 whitespace-nowrap"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}


