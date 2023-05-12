import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { getAuthStatus } from '../store/slices/user/user.selector';
import { Paths } from '../router/paths';

export const AnonymousLayout: FC = () => {
  const isAuth = useAppSelector(getAuthStatus);

  return isAuth
    ? <Navigate to={Paths.MAIN} />
    : <Outlet />
};
