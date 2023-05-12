import { HTMLProps } from 'react';

export interface IInputProps extends HTMLProps<HTMLInputElement> {
  labelName: string,
  className?: string;
  error?: string;
}
