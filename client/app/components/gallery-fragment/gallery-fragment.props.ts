import type { HTMLProps } from 'react';

export interface IGalleryFragmentProps extends HTMLProps<HTMLUListElement> {
  photos: {
    id?: number;
    url: string;
    title: string;
  }[],
}