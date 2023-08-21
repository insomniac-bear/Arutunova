import Immutable from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';

export enum BlockType {
  h1 = 'header-one',
  h2 = 'header-two',
  h3 = 'header-three',
  blockquote = 'blockquote',
  list = 'unordered-list-item',
  orderList = 'ordered-list-item',
  cite = 'cite',
  default = 'unstyled',
}

const CUSTOM_BLOCK_RENDER_MAP = Immutable.Map({
  [BlockType.cite]: {
    element: 'cite',
  },
});

export const BLOCK_RENDER_MAP = DefaultDraftBlockRenderMap.merge(CUSTOM_BLOCK_RENDER_MAP);

export enum InlineStyle {
  B = 'BOLD',
  I = 'ITALIC',
  U = 'UNDERLINE',
  HIGHLIGHT = 'HIGHLIGHT',
}

export const CUSTOM_STYLE_MAP = {
  [InlineStyle.HIGHLIGHT]: {
    backgroundColor: '#19b28d',
    color: '#303030',
  }
}

export enum EntityType {
  link = 'link',
  photo = 'photo',
}
