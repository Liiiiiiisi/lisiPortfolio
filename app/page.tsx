import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HomeVideoSection from '@/components/HomeVideoSection';

export default async function Home() {
  const youtubeUrl = 'https://youtu.be/Jku-8eOu57I';

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
