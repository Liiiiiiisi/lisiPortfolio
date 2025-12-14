'use client';

import { useState } from 'react';
import { withBasePath } from '@/lib/paths';

interface VideoHeroProps {
  projectId: string;
  videoPath?: string;
}

export default function VideoHero({ projectId, videoPath }: VideoHeroProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoSrc = videoPath || `/projects/${projectId}/videos/preview.mp4`;
  
  // Fixed-size video container (700px × 400px)
  const containerStyle: React.CSSProperties = { width: '700px', height: '400px', margin: '0 auto' };
  const videoStyle: React.CSSProperties = { textAlign: 'center' };

  return (
    <section className="w-full relative bg-black flex items-center justify-center">
      <div 
        className="flex items-center justify-center relative"
        style={containerStyle}
      >
        {!isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 group border border-white/20"
            aria-label="Play video"
          >
            <svg
              className="w-8 h-8 md:w-12 md:h-12 text-white ml-1 group-hover:scale-110 transition-transform"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}
        <video
          className="w-full h-full object-cover"
          style={videoStyle}
          controls={isPlaying}
          autoPlay={isPlaying}
          loop
          muted
          playsInline
        >
          <source src={withBasePath(videoSrc)} type="video/mp4" />
        </video>
        {!isPlaying && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 pointer-events-none" />
        )}
      </div>
    </section>
  );
}
