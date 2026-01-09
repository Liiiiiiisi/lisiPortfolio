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

export default function ProjectTechMenu({ techStack, isVisible, tools, features }: ProjectTechMenuProps) {
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
                "absolute left-0 w-full z-30 pointer-events-none",
                positionAbove ? "bottom-full mb-4" : "top-full mt-4"
            )}
        >
            <div className="p-2 md:p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md space-y-3 md:space-y-4 max-w-[calc(100vw-2rem)] max-h-[50vh] overflow-y-auto overflow-x-hidden">
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


