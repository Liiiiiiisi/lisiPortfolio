'use client';

/**
 * Bilingual content provider. Public interface matches the existing portfolio:
 * t(key) returns the current-language string for a typed key.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { en, type TranslationKey } from '@/locales/en';
import { zh } from '@/locales/zh';

export type Language = 'en' | 'zh';

const translations: Record<Language, Record<TranslationKey, string>> = { en, zh };

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('lisi-portfolio-language');
    if (saved === 'en' || saved === 'zh') setLanguage(saved);
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    window.localStorage.setItem('lisi-portfolio-language', language);
  }, [language, storageReady]);

  // Keep the document language attribute in sync for assistive tech.
  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [language]);

  const t = useCallback(
    (key: TranslationKey) => translations[language][key] ?? en[key],
    [language],
  );

  const toggleLanguage = useCallback(
    () => setLanguage((current) => (current === 'en' ? 'zh' : 'en')),
    [],
  );

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language, toggleLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
