import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useRef, ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './index.module.scss';

// --- Constants (Moved outside to prevent re-creation on render) ---

const SERVICES = [
  { 
    id: 1, 
    title: "Frontend", 
    description: "Створення адаптивних додатків на React, Next та TypeScript. Використання сучасних підходів (FSD, CDD).",
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
    description: "Налаштування CI/CD пайплайнів, робота з Nginx.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
      </svg>
    )
  },
  { 
    id: 3, 
    title: "Backend", 
    description: "Робота з API, базами даних (MySQL, PostgreSQL).",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
      </svg>
    )
  }
] as const;

const PORTFOLIO_ITEMS = [
  { id: 1, title: "Dashboard UI", image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/dashboard.png" },
  { id: 2, title: "Test Task Main Page", image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/test-task-main-page.png" },
  { id: 3, title: "Study List App", image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/study-list.png" },
  { id: 4, title: "Dashboard View", image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/dashboard.png" }
] as const;

// --- Helper Components ---

/**
 * Component to handle fade-in animation on scroll using IntersectionObserver.
 * Encapsulates the logic to keep the main component clean.
 */
const FadeInSection = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles['is-visible']);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={styles['fade-in-section']}>{children}</div>;
};

// --- Main Route Component ---

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  
  // Parallax Effect Logic
  useEffect(() => {
    let scrollRafId: number;
    let mouseRafId: number;

    const handleScroll = () => {
      if (!heroRef.current) return;
      
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
      
      scrollRafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const shapes = heroRef.current?.querySelectorAll('.parallax-shape');
        shapes?.forEach((shape) => {
          const speed = parseFloat(shape.getAttribute('data-speed') || '0.5');
          // Using translate3d for GPU acceleration
          (shape as HTMLElement).style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
        });
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      if (mouseRafId) cancelAnimationFrame(mouseRafId);

      mouseRafId = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX - innerWidth / 2) / (innerWidth / 2);
        const y = (clientY - innerHeight / 2) / (innerHeight / 2);
        
        const shapes = heroRef.current?.querySelectorAll('.parallax-shape');
        shapes?.forEach((shape) => {
          const depth = parseFloat(shape.getAttribute('data-depth') || '20');
          // Using translate3d instead of margins for better performance
          (shape as HTMLElement).style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(scrollRafId);
      cancelAnimationFrame(mouseRafId);
    };
  }, []);

  return (
    <>
      <section className={styles.hero} ref={heroRef} aria-label="Hero Section">
        <div className={`${styles.glowBlob} ${styles.glowBlob__1}`} aria-hidden="true"></div>
        <div className={`${styles.glowBlob} ${styles.glowBlob__2}`} aria-hidden="true"></div>
        
        {/* Decorative shapes with aria-hidden */}
        <div 
          className={`${styles.shape} ${styles.shape__circle1} parallax-shape`} 
          data-speed="0.2" 
          data-depth="30" 
          aria-hidden="true"
        ></div>
        <div 
          className={`${styles.shape} ${styles.shape__square1} parallax-shape`} 
          data-speed="-0.1" 
          data-depth="-40" 
          aria-hidden="true"
        ></div>
        
        <div className={styles.hero__diagonal} aria-hidden="true"></div>
        
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>Долинський Олександр Сергійович</h1>
          <p className={styles.hero__subtitle}>Веб-розробник</p>
        </div>
      </section>

      <FadeInSection>
        <section className={styles.about}>
          <div className={styles.container}>
            <div className={styles.content}>
              <h2 className={styles.title}>Про мене</h2>
              <h3 className={styles.name}>Олександр</h3>
              <p className={styles.role}>Веб-розробник</p>
              <p className={styles.description}>
                Маю глибокі технічні знання в побудові швидких та адаптивних інтерфейсів на React.
              </p>
              <Link to="/about" className={styles.aboutLink}>Детальніше &rarr;</Link>
            </div>
            <div className={styles.imageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" 
                alt="Олександр Долинський" 
                className={styles.image} 
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className={styles.works}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Мої роботи</h2>
            <div className={styles.grid}>
              {PORTFOLIO_ITEMS.map((item) => (
                <div key={item.id} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      loading="lazy" 
                      width="400" 
                      height="300" 
                    />
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
      </FadeInSection>

      <FadeInSection>
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
              {SERVICES.map((service) => (
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
      </FadeInSection>
    </>
  );
}