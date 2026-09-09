'use client';

/**
 * Concise, recruitment-focused About section — gives the #about anchor a
 * real destination. Not a full biography by design.
 */
import { useLanguage } from '@/context/LanguageContext';
import { practiceGroups } from '@/data/practice';
import PracticeLogo from '@/components/PracticeLogo';

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
            <p className="text-base leading-relaxed text-muted">{t('about.body3')}</p>

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

              {/* Practice — hybrid logo/text tool list. Kept out of the
                  generic `details` array above because, unlike Awards/
                  Education, its content needs per-group logo rows plus a
                  secondary capability line rather than a flat list of
                  strings. Same dt/dd grid shape as every other entry in
                  this dl, so it reads as one continuous list. */}
              <div className="grid gap-3 sm:grid-cols-4 sm:gap-6">
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                  {t('about.practice.heading')}
                </dt>
                <dd className="space-y-5 sm:col-span-3">
                  {practiceGroups.map((group) => (
                    <div key={group.id} className="space-y-2">
                      <p className="text-[0.7rem] font-mono uppercase tracking-[0.12em] text-ink">
                        {t(group.headingKey)}
                      </p>
                      {group.logos.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {group.logos.map((logo) => (
                            <span
                              key={logo.id}
                              className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm leading-none text-ink"
                            >
                              <PracticeLogo id={logo.id} className="h-[18px] w-[18px] shrink-0 text-muted" />
                              {logo.name}
                            </span>
                          ))}
                        </div>
                      )}
                      {group.capabilitiesKey && (
                        <p className="text-sm leading-relaxed text-muted">{t(group.capabilitiesKey)}</p>
                      )}
                    </div>
                  ))}
                </dd>
              </div>
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
