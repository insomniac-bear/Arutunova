import type { FC } from 'react';
import type { ITextEditorProps } from './text-editor.props';
export { Editor } from 'draft-js';
import { useEditorApi } from '../../context/text-editor.context';
import cn from 'classnames';
import styles from './text-editor.module.css';
import { Editor } from 'draft-js';
import { BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP } from './text-editor.config';

export const TextEditor: FC<ITextEditorProps> = ({ className }) => {
  const { state, onChange } = useEditorApi();
  const editorStyles = cn(styles.editor, {
    [className ?? '']: className,
  });

  return (
    <article className={editorStyles}>
      <Editor
        placeholder='Введите текст'
        editorState={state}
        onChange={onChange}
        blockRenderMap={BLOCK_RENDER_MAP}
        customStyleMap={CUSTOM_STYLE_MAP}
      />
    </article>
  );
};
