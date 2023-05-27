import type { LinksFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { GalleryList } from '~/components/gallery-list';

import stylesUrl from '~/styles/index.css';
import typographyStylesUrl from '~/styles/typography.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesUrl },
  { rel: 'stylesheet', href: typographyStylesUrl },
];

export const loader = async () => {
  const res = await fetch('http://localhost:8000/photos?limit=4');
  const data: {
    id: number;
    url: string;
    title: string;
  }[] = await res.json();

  return json({ data });
};

export default function Index() {
  const photos = useLoaderData<typeof loader>();

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

      <section className='gallery' aria-label='Галлерея'>
        <GalleryList data={photos.data} />
      </section>

      <section className='container'>
        <div className='content'>
          <img src='/img/program.jpg' alt='Программа обучения' width={416} height={640}/>
          <div className='about__story'>
            <h2
              className='heading-2 section__title'
            >
              Программа обучения
            </h2>
            <ul className='story'>
              <li className='program_item title-m'>
                Уроки с обучающим видео и с пошаговой инструкцией
              </li>
              <li className='program_item title-m'>
                Проверка домашней работы с подробными комментариями преподавателя
              </li>
              <li className='program_item title-m'>
                Полезная информация и обзоры проверенных кистей в PROCREATE
              </li>
            </ul>
          </div>
        </div>
      </section>

    </main>
  );
}
