import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const LogoutPage = () => {
  const [user] = useAuth();
  const redirect = useNavigate();
  if (!user) {
    redirect('/');
  }
  return <main> logout page in development.</main>;
};
