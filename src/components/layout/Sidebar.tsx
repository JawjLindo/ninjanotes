import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { drawerWidth } from './types';

const activeBackgroundColor = '#f4f4f4';

const menuItems = [
  {
    text: 'My Notes',
    icon: <SubjectOutlinedIcon color='secondary' />,
    path: '/',
  },
  {
    text: 'Create Note',
    icon: <AddCircleOutlinedIcon color='secondary' />,
    path: '/create',
  },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant='permanent'
      anchor='left'
    >
      <Box>
        <Typography
          variant='h5'
          sx={{
            padding: theme.spacing(2),
          }}
        >
          Ninja Notes
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            sx={{
              backgroundColor:
                location.pathname === item.path
                  ? activeBackgroundColor
                  : 'inherit',
            }}
          >
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
