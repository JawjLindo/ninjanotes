import { Dispatch, useCallback, useContext } from 'react';
import { NotesContextActions, NotesState } from './types';
import { notesDispatchContext, notesValueContext } from './context';
import { getNextHighestIntFromArray } from '../../utils';
import { Note } from '../../types';

const serverUrl = `${import.meta.env.VITE_SERVER_URL}/notes`;

export const useNotes = (): NotesState => {
  const value = useContext(notesValueContext);
  if (value === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return value;
};

const useNotesDispatchContext = (): Dispatch<NotesContextActions> => {
  const value = useContext(notesDispatchContext);
  if (value === undefined) {
    throw new Error('useNotesDispatch must be used within a NotesProvider');
  }
  return value;
};

type NotesActions = {
  getNotes: (controller?: AbortController | undefined) => void;
  deleteNote: (id: string, controller?: AbortController | undefined) => void;
  createNote: (
    title: string,
    details: string,
    category: string,
    controller?: AbortController | undefined
  ) => void;
  resetStatusAndError: () => void;
};

export const useNotesActions = (): NotesActions => {
  const dispatch = useNotesDispatchContext();

  const getNotes = useCallback(
    async (controller?: AbortController | undefined) => {
      dispatch({ type: 'beginGetNotes' });
      const fetchOptions = controller ? { signal: controller.signal } : {};
      try {
        const response = await fetch(serverUrl, { ...fetchOptions });
        const notes = (await response.json()) as Note[];
        dispatch({ type: 'endGetNotes', payload: { notes } });
      } catch (error) {
        if ((error as Error).name === 'AbortError') return;
        dispatch({
          type: 'endGetNotes',
          payload: { notes: [], error: (error as Error).message },
        });
      }
    },
    [dispatch]
  );

  const deleteNote = useCallback(
    async (id: string, controller?: AbortController | undefined) => {
      dispatch({ type: 'beginDeleteNote' });
      const fetchOptions = controller ? { signal: controller.signal } : {};
      try {
        await fetch(`${serverUrl}/${id}`, {
          method: 'DELETE',
          ...fetchOptions,
        });
        dispatch({ type: 'endDeleteNote', payload: { id } });
      } catch (error) {
        if ((error as Error).name === 'AbortError') return;
        dispatch({
          type: 'endDeleteNote',
          payload: { error: (error as Error).message },
        });
      }
    },
    [dispatch]
  );

  const createNote = useCallback(
    async (
      title: string,
      details: string,
      category: string,
      controller?: AbortController | undefined
    ) => {
      dispatch({ type: 'beginCreateNote' });
      const fetchOptions = controller ? { signal: controller.signal } : {};
      try {
        const response = await fetch(serverUrl, { ...fetchOptions });
        const notes = (await response.json()) as Note[];
        const id = getNextHighestIntFromArray(
          notes.map((note) => Number(note.id))
        ).toString();
        await fetch(serverUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, title, details, category }),
        });
        dispatch({
          type: 'endCreateNote',
          payload: { note: { id, title, details, category } },
        });
      } catch (error) {
        if ((error as Error).name === 'AbortError') return;
        dispatch({
          type: 'endCreateNote',
          payload: {
            error: (error as Error).message,
          },
        });
      }
    },
    [dispatch]
  );

  const resetStatusAndError = useCallback(
    () => dispatch({ type: 'resetStatusAndError' }),
    [dispatch]
  );

  return {
    getNotes,
    deleteNote,
    createNote,
    resetStatusAndError,
  };
};
