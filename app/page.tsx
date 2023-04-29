import styles from './page.module.css';
import logo from '../public/logo.svg';
import Image from 'next/image';

export default function Home() {
  return (
    <main className={styles.main}>
      <section
        className={styles.intro}
      >
        <Image
          className={styles.logo}
          alt='Sasha Arutunova'
          src={logo}
          width={739}
          height={87}
        />
        <h2
          className={styles.title}
        >
          Иллюстратор / автор обучающих программ программ
        </h2>
        <p
          className={styles.note}
        >
          Обучение скетчингу и рисованию на iPad.
        </p>
        <button
          className={styles.button}
        >
          Начать обучаться
        </button>
      </section>
      <section>
        <h2>Об авторе</h2>
        <p>Привет! Я - Саша. По образованию дизайнер, по призванию художник. Работала с Rendez-Vous, Cosmopolitan, Seasons Project, Wedding Magazine.</p>
        <p>В роли преподавателя уже 7 лет и часто слышу, что хорошо умею объяснять. Cо мной комфортно, а главное - есть результаты.</p>
        <p>Этот блог - большая образовательная программа для всех, кто хочет рисовать на iPad.</p>
        <p>Присоединяйтесь, давайте рисовать вместе ♡</p>
      </section>
      <section>
        <h2>Программа обучения</h2>
        <ul>
          <li className={styles.list}>Уроки с обучающим видео и с пошаговой инструкцией</li>
          <li>Проверка домашней работы с подробными комментариями преподавателя</li>
          <li>Полезная информация и обзоры проверенных кистей в PROCREATE</li>
        </ul>
      </section>
    </main>
  )
}
