import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contacts')({
  component: ContactsPage,
});

function ContactsPage() {
  return (
    <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h1>Зв'язок</h1>
      <p>Сторінка у розробці...</p>
    </section>
  );
}