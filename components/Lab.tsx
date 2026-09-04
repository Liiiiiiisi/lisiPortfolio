'use client';

/**
 * Labs — placeholder destination for the "Labs" nav item.
 * Experiments, prototypes, interaction studies and technical tests live
 * here once published. Styled to match About/FeaturedWork's section
 * pattern (same tokens, spacing, typography) rather than introducing a
 * new visual language.
 */
import { useLanguage } from '@/context/LanguageContext';

export default function Lab() {
  const { t } = useLanguage();

  return (
    <section
      id="lab"
      aria-labelledby="lab-title"
      className="scroll-mt-14 border-t border-line"
    >
      <div className="mx-auto w-full max-w-site px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
          <h2
            id="lab-title"
            className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:col-span-4"
          >
            {t('lab.title')}
          </h2>
          <div className="space-y-4 lg:col-span-7 lg:col-start-6">
            <p className="text-base leading-relaxed text-ink">{t('lab.intro')}</p>
            <p className="text-sm leading-relaxed text-muted">{t('lab.empty')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
