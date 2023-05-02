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

      <section className={styles.container}>
        <div className={styles.content}>
          <div className={styles.story}>
            <Typography
              className={styles.section_title}
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
      <section className={styles.gallery} aria-label='Галлерея'>
        <ul className={styles.gallery_list}>
          <li className={`${styles.gallery_img} ${styles.gallery_img__active}`}>
            <Image src='/gallery/img.jpg' alt='Цветы на балконе' width={818} height={640} />
          </li>
          <li className={styles.gallery_img}>
            <Image src='/gallery/img-1.jpg' alt='Цветы на балконе' width={196} height={640} />
          </li>
          <li className={styles.gallery_img}>
            <Image src='/gallery/img-2.jpg' alt='Цветы на балконе' width={196} height={640} />
          </li>
          <li className={styles.gallery_img}>
            <Image src='/gallery/img-3.jpg' alt='Цветы на балконе' width={196} height={640} />
          </li>
        </ul>
      </section>
      <section className={styles.container}>
        <div className={styles.content}>
          <Image src='/program.jpg' alt='Программа обучения' width={416} height={640}/>
          <div className={styles.about__story}>
            <Typography
              className={styles.section_title}
              as='h2'
              CSSType='heading-2'
            >
              Программа обучения
            </Typography>
            <ul className={styles.story}>
              <Typography as='li' CSSType='title-m' className={styles.program_item}>Уроки с обучающим видео и с пошаговой инструкцией</Typography>
              <Typography as='li' CSSType='title-m' className={styles.program_item}>Проверка домашней работы с подробными комментариями преподавателя</Typography>
              <Typography as='li' CSSType='title-m' className={styles.program_item}>Полезная информация и обзоры проверенных кистей в PROCREATE</Typography>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
