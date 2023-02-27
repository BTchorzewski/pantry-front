import { useAuth } from '../hooks/useAuth';

export const HomePage = () => {
  const [token] = useAuth();
  return (
    <>
      {token ? <p>You are logged in.</p> : null}
      <h2>Home page is being developed.</h2>
      <p>token{token}</p>
    </>
  );
};
