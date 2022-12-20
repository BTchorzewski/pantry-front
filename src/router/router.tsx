import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { LoginPage } from '../pages/LoginPage';
import ErrorPage from '../pages/ErrorPage';
import { HomePage } from '../pages/HomePage';
import { PantriesPage } from '../pages/PantriesPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/pantries',
        element: <PantriesPage />,
      },
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
]);
