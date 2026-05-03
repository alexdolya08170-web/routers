import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useMemo } from 'react';
import styles from './events.module.scss';

export const Route = createFileRoute('/events')({
  component: BlogPage,
});

function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const itemsPerPage = 6; 

  const posts = [
    {
      id: 1,
      title: "Про нашу опозицію",
      excerpt: "Побуду трохи аналітиком. Звучить смішно, але ще смішніше виглядає той нечисленний освічений народ, який в принципі по поглядах мені близький.",
      link: "/blog/post-1"
    },
    {
      id: 2,
      title: "Яскравий полум'яний Атлетіко",
      excerpt: "У вівторок (3 травня) подивився відповідний півфінальний матч між Атлетіко та Баварією.",
      link: "/blog/post-2"
    },
    {
      id: 3,
      title: "Жалоба за загиблими в авіакатастрофі в Єгипті",
      excerpt: "Я ніяк не можу зрозуміти, чому ніхто не хоче лагодити літаки, але хочуть пускати ракети по Сирії.",
      link: "/blog/post-3"
    },
    {
      id: 4,
      title: "Рефакторинг legacy-коду: стратегії та помилки",
      excerpt: "Робота зі старим кодом — це завжди виклик. У цій статті я розповідаю про те, як правильно підходити до рефакторингу.",
      link: "/blog/post-4"
    },
    {
      id: 5,
      title: "Чому TypeScript стає стандартом індустрії",
      excerpt: "Статична типізація перестає бути опцією і стає обов'язковою вимогою для серйозних проектів.",
      link: "/blog/post-5"
    },
    {
      id: 6,
      title: "Декоратори в JavaScript: майбутнє вже тут",
      excerpt: "Новий стандарт декораторів нарешті затверджено. Це відкриває неймовірні можливості для метапрограмування.",
      link: "/blog/post-6"
    },
    {
      id: 7,
      title: "React Server Components: Глубокое погружение",
      excerpt: "Как RSC меняют подход к разработке на Next.js и почему это важно для производительности.",
      link: "/blog/post-7"
    },
    {
      id: 8,
      title: "Оптимизация сборки Vite",
      excerpt: "Тонкие настройки Rollup и ESBuild для ускорения разработки больших приложений.",
      link: "/blog/post-8"
    },
    {
      id: 9,
      title: "Микросервисы vs Монолит в 2026",
      excerpt: "Когда стоит дробить приложение, а когда лучше оставить всё в одном репозитории.",
      link: "/blog/post-9"
    },
    {
      id: 10,
      title: "AI в фронтенде: уже реальность?",
      excerpt: "Использование генеративных моделей для создания UI компонентов и тестов.",
      link: "/blog/post-10"
    },
    {
      id: 11,
      title: "CSS Container Queries",
      excerpt: "Адаптивность, зависящая от размера контейнера, а не экрана. Полное руководство.",
      link: "/blog/post-11"
    },
    {
      id: 12,
      title: "State Management без библиотек",
      excerpt: "Как использовать Context API и useReducer эффективно в больших приложениях.",
      link: "/blog/post-12"
    }
  ];

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    
    const lowerCaseQuery = searchQuery.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(lowerCaseQuery) || 
      post.excerpt.toLowerCase().includes(lowerCaseQuery)
    );
  }, [posts, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const gridElement = document.querySelector(`.${styles.grid}`);
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <section className={styles.blog}>
      <div className={styles.bgDecor}>
        <div className={styles.decor__rectLeft}></div>
        <div className={styles.decor__rectRight}></div>
        
        <div className={styles.decorCubes}>
          <div className={`${styles.cube} ${styles.cube__1}`}></div>
          <div className={`${styles.cube} ${styles.cube__2}`}></div>
          <div className={`${styles.cube} ${styles.cube__3}`}></div>
        </div>
      </div>

      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Мій блог</h1>
          <p className={styles.subtitle}>
            Думки про технології та життя
          </p>
        </header>

        <div className={styles.searchWrapper}>
          <input 
            type="text" 
            placeholder="Пошук статей..." 
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          {searchQuery && (
             <button 
               onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
               className={styles.clearSearchBtn}
               aria-label="Очистити пошук"
             >
               ×
             </button>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className={styles.noResults}>
            Нічого не знайдено за запитом "{searchQuery}"
          </div>
        ) : (
          <>
            <div className={styles.grid} key={`${currentPage}-${searchQuery}`}>
              {currentPosts.map((post) => (
                <article key={post.id} className={styles.card}>
                  <h2 className={styles.cardTitle}>
                    <a href={post.link}>{post.title}</a>
                  </h2>
                  
                  <p className={styles.excerpt}>
                    {post.excerpt}
                  </p>
                  
                  <a href={post.link} className={styles.readMoreLink}>
                    Читати далі →
                  </a>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className={styles.pagination}>
                <button 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className={styles.paginationArrow}
                  aria-label="Попередня сторінка"
                >
                  ←
                </button>
                
                {pageNumbers.map((page, index) => {
                  if (page === '...') {
                    return (
                      <span key={`dots-${index}`} className={styles.dots}>
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(Number(page))}
                      className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className={styles.paginationArrow}
                  aria-label="Наступна сторінка"
                >
                  →
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}