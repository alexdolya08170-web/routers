import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import styles from './news.module.scss';

export const Route = createFileRoute('/news')({
  component: PortfolioPage,
});

function PortfolioPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const projects = [
    {
      id: 1,
      title: "Dashboard",
      description: (
        <>
          Панель керування системи обліку клієнтів.
        </>
      ),
      image: "https://kamil-abzalov.com/wp-content/uploads/2022/11/ClientApp-%F0%9F%94%8A-2022-07-28-14-40-17.png",
      link: "/projects/dashboard" // Приклад посилання
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: (
        <>
          Інтернет-магазин електроніки з кошиком, фільтрацією та інтеграцією платіжної системи.
        </>
      ),
      image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/dashboard.png",
      link: "/projects/ecommerce"
    },
    {
      id: 3,
      title: "Task Manager App",
      description: (
        <>
          Додаток для управління завданнями з drag-and-drop, категоріями та сповіщеннями.
        </>
      ),
      image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/eye.png",
      link: "/projects/task-manager"
    },
    {
      id: 4,
      title: "Analytics Dashboard",
      description: (
        <>
          Аналітична панель з графіками, таблицями та експортом даних.
        </>
      ),
      image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/paromy.jpg",
      link: "/projects/analytics"
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: (
        <>
          Особистий сайт-портфоліо з анімаціями, темною темою та адаптивним дизайном. Створено на Next та SCSS.
        </>
      ),
      image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/mQf83duhIEA.jpg",
      link: "/projects/portfolio"
    }
  ];

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const listElement = document.querySelector(`.${styles.list}`);
    if (listElement) {
      listElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className={styles.portfolio}>
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
          <h1 className={styles.title}>Мої роботи</h1>
          <p className={styles.intro}>
            На цій сторінці мої роботи.
          </p>
        </header>

        <div className={styles.list} key={currentPage}>
          {currentProjects.map((project) => (
            <article key={project.id} className={styles.projectItem}>
              <div className={styles.projectInfo}>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <p className={styles.projectDesc}>{project.description}</p>
                <a href={project.link} className={styles.projectLink}>
                  Детальніше &rarr;
                </a>
              </div>

              <div className={styles.projectVisual}>
                <div className={styles.imageWrapper}>
                  <img src={project.image} alt={project.title} />
                </div>
              </div>
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