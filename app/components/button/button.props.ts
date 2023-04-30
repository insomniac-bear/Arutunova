import type { HTMLProps } from 'react';

export interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  styleType?: 'primary' | 'secondary' | 'text' | 'icon';
}