import { useToken } from '../hooks/useToken';
import { useNavigate } from 'react-router-dom';

export const LogoutPage = () => {
  const [token] = useToken();
  const redirect = useNavigate();
  if (!token) {
    redirect('/');
  }
  return <main> logout page in development.</main>;
};
