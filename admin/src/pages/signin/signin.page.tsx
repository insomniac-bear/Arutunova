import type { FC } from 'react';
import styles from './signin.module.css';
import { Typography } from '../../ui-kit/typography/typography';
import { Input } from '../../ui-kit/input/input';
import { Button } from '../../ui-kit/button/button';

export const SignInPage: FC = () => {
  return (
    <main className={styles.main}>
      <section aria-label='Вход' className={styles.section}>
        <Typography as='h1' CSSType='heading-1' className={styles.heading}>Admin Panel</Typography>
        <Typography as='h2' CSSType='heading-4' className={styles.title}>Вход</Typography>
        <form className={styles.form}>
          <Input labelName='Email' type='email' />
          <Input labelName='Password' type='password' />
          <Button
            className={styles.button}
            type='submit'
            CSSType='primary'
          >
            Войти
          </Button>
        </form>
      </section>
      <div className={styles.decor} />
    </main>
  );
};
