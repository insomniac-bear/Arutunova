import styles from './gallery-fragment.module.css';
import type { FC } from 'react';
import type { IGalleryFragmentProps } from './gallery-fragment.props';

import cn from 'classnames';

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
    <div className={fragmentStyles}>
      {
        photos.length > 0 &&
        photos.map((photo) => {
          return (
            <img
              key={photo.id}
              className={styles.list_item}
              src={photo.url}
              alt={photo.title}
            />
          )
        })
      }
      {
        photos.length < MAX_FRAGMENT_PHOTOS &&
        <button
          onClick={onAddButtonClick}
          className={`${styles.add_button} ${styles.list_item}`}
        >
          +
        </button>
      }
    </div>
  );
};
