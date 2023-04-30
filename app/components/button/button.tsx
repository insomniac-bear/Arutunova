import styles from './button.module.css';
import type { FC } from 'react';
import type { IButtonProps } from './button.props';
import cn from 'classnames';

export const Button: FC<IButtonProps> = ({ children, styleType = 'primary', className }) => {
  const buttonStyle = cn(styles[styleType], { [className ?? '']: className });
  return (
    <button className={buttonStyle}>
      {children}
    </button>
  );
};
