import type { FC } from 'react';
import type { InferType } from 'yup';
import styles from './signin.module.css';
import { Typography } from '../../ui-kit/typography/typography';
import { Input } from '../../ui-kit/input/input';
import { Button } from '../../ui-kit/button/button';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignupMutation } from '../../store/slices/api/auth.api';

const schema = object({
  email: string().trim().email('Некорректный email').required('Email является обязательным'),
  password: string().trim().required('Пароль является обязательным'),
});

export type TFormSignIn = InferType<typeof schema>;

export const SignInPage: FC = () => {
  const [signup, {
    isLoading,
    // isSuccess,
  }] = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormSignIn>({
    resolver: yupResolver(schema),
  });

  const formHandler: SubmitHandler<TFormSignIn> = (data) => {
    console.log(data);
    signup(data)
      .unwrap()
      .then(res => console.log(res))
      .catch(err => console.log(`err: ${err}`));
  }

  return (
    <main className={styles.main}>
      <section aria-label='Вход' className={styles.section}>
        <Typography as='h1' CSSType='heading-1' className={styles.heading}>Admin Panel</Typography>
        <Typography as='h2' CSSType='heading-4' className={styles.title}>Вход</Typography>
        <form className={styles.form} onSubmit={handleSubmit(formHandler)}>
          <Input labelName='Email' type='email' {...register('email')} error={errors.email?.message} />
          <Input labelName='Password' type='password' {...register('password')} error={errors.password?.message} />
          <Button
            className={styles.button}
            type='submit'
            CSSType='primary'
            disabled={isLoading}
          >
            Войти
          </Button>
        </form>
      </section>
      <div className={styles.decor} />
    </main>
  );
};
