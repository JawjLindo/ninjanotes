import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { Box, Container } from '@mui/material';
import { Sidebar } from './Sidebar';
import { useTheme } from '@mui/material';
import { useEffect } from 'react';

export const Layout = () => {
  const theme = useTheme();

  useEffect(() => {
    document.title = 'Ninja Notes';
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Header />
      <Sidebar />
      <Box
        sx={{
          backgroundColor: '#f9f9f9',
          width: '100%',
          padding: theme.spacing(3),
        }}
      >
        <Box sx={theme.mixins.toolbar} />
        <Container>
          <Outlet />
        </Container>
        <Footer />
      </Box>
    </Box>
  );
};
