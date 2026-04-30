import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import styles from './login.module.scss';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Невірний формат email').required('Обовязкове поле'),
  password: Yup.string().min(6, 'Мінімум 6 символів').required('Обовязкове поле'),
});

// Компонент поля з кнопкою очищення
interface CustomFieldProps {
  name: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
}

const CustomInput = ({ name, type, placeholder, icon }: CustomFieldProps) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        const showClearButton = field.value && field.value.length > 0;

        const handleClear = () => {
          form.setFieldValue(name, '');
          // Фокус залишається на полі після очищення
          const inputElement = document.getElementById(name);
          if (inputElement) inputElement.focus();
        };

        return (
          <div className={styles.group}>
            <label htmlFor={name} className={styles.label}>
              {name === 'email' ? 'Email' : 'Пароль'}
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.staticIcon}>{icon}</span>
              
              <input
                {...field}
                id={name}
                type={type}
                className={styles.input}
                placeholder={placeholder}
              />

              {showClearButton && (
                <button
                  type="button"
                  className={styles.clearBtn}
                  onClick={handleClear}
                  aria-label="Очистити поле"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
            <ErrorMessage name={name} component="div" className={styles.error} />
          </div>
        );
      }}
    </Field>
  );
};

function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    console.log('Login:', values);
    await new Promise((resolve) => setTimeout(resolve, 800));
    navigate({ to: '/dashboard' });
  };

  // SVG іконки
  const EmailIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );

  const LockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );

  return (
    <section className={styles.auth}>
      <div className={styles.container}>
        <article className={styles.card}>
          <h1 className={styles.title}>Увійти</h1>
          <p className={styles.subtitle}>Адмінка для контенту</p>
          
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={styles.form}>
                <CustomInput 
                  name="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  icon={EmailIcon} 
                />
                
                <CustomInput 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  icon={LockIcon} 
                />

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? 'Вхід...' : 'Увійти'}
                </button>
              </Form>
            )}
          </Formik>
        </article>
      </div>
    </section>
  );
}