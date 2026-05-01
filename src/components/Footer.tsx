import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bgShape}>
        <div className={styles.shape__rect}></div>
        <div className={styles.shape__rect_small}></div>
        <div className={styles.shape__accent}></div>
      </div>

      <div className={styles.container}>
        <h2 className={styles.title}>
          Готові втілити ваші ідеї в реальність?
        </h2>
        
        <p className={styles.subtitle}>
          Я відкритий для ваших пропозицій
        </p>

        <a 
          href="https://t.me/YOUR_TELEGRAM_USERNAME" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.button}
        >
          Написати мені
        </a>

        <div className={styles.socials}>
          <a href="https://t.me/YOUR_TELEGRAM_USERNAME" aria-label="Telegram" title='Telegram' target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
          <a href="/resume.pdf" aria-label="Resume" target="_blank" title='Resume' rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}