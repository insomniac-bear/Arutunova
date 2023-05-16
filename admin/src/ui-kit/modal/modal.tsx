/* eslint-disable react-hooks/exhaustive-deps */
import styles from './modal.module.css';
import type { FC, SyntheticEvent } from 'react';
import type { IModalProps } from './modal.props';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import cn from 'classnames';
import { Typography } from '../typography/typography';

const modalContainer = document.querySelector('#modals') as HTMLElement;

export const Modal: FC<IModalProps> = ({ children, title, closePopup, className }) => {
  const containerStyles = cn(styles.container, {
    [className ?? '']: className,
  });

  useEffect(() => {
    document.addEventListener('keydown', onEscKeyPress);

    return () => {
      document.removeEventListener('keydown', onEscKeyPress);
    };
  }, []);

  const onModalClick = (e: SyntheticEvent): void => {
    e.stopPropagation();
  }

  const onEscKeyPress = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      closePopup();
    }
  }

  return ReactDOM.createPortal(
    <div className={styles.popup}>
      <div onClick={onModalClick} className={containerStyles}>
          <header className={styles.header}>
            <Typography as='h3' className={styles.title}>{title}</Typography>
            <button
              onClick={closePopup}
              className={styles.closeButton}
            >
              X
            </button>
          </header>
          {children}
        </div>
        <div className={styles.overlay} onClick={closePopup}>
        </div>
      </div>,
    modalContainer
  );
};