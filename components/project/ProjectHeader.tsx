import { ProjectMetadata } from '@/lib/projects';

interface ProjectHeaderProps {
  metadata: ProjectMetadata;
}

export default function ProjectHeader({ metadata }: ProjectHeaderProps) {
  return (
    <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title Section with Glass Effect */}
      <div className="mb-8 p-8 rounded-2xl bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-3 text-white drop-shadow-lg">
          {metadata.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          {metadata.role}
        </p>
      </div>
      
      {/* Tools Used Section */}
      <div className="mb-8 p-6 rounded-2xl bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-white">Tools Used</h2>
        <div className="flex flex-wrap gap-3">
          {metadata.tech.map((tech, index) => (
            <span
              key={index}
              className="px-4 py-2 text-sm font-medium bg-gray-700/50 backdrop-blur-sm text-white rounded-full border border-gray-600/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Project Info Sections */}
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">
            Description
          </h2>
          <p className="text-white leading-relaxed">{metadata.description}</p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">
            Challenge
          </h2>
          <p className="text-white leading-relaxed">{metadata.challenge}</p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">
            Solution
          </h2>
          <p className="text-white leading-relaxed">{metadata.solution}</p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">
            Outcome
          </h2>
          <p className="text-white leading-relaxed">{metadata.outcome}</p>
        </div>
      </div>
    </header>
  );
}
