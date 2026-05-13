import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import classNames from 'classnames';
import styles from './about.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

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

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    title: "Розробка",
    description: "Створення SPA/SSR додатків на React та Next.",
    features: [
      "Feature-Sliced Design архітектура",
      "TypeScript зі строгою типізацією",
      "Оптимізація Core Web Vitals",
      "Code splitting та lazy loading"
    ]
  },
  {
    id: 2,
    title: "Backend та API інтеграція",
    description: "Розробка та інтеграція backend-рішень на Python.",
    features: [
      "REST API, GraphQL інтеграції",
      "Python: Django Framework, FastAPI",
      "Асинхронні завдання: Celery, Redis Queue",
      "Оптимістичні оновлення та кешування (TanStack Query)",
      "Обробка race conditions та retry-логіка"
    ]
  },
  {
    id: 3,
    title: "Реалізація та дизайн-системи",
    description: "Створення адаптивних інтерфейсів згідно дизайн-макетів.",
    features: [
      "Адаптивна та кросбраузерна верстка",
      "Tailwind CSS, SCSS Modules, CSS-in-JS",
      "Доступність (a11y) та семантична розмітка",
      "Анімації: Framer Motion, GSAP, CSS transitions"
    ]
  },
  {
    id: 4,
    title: "Python-розробка",
    description: "Створення backend-скриптів та інструментів автоматизації на Python.",
    features: [
      "FastAPI для Python",
      "Парсинг даних: BeautifulSoup, Scrapy, Selenium",
      "Автоматизація: скрипти, боти, cron-задачі",
      "Інтеграція з ML-моделями та data pipelines"
    ]
  },
  {
    id: 5,
    title: "SEO та продуктивність",
    description: "Впровадження SEO-стратегій та оптимізація швидкодії.",
    features: [
      "SSR/SSG/ISR стратегії в Next",
      "Structured data та meta-теги",
      "Оптимізація зображень та CDN",
      "Моніторинг FCP, LCP, CLS через Lighthouse"
    ]
  },
  {
    id: 6,
    title: "Тестування та якість коду",
    description: "Налаштування процесів тестування та забезпечення стабільності.",
    features: [
      "React Testing Library, Cypress",
      "ESLint, Prettier, Husky хуки",
      "Storybook для документування компонентів",
      "CI/CD pipelines (GitHub Actions, GitLab CI)"
    ]
  },
  {
    id: 7,
    title: "Консультації та архітектура",
    description: "Допомога у архітектурних рішеннях, код-рев'ю та технічному плануванні.",
    features: [
      "Архітектурний консалтинг (FSD, Clean Architecture)",
      "Code review та впровадження best practices",
      "Технічна документація та онбординг команди",
      "Міграція з legacy-рішень на сучасний стек"
    ]
  }
];

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 1,
    role: "Front-end Engineer",
    company: "FinTech Solutions Group (Kyiv / EU)",
    period: "2023 – 2026",
    description: [
      "Розробка front-end на Next (SSR/SSG/ISR)",
      "Інтеграція REST API та WebSockets",
      "Робота з великими обсягами даних та оптимізація кешування",
      "Впровадження SEO-стратегій (meta, structured data)",
      "Оптимізація Core Web Vitals та client-side rendering",
      "Співпраця з Python-командою над мікросервісами на FastAPI"
    ]
  },
  {
    id: 2,
    role: "Front-end Engineer",
    company: "TechBridge Solutions (Cyprus / EU)",
    period: "2021 – 2023",
    description: [
      "Розробка CRM на React + TypeScript",
      "Створення компонентної архітектури з нуля",
      "Реалізація бізнес-логіки: угоди, клієнтська база, рольова модель",
      "Побудова повнотекстового пошуку, фільтрації та сортування",
      "Інтеграція REST API, обробка помилок та кешування",
      "Написання Python-скриптів для автоматизації деплою та тестування"
    ]
  },
  {
    id: 3,
    role: "Front-end Engineer",
    company: "Digital Core Systems (SaaS / B2B, Kyiv)",
    period: "2019 – 2021",
    description: [
      "Розробка SaaS/B2B рішень (React)",
      "Архітектура API Gateway з rate limiting та кешуванням",
      "Робота з PostgreSQL: оптимізація запитів, індекси, транзакції",
      "Реалізація системи ролей та доступів (RBAC)",
      "Побудова dashboard-систем та аналітики",
      "Прототипування backend-ендпоінтів на Python/FastAPI для швидкої ітерації"
    ]
  },
  {
    id: 4,
    role: "Front-end Engineer",
    company: "CodeVision (Kyiv)",
    period: "2016 – 2018",
    description: [
      "Верстка сайтів та landing pages",
      "Робота з JavaScript функціоналом",
      "Інтеграція frontend компонентів",
      "Підтримка та оновлення існуючих проєктів",
      "Автоматизація рутинних задач через Python-скрипти"
    ]
  }
];

const SKILLS_LIST = [
  "React", "Next", "TypeScript", "JavaScript",
  "Redux Toolkit", "Zustand", "TanStack Query", "Context API",
  "Tailwind CSS", "SCSS Modules", "CSS-in-JS", "Animations", "Shadcn/UI", "Framer Motion",
  "React Testing Library", "Cypress", "Playwright", "Storybook",
  "Feature-Sliced Design (FSD)", "Clean Code", "SOLID", "Design Patterns",
  "Vite", "Webpack", "Turbopack", "CI/CD (GitHub Actions)", "Git",
  "Python", "Django", "FastAPI",
  "Celery", "Redis", "Pydantic", "SQLAlchemy", "Alembic",
  "BeautifulSoup", "Scrapy", "Selenium", "pandas", "requests",
  "Node", "GraphQL", "REST API", 
  "PostgreSQL", "MySQL", "MongoDB", "Redis",
  "SSR/SSG/ISR", "Core Web Vitals", "Structured Data", "Image Optimization",
  "SPA", "Web Accessibility (a11y)", "Figma", "Swagger/OpenAPI"
];

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
      <section className={styles.hero} aria-label="Introduction">
        <div className={styles['hero__content']}>
          <h1 className={styles['hero__title']}>Долинський Олександр Сергійович</h1>
          <p className={styles['hero__subtitle']}>Web Developer</p>          
          <div className={styles['hero__actions']}>
            <a href="/cv.pdf" download className={styles['hero__btn']} aria-label="Завантажити резюме">
              Завантажити резюме
            </a>
          </div>
        </div>
      </section>

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
              breakpoints={{ 
                640: { slidesPerView: 1 }, 
                768: { slidesPerView: 2 }, 
                1024: { slidesPerView: 3 } 
              }}
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

      <section className={classNames(styles.section, styles['section--alt'])}>
        <div className={styles.container}>
          <h2 className={styles['section-title']}>Технічний стек</h2>
          
          <div className={styles['skills-grid']} role="list">
            {SKILLS_LIST.map((skill) => (
              <span 
                key={skill} 
                className={styles['skill-tag']}
                role="listitem"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

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
                    <li 
                      key={idx} 
                      className={styles['job-desc-item']}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

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