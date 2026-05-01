import { Link, useLocation } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  // Ефект для зміни стилю хедера при скролі
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Блокування скролу сторінки, коли відкрите мобільне меню
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
        <Link to="/" className={styles.logo} onClick={closeMobileMenu} aria-label="На головну">
          <span className={styles.logoText}>Олександр Долинський</span>
        </Link>

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {navItems.map(({ to, label }) => {
              // Перевірка активності маршруту (можна покращити через useMatchRoute, якщо потрібно точніше співпадіння)
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
               <Link to="/login" className={styles.loginBtnMobile} onClick={closeMobileMenu}>
                 Увійти в кабінет
               </Link>
            </div>
          </ul>
        </nav>

        <div className={styles.controls}>
          <div className={styles.langSwitcher}>
             <button className={`${styles.langBtn} ${styles.langActive}`}>UK</button>
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
      
      {/* Затемнення фону при відкритому меню */}
      <div 
        className={`${styles.overlay} ${isMobileMenuOpen ? styles.overlayActive : ''}`}
        onClick={closeMobileMenu}
      />
    </header>
  );
}