import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './styles.css';
import { router } from './router';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { /*ContextToolsProvider, */ NotesProvider } from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ContextToolsProvider name='Ninja Notes'> */}
    <ThemeProvider theme={theme}>
      <NotesProvider>
        <RouterProvider router={router} />
      </NotesProvider>
    </ThemeProvider>
    {/* </ContextToolsProvider> */}
  </React.StrictMode>
);
