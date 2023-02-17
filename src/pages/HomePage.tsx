import { useToken } from '../hooks/useToken';

export const HomePage = () => {
  const [token] = useToken();
  return (
    <>
      {token ? <p>You are logged in.</p> : null}
      <h2>Home page is being developed.</h2>
      <p>token{token}</p>
    </>
  );
};
