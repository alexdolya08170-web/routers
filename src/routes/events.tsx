import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useMemo, useCallback } from 'react';
import styles from './events.module.scss';

// --- Types & Constants ---

type Category = 'All' | 'Web Apps' | 'E-commerce' | 'Corporate' | 'Landing';

const CATEGORIES: Category[] = ['All', 'Web Apps', 'E-commerce', 'Corporate', 'Landing'];

interface Project {
  id: number;
  title: string;
  description: string;
  category: Category;
  techStack: string[];
  link: string;
  fullDescription?: string;
  features?: string[];
}

const PROJECTS: Project[] = [
  // --- Web Apps ---
  {
    id: 1,
    title: "CRM система для логістики",
    description: "Розробка повного циклу внутрішньої CRM для управління автопарком. Realtime-трекінг, ролі, аналітика.",
    category: "Web Apps",
    techStack: ["React", "TypeScript", "Node", "PostgreSQL"],
    link: "https://example.com/crm-logistics",
    fullDescription: "Комплексна CRM-система для логістичної компанії, що дозволяє керувати автопарком, відстежувати замовлення в реальному часі та аналізувати ефективність роботи водіїв.",
    features: [
      "Realtime-трекінг транспорту через WebSocket",
      "Рольова модель: адмін, менеджер, водій",
      "Автоматичне формування звітів",
      "Інтеграція з Google Maps API",
      "Push-сповіщення про зміни статусів"
    ],
  },
  {
    id: 4,
    title: "SaaS платформа для навчання",
    description: "Платформа з відео-уроками, тестами та прогресом студентів. Адмін-панель для викладачів.",
    category: "Web Apps",
    techStack: ["React", "Firebase", "Material UI", "Stripe"],
    link: "https://example.com/saas-learning",
    fullDescription: "Освітня платформа з підтримкою відео-контенту, інтерактивних тестів та детальної аналітики прогресу студентів.",
    features: [
      "Стрімінг відео з адаптивним бітрейтом",
      "Автоматична перевірка тестів",
      "Гейміфікація: бейджі, рівні, рейтинги",
      "Платіжна інтеграція Stripe для підписок",
      "Адмін-панель з аналітикою"
    ],
  },
  {
    id: 7,
    title: "Dashboard фінансового аналізу",
    description: "Візуалізація великих масивів даних, графіки D3.js, експорт звітів у Excel/PDF.",
    category: "Web Apps",
    techStack: ["React", "TypeScript", "D3.js", "Python API"],
    link: "https://example.com/finance-dashboard",
    fullDescription: "Аналітичний дашборд для фінансових фахівців з інтерактивними візуалізаціями та можливістю експорту даних.",
    features: [
      "Інтерактивні графіки на D3.js",
      "Фільтрація даних за періодами та категоріями",
      "Експорт у Excel, PDF, CSV",
      "Кастомні дашборди для кожного користувача",
      "Realtime-оновлення даних"
    ],
  },
  {
    id: 9,
    title: "Сервіс доставки їжі (PWA)",
    description: "Додаток для замовлення їжі. Робота офлайн, push-сповіщення, кошик.",
    category: "Web Apps",
    techStack: ["React", "Service Workers", "Node", "MongoDB"],
    link: "https://example.com/food-delivery",
    fullDescription: "PWA-додаток для замовлення їжі з підтримкою офлайн-режиму та push-сповіщень.",
    features: [
      "Робота офлайн через Service Workers",
      "Push-сповіщення про статус замовлення",
      "Геолокація для визначення доступності доставки",
      "Інтеграція з платіжними системами",
      "Історія замовлень та улюблені страви"
    ],
  },
  {
    id: 11,
    title: "B2B портал постачальника",
    description: "Особистий кабінет для оптових покупців, історія замовлень, документообіг.",
    category: "Web Apps",
    techStack: ["Vue", "Laravel", "MySQL"],
    link: "https://example.com/b2b-portal",
    fullDescription: "B2B-портал для оптових покупців з повним циклом документообігу та управління замовленнями.",
    features: [
      "Особистий кабінет з історією замовлень",
      "Електронний документообіг (рахунки, акти)",
      "Система знижок та бонусів",
      "API для інтеграції з 1С",
      "Багаторівнева авторизація"
    ],
  },

  // --- E-commerce ---
  {
    id: 2,
    title: "Інтернет-магазин електроніки",
    description: "Високонавантажений магазин з фільтрацією товарів та інтеграцією платіжних систем.",
    category: "E-commerce",
    techStack: ["Next", "Redux Toolkit", "Strapi", "MySQL"],
    link: "https://example.com/electronics-store",
    fullDescription: "Високонавантажений e-commerce проект з розумною фільтрацією, швидким пошуком та безпечними платежами.",
    features: [
      "Розумна фільтрація з фасетним пошуком",
      "SSR для покращення SEO",
      "Інтеграція з LiqPay, WayForPay, Stripe",
      "Кешування на рівні CDN",
      "Адмін-панель з управлінням товарами"
    ],
  },
  {
    id: 6,
    title: "Маркетплейс рукоділля",
    description: "Платформа для продажу хендмейд виробів. Акцент на мобільну версію та швидкість.",
    category: "E-commerce",
    techStack: ["Next", "PostgreSQL", "Prisma", "AWS S3"],
    link: "https://example.com/handmade-marketplace",
    fullDescription: "Маркетплейс для продажу унікальних хендмейд товарів з акцентом на мобільний досвід.",
    features: [
      "Mobile-first підхід у дизайні",
      "Завантаження фото через AWS S3",
      "Система відгуків та рейтингів",
      "Чат між покупцем та продавцем",
      "Інтеграція з Новою Поштою"
    ],
  },

  // --- Corporate ---
  {
    id: 3,
    title: "Корпоративний портал IT-компанії",
    description: "Багатомовний сайт з блогом, кейсами та особистим кабінетом клієнта.",
    category: "Corporate",
    techStack: ["Next", "GraphQL", "Tailwind", "Vercel"],
    link: "https://example.com/it-corporate",
    fullDescription: "Корпоративний сайт з підтримкою кількох мов, блогом, портфоліо та особистим кабінетом для клієнтів.",
    features: [
      "Багатомовність (UA/EN/RU) через i18n",
      "GraphQL API для гнучких запитів",
      "Особистий кабінет з історією проектів",
      "Інтеграція з CRM через вебхуки",
      "SEO-оптимізація на рівні SSR"
    ],
  },
  {
    id: 8,
    title: "Сайт будівельної компанії",
    description: "Каталог об'єктів, форма зворотного зв'язку, галерея реалізованих проектів.",
    category: "Corporate",
    techStack: ["WordPress", "PHP", "ACF", "JS"],
    link: "https://example.com/construction-site",
    fullDescription: "Корпоративний сайт будівельної компанії з каталогом об'єктів та галереєю робіт.",
    features: [
      "Каталог об'єктів з фільтрацією",
      "Галерея з lightbox-переглядом",
      "Форма зворотного зв'язку з валідацією",
      "Інтеграція з Google Maps",
      "Адмін-панель на WordPress + ACF"
    ],
  },
  {
    id: 12,
    title: "Блог подорожей",
    description: "Швидкий статичний блог з CMS. Інтеграція Instagram стрічки.",
    category: "Corporate",
    techStack: ["Next", "Contentful", "Styled Components"],
    link: "https://example.com/travel-blog",
    fullDescription: "Швидкий статичний блог про подорожі з інтеграцією соціальних мереж та CMS.",
    features: [
      "Статична генерація через Next.js",
      "CMS Contentful для керування контентом",
      "Інтеграція Instagram стрічки",
      "Пошук по статтях",
      "Підписка на новини через email"
    ],
  },

  // --- Landing ---
  {
    id: 5,
    title: "Лендінг для нерухомості",
    description: "Продаючий лендінг з 3D-туром квартир та калькулятором іпотеки.",
    category: "Landing",
    techStack: ["HTML/SCSS", "Vanilla JS", "GSAP"],
    link: "https://example.com/real-estate-landing",
    fullDescription: "Продаючий лендінг для ЖК з інтерактивними елементами та інструментами для клієнтів.",
    features: [
      "3D-тур по квартирах через Three.js",
      "Калькулятор іпотеки з реальними ставками",
      "Анімації через GSAP при скролі",
      "Форма заявки з інтеграцією в CRM",
      "Адаптивний дизайн під всі пристрої"
    ],
  },
  {
    id: 10,
    title: "Promo-сайт гаджету",
    description: "Презентаційний сайт з складними скрол-ефектами та відео-фоном.",
    category: "Landing",
    techStack: ["Next", "Framer Motion", "SCSS"],
    link: "https://example.com/gadget-promo",
    fullDescription: "Презентаційний сайт для нового гаджету з іммерсивними анімаціями та відео-контентом.",
    features: [
      "Parallax-ефекти при скролі",
      "Відео-фон з оптимізацією завантаження",
      "Інтерактивна 3D-модель продукту",
      "Анімації через Framer Motion",
      "Preloader для плавного завантаження"
    ],
  },
];

