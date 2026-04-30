import { Link, useLocation } from '@tanstack/react-router';
import { useState } from 'react';
import styles from './Header.module.scss';

interface NavItem {
  to: string;
  label: string;
}

const navItems: NavItem[] = [
  { to: '/', label: 'Головна' },
  { to: '/news', label: 'Мої роботи' }, 
  { to: '/events', label: 'Мій блог' }
];

export function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMobileMenu} aria-label="На головну">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={styles.logoIcon}
          >
            <path 
              d="M35 20 L75 50 L35 80 L45 80 L75 50 L45 20 Z" 
              fill="#0055FF"
              strokeLinejoin="round"
            />
            <path 
              d="M50 35 L70 50 L50 65 L55 65 L70 50 L55 35 Z" 
              fill="#0055FF" 
              opacity="0.6"
            />
          </svg>
        </Link>

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {navItems.map(({ to, label }) => {
              const isActive = location.pathname === to;
              return (
                <li key={to} className={styles.navItem}>
                  <Link
                    to={to}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                    onClick={closeMobileMenu}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            
            <div className={styles.mobileControls}>
               <Link to="/login" className={styles.loginBtnMobile} onClick={closeMobileMenu}>
                 Увійти
               </Link>
            </div>
          </ul>
        </nav>

        <div className={styles.controls}>
          <button className={styles.iconBtn} aria-label="Пошук">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <div className={styles.langSwitcher}>
             <span className={styles.langActive}>UK</span>
             <span className={styles.langDivider}>/</span>
             <button className={styles.langBtn}>EN</button>
          </div>

          <Link to="/login" className={`${styles.btn} ${styles.btnPrimary}`}>
            Увійти
          </Link>
        </div>

        <button
          className={`${styles.burgerBtn} ${isMobileMenuOpen ? styles.burgerBtnActive : ''}`}
          aria-label="Меню"
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>
      </div>
    </header>
  );
}