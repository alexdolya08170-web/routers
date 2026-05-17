import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useRef, ReactNode, useState } from 'react';
import classNames from 'classnames';
import { getPortfolioItems } from '@/api/services';
import type { PortfolioItem } from '@/api/types';
import styles from './index.module.scss';

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

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    getPortfolioItems()
      .then((items) => {
        if (!cancelled) setPortfolioItems(items);
      })
      .catch((err) => console.error('Не вдалося завантажити портфоліо:', err));
    return () => {
      cancelled = true;
    };
  }, []);

  // Ефект для ініціалізації плавного скролу
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    let scrollRafId: number;
    let mouseRafId: number;

    const handleScroll = () => {
      if (!heroRef.current) return;
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
      scrollRafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const shapes = heroRef.current?.querySelectorAll(`.${styles.parallaxShape}`);
        shapes?.forEach((shape) => {
          const speed = parseFloat(shape.getAttribute('data-speed') || '0.5');
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
        const shapes = heroRef.current?.querySelectorAll(`.${styles.parallaxShape}`);
        shapes?.forEach((shape) => {
          const depth = parseFloat(shape.getAttribute('data-depth') || '20');
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

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className={styles.homePage}>
      <section className={styles.hero} ref={heroRef} aria-label="Hero Section">
        <div className={classNames(styles.glowBlob, styles.glowBlob__1)} aria-hidden="true" />
        <div className={classNames(styles.glowBlob, styles.glowBlob__2)} aria-hidden="true" />
        
        <div 
          className={classNames(styles.shape, styles.shape__circle1, styles.parallaxShape)} 
          data-speed="0.8" 
          data-depth="60" 
          aria-hidden="true"
        />
        <div 
          className={classNames(styles.shape, styles.shape__square1, styles.parallaxShape)} 
          data-speed="-0.4" 
          data-depth="-80" 
          aria-hidden="true"
        />
        
        <div className={styles.hero__diagonal} aria-hidden="true" />
        
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>Долинський Олександр Сергійович</h1>
          <p className={styles.hero__subtitle}>Front-end Engineer (Fullstack) </p>
        </div>
      </section>

      <FadeInSection>
        <section className={styles.about}>
          <div className={styles.container}>
            <div className={styles.content}>
              <h2 className={styles.title}>Про мене</h2>
              <h3 className={styles.name}>Долинський О.С.</h3>
              <p className={styles.role}>Front-end Engineer (Fullstack)</p>
              <p className={styles.description}>
                Розробляю на TypeScript та Python.
              </p>
              <Link to="/about" className={styles.aboutLink}>Детальніше</Link>
            </div>
            <div className={styles.imageWrapper}>
              <img 
                src="./../../photo.jpg" 
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
              {portfolioItems.map((item) => (
                <div key={item.id} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      loading="lazy" 
                      width="400" 
                      height="300" 
                    />
                    <div className={styles.overlay}>
                      <span>{item.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.footerAction}>
              <Link to="/events" className={styles.btnOutline}>
                Переглянути всі роботи
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      {showScrollTop && (
        <button 
          className={classNames(styles['scroll-top'])} 
          onClick={scrollToTop} 
          aria-label="Прокрутити вгору"
        />
      )}
    </div>
  );
}