const ITEMS_PER_PAGE = 6;

// --- Helper Functions ---

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

// --- Modal Component ---

interface ModalProps {
  project: Project;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ModalProps) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    const modalContent = document.getElementById('modal-content');
    modalContent?.focus();

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={styles.modalOverlay} 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        id="modal-content"
        className={styles.modalContent}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className={styles.modalCloseBtn} 
          onClick={onClose}
          aria-label="Закрити модальне вікно"
        >
          ×
        </button>

        <div className={styles.modalHeader}>
          <span className={styles.modalCategory}>{project.category}</span>
          <h2 id="modal-title" className={styles.modalTitle}>{project.title}</h2>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.modalDescription}>
            {project.fullDescription || project.description}
          </p>

          {project.features && project.features.length > 0 && (
            <div className={styles.modalSection}>
              <h3 className={styles.modalSectionTitle}>Ключові можливості:</h3>
              <ul className={styles.featuresList}>
                {project.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>● {feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Посилання на проект (замість технологій) */}
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.modalProjectLink}
          >
            <span className={styles.modalLinkIcon}>↗</span>
            <span className={styles.modalLinkText}>Переглянути проект</span>
          </a>
        </div>

        <div className={styles.modalFooter}>
          <button 
            className={styles.modalCloseBtnPrimary}
            onClick={onClose}
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Component ---

export const Route = createFileRoute('/events')({
  component: PortfolioPage,
});

function PortfolioPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
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

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

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

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

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
            placeholder="Пошук проектів" 
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
            <div className={styles.grid} id="projects-grid">
              {currentProjects.map((project) => (
                <article key={project.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardCategory}>{project.category}</span>
                  </div>
                  <h2 className={styles.cardTitle}>
                    <button 
                      onClick={() => openModal(project)}
                      className={styles.cardTitleBtn}
                      aria-label={`Детальніше про проект ${project.title}`}
                    >
                      {project.title}
                    </button>
                  </h2>
                  
                  <p className={styles.excerpt}>
                    {project.description}
                  </p>
                  
                  <button 
                    onClick={() => openModal(project)} 
                    className={styles.readMoreLink}
                    aria-label={`Детальніше про проект ${project.title}`}
                  >
                    Детальніше →
                  </button>
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
                      onClick={() => handlePageChange(page)}
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

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={closeModal} 
        />
      )}
    </section>
  );
}