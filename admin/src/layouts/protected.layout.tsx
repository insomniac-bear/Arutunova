import type { FC } from 'react';

import { NavLink, Navigate, Outlet } from 'react-router-dom';

import { Paths } from '../router/paths';
import { useAppSelector } from '../store/hooks';
import { getAuthStatus } from '../store/slices/user/user.selector';

export const ProtectedLayout: FC = () => {
  const isAuth = useAppSelector(getAuthStatus);

  return isAuth
    ? <div>
        <aside>
          <nav>
            <ul>
              <li>
                <NavLink to={Paths.PHOTOS}>Фотографии</NavLink>
              </li>
              <li>
                <NavLink to={Paths.BLOG}>Блог</NavLink>
              </li>
            </ul>
          </nav>
        </aside>
        <main><Outlet /></main>
      </div>
    : <Navigate to={Paths.SIGN_IN} />
};
