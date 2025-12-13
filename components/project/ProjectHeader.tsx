import { ProjectMetadata } from '@/lib/projects';

interface ProjectHeaderProps {
  metadata: ProjectMetadata;
}

export default function ProjectHeader({ metadata }: ProjectHeaderProps) {
  return (
    <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
        {metadata.title}
      </h1>
      
      <div className="mb-6">
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
          <span className="font-medium">Role:</span> {metadata.role}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {metadata.tech.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
            Description
          </h2>
          <p>{metadata.description}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
            Challenge
          </h2>
          <p>{metadata.challenge}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
            Solution
          </h2>
          <p>{metadata.solution}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
            Outcome
          </h2>
          <p>{metadata.outcome}</p>
        </div>
      </div>
    </header>
  );
}

