'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import VideoHero from './project/VideoHero';
import InteractiveComponent from './project/InteractiveComponent';
import Image from 'next/image';
import { withBasePath } from '@/lib/paths';

interface MarkdownRendererProps {
  content: string;
  projectId: string;
}

export default function MarkdownRenderer({ content, projectId }: MarkdownRendererProps) {
  // Parse placeholders and split content
  const processContent = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    const placeholderRegex = /<!--\s*placeholder:\s*(\w+)\s*-->/g;
    let lastIndex = 0;
    let match;

    while ((match = placeholderRegex.exec(text)) !== null) {
      // Add markdown before placeholder
      if (match.index > lastIndex) {
        const markdownPart = text.substring(lastIndex, match.index);
        parts.push(
          <ReactMarkdown
            key={`md-${lastIndex}`}
            remarkPlugins={[remarkGfm]}
            components={getMarkdownComponents(projectId)}
          >
            {markdownPart}
          </ReactMarkdown>
        );
      }

      // Add placeholder component
      const placeholderName = match[1];
      parts.push(renderPlaceholder(placeholderName, projectId, parts.length));

      lastIndex = match.index + match[0].length;
    }

    // Add remaining markdown
    if (lastIndex < text.length) {
      const markdownPart = text.substring(lastIndex);
      parts.push(
        <ReactMarkdown
          key={`md-${lastIndex}`}
          remarkPlugins={[remarkGfm]}
          components={getMarkdownComponents(projectId)}
        >
          {markdownPart}
        </ReactMarkdown>
      );
    }

    return parts.length > 0 ? parts : [
      <ReactMarkdown
        key="md-full"
        remarkPlugins={[remarkGfm]}
        components={getMarkdownComponents(projectId)}
      >
        {text}
      </ReactMarkdown>
    ];
  };

  const renderPlaceholder = (name: string, projectId: string, key: number): React.ReactNode => {
    switch (name) {
      case 'video_hero':
        return <VideoHero key={`placeholder-${key}`} projectId={projectId} />;
      case 'interactive_component':
        return <InteractiveComponent key={`placeholder-${key}`} name={name} />;
      default:
        return <InteractiveComponent key={`placeholder-${key}`} name={name} />;
    }
  };

  const getMarkdownComponents = (projectId: string) => ({
    h1: ({ node, ...props }: any) => {
      // Wrap h1 sections in glass container
      return (
        <div className="mt-12 mb-8 p-6 rounded-2xl bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-xl first:mt-0">
          <h1 className="text-3xl md:text-4xl font-bold text-white" {...props} />
        </div>
      );
    },
    h2: ({ node, ...props }: any) => (
      <h2 className="text-2xl md:text-3xl font-semibold mt-10 mb-4 text-white" {...props} />
    ),
    h3: ({ node, ...props }: any) => (
      <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-white" {...props} />
    ),
    p: ({ node, ...props }: any) => {
      // Wrap paragraphs in glass containers
      return (
        <div className="mb-6 p-6 rounded-2xl bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-xl">
          <p className="text-white leading-relaxed" {...props} />
        </div>
      );
    },
    ul: ({ node, ...props }: any) => (
      <div className="mb-6 p-6 rounded-2xl bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-xl">
        <ul className="list-disc list-inside space-y-2 text-white" {...props} />
      </div>
    ),
    ol: ({ node, ...props }: any) => (
      <div className="mb-6 p-6 rounded-2xl bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-xl">
        <ol className="list-decimal list-inside space-y-2 text-white" {...props} />
      </div>
    ),
    li: ({ node, ...props }: any) => (
      <li className="ml-4" {...props} />
    ),
    strong: ({ node, ...props }: any) => (
      <strong className="font-semibold text-white" {...props} />
    ),
    hr: ({ node, ...props }: any) => (
      <hr className="my-12 border-t border-gray-700" {...props} />
    ),
    img: ({ node, src, alt, ...props }: any) => {
      // Handle relative paths from project directory
      const imageSrc = src?.startsWith('/projects/') 
        ? src 
        : `/projects/${projectId}/images/${src}`;
      
      // Check if image is a GIF to ensure proper handling
      const isGif = imageSrc.toLowerCase().endsWith('.gif');
      
      return (
        <div className="my-6 p-4 rounded-2xl bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-xl">
          <Image
            src={withBasePath(imageSrc)}
            alt={alt || ''}
            width={1200}
            height={675}
            className="w-full h-auto rounded-lg"
            unoptimized={isGif}
            {...props}
          />
        </div>
      );
    },
    blockquote: ({ node, ...props }: any) => (
      <div className="mb-6 p-6 rounded-2xl bg-gray-800/50 backdrop-blur-md border-l-4 border-gray-600 border-t border-r border-b border-gray-700/50 shadow-xl">
        <blockquote className="pl-4 italic text-gray-300" {...props} />
      </div>
    ),
    code: ({ node, inline, ...props }: any) => {
      if (inline) {
        return (
          <code className="px-1.5 py-0.5 bg-gray-700/50 backdrop-blur-sm rounded text-sm font-mono text-white" {...props} />
        );
      }
      return (
        <div className="mb-6 p-4 rounded-2xl bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-xl">
          <code className="block text-sm font-mono text-white overflow-x-auto" {...props} />
        </div>
      );
    },
    pre: ({ node, ...props }: any) => (
      <pre className="mb-4" {...props} />
    ),
  });

  return (
    <div className="markdown-content">
      {processContent(content)}
    </div>
  );
}
