import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useMemo } from 'react';
import styles from './events.module.scss';

export const Route = createFileRoute('/events')({
  component: BlogPage,
});

function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 2; 

  const posts = [
    {
      id: 1,
      title: "Про нашу опозицію",
      excerpt: "Побуду трохи аналітиком. Звучить смішно, але ще смішніше виглядає той нечисленний освічений народ, який в принципі по поглядах мені близький. Взагалі приводом для написання цього посту стали останні висловлювання та вчинки нашої опозиції.",
      link: "/blog/post-1"
    },
    {
      id: 2,
      title: "Яскравий полум'яний Атлетіко",
      excerpt: "У вівторок (3 травня) подивився відповідний півфінальний матч між Атлетіко та Баварією. У цьому матчі, як і в загальному, болів за Баварію. Але хочу написати кілька слів про Атлетіко.",
      link: "/blog/post-2"
    },
    {
      id: 3,
      title: "Жалоба за загиблими в авіакатастрофі в Єгипті",
      excerpt: "Я ніяк не можу зрозуміти, чому ніхто не хоче лагодити літаки, але хочуть пускати ракети по Сирії. Чому прості люди, маленькі діти, школярі повинні розставатися зі своїм життям у канікули.",
      link: "/blog/post-3"
    },
    {
      id: 4,
      title: "Рефакторинг legacy-коду: стратегії та помилки",
      excerpt: "Робота зі старим кодом — це завжди виклик. У цій статті я розповідаю про те, як правильно підходити до рефакторингу великих проектів, не зламавши все навколо.",
      link: "/blog/post-4"
    },
    {
      id: 5,
      title: "Чому TypeScript стає стандартом індустрії",
      excerpt: "Статична типізація перестає бути опцією і стає обов'язковою вимогою для серйозних проектів. Розбираємося, чому компанії масово переходять на TS і чи варто вчити його новачкам у 2026 році.",
      link: "/blog/post-5"
    },
    {
      id: 6,
      title: "Декоратори в JavaScript: майбутнє вже тут",
      excerpt: "Новий стандарт декораторів нарешті затверджено. Це відкриває неймовірні можливості для метапрограмування та спрощення коду. Показую приклади використання.",
      link: "/blog/post-6"
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
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const gridElement = document.querySelector(`.${styles.grid}`);
    if (gridElement && searchQuery) {
      gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage, searchQuery]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

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
            Думки про технології та життя. 
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
        </div>

        {filteredPosts.length === 0 ? (
          <div className={styles.noResults}>
            Нічого не знайдено за запитом "{searchQuery}"
          </div>
        ) : (
          <>
            <div className={styles.grid} key={currentPage}>
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
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
                  >
                    {page}
                  </button>
                ))}
                
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