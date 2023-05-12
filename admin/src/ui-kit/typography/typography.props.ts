import type { ReactNode, ComponentPropsWithoutRef, ElementType } from 'react';

type TCSSType =
| 'heading-1'
| 'heading-2'
| 'heading-3'
| 'heading-4'
| 'title-l'
| 'title-m'
| 'title-s'
| 'text-l'
| 'text-m'
| 'text-s'

export type ITypographyProps<C extends ElementType> = {
  as?: C;
  children: ReactNode;
  CSSType?: TCSSType;
} & ComponentPropsWithoutRef<C>;
