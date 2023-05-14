import type { FC } from 'react';
import { Outlet, redirect } from 'react-router-dom';
import { getCookie, setCookie } from '../utiil/cookie';
import store from '../store';
import { userApi } from '../store/slices/api/user.api';
import { Paths } from '../router/paths';

export const RootLayout: FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export const loader = async () => {
  const token = getCookie('token');
  token && token !== '' &&
  await store
    .dispatch(
      userApi
        .endpoints
        .getUser
        .initiate(undefined)
    )
    .unwrap()
    .catch((err) => {
      if (err.status === 401) {
        setCookie('token', '');
      }

      redirect(Paths.SIGN_IN);
    })
  return null;
};
