'use client';

/**
 * Concise, recruitment-focused About section — gives the #about anchor a
 * real destination. Not a full biography by design.
 */
import { useLanguage } from '@/context/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  const details = [
    {
      label: t('resume.nav.awards'),
      items: [
        `${t('resume.award1.title')} — ${t('resume.award1.project')}`,
        `${t('resume.award2.title')} — ${t('resume.award2.project')}`,
      ],
    },
    {
      label: t('resume.nav.education'),
      items: [
        `${t('resume.edu1.degree')} — ${t('resume.edu1.result')}`,
        `${t('resume.edu2.degree')} — ${t('resume.edu2.result')}`,
      ],
    },
    {
      label: t('resume.nav.skills'),
      items: [t('resume.skills.featuresText')],
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-14 border-t border-line"
    >
      <div className="mx-auto w-full max-w-site px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
          <h2
            id="about-title"
            className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:col-span-4"
          >
            {t('about.title')}
          </h2>
          <div className="space-y-4 lg:col-span-7 lg:col-start-6">
            <p className="text-base leading-relaxed text-ink">{t('about.body1')}</p>
            <p className="text-base leading-relaxed text-muted">{t('about.body2')}</p>

            <dl className="mt-12 space-y-8 border-t border-line pt-8">
              {details.map((detail) => (
                <div key={detail.label} className="grid gap-3 sm:grid-cols-4 sm:gap-6">
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                    {detail.label}
                  </dt>
                  <dd className="space-y-2 text-sm leading-relaxed text-ink sm:col-span-3">
                    {detail.items.map((item) => <p key={item}>{item}</p>)}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap gap-5 border-t border-line pt-8 text-sm font-medium">
              <a href="mailto:lxie082@outlook.com" className="underline underline-offset-4 hover:text-accent-strong">
                Email
              </a>
              <a href="https://www.linkedin.com/in/lisi-xie-5aa373157/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-accent-strong">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
