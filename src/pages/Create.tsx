import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes, useNotesActions } from '../store';
import { Notification } from '../components/Notification';

export const Create = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('todos');
  const navigate = useNavigate();
  const styles: { field: TextFieldProps['sx'] | FormControlProps['sx'] } = {
    field: {
      marginTop: '20px',
      marginBottom: '20px',
      display: 'block',
    },
  };

  const { status, error } = useNotes();
  const { createNote, resetStatusAndError } = useNotesActions();

  useEffect(() => {
    resetStatusAndError();
  }, [resetStatusAndError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTitleError(title == '' ? true : false);
    setDetailsError(title == '' ? true : false);

    if (title && details) {
      createNote(title, details, category);
      navigate('/');
    }
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
      <Typography
        variant='h6'
        component='h2'
        gutterBottom
        color='textSecondary'
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          label='Note Title'
          color='secondary'
          fullWidth
          required
          sx={styles.field}
          value={title}
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          label='Details'
          color='secondary'
          fullWidth
          multiline
          rows={4}
          required
          sx={styles.field}
          value={details}
          error={detailsError}
        />

        <FormControl sx={styles.field}>
          <FormLabel>Note Category</FormLabel>

          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              value='money'
              control={<Radio color='secondary' />}
              label='Money'
            />
            <FormControlLabel
              value='todos'
              control={<Radio color='secondary' />}
              label='Todos'
            />
            <FormControlLabel
              value='reminders'
              control={<Radio color='secondary' />}
              label='Reminders'
            />
            <FormControlLabel
              value='work'
              control={<Radio color='secondary' />}
              label='Work'
            />
          </RadioGroup>
        </FormControl>

        <Button
          type='submit'
          color='secondary'
          variant='contained'
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </>
  );
};
