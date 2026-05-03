import { createFileRoute } from '@tanstack/react-router';
import styles from './about.module.scss';

const experience = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    period: "2023 — Теперішній час",
    description: "Розробка та підтримка складних SPA на React/Next. Оптимізація продуктивності (Core Web Vitals), впровадження CI/CD пайплайнів, код-рев'ю та менторство молодших розробників. Міграція легасі-коду на TypeScript."
  },
  {
    id: 2,
    role: "Middle Frontend Developer",
    company: "Digital Agency",
    period: "2021 — 2023",
    description: "Створення адаптивних інтерфейсів для e-commerce проектів високого навантаження. Інтеграція REST API та GraphQL, робота зі стейт-менеджерами Redux Toolkit та Zustand. Тестування компонентів за допомогою Jest та React Testing Library."
  },
  {
    id: 3,
    role: "Junior Web Developer",
    company: "StartUp Studio",
    period: "2019 — 2021",
    description: "Верстка лендінгів та корпоративних сайтів. Адаптація дизайну з Figma. Підтримка та доопрацювання сайтів на CMS WordPress. Активне вивчення сучасного стеку JavaScript."
  }
];

const skills = [
  "React", "TypeScript", "Next", "Redux Toolkit", 
  "Tailwind", "SCSS/CSS Modules", "Node", "Git", 
  "Cypress", "Figma", "Webpack/Vite"
];

function HeroSection() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>
            Олександр Долинський
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

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Про мене</h2>
          <p className={styles.text}>
            Я розробник з досвідом створення швидких, масштабованих та доступних додатків. 
            Спеціалізуюся на системі React та Linux. Маю грозуміння принципів компонентного підходу та оптимізації.
            Вмію працювати як самостійно, так і в крос-функціональних командах. Захоплююсь новими технологіями, веду блог про розробку та беру участь у проектах.
          </p>
        </div>
      </section>

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
  component: HeroSection,
});