import { CompositeDecorator, DraftEntityMutability, EditorState, RichUtils } from 'draft-js';
import { useCallback, useMemo, useState } from 'react';
import { BlockType, EntityType, InlineStyle } from '../components/text-editor/text-editor.config';
import LinkDecorator from '../components/link/index';

export type EditorApi = {
  state: EditorState;
  onChange: (state: EditorState) => void;
  toggleBlockType: (blockType: BlockType) => void;
  currentBlockType: BlockType;
  toggleInlineStyle: (inlineStyle: InlineStyle) => void;
  hasInlineStyle: (inlineStyle: InlineStyle) => boolean;
  addLink: (url: string) => void;
  setEntityData: (entityKey: string, data: Record<string, string>) => void;
}

const decorator = new CompositeDecorator([LinkDecorator])

export const useEditor = (html?: string): EditorApi => {
  const [state, setState] = useState(() => EditorState.createEmpty(decorator));

  const toggleBlockType = useCallback((blockType: BlockType) => {
    setState((currentState) => RichUtils.toggleBlockType(currentState, blockType));
  }, []);

  const currentBlockType = useMemo(() => {
    const selection = state.getSelection();
    const content = state.getCurrentContent();
    const block = content.getBlockForKey(selection.getStartKey());
    return block.getType() as BlockType;
  }, [state]);

  const toggleInlineStyle = useCallback((inlineStyle: InlineStyle) => {
    setState((currentState) => RichUtils.toggleInlineStyle(currentState, inlineStyle));
  }, []);

  const hasInlineStyle = useCallback((inlineStyle: InlineStyle) => {
    const currentStyle = state.getCurrentInlineStyle();
    return currentStyle.has(inlineStyle);
  }, [state]);

  const setEntityData = useCallback((entityKey: string, data: {[ key: string]: any }) => {
    setState((currentState) => {
      const content = currentState.getCurrentContent();
      const contentStateUpdated = content.mergeEntityData(entityKey, data);
      return EditorState.push(
        currentState,
        contentStateUpdated,
        'apply-entity'
      );
    });
  }, []);

  const addEntity = useCallback((entityType: EntityType, data: Record<string, string>, mutability: DraftEntityMutability) => {
    setState((currentState) => {
      const contentState = currentState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(entityType, mutability, data);
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newState = EditorState.set(currentState, { currentContent: contentStateWithEntity });
      return RichUtils.toggleLink(newState, newState.getSelection(), entityKey);
    })
  }, []);

  const addLink = useCallback((url: string) => {
		addEntity(EntityType.link, { url }, 'MUTABLE')
  }, [addEntity]);

  return useMemo(() => ({
    state,
    currentBlockType,
    onChange: setState,
    toggleBlockType,
    toggleInlineStyle,
    hasInlineStyle,
    addLink,
    setEntityData
  }), [addLink, currentBlockType, hasInlineStyle, state, toggleBlockType, toggleInlineStyle, setEntityData]);
};
