import styles from './button.module.css';
import type { FC } from 'react';
import type { IButtonProps } from './button.props';
import cn from 'classnames';

export const Button: FC<IButtonProps> = ({
  children,
  type,
  CSSType = 'primary',
  className,
  ...restProps
}) => {
  const buttonStyles = cn(styles.button, {
    [styles[CSSType]]: CSSType,
    [className ?? '']: className,
  });

  return (
    <button
      type={type}
      {...restProps}
      className={buttonStyles}
    >
      {children}
    </button>
  );
};
