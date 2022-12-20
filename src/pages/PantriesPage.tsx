import { useToken } from '../hooks/useToken';
import { useEffect, useState } from 'react';
import { FetchShortPantriesResponse, ShortPantry } from '../types';
import { protectedBasicRoute } from '../utils/fetch';

export const PantriesPage = () => {
  const [token] = useToken();
  const [pantries, setPantries] = useState<ShortPantry[]>([]);
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          // prettier-ignore
          'Authorization': `Bearer ${token}`,
        },
      };
      const { data } = await protectedBasicRoute.get('/pantry', config);
      const shortPantries = data as FetchShortPantriesResponse;
      setPantries(shortPantries.data);
    })();
  }, []);

  return (
    <div>
      {!error ? null : <p>{error}</p>}
      <h2>Pantries: {token}</h2>
      <ul>
        {pantries.map((pantry) => {
          return (
            <li key={pantry.id}>
              <div>{pantry.name}</div>
              <div>
                <p>total: {pantry.stats.total}</p>
                <p></p>
                <p></p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
