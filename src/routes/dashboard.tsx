import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
      <h1>Ласкаво просимо!</h1>
      <p>Ви успішно увійшли.</p>
    </div>
  );
}