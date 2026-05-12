import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import classNames from 'classnames';
import styles from './about.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// --- Types ---
interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
}

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  features: string[];
}

// --- Constants ---
const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    title: "Розробка",
    description: "Створення масштабованих SPA/SSR додатків на React та Next.",
    features: ["Feature-Sliced Design архітектура", "TypeScript зі строгою типізацією", "Оптимізація Core Web Vitals", "Code splitting та lazy loading"]
  },
  {
    id: 2,
    title: "Інтеграція та робота з даними",
    description: "Робота з REST/GraphQL, та даних.",
    features: ["REST API / GraphQL інтеграції", "Оптимістичні оновлення та кешування", "Обробка race conditions", "TanStack Query для управління серверним станом"]
  },
  {
    id: 3,
    title: "Реалізація та дизайн-системи",
    description: "Створення адаптивних інтерфейсів згідно дизайн-макетів.",
    features: ["Адаптивна та кросбраузерна верстка", "Tailwind CSS / SCSS Modules", "Доступність (a11y) та семантична розмітка", "Анімації"]
  },
  {
    id: 4,
    title: "SEO та продуктивність",
    description: "Впровадження SEO-стратегій та оптимізація швидкодії для покращення позицій у пошуку.",
    features: ["SSR/SSG/ISR стратегії в Next", "Structured data та meta-теги", "Оптимізація зображень та CDN", "Моніторинг FCP, LCP, CLS"]
  },
  {
    id: 5,
    title: "Тестування та якість коду",
    description: "Налаштування процесів тестування та забезпечення стабільності кодової бази",
    features: ["React Testing Library / Cypress", "ESLint / Prettier / Husky хуки", "Storybook для документування компонентів", "CI/CD pipelines (GitHub Actions)"]
  },
  {
    id: 6,
    title: "Консультації",
    description: "Допомога у архітектурних рішеннях, код-рев'ю.",
    features: ["Архітектурний консалтинг", "Code review та best practices", "Технічна документація"]
  }
];

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 1,
    role: "Front-end Engineer",
    company: "FinTech Solutions Group (Kyiv / EU)",
    period: "2023 – 2026",
    description: ["Розробка front-end на Next (SSR/SSG/ISR)", "Інтеграція REST API та WebSockets", "Робота з великими обсягами даних та оптимізація кешування", "Впровадження SEO-стратегій (meta, structured data)", "Оптимізація Core Web Vitals та client-side rendering"]
  },
  {
    id: 2,
    role: "Front-end Engineer",
    company: "TechBridge Solutions (Cyprus / EU)",
    period: "2021 – 2023",
    description: ["Розробка CRM на React + TypeScript", "Створення компонентної архітектури", "Реалізація бізнес-логіки: угоди, клієнтська база, рольова модель", "Побудова повнотекстового пошуку, фільтрації та сортування", "Інтеграція REST API, обробка помилок та кешування"]
  },
  {
    id: 3,
    role: "Front-end Engineer",
    company: "Digital Core Systems (SaaS / B2B, Kyiv)",
    period: "2019 – 2021",
    description: ["Розробка SaaS/B2B рішень (React + Node)", "Архітектура API Gateway з rate limiting та кешуванням", "Робота з PostgreSQL: оптимізація запитів, індекси, транзакції", "Реалізація системи ролей та доступів (RBAC)", "Побудова dashboard-систем та аналітики"]
  },
  {
    id: 4,
    role: "Front-end Engineer",
    company: "CodeVision (Kyiv)",
    period: "2016 – 2018",
    description: ["Верстка сайтів та landing pages", "Робота з JavaScript функціоналом", "Інтеграція frontend компонентів", "Підтримка та оновлення існуючих проєктів"]
  }
];

