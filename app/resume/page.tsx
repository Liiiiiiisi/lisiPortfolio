import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Resume() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">Resume</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Education</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Add your education details here.
                </p>
              </section>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Experience</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Add your work experience here.
                </p>
              </section>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Skills</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Add your skills here.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

