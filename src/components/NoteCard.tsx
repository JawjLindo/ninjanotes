import { FC } from 'react';
import { Note } from '../types';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardProps,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { blue, green, pink, yellow } from '@mui/material/colors';

type NoteCardProps = {
  note: Note;
  handleDelete: (id: string) => void;
};

export const NoteCard: FC<NoteCardProps> = ({ note, handleDelete }) => {
  const styles: { test: CardProps['sx'] } = {
    test: {
      border: note.category === 'work' ? '1px solid red' : null,
    },
  };

  return (
    <Card elevation={1} sx={styles.test}>
      <CardHeader
        title={note.title}
        action={
          <IconButton onClick={() => handleDelete(note.id)}>
            <DeleteOutlinedIcon />
          </IconButton>
        }
        subheader={note.category}
        avatar={
          <Avatar
            sx={{
              backgroundColor:
                note.category === 'work'
                  ? yellow[700]
                  : note.category === 'money'
                  ? green[500]
                  : note.category === 'todos'
                  ? pink[500]
                  : blue[500],
            }}
          >
            {note.category[0].toUpperCase()}
          </Avatar>
        }
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary'>
          {note.details}
        </Typography>
      </CardContent>
    </Card>
  );
};
