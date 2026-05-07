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
  const [currentLang, setCurrentLang] = useState<'UA' | 'EN'>('UA');

  // Ефект для скролу
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ефект для блокування скролу body
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.container}>
        
        {/* Логотип */}
        <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
          Долинський <span>О.С.</span>
        </Link>

        {/* Навігація */}
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {navItems.map(({ to, label }) => {
              const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to + '/'));
              
              return (
                <li key={to} className={styles.navItem}>
                  <Link
                    to={to}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                    onClick={closeMobileMenu}
                    activeProps={{ className: styles.navLinkActive }}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            
            {/* Мобільні контролли (ТІЛЬКИ ТУТ перемикач мов) */}
            <div className={styles.mobileControls}>
              <div className={styles.langSwitcherMobile}>
                 <button 
                   className={`${styles.langBtn} ${currentLang === 'UA' ? styles.langBtnActive : ''}`}
                   onClick={() => setCurrentLang('UA')}
                 >
                   UA
                 </button>
                 <span className={styles.langDivider}>/</span>
                 <button 
                   className={`${styles.langBtn} ${currentLang === 'EN' ? styles.langBtnActive : ''}`}
                   onClick={() => setCurrentLang('EN')}
                 >
                   EN
                 </button>
              </div>

              {isAuthenticated && (
                <button className={styles.logoutBtnMobile} onClick={handleLogout}>
                  Вийти
                </button>
              )}
            </div>
          </ul>
        </nav>

        {/* Десктопні контролли (ПУСТО, або можна додати щось інше, але мови тут немає) */}
        <div className={styles.desktopControls}>
          {/* Перемикач мов видалено звідси */}
        </div>

        {/* Бургер кнопка */}
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
      
      {/* Overlay */}
      <div 
        className={`${styles.overlay} ${isMobileMenuOpen ? styles.overlayActive : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />
    </header>
  );
}