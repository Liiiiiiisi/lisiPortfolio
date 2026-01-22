'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import { useState, useEffect, useRef } from "react";

interface ProjectTechMenuProps {
  techStack: string[];
  isVisible: boolean;
  tools?: string[];
  features?: string[];
  githubUrl?: string;
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
            className="object-contain w-4 h-4 md:w-5 md:h-5"
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
    "Unity Version Control": "unity-version-control",
    "Lens Studio": "lens-studio",
    "Vuforia": "vuforia",
    "Cinema 4D": "cinema_4D",
    "Adobe Illustrator": "illustrator",
    "Photoshop": "photoshop",
    "Arduino": "arduino",
    "Processing": "processing",
    "TypeScript": "typescript",
    "Figma": "figma",
    "Suno AI": "suno",
    "Eleven Lab": "eleven_labs",
    "Eleven Labs": "eleven_labs",
    "Dollars Mocap": "dollars_mocap",
    "Wit.ai": "wit.ai",
};

// GitHub icon component
function GitHubIcon({ className }: { className?: string }) {
    return (
        <svg className={className || "w-4 h-4 md:w-5 md:h-5"} fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
    );
}

export default function ProjectTechMenu({ techStack, isVisible, tools, features, githubUrl }: ProjectTechMenuProps) {
    const hasContent = (techStack && techStack.length > 0) || (tools && tools.length > 0) || (features && features.length > 0);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [positionAbove, setPositionAbove] = useState(false);
    
    useEffect(() => {
        if (!isVisible || !dropdownRef.current) return;

        const checkPosition = () => {
            const dropdown = dropdownRef.current;
            if (!dropdown) return;

            const rect = dropdown.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;
            const dropdownHeight = rect.height;

            // If dropdown would overflow bottom and there's more space above, position it above
            if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
                setPositionAbove(true);
            } else {
                setPositionAbove(false);
            }
        };

        // Check position after a short delay to allow animation to start
        const timeoutId = setTimeout(checkPosition, 50);
        
        // Also check on scroll/resize
        window.addEventListener('scroll', checkPosition, true);
        window.addEventListener('resize', checkPosition);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('scroll', checkPosition, true);
            window.removeEventListener('resize', checkPosition);
        };
    }, [isVisible]);
    
    if (!hasContent) {
        return null;
    }

    return (
        <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scaleY: isVisible ? 1 : 0
            }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ originY: positionAbove ? 1 : 0 }}
            className={cn(
                "absolute left-0 w-full z-30",
                positionAbove ? "bottom-full mb-4" : "top-full mt-4"
            )}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="p-2 md:p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md space-y-3 md:space-y-4 max-w-[calc(100vw-2rem)] max-h-[50vh] overflow-y-auto overflow-x-hidden pointer-events-auto">
                {/* Tools Section */}
                {tools && tools.length > 0 && (
                    <div>
                        <h4 className="text-[10px] md:text-xs font-semibold text-white/70 mb-1.5 md:mb-2 uppercase tracking-wider">Tools</h4>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {tools.map((tool, index) => {
                                const logoName: string | undefined = toolLogoMap[tool];
                                return (
                                    <span
                                        key={index}
                                        className="px-2 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-medium text-white/80 bg-white/10 rounded-full border border-white/5 flex items-center gap-1.5 md:gap-2 break-words"
                                    >
                                        {logoName && <ToolLogo name={logoName} alt={tool} />}
                                        <span className="break-words">{tool}</span>
                                    </span>
                                );
                            })}
                            {/* GitHub Link */}
                            {githubUrl && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(githubUrl, '_blank', 'noopener,noreferrer');
                                    }}
                                    className="px-2 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-medium text-white/80 bg-white/10 rounded-full border border-white/5 hover:bg-white/20 hover:text-white transition-all flex items-center gap-1.5 md:gap-2 cursor-pointer"
                                >
                                    <GitHubIcon />
                                    <span>GitHub</span>
                                </button>
                            )}
                        </div>
                    </div>
                )}
                
                {/* Features Section */}
                {features && features.length > 0 && (
                    <div>
                        <h4 className="text-[10px] md:text-xs font-semibold text-white/70 mb-1.5 md:mb-2 uppercase tracking-wider">Features</h4>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {features.map((feature, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-medium text-white/80 bg-white/10 rounded-full border border-white/5 break-words md:whitespace-nowrap"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Legacy Tech Stack (if no tools/features provided) */}
                {techStack && techStack.length > 0 && (!tools || tools.length === 0) && (!features || features.length === 0) && (
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {techStack.map((tech, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-medium text-white/80 bg-white/10 rounded-full border border-white/5 break-words md:whitespace-nowrap"
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


