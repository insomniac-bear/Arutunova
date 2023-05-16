import styles from './signin.module.css';

import type { FC } from 'react';
import type { InferType } from 'yup';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import { Typography } from '../../ui-kit/typography/typography';
import { Input } from '../../ui-kit/input/input';
import { Button } from '../../ui-kit/button/button';
import { useSignupMutation } from '../../store/slices/api/auth.api';
import { useAppDispatch } from '../../store/hooks';
import { setCookie } from '../../util/cookie';
import { setAuth } from '../../store/slices/user/user.slice';

const schema = object({
  email: string().trim().email('Некорректный email').required('Email является обязательным'),
  password: string().trim().required('Пароль является обязательным'),
});

export type TFormSignIn = InferType<typeof schema>;

export const SignInPage: FC = () => {
  const dispatch = useAppDispatch();

  const [errMessage, setErrMessage] = useState<string | undefined>(undefined);

  const [signup, {
    isLoading,
  }] = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormSignIn>({
    resolver: yupResolver(schema),
  });

  const formHandler: SubmitHandler<TFormSignIn> = (data) => {
    signup(data)
      .unwrap()
      .then(res => {
        console.log(res);
        setCookie('token', res.access_token);
        dispatch(setAuth(true));
      })
      .catch((err) => {
        setErrMessage(err.data.message);
      });
  }

  return (
    <main className={styles.main}>
      <section aria-label='Вход' className={styles.section}>
        <Typography as='h1' CSSType='heading-1' className={styles.heading}>Admin Panel</Typography>
        <Typography as='h2' CSSType='heading-4' className={styles.title}>Вход</Typography>
        <form className={styles.form} onSubmit={handleSubmit(formHandler)}>
          {
            errMessage &&
            <Typography as='p' CSSType='text-m' className={styles.error}>{errMessage}</Typography>
          }
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
