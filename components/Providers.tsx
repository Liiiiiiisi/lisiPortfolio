'use client';

import type { ReactNode } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import ScrollLens from '@/components/ScrollLens';
import LanguageToggle from '@/components/LanguageToggle';
import CaseTransitionHandoffOverlay from '@/components/CaseTransitionHandoffOverlay';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <CaseTransitionHandoffOverlay />
      <LanguageToggle />
      {/* Single shared scroll-lens filter definition — every media element
          on the site references it by id. Renders nothing visible. */}
      <ScrollLens />
    </LanguageProvider>
  );
}
