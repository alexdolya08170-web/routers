import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useMemo, useCallback } from 'react';
import styles from './events.module.scss';

// --- Types & Constants ---

type Category = 'All' | 'Web Apps' | 'E-commerce' | 'Corporate' | 'Landing' | 'UI/UX';

const CATEGORIES: Category[] = ['All', 'Web Apps', 'E-commerce', 'Corporate', 'Landing', 'UI/UX'];

interface Project {
  id: number;
  title: string;
  description: string;
  category: Category;
  techStack: string[];
  link?: string;
}

const PROJECTS: Project[] = [
  // --- Web Apps ---
  {
    id: 1,
    title: "CRM система для логістики",
    description: "Розробка повного циклу внутрішньої CRM для управління автопарком. Realtime-трекінг, ролі, аналітика.",
    category: "Web Apps",
    techStack: ["React", "TypeScript", "Node", "PostgreSQL"],
    link: "#"
  },
  {
    id: 4,
    title: "SaaS платформа для навчання",
    description: "Платформа з відео-уроками, тестами та прогресом студентів. Адмін-панель для викладачів.",
    category: "Web Apps",
    techStack: ["React", "Firebase", "Material UI", "Stripe"],
    link: "#"
  },
  {
    id: 7,
    title: "Dashboard фінансового аналізу",
    description: "Візуалізація великих масивів даних, графіки D3.js, експорт звітів у Excel/PDF.",
    category: "Web Apps",
    techStack: ["React", "TypeScript", "D3.js", "Python API"],
    link: "#"
  },
  {
    id: 9,
    title: "Сервіс доставки їжі (PWA)",
    description: "Додаток для замовлення їжі. Робота офлайн, push-сповіщення, кошик.",
    category: "Web Apps",
    techStack: ["React", "Service Workers", "Node", "MongoDB"],
    link: "#"
  },
  {
    id: 11,
    title: "B2B портал постачальника",
    description: "Особистий кабінет для оптових покупців, історія замовлень, документообіг.",
    category: "Web Apps",
    techStack: ["Vue", "Laravel", "MySQL"],
    link: "#"
  },

  // --- E-commerce ---
  {
    id: 2,
    title: "Інтернет-магазин електроніки",
    description: "Високонавантажений магазин з фільтрацією товарів та інтеграцією платіжних систем.",
    category: "E-commerce",
    techStack: ["Next", "Redux Toolkit", "Strapi", "MySQL"],
    link: "#"
  },
  {
    id: 6,
    title: "Маркетплейс рукоділля",
    description: "Платформа для продажу хендмейд виробів. Акцент на мобільну версію та швидкість.",
    category: "E-commerce",
    techStack: ["Next", "PostgreSQL", "Prisma", "AWS S3"],
    link: "#"
  },

  // --- Corporate ---
  {
    id: 3,
    title: "Корпоративний портал IT-компанії",
    description: "Багатомовний сайт з блогом, кейсами та особистим кабінетом клієнта.",
    category: "Corporate",
    techStack: ["Next", "GraphQL", "Tailwind", "Vercel"],
    link: "#"
  },
  {
    id: 8,
    title: "Сайт будівельної компанії",
    description: "Каталог об'єктів, форма зворотного зв'язку, галерея реалізованих проектів.",
    category: "Corporate",
    techStack: ["WordPress", "PHP", "ACF", "JS"],
    link: "#"
  },
  {
    id: 12,
    title: "Блог подорожей",
    description: "Швидкий статичний блог з CMS. Інтеграція Instagram стрічки.",
    category: "Corporate",
    techStack: ["Next", "Contentful", "Styled Components"],
    link: "#"
  },

  // --- Landing ---
  {
    id: 5,
    title: "Лендінг для нерухомості",
    description: "Продаючий лендінг з 3D-туром квартир та калькулятором іпотеки.",
    category: "Landing",
    techStack: ["HTML/SCSS", "Vanilla JS", "GSAP"],
    link: "#"
  },
  {
    id: 10,
    title: "Promo-сайт гаджету",
    description: "Презентаційний сайт з складними скрол-ефектами та відео-фоном.",
    category: "Landing",
    techStack: ["Next", "Framer Motion", "SCSS"],
    link: "#"
  },

  // --- UI/UX ---
  {
    id: 13,
    title: "Дизайн-система для банку",
    description: "Створення повної бібліотеки UI-компонентів, гайдлайнів та токенів для веб та мобільних додатків.",
    category: "UI/UX",
    techStack: ["Figma", "Storybook", "React", "SCSS"],
    link: "#"
  },
  {
    id: 14,
    title: "Редизайн мобільного додатку",
    description: "UX-аудит та оновлення інтерфейсу додатку доставки. Збільшення конверсії на 15%.",
    category: "UI/UX",
    techStack: ["Figma", "Prototyping", "User Research"],
    link: "#"
  },
  {
    id: 15,
    title: "Концепт панелі керування",
    description: "UI-концепт для IoT пристроїв. Темна тема, мінімалізм, адаптивність.",
    category: "UI/UX",
    techStack: ["Figma", "Adobe Illustrator"],
    link: "#"
  }
];

