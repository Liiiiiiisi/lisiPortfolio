'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectTechMenuProps {
  techStack: string[];
  isVisible: boolean;
}

export default function ProjectTechMenu({ techStack, isVisible }: ProjectTechMenuProps) {
  if (!techStack || techStack.length === 0) {
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
      <div className="flex flex-wrap gap-2 p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
        {techStack.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 text-xs font-medium text-white/80 bg-white/10 rounded-full border border-white/5 whitespace-nowrap"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
