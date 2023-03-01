import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/authSlice/authSlice';
export const HomePage = () => {
  const {
    auth: { isAuth, user },
  } = useSelector(authSelector);
  return (
    <>
      {isAuth ? <p>You are logged in.</p> : null}
      <h2>Home page is being developed.</h2>
      <p>token{user}</p>
    </>
  );
};
