import type { HTMLProps } from 'react';
import type { IPhoto } from '../../types/gallery.types';

export interface IGalleryFragmentProps extends HTMLProps<HTMLUListElement> {
  photos: IPhoto[],
  onAddButtonClick: () => void,
}