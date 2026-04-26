import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h1>Про нас</h1>
      <p>Сторінка у розробці...</p>
    </section>
  );
}