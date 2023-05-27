import type { LinksFunction } from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Outlet,
} from '@remix-run/react';

import normalizeStylesUrl from '~/styles/normalize.css';
import fontsStylesUrl from '~/styles/fonts.css';
import variablesStylesUrl from '~/styles/variables.css';
import globalStylesUrl from '~/styles/global.css';

import { Logo } from '~/components/logo';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: normalizeStylesUrl,
  },
  {
    rel: 'stylesheet',
    href: fontsStylesUrl,
  },
  {
    rel: 'stylesheet',
    href: variablesStylesUrl,
  },
  {
    rel: 'stylesheet',
    href: globalStylesUrl,
  },
];

export default function App() {
  return (
    <html lang='ru'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <title>Школа рисования маркерами</title>
        <Links />
      </head>
      <body>
        <header className='header'>
          <Logo />
          <nav className='nav'>
            <ul className='nav__list'>
              <li className='nav__item'>
                <Link to='/' className='nav__link'>
                  Уроки
                </Link>
              </li>
              <li className='nav__item'>
                <Link to='/gallery' className='nav__link'>
                  Галерея
                </Link>
              </li>
              <li className='nav__item'>
                <Link to='/' className='nav__link'>
                  Блог
                </Link>
              </li>
            </ul>
            <ul className='nav__buttons'>
              <li>
                <button className='button'>
                  Зарегистрироваться
                </button>
              </li>
              <li>
                <button className='button'>
                  Войти
                </button>
              </li>
            </ul>
          </nav>
        </header>
        <Outlet />
        <LiveReload />
      </body>
    </html>
  );
}
