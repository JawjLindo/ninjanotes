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
import { useNavigate } from 'react-router-dom';
import { Notification } from '../components/Notification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NotesApi } from '../services';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type FormInputs = {
  title: string;
  details: string;
  category: string;
};

export const Create = () => {
  const navigate = useNavigate();
  const styles: { field: TextFieldProps['sx'] | FormControlProps['sx'] } = {
    field: {
      marginTop: '20px',
      marginBottom: '20px',
      display: 'block',
    },
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormInputs>();

  const queryClient = useQueryClient();

  const {
    isPending: isPendingCreate,
    error: createNoteError,
    mutate: createNote,
  } = useMutation<unknown, Error, Parameters<typeof NotesApi.createNote>[0]>({
    mutationKey: ['createNote'],
    mutationFn: NotesApi.createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      navigate('/');
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    createNote({
      title: data.title,
      details: data.details,
      category: data.category,
    });
  };

  return (
    <>
      {isPendingCreate && (
        <Box alignContent='center'>
          <CircularProgress sx={{ color: 'black' }} />
        </Box>
      )}
      {createNoteError && (
        <Notification message={createNoteError.message} type='error' />
      )}
      {errors.title && (
        <Notification message={errors.title.message!} type='error' />
      )}
      {errors.details && (
        <Notification message={errors.details.message!} type='error' />
      )}
      <Typography
        variant='h6'
        component='h2'
        gutterBottom
        color='textSecondary'
      >
        Create a New Note
      </Typography>

      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='title'
          defaultValue=''
          rules={{ required: 'The title is required.' }}
          render={({ field }) => (
            <TextField
              label='Note Title'
              color='secondary'
              fullWidth
              required
              sx={styles.field}
              error={errors.title ? true : false}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name='details'
          defaultValue=''
          rules={{ required: 'The details are required.' }}
          render={({ field }) => (
            <TextField
              label='Details'
              color='secondary'
              fullWidth
              multiline
              rows={4}
              required
              sx={styles.field}
              error={errors.details ? true : false}
              {...field}
            />
          )}
        />

        <FormControl sx={styles.field}>
          <FormLabel>Note Category</FormLabel>

          <Controller
            control={control}
            name='category'
            defaultValue='todos'
            render={({ field }) => (
              <RadioGroup {...field}>
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
            )}
          />
        </FormControl>

        <Button
          type='submit'
          color='secondary'
          variant='contained'
          endIcon={<KeyboardArrowRightIcon />}
          disabled={isPendingCreate}
        >
          Submit
        </Button>
      </form>
    </>
  );
};
