import { Link, useMatchRoute } from '@tanstack/react-router';
import { useState, useEffect, useCallback } from 'react';
import styles from './Header.module.scss';
import { useAuth } from '../context/AuthContext'; 

interface NavItem {
  to: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Головна' },
  { to: '/about', label: 'Про мене' },
  { to: '/events', label: 'Мої роботи' }
];

export function Header() {
  const matchRoute = useMatchRoute();
  const { isAuthenticated, logout } = useAuth(); 
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState<'UA' | 'EN'>('UA');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleEsc);
      
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  const LangSwitcher = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={isMobile ? styles.langSwitcherMobile : styles.desktopLangSwitcher}>
      <button 
        className={`${styles.langBtn} ${currentLang === 'UA' ? styles.langBtnActive : ''}`}
        onClick={() => setCurrentLang('UA')}
        aria-pressed={currentLang === 'UA'}
      >
        UA
      </button>
      <span className={styles.langDivider} aria-hidden="true">/</span>
      <button 
        className={`${styles.langBtn} ${currentLang === 'EN' ? styles.langBtnActive : ''}`}
        onClick={() => setCurrentLang('EN')}
        aria-pressed={currentLang === 'EN'}
      >
        EN
      </button>
    </div>
  );

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.container}>
        
        {/* Логотип React */}
        <Link 
          to="/" 
          className={styles.logo} 
          onClick={closeMobileMenu}
          preload="intent"
          aria-label="Долинський О.С. — головна сторінка"
        >
          <svg 
            viewBox="0 0 100 100" 
            className={styles.logoSvg}
            role="img"
            aria-labelledby="logoTitle"
          >
            <title id="logoTitle">Логотип React</title>
            
            {/* Група по центру для обертання */}
            <g transform="translate(50, 50)">
              {/* Орбіти */}
              <ellipse 
                cx="0" cy="0" rx="42" ry="14" 
                fill="none" 
                stroke="#0055FF" 
                strokeWidth="3.5"
                className={styles.reactOrbit}
              />
              <ellipse 
                cx="0" cy="0" rx="42" ry="14" 
                fill="none" 
                stroke="#0055FF" 
                strokeWidth="3.5"
                transform="rotate(60)"
                className={styles.reactOrbit}
              />
              <ellipse 
                cx="0" cy="0" rx="42" ry="14" 
                fill="none" 
                stroke="#0055FF" 
                strokeWidth="3.5"
                transform="rotate(120)"
                className={styles.reactOrbit}
              />
              
              {/* Ядро (планета) */}
              <circle 
                cx="0" cy="0" r="7" 
                fill="#0055FF"
                className={styles.reactCore}
              />
            </g>
          </svg>
        </Link>

        {/* Навігація */}
        <nav 
          className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}
          aria-label="Головна навігація"
        >
          <ul className={styles.navList}>
            {NAV_ITEMS.map(({ to, label }) => {
              const isActive = matchRoute({ to, fuzzy: true });
              
              return (
                <li key={to} className={styles.navItem}>
                  <Link
                    to={to}
                    className={styles.navLink}
                    onClick={closeMobileMenu}
                    activeProps={{ className: styles.navLinkActive }}
                    preload="intent"
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            
            {/* Мобільні контролли */}
            <li className={styles.mobileControls}>
              <LangSwitcher isMobile />

              {isAuthenticated && (
                <button 
                  className={styles.logoutBtnMobile} 
                  onClick={handleLogout}
                >
                  Вийти
                </button>
              )}
            </li>
          </ul>
        </nav>

        {/* Десктопні контролли */}
        <div className={styles.desktopControls}>
          <LangSwitcher />
        </div>

        {/* Бургер кнопка */}
        <button
          className={`${styles.burgerBtn} ${isMobileMenuOpen ? styles.burgerBtnActive : ''}`}
          aria-label={isMobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>
      </div>
      
      {/* Overlay */}
      <div 
        className={`${styles.overlay} ${isMobileMenuOpen ? styles.overlayActive : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />
    </header>
  );
}