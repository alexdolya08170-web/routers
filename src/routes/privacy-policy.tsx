import { createFileRoute, Link } from '@tanstack/react-router';
import styles from './privacy-policy.module.scss';

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <section className={styles.privacy}>
      <div className={styles.breadcrumbs}>
        <Link to="/">Головна</Link>
        <span> / </span>
        <span>Політика конфіденційності</span>
      </div>

      <h1 className={styles.title}>Політика конфіденційності</h1>

      <article className={styles.content}>
        <p>Тут буде текст політики конфіденційності...</p>
      </article>
    </section>
  );
}