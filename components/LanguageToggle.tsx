'use client';

import { useLanguage } from '@/context/LanguageContext';

/** Persistent secondary control; the Projects / About / Labs dock remains
 * the only primary navigation. */
export default function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t('nav.langToggleAria')}
      className="fixed right-4 top-4 z-[100] rounded-full border border-line/80 bg-bg/85 px-3 py-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-ink shadow-sm backdrop-blur-md transition-colors hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong sm:right-6 sm:top-6"
    >
      {language === 'en' ? '中文' : 'EN'}
    </button>
  );
}
