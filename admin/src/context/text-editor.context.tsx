import type { FC, ReactNode } from 'react';
import type { EditorApi } from '../hooks/use-editor';
import { useContext, createContext } from 'react';
import { useEditor } from '../hooks/use-editor';

const TextEditorContext = createContext<EditorApi | undefined>(undefined);

export const useEditorApi = () => {
  const context = useContext(TextEditorContext);
  if (context === undefined) {
    throw new Error('useEditorApi must be used within TextEditorProvider');
  }

  return context;
}

export const TextEditorProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const editorApi = useEditor();

  return (
    <TextEditorContext.Provider value={editorApi}>
      {children}
    </TextEditorContext.Provider>
  );
}
