import { Link, useLocation } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import { useAuth } from '../context/AuthContext'; 

interface NavItem {
  to: string;
  label: string;
}

const navItems: NavItem[] = [
  { to: '/', label: 'Головна' },
  { to: '/about', label: 'Про мене' },
  { to: '/events', label: 'Мої роботи' }
];

export function Header() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth(); 
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.container}>
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {navItems.map(({ to, label }) => {
              const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
              
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
               {isAuthenticated && (
                 <button className={styles.logoutBtnMobile} onClick={() => { logout(); closeMobileMenu(); }}>
                   Вийти
                 </button>
               )}
            </div>
          </ul>
        </nav>

        <div className={styles.controls}>
          <div className={styles.langSwitcher}>
             <button className={`${styles.langBtn} ${styles.langBtnActive}`}>UA</button>
             <span className={styles.langDivider}>/</span>
             <button className={styles.langBtn}>EN</button>
          </div>
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
      
      <div 
        className={`${styles.overlay} ${isMobileMenuOpen ? styles.overlayActive : ''}`}
        onClick={closeMobileMenu}
      />
    </header>
  );
}