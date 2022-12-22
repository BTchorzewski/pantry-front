import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { LoginPage } from '../pages/LoginPage';
import ErrorPage from '../pages/ErrorPage';
import { HomePage } from '../pages/HomePage';
import { PantriesPage } from '../pages/PantriesPage';
import { LogoutPage } from '../pages/LogoutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/logout',
        element: <LogoutPage />,
      },
      {
        path: '/pantries',
        element: <PantriesPage />,
      },
    ],
  },
]);
