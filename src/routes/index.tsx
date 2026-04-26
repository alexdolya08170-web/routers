import { createFileRoute } from '@tanstack/react-router';
import styles from './index.module.scss';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.hero__title}>Ласкаво просимо</h1>
      <p className={styles.hero__subtitle}>Сторінка у розробці...</p>
    </section>
  );
}