import styles from './layouts.module.css';
import type { FC } from 'react';

import { NavLink, Navigate, Outlet } from 'react-router-dom';

import { Paths } from '../router/paths';
import { useAppSelector } from '../store/hooks';
import { getAuthStatus } from '../store/slices/user/user.selector';

export const ProtectedLayout: FC = () => {
  const isAuth = useAppSelector(getAuthStatus);

  return isAuth
    ? <div className={styles.container}>
        <aside className={styles.aside}>
          <nav>
            <ul className={styles.list}>
              <li className={styles.item}>
                <NavLink
                  to={Paths.PHOTOS}
                  className={({ isActive, isPending }) =>
                    isPending ? styles.link : isActive ? styles.active_link : styles.link
                  }
                >
                  Фотографии
                </NavLink>
              </li>
              <li className={styles.item}>
                <NavLink
                  to={Paths.BLOG}
                  className={({ isActive, isPending }) =>
                    isPending ? styles.link : isActive ? styles.active_link : styles.link
                  }
                >
                  Блог
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>
        <main><Outlet /></main>
      </div>
    : <Navigate to={Paths.SIGN_IN} />
};
