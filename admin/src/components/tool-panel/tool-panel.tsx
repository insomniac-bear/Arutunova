import styles from './tool-panel.module.css'
import type { FC, SyntheticEvent } from 'react';
import type { IToolPanelProps } from './tool-panel.props';
import { useState } from 'react';
import cn from 'classnames';
import { useEditorApi } from '../../context/text-editor.context';
import { BlockType, InlineStyle } from '../text-editor/text-editor.config';
import { Modal } from '../../ui-kit/modal/modal';

const INLINE_STYLES_CODES = Object.values(InlineStyle);

export const ToolPanel: FC<IToolPanelProps> = ({ className }) => {
  const toolPanelStyles = cn(styles.container, {
    [className ?? '']: className,
  });
  const [ isLinkModal, setLinkModal ] = useState<boolean>(false);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const { toggleInlineStyle, hasInlineStyle, toggleBlockType, addLink } = useEditorApi();

  const handlerAddLink = () => {
    setLinkModal(true);
  }

  return (
    <>
      <article className={toolPanelStyles}>
        <select
          onChange={(e) => toggleBlockType(e.target.value as BlockType)}
        >
          <option value={BlockType.default}>Текст</option>
          <option value={BlockType.h1}>Заголовок 1</option>
          <option value={BlockType.h2}>Заголовок 2</option>
          <option value={BlockType.h3}>Заголовок 3</option>
        </select>

        {INLINE_STYLES_CODES.map((code) => {
          const onMouseDown = (e: SyntheticEvent) => {
            e.preventDefault();
            toggleInlineStyle(code);
          };

          return (
            <button
              key={code}
              className={cn(
                styles.button, styles[code.toLowerCase()], {
                  [styles.active ?? '']: hasInlineStyle(code),
                }
              )}
              onMouseDown={onMouseDown}
            >
              {
                code[0]
              }
            </button>
          );
        })}
        <button className={styles.button} onClick={handlerAddLink}>
          Link
        </button>
      </article>
      {
        isLinkModal &&
        <Modal
          title='Добавить ссылку'
          closePopup={() => { setLinkModal(false) }}
        >
          <input
            name='url'
            value={url}
            onChange={(e) => { setUrl(e.target.value) }}
          />
          <button
            onClick={() => {
              if (url !== undefined) {
                addLink(url);
              }
              setUrl(undefined);
              setLinkModal(false);
            }}
          >
            Добавить
          </button>
        </Modal>
      }
    </>
  );
};
