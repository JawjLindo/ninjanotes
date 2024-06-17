import { v4 as uuid } from 'uuid';

const serverUrl = `${import.meta.env.VITE_SERVER_URL}/notes`;

const getNotes = async () => {
  const data = await fetch(serverUrl)
    .then((res) => res.json())
    .then((data) => data);
  if (!data) return [];
  return data;
};

const createNote = async ({
  title,
  details,
  category,
}: {
  title: string;
  details: string;
  category: string;
}) => {
  const id = uuid();
  await fetch(serverUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, title, details, category }),
  });
};

const deleteNote = async (id: string) =>
  await fetch(`${serverUrl}/${id}`, {
    method: 'DELETE',
  });

export const NotesApi = { getNotes, createNote, deleteNote } as const;
