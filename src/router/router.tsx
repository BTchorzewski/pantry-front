import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import { HomePage } from '../pages/HomePage/HomePage';
import { PantriesPage } from '../pages/PantriesPage/PantriesPage';
import { LogoutPage } from '../pages/LogoutPage/LogoutPage';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import { PantryPage } from '../pages/PantryPage/PantryPage';

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
      {
        path: '/registration',
        element: <RegistrationPage />,
      },
      {
        path: '/pantry/:pantryId',
        element: <PantryPage />,
      },
    ],
  },
]);
