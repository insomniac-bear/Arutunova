import type { LinksFunction } from '@remix-run/node';

import stylesUrl from '~/styles/index.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesUrl },
];

export default function Index() {
  return (
    <main className='main'>
      <section
        className='intro'
      >
        <img
          className='logo'
          src='/img/logo.png'
          width={739}
          height={87}
          alt='Sasha Arutunova'
        />
        <h2
          className='heading-3 title'
        >
          Иллюстратор / автор обучающих программ
        </h2>
        <p
          className='title-m note'
        >
          Обучение скетчингу и рисованию на iPad.
        </p>
        <button
          className='button intro__button'
        >
          Начать обучаться
        </button>
      </section>

      <section className='container'>
        <div className='content'>
          <div className='story'>
            <h2
              className='heading-2 section__title'
            >
              Об авторе
            </h2>
            <p
              className='title-m about__text'
            >
              Привет! Я - Саша. По образованию дизайнер, по призванию художник. Работала с Rendez-Vous, Cosmopolitan, Seasons Project, Wedding Magazine.
            </p>
            <p
              className='title-m about__text'
            >
              В роли преподавателя уже 7 лет и часто слышу, что хорошо умею объяснять. Cо мной комфортно, а главное - есть результаты.
            </p>
            <p
              className='title-m about__text'
            >
              Этот блог - большая образовательная программа для всех, кто хочет рисовать на iPad.
            </p>
            <p
              className='title-m about__text'
            >
              Присоединяйтесь, давайте рисовать вместе ♡
            </p>
          </div>
          <img
            src='/img/about-photo.jpg'
            alt='Sasha Arutunova'
            width={416}
            height={640}
          />
        </div>
      </section>
    </main>
  );
}
