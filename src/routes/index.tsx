import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useRef, ReactNode, useState } from 'react';
import styles from './index.module.scss';

// --- Constants ---
const PORTFOLIO_ITEMS = [
  { id: 1, title: "Dashboard UI", image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/dashboard.png" },
  { id: 2, title: "Test Task Main Page", image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/test-task-main-page.png" },
  { id: 3, title: "Study List App", image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/study-list.png" },
  { id: 4, title: "Dashboard View", image: "https://kamil-abzalov.com/wp-content/uploads/2022/07/dashboard.png" }
] as const;

// --- Helper Components ---
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
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Parallax Effect
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

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <section className={styles.hero} ref={heroRef} aria-label="Hero Section">
        <div className={`${styles.glowBlob} ${styles.glowBlob__1}`} aria-hidden="true"></div>
        <div className={`${styles.glowBlob} ${styles.glowBlob__2}`} aria-hidden="true"></div>
        
        <div className={`${styles.shape} ${styles.shape__circle1} parallax-shape`} data-speed="0.2" data-depth="30" aria-hidden="true"></div>
        <div className={`${styles.shape} ${styles.shape__square1} parallax-shape`} data-speed="-0.1" data-depth="-40" aria-hidden="true"></div>
        
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
              <h3 className={styles.name}>Долинський О.С.</h3>
              <p className={styles.role}>Веб-розробник</p>
              <p className={styles.description}>
                Маю глибокі технічні знання в побудові швидких та адаптивних інтерфейсів на React.
              </p>
              <Link to="/about" className={styles.aboutLink}>Детальніше →</Link>
            </div>
            <div className={styles.imageWrapper}>
              <img src="./../../photo.jpg" alt="Олександр Долинський" className={styles.image} width="400" height="500" />
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
                    <img src={item.image} alt={item.title} loading="lazy" width="400" height="300" />
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

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className={styles['scroll-top']} onClick={scrollToTop} aria-label="Прокрутити вгору"></button>
      )}
    </>
  );
}