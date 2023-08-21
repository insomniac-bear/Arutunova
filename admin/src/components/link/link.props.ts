import type { ContentState } from 'draft-js';
import type { ReactNode } from 'react';

export interface ILinkProps {
  children: ReactNode;
  contentState: ContentState;
  entityKey: string;
}
