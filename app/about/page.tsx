import type { Metadata } from 'next';
import About from '@/components/About';

export const metadata: Metadata = {
  title: 'About — Lisi Xie',
};

/**
 * Dedicated /about route. Reuses the existing About section component
 * as-is (no redesign) — it already renders a self-contained <section id="about">.
 */
export default function AboutPage() {
  return (
    <main id="main">
      <About />
    </main>
  );
}
