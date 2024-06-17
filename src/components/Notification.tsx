import { Alert } from '@mui/material';
import { FC } from 'react';

type NotificationProps = {
  message: string;
  type: 'success' | 'error' | 'warning';
};

export const Notification: FC<NotificationProps> = ({ message, type }) => {
  return (
    <Alert severity={type} variant='filled' elevation={6}>
      {message}
    </Alert>
  );
};
