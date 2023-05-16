import styles from './gallery-fragment.module.css';
import type { FC } from 'react';
import type { IGalleryFragmentProps } from './gallery-fragment.props';

import cn from 'classnames';
import { GalleryItem } from '../gallery-item/gallery-item';

const MAX_FRAGMENT_PHOTOS = 7;

export const GalleryFragment: FC<IGalleryFragmentProps> = ({
  photos,
  onAddButtonClick,
  className,
}) => {
  const fragmentStyles = cn(styles.list, {
    [className ?? '']: className,
  });

  return (
    <ul className={fragmentStyles}>
      {
        photos.length > 0 &&
        photos.map((photo) => {
          return (
            <GalleryItem key={photo.id} className={styles.list_item} url={photo.url} title={photo.title} />
          )
        })
      }
      {
        photos.length < MAX_FRAGMENT_PHOTOS &&
        <li className={styles.list_item}>
          <button
            onClick={onAddButtonClick}
            className={styles.add_button}
          >
            +
          </button>
        </li>
      }
    </ul>
  );
};
