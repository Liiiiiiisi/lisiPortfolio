import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">About</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Welcome to my portfolio! I&apos;m passionate about creating innovative experiences that blend
              technology with human-centered design.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              My work spans across web development, virtual reality, augmented reality, and interactive
              installations. I enjoy exploring new technologies and pushing the boundaries of what&apos;s
              possible in digital experiences.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Through my projects, I aim to create meaningful connections between people and technology,
              whether it&apos;s through educational VR experiences, accessible web applications, or immersive
              AR interactions.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

