import { createFileRoute } from '@tanstack/react-router';
import styles from './about.module.scss';

const experience = [
  {
    id: 1,
    role: "Senior Frontend Engineer",
    company: "FinTech Solutions Group (Kyiv / EU)",
    period: "2023 – 2025",
    description: "Проєктування архітектури на Next.js (SPA/SSR). Оптимізація Core Web Vitals та code splitting. Розробка складних UI (дашборди, аналітика, великі таблиці). Інтеграція REST API та WebSockets. Впровадження SEO-стратегій (SSR, structured data). Робота з великими обсягами даних та оптимізація кешування."
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

const skills = [
  // Core
  "React", "Next", "TypeScript", "JavaScript (ES6+)",
  
  // State Management & Data Fetching
  "Redux Toolkit", "Zustand", "TanStack Query", "Context API",
  
  // Styling & UI
  "Tailwind CSS", "SCSS Modules", "CSS-in-JS", "Framer Motion", "Shadcn/UI",
  
  // Testing & Quality
  "Jest", "React Testing Library", "Cypress", "Playwright", "Storybook",
  
  // Architecture & Patterns
  "FSD Architecture", "Clean Code", "SOLID", "Design Patterns", "Micro-frontends",
  
  // Tools & Build
  "Vite", "Webpack", "Turbopack", "Docker", "CI/CD (GitHub Actions)", "Git",
  
  // Backend & API
  "Node", "Express", "GraphQL", "REST API", "PostgreSQL", "Prisma",
  
  // Other
  "PWA", "Web Accessibility (a11y)", "Core Web Vitals", "Linux"
];

function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.hero__cube} aria-hidden="true"></div>
        <div className={`${styles.hero__cube} ${styles['hero__cube--2']}`} aria-hidden="true"></div>
        <div className={`${styles.hero__cube} ${styles['hero__cube--3']}`} aria-hidden="true"></div>

        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>
            Долинський Олександр Сергійович
          </h1>
          <p className={styles.hero__subtitle}>
            Веб-розробник
          </p>
          
          <div className={styles.hero__actions}>
            <a href="/cv.pdf" download className={styles.hero__btn}>
              Завантажити резюме (PDF)
            </a>
          </div>
        </div>

        <div className={styles.hero__imageWrapper}>
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" 
            alt="Олександр Долинський" 
            className={styles.hero__photo}
          />
        </div>
      </section>

      {/* About Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Про мене</h2>
          
          <div className={styles.aboutContent}>
            <p className={styles.text}>
              Моя філософія розробки базується на створенні архітектури, яка не просто виконує поточні вимоги бізнесу, 
              але й залишається гнучкою, масштабованою та підтримуваною.
            </p>

            <div className={styles.aboutBlock}>
              <h3>Архітектура</h3>
              <p className={styles.text}>
                У роботі з React я приділяю особливу увагу управлінню станом. Я активно використовую композицію компонентів замість наслідування, що дозволяє створювати перевикористовувані будівельні блоки.
                Використовую патерни <strong>Container/Presentational</strong> та <strong>Custom Hooks</strong> для інкапсуляції бізнес-логіки.
              </p>
            </div>

            <div className={styles.aboutBlock}>
              <h3>Робота з даними</h3>
              <p className={styles.text}>
                Маю досвід побудови надійних шарів взаємодії з API. Реалізую оптимістичні оновлення (Optimistic UI) 
                та запобігаю race conditions. Використовую <strong>TanStack Query</strong> для ефективного кешування серверного стану.
              </p>
            </div>

            <div className={styles.aboutBlock}>
              <h3>Продуктивність</h3>
              <p className={styles.text}>
                Розумію механізми рендерингу React. Застосовую оптимізації (<code>React.memo</code>, <code>useMemo</code>) 
                та слідкую за показниками (FCP, CLS, LCP).
              </p>
            </div>

            <div className={styles.aboutBlock}>
              <h3>TypeScript</h3>
              <p className={styles.text}>
                Ціную важливість Developer Experience: налаштовую лінтери, pre-commit хуки та автоматизоване тестування (Jest, Cypress).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Технічний стек</h2>
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <span key={index} className={styles.skillTag}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Досвід роботи</h2>
          <div className={styles.timeline}>
            {experience.map((job) => (
              <div key={job.id} className={styles.timelineItem}>
                <div className={styles.timelineHeader}>
                  <h3 className={styles.jobRole}>{job.role}</h3>
                  <span className={styles.jobPeriod}>{job.period}</span>
                </div>
                <div className={styles.jobCompany}>{job.company}</div>
                <p className={styles.jobDesc}>{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export const Route = createFileRoute('/about')({
  component: AboutPage,
});