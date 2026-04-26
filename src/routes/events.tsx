import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/events')({
  component: () => <section style={{padding:'4rem', textAlign:'center'}}><h1>Заходи</h1><p>Сторінка у розробці...</p></section>,
});