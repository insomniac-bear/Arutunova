import { HTMLProps } from 'react';

export interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  CSSType?: 'primary' | 'secondary' | 'text' | 'icon';
}