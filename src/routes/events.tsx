import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import styles from './events.module.scss';

export const Route = createFileRoute('/events')({
  component: BlogPage,
});

function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; 

  const posts = [
    {
      id: 1,
      title: "Про нашу опозицію",
      excerpt: "Побуду трохи аналітиком. Звучить смішно, але ще смішніше виглядає той нечисленний освічений народ, який в принципі по поглядам мені близький. Взагалі приводом для написання цього посту стали останні висловлювання та вчинки нашої опозиції. Я не фанат і не...",
      link: "/blog/post-1"
    },
    {
      id: 2,
      title: "Яскравий полум'яний Атлетіко",
      excerpt: "У вівторок (3 травня) подивився відповідний півфінальний матч між Атлетіко та Баварією. У цьому матчі, як і в загальному, болів за Баварію. Але хочу написати кілька слів про Атлетіко. Боже упаси, я не футбольний експерт і не виставляю себе таким, але ж думка може...",
      link: "/blog/post-2"
    },
    {
      id: 3,
      title: "Жалоба за загиблими в авіакатастрофі в Єгипті",
      excerpt: "Я ніяк не можу зрозуміти, чому ніхто не хоче лагодити літаки, але хочуть пускати ракети по Сирії. Чому прості люди, маленькі діти, школярі повинні розставатися зі своїм життям у канікули. Багато разів 'чому'. Але відповідей я не отримаю, хоча я їх...",
      link: "/blog/post-3"
    },
    {
      id: 4,
      title: "Рефакторинг legacy-коду: стратегії та помилки",
      excerpt: "Робота зі старим кодом — це завжди виклик. У цій статті я розповідаю про те, як правильно підходити до рефакторингу великих проектів, не зламавши все навколо, і які інструменти допомагають зробити цей процес безболісним.",
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
      excerpt: "Новий стандарт декораторів нарешті затверджено. Це відкриває неймовірні можливості для метапрограмування та спрощення коду. Показую приклади використання та порівнюю з бібліотечними рішеннями минулого.",
      link: "/blog/post-6"
    }
  ];

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + itemsPerPage);

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

  return (
    <section className={styles.blog}>
      <div className={styles.bgDecor}>
        <div className={styles.decor__rectLeft}></div>
        <div className={styles.decor__rectRight}></div>
        <div className={styles.decor__accentSquare}></div>
      </div>

      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Мій блог</h1>
          {/* Додано опис заголовка */}
          <p className={styles.subtitle}>
            Думки про технології, та життя. 
          </p>
        </header>

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
      </div>
    </section>
  );
}