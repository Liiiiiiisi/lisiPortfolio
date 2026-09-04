import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Providers from '@/components/Providers';
import FloatingNavigation from '@/components/FloatingNavigation';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lisi Xie — Creative Technologist & Interactive Designer',
  description:
    'Portfolio of Lisi Xie: responsive experiences across XR, AI and real-time media. 2× XRDC Award Winner.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {children}
          {/* Top-level, outside <main>, so position:fixed is never affected
              by a Hero (or any page section) transform/overflow context. */}
          <FloatingNavigation />
        </Providers>
      </body>
    </html>
  );
}
