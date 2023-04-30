"use client"
import styles from './typography.module.css';
import type { ElementType } from 'react';
import type { ITypographyProps } from './typography.props';
import cn from 'classnames';

export const Typography = <C extends ElementType>({
  as,
  children,
  classNames,
  CSSType = 'heading-1',
  ...restProps
}: ITypographyProps<C>) => {
  const Component = as || 'span';
  const componentStyles = cn(styles[CSSType], {
    [classNames ?? '']: classNames,
  });

  console.log(componentStyles);

  return (
    <Component className={componentStyles} {...restProps}>
      {children}
    </Component>
  );
}
