'use client';

import { SvgSprites } from '@/components/ui/SvgSprites';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { useI18n } from '@/lib/i18n/context';
import { TERMS_CONTENT } from '@/lib/legal-content';

export default function TermsOfUsePage() {
  const { language } = useI18n();
  const content = TERMS_CONTENT[language];

  return (
    <>
      <SvgSprites />
      <Nav />
      <main className="legal-page">
        <div className="container">
          <h1>{content.title}</h1>
          <p className="legal-page__updated">{content.updated}</p>
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.length === 1 ? (
                <p>{section.body[0]}</p>
              ) : (
                <ul>
                  {section.body.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
