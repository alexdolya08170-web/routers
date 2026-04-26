import { Link, useLocation } from '@tanstack/react-router';
import { useState } from 'react';
import styles from './Header.module.scss';

interface NavItem {
  to: string;
  label: string;
}

const navItems: NavItem[] = [
  { to: '/about', label: 'Про нас' },
  { to: '/news', label: 'Новини' },
  { to: '/events', label: 'Заходи' }
];

export function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
        <span className={styles.logo__text}>Роднічок</span>
        {/* <span className={styles.logo__tech}>tech®</span> */}
        </Link>

        <button
          className={styles.burgerBtn}
          aria-label="Меню"
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span className={`${styles.burgerLine} ${isMobileMenuOpen ? styles.burgerLineOpen : ''}`}></span>
          <span className={`${styles.burgerLine} ${isMobileMenuOpen ? styles.burgerLineOpen : ''}`}></span>
          <span className={`${styles.burgerLine} ${isMobileMenuOpen ? styles.burgerLineOpen : ''}`}></span>
        </button>

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
          </ul>
        </nav>

        <div className={styles.controls}>
          <Link to="/search" className={styles.searchBtn} aria-label="Пошук">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </Link>

          <select className={styles.select}>
            <option value="uk">UK</option>
            <option value="en">EN</option>
          </select>

          <select className={styles.select}>
            <option value="ua">UK</option>
            <option value="en">EN</option>
          </select>

          <Link to="/login" className={styles.loginBtn} onClick={closeMobileMenu}>
            Увійти
          </Link>
        </div>
      </div>
    </header>
  );
}