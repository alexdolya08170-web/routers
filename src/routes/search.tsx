import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import styles from './search.module.scss';

export const Route = createFileRoute('/search')({
  component: SearchPage,
});

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setResults([
      `Результат по запросу "${query}" #1`,
      `Результат по запросу "${query}" #2`,
      `Результат по запросу "${query}" #3`,
    ]);
  };

  return (
    <section className={styles.search}>
      <div className={styles.container}>
        <h1 className={styles.title}>Пошук</h1>
        
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Що ви шукаєте?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.btn}>
            Знайти
          </button>
        </form>

        {results.length > 0 && (
          <div className={styles.results}>
            <h2 className={styles.resultsTitle}>Знайдені результати:</h2>
            <ul className={styles.list}>
              {results.map((item, index) => (
                <li key={index} className={styles.item}>
                  <a href="#" className={styles.link}>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}