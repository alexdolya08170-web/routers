import { createFileRoute } from '@tanstack/react-router';
import { useState, FormEvent, ChangeEvent } from 'react';
import classNames from 'classnames';
import styles from './search.module.scss';

export const Route = createFileRoute('/search')({
  component: SearchPage,
});

// --- Types ---
interface SearchResult {
  id: string;
  title: string;
  url: string;
  description?: string;
}

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    
    if (!trimmedQuery) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    // Імітація API-запиту
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const mockResults: SearchResult[] = [
      {
        id: '1',
        title: `Результат по запросу "${trimmedQuery}" #1`,
        url: '/page/1',
        description: 'Короткий опис знайденого матеріалу для кращого розуміння контексту.',
      },
      {
        id: '2',
        title: `Результат по запросу "${trimmedQuery}" #2`,
        url: '/page/2',
        description: 'Ще один корисний результат, який може зацікавити користувача.',
      },
      {
        id: '3',
        title: `Результат по запросу "${trimmedQuery}" #3`,
        url: '/page/3',
        description: 'Третій результат пошуку з прикладом опису.',
      },
    ];
    
    setResults(mockResults);
    setIsLoading(false);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <section className={styles.search} aria-label="Пошук по сайту">
      <div className={styles.container}>
        <h1 className={styles.title}>Пошук</h1>
        
        <form 
          className={styles.searchForm} 
          onSubmit={handleSearch}
          role="search"
        >
          <label htmlFor="search-input" className={styles.visuallyHidden}>
            Введіть пошуковий запит
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="search-input"
              type="search"
              placeholder="Що ви шукаєте?"
              value={query}
              onChange={handleInputChange}
              className={classNames(styles.input, {
                [styles.inputWithClear]: query.length > 0,
              })}
              aria-autocomplete="list"
              aria-controls="search-results"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className={styles.clearBtn}
                aria-label="Очистити пошуковий запит"
              >
                ×
              </button>
            )}
          </div>
          <button 
            type="submit" 
            className={styles.btn}
            disabled={isLoading || !query.trim()}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <span className={styles.loader} aria-hidden="true"></span>
            ) : (
              'Знайти'
            )}
          </button>
        </form>

        {/* Results Section */}
        <div 
          id="search-results"
          className={styles.results}
          aria-live="polite"
          aria-atomic="true"
        >
          {isLoading && (
            <div className={styles.loading} role="status">
              <span className={styles.loader} aria-hidden="true"></span>
              <span className={styles.visuallyHidden}>Завантаження результатів...</span>
            </div>
          )}

          {!isLoading && hasSearched && results.length === 0 && (
            <p className={styles.empty}>
              Нічого не знайдено за запитом <strong>"{query}"</strong>. 
              Спробуйте змінити формулювання.
            </p>
          )}

          {!isLoading && results.length > 0 && (
            <>
              <h2 className={styles.resultsTitle}>
                Знайдено: {results.length}
              </h2>
              <ul className={styles.list} role="list">
                {results.map((item) => (
                  <li key={item.id} className={styles.item}>
                    <a 
                      href={item.url} 
                      className={styles.link}
                      onClick={(e) => {
                        // Для демо: запобігаємо переходу
                        e.preventDefault();
                        console.log('Перехід на:', item.url);
                      }}
                    >
                      <span className={styles.itemTitle}>{item.title}</span>
                      {item.description && (
                        <span className={styles.itemDesc}>{item.description}</span>
                      )}
                      <span className={styles.itemUrl}>{item.url}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}