import {
  createContext,
  createElement,
  Dispatch,
  FC,
  PropsWithChildren,
} from 'react';
import { NotesContextActions, NotesState } from './types';
import { produce } from 'immer';
// import { useReducer } from 'reinspect';
import { useReducer } from 'react';

export const notesValueContext = createContext<NotesState | undefined>(
  undefined
);
export const notesDispatchContext = createContext<
  Dispatch<NotesContextActions> | undefined
>(undefined);

const initialState: NotesState = {
  notes: [],
  status: 'idle',
};

const notesReducer = (
  state: NotesState,
  action: NotesContextActions
): NotesState => {
  switch (action.type) {
    case 'beginGetNotes':
      return produce<NotesState>(state, (draft) => {
        draft.status = 'loading';
        draft.error = undefined;
      });
    case 'endGetNotes':
      return produce<NotesState>(state, (draft) => {
        if (action.payload.error) {
          draft.status = 'failed';
          draft.error = action.payload.error;
        } else {
          draft.status = 'succeeded';
          draft.notes = action.payload.notes;
        }
      });
    case 'beginDeleteNote':
      return produce<NotesState>(state, (draft) => {
        draft.status = 'loading';
        draft.error = undefined;
      });
    case 'endDeleteNote':
      return produce<NotesState>(state, (draft) => {
        if (action.payload.error) {
          draft.status = 'failed';
          draft.error = action.payload.error;
        } else {
          if (!action.payload.id) throw new Error('Note ID not provided');
          draft.status = 'succeeded';
          draft.notes = state.notes.filter(
            (note) => note.id !== action.payload.id
          );
        }
      });
    case 'beginCreateNote':
      return produce<NotesState>(state, (draft) => {
        draft.status = 'loading';
        draft.error = undefined;
      });
    case 'endCreateNote':
      return produce<NotesState>(state, (draft) => {
        if (action.payload.error) {
          draft.status = 'failed';
          draft.error = action.payload.error;
        } else {
          if (!action.payload.note) throw new Error('Note not provided');
          draft.status = 'succeeded';
          draft.notes.push(action.payload.note);
        }
      });
    case 'resetStatusAndError':
      return produce<NotesState>(state, (draft) => {
        draft.status = 'idle';
        draft.error = undefined;
      });
  }
};

export const NotesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(
    notesReducer,
    initialState
    // (state) => state,
    // 'notes'
  );

  const valueProvider = createElement(
    notesValueContext.Provider,
    { value: state },
    children
  );
  const dispatchProvider = createElement(
    notesDispatchContext.Provider,
    { value: dispatch },
    valueProvider
  );

  return dispatchProvider;
};
