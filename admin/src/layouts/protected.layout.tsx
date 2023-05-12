import type { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { Paths } from '../router/paths';
import { useAppSelector } from '../store/hooks';
import { getAuthStatus } from '../store/slices/user/user.selector';

export const ProtectedLayout: FC = () => {
  const isAuth = useAppSelector(getAuthStatus);

  return isAuth
    ? <><main><Outlet /></main></>
    : <Navigate to={Paths.SIGN_IN} />
};
