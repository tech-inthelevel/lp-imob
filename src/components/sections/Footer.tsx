'use client';

import { useI18n } from '@/lib/i18n/context';
import { TERMS_OF_USE_PATH, PRIVACY_POLICY_PATH } from '@/constants';

const LINKS = [
  { href: TERMS_OF_USE_PATH, key: 'footer.terms' },
  { href: PRIVACY_POLICY_PATH, key: 'footer.privacy' },
];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="imob-footer">
      <div className="imob-footer__inner">
        <a className="imob-footer__logo" href="#top" aria-label="JSYNQ Imob">
          <svg viewBox="0 0 331 40" aria-hidden="true">
            <use href="#logo-lockup" />
          </svg>
        </a>

        <p className="imob-footer__copy">{t('footer.copyright')}</p>

        <nav className="imob-footer__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {t(l.key)}
            </a>
          ))}
        </nav>

        <div className="imob-footer__social">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M4.5 6.75V10.5M4.5 4.5V4.5075M7.5 10.5V6.75M10.5 10.5V8.25C10.5 7.85218 10.342 7.47064 10.0607 7.18934C9.77936 6.90804 9.39782 6.75 9 6.75C8.60218 6.75 8.22064 6.90804 7.93934 7.18934C7.65804 7.47064 7.5 7.85218 7.5 8.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M0.75 3.75C0.75 2.95435 1.06607 2.19129 1.62868 1.62868C2.19129 1.06607 2.95435 0.75 3.75 0.75H11.25C12.0456 0.75 12.8087 1.06607 13.3713 1.62868C13.9339 2.19129 14.25 2.95435 14.25 3.75V11.25C14.25 12.0456 13.9339 12.8087 13.3713 13.3713C12.8087 13.9339 12.0456 14.25 11.25 14.25H3.75C2.95435 14.25 2.19129 13.9339 1.62868 13.3713C1.06607 12.8087 0.75 12.0456 0.75 11.25V3.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="M10.5 25.6667H17.5C23.3333 25.6667 25.6667 23.3333 25.6667 17.5V10.5C25.6667 4.66667 23.3333 2.33333 17.5 2.33333H10.5C4.66667 2.33333 2.33333 4.66667 2.33333 10.5V17.5C2.33333 23.3333 4.66667 25.6667 10.5 25.6667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 18.0833C16.2552 18.0833 18.0833 16.2552 18.0833 14C18.0833 11.7448 16.2552 9.91667 14 9.91667C11.7448 9.91667 9.91667 11.7448 9.91667 14C9.91667 16.2552 11.7448 18.0833 14 18.0833Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20.5755 8.16667H20.589" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
