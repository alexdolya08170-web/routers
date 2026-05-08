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
      <h2 className={styles.title}>Маєте проект?</h2>
      <p className={styles.subtitle}>
        Давайте обговоримо деталі
      </p>
      <a href="mailto:your@email.com" className={styles.button}>
        Зв'язатися зі мною
      </a>
    </div>
  </footer>
  );
}