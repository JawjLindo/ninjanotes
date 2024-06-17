import { Note, Status } from '../../types';

export type NotesState = {
  notes: Note[];
  status: Status;
  error?: string | undefined;
};

type BeginGetNotesAction = {
  type: 'beginGetNotes';
};
type EndGetNotesAction = {
  type: 'endGetNotes';
  payload: { notes: Note[]; error?: string | undefined };
};
type BeginDeleteNoteAction = {
  type: 'beginDeleteNote';
};
type EndDeleteNoteAction = {
  type: 'endDeleteNote';
  payload: { id?: string | undefined; error?: string | undefined };
};
type BeginCreateNoteAction = {
  type: 'beginCreateNote';
};
type EndCreateNoteAction = {
  type: 'endCreateNote';
  payload: { note?: Note | undefined; error?: string | undefined };
};
type ResetStatusAndErrorAction = {
  type: 'resetStatusAndError';
};

export type NotesContextActions =
  | BeginGetNotesAction
  | EndGetNotesAction
  | BeginDeleteNoteAction
  | EndDeleteNoteAction
  | BeginCreateNoteAction
  | EndCreateNoteAction
  | ResetStatusAndErrorAction;
