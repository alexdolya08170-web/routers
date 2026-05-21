import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import classNames from 'classnames';
import axios from 'axios';
import type { ExperienceItem, ServiceItem } from '@/api/types';
import styles from './about.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

// 🔹 Тип відповіді API
interface AboutApiResponse {
  services: ServiceItem[];
  experience: ExperienceItem[];
  skills: string[];
}

// 🔹 Мапа бейджів для послуг
const SERVICE_BADGES: Record<number, string> = {
  1: 'Frontend',
  2: 'API',
  3: 'UI/UX',
  4: 'Python',
  5: 'SEO',
  6: 'QA',
  7: 'Архітектура',
};

function AboutPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Завантаження даних через axios
  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    axios.get<AboutApiResponse>('/api/about.json', { signal: controller.signal })
      .then((res) => {
        // Підтримує як прямі дані { services: [] }, так і вкладені { data: { services: [] } }
        const payload = res.data as any;
        const rawData = payload.data || payload;

        setServices(Array.isArray(rawData.services) ? rawData.services : []);
        setExperience(Array.isArray(rawData.experience) ? rawData.experience : []);
        setSkills(Array.isArray(rawData.skills) ? rawData.skills : []);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;

        const message = axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : 'Не вдалося завантажити дані сторінки';
        setError(message);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  // 🔹 Обробка скролу для кнопки "вгору"
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // 🔹 Стан завантаження
  if (isLoading) {
    return (
      <div className={styles.aboutPage}>
        <p style={{ textAlign: 'center', padding: '40px' }}>Завантаження...</p>
      </div>
    );
  }

  // 🔹 Стан помилки
  if (error) {
    return (
      <div className={styles.aboutPage}>
        <p style={{ textAlign: 'center', padding: '40px', color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.aboutPage}>
      {/* Декоративні елементи */}
      <div className={styles.pageDecor} aria-hidden="true">
        <div className={styles.pageDecor__frameLeft} />
        <div className={styles.pageDecor__frameRight} />
        <div className={styles.pageDecor__cubes}>
          <div className={classNames(styles.pageDecor__cube, styles['pageDecor__cube--1'])} />
          <div className={classNames(styles.pageDecor__cube, styles['pageDecor__cube--2'])} />
          <div className={classNames(styles.pageDecor__cube, styles['pageDecor__cube--3'])} />
        </div>
      </div>

      {/* Hero секція */}
      <section className={styles.aboutHero} aria-label="Introduction">
        <div className={styles.aboutHero__content}>
          <h1 className={styles.aboutHero__title}>Долинський Олександр Сергійович</h1>
          <p className={styles.aboutHero__subtitle}>Front-end Engineer</p>
          <div className={styles.aboutHero__actions}>
            <a
              href="/cv.pdf"
              download
              className={styles.aboutHero__btn}
              aria-label="Завантажити резюме"
            >
              Завантажити резюме
            </a>
          </div>
        </div>
      </section>

      {/* Про мене */}
      <section className={classNames(styles.aboutSection, styles['aboutSection--intro'])}>
        <div className={styles.siteContainer}>
          <h2 className={styles.aboutSectionTitle}>Про мене</h2>
          <div className={styles['about-grid']}>
            <div className={styles['about-main']}>
              <p className={styles['about-text']}>
                Проєктую та розробляю на React, TypeScript, Python та SQL.
              </p>
              <p className={styles['about-text']}>
                Досвід у SaaS/B2B, SPA, PWA, та автоматизації (bots, scripts, API).
              </p>
              <p className={styles['about-text']}>
                Вірю, що стабільний продукт починається з архітектури, та культури.
              </p>
              <div className={styles['about-meta']}>
                <span className={styles['meta-item']}>Віта-Поштова, Україна</span>
                <span className={styles['meta-item']}>Доступний до співпраці</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Послуги (Swiper) */}
      <section className={classNames(styles.aboutSection, styles['aboutSection--services'])}>
        <div className={styles.siteContainer}>
          <h2 className={styles.aboutSectionTitle}>Мої послуги</h2>
          <div className={styles['services-slider']}>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className={styles['swiper-container']}
            >
              {services?.map((service) => (
                <SwiperSlide key={service.id ?? service.title}>
                  <article className={styles['service-card']}>
                    <span className={styles['service-card__badge']}>
                      {SERVICE_BADGES[service.id as number] ?? 'Послуга'}
                    </span>
                    <h3 className={styles['service-title']}>{service.title}</h3>
                    <p className={styles['service-desc']}>{service.description}</p>
                    <ul className={styles['service-features']}>
                      {service.features?.map((feature, idx) => (
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

      {/* Технічний стек */}
      <section className={classNames(styles.aboutSection, styles['aboutSection--muted'])}>
        <div className={styles.siteContainer}>
          <h2 className={styles.aboutSectionTitle}>Технічний стек</h2>
          <div className={styles['skills-grid']} role="list">
            {skills?.map((skill) => (
              <span key={skill} className={styles['skill-tag']} role="listitem">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Досвід роботи */}
      <section className={styles.aboutSection}>
        <div className={styles.siteContainer}>
          <h2 className={styles.aboutSectionTitle}>Досвід роботи</h2>
          <ul className={styles.timeline}>
            {experience?.map((job) => (
              <li key={job.id ?? job.company} className={styles['timeline-item']}>
                <div className={styles['timeline-header']}>
                  <h3 className={styles['job-role']}>{job.role}</h3>
                  <time className={styles['job-period']}>{job.period}</time>
                </div>
                <div className={styles['job-company']}>{job.company}</div>
                <ul className={styles['job-desc-list']}>
                  {job.description?.map((item, idx) => (
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

      {/* Кнопка "вгору" */}
      {showScrollTop && (
        <button
          className={styles['scroll-top']}
          onClick={scrollToTop}
          aria-label="Прокрутити вгору"
        />
      )}
    </div>
  );
}

export const Route = createFileRoute('/about')({
  component: AboutPage,
});