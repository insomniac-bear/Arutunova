import type { FC } from 'react';
import type { IGalleryFragmentProps } from './gallery-fragment.props';
import { Link } from '@remix-run/react';

export const GalleryFragment: FC<IGalleryFragmentProps> = ({
  photos,
}) => {

  return (
    <div className='list'>
      {
        photos.length > 0 &&
        photos.map((photo) => {
          return (
            <Link
              key={photo.id}
              to={`/gallery/${photo.id}`}
              className='list_item'
            >
              <img
                src={photo.url}
                alt={photo.title}
              />
            </Link>
          )
        })
      }
    </div>
  );
};
