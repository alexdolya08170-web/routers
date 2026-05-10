import { createFileRoute } from '@tanstack/react-router';
import styles from './about.module.scss';

// --- Types ---

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

// --- Constants ---

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 1,
    role: "Senior Frontend Engineer",
    company: "FinTech Solutions Group (Kyiv / EU)",
    period: "2023 – 2025",
    description: "Проєктування архітектури на Next.js (SPA/SSR). Оптимізація Core Web Vitals та code splitting. Розробка складних UI (дашборди, аналітика, великі таблиці). Інтеграція REST API. Впровадження SEO-стратегій (SSR, structured data). Робота з великими обсягами даних та оптимізація кешування."
  },
  {
    id: 2,
    role: "Frontend Engineer",
    company: "TechBridge Solutions (Cyprus)",
    period: "2021 – 2023",
    description: "Розробка CRM-системи для автосалонів на React + TypeScript. Створення компонентної архітектури та дизайн-системи. Реалізація бізнес-логіки: угоди, клієнтська база, рольова модель доступу. Побудова повнотекстового пошуку, фільтрації та сортування. Інтеграція REST API, обробка помилок та кешування."
  },
  {
    id: 3,
    role: "Full Stack Engineer",
    company: "Digital Core Systems (Kyiv)",
    period: "2019 – 2021",
    description: "Розробка SaaS/B2B рішень (React + Node.js). Проєктування БД PostgreSQL та оптимізація SQL-запитів. Створення адмін-панелей та dashboard-систем аналітики. Реалізація системи ролей і доступів. Розробка внутрішніх бізнес-інструментів та інтеграція API."
  },
  {
    id: 4,
    role: "Frontend Developer",
    company: "Веб-студія «Bright Studio» (Kyiv)",
    period: "2017 – 2019",
    description: "Розробка інтерфейсів для логістичної системи. Обробка великих масивів даних, реалізація фільтрації та пошуку. Побудова dashboard UI для операторів. Інтеграція з backend API. Оптимізація продуктивності та адаптивна верстка."
  },
  {
    id: 5,
    role: "Junior Web Developer",
    company: "Веб-студія «CodeVision» (Kyiv)",
    period: "2016 – 2017",
    description: "Верстка сайтів та landing pages. Адаптивна та кросбраузерна верстка. Робота з JavaScript функціоналом та інтеграція frontend компонентів. Підтримка та оновлення існуючих проєктів."
  }
];

const SKILLS_LIST = [
  // Core
  "React", "Next", "TypeScript", "JavaScript (ES6+)",
  
  // State Management & Data Fetching
  "Redux Toolkit", "Zustand", "TanStack Query", "Context API",
  
  // Styling & UI
  "Tailwind CSS", "SCSS Modules", "CSS-in-JS", "Framer Motion", "Shadcn/UI",
  
  // Testing & Quality
  "React Testing Library", "Cypress", "Playwright", "Storybook",
  
  // Architecture & Patterns
  "FSD Architecture", "Clean Code", "SOLID", "Design Patterns", "Micro-frontends",
  
  // Tools & Build
  "Vite", "Webpack", "Turbopack", "Docker", "CI/CD (GitHub Actions)", "Git",
  
  // Backend & API
  "Node", "Express", "GraphQL", "REST API", "PostgreSQL", "Prisma",
  
  // Other
  "PWA", "Web Accessibility (a11y)", "Core Web Vitals", "Linux"
];

// --- Component ---

function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} aria-label="Introduction">
        <div className={styles['hero__cube']} aria-hidden="true"></div>
        <div className={`${styles['hero__cube']} ${styles['hero__cube--2']}`} aria-hidden="true"></div>
        <div className={`${styles['hero__cube']} ${styles['hero__cube--3']}`} aria-hidden="true"></div>

        <div className={styles['hero__content']}>
          <h1 className={styles['hero__title']}>
            Долинський Олександр Сергійович
          </h1>
          <p className={styles['hero__subtitle']}>
            Веб-розробник
          </p>
          
          <div className={styles['hero__actions']}>
            <a 
              href="/cv.pdf" 
              download 
              className={styles['hero__btn']}
              aria-label="Завантажити резюме у форматі PDF"
            >
              Завантажити резюме 
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles['section-title']}>Про мене</h2>
          
          <div className={styles['about-content']}>
            <p className={styles.text}>
              Моя філософія розробки базується на створенні архітектури Feature-Sliced Design.
            </p>

            <article className={styles['about-block']}>
              <h3>Робота з даними</h3>
              <p className={styles.text}>
                Реалізую оптимістичні оновлення та запобігаю race conditions.
              </p>
            </article>

            <article className={styles['about-block']}>
              <h3>Продуктивність</h3>
              <p className={styles.text}>
                Розумію механізми рендерингу React.
              </p>
              <p className={styles.text}>
                Застосовую оптимізації (<code>React.memo</code>, <code>useMemo</code>) 
                та слідкую за показниками (FCP, CLS).
              </p>
            </article>

            <article className={styles['about-block']}>
              <h3>TypeScript</h3>
              <p className={styles.text}>
                Ціную важливість Developer Experience: налаштовую лінтери, pre-commit хуки та автоматизоване тестування (React Testing Library, Cypress).
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={`${styles.section} ${styles['section--alt']}`}>
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
                <p className={styles['job-desc']}>{job.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export const Route = createFileRoute('/about')({
  component: AboutPage,
});