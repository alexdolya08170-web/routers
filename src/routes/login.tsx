import { createFileRoute, Link } from '@tanstack/react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './login.module.scss';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Невірний формат email').required('Обовязкове поле'),
  password: Yup.string().min(6, 'Мінімум 6 символів').required('Обовязкове поле'),
});

function LoginPage() {
  return (
    <section className={styles.auth}>
      <div className={styles.container}>
        <article className={styles.card}>
          <h1 className={styles.title}>Увійти</h1>
          <p className={styles.subtitle}>Введіть свої дані для входу в особистий кабінет</p>
          
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log('Login:', values);
              alert('Вхід виконано!');
            }}
          >
            {({ isSubmitting }) => (
              <Form className={styles.form}>
                <div className={styles.group}>
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    placeholder="example@bakotech.com"
                  />
                  <ErrorMessage name="email" component="div" className={styles.error} />
                </div>

                <div className={styles.group}>
                  <label htmlFor="password" className={styles.label}>Пароль</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className={styles.input}
                    placeholder="••••••••"
                  />
                  <ErrorMessage name="password" component="div" className={styles.error} />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? 'Завантаження...' : 'Увійти'}
                </button>
              </Form>
            )}
          </Formik>

          <div className={styles.footerLink}>
            <span>Не маєте акаунту? </span>
            <Link to="/register" className={styles.link}>Зареєструватися</Link>
          </div>
        </article>
      </div>
    </section>
  );
}