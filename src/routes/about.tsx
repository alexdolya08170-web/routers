import { createFileRoute } from '@tanstack/react-router';
import styles from './about.module.scss';

const experience = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    period: "2023 — Теперішній час",
    description: "Архітектура та розробка SPA на React/Next (TypeScript). Оптимізація продуктивності (Core Web Vitals, Lighthouse 95+). Налаштування CI/CD пайплайнів для фронтенду. Проведення код-рев'ю, менторство команди та міграція legacy-кодбази на сучасний стек."
  },
  {
    id: 2,
    role: "Middle Frontend Developer",
    company: "Digital Agency",
    period: "2021 — 2023",
    description: "Розробка e-commerce рішень. Інтеграція REST API та GraphQL. Ефективне управління станом через Redux Toolkit та Zustand. Впровадження unit та E2E тестів (Jest, React Testing Library, Cypress) для забезпечення стабільності релізів."
  },
  {
    id: 3,
    role: "Junior Web Developer",
    company: "StartUp Studio",
    period: "2019 — 2021",
    description: "Pixel-perfect верстка адаптивних інтерфейсів за макетами Figma. Розробка та кастомізація тем для WordPress. Оптимізація швидкості завантаження сайтів. Активне занурення в екосистему JavaScript та сучасні стандарти ES6+."
  }
];

const skills = [
  "React", "Next", "TypeScript", "Redux Toolkit", 
  "Zustand", "Tailwind CSS", "SCSS Modules", 
  "Node.js", "CI/CD", "Git", 
  "Cypress", "Jest", "FSD Architecture", "Webpack/Vite"
];

function HeroSection() {
  return (
    <>
      <section className={styles.hero}>
        {/* Декоративні кубики на фоні */}
        <div className={styles.hero__cube} aria-hidden="true"></div>
        <div className={`${styles.hero__cube} ${styles['hero__cube--2']}`} aria-hidden="true"></div>
        <div className={`${styles.hero__cube} ${styles['hero__cube--3']}`} aria-hidden="true"></div>

        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>
            Олександр Долинський
          </h1>
          <p className={styles.hero__subtitle}>
             Frontend Developer
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
            Маю глибоке розуміння принципів компонентного підходу, роботи з асинхронністю та побудови стабільного UI. 
            Веду технічний блог, ділюсь знаннями та постійно досліджую нові інструменти для покращення Developer Experience.
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