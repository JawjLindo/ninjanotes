import { AppBar, Avatar, Toolbar, Typography, useTheme } from '@mui/material';
import { format } from 'date-fns';
import { drawerWidth } from './types';

export const Header = () => {
  const theme = useTheme();

  return (
    <header>
      <AppBar
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
        }}
        elevation={0}
      >
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>
            Today is the {format(new Date(), 'do MMMM y')}
          </Typography>
          <Typography>Mario</Typography>
          <Avatar src='/mario-av.png' sx={{ marginLeft: theme.spacing(2) }} />
        </Toolbar>
      </AppBar>
    </header>
  );
};
