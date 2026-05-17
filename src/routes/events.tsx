// events.tsx
import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import { getEventProjects } from '@/api/services';
import type { EventProject } from '@/api/types';
import styles from './events.module.scss';

// Types & Constants

type Category = 'All' | 'Web Apps' | 'SaaS/B2B' | 'Fintech' | 'SPA';

const CATEGORIES: Category[] = ['All', 'Web Apps', 'SaaS/B2B', 'Fintech', 'SPA'];

type Project = EventProject;

const ITEMS_PER_PAGE = 6;

// Helper Functions

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

// Modal Component

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

// Component

export const Route = createFileRoute('/events')({
  component: PortfolioPage,
});

function PortfolioPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let cancelled = false;
    getEventProjects()
      .then((data) => {
        if (!cancelled) setProjects(data);
      })
      .catch((err) => console.error('Не вдалося завантажити проекти:', err));
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

        {filteredProjects.length === 0 ? (
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