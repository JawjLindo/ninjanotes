import { Box, CircularProgress } from '@mui/material';
import { NoteCard } from '../components';
import Masonry from 'react-masonry-css';
import { Notification } from '../components/Notification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Note } from '../types';
import { NotesApi } from '../services';

export const Notes = () => {
  const queryClient = useQueryClient();

  const {
    data: notes,
    isPending: isPendingNotes,
    error: errorNotes,
  } = useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: NotesApi.getNotes,
  });

  const {
    mutate: deleteNote,
    isPending: isPendingDelete,
    error: errorDelete,
  } = useMutation<unknown, Error, string>({
    mutationKey: ['deleteNote'],
    mutationFn: NotesApi.deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });

  const handleDelete = async (id: string) => {
    deleteNote(id);
  };

  return (
    <>
      {(isPendingDelete || isPendingNotes) && (
        <Box alignContent='center'>
          <CircularProgress sx={{ color: 'black' }} />
        </Box>
      )}
      {errorNotes && <Notification message={errorNotes.message} type='error' />}
      {errorDelete && (
        <Notification message={errorDelete.message} type='error' />
      )}
      <Masonry
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
        breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
      >
        {notes &&
          notes!.map((note) => (
            <Box key={note.id} component='div'>
              <NoteCard note={note} handleDelete={handleDelete} />
            </Box>
          ))}
      </Masonry>
    </>
  );
};