const ITEMS_PER_PAGE = 6;

// --- Helper Functions ---

// Використовуємо явний тип для повернення масиву чисел або рядків
const getPageNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
  const delta = 1;
  const range: number[] = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number | undefined;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l !== undefined) {
      // Перевірка типів перед відніманням
      if (typeof i === 'number' && i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (typeof i === 'number' && i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

// --- Component ---

export const Route = createFileRoute('/events')({
  component: PortfolioPage,
});

function PortfolioPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  
  // Filtering Logic
  const filteredProjects = useMemo(() => {
    let result = PROJECTS;

    if (activeCategory !== 'All') {
      result = result.filter(project => project.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(lowerCaseQuery) || 
        project.description.toLowerCase().includes(lowerCaseQuery) ||
        project.techStack.some(tech => tech.toLowerCase().includes(lowerCaseQuery))
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  
  // Reset page if filters change result in fewer pages
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  // Handlers
  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [totalPages]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setSearchQuery('');
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={styles.blog}>
      <div className={styles.bgDecor} aria-hidden="true">
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
          <h1 className={styles.title}>Мої роботи</h1>
          <p className={styles.subtitle}>
            Від Веб-додатків до UI/UX дизайну
          </p>
        </header>

        <div className={styles.tabsWrapper}>
          <div className={styles.tabs} role="tablist" aria-label="Фільтр проектів">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                aria-controls="projects-grid"
                onClick={() => handleCategoryChange(cat)}
                className={`${styles.tabBtn} ${activeCategory === cat ? styles.tabBtnActive : ''}`}
              >
                {cat === 'All' ? 'Всі' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.searchWrapper}>
          <label htmlFor="project-search" className={styles.visuallyHidden}>Пошук проектів</label>
          <input 
            id="project-search"
            type="text" 
            placeholder={`Пошук проектів або технологій...`} 
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
            aria-label="Пошук проектів"
          />
          {searchQuery && (
             <button 
               onClick={clearSearch}
               className={styles.clearSearchBtn}
               aria-label="Очистити пошук"
               type="button"
             >
               ×
             </button>
          )}
        </div>

        {filteredProjects.length === 0 ? (
          <div className={styles.noResults} role="status">
            Проекти не знайдено
          </div>
        ) : (
          <>
            {/* Removed dynamic key to preserve animation stability and performance */}
            <div className={styles.grid} id="projects-grid">
              {currentProjects.map((project) => (
                <article key={project.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardCategory}>{project.category}</span>
                  </div>
                  <h2 className={styles.cardTitle}>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </a>
                  </h2>
                  
                  <p className={styles.excerpt}>
                    {project.description}
                  </p>
                  
                  <a href={project.link} className={styles.readMoreLink} aria-label={`Детальніше про проект ${project.title}`}>
                    Детальніше →
                  </a>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className={styles.pagination} aria-label="Навігація по сторінках">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className={styles.paginationArrow}
                  aria-label="Попередня сторінка"
                >
                  ←
                </button>
                
                {pageNumbers.map((page, index) => {
                  // Перевірка типу перед рендерингом
                  if (typeof page === 'string') {
                    return (
                      <span key={`dots-${index}`} className={styles.dots} aria-hidden="true">
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)} // Тепер TypeScript знає, що page це number
                      className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
                      aria-current={currentPage === page ? 'page' : undefined}
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