import styles from './input.module.css';
import { forwardRef, Ref } from 'react';
import type { IInputProps } from './input props';
import cn from 'classnames';
import { Typography } from '../typography/typography';

export const Input = forwardRef(({ className, error, labelName, ...restProps }: IInputProps, ref: Ref<HTMLInputElement>) => {
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
        ref={ref}
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
          {`${error}`}
        </Typography>
      }
    </label>
  )
});
