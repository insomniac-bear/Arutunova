import type { ReactNode } from 'react';

export interface IModalProps {
  title: string;
  children: ReactNode;
  closePopup: () => void;
  className?: string;
}
