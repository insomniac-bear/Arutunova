import styles from './gallery-item.module.css';
import type { FC, HTMLProps } from 'react';

import cn from 'classnames';
import { IPhoto } from '../../types/gallery.types';

export const GalleryItem: FC<HTMLProps<HTMLLIElement> & IPhoto> = ({
  url,
  title,
  className,
}) => {
  const itemClass = cn(styles.item, {
    [className ?? '']: className,
  });

  return (
    <li className={itemClass}>
      <img className={styles.img} src={url} alt={title} />
    </li>
  );
}