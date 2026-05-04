import { Link, useLocation } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import { useAuth } from '../context/AuthContext'; // Імпортуємо хук

interface NavItem {
  to: string;
  label: string;
}

const navItems: NavItem[] = [
  { to: '/', label: 'Головна' },
  { to: '/about', label: 'Про мене' },
  { to: '/news', label: 'Мої роботи' }, 
  { to: '/events', label: 'Мій блог' }
];

export function Header() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth(); // Отримуємо стан та функцію виходу
  
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

  // Обробка кліку по іконці користувача
  const handleProfileClick = (e: React.MouseEvent) => {
    if (isAuthenticated) {
      e.preventDefault();
      // Можна відкрити дропдаун або просто зробити логаут для прикладу
      const confirmLogout = window.confirm('Ви хочете вийти?');
      if (confirmLogout) {
        logout();
      }
    }
  };

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
               {/* Якщо не авторизований, показуємо кнопку входу в мобільному меню */}
               {!isAuthenticated && (
                 <Link to="/login" className={styles.loginBtnMobile} onClick={closeMobileMenu}>
                   Увійти в кабінет
                 </Link>
               )}
               {/* Якщо авторизований, можна показати кнопку виходу */}
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

          {/* Умовний рендеринг іконки */}
          {isAuthenticated ? (
            // Іконка користувача (профілю)
            <button 
              className={styles.profileLink} 
              onClick={handleProfileClick}
              aria-label="Профіль користувача"
            >
              <svg 
                className={styles.loginIcon} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          ) : (
            // Іконка входу (шестерня/налаштування, як було у вас)
            <Link to="/login" className={styles.loginLink} aria-label="Увійти">
              <svg 
                className={styles.loginIcon} 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
              </svg>
            </Link>
          )}
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
