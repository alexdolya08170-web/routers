import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import styles from './index.module.scss';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      
      const shapes = heroRef.current.querySelectorAll('.parallax-shape');
      shapes.forEach((shape) => {
        const speed = parseFloat(shape.getAttribute('data-speed') || '0.5');
        (shape as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (clientY - innerHeight / 2) / (innerHeight / 2);

      const shapes = heroRef.current.querySelectorAll('.parallax-shape');
      shapes.forEach((shape) => {
        const depth = parseFloat(shape.getAttribute('data-depth') || '20');
        const moveX = x * depth;
        const moveY = y * depth;
        
        (shape as HTMLElement).style.marginLeft = `${moveX}px`;
        (shape as HTMLElement).style.marginTop = `${moveY}px`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles['is-visible']);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll(`.${styles['fade-in-section']}`);
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "Як оптимізувати React додаток",
      excerpt: "Розглядаємо техніки мемоізації та code splitting.",
      link: "/blog/post-1"
    },
    {
      id: 2,
      title: "TypeScript поради",
      excerpt: "Типізація та generics у реальних проектах.",
      link: "/blog/post-2"
    },
    {
      id: 3,
      title: "DevOps для фронтендера",
      excerpt: "CI/CD, Docker та Nginx простими словами.",
      link: "/blog/post-3"
    }
  ];

  const portfolioItems = [
    {
      id: 1,
      title: "Dashboard UI",
      image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/dashboard.png"
    },
    {
      id: 2,
      title: "Test Task Main Page",
      image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/test-task-main-page.png"
    },
    {
      id: 3,
      title: "Study List App",
      image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/study-list.png"
    },
    {
      id: 4,
      title: "Dashboard View",
      image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/dashboard.png"
    }
  ];

  return (
    <>
      <section className={styles.hero} ref={heroRef}>
        <div className={`${styles.glowBlob} ${styles.glowBlob__1}`}></div>
        <div className={`${styles.glowBlob} ${styles.glowBlob__2}`}></div>

        <div className={`${styles.shape} ${styles.shape__circle1} parallax-shape`} data-speed="0.2" data-depth="30"></div>
        <div className={`${styles.shape} ${styles.shape__square1} parallax-shape`} data-speed="-0.1" data-depth="-40"></div>

        <div className={styles.hero__diagonal}></div>

        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>Олександр Долинський</h1>
          <p className={styles.hero__subtitle}>
              Розробник (React/Next) та адміністратор.
          </p>

          <div className={styles.hero__buttons}>
            <a href="/projects" className={`${styles.btn} ${styles.btn_primary}`}>
              МОЇ РОБОТИ
            </a>
            <a href="/contacts" className={`${styles.btn} ${styles.btn_outline}`}>
              МІЙ БЛОГ
            </a>
          </div>
        </div>
      </section>

      <div className={styles['fade-in-section']}>
        <section className={styles.about}>
          <div className={styles.container}>
            <div className={styles.content}>
              <h2 className={styles.title}>Про мене</h2>
              <h3 className={styles.name}>Олександр Долинський</h3>
              <p className={styles.role}>Розробник (React/Next) та адміністратор.</p>
              <p className={styles.description}>
              Маю глибокі технічні знання в побудові швидких та адаптивних інтерфейсів, а також у налаштуванні та підтримці мережевої інфраструктури (TCP/IP, DNS, DHCP, VLAN, VPN).
              </p>
            </div>
            <div className={styles.imageWrapper}>
              <img 
                src="https://placehold.co/400" 
                alt="Олександр Долинський" 
                className={styles.image}
              />
            </div>
          </div>
        </section>
      </div>

      <div className={styles['fade-in-section']}>
        <section className={styles.works}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Мої роботи</h2>
            <div className={styles.grid}>
              {portfolioItems.map((item) => (
                <div key={item.id} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <div className={styles.overlay}>
                      <span>{item.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.footerAction}>
              <a href="/portfolio" className={styles.btnOutline}>
                Переглянути всі роботи
              </a>
            </div>
          </div>
        </section>
      </div>

      <div className={styles['fade-in-section']}>
        <section className={styles.blog}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>БЛОГ</h2>
            <div className={styles.blogGrid}>
              {blogPosts.map((post) => (
                // Оборачиваем article в ссылку
                <a key={post.id} href={post.link} className={styles.blogCardLink}>
                  <article className={styles.blogCard}>
                    <div className={styles.blogContent}>
                      <h3 className={styles.blogTitle}>{post.title}</h3>
                      <p className={styles.blogExcerpt}>{post.excerpt}</p>
                    </div>
                  </article>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}