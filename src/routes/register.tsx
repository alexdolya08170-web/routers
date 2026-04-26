import { createFileRoute, Link } from '@tanstack/react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './register.module.scss';

export const Route = createFileRoute('/register')({
  component: RegisterPage,
});

const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Мінімум 2 символи').required('Обовязкове поле'),
  email: Yup.string().email('Невірний формат email').required('Обовязкове поле'),
  password: Yup.string().min(6, 'Мінімум 6 символів').required('Обовязкове поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Паролі не співпадають')
    .required('Обовязкове поле'),
});

function RegisterPage() {
  return (
    <section className={styles.auth}>
      <div className={styles.container}>
        <article className={styles.card}>
          <h1 className={styles.title}>Реєстрація</h1>
          <p className={styles.subtitle}>Створіть акаунт, щоб отримати доступ до всіх функцій</p>
          
          <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              console.log('Register:', values);
              alert('Реєстрація успішна!');
            }}
          >
            {({ isSubmitting }) => (
              <Form className={styles.form}>
                <div className={styles.group}>
                  <label htmlFor="name" className={styles.label}>Ім'я</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className={styles.input}
                    placeholder="Іван Петренко"
                  />
                  <ErrorMessage name="name" component="div" className={styles.error} />
                </div>

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

                <div className={styles.group}>
                  <label htmlFor="confirmPassword" className={styles.label}>Підтвердіть пароль</label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={styles.input}
                    placeholder="••••••••"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className={styles.error} />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? 'Завантаження...' : 'Зареєструватися'}
                </button>
              </Form>
            )}
          </Formik>

          <div className={styles.footerLink}>
            <span>Вже маєте акаунт? </span>
            <Link to="/login" className={styles.link}>Увійти</Link>
          </div>
        </article>
      </div>
    </section>
  );
}