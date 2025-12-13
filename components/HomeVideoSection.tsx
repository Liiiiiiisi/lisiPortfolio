'use client';

interface HomeVideoSectionProps {
  youtubeUrl?: string;
}

export default function HomeVideoSection({ youtubeUrl }: HomeVideoSectionProps) {
  // Extract video ID from YouTube URL
  const getYouTubeId = (url: string | undefined) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(youtubeUrl);

  if (!videoId && !youtubeUrl) {
    // Fallback to placeholder if no YouTube URL provided
    return (
      <section className="w-full relative bg-black py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="aspect-video w-full flex items-center justify-center relative rounded-lg overflow-hidden">
            <div className="text-white">Video placeholder - Add YouTube URL</div>
          </div>
        </div>
      </section>
    );
  }

  // YouTube embed URL with autoplay, no controls, loop, mute
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1`;

  return (
    <section className="w-full relative bg-black py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="aspect-video w-full relative rounded-lg overflow-hidden shadow-2xl">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ border: 'none' }}
            title="Portfolio Showreel"
          />
        </div>
      </div>
    </section>
  );
}
