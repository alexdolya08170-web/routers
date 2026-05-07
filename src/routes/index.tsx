import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './index.module.scss';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (!heroRef.current) return;
      
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const shapes = heroRef.current?.querySelectorAll('.parallax-shape');
        shapes?.forEach((shape) => {
          const speed = parseFloat(shape.getAttribute('data-speed') || '0.5');
          (shape as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
        });
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX - innerWidth / 2) / (innerWidth / 2);
        const y = (clientY - innerHeight / 2) / (innerHeight / 2);
        
        const shapes = heroRef.current?.querySelectorAll('.parallax-shape');
        shapes?.forEach((shape) => {
          const depth = parseFloat(shape.getAttribute('data-depth') || '20');
          (shape as HTMLElement).style.marginLeft = `${x * depth}px`;
          (shape as HTMLElement).style.marginTop = `${y * depth}px`;
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles['is-visible']);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(`.${styles['fade-in-section']}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const services = [
    { 
      id: 1, 
      title: "Frontend", 
      description: "Створення швидких, адаптивних SPA додатків на React, Next.js та TypeScript. Використання сучасних підходів (FSD, CDD).",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      )
    },
    { 
      id: 2, 
      title: "DevOps", 
      description: "Налаштування CI/CD пайплайнів, робота з Docker, Nginx та хмарними рішеннями (AWS, Vercel) для стабільної роботи проектів.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>
      )
    },
    { 
      id: 3, 
      title: "Backend", 
      description: "Робота з API, базами даних (MySQL, PostgreSQL), налаштування серверної логіки та безпеки даних.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      )
    }
  ];

  const portfolioItems = [
    { id: 1, title: "Dashboard UI", image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/dashboard.png" },
    { id: 2, title: "Test Task Main Page", image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/test-task-main-page.png" },
    { id: 3, title: "Study List App", image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/study-list.png" },
    { id: 4, title: "Dashboard View", image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/dashboard.png" }
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
          <p className={styles.hero__subtitle}>Веб-розробник</p>
        </div>
      </section>

      <div className={styles['fade-in-section']}>
        <section className={styles.about}>
          <div className={styles.container}>
            <div className={styles.content}>
              <h2 className={styles.title}>Про мене</h2>
              <h3 className={styles.name}>Олександр Долинський</h3>
              <p className={styles.role}>Веб-розробник</p>
              <p className={styles.description}>
                Маю глибокі технічні знання в побудові швидких та адаптивних інтерфейсів на React.
              </p>
              <Link to="/about" className={styles.aboutLink}>Детальніше &rarr;</Link>
            </div>
            <div className={styles.imageWrapper}>
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" alt="Олександр Долинський" className={styles.image} />
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
                    <div className={styles.overlay}><span>{item.title}</span></div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.footerAction}>
              <Link to="/events" className={styles.btnOutline}>Переглянути всі роботи</Link>
            </div>
          </div>
        </section>
      </div>

      <div className={styles['fade-in-section']}>
        <section className={styles.services}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Мої Послуги</h2>
            
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{
                clickable: true,
                el: `.${styles.swiperPagination}`,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2 },
              }}
              className={styles.servicesSwiper}
            >
              {services.map((service) => (
                <SwiperSlide key={service.id} className={styles.serviceSlide}>
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceIcon}>
                      {service.icon}
                    </div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDescription}>{service.description}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={styles.swiperPagination}></div>

          </div>
        </section>
      </div>
    </>
  );
}