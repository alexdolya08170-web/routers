// events.tsx
import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import { getEventProjects } from '@/api/services';
import type { EventProject } from '@/api/types';
import styles from './events.module.scss';

type Category = 'All' | 'Web Apps' | 'SaaS/B2B' | 'SPA' | 'BOTS';

const CATEGORIES: Category[] = ['All', 'Web Apps', 'SaaS/B2B', 'SPA', 'BOTS'];

type Project = EventProject;

const ITEMS_PER_PAGE = 6;

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Система для логістики",
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
    ]
  },
  {
    id: 7,
    title: "Платформа для фінансового аналізу",
    description: "Візуалізація великих масивів даних, графіки D3.js, експорт звітів у Excel/PDF.",
    category: "Web Apps",
    techStack: ["React", "TypeScript", "D3.js", "Python API"],
    link: "https://example.com/finance-dashboard",
    fullDescription: "Аналітичний дашборд для фінансових фахівців з інтерактивними візуалізаціями та можливістю експорту даних.",
    features: [
      "Інтерактивні графіки",
      "Фільтрація даних за періодами та категоріями",
      "Експорт у Excel, PDF, CSV",
      "Кастомні дашборди для кожного користувача",
      "Realtime-оновлення даних"
    ]
  },
  {
    id: 9,
    title: "Сервіс доставки їжі",
    description: "Додаток для замовлення їжі. Робота офлайн, push-сповіщення, кошик.",
    category: "Web Apps",
    techStack: ["React", "Service Workers", "Node", "MongoDB"],
    link: "https://example.com/food-delivery",
    fullDescription: "Додаток для замовлення їжі з підтримкою офлайн-режиму та push-сповіщень.",
    features: [
      "Робота офлайн через Service Workers",
      "Push-сповіщення про статус замовлення",
      "Геолокація для визначення доступності доставки",
      "Інтеграція з платіжними системами",
      "Історія замовлень та улюблені страви"
    ]
  },
  {
    id: 11,
    title: "Портал постачальника",
    description: "Особистий кабінет для оптових покупців, історія замовлень, документообіг.",
    category: "Web Apps",
    techStack: ["Vue", "Laravel", "MySQL"],
    link: "https://example.com/b2b-portal",
    fullDescription: "Портал для оптових покупців з повним циклом документообігу та управління замовленнями.",
    features: [
      "Особистий кабінет з історією замовлень",
      "Електронний документообіг (рахунки, акти)",
      "Система знижок та бонусів",
      "API для інтеграції з 1С",
      "Багаторівнева авторизація"
    ]
  },
  {
    id: 2,
    title: "Інтернет-магазин електроніки",
    description: "Високонавантажений магазин з фільтрацією товарів та інтеграцією платіжних систем.",
    category: "Web Apps",
    techStack: ["Next", "Redux Toolkit", "Strapi", "MySQL"],
    link: "https://example.com/electronics-store",
    fullDescription: "Високонавантажений e-commerce проект з розумною фільтрацією, швидким пошуком та безпечними платежами.",
    features: [
      "Розумна фільтрація з фасетним пошуком",
      "SSR для покращення SEO",
      "Інтеграція з LiqPay, WayForPay, Stripe",
      "Кешування на рівні CDN",
      "Адмін-панель з управлінням товарами"
    ]
  },
  {
    id: 6,
    title: "Маркетплейс рукоділля",
    description: "Платформа для продажу хендмейд виробів. Акцент на мобільну версію та швидкість.",
    category: "SaaS/B2B",
    techStack: ["Next", "PostgreSQL", "Prisma", "AWS S3"],
    link: "https://example.com/handmade-marketplace",
    fullDescription: "Маркетплейс для продажу унікальних хендмейд товарів з акцентом на мобільний досвід.",
    features: [
      "Mobile-first підхід у дизайні",
      "Завантаження фото через AWS S3",
      "Система відгуків та рейтингів",
      "Чат між покупцем та продавцем",
      "Інтеграція з Новою Поштою"
    ]
  },
  {
    id: 3,
    title: "Корпоративний портал IT-компанії",
    description: "Багатомовний сайт з блогом, кейсами та особистим кабінетом клієнта.",
    category: "SaaS/B2B",
    techStack: ["Next", "GraphQL", "Tailwind", "Vercel"],
    link: "https://example.com/it-corporate",
    fullDescription: "Корпоративний сайт з підтримкою кількох мов, блогом, портфоліо та особистим кабінетом для клієнтів.",
    features: [
      "Багатомовність (UA/EN/RU) через i18n",
      "GraphQL API для гнучких запитів",
      "Особистий кабінет з історією проектів",
      "Інтеграція з CRM через вебхуки",
      "SEO-оптимізація на рівні SSR"
    ]
  },
  {
    id: 8,
    title: "Сайт будівельної компанії",
    description: "Каталог об'єктів, форма зворотного зв'язку, галерея реалізованих проектів.",
    category: "SaaS/B2B",
    techStack: ["WordPress", "PHP", "ACF", "JS"],
    link: "https://example.com/construction-site",
    fullDescription: "Корпоративний сайт будівельної компанії з каталогом об'єктів та галереєю робіт.",
    features: [
      "Каталог об'єктів з фільтрацією",
      "Галерея з lightbox-переглядом",
      "Форма зворотного зв'язку з валідацією",
      "Інтеграція з Google Maps",
      "Адмін-панель на WordPress + ACF"
    ]
  },
  {
    id: 12,
    title: "Блог подорожей",
    description: "Швидкий статичний блог з CMS. Інтеграція Instagram стрічки.",
    category: "SaaS/B2B",
    techStack: ["Next", "Contentful", "Styled Components"],
    link: "https://example.com/travel-blog",
    fullDescription: "Швидкий статичний блог про подорожі з інтеграцією соціальних мереж та CMS.",
    features: [
      "Статична генерація через Next.js",
      "CMS Contentful для керування контентом",
      "Інтеграція Instagram стрічки",
      "Пошук по статтях",
      "Підписка на новини через email"
    ]
  },
  {
    id: 13,
    title: "Telegram-бот для замовлень",
    description: "Бот для прийому замовлень, інтеграція з CRM, автоматичні сповіщення.",
    category: "BOTS",
    techStack: ["Node.js", "Telegraf", "MongoDB", "Redis"],
    link: "https://example.com/telegram-bot",
    fullDescription: "Потужний Telegram-бот для автоматизації прийому замовлень з інтеграцією в існуючу CRM-систему.",
    features: [
      "Прийом замовлень через інтерактивні меню",
      "Інтеграція з CRM через REST API",
      "Автоматичні сповіщення про статус замовлення",
      "Підтримка багатомовності (UA/EN/RU)",
      "Адмін-панель для керування ботом"
    ]
  },
  {
    id: 14,
    title: "Discord-бот для спільноти",
    description: "Бот для модерації, розваг та аналітики активності в Discord-сервері.",
    category: "BOTS",
    techStack: ["Node.js", "Discord.js", "PostgreSQL", "Docker"],
    link: "https://example.com/discord-bot",
    fullDescription: "Універсальний Discord-бот з модульною архітектурою для управління спільнотою та підвищення активності.",
    features: [
      "Автомодерація контенту та спаму",
      "Система рівнів та репутації користувачів",
      "Музичний плеєр з підтримкою YouTube/Spotify",
      "Статистика активності сервера",
      "Гнучка система команд з правами доступу"
    ]
  },
  {
    id: 5,
    title: "Лендінг для нерухомості",
    description: "Продаючий лендінг з 3D-туром квартир та калькулятором іпотеки.",
    category: "SPA",
    techStack: ["React", "TypeScript", "GSAP", "Three.js"],
    link: "https://example.com/real-estate-landing",
    fullDescription: "Продаючий SPA-додаток для ЖК з інтерактивними елементами та інструментами для клієнтів.",
    features: [
      "3D-тур по квартирах через Three.js",
      "Калькулятор іпотеки з реальними ставками",
      "Анімації через GSAP при скролі",
      "Форма заявки з інтеграцією в CRM",
      "Адаптивний дизайн під всі пристрої"
    ]
  },
  {
    id: 10,
    title: "Promo-сайт гаджету",
    description: "Презентаційний сайт з складними скрол-ефектами та відео-фоном.",
    category: "SPA",
    techStack: ["React", "Framer Motion", "SCSS"],
    link: "https://example.com/gadget-promo",
    fullDescription: "Презентаційний SPA для нового гаджету з іммерсивними анімаціями та відео-контентом.",
    features: [
      "Parallax-ефекти при скролі",
      "Відео-фон з оптимізацією завантаження",
      "Інтерактивна 3D-модель продукту",
      "Анімації через Framer Motion",
      "Preloader для плавного завантаження"
    ]
  }
];

const getPageNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  
  if (currentPage <= 4) {
    for (let i = 1; i <= 5; i++) pages.push(i);
    pages.push('...');
    pages.push(totalPages);
  } else if (currentPage >= totalPages - 3) {
    pages.push(1);
    pages.push('...');
    for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push('...');
    for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
    pages.push('...');
    pages.push(totalPages);
  }

  return pages;
};

interface ModalProps {
  project: Project;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ModalProps) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTabindex = document.body.getAttribute('tabindex');
    
    document.body.style.overflow = 'hidden';
    document.body.setAttribute('tabindex', '-1');
    
    const modalContent = document.getElementById('modal-content');
    modalContent?.focus();

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      if (originalTabindex !== null) {
        document.body.setAttribute('tabindex', originalTabindex);
      } else {
        document.body.removeAttribute('tabindex');
      }
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
          <h2 id="modal-title" className={styles.modalTitle}>{project.title}</h2>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.modalDescription}>
            {project.fullDescription || project.description}
          </p>

          {project.features && project.features.length > 0 && (
            <div className={styles.modalSection}>
              <h3 className={styles.modalSectionTitle}>Можливості:</h3>
              <ul className={styles.featuresList}>
                {project.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

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

export const Route = createFileRoute('/events')({
  component: PortfolioPage,
});

function PortfolioPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    
    getEventProjects()
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          if (err?.response?.status === 404) {
            console.warn('API endpoint not found, using mock data');
          } else {
            console.error('Не вдалося завантажити проекти:', err);
          }
          setProjects(MOCK_PROJECTS);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });
      
    return () => {
      cancelled = true;
    };
  }, []);
  
  const filteredProjects = useMemo(() => {
    let result = projects;

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
  }, [activeCategory, searchQuery, projects]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = useMemo(() => 
    filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE),
    [filteredProjects, startIndex]
  );
  
  const pageNumbers = useMemo(() => 
    getPageNumbers(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [totalPages]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: Category) => {
    setActiveCategory(category);
    setSearchQuery('');
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section className={styles.eventsPage}>
      <div className={styles.pageDecor} aria-hidden="true">
        <div className={styles.pageDecor__frameLeft}></div>
        <div className={styles.pageDecor__frameRight}></div>
        
        <div className={styles.pageDecor__cubes}>
          <div className={classNames(styles.pageDecor__cube, styles['pageDecor__cube--1'])}></div>
          <div className={classNames(styles.pageDecor__cube, styles['pageDecor__cube--2'])}></div>
          <div className={classNames(styles.pageDecor__cube, styles['pageDecor__cube--3'])}></div>
        </div>
      </div>

      <div className={styles.siteContainer}>
        <header className={styles.eventsHeader}>
          <h1 className={styles.eventsTitle}>Мої роботи</h1>
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
                className={classNames(styles.tabBtn, {
                  [styles.tabBtnActive]: activeCategory === cat
                })}
              >
                {cat === 'All' ? 'Всі' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.searchWrapper}>
          <label htmlFor="project-search" className={styles.visuallyHidden}>Пошук робіт за назвою</label>
          <input 
            id="project-search"
            type="text" 
            placeholder="Пошук робіт за назвою" 
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
            aria-label="Пошук робіт за назвою"
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

        {isLoading ? (
          <div className={styles.noResults} role="status" aria-live="polite">
            Завантаження проектів...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className={styles.noResults} role="status" aria-live="polite">
            Проекти не знайдено
          </div>
        ) : (
          <>
            <div className={styles.eventsGrid} id="projects-grid">
              {currentProjects.map((project, index) => (
                <article 
                  key={project.id} 
                  className={styles.projectCard}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={styles.projectCardHeader}>
                    <span className={styles.projectCardCategory}>{project.category}</span>
                  </div>
                  <h2 className={styles.projectCardTitle}>
                    <button 
                      onClick={() => openModal(project)}
                      className={styles.projectCardTitleBtn}
                      aria-label={`Детальніше про проект ${project.title}`}
                    >
                      {project.title}
                    </button>
                  </h2>
                  
                  <p className={styles.projectCardExcerpt}>
                    {project.description}
                  </p>
                  
                  <button 
                    onClick={() => openModal(project)} 
                    className={styles.projectCardLink}
                    aria-label={`Детальніше про проект ${project.title}`}
                  >
                    Детальніше
                  </button>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className={styles.pagination} aria-label="Навігація по сторінках">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className={classNames(styles.paginationArrow, {
                    [styles.paginationArrowDisabled]: currentPage === 1
                  })}
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
                      className={classNames(styles.pageNumber, {
                        [styles.active]: currentPage === page
                      })}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className={classNames(styles.paginationArrow, {
                    [styles.paginationArrowDisabled]: currentPage === totalPages
                  })}
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