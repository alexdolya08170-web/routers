// events.tsx
import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import type { EventProject, EventProjectsApiResponse } from '@/api/types';
import styles from './events.module.scss';

type Category = 'All' | 'Web Apps' | 'SaaS/B2B' | 'SPA' | 'BOTS';
const CATEGORIES: Category[] = ['All', 'Web Apps', 'SaaS/B2B', 'SPA', 'BOTS'];
type Project = EventProject;
const ITEMS_PER_PAGE = 6;

// 🔹 Допоміжна функція пагінації
const getPageNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
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

// 🔹 Модальне вікно
interface ModalProps {
  project: Project;
  onClose: () => void;
}
function ProjectModal({ project, onClose }: ModalProps) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.setAttribute('tabindex', '-1');
    document.getElementById('modal-content')?.focus();
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.removeAttribute('tabindex');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true">
      <div id="modal-content" className={styles.modalContent} tabIndex={-1} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalCloseBtn} onClick={onClose} aria-label="Закрити">×</button>
        <div className={styles.modalHeader}><h2 className={styles.modalTitle}>{project.title}</h2></div>
        <div className={styles.modalBody}>
          <p className={styles.modalDescription}>{project.fullDescription || project.description}</p>
          {project.features?.length ? (
            <div className={styles.modalSection}>
              <h3 className={styles.modalSectionTitle}>Можливості:</h3>
              <ul className={styles.featuresList}>
                {project.features.map((f, i) => <li key={i} className={styles.featureItem}>{f}</li>)}
              </ul>
            </div>
          ) : null}
          <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.modalProjectLink}>
            <span className={styles.modalLinkIcon}>↗</span> Переглянути проект
          </a>
        </div>
        <div className={styles.modalFooter}><button className={styles.modalCloseBtnPrimary} onClick={onClose}>Закрити</button></div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/events')({ component: PortfolioPage });

function PortfolioPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Завантаження з JSON
  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    axios.get<EventProjectsApiResponse>('/api/events.json', { signal: controller.signal })
      .then((res) => {
        const payload = res.data as any;
        const rawData = payload.data || payload;
        const items = Array.isArray(rawData.projects) ? rawData.projects : [];
        setProjects(items);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          console.warn('events.json not found');
          setProjects([]);
        } else {
          setError('Не вдалося завантажити проекти');
          setProjects([]);
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  // 🔹 Фільтрація
  const filteredProjects = useMemo(() => {
    let result = projects;
    if (activeCategory !== 'All') result = result.filter(p => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.techStack.some(t => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [activeCategory, searchQuery, projects]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = useMemo(() => filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE), [filteredProjects, startIndex]);
  const pageNumbers = useMemo(() => getPageNumbers(currentPage, totalPages), [currentPage, totalPages]);

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

  const clearSearch = useCallback(() => { setSearchQuery(''); setCurrentPage(1); }, []);
  const handleCategoryChange = useCallback((cat: Category) => { setActiveCategory(cat); setSearchQuery(''); setCurrentPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  const openModal = useCallback((p: Project) => setSelectedProject(p), []);
  const closeModal = useCallback(() => setSelectedProject(null), []);

  if (error && projects.length === 0) {
    return (
      <section className={styles.eventsPage}>
        <div className={styles.siteContainer}>
          <div className={styles.noResults} role="alert">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className={styles.btnOutline} style={{ marginTop: '16px' }}>Спробувати знову</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.eventsPage}>
      <div className={styles.pageDecor} aria-hidden="true">
        <div className={styles.pageDecor__frameLeft} /><div className={styles.pageDecor__frameRight} />
        <div className={styles.pageDecor__cubes}>
          <div className={classNames(styles.pageDecor__cube, styles['pageDecor__cube--1'])} />
          <div className={classNames(styles.pageDecor__cube, styles['pageDecor__cube--2'])} />
          <div className={classNames(styles.pageDecor__cube, styles['pageDecor__cube--3'])} />
        </div>
      </div>

      <div className={styles.siteContainer}>
        <header className={styles.eventsHeader}><h1 className={styles.eventsTitle}>Мої роботи</h1></header>

        <div className={styles.tabsWrapper}>
          <div className={styles.tabs} role="tablist">
            {CATEGORIES.map(cat => (
              <button key={cat} role="tab" aria-selected={activeCategory === cat} onClick={() => handleCategoryChange(cat)}
                className={classNames(styles.tabBtn, { [styles.tabBtnActive]: activeCategory === cat })}>
                {cat === 'All' ? 'Всі' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.searchWrapper}>
          <label htmlFor="project-search" className={styles.visuallyHidden}>Пошук</label>
          <input id="project-search" type="text" placeholder="Пошук робіт за назвою" value={searchQuery} onChange={handleSearchChange} className={styles.searchInput} />
          {searchQuery && <button onClick={clearSearch} className={styles.clearSearchBtn} aria-label="Очистити">×</button>}
        </div>

        {isLoading ? (
          <div className={styles.noResults} role="status">Завантаження...</div>
        ) : filteredProjects.length === 0 ? (
          <div className={styles.noResults} role="status">Проекти не знайдено</div>
        ) : (
          <>
            <div className={styles.eventsGrid}>
              {currentProjects.map((project, index) => (
                <article key={project.id} className={styles.projectCard} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={styles.projectCardHeader}><span className={styles.projectCardCategory}>{project.category}</span></div>
                  <h2 className={styles.projectCardTitle}>
                    <button onClick={() => openModal(project)} className={styles.projectCardTitleBtn}>{project.title}</button>
                  </h2>
                  <p className={styles.projectCardExcerpt}>{project.description}</p>
                  <button onClick={() => openModal(project)} className={styles.projectCardLink}>Детальніше</button>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className={styles.pagination} aria-label="Пагінація">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={classNames(styles.paginationArrow, { [styles.paginationArrowDisabled]: currentPage === 1 })}>←</button>
                {pageNumbers.map((page, i) => typeof page === 'string' ? (
                  <span key={`dots-${i}`} className={styles.dots}>...</span>
                ) : (
                  <button key={page} onClick={() => handlePageChange(page)} className={classNames(styles.pageNumber, { [styles.active]: currentPage === page })} aria-current={currentPage === page ? 'page' : undefined}>{page}</button>
                ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={classNames(styles.paginationArrow, { [styles.paginationArrowDisabled]: currentPage === totalPages })}>→</button>
              </nav>
            )}
          </>
        )}
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}
    </section>
  );
}