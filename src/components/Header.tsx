import { Link } from '@tanstack/react-router';
import { useState, useEffect, useCallback } from 'react';
import styles from './Header.module.scss';

interface NavItem {
  to: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Головна' },
  { to: '/about', label: 'Про мене' },
  { to: '/events', label: 'Мої роботи' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    document.body.style.overflow = 'hidden';

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.container}>
        <Link
          to="/"
          className={styles.logo}
          onClick={closeMobileMenu}
          preload="intent"
          aria-label="Долинський О.С. — головна сторінка"
        >
          <svg viewBox="0 0 100 100" className={styles.logoSvg} role="img">
            <g transform="translate(50, 50)">
              <ellipse cx="0" cy="0" rx="42" ry="14" fill="none" stroke="#0055FF" strokeWidth="3.5" className={styles.reactOrbit} />
              <ellipse cx="0" cy="0" rx="42" ry="14" fill="none" stroke="#0055FF" strokeWidth="3.5" transform="rotate(60)" className={styles.reactOrbit} />
              <ellipse cx="0" cy="0" rx="42" ry="14" fill="none" stroke="#0055FF" strokeWidth="3.5" transform="rotate(120)" className={styles.reactOrbit} />
              <circle cx="0" cy="0" r="7" fill="#0055FF" className={styles.reactCore} />
            </g>
          </svg>
        </Link>

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`} aria-label="Головна навігація">
          <ul className={styles.navList}>
            {NAV_ITEMS.map(({ to, label }) => (
              <li key={to} className={styles.navItem}>
                <Link
                  to={to}
                  className={styles.navLink}
                  onClick={closeMobileMenu}
                  activeProps={{ className: styles.navLinkActive }}
                  activeOptions={{ exact: false }}
                  preload="intent"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={`${styles.burgerBtn} ${isMobileMenuOpen ? styles.burgerBtnActive : ''}`}
          aria-label={isMobileMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </button>
      </div>

      <div
        className={`${styles.overlay} ${isMobileMenuOpen ? styles.overlayActive : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />
    </header>
  );
}
