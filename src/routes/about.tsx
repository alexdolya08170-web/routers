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
    title: 'Розробка',
    description: 'Розробка SPA та SSR додатків на React або Next.',
    features: [
      'Feature-Sliced Design архітектура',
      'TypeScript та масштабована структура проєкту',
      'Оптимізація Core Web Vitals',
      'Code splitting та lazy loading',
    ],
  },
  {
    id: 2,
    title: 'API інтеграція',
    description: 'Розробка та інтеграція backend-рішень.',
    features: [
      'Django та FastAPI',
      'REST API та GraphQL',
      'Інтеграція сторонніх сервісів',
      'Кешування та оптимізація запитів',
    ],
  },
  {
    id: 3,
    title: 'Адаптивна верстка',
    description: 'Створення адаптивних інтерфейсів.',
    features: [
      'SCSS, CSS Modules',
      'Pixel Perfect верстка',
      'Responsive та cross-browser дизайн',
      'Accessibility (a11y)',
    ],
  },
  {
    id: 4,
    title: 'Python-розробка',
    description: 'Розробка Python-скриптів',
    features: [
      'Автоматизація рутинних задач',
      'Парсинг даних та web scraping', 
      'Інтеграція API та data processing',
    ],
  },
  {
    id: 5,
    title: 'SEO та продуктивність',
    description: 'Оптимізація сайтів для пошукових систем та швидкодії.',
    features: [
      'SSR / SSG / ISR',
      'Structured data та meta tags',
      'sitemap.xml та robots.txt',
      'Оптимізація зображень і Lighthouse',
    ],
  },
  {
    id: 6,
    title: 'Тестування',
    description: 'Налаштування тестування та контроль стабільності проєкту.',
    features: [
      'React Testing Library',
      'Cypress та E2E тести',
      'ESLint та Prettier',
      'CI/CD процеси',
    ],
  },
  {
    id: 7,
    title: 'Архітектура та консалтинг',
    description: 'Технічні консультації та побудова масштабованих рішень.',
    features: [
      'Code review та best practices',
      'Feature-Sliced Design',
      'Масштабована архітектура',
      'Міграція legacy-проєктів',
    ],
  },
];

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 1,
    role: 'Front-end Engineer',
    company: 'FinTech (Kyiv / EU)',
    period: '2023 – 2026',
    description: [
      'Розробка front-end на Next (SSR/SSG/ISR)',
      'Інтеграція REST API та WebSockets',
      'Робота з великими обсягами даних',
      'Оптимізація кешування та продуктивності',
      'SEO-оптимізація та structured data',
      'Співпраця з backend-командою FastAPI',
    ],
  },
  {
    id: 2,
    role: 'Full-stack Developer',
    company: 'TechBridge (Cyprus / EU)',
    period: '2021 – 2023',
    description: [
      'Розробка CRM системи на React + TypeScript',
      'Створення компонентної архітектури',
      'Пошук, фільтрація та сортування даних',
      'Інтеграція REST API',
      'Оптимізація UI та бізнес-логіки',
      'Python-скрипти для автоматизації',
    ],
  },
  {
    id: 3,
    role: 'Front-end Engineer',
    company: 'Digital Core (SaaS / B2B, Kyiv)',
    period: '2019 – 2021',
    description: [
      'Розробка SaaS/B2B платформ',
      'Побудова dashboard та аналітики',
      'RBAC та система ролей',
      'Оптимізація PostgreSQL запитів',
      'Робота з API Gateway',
      'FastAPI прототипування backend-рішень',
    ],
  },
  {
    id: 4,
    role: 'Front-end Engineer',
    company: 'CodeVision (Kyiv)',
    period: '2016 – 2018',
    description: [
      'Верстка сайтів та landing pages',
      'JavaScript функціонал',
      'Інтеграція UI компонентів',
      'Підтримка існуючих проєктів',
      'Python автоматизація рутинних задач',
    ],
  },
];

const SKILLS_LIST = [
  'React', 'Next', 'TypeScript', 'JavaScript', 'Redux Toolkit', 'Zustand',
  'TanStack Query', 'Tailwind CSS', 'SCSS Modules', 'Styled-components',
  'Framer Motion', 'GSAP', 'Bootstrap', 'React Testing Library', 'Cypress',
  'Storybook', 'Feature-Sliced Design', 'SOLID', 'Clean Code', 'Vite', 'Webpack',
  'GitHub Actions', 'CI/CD', 'Python', 'Django', 'FastAPI', 'Redis',
  'SQLAlchemy', 'Alembic', 'Node', 'GraphQL', 'API', 'PostgreSQL',
  'MySQL', 'MongoDB', 'SSR / SSG / ISR', 'Core Web Vitals', 'SEO',
  'Structured Data', 'Swagger', 'Figma'
];

function AboutPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section className={styles.hero} aria-label="Introduction">
        <div className={styles['hero__content']}>
          <h1 className={styles['hero__title']}>
            Долинський Олександр Сергійович
          </h1>
          <p className={styles['hero__subtitle']}>
            Front-end Engineer (Fullstack) 
          </p>
          <div className={styles['hero__actions']}>
            <a
              href="/cv.pdf"
              download
              className={styles['hero__btn']}
              aria-label="Завантажити резюме"
            >
              Завантажити резюме
            </a>
          </div>
        </div>
      </section>

      <section className={classNames(styles.section, styles['section--about'])}>
        <div className={styles.container}>
          <h2 className={styles['section-title']}>Про мене</h2>
          <div className={styles['about-grid']}>
            <div className={styles['about-main']}>
              <p className={styles['about-text']}>
                Я Front-end Engineer (Fullstack) з Києва, який створює зручні Веб-інтерфейси. 
              </p>
              <p className={styles['about-text']}>
                Працюю з стеком: React, Next, TypeScript, Python. 
              </p>
              <p className={styles['about-text']}>
              Маю досвід з FinTech, SaaS/B2B, CRM-систем та оптимізації рішень. 
              </p>
              <p className={styles['about-text']}>
              Вірю, що якісний код — це інвестиція в майбутнє проєкту.
              </p>
              <div className={styles['about-meta']}>
                <span className={styles['meta-item']}>Віта-Поштова, Україна</span>
                <span className={styles['meta-item']}>Доступний до співпраці</span>
              </div>
            </div>
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
                1024: { slidesPerView: 3 },
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
                          <span className={styles['feature-indicator']} />
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
              <span key={skill} className={styles['skill-tag']} role="listitem">
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

      {showScrollTop && (
        <button
          className={styles['scroll-top']}
          onClick={scrollToTop}
          aria-label="Прокрутити вгору"
        />
      )}
    </>
  );
}

export const Route = createFileRoute('/about')({
  component: AboutPage,
});