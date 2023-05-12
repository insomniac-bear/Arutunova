import styles from './input.module.css';
import type { FC } from 'react';
import type { IInputProps } from './input props';
import cn from 'classnames';
import { Typography } from '../typography/typography';

export const Input: FC<IInputProps> = ({ className, error, labelName, ...restProps }) => {
  const labelStyles = cn(styles.label, {
    [className ?? '']: className,
  });
  const inputStyles = cn(styles.input, {
    [styles.input__error]: error,
  });

  return (
    <label className={labelStyles}>
      <Typography as='p' CSSType='text-l' className={styles.label}>{labelName}</Typography>
      <input
        className={inputStyles}
        {...restProps}
      />
      {
        error !== undefined &&
        <Typography
          as='span'
          CSSType='text-s'
          className={styles.error}
        >
          {error}
        </Typography>
      }
    </label>
  )
}