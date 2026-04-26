import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/news')({
  component: NewsPage,
});

function NewsPage() {
  return (
    <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h1>Новини</h1>
      <p>Сторінка у розробці...</p>
    </section>
  );
}