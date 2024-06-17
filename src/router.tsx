import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components';
import { Create, Notes } from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Notes /> },
      { path: 'create', element: <Create /> },
    ],
  },
]);
