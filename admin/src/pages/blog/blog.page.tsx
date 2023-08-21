import styles from './blog.module.css';
import type { FC } from 'react';

import { Typography } from '../../ui-kit/typography/typography';
import { TextEditorProvider } from '../../context/text-editor.context';
import { TextEditor } from '../../components/text-editor/text-editor';
import { ToolPanel } from '../../components/tool-panel/tool-panel';

export const BlogPage: FC = () => {
  return (
    <>
      <section className={styles.section}>
        <Typography as='h1' CSSType='heading-1'>Блог</Typography>
        <TextEditorProvider>
          <ToolPanel className={styles.tool} />
          <TextEditor className={styles.editor} />
        </TextEditorProvider>
      </section>
    </>
  );
}