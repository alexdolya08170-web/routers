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
      </div>
    </footer>
  );
}