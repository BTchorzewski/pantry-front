import { useRouteError } from 'react-router-dom';
import { Navigation } from '../../components/Navigation/Navigation';

interface ErrorType {
  status: number;
  message: string;
  statusText: string;
  internal: boolean;
  data: string;
  error: unknown;
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorType;
  console.log(JSON.stringify(error));
  return (
    <div id='error-page'>
      <Navigation />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.message}</i>
      </p>
    </div>
  );
}
