import styles from './link.module.css';
import type { FC } from 'react';
import type { ILinkProps } from './link.props';

export const Link: FC<ILinkProps> = ({ contentState, entityKey, children }) => {
  const { url } = contentState.getEntity(entityKey).getData();

  return (
    <>
      <a href={url} className={styles.link}>
        {children}
      </a>
    </>
  );
};
