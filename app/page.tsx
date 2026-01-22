import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HomeVideoSection from '@/components/HomeVideoSection';

export default async function Home() {
  // TODO: Replace with your YouTube URL
  const youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  return (
    <div className="min-h-screen flex flex-col bg-black" style={{ backgroundColor: '#000000' }}>
      <Navigation />
      <main className="flex-1 relative" style={{ backgroundColor: '#000000' }}>
        {/* Showreel Video Section */}
        <HomeVideoSection youtubeUrl={youtubeUrl} />
      </main>
      <Footer isDark={true} />
    </div>
  );
}
