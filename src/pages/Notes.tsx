import { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { NoteCard } from '../components';
import Masonry from 'react-masonry-css';
import { useNotes, useNotesActions } from '../store';
import { Notification } from '../components/Notification';

export const Notes = () => {
  const { notes, status, error } = useNotes();
  const { getNotes, deleteNote } = useNotesActions();

  useEffect(() => {
    const controller = new AbortController();
    getNotes(controller);

    return () => {
      controller.abort();
    };
  }, [getNotes]);

  const handleDelete = async (id: string) => {
    deleteNote(id);
  };

  return (
    <>
      {status === 'loading' && (
        <Box alignContent='center'>
          <CircularProgress sx={{ color: 'black' }} />
        </Box>
      )}
      {status === 'failed' && (
        <Notification
          isOpen={status === 'failed'}
          message={error!}
          type='error'
        />
      )}
      <Masonry
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
        breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
      >
        {notes.map((note) => (
          <Box key={note.id} component='div'>
            <NoteCard note={note} handleDelete={handleDelete} />
          </Box>
        ))}
      </Masonry>
    </>
  );
};
