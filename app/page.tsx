import styles from './page.module.css';
import { Typography } from './components/typography/typography';
import LogoImg from '../public/logo.png';
import AboutImage from '../public/about-photo.jpg';
import Image from 'next/image';
import { Button } from './components/button/button';

export default function Home() {
  return (
    <main className={styles.main}>
      <section
        className={styles.intro}
      >
        <Image
          className={styles.logo}
          src={LogoImg}
          width={739}
          height={87}
          alt='Sasha Arutunova'
        />
        <Typography
          as='h2'
          CSSType='heading-3'
          className={styles.title}
        >
          Иллюстратор / автор обучающих программ
        </Typography>
        <Typography
          as='p'
          CSSType='title-m'
          className={styles.note}
        >
          Обучение скетчингу и рисованию на iPad.
        </Typography>
        <Button
          styleType='primary'
          className={styles.button}
        >
          Начать обучаться
        </Button>
      </section>

      <section className={styles.about}>
        <div className={styles.about__content}>
          <div className={styles.about__story}>
            <Typography
              className={styles.about__title}
              as='h2'
              CSSType='heading-2'
            >
              Об авторе
            </Typography>
            <Typography
              className={styles.about__text}
              as='p'
              CSSType='title-m'
            >
              Привет! Я - Саша. По образованию дизайнер, по призванию художник. Работала с Rendez-Vous, Cosmopolitan, Seasons Project, Wedding Magazine.
            </Typography>
            <Typography
              className={styles.about__text}
              as='p'
              CSSType='title-m'
            >
              В роли преподавателя уже 7 лет и часто слышу, что хорошо умею объяснять. Cо мной комфортно, а главное - есть результаты.
            </Typography>
            <Typography
              className={styles.about__text}
              as='p'
              CSSType='title-m'
            >
              Этот блог - большая образовательная программа для всех, кто хочет рисовать на iPad.
            </Typography>
            <Typography
              className={styles.about__text}
              as='p'
              CSSType='title-m'
            >
              Присоединяйтесь, давайте рисовать вместе ♡
            </Typography>
          </div>
          <Image
            src={AboutImage}
            alt='Sasha Arutunova'
            width={416}
            height={640}
          />
        </div>
      </section>
      <section>
        <h2>Программа обучения</h2>
        <ul className={styles.list}>
          <li>Уроки с обучающим видео и с пошаговой инструкцией</li>
          <li>Проверка домашней работы с подробными комментариями преподавателя</li>
          <li>Полезная информация и обзоры проверенных кистей в PROCREATE</li>
        </ul>
      </section>
    </main>
  )
}