const SKILLS_LIST = [
  "React", "Next", "TypeScript", "JavaScript (ES6+)",
  "Redux Toolkit", "Zustand", "TanStack Query", "Context API",
  "Tailwind CSS", "SCSS Modules", "CSS-in-JS", "Framer Motion", "Shadcn/UI",
  "React Testing Library", "Cypress", "Playwright", "Storybook",
  "Feature-Sliced Design", "Clean Code", "SOLID", "Design Patterns",
  "Vite", "Webpack", "Turbopack", "Docker", "CI/CD (GitHub Actions)", "Git",
  "Node", "Express", "Go (Golang)", "GraphQL", "REST API",
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma",
  "SSR/SSG/ISR", "Core Web Vitals", "Structured Data", "Image Optimization",
  "PWA", "Web Accessibility (a11y)", "Figma"
];

// --- Component ---
function AboutPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} aria-label="Introduction">
        <div className={styles['hero__content']}>
          <h1 className={styles['hero__title']}>Долинський Олександр Сергійович</h1>
          <p className={styles['hero__subtitle']}>Веб-розробник</p>          
          <div className={styles['hero__actions']}>
            <a href="/cv.pdf" download className={styles['hero__btn']} aria-label="Завантажити резюме">
              Завантажити резюме
            </a>
          </div>
        </div>
      </section>

      {/* Services Slider Section */}
      <section className={classNames(styles.section, styles['section--services'])}>
        <div className={styles.container}>
          <h2 className={styles['section-title']}>Мої послуги</h2>
          <div className={styles['services-slider']}>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
              className={styles['swiper-container']}
            >
              {SERVICES_DATA.map((service) => (
                <SwiperSlide key={service.id}>
                  <article className={styles['service-card']}>
                    <h3 className={styles['service-title']}>{service.title}</h3>
                    <p className={styles['service-desc']}>{service.description}</p>
                    <ul className={styles['service-features']}>
                      {service.features.map((feature, idx) => (
                        <li key={idx} className={styles['service-feature']}>
                          <span className={styles['feature-indicator']}></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles['section-title']}>Про мене</h2>
          <div className={styles['about-content']}>
            <p className={styles.text}>
             Розробляю на React та Next, оптимізуючи архітектуру.
            </p>
            <article className={styles['about-block']}>
              <h3>Архітектура та підходи</h3>
              <p className={styles.text}>
                Моя філософія розробки базується на <strong>Feature-Sliced Design</strong>. 
              </p>
            </article>
            <article className={styles['about-block']}>
              <h3>Робота з даними</h3>
              <p className={styles.text}>
                Маю досвід інтеграції REST/GraphQL API, роботи з WebSockets та обробки великих обсягів даних. 
                Реалізую оптимістичні оновлення, кешування та запобігаю race conditions.
              </p>
            </article>
            <article className={styles['about-block']}>
              <h3>Продуктивність</h3>
              <p className={styles.text}>
                Глибоко розумію механізми рендерингу React. Застосовую <code>React.memo</code>, <code>useMemo</code>, 
                <code>useCallback</code>, code splitting та слідкую за показниками Core Web Vitals.
              </p>
            </article>
            <article className={styles['about-block']}>
              <h3>Developer Experience</h3>
              <p className={styles.text}>
                Ціную TypeScript зі строгою типізацією, ESLint, Prettier, Husky.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={classNames(styles.section, styles['section--alt'])}>
        <div className={styles.container}>
          <h2 className={styles['section-title']}>Технічний стек</h2>
          <div className={styles['skills-grid']} role="list">
            {SKILLS_LIST.map((skill) => (
              <span key={skill} className={styles['skill-tag']} role="listitem">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles['section-title']}>Досвід роботи</h2>
          <ul className={styles.timeline}>
            {EXPERIENCE_DATA.map((job) => (
              <li key={job.id} className={styles['timeline-item']}>
                <div className={styles['timeline-header']}>
                  <h3 className={styles['job-role']}>{job.role}</h3>
                  <time className={styles['job-period']}>{job.period}</time>
                </div>
                <div className={styles['job-company']}>{job.company}</div>
                <ul className={styles['job-desc-list']}>
                  {job.description.map((item, idx) => (
                    <li key={idx} className={styles['job-desc-item']}>
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className={classNames(styles['scroll-top'])} 
          onClick={scrollToTop} 
          aria-label="Прокрутити вгору"
        />
      )}
    </>
  );
}

export const Route = createFileRoute('/about')({ component: AboutPage